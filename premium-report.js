(() => {
  const analyzerApi = window.TENNIS_SETUP_ANALYZER_API;
  const premiumApi = window.TennisSetupPremiumReportApi;
  const recommendationApi = window.TennisSetupRecommendations;

  if (!analyzerApi || !premiumApi || !recommendationApi) {
    return;
  }

  const problemLabels = {
    spin: "Need more spin",
    power: "Too much power",
    control: "Need more control",
    comfort: "Arm discomfort"
  };

  const feelLabels = {
    soft: "Softer feel",
    balanced: "Balanced feel",
    crisp: "Crisper feel"
  };

  const goalByProblem = {
    spin: "Spin",
    power: "Control",
    control: "Control",
    comfort: "Comfort"
  };

  const racketFamilyByRecommendation = {
    pureaero: "Babolat Pure Aero",
    blade: "Wilson Blade",
    puredrive: "Babolat Pure Drive",
    speed: "Head Speed",
    clash: "Wilson Clash",
    ezone: "Yonex Ezone",
    other: ""
  };

  const elements = {
    title: document.getElementById("premiumHeroTitle"),
    summary: document.getElementById("premiumHeroSummary"),
    contextStrip: document.getElementById("premiumContextStrip"),
    contextNote: document.getElementById("premiumContextNote"),
    primaryAction: document.getElementById("premiumHeroPrimaryAction"),
    secondaryAction: document.getElementById("premiumHeroSecondaryAction"),
    scoreboard: document.getElementById("premiumHeroScoreboard"),
    builder: document.getElementById("premiumReportBuilder"),
    racket: document.getElementById("premiumReportRacket"),
    gauge: document.getElementById("premiumReportGauge"),
    string: document.getElementById("premiumReportString"),
    tension: document.getElementById("premiumReportTension"),
    goal: document.getElementById("premiumReportGoal"),
    arm: document.getElementById("premiumReportArm"),
    button: document.getElementById("premiumReportButton"),
    returnLink: document.getElementById("premiumReturnLink"),
    shell: document.getElementById("premiumReportShell")
  };

  const state = {
    recommendationState: null,
    latestReport: null,
    source: "",
    initialReportLoaded: false
  };

  init();

  function init() {
    populateControls();
    bindEvents();

    const params = new URLSearchParams(window.location.search);
    state.source = String(params.get("source") || "").trim();
    state.recommendationState = getRecommendationState(params);

    applyPrefilledValues(getPrefillValues(params));
    renderHero(null);
    updateReturnLinks();

    if (hasReportValues(params)) {
      renderPremiumReport(buildReportFromControls(), { replaceUrl: false });
      state.initialReportLoaded = true;
      return;
    }

    renderEmptyState();
  }

  function bindEvents() {
    elements.string?.addEventListener("change", () => syncGaugeWithString(true));
    elements.gauge?.addEventListener("change", () => {
      elements.gauge.dataset.autofilled = "false";
    });
    elements.button?.addEventListener("click", () => {
      renderPremiumReport(buildReportFromControls(), { replaceUrl: true, track: true });
    });
  }

  function populateControls() {
    const racketOptions = (analyzerApi.FILTERS.find((filter) => filter.key === "racketFamily")?.options || [])
      .filter((value) => value !== "Any");
    const gaugeOptions = (analyzerApi.FILTERS.find((filter) => filter.key === "gauge")?.options || [])
      .filter((value) => value !== "Any");
    const stringNames = [...new Set((analyzerApi.STRINGS || []).map((entry) => entry.name))]
      .sort((left, right) => left.localeCompare(right));
    const tensions = [];

    for (let tension = 35; tension <= 65; tension += 0.5) {
      tensions.push(Number(tension.toFixed(1)));
    }

    if (elements.racket) {
      elements.racket.innerHTML = `
        <option value="">Choose your racket family</option>
        ${racketOptions.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}
      `;
    }

    if (elements.gauge) {
      elements.gauge.innerHTML = `
        <option value="">Choose your gauge</option>
        ${gaugeOptions.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}
      `;
      elements.gauge.dataset.autofilled = "false";
    }

    if (elements.string) {
      elements.string.innerHTML = `
        <option value="">Choose your current string</option>
        ${stringNames.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}
      `;
    }

    if (elements.tension) {
      elements.tension.innerHTML = `
        <option value="">Choose your current tension</option>
        ${tensions.map((value) => `<option value="${value}">${escapeHtml(formatTensionOption(value))}</option>`).join("")}
      `;
    }
  }

  function getRecommendationState(params) {
    const hasRecommendationValues = ["problem", "style", "feel", "racket"].some((key) => params.has(key));
    if (!hasRecommendationValues) {
      return null;
    }

    return recommendationApi.normalizeState({
      problem: params.get("problem") || "spin",
      style: params.get("style") || "baseline",
      feel: params.get("feel") || "balanced",
      racket: params.get("racket") || "pureaero"
    });
  }

  function getPrefillValues(params) {
    const values = {
      racketFamily: String(params.get("racketFamily") || "").trim(),
      gauge: String(params.get("gauge") || "").trim(),
      string: String(params.get("string") || "").trim(),
      tension: String(params.get("tension") || "").trim(),
      goal: String(params.get("goal") || "").trim(),
      arm: parseBoolean(params.get("arm"))
    };

    if (!values.racketFamily && state.recommendationState) {
      values.racketFamily = mapRecommendationRacketToFamily(state.recommendationState.racket);
    }

    if (!values.goal && state.recommendationState) {
      values.goal = goalByProblem[state.recommendationState.problem] || "Balanced";
    }

    if (!values.goal) {
      values.goal = "Balanced";
    }

    if (!values.tension) {
      values.tension = "50";
    }

    return values;
  }

  function applyPrefilledValues(values) {
    if (elements.racket && hasOption(elements.racket, values.racketFamily)) {
      elements.racket.value = values.racketFamily;
    }

    if (elements.string && hasOption(elements.string, values.string)) {
      elements.string.value = values.string;
    }

    if (elements.gauge) {
      if (values.gauge && hasOption(elements.gauge, values.gauge)) {
        elements.gauge.value = values.gauge;
        elements.gauge.dataset.autofilled = "false";
      } else {
        syncGaugeWithString(true);
      }
    }

    if (elements.tension && hasOption(elements.tension, values.tension)) {
      elements.tension.value = values.tension;
    }

    if (elements.goal && hasOption(elements.goal, values.goal)) {
      elements.goal.value = values.goal;
    }

    if (elements.arm) {
      elements.arm.checked = values.arm;
    }
  }

  function hasReportValues(params) {
    return ["racketFamily", "gauge", "string", "tension"].every((key) => {
      const value = String(params.get(key) || "").trim();
      return value.length > 0;
    });
  }

  function buildReportFromControls() {
    return premiumApi.buildAnalyzerReportFromValues({
      racketFamily: elements.racket?.value || "",
      gauge: elements.gauge?.value || "",
      string: elements.string?.value || "",
      currentTension: Number(elements.tension?.value),
      goal: elements.goal?.value || "Balanced",
      armSensitive: Boolean(elements.arm?.checked)
    });
  }

  function syncGaugeWithString(force) {
    const entry = findStringEntryByName(elements.string?.value || "");
    if (!entry || !elements.gauge) {
      return;
    }

    const shouldAutofill = force || !elements.gauge.value || elements.gauge.dataset.autofilled === "true";
    if (!shouldAutofill) {
      return;
    }

    if (hasOption(elements.gauge, entry.gauge)) {
      elements.gauge.value = entry.gauge;
      elements.gauge.dataset.autofilled = "true";
    }
  }

  function renderEmptyState(error) {
    state.latestReport = null;
    renderHero(error);

    if (!elements.shell) {
      return;
    }

    if (error && error.error) {
      elements.shell.innerHTML = `
        <section class="premium-empty-card">
          <p class="landing-eyebrow landing-eyebrow-muted">Need one more detail</p>
          <h3>${escapeHtml(error.error.title)}</h3>
          <p>${escapeHtml(error.error.text)}</p>
        </section>
      `;
      return;
    }

    elements.shell.innerHTML = `
      <section class="premium-empty-card">
        <p class="landing-eyebrow landing-eyebrow-muted">Premium Report</p>
        <h3>Build your full report</h3>
        <p>Add your current setup details to turn the recommendation engine into one clean action page with your current score, best next setup, score lift, and one safer backup option.</p>
      </section>
    `;
  }

  function renderHero(reportOrError) {
    const recommendation = state.recommendationState
      ? recommendationApi.buildRecommendation(state.recommendationState)
      : null;
    const report = reportOrError && !reportOrError.error ? reportOrError : null;

    if (elements.title) {
      if (report) {
        elements.title.textContent = "Your Premium Report is ready.";
      } else if (recommendation) {
        elements.title.textContent = "Turn this recommendation into your Premium Report.";
      } else if (hasCurrentSetupPrefill()) {
        elements.title.textContent = "Your current setup is ready for a Premium Report.";
      } else {
        elements.title.textContent = "Build your personalized setup report.";
      }
    }

    if (elements.summary) {
      if (report) {
        const bestOption = report.scoreLift.bestOption;
        elements.summary.textContent = `Current setup score ${report.setupScore.total}/100. Best next setup is ${bestOption.entry.name} ${bestOption.displayGauge} at ${bestOption.setupScore.total}/100, with ${report.scoreLift.lift} points of upside.`;
      } else if (recommendation) {
        elements.summary.textContent = "We already carried over the recommendation context from your homepage choices. Add what you use now to compare your actual setup against the best next option and a safer backup.";
      } else if (hasCurrentSetupPrefill()) {
        elements.summary.textContent = "We prefilled your current setup details. Use this page to turn that analyzer output into one cleaner report with current score, score lift, backup option, and a stringer-ready handoff.";
      } else {
        elements.summary.textContent = "Enter your current racket, string, gauge, and tension to turn the analyzer into one clean action plan with your current setup score, best next setup, score lift, and safer backup option.";
      }
    }

    renderContextStrip(recommendation);
    renderScoreboard(report, recommendation);
    updateHeroActions(report);
  }

  function renderContextStrip(recommendation) {
    if (!elements.contextStrip || !elements.contextNote) {
      return;
    }

    if (recommendation) {
      elements.contextStrip.innerHTML = [
        problemLabels[recommendation.state.problem] || "Need a better setup",
        recommendation.styleLabel,
        recommendation.racketLabel,
        feelLabels[recommendation.state.feel] || "Balanced feel"
      ].map((value) => `<span>${escapeHtml(value)}</span>`).join("");
      elements.contextStrip.classList.remove("planner-hidden");
      elements.contextNote.textContent = "This is your live quick recommendation context from the homepage. Add your current setup below to see how far your actual setup is from the best next move.";
      elements.contextNote.classList.remove("planner-hidden");
      return;
    }

    if (hasCurrentSetupPrefill()) {
      const detailChips = [
        elements.racket?.value || "",
        elements.string?.value || "",
        elements.gauge?.value ? `${elements.gauge.value} gauge` : "",
        elements.tension?.value ? `${elements.tension.value} lbs` : ""
      ].filter(Boolean);

      if (detailChips.length) {
        elements.contextStrip.innerHTML = detailChips.map((value) => `<span>${escapeHtml(value)}</span>`).join("");
        elements.contextStrip.classList.remove("planner-hidden");
      } else {
        elements.contextStrip.classList.add("planner-hidden");
      }

      elements.contextNote.textContent = "These details were carried over from your current setup flow. Build the report to turn them into one cleaner action plan.";
      elements.contextNote.classList.remove("planner-hidden");
      return;
    }

    elements.contextStrip.innerHTML = "";
    elements.contextStrip.classList.add("planner-hidden");
    elements.contextNote.textContent = "";
    elements.contextNote.classList.add("planner-hidden");
  }

  function renderScoreboard(report, recommendation) {
    if (!elements.scoreboard) {
      return;
    }

    if (report) {
      const bestOption = report.scoreLift.bestOption;
      elements.scoreboard.innerHTML = `
        <p class="landing-eyebrow landing-eyebrow-muted">Premium Report Summary</p>
        <div class="premium-score-summary-grid">
          <article class="premium-score-panel-card">
            <span class="premium-score-kicker">Current Score</span>
            <strong>${report.setupScore.total}/100</strong>
            <p>${escapeHtml(report.setupScore.summary)}</p>
          </article>
          <article class="premium-score-panel-card is-highlight">
            <span class="premium-score-kicker">Best Next Setup</span>
            <strong>${bestOption.setupScore.total}/100</strong>
            <p>${escapeHtml(bestOption.entry.name)} ${escapeHtml(bestOption.displayGauge)} with ${escapeHtml(getTensionLabel(bestOption))} as the cleanest next step.</p>
          </article>
          <article class="premium-score-panel-card">
            <span class="premium-score-kicker">Score Lift</span>
            <strong>+${report.scoreLift.lift}</strong>
            <p>${report.scoreLift.lift > 0 ? "Measured lift from your current setup to the strongest next option." : "Your current setup is already close, so the report is about cleaner execution and backup options."}</p>
          </article>
        </div>
      `;
      return;
    }

    if (recommendation) {
      elements.scoreboard.innerHTML = `
        <p class="landing-eyebrow landing-eyebrow-muted">Recommendation context</p>
        <div class="premium-score-preview-grid">
          <div class="premium-score-preview-card">
            <span class="premium-score-preview-label">Recommended Score</span>
            <strong>${recommendation.score.total}/100</strong>
            <p>${escapeHtml(recommendation.score.summary)}</p>
          </div>
          <div class="premium-score-preview-card">
            <span class="premium-score-preview-label">Suggested Setup</span>
            <strong>${escapeHtml(recommendation.shortTitle)}</strong>
            <p>${escapeHtml(recommendation.meta)}</p>
          </div>
          <div class="premium-score-preview-card">
            <span class="premium-score-preview-label">What Premium adds</span>
            <strong>Current vs. Next</strong>
            <p>Score what you actually use now, then compare it against the recommended setup and one safer backup.</p>
          </div>
        </div>
      `;
      return;
    }

    elements.scoreboard.innerHTML = `
      <p class="landing-eyebrow landing-eyebrow-muted">What this report gives you</p>
      <div class="premium-score-preview-grid">
        <div class="premium-score-preview-card">
          <span class="premium-score-preview-label">Current Score</span>
          <strong>Live</strong>
          <p>Built from your exact string, gauge, racket, and tension.</p>
        </div>
        <div class="premium-score-preview-card">
          <span class="premium-score-preview-label">Best Next Setup</span>
          <strong>Clear</strong>
          <p>One strongest recommendation plus a safer backup path.</p>
        </div>
        <div class="premium-score-preview-card">
          <span class="premium-score-preview-label">Stringer Ready</span>
          <strong>Actionable</strong>
          <p>Email-ready notes so you can actually use the report.</p>
        </div>
      </div>
    `;
  }

  function updateHeroActions(report) {
    if (elements.primaryAction) {
      elements.primaryAction.textContent = report ? "Jump to Report" : "Build My Report";
      elements.primaryAction.href = report ? "#premiumReportShell" : "#premiumReportBuilder";
    }

    updateReturnLinks();
  }

  function updateReturnLinks() {
    const recommendationHref = state.recommendationState
      ? `./setup-result.html?${recommendationApi.toQueryString(state.recommendationState)}`
      : "./analyze-current-setup.html";
    const recommendationLabel = state.recommendationState
      ? "Back to Recommendation"
      : "Open Current Setup Analyzer";

    if (elements.returnLink) {
      elements.returnLink.href = recommendationHref;
      elements.returnLink.textContent = recommendationLabel;
    }

    if (elements.secondaryAction) {
      elements.secondaryAction.href = recommendationHref;
      elements.secondaryAction.textContent = recommendationLabel;
    }
  }

  function renderPremiumReport(report, options = {}) {
    const { replaceUrl = false, track = false } = options;

    if (!report || report.error) {
      renderEmptyState(report || null);
      if (replaceUrl) {
        syncQueryString(null);
      }
      return;
    }

    state.latestReport = report;
    renderHero(report);

    const bestOption = report.scoreLift.bestOption;
    const backupOption = selectBackupOption(report.recommendations, bestOption);
    const recommendation = state.recommendationState
      ? recommendationApi.buildRecommendation(state.recommendationState)
      : null;

    if (elements.shell) {
      elements.shell.innerHTML = buildReportMarkup(report, bestOption, backupOption, recommendation);
      bindReportActions(report, bestOption, backupOption, recommendation);
    }

    if (replaceUrl || !state.initialReportLoaded) {
      syncQueryString(report);
    }

    state.initialReportLoaded = true;

    if (track) {
      analyzerApi.trackToolUsage?.("premium_report_build", "Build Premium Report", {
        source: state.recommendationState ? "recommendation" : state.source || "direct",
        currentString: report.entry.name,
        racketFamily: report.racketFamily,
        goal: report.goal
      });
    }
  }

  function buildReportMarkup(report, bestOption, backupOption, recommendation) {
    return `
      <section class="premium-report-grid">
        <article class="premium-report-card is-accent">
          <p class="landing-eyebrow landing-eyebrow-muted">Current Setup</p>
          <h3>${escapeHtml(report.snapshotTitle)}</h3>
          <p class="premium-report-meta">${escapeHtml(report.snapshotSummary)}</p>
          <div class="premium-report-breakdown">
            <div class="premium-report-breakdown-item">
              <span>Setup score</span>
              <strong>${report.setupScore.total}/100</strong>
            </div>
            <div class="premium-report-breakdown-item">
              <span>Current string</span>
              <strong>${escapeHtml(report.entry.name)} ${escapeHtml(report.gauge)}</strong>
            </div>
            <div class="premium-report-breakdown-item">
              <span>Current tension</span>
              <strong>${escapeHtml(formatTensionValue(report.currentTension))}</strong>
            </div>
            <div class="premium-report-breakdown-item">
              <span>Tension check</span>
              <strong>${escapeHtml(report.tensionPosition.label)}</strong>
            </div>
          </div>
        </article>

        <article class="premium-report-card is-highlight">
          <div class="premium-report-card-topline">
            <p class="landing-eyebrow">Best Next Setup</p>
            <span class="premium-score-lift-badge">+${report.scoreLift.lift} score lift</span>
          </div>
          <h3>${escapeHtml(bestOption.entry.name)} ${escapeHtml(bestOption.displayGauge)}</h3>
          <p class="premium-report-meta">${escapeHtml(bestOption.reason)}</p>
          <div class="premium-report-breakdown">
            <div class="premium-report-breakdown-item">
              <span>Recommended score</span>
              <strong>${bestOption.setupScore.total}/100</strong>
            </div>
            <div class="premium-report-breakdown-item">
              <span>Suggested tension</span>
              <strong>${escapeHtml(getTensionLabel(bestOption))}</strong>
            </div>
            <div class="premium-report-breakdown-item">
              <span>String type</span>
              <strong>${escapeHtml(bestOption.entry.type)}</strong>
            </div>
            <div class="premium-report-breakdown-item">
              <span>Racket lane</span>
              <strong>${escapeHtml(bestOption.appliedRacketFamily)}</strong>
            </div>
          </div>
          <div class="premium-report-actions">
            <a class="landing-button landing-button-secondary" href="${escapeHtml(buildDatabaseHref(bestOption.entry.name))}">Shop This Setup</a>
            <a class="landing-button landing-button-ghost" href="./compare-strings.html">Compare Alternatives</a>
          </div>
        </article>
      </section>

      <section class="premium-report-action-grid">
        <article class="premium-report-card">
          <p class="landing-eyebrow landing-eyebrow-muted">Best First Adjustment</p>
          <h3>${escapeHtml(report.adjustment.title)}</h3>
          <p class="premium-report-meta">${escapeHtml(report.adjustment.text)}</p>
          ${report.adjustment.note ? `<p class="premium-report-meta">${escapeHtml(report.adjustment.note)}</p>` : ""}
        </article>

        <article class="premium-report-card">
          <p class="landing-eyebrow landing-eyebrow-muted">Safer Backup</p>
          <h3>${escapeHtml(backupOption.entry.name)} ${escapeHtml(backupOption.displayGauge)}</h3>
          <p class="premium-report-meta">${escapeHtml(backupOption.reason)}</p>
          <div class="premium-report-breakdown">
            <div class="premium-report-breakdown-item">
              <span>Backup score</span>
              <strong>${backupOption.setupScore.total}/100</strong>
            </div>
            <div class="premium-report-breakdown-item">
              <span>Suggested tension</span>
              <strong>${escapeHtml(getTensionLabel(backupOption))}</strong>
            </div>
          </div>
          <a class="premium-shop-link" href="${escapeHtml(buildDatabaseHref(backupOption.entry.name))}">Open backup setup in the database</a>
        </article>
      </section>

      <article class="premium-report-card">
        <p class="landing-eyebrow landing-eyebrow-muted">Why the score lands here</p>
        <h3>Current setup score breakdown</h3>
        <p class="premium-report-meta">${escapeHtml(report.setupScore.summary)}</p>
        <div class="premium-report-breakdown">
          ${report.setupScore.breakdown.map((item) => `
            <div class="premium-report-breakdown-item">
              <span>${escapeHtml(item.label)}</span>
              <strong>${item.score}/${item.max}</strong>
            </div>
          `).join("")}
        </div>
        <p class="premium-report-meta">${escapeHtml(report.tensionContextLine)}</p>
      </article>

      <section class="premium-report-grid">
        <article class="premium-report-card">
          <p class="landing-eyebrow landing-eyebrow-muted">Strengths</p>
          <h3>What your current setup is already doing well</h3>
          <ul class="premium-report-list">
            ${report.strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>

        <article class="premium-report-card">
          <p class="landing-eyebrow landing-eyebrow-muted">Watch-outs</p>
          <h3>Main tradeoffs to watch</h3>
          <ul class="premium-report-list">
            ${report.watchouts.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
      </section>

      <article class="premium-report-card">
        <p class="landing-eyebrow landing-eyebrow-muted">Stringer-Ready Handoff</p>
        <h3>Use this when you restring</h3>
        <ul class="premium-report-list">
          <li>Current setup: ${escapeHtml(report.entry.name)} ${escapeHtml(report.gauge)} in ${escapeHtml(report.racketFamily)} at ${escapeHtml(formatTensionValue(report.currentTension))}.</li>
          <li>Best next setup: ${escapeHtml(bestOption.entry.name)} ${escapeHtml(bestOption.displayGauge)} at ${escapeHtml(getTensionLabel(bestOption))}.</li>
          <li>Safer backup: ${escapeHtml(backupOption.entry.name)} ${escapeHtml(backupOption.displayGauge)} at ${escapeHtml(getTensionLabel(backupOption))}.</li>
          <li>First adjustment to try: ${escapeHtml(report.adjustment.title)}.</li>
          ${recommendation ? `<li>Recommendation context: ${escapeHtml(problemLabels[recommendation.state.problem] || "Need a better setup")}, ${escapeHtml(recommendation.styleLabel)}, ${escapeHtml(recommendation.racketLabel)}.</li>` : ""}
        </ul>
        <div class="premium-report-actions">
          <button id="premiumEmailStringerButton" class="landing-button landing-button-primary" type="button">Email Report to Stringer</button>
          <a class="landing-button landing-button-ghost" href="${escapeHtml(buildDatabaseHref(bestOption.entry.name))}">Open Best Setup in Database</a>
          <a class="landing-button landing-button-ghost" href="./compare-strings.html">Compare Alternatives</a>
        </div>
      </article>
    `;
  }

  function bindReportActions(report, bestOption, backupOption, recommendation) {
    const emailButton = document.getElementById("premiumEmailStringerButton");
    if (!emailButton) {
      return;
    }

    emailButton.addEventListener("click", () => {
      const draft = buildStringerDraft(report, bestOption, backupOption, recommendation);
      analyzerApi.trackToolUsage?.("premium_report_email_stringer", "Email Premium Report", {
        currentString: report.entry.name,
        recommendedString: bestOption.entry.name,
        goal: report.goal
      });
      analyzerApi.openMailDraft?.(draft);
    });
  }

  function buildStringerDraft(report, bestOption, backupOption, recommendation) {
    const lines = [
      "Hi,",
      "",
      "Could you please help me string this setup based on my current setup report?",
      "",
      "Current setup:",
      `Racket: ${report.racketFamily}`,
      `String: ${report.entry.name}`,
      `Gauge: ${report.gauge}`,
      `Tension: ${formatTensionValue(report.currentTension)}`,
      `Current setup score: ${report.setupScore.total}/100`,
      "",
      "Best next setup:",
      `${bestOption.entry.name} ${bestOption.displayGauge}`,
      `Suggested tension: ${getTensionLabel(bestOption)}`,
      `Recommended setup score: ${bestOption.setupScore.total}/100`,
      `Why: ${bestOption.reason}`,
      "",
      "Safer backup:",
      `${backupOption.entry.name} ${backupOption.displayGauge}`,
      `Suggested tension: ${getTensionLabel(backupOption)}`,
      `Backup score: ${backupOption.setupScore.total}/100`,
      "",
      "Best first adjustment:",
      `${report.adjustment.title} - ${report.adjustment.text}`,
      report.adjustment.note || "",
      recommendation ? "Recommendation context:" : "",
      recommendation ? `${problemLabels[recommendation.state.problem] || "Need a better setup"} | ${recommendation.styleLabel} | ${recommendation.racketLabel} | ${feelLabels[recommendation.state.feel] || "Balanced feel"}` : "",
      "",
      "Generated with TennisSetup.com"
    ].filter(Boolean);

    return {
      subject: `Premium setup report: ${bestOption.entry.name} ${bestOption.displayGauge}`.trim(),
      body: lines.join("\n")
    };
  }

  function selectBackupOption(options, bestOption) {
    const candidates = (options || []).filter((option) => option !== bestOption);
    const safeOption = candidates.find((option) => /safer|softer/i.test(option.label));
    return safeOption || candidates[0] || bestOption;
  }

  function syncQueryString(report) {
    if (typeof window === "undefined" || !window.history?.replaceState) {
      return;
    }

    const params = new URLSearchParams();

    if (state.recommendationState) {
      params.set("problem", state.recommendationState.problem);
      params.set("style", state.recommendationState.style);
      params.set("feel", state.recommendationState.feel);
      params.set("racket", state.recommendationState.racket);
    }

    if (report && !report.error) {
      params.set("source", state.source || "premium");
      params.set("racketFamily", report.racketFamily);
      params.set("gauge", report.gauge);
      params.set("string", report.entry.name);
      params.set("tension", String(report.currentTension));
      params.set("goal", report.goal);
      params.set("arm", report.armSensitive ? "1" : "0");
    }

    const query = params.toString();
    const targetUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
    window.history.replaceState({}, "", targetUrl);
  }

  function hasCurrentSetupPrefill() {
    return Boolean((elements.racket?.value || "") || (elements.string?.value || "") || (elements.gauge?.value || ""));
  }

  function findStringEntryByName(value) {
    const target = String(value || "").trim().toLowerCase();
    if (!target) {
      return null;
    }

    return (analyzerApi.STRINGS || []).find((entry) => String(entry.name || "").trim().toLowerCase() === target) || null;
  }

  function mapRecommendationRacketToFamily(value) {
    return racketFamilyByRecommendation[value] || "";
  }

  function buildDatabaseHref(stringName) {
    return `./master-list.html?q=${encodeURIComponent(stringName)}`;
  }

  function getTensionLabel(option) {
    return option?.tensionRecommendation?.lbsRange || "Use the Tension Calculator";
  }

  function formatTensionOption(value) {
    return Number.isInteger(value) ? `${value} lbs` : `${value.toFixed(1)} lbs`;
  }

  function formatTensionValue(value) {
    return `${analyzerApi.formatDecimalNumber(Number(value))} lbs`;
  }

  function parseBoolean(value) {
    return ["1", "true", "yes", "on"].includes(String(value || "").trim().toLowerCase());
  }

  function hasOption(select, value) {
    return Array.from(select.options || []).some((option) => option.value === value);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }
})();
