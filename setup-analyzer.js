(() => {
  const api = window.TENNIS_SETUP_ANALYZER_API || buildFallbackApi();
  if (!api) return;

  const elements = {
    racket: document.getElementById("setupAnalyzerRacket"),
    gauge: document.getElementById("setupAnalyzerGauge"),
    string: document.getElementById("setupAnalyzerString"),
    stringNote: document.getElementById("setupAnalyzerStringNote"),
    tension: document.getElementById("setupAnalyzerTension"),
    goal: document.getElementById("setupAnalyzerGoal"),
    arm: document.getElementById("setupAnalyzerArm"),
    button: document.getElementById("setupAnalyzerButton"),
    report: document.getElementById("setupAnalyzerReport")
  };

  if (!elements.button || !elements.report) return;

  const state = { latestReport: null };
  const metricColors = {
    Spin: "#7658d7",
    Control: "#176b9f",
    Comfort: "#ea9b3c",
    Power: "#2f9658",
    Durability: "#5f6a77"
  };

  populateControls();
  renderReport(null);

  elements.string?.addEventListener("change", () => syncGaugeWithString(true));
  elements.gauge?.addEventListener("change", () => {
    elements.gauge.dataset.autofilled = "false";
  });
  elements.button.addEventListener("click", () => {
    renderReport(buildReport());
    api.trackToolUsage?.("setup_analyzer_analyze", "Analyze Setup");
  });

  function buildFallbackApi() {
    const strings = Array.isArray(window.TENNIS_STRING_DATA)
      ? window.TENNIS_STRING_DATA
      : Array.isArray(window.TENNIS_STRING_PLANNER_STRINGS)
        ? window.TENNIS_STRING_PLANNER_STRINGS
        : [];

    if (!strings.length) {
      return null;
    }

    const TENSION_TYPE_BASE = {
      Poly: 48.5,
      "Co-Poly": 49,
      "Synthetic Gut": 55,
      Multifilament: 54,
      "Natural Gut": 55.5,
      Hybrid: 52.5
    };

    const TENSION_RACKET_ADJUSTMENTS = {
      "Babolat Pure Aero": 0,
      "Babolat Pure Drive": 1.5,
      "Wilson Blade": 0.5,
      "Wilson Clash": 1.5,
      "Wilson Pro Staff": 0.5,
      "Yonex Ezone": 1,
      "Yonex VCORE": 0,
      "Head Speed": 0.5,
      "Head Radical": 0.5,
      "Control Frame": 0.5,
      "Power Frame": 1.5,
      "Spin Frame": 0
    };

    const TENSION_FEEL_ADJUSTMENTS = {
      Comfort: -2,
      Balanced: 0,
      Control: 2
    };

    const TENSION_ARM_ADJUSTMENTS = {
      Normal: 0,
      Sensitive: -1.5,
      "Very Sensitive": -3
    };

    const FILTERS = [
      {
        key: "racketFamily",
        options: [
          "Any",
          ...getOrderedOptions(
            strings.map((entry) => entry.racketFamily),
            [
              "Babolat Pure Aero",
              "Babolat Pure Drive",
              "Wilson Blade",
              "Wilson Clash",
              "Wilson Pro Staff",
              "Yonex Ezone",
              "Yonex VCORE",
              "Head Speed",
              "Head Radical",
              "Control Frame",
              "Power Frame",
              "Spin Frame"
            ]
          )
        ]
      },
      {
        key: "gauge",
        options: [
          "Any",
          ...getOrderedOptions(
            strings.map((entry) => entry.gauge),
            ["15L", "16", "16L", "17", "17L", "18"]
          )
        ]
      }
    ];

    return {
      STRINGS: strings,
      FILTERS,
      TENSION_TYPE_BASE,
      TENSION_RACKET_ADJUSTMENTS,
      TENSION_FEEL_ADJUSTMENTS,
      TENSION_ARM_ADJUSTMENTS,
      mapStringLevelToNumeric,
      getRacketFamilyGroup,
      clampNumber,
      formatDecimalNumber,
      doesEntryMatchCalculatorType,
      buildTensionCalculatorRecommendation,
      persistTensionCalculatorSource,
      trackToolUsage,
      openMailDraft
    };

    function getOrderedOptions(values, preferredOrder = []) {
      const seen = new Set();
      const cleaned = values
        .map((value) => String(value || "").trim())
        .filter((value) => value && value !== "Any")
        .filter((value) => {
          if (seen.has(value)) {
            return false;
          }
          seen.add(value);
          return true;
        });

      const preferred = preferredOrder.filter((value) => seen.has(value));
      const remaining = cleaned
        .filter((value) => !preferred.includes(value))
        .sort((left, right) => left.localeCompare(right));

      return [...preferred, ...remaining];
    }

    function clampNumber(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function formatDecimalNumber(value) {
      return Number(value).toFixed(1);
    }

    function buildMailtoLink({ to = "", subject = "", body = "" }) {
      const params = [];
      if (subject) {
        params.push(`subject=${encodeURIComponent(subject)}`);
      }
      if (body) {
        params.push(`body=${encodeURIComponent(body)}`);
      }

      const query = params.join("&");
      return `mailto:${String(to || "").trim()}${query ? `?${query}` : ""}`;
    }

    function openMailDraft({ to = "", subject = "", body = "" }) {
      if (typeof window === "undefined") {
        return;
      }

      window.location.href = buildMailtoLink({ to, subject, body });
    }

    function formatPoundsRange(min, max) {
      return `${Math.round(min)}-${Math.round(max)} lbs`;
    }

    function formatKilogramRange(min, max) {
      const poundsToKg = (value) => (value * 0.45359237).toFixed(1);
      return `${poundsToKg(min)}-${poundsToKg(max)} kg`;
    }

    function mapStringLevelToNumeric(value) {
      const scale = {
        Low: 1,
        Medium: 2,
        High: 3,
        "Very High": 4
      };

      return scale[value] || 2;
    }

    function getRacketFamilyGroup(racketFamily) {
      if (["Babolat Pure Aero", "Yonex VCORE", "Spin Frame"].includes(racketFamily)) {
        return "spin";
      }

      if (["Babolat Pure Drive", "Wilson Clash", "Yonex Ezone", "Power Frame"].includes(racketFamily)) {
        return "power";
      }

      return "control";
    }

    function doesEntryMatchCalculatorType(entryType, selectedType) {
      if (selectedType === "Poly" || selectedType === "Co-Poly") {
        return entryType === "Poly" || entryType === "Co-Poly";
      }

      return entryType === selectedType;
    }

    function buildTensionCalculatorRecommendation({ type, racketFamily, preference, armComfort }) {
      const base = TENSION_TYPE_BASE[type];
      if (!base) {
        return null;
      }

      const racketAdjustment = TENSION_RACKET_ADJUSTMENTS[racketFamily] || 0;
      const preferenceAdjustment = TENSION_FEEL_ADJUSTMENTS[preference] || 0;
      const armAdjustment = TENSION_ARM_ADJUSTMENTS[armComfort] || 0;
      const rawTargetPounds = base + racketAdjustment + preferenceAdjustment + armAdjustment;
      const targetPounds = clampNumber(rawTargetPounds, 42, 58);
      const min = clampNumber(targetPounds - 1.5, 42, 58);
      const max = clampNumber(targetPounds + 1.5, 42, 58);

      return {
        type,
        racketFamily,
        preference,
        armComfort,
        lbsRange: formatPoundsRange(min, max),
        kgRange: formatKilogramRange(min, max)
      };
    }

    function persistTensionCalculatorSource(source) {
      try {
        window.localStorage.setItem("tennisStringPlannerTensionSource", JSON.stringify(source));
      } catch {
        // Ignore storage issues on locked-down browsers.
      }
    }

    function trackToolUsage(eventName, eventLabel, extra = {}) {
      if (!window.TSL_ANALYTICS || typeof window.TSL_ANALYTICS.trackEvent !== "function") {
        return;
      }

      window.TSL_ANALYTICS.trackEvent(eventName, eventLabel, {
        eventCategory: "tool_usage",
        ...extra
      });
    }
  }

  function populateControls() {
    const rackets = (api.FILTERS.find((filter) => filter.key === "racketFamily")?.options || []).filter((value) => value !== "Any");
    const gauges = (api.FILTERS.find((filter) => filter.key === "gauge")?.options || []).filter((value) => value !== "Any");
    const names = [...new Set(api.STRINGS.map((entry) => entry.name))].sort((left, right) => left.localeCompare(right));
    const tensions = [];

    for (let tension = 35; tension <= 65; tension += 0.5) {
      tensions.push(Number(tension.toFixed(1)));
    }

    if (elements.racket) {
      elements.racket.innerHTML = `
        <option value="">Choose your racket family</option>
        ${rackets.map((family) => `<option value="${escapeHtml(family)}">${escapeHtml(family)}</option>`).join("")}
      `;
    }

    if (elements.gauge) {
      elements.gauge.innerHTML = `
        <option value="">Choose your gauge</option>
        ${gauges.map((gauge) => `<option value="${escapeHtml(gauge)}">${escapeHtml(gauge)}</option>`).join("")}
      `;
      elements.gauge.dataset.autofilled = "false";
    }

    if (elements.string) {
      elements.string.innerHTML = `
        <option value="">Choose your current string</option>
        ${names.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}
      `;
    }

    if (elements.tension) {
      elements.tension.innerHTML = `
        <option value="">Choose your current tension</option>
        ${tensions.map((tension) => `<option value="${tension}">${escapeHtml(formatTensionOption(tension))}</option>`).join("")}
      `;
      elements.tension.value = "50";
    }

    if (elements.goal) {
      elements.goal.value = "Balanced";
    }

    if (elements.stringNote) {
      elements.stringNote.textContent = "Start typing a string from the database. If we recognize it, we can auto-fill the common gauge listing.";
    }
  }

  function syncGaugeWithString(force) {
    const entry = findStringEntryByName(elements.string?.value || "");
    if (!entry) {
      if (elements.stringNote) {
        elements.stringNote.textContent = "Choose your current string from the database so the report can use its stored string profile.";
      }
      return;
    }

    if (elements.stringNote) {
      elements.stringNote.textContent = `Matched ${entry.name}. Default database gauge: ${entry.gauge}.`;
    }

    if (!elements.gauge) return;

    const shouldAutofill = force || !elements.gauge.value || elements.gauge.dataset.autofilled === "true";
    if (shouldAutofill) {
      elements.gauge.value = entry.gauge;
      elements.gauge.dataset.autofilled = "true";
    }
  }

  function renderReport(report) {
    state.latestReport = report;

    if (!report) {
      elements.report.innerHTML = `
        <section class="setup-analyzer-report-card setup-analyzer-report-card-empty">
          <p class="eyebrow">Current Setup Report</p>
          <h3>See your setup report</h3>
          <p class="summary-copy">Enter your racket, string, gauge, and tension to see strengths, tradeoffs, one first adjustment, and next-step setup options.</p>
        </section>
      `;
      return;
    }

    if (report.error) {
      elements.report.innerHTML = `
        <section class="setup-analyzer-report-card setup-analyzer-report-card-empty">
          <p class="eyebrow">Need One More Detail</p>
          <h3>${escapeHtml(report.error.title)}</h3>
          <p class="summary-copy">${escapeHtml(report.error.text)}</p>
        </section>
      `;
      return;
    }

    elements.report.innerHTML = `
      <section class="setup-analyzer-report-card">
        <div class="tool-result-header">
          <p class="eyebrow">Setup Snapshot</p>
          <h3 class="tool-recommendation-name">${escapeHtml(report.snapshotTitle)}</h3>
          <p class="tool-note">${escapeHtml(report.snapshotSummary)}</p>
        </div>
        <div class="setup-fit-panel">
          <div class="setup-fit-total">
            <span class="setup-fit-kicker">Current setup score</span>
            <strong>${report.setupScore.total}/100</strong>
            <p class="tool-note tool-note-compact">${escapeHtml(report.setupScore.summary)}</p>
            <div class="setup-fit-lift">
              <span class="setup-fit-lift-badge">+${report.scoreLift.lift} score lift</span>
              <p class="tool-note tool-note-compact">Best next setup: <strong>${escapeHtml(report.scoreLift.bestOption.entry.name)}</strong> at ${report.scoreLift.bestOption.setupScore.total}/100.</p>
            </div>
          </div>
          <div class="setup-fit-breakdown">
            ${report.setupScore.breakdown.map((item) => `
              <div class="setup-fit-breakdown-item">
                <span>${escapeHtml(item.label)}</span>
                <strong>${item.score}/${item.max}</strong>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="tool-stat-grid">
          <div class="tool-stat">
            <span class="tool-stat-label">Racket</span>
            <strong>${escapeHtml(report.racketFamily)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">String Type</span>
            <strong>${escapeHtml(report.entry.type)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Gauge</span>
            <strong>${escapeHtml(report.gauge)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Tension Check</span>
            <strong>${escapeHtml(report.tensionPosition.label)}</strong>
            <span class="tool-stat-note">${escapeHtml(report.tensionPosition.detail)}</span>
          </div>
        </div>
        <p class="tool-mini-line">${escapeHtml(report.tensionContextLine)}</p>
        <div class="tool-inline-actions">
          <button class="secondary-button compact-button setup-analyzer-email-stringer" type="button">Email Report to Stringer</button>
        </div>
      </section>

      <section class="setup-analyzer-report-card">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Performance Profile</p>
          <h3>What this setup likely emphasizes</h3>
        </div>
        <div class="setup-analyzer-score-list">
          ${report.profileRows.map((row) => `
            <div class="setup-analyzer-score">
              <div class="setup-analyzer-score-head">
                <span>${escapeHtml(row.label)}</span>
                <strong>${row.score}/10</strong>
              </div>
              <div class="setup-analyzer-score-bar" style="--setup-analyzer-bar-color: ${row.color};">
                <span style="width: ${row.score * 10}%;"></span>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="setup-analyzer-report-card">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Strengths</p>
          <h3>What it does well</h3>
        </div>
        <ul class="setup-analyzer-point-list">
          ${report.strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>

      <section class="setup-analyzer-report-card">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Watch-Outs</p>
          <h3>Main tradeoffs</h3>
        </div>
        <ul class="setup-analyzer-point-list">
          ${report.watchouts.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>

      <section class="setup-analyzer-report-card setup-analyzer-report-card-highlight">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Best First Adjustment</p>
          <h3>${escapeHtml(report.adjustment.title)}</h3>
        </div>
        <p class="summary-copy">${escapeHtml(report.adjustment.text)}</p>
        ${report.adjustment.note ? `<p class="tool-note tool-note-compact">${escapeHtml(report.adjustment.note)}</p>` : ""}
      </section>

      <section class="setup-analyzer-report-card">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Next Setups</p>
          <h3>3 next options</h3>
        </div>
        <div class="setup-analyzer-recommendation-list">
          ${report.recommendations.map((option, index) => `
            <article class="setup-analyzer-recommendation-card">
              <div class="setup-analyzer-recommendation-topline">
                <div>
                  <p class="eyebrow">${escapeHtml(option.label)}</p>
                  <h4>${escapeHtml(option.entry.name)}</h4>
                </div>
                <div class="setup-analyzer-recommendation-actions">
                  <div class="setup-analyzer-recommendation-score">
                    <span>Setup score</span>
                    <strong>${option.setupScore.total}/100</strong>
                  </div>
                  <button class="secondary-button compact-button setup-analyzer-open-tension" type="button" data-index="${index}">Open in Tension</button>
                </div>
              </div>
              <div class="tool-stat-grid">
                <div class="tool-stat">
                  <span class="tool-stat-label">String Type</span>
                  <strong>${escapeHtml(option.entry.type)}</strong>
                </div>
                <div class="tool-stat">
                  <span class="tool-stat-label">Gauge</span>
                  <strong>${escapeHtml(option.displayGauge)}</strong>
                </div>
                <div class="tool-stat">
                  <span class="tool-stat-label">Suggested Tension</span>
                  <strong>${escapeHtml(option.tensionRecommendation ? option.tensionRecommendation.lbsRange : "Use Tension Calculator")}</strong>
                </div>
                <div class="tool-stat">
                  <span class="tool-stat-label">Racket Fit</span>
                  <strong>${escapeHtml(option.appliedRacketFamily)}</strong>
                </div>
              </div>
              <p class="tool-note tool-note-compact">${escapeHtml(option.reason)}</p>
              <p class="tool-note tool-note-compact">${escapeHtml(option.setupScore.summary)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;

    elements.report.querySelectorAll(".setup-analyzer-open-tension").forEach((button) => {
      button.addEventListener("click", () => openRecommendationInTensionCalculator(Number(button.dataset.index || 0)));
    });

    const emailReportButton = elements.report.querySelector(".setup-analyzer-email-stringer");
    if (emailReportButton) {
      emailReportButton.addEventListener("click", () => emailCurrentSetupReportToStringer());
    }
  }

  function buildReport() {
    const racketFamily = elements.racket?.value || "";
    const gauge = elements.gauge?.value || "";
    const goal = elements.goal?.value || "Balanced";
    const armSensitive = Boolean(elements.arm?.checked);
    const currentTension = Number(elements.tension?.value);
    const entry = findStringEntryByName(elements.string?.value || "");

    if (!racketFamily) {
      return {
        error: {
          title: "Choose your racket family",
          text: "Start with the racket family so the report can judge whether the current string and tension are sitting in a power, spin, or control frame context."
        }
      };
    }

    if (!entry) {
      return {
        error: {
          title: "Choose a string from the database",
          text: "Start typing your current string and select one that matches the database so the report can use its stored string profile."
        }
      };
    }

    if (!gauge) {
      return {
        error: {
          title: "Choose your gauge",
          text: "Gauge matters in V1 because it changes how much bite, comfort, and durability the current setup is likely giving you."
        }
      };
    }

    if (!Number.isFinite(currentTension)) {
      return {
        error: {
          title: "Enter your current tension",
          text: "Add the tension you currently use so the report can compare it with a practical starting zone for this string type and racket family."
        }
      };
    }

    const safeTension = api.clampNumber(currentTension, 35, 70);
    const normalizedType = normalizeTypeForTension(entry.type);
    const baselineTarget = getBaselineTarget(normalizedType, racketFamily, armSensitive);
    const preferredTarget = getPreferredTargetTension(normalizedType, racketFamily, inferPreference(goal, armSensitive), armSensitive);
    const tensionDifference = safeTension - baselineTarget;
    const profile = buildMetricProfile(entry, racketFamily, gauge, safeTension, baselineTarget);
    const tensionPosition = describeTensionPosition(tensionDifference);
    const setupScore = buildSetupScore({
      goal,
      entry,
      gauge,
      racketFamily,
      armSensitive,
      currentTension: safeTension,
      targetTension: preferredTarget,
      profile
    });
    const recommendations = buildRecommendations(entry, racketFamily, gauge, safeTension, baselineTarget, goal, armSensitive, profile);
    const scoreLift = buildScoreLift(setupScore, recommendations);

    return {
      entry,
      racketFamily,
      gauge,
      goal,
      armSensitive,
      currentTension: safeTension,
      baselineTarget,
      tensionDifference,
      tensionPosition,
      setupScore,
      scoreLift,
      tensionContextLine: `${normalizedType} in ${racketFamily} usually lands around ${api.formatDecimalNumber(baselineTarget)} lbs as a balanced starting point${armSensitive ? " with a small comfort adjustment for the arm" : ""}. Your current ${api.formatDecimalNumber(safeTension)} lbs sits ${tensionPosition.positionText}.`,
      snapshotTitle: `${racketFamily} + ${entry.name} ${gauge} @ ${api.formatDecimalNumber(safeTension)} lbs`,
      snapshotSummary: `${getRacketDescriptor(racketFamily)} + ${getStringDescriptor(entry)} + ${tensionPosition.label.toLowerCase()} tension for this kind of build.`,
      profileRows: [
        { label: "Spin", score: profile.spin, color: metricColors.Spin },
        { label: "Control", score: profile.control, color: metricColors.Control },
        { label: "Comfort", score: profile.comfort, color: metricColors.Comfort },
        { label: "Power", score: profile.power, color: metricColors.Power },
        { label: "Durability", score: profile.durability, color: metricColors.Durability }
      ],
      strengths: buildStrengths(profile, tensionDifference),
      watchouts: buildWatchouts(profile, tensionDifference, armSensitive),
      adjustment: buildAdjustment(entry, gauge, safeTension, baselineTarget, tensionDifference, goal, armSensitive, profile),
      recommendations
    };
  }

  function buildRecommendations(entry, racketFamily, gauge, currentTension, baselineTarget, goal, armSensitive, currentProfile) {
    const stayClose = buildRecommendationCard({
      label: "Stay Close",
      entry,
      displayGauge: gauge,
      appliedRacketFamily: racketFamily,
      appliedPreference: inferPreference("Balanced", armSensitive, entry),
      reason: buildStayCloseReason(entry, currentTension, baselineTarget),
      goal,
      armSensitive
    });

    const goalEntry = selectCandidate({
      mode: "goal",
      currentEntry: entry,
      currentGauge: gauge,
      racketFamily,
      goal,
      armSensitive,
      currentProfile,
      excludeNames: [entry.name]
    }) || entry;

    const goalLabel = goal === "Balanced" ? "Balanced Alternative" : `More ${goal}`;
    const goalOption = buildRecommendationCard({
      label: goalLabel,
      entry: goalEntry,
      displayGauge: goalEntry.name === entry.name ? gauge : goalEntry.gauge,
      appliedRacketFamily: racketFamily,
      appliedPreference: inferPreference(goal, armSensitive, goalEntry),
      reason: buildGoalReason(goal, goalEntry, racketFamily, entry),
      goal,
      armSensitive
    });

    const safeEntry = selectCandidate({
      mode: "safe",
      currentEntry: entry,
      currentGauge: gauge,
      racketFamily,
      goal,
      armSensitive,
      currentProfile,
      excludeNames: [entry.name, goalEntry.name]
    }) || selectCandidate({
      mode: "stay",
      currentEntry: entry,
      currentGauge: gauge,
      racketFamily,
      goal,
      armSensitive,
      currentProfile,
      excludeNames: [entry.name, goalEntry.name]
    }) || entry;

    const safeLabel = armSensitive || currentProfile.comfort <= 5 ? "Softer Alternative" : "Safer Alternative";
    const safePreference = armSensitive || currentProfile.comfort <= 5 ? "Comfort" : "Balanced";
    const safeOption = buildRecommendationCard({
      label: safeLabel,
      entry: safeEntry,
      displayGauge: safeEntry.name === entry.name ? gauge : safeEntry.gauge,
      appliedRacketFamily: racketFamily,
      appliedPreference: inferPreference(safePreference, armSensitive, safeEntry),
      reason: buildSafeReason(entry, safeEntry, armSensitive),
      goal,
      armSensitive
    });

    return [stayClose, goalOption, safeOption];
  }

  function buildRecommendationCard({ label, entry, displayGauge, appliedRacketFamily, appliedPreference, reason, goal, armSensitive }) {
    const normalizedType = normalizeTypeForTension(entry.type);
    const balancedTarget = getBaselineTarget(normalizedType, appliedRacketFamily, armSensitive);
    const preferredTarget = getPreferredTargetTension(normalizedType, appliedRacketFamily, appliedPreference, armSensitive);
    const profile = buildMetricProfile(entry, appliedRacketFamily, displayGauge, preferredTarget, balancedTarget);

    return {
      label,
      entry,
      displayGauge,
      appliedRacketFamily,
      appliedPreference,
      reason,
      setupScore: buildSetupScore({
        goal,
        entry,
        gauge: displayGauge,
        racketFamily: appliedRacketFamily,
        armSensitive,
        currentTension: preferredTarget,
        targetTension: preferredTarget,
        profile
      }),
      calculatorType: normalizeTypeForTension(entry.type),
      tensionRecommendation: buildTensionRecommendation(entry, appliedRacketFamily, appliedPreference, armSensitive)
    };
  }

  function buildScoreLift(currentSetupScore, recommendations) {
    const bestOption = [...(recommendations || [])]
      .sort((left, right) => right.setupScore.total - left.setupScore.total)[0];

    if (!bestOption) {
      return {
        bestOption: {
          entry: { name: "No next setup yet" },
          setupScore: { total: currentSetupScore.total }
        },
        lift: 0
      };
    }

    return {
      bestOption,
      lift: Math.max(0, bestOption.setupScore.total - currentSetupScore.total)
    };
  }

  function buildStayCloseReason(entry, currentTension, baselineTarget) {
    const difference = currentTension - baselineTarget;
    if (Math.abs(difference) <= 1.25) {
      return `Stay with ${entry.name} and keep it fresh. The neutral zone is about ${api.formatDecimalNumber(baselineTarget)} lbs.`;
    }

    if (difference > 0) {
      return `Keep the string, but come down toward ${api.formatDecimalNumber(baselineTarget)} lbs for more pocketing.`;
    }

    return `Keep the string, but move back toward ${api.formatDecimalNumber(baselineTarget)} lbs for a cleaner response.`;
  }

  function buildGoalReason(goal, entry, racketFamily, currentEntry) {
    if (goal === "Comfort") {
      return `${entry.name} is the softer option for this ${racketFamily} setup.`;
    }

    if (goal === "Power") {
      return `${entry.name} should give easier depth than ${currentEntry.name}.`;
    }

    if (goal === "Control") {
      return `${entry.name} is the cleaner control option.`;
    }

    if (goal === "Spin") {
      return `${entry.name} is the spin-leaning option in this racket family.`;
    }

    if (goal === "Durability") {
      return `${entry.name} is the sturdier option if string life matters most.`;
    }

    return `${entry.name} keeps the setup close while smoothing out the balance.`;
  }

  function buildSafeReason(currentEntry, candidate, armSensitive) {
    if (candidate.name === currentEntry.name) {
      return "Keep the current string and soften the setup a little.";
    }

    if (armSensitive) {
      return `${candidate.name} is the gentler alternative for the arm.`;
    }

    return `${candidate.name} is the more forgiving alternative.`;
  }

  function selectCandidate({ mode, currentEntry, currentGauge, racketFamily, goal, armSensitive, currentProfile, excludeNames = [] }) {
    const excluded = new Set(excludeNames.filter(Boolean));
    const ranked = api.STRINGS
      .filter((candidate) => !excluded.has(candidate.name))
      .map((candidate) => ({
        candidate,
        score: scoreCandidate(candidate, {
          mode,
          currentEntry,
          currentGauge,
          racketFamily,
          goal,
          armSensitive,
          currentProfile
        })
      }))
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }
        return left.candidate.name.localeCompare(right.candidate.name);
      });

    return ranked[0]?.candidate || null;
  }

  function scoreCandidate(candidate, { mode, currentEntry, currentGauge, racketFamily, goal, armSensitive, currentProfile }) {
    const candidateType = normalizeTypeForTension(candidate.type);
    const currentType = normalizeTypeForTension(currentEntry.type);
    const candidateBaseline = getBaselineTarget(candidateType, racketFamily, armSensitive);
    const candidateProfile = buildMetricProfile(candidate, racketFamily, candidate.gauge, candidateBaseline, candidateBaseline);
    let score = 0;

    if (candidate.racketFamily === racketFamily) {
      score += 6;
    } else if (api.getRacketFamilyGroup(candidate.racketFamily) === api.getRacketFamilyGroup(racketFamily)) {
      score += 3;
    }

    if (candidateType === currentType) {
      score += mode === "stay" ? 4 : 1.5;
    }

    if (candidate.gameStyle === currentEntry.gameStyle) {
      score += 1;
    }

    if (candidate.playerLevel === currentEntry.playerLevel) {
      score += 1;
    }

    const gaugeGap = Math.abs(getGaugeValue(candidate.gauge) - getGaugeValue(currentGauge));
    score += Math.max(0, 2 - gaugeGap);

    const diffSum = ["spin", "control", "comfort", "power", "durability"].reduce((sum, key) => sum + Math.abs(candidateProfile[key] - currentProfile[key]), 0);

    if (mode === "stay") {
      score += 30 - diffSum;
      if (candidate.name === currentEntry.name) {
        score += 8;
      }
      return score;
    }

    if (mode === "goal") {
      const metric = getGoalMetric(goal);
      if (!metric) {
        const averageProfile = (candidateProfile.spin + candidateProfile.control + candidateProfile.comfort + candidateProfile.power + candidateProfile.durability) / 5;
        score += 18 - Math.abs(averageProfile - 7.2) * 4;
      } else {
        score += candidateProfile[metric] * 2.4;

        if (goal === "Spin") {
          score += candidateProfile.control * 0.6;
        } else if (goal === "Control") {
          score += candidateProfile.durability * 0.6;
        } else if (goal === "Power") {
          score += candidateProfile.comfort * 0.4;
        } else if (goal === "Comfort") {
          score += candidateProfile.power * 0.5;
        } else if (goal === "Durability") {
          score += candidateProfile.control * 0.5;
        }
      }

      if (armSensitive) {
        score += candidateProfile.comfort * 0.8;
      }

      score += 10 - diffSum * 0.2;
      return score;
    }

    score += candidateProfile.comfort * 2.2;
    score += candidateProfile.control * 0.9;
    score += candidateProfile.power * 0.3;

    if (candidate.armFriendliness === "High") {
      score += 2;
    }

    if (["Multifilament", "Natural Gut", "Hybrid"].includes(candidateType)) {
      score += 2.5;
    }

    if (candidateType === "Poly" || candidateType === "Co-Poly") {
      score += armSensitive ? -1.5 : -0.3;
    }

    score += 8 - diffSum * 0.18;
    return score;
  }

  function buildMetricProfile(entry, racketFamily, gauge, currentTension, baselineTarget) {
    const comfortBase = (convertLevel(entry.comfort) * 0.75) + (convertLevel(entry.armFriendliness || entry.comfort) * 0.25);
    const startingProfile = {
      spin: convertLevel(entry.spin),
      control: convertLevel(entry.control),
      comfort: Math.round(comfortBase * 10) / 10,
      power: convertLevel(entry.power),
      durability: convertLevel(entry.durability)
    };
    const racketAdjustments = getRacketAdjustments(racketFamily);
    const gaugeAdjustments = getGaugeAdjustments(gauge);
    const tensionAdjustments = getTensionAdjustments(currentTension - baselineTarget);

    return {
      spin: applyAdjustments(startingProfile.spin, [racketAdjustments.spin, gaugeAdjustments.spin, tensionAdjustments.spin]),
      control: applyAdjustments(startingProfile.control, [racketAdjustments.control, gaugeAdjustments.control, tensionAdjustments.control]),
      comfort: applyAdjustments(startingProfile.comfort, [racketAdjustments.comfort, gaugeAdjustments.comfort, tensionAdjustments.comfort]),
      power: applyAdjustments(startingProfile.power, [racketAdjustments.power, gaugeAdjustments.power, tensionAdjustments.power]),
      durability: applyAdjustments(startingProfile.durability, [racketAdjustments.durability, gaugeAdjustments.durability, tensionAdjustments.durability])
    };
  }

  function buildSetupScore({ goal, entry, gauge, racketFamily, armSensitive, currentTension, targetTension, profile }) {
    const normalizedType = normalizeTypeForTension(entry.type);
    const breakdown = [
      { label: "Goal Fit", score: scoreGoalFit(goal, profile), max: 30 },
      { label: "Racket Fit", score: scoreRacketFit(entry.racketFamily, racketFamily), max: 20 },
      { label: "String + Gauge", score: scoreStringGaugeFit(goal, normalizedType, gauge, armSensitive), max: 20 },
      { label: "Tension + Feel", score: scoreTensionFeelFit(currentTension, targetTension), max: 15 },
      { label: "Comfort + Safety", score: scoreComfortSafetyFit(profile, normalizedType, armSensitive, currentTension - targetTension), max: 15 }
    ];

    const total = breakdown.reduce((sum, item) => sum + item.score, 0);
    return {
      total,
      breakdown,
      summary: buildSetupScoreSummary(total, breakdown)
    };
  }

  function scoreGoalFit(goal, profile) {
    if (goal === "Balanced") {
      const averageDelta = ["spin", "control", "comfort", "power", "durability"]
        .reduce((sum, metric) => sum + Math.abs((profile[metric] || 6) - 7), 0) / 5;
      return clampWhole(30 - (averageDelta * 4.5), 10, 30);
    }

    const metric = getGoalMetric(goal);
    const secondaryMetric = {
      Spin: "control",
      Control: "durability",
      Comfort: "power",
      Power: "comfort",
      Durability: "control"
    }[goal] || "control";

    const primaryScore = ((profile[metric] || 6) / 10) * 22;
    const secondaryScore = ((profile[secondaryMetric] || 6) / 10) * 8;
    return clampWhole(primaryScore + secondaryScore, 8, 30);
  }

  function scoreRacketFit(entryRacketFamily, selectedRacketFamily) {
    if (!entryRacketFamily || !selectedRacketFamily) {
      return 14;
    }

    if (entryRacketFamily === selectedRacketFamily) {
      return 20;
    }

    if (api.getRacketFamilyGroup(entryRacketFamily) === api.getRacketFamilyGroup(selectedRacketFamily)) {
      return 17;
    }

    return 12;
  }

  function scoreStringGaugeFit(goal, stringType, gauge, armSensitive) {
    const typeScore = getTypeGoalFit(goal, stringType, armSensitive);
    const gaugeScore = getGaugeGoalFit(goal, gauge, armSensitive);
    return clampWhole((typeScore / 10) * 12 + (gaugeScore / 10) * 8, 5, 20);
  }

  function getTypeGoalFit(goal, stringType, armSensitive) {
    const tables = {
      Balanced: { Poly: 6.5, "Co-Poly": 7.5, "Synthetic Gut": 7, Multifilament: 7, "Natural Gut": 7.5, Hybrid: 8 },
      Spin: { Poly: 10, "Co-Poly": 9.5, Hybrid: 7.5, "Synthetic Gut": 5.5, Multifilament: 4.5, "Natural Gut": 4 },
      Control: { Poly: 8.5, "Co-Poly": 9.5, Hybrid: 7.5, "Synthetic Gut": 6.5, Multifilament: 5.5, "Natural Gut": 5.5 },
      Power: { Poly: 4.5, "Co-Poly": 5.5, Hybrid: 7, "Synthetic Gut": 8, Multifilament: 9, "Natural Gut": 10 },
      Comfort: { Poly: 4, "Co-Poly": 5, Hybrid: 8, "Synthetic Gut": 7.5, Multifilament: 9.5, "Natural Gut": 10 },
      Durability: { Poly: 10, "Co-Poly": 9, Hybrid: 7.5, "Synthetic Gut": 6, Multifilament: 4.5, "Natural Gut": 3.5 }
    };

    let score = (tables[goal] && tables[goal][stringType]) || 7;
    if (armSensitive && (stringType === "Poly" || stringType === "Co-Poly")) {
      score -= 1.2;
    }
    if (armSensitive && (stringType === "Multifilament" || stringType === "Natural Gut" || stringType === "Hybrid")) {
      score += 0.6;
    }
    return api.clampNumber(score, 1, 10);
  }

  function getGaugeGoalFit(goal, gauge, armSensitive) {
    const ideals = {
      Balanced: 16.5,
      Spin: 17.25,
      Control: 16.25,
      Power: 16.75,
      Comfort: 17,
      Durability: 16
    };

    let ideal = ideals[goal] || 16.5;
    if (armSensitive && (goal === "Balanced" || goal === "Comfort")) {
      ideal += 0.25;
    }

    const score = 10 - (Math.abs(getGaugeValue(gauge) - ideal) * 3.5);
    return api.clampNumber(score, 2, 10);
  }

  function scoreTensionFeelFit(currentTension, targetTension) {
    return clampWhole(15 - (Math.abs(currentTension - targetTension) * 2.2), 3, 15);
  }

  function scoreComfortSafetyFit(profile, stringType, armSensitive, tensionDifference) {
    let score = ((profile.comfort || 6) / 10) * 10;

    if (stringType === "Multifilament" || stringType === "Natural Gut" || stringType === "Hybrid") {
      score += 2;
    }

    if (stringType === "Poly" || stringType === "Co-Poly") {
      score += armSensitive ? -2.5 : -1;
    }

    score += api.clampNumber(-tensionDifference * 0.8, -2.5, 2.5);

    if (armSensitive) {
      score += 2;
    }

    return clampWhole(score, 2, 15);
  }

  function buildSetupScoreSummary(total, breakdown) {
    const ordered = breakdown
      .map((item) => ({ ...item, ratio: item.score / item.max }))
      .sort((left, right) => right.ratio - left.ratio);
    const strongest = ordered[0]?.label || "Goal Fit";
    const weakest = ordered[ordered.length - 1]?.label || "Comfort + Safety";

    if (total >= 85) {
      return `Excellent overall fit. ${strongest} is the strongest part of this setup.`;
    }

    if (total >= 75) {
      return `Strong overall fit, with the biggest drag coming from ${weakest.toLowerCase()}.`;
    }

    if (total >= 65) {
      return `Solid base, but ${weakest.toLowerCase()} is still costing you some performance.`;
    }

    return `Playable, but there is clear room to improve, especially in ${weakest.toLowerCase()}.`;
  }

  function clampWhole(value, min, max) {
    return Math.round(api.clampNumber(value, min, max));
  }

  function applyAdjustments(base, adjustments) {
    const total = adjustments.reduce((sum, value) => sum + value, base);
    return Math.round(api.clampNumber(total, 1, 10));
  }

  function convertLevel(value) {
    return (api.mapStringLevelToNumeric(value) * 2) + 2;
  }

  function getRacketAdjustments(racketFamily) {
    const group = api.getRacketFamilyGroup(racketFamily);

    if (group === "spin") {
      return { spin: 1.1, control: 0.3, comfort: -0.3, power: 0.2, durability: 0 };
    }

    if (group === "power") {
      return { spin: -0.2, control: -0.8, comfort: 0.4, power: 1.1, durability: 0 };
    }

    return { spin: 0.3, control: 1.1, comfort: -0.1, power: -0.7, durability: 0.2 };
  }

  function getGaugeAdjustments(gauge) {
    const delta = getGaugeValue(gauge) - 16;

    return {
      spin: delta * 0.5,
      control: delta * -0.2,
      comfort: delta * 0.35,
      power: delta * 0.25,
      durability: delta * -0.75
    };
  }

  function getTensionAdjustments(difference) {
    const capped = api.clampNumber(difference, -6, 6);

    return {
      spin: -capped * 0.15,
      control: capped * 0.45,
      comfort: -capped * 0.5,
      power: -capped * 0.3,
      durability: capped * 0.15
    };
  }

  function getBaselineTarget(type, racketFamily, armSensitive) {
    const base = api.TENSION_TYPE_BASE[type] || api.TENSION_TYPE_BASE["Co-Poly"];
    const racketAdjustment = api.TENSION_RACKET_ADJUSTMENTS[racketFamily] || 0;
    const armAdjustment = armSensitive ? api.TENSION_ARM_ADJUSTMENTS.Sensitive : 0;
    return api.clampNumber(base + racketAdjustment + armAdjustment, 42, 58);
  }

  function getPreferredTargetTension(type, racketFamily, preference, armSensitive) {
    const base = api.TENSION_TYPE_BASE[type] || api.TENSION_TYPE_BASE["Co-Poly"];
    const racketAdjustment = api.TENSION_RACKET_ADJUSTMENTS[racketFamily] || 0;
    const preferenceAdjustment = api.TENSION_FEEL_ADJUSTMENTS[preference] || 0;
    const armAdjustment = armSensitive ? api.TENSION_ARM_ADJUSTMENTS.Sensitive : 0;
    return api.clampNumber(base + racketAdjustment + preferenceAdjustment + armAdjustment, 42, 58);
  }

  function describeTensionPosition(difference) {
    const abs = Math.abs(difference);

    if (abs < 1.25) {
      return {
        label: "Balanced Zone",
        detail: "Very close to a neutral starting point",
        positionText: "very close to that neutral zone"
      };
    }

    if (difference >= 3) {
      return {
        label: "Firm Side",
        detail: "Well above a balanced starting point",
        positionText: `${api.formatDecimalNumber(abs)} lbs above that neutral zone`
      };
    }

    if (difference >= 1.25) {
      return {
        label: "Slightly Firm",
        detail: "A little above neutral",
        positionText: `${api.formatDecimalNumber(abs)} lbs above that neutral zone`
      };
    }

    if (difference <= -3) {
      return {
        label: "Low Side",
        detail: "Well below a balanced starting point",
        positionText: `${api.formatDecimalNumber(abs)} lbs below that neutral zone`
      };
    }

    return {
      label: "Slightly Low",
      detail: "A little below neutral",
      positionText: `${api.formatDecimalNumber(abs)} lbs below that neutral zone`
    };
  }

  function getRacketDescriptor(racketFamily) {
    const group = api.getRacketFamilyGroup(racketFamily);

    if (group === "spin") {
      return "A spin-oriented frame";
    }

    if (group === "power") {
      return "A power-oriented frame";
    }

    return "A control-oriented frame";
  }

  function getStringDescriptor(entry) {
    const type = normalizeTypeForTension(entry.type);

    if (type === "Poly" || type === "Co-Poly") {
      if (entry.stringShape === "Shaped") {
        return "a spin-oriented shaped poly";
      }

      return `${(entry.feel || "firm").toLowerCase()} control-oriented ${type.toLowerCase()}`;
    }

    if (type === "Multifilament") {
      return "a softer multifilament";
    }

    if (type === "Natural Gut") {
      return "premium natural gut";
    }

    if (type === "Hybrid") {
      return "a blended hybrid";
    }

    if (type === "Synthetic Gut") {
      return "a balanced synthetic gut";
    }

    return `${type.toLowerCase()} setup`;
  }

  function buildStrengths(profile, tensionDifference) {
    const metricMessages = {
      spin: "Good bite and shape on full swings.",
      control: "Predictable response when you swing out.",
      comfort: "More forgiving impact than a firm full bed.",
      power: "Easier depth without overswinging.",
      durability: "Should hold up fairly well."
    };

    const strengths = Object.entries(profile)
      .sort((left, right) => right[1] - left[1])
      .slice(0, 3)
      .map(([metric]) => metricMessages[metric]);

    if (Math.abs(tensionDifference) <= 1.5) {
      strengths.push("Tension is close to a balanced starting zone.");
    } else if (tensionDifference < -1.5) {
      strengths.push("Lower tension should add a little pocketing.");
    } else {
      strengths.push("Firmer tension should keep the response crisp.");
    }

    return [...new Set(strengths)].slice(0, 4);
  }

  function buildWatchouts(profile, tensionDifference, armSensitive) {
    const metricMessages = {
      spin: "It may not give much free bite.",
      control: "The launch window may feel less precise.",
      comfort: "Comfort may be the main tradeoff.",
      power: "It may feel underpowered.",
      durability: "It may not last especially long."
    };

    const watchouts = Object.entries(profile)
      .sort((left, right) => left[1] - right[1])
      .slice(0, 2)
      .map(([metric]) => metricMessages[metric]);

    if (armSensitive && profile.comfort <= 6) {
      watchouts.push("It may be too demanding if your arm is already sensitive.");
    }

    if (tensionDifference >= 2.5) {
      watchouts.push("Tension looks firm for this setup.");
    } else if (tensionDifference <= -2.5) {
      watchouts.push("Tension is low, so it may feel lively but less disciplined.");
    }

    if ((profile.spin + profile.power) <= 11) {
      watchouts.push("You may need to create most of the offense yourself.");
    }

    return [...new Set(watchouts)].slice(0, 4);
  }

  function buildAdjustment(entry, gauge, currentTension, baselineTarget, tensionDifference, goal, armSensitive, profile) {
    const normalizedType = normalizeTypeForTension(entry.type);
    const gaugeValue = getGaugeValue(gauge);

    if (armSensitive && profile.comfort <= 6) {
      if (tensionDifference >= 0.5) {
        return {
          title: "Drop tension 2 lbs first",
          text: "This is the fastest way to add pocketing and reduce sting.",
          note: "If it still feels harsh, move to a softer poly, hybrid, or multi."
        };
      }

      return {
        title: "Move to a softer version of this setup",
        text: "Comfort looks like the main issue. Stay in the same racket lane, but use a softer string.",
        note: "Use the softer alternative below if the bed feels too demanding."
      };
    }

    if (goal === "Comfort") {
      if (tensionDifference > -0.5) {
        return {
          title: "Drop tension 2 lbs first",
          text: "This keeps the same string but adds comfort and pocketing.",
          note: "If you still want more relief, switch to a softer string family."
        };
      }

      return {
        title: "Try a softer string family next",
        text: "You are already on the low side, so the cleaner comfort move is a softer string.",
        note: "Hybrid, multifilament, or natural gut make the most sense here."
      };
    }

    if (goal === "Power") {
      if (tensionDifference >= -1) {
        return {
          title: "Drop tension 1-2 lbs first",
          text: "This is the simplest way to add depth and liveliness.",
          note: "If that is not enough, move to a more powerful string."
        };
      }

      return {
        title: "Move to a livelier string before going lower",
        text: "You are already on the low side, so the better power move is the string itself.",
        note: "Look for a livelier multi, gut, or synthetic gut."
      };
    }

    if (goal === "Control") {
      if (tensionDifference <= 1) {
        return {
          title: "Raise tension 1-2 lbs first",
          text: "This is the quickest way to clean up the launch window.",
          note: "If it still launches too freely, move to a firmer control string."
        };
      }

      return {
        title: "Stay near this tension and change the string",
        text: "Tension is already firm, so the better control move is the string.",
        note: "The control recommendation below is the cleaner next step."
      };
    }

    if (goal === "Spin") {
      if (entry.stringShape === "Round") {
        return {
          title: "Try a shaped or thinner-gauge version first",
          text: "For a real spin gain, change the string geometry before making a small tension tweak.",
          note: "A shaped or thinner option usually changes bite more than 1-2 lbs alone."
        };
      }

      if (tensionDifference > 1.5) {
        return {
          title: "Drop tension 1-2 lbs first",
          text: "If the bed feels tight, a small drop can help it snap back more freely.",
          note: "That keeps the same spin personality while opening the feel."
        };
      }

      return {
        title: "Test a thinner gauge next",
        text: "A thinner gauge is the cleaner next move if you want more bite.",
        note: "That is usually better for spin than blindly raising tension."
      };
    }

    if (goal === "Durability") {
      if (gaugeValue >= 17) {
        return {
          title: "Move to a thicker gauge first",
          text: "If string life matters most, start with a thicker version of the same setup.",
          note: "That usually preserves the feel better than a full switch."
        };
      }

      if (!(normalizedType === "Poly" || normalizedType === "Co-Poly")) {
        return {
          title: "Move to a sturdier string family",
          text: "You are not especially thin on gauge, so the next durability gain is the string family.",
          note: "A firmer poly or more durable hybrid is the next step."
        };
      }

      return {
        title: "Keep the type and restring before it goes dead",
        text: "Durability is already part of the setup. The bigger risk is leaving it in too long.",
        note: "Fresh poly usually beats old poly strung tighter."
      };
    }

    if (Math.abs(tensionDifference) > 1.5) {
      return {
        title: "Move closer to the balanced starting zone",
        text: `The simplest clean-up move is to bring it back toward ${api.formatDecimalNumber(baselineTarget)} lbs first.`,
        note: "That gives you a cleaner read on the string itself."
      };
    }

    return {
      title: "Keep the setup and manage freshness",
      text: "Nothing looks dramatically off. The first win is keeping it fresh.",
      note: "Then use the next options only if you want a clearer change."
    };
  }

  function getGoalMetric(goal) {
    const metrics = {
      Spin: "spin",
      Comfort: "comfort",
      Power: "power",
      Control: "control",
      Durability: "durability"
    };

    return metrics[goal] || "";
  }

  function inferPreference(goal, armSensitive) {
    if (armSensitive) {
      return "Comfort";
    }

    if (goal === "Comfort" || goal === "Power") {
      return "Comfort";
    }

    if (goal === "Control" || goal === "Durability") {
      return "Control";
    }

    return "Balanced";
  }

  function normalizeTypeForTension(type) {
    if (api.TENSION_TYPE_BASE[type]) {
      return type;
    }

    if (type === "Hybrid-Style Multi") {
      return "Multifilament";
    }

    return "Co-Poly";
  }

  function buildTensionRecommendation(entry, racketFamily, preference, armSensitive) {
    return api.buildTensionCalculatorRecommendation({
      type: normalizeTypeForTension(entry.type),
      racketFamily,
      preference,
      armComfort: armSensitive ? "Sensitive" : "Normal"
    });
  }

  function getGaugeValue(gauge) {
    const text = String(gauge || "").trim().toUpperCase();
    const match = text.match(/(\d+)/);
    if (!match) {
      return 16;
    }

    let numeric = Number(match[1]);
    if (text.includes("L")) {
      numeric += 0.5;
    }

    return numeric;
  }

  function findStringEntryByName(value) {
    const target = String(value || "").trim().toLowerCase();
    if (!target) {
      return null;
    }

    return api.STRINGS.find((entry) => String(entry.name || "").trim().toLowerCase() === target) || null;
  }

  function openRecommendationInTensionCalculator(index) {
    const option = state.latestReport?.recommendations?.[index];
    if (!option) {
      return;
    }

    api.persistTensionCalculatorSource?.({
      sourceLabel: "Analyze Your Current Setup",
      name: option.entry.name,
      gauge: option.displayGauge,
      type: option.calculatorType,
      entryRacketFamily: option.entry.racketFamily,
      appliedRacketFamily: option.appliedRacketFamily,
      inferredPreference: option.appliedPreference,
      player: "Any",
      tensionDisplay: option.tensionRecommendation
        ? {
            label: option.tensionRecommendation.lbsRange,
            detail: `${option.tensionRecommendation.kgRange} starting range`
          }
        : null,
      playerTension: null,
      playerRacket: null
    });

    api.trackToolUsage?.("setup_analyzer_open_tension", "Open Analyzer Recommendation", {
      recommendation: option.entry.name,
      label: option.label
    });

    window.location.href = "./tension-calculator.html";
  }

  function emailCurrentSetupReportToStringer() {
    const report = state.latestReport;
    if (!report || report.error) {
      return;
    }

    const lines = [
      "Hi,",
      "",
      "Could you please take a look at my current setup and the suggested next options?",
      "",
      "Current setup:",
      `Racket: ${report.racketFamily}`,
      `String: ${report.entry.name}`,
      `String type: ${report.entry.type}`,
      `Gauge: ${report.gauge}`,
      `Current tension: ${api.formatDecimalNumber(report.currentTension)} lbs`,
      `Main goal: ${report.goal}`,
      `Arm discomfort noted: ${report.armSensitive ? "Yes" : "No"}`,
      "",
      "Snapshot:",
      report.snapshotSummary,
      `Tension check: ${report.tensionPosition.label}${report.tensionPosition.detail ? ` (${report.tensionPosition.detail})` : ""}`,
      "",
      "Best first adjustment:",
      `${report.adjustment.title} - ${report.adjustment.text}`,
      report.adjustment.note || "",
      "",
      "Recommended next setups:",
      ...report.recommendations.map((option, index) => `${index + 1}. ${option.label}: ${option.entry.name} ${option.displayGauge} | ${option.tensionRecommendation ? option.tensionRecommendation.lbsRange : "Use Tension Calculator"} | ${option.reason}`),
      "",
      "Generated with TennisSetup.com"
    ].filter(Boolean);

    api.trackToolUsage?.("setup_analyzer_email_stringer", "Email Analyzer Report", {
      currentString: report.entry.name,
      racketFamily: report.racketFamily,
      goal: report.goal
    });

    api.openMailDraft?.({
      subject: `Current setup report: ${report.entry.name} ${report.gauge} @ ${api.formatDecimalNumber(report.currentTension)} lbs`,
      body: lines.join("\n")
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function formatTensionOption(value) {
    return Number.isInteger(value) ? `${value} lbs` : `${value.toFixed(1)} lbs`;
  }
})();
