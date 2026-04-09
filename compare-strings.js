(() => {
  const strings = Array.isArray(window.TENNIS_STRING_DATA)
    ? window.TENNIS_STRING_DATA
    : Array.isArray(window.TENNIS_STRING_PLANNER_STRINGS)
      ? window.TENNIS_STRING_PLANNER_STRINGS
      : [];

  if (!strings.length) {
    return;
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

  const elements = {
    stringA: document.getElementById("compareStringA"),
    stringB: document.getElementById("compareStringB"),
    stringList: document.getElementById("compareStringList"),
    racketFamily: document.getElementById("compareRacketFamily"),
    button: document.getElementById("compareStringsButton"),
    report: document.getElementById("compareStringsReport")
  };

  if (!elements.stringA || !elements.stringB || !elements.racketFamily || !elements.button || !elements.report) {
    return;
  }

  populateControls();

  elements.button.addEventListener("click", () => {
    const comparison = buildComparison();
    renderComparison(comparison);
    if (!comparison.error) {
      trackToolUsage("compare_strings_run", "Compare Strings", {
        leftString: comparison.left.name,
        rightString: comparison.right.name,
        racketFamily: comparison.racketFamily || ""
      });
    }
  });

  function populateControls() {
    const names = [...new Set(strings.map((entry) => entry.name))].sort((left, right) => left.localeCompare(right));
    const racketFamilies = getOrderedOptions(
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
    );

    elements.stringList.innerHTML = names
      .map((name) => `<option value="${escapeHtml(name)}"></option>`)
      .join("");

    elements.racketFamily.innerHTML = `
      <option value="">Any racket family</option>
      ${racketFamilies.map((family) => `<option value="${escapeHtml(family)}">${escapeHtml(family)}</option>`).join("")}
    `;
  }

  function buildComparison() {
    const left = findStringEntryByName(elements.stringA.value);
    const right = findStringEntryByName(elements.stringB.value);
    const racketFamily = elements.racketFamily.value || "";

    if (!left || !right) {
      return {
        error: {
          title: "Choose 2 strings from the database",
          text: "Start typing both strings and pick names the database recognizes so the tool can compare their actual stored profiles."
        }
      };
    }

    if (left.name === right.name) {
      return {
        error: {
          title: "Choose 2 different strings",
          text: "Use two different strings so the comparison can highlight where one setup leans more toward spin, control, comfort, power, or durability."
        }
      };
    }

    const metricRows = buildMetricRows(left, right);
    const leftPros = getProCount(left);
    const rightPros = getProCount(right);
    const leftTension = racketFamily ? buildBalancedTension(left, racketFamily) : null;
    const rightTension = racketFamily ? buildBalancedTension(right, racketFamily) : null;

    return {
      left,
      right,
      racketFamily,
      leftPros,
      rightPros,
      leftTension,
      rightTension,
      metricRows,
      summary: buildMatchupSummary(left, right),
      bullets: buildQuickReadBullets(left, right, metricRows, racketFamily, leftTension, rightTension)
    };
  }

  function renderComparison(comparison) {
    if (comparison.error) {
      elements.report.innerHTML = `
        <section class="compare-tool-report-card compare-tool-report-card-empty">
          <p class="eyebrow">Need One More Detail</p>
          <h3>${escapeHtml(comparison.error.title)}</h3>
          <p class="summary-copy">${escapeHtml(comparison.error.text)}</p>
        </section>
      `;
      return;
    }

    elements.report.innerHTML = `
      <section class="compare-tool-report-card">
        <div class="tool-result-header">
          <p class="eyebrow">String Matchup</p>
          <h3 class="tool-recommendation-name">${escapeHtml(comparison.left.name)} vs ${escapeHtml(comparison.right.name)}</h3>
          <p class="tool-note">${escapeHtml(comparison.summary)}</p>
          <div class="tool-inline-actions">
            <button class="secondary-button compact-button compare-tool-email-stringer" type="button">Email Comparison to Stringer</button>
          </div>
        </div>
      </section>

      <section class="compare-tool-report-card">
        <div class="compare-tool-summary-grid">
          ${renderStringCard("String A", comparison.left, comparison.leftPros, comparison.leftTension)}
          ${renderStringCard("String B", comparison.right, comparison.rightPros, comparison.rightTension)}
        </div>
      </section>

      <section class="compare-tool-report-card">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Head-to-Head</p>
          <h3>How they compare</h3>
        </div>
        <div class="compare-tool-metric-list">
          ${comparison.metricRows.map((row) => `
            <div class="compare-tool-metric-row">
              <div class="compare-tool-metric-side${row.winner === "left" ? " is-stronger" : ""}">
                <strong>${row.leftScore}/10</strong>
                <span>${escapeHtml(comparison.left.name)}</span>
              </div>
              <div class="compare-tool-metric-label">${escapeHtml(row.label)}</div>
              <div class="compare-tool-metric-side${row.winner === "right" ? " is-stronger" : ""}">
                <strong>${row.rightScore}/10</strong>
                <span>${escapeHtml(comparison.right.name)}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="compare-tool-report-card compare-tool-report-card-highlight">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Quick Read</p>
          <h3>Who each string likely suits better</h3>
        </div>
        <ul class="setup-analyzer-point-list">
          ${comparison.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    `;

    const emailButton = elements.report.querySelector(".compare-tool-email-stringer");
    if (emailButton) {
      emailButton.addEventListener("click", () => {
        const draft = buildComparisonEmailDraft(comparison);
        trackToolUsage("compare_strings_email_stringer", "Email Comparison to Stringer", {
          leftString: comparison.left.name,
          rightString: comparison.right.name,
          racketFamily: comparison.racketFamily || ""
        });
        openMailDraft(draft);
      });
    }
  }

  function renderStringCard(label, entry, proCount, tensionRecommendation) {
    return `
      <article class="compare-tool-string-card">
        <div>
          <p class="eyebrow">${escapeHtml(label)}</p>
          <h4>${escapeHtml(entry.name)}</h4>
          <p class="summary-copy">${escapeHtml(entry.summary || "No short summary saved yet.")}</p>
        </div>
        <div class="tool-stat-grid">
          <div class="tool-stat">
            <span class="tool-stat-label">Brand</span>
            <strong>${escapeHtml(entry.brand || "Unknown")}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Type</span>
            <strong>${escapeHtml(entry.type || "Unknown")}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Gauge</span>
            <strong>${escapeHtml(entry.gauge || "Unknown")}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Racket Fit</span>
            <strong>${escapeHtml(entry.racketFamily || "General fit")}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Feel</span>
            <strong>${escapeHtml(entry.feel || "Balanced")}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Pros Using</span>
            <strong>${proCount}</strong>
          </div>
          ${tensionRecommendation ? `
            <div class="tool-stat">
              <span class="tool-stat-label">Balanced Tension</span>
              <strong>${escapeHtml(tensionRecommendation)}</strong>
            </div>
          ` : ""}
        </div>
      </article>
    `;
  }

  function buildMetricRows(left, right) {
    return [
      buildMetricRow("Spin", left, right, "spin"),
      buildMetricRow("Control", left, right, "control"),
      buildMetricRow("Comfort", left, right, "comfort"),
      buildMetricRow("Power", left, right, "power"),
      buildMetricRow("Durability", left, right, "durability")
    ];
  }

  function buildMetricRow(label, left, right, key) {
    const leftScore = convertLevelToTen(left[key]);
    const rightScore = convertLevelToTen(right[key]);
    const difference = leftScore - rightScore;

    return {
      label,
      leftScore,
      rightScore,
      winner: difference > 0 ? "left" : difference < 0 ? "right" : "tie"
    };
  }

  function buildQuickReadBullets(left, right, metricRows, racketFamily, leftTension, rightTension) {
    const bullets = [];
    const leftWins = metricRows.filter((row) => row.winner === "left");
    const rightWins = metricRows.filter((row) => row.winner === "right");
    const leftLead = leftWins.map((row) => row.label.toLowerCase());
    const rightLead = rightWins.map((row) => row.label.toLowerCase());

    if (leftLead.length) {
      bullets.push(`${left.name} looks stronger if you want more ${joinLabels(leftLead)}.`);
    }

    if (rightLead.length) {
      bullets.push(`${right.name} looks stronger if you want more ${joinLabels(rightLead)}.`);
    }

    if (!leftLead.length && !rightLead.length) {
      bullets.push("These two strings look unusually close on paper. The real difference will probably come down to feel, launch, and how they age after a few sessions.");
    }

    if (left.type !== right.type) {
      bullets.push(`${left.name} and ${right.name} come from different string families, so the bigger decision may be the category itself, not just the brand or model name.`);
    }

    if (racketFamily && leftTension && rightTension) {
      bullets.push(`In a ${racketFamily}, a balanced starting point would be about ${leftTension} for ${left.name} and about ${rightTension} for ${right.name}.`);
    }

    return bullets.slice(0, 4);
  }

  function buildMatchupSummary(left, right) {
    if (left.type === right.type) {
      return `Both sit in the ${left.type} category. This comparison is mostly about feel, comfort window, and which one leans harder into spin, control, or power.`;
    }

    return `This is a cross-category comparison between ${left.type} and ${right.type}. The bigger difference will usually come from the string family as much as the individual model.`;
  }

  function buildBalancedTension(entry, racketFamily) {
    const normalizedType = normalizeType(entry.type);
    const base = TENSION_TYPE_BASE[normalizedType] || TENSION_TYPE_BASE["Co-Poly"];
    const racketAdjustment = TENSION_RACKET_ADJUSTMENTS[racketFamily] || 0;
    const target = clampNumber(base + racketAdjustment, 42, 58);
    const min = clampNumber(target - 1.5, 42, 58);
    const max = clampNumber(target + 1.5, 42, 58);
    return `${Math.round(min)}-${Math.round(max)} lbs`;
  }

  function normalizeType(type) {
    if (type === "Poly" || type === "Co-Poly") {
      return "Co-Poly";
    }
    return type;
  }

  function convertLevelToTen(value) {
    const scale = {
      Low: 1,
      Medium: 2,
      High: 3,
      "Very High": 4
    };

    return ((scale[value] || 2) * 2) + 2;
  }

  function getProCount(entry) {
    return [...new Set([...(entry.atpPlayers || []), ...(entry.wtaPlayers || [])])].length;
  }

  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function findStringEntryByName(name) {
    const target = String(name || "").trim().toLowerCase();
    if (!target) {
      return null;
    }

    return strings.find((entry) => String(entry.name || "").trim().toLowerCase() === target) || null;
  }

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

  function joinLabels(labels) {
    if (labels.length <= 1) {
      return labels[0] || "";
    }

    if (labels.length === 2) {
      return `${labels[0]} and ${labels[1]}`;
    }

    return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
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

  function buildComparisonEmailDraft(comparison) {
    const lines = [
      "Hi,",
      "",
      "I am comparing these 2 strings and would like your input on which one makes more sense to string up.",
      "",
      `String A: ${comparison.left.name}`,
      `Brand / type: ${comparison.left.brand || "Unknown"} / ${comparison.left.type || "Unknown"}`,
      `Gauge: ${comparison.left.gauge || "Unknown"}`,
      `Racket fit: ${comparison.left.racketFamily || "General fit"}`,
      comparison.leftTension ? `Balanced starting tension: ${comparison.leftTension}` : "",
      "",
      `String B: ${comparison.right.name}`,
      `Brand / type: ${comparison.right.brand || "Unknown"} / ${comparison.right.type || "Unknown"}`,
      `Gauge: ${comparison.right.gauge || "Unknown"}`,
      `Racket fit: ${comparison.right.racketFamily || "General fit"}`,
      comparison.rightTension ? `Balanced starting tension: ${comparison.rightTension}` : "",
      "",
      comparison.racketFamily ? `My racket family: ${comparison.racketFamily}` : "",
      `Summary: ${comparison.summary}`,
      "",
      "Quick read:",
      ...comparison.bullets.map((item) => `- ${item}`),
      "",
      "Generated with TennisSetup.com"
    ].filter(Boolean);

    return {
      subject: `String comparison: ${comparison.left.name} vs ${comparison.right.name}`,
      body: lines.join("\n")
    };
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

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();
