(() => {
  const strings = Array.isArray(window.TENNIS_STRING_DATA)
    ? window.TENNIS_STRING_DATA
    : Array.isArray(window.TENNIS_STRING_PLANNER_STRINGS)
      ? window.TENNIS_STRING_PLANNER_STRINGS
      : [];

  const PRO_SETUP_EXAMPLES = [
    { player: "Carlos Alcaraz", style: "Aggressive Baseliner", preferredTopEntryName: "Babolat RPM Blast", racketFamily: "Babolat Pure Aero", preferences: { spin: "Very High", power: "Medium", control: "High" } },
    { player: "Jannik Sinner", style: "Aggressive Baseliner", preferredTopEntryName: "Head Hawk Touch", racketFamily: "Head Speed", preferences: { spin: "High", power: "Medium", control: "Very High" } },
    { player: "Aryna Sabalenka", style: "Aggressive Baseliner", preferredTopEntryName: "Luxilon ALU Power", racketFamily: "Wilson Blade", preferences: { spin: "High", power: "High", control: "High" } },
    { player: "Taylor Fritz", style: "Aggressive Baseliner", preferredTopEntryName: "Head Hawk", racketFamily: "Head Radical", preferences: { spin: "Medium", power: "Low", control: "Very High" } },
    { player: "Ben Shelton", style: "Aggressive Baseliner", preferredTopEntryName: "Yonex Poly Tour Pro", racketFamily: "Yonex Ezone", preferences: { spin: "High", power: "Medium", control: "High" } },
    { player: "Iga Swiatek", style: "Aggressive Baseliner", preferredTopEntryName: "Tecnifibre Razor Code", racketFamily: "Control Frame", preferences: { spin: "High", power: "Medium", control: "Very High" } },
    { player: "Novak Djokovic", style: "All-Court", preferredTopEntryName: "Babolat VS Touch", racketFamily: "Control Frame", preferences: { spin: "Medium", power: "High", control: "High" } },
    { player: "Alexander Zverev", style: "Flat Hitter", preferredTopEntryName: "Head Hawk Touch", racketFamily: "Head Radical", preferences: { spin: "Medium", power: "Low", control: "Very High" } },
    { player: "Coco Gauff", style: "Aggressive Baseliner", preferredTopEntryName: "Luxilon ALU Power", racketFamily: "Wilson Blade", preferences: { spin: "High", power: "Medium", control: "High" } },
    { player: "Tommy Paul", style: "Heavy Topspin", preferredTopEntryName: "Solinco Tour Bite", racketFamily: "Spin Frame", preferences: { spin: "Very High", power: "Low", control: "Very High" } },
    { player: "Paula Badosa", style: "Aggressive Baseliner", preferredTopEntryName: "Luxilon ALU Power", racketFamily: "Wilson Blade", preferences: { spin: "High", power: "Medium", control: "High" } },
    { player: "Elena Rybakina", style: "Aggressive Baseliner", preferredTopEntryName: "Yonex Poly Tour Fire", racketFamily: "Yonex Ezone", preferences: { spin: "High", power: "Medium", control: "High" } }
  ];

  const elements = {
    setupA: document.getElementById("compareProSetupA"),
    setupB: document.getElementById("compareProSetupB"),
    button: document.getElementById("compareProSetupsButton"),
    report: document.getElementById("compareProSetupsReport")
  };

  if (!elements.setupA || !elements.setupB || !elements.button || !elements.report || !strings.length) {
    return;
  }

  populateControls();
  applyPrefillFromQuery();

  elements.button.addEventListener("click", () => {
    const comparison = buildComparison();
    renderComparison(comparison);
    if (!comparison.error) {
      trackToolUsage("compare_pro_setups_run", "Compare Pro Setups", {
        leftPlayer: comparison.left.player,
        rightPlayer: comparison.right.player
      });
    }
  });

  function populateControls() {
    const options = PRO_SETUP_EXAMPLES
      .map((example, index) => `<option value="${index}">${escapeHtml(example.player)}</option>`)
      .join("");

    elements.setupA.innerHTML = `<option value="">Choose the first pro setup</option>${options}`;
    elements.setupB.innerHTML = `<option value="">Choose the second pro setup</option>${options}`;
    elements.setupA.value = "0";
    elements.setupB.value = "1";
  }

  function applyPrefillFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const requestedPlayer = (params.get("player") || "").trim().toLowerCase();

    if (!requestedPlayer) {
      return;
    }

    const selectedIndex = PRO_SETUP_EXAMPLES.findIndex(
      (example) => example.player.toLowerCase() === requestedPlayer
    );

    if (selectedIndex === -1) {
      return;
    }

    const fallbackIndex = selectedIndex === 1 ? 0 : 1;

    elements.setupA.value = String(selectedIndex);
    elements.setupB.value = String(fallbackIndex === selectedIndex ? 0 : fallbackIndex);
    renderComparison(buildComparison());
  }

  function buildComparison() {
    const leftIndex = Number(elements.setupA.value);
    const rightIndex = Number(elements.setupB.value);
    const leftExample = PRO_SETUP_EXAMPLES[leftIndex];
    const rightExample = PRO_SETUP_EXAMPLES[rightIndex];

    if (!leftExample || !rightExample) {
      return {
        error: {
          title: "Choose 2 pro setups",
          text: "Pick 2 example pros from the dropdowns so the tool can build a side-by-side setup comparison."
        }
      };
    }

    if (leftExample.player === rightExample.player) {
      return {
        error: {
          title: "Choose 2 different pros",
          text: "Use 2 different example pros so the comparison can highlight what changes between the setups."
        }
      };
    }

    const left = buildProSetup(leftExample);
    const right = buildProSetup(rightExample);

    return {
      left,
      right,
      summary: buildSummary(left, right),
      metricRows: [
        buildMetricRow("Spin", left.profile.spin, right.profile.spin),
        buildMetricRow("Power", left.profile.power, right.profile.power),
        buildMetricRow("Control", left.profile.control, right.profile.control),
        buildMetricRow("Comfort", left.profile.comfort, right.profile.comfort),
        buildMetricRow("Durability", left.profile.durability, right.profile.durability)
      ],
      bullets: buildQuickRead(left, right)
    };
  }

  function buildProSetup(example) {
    const entry = findStringEntryByName(example.preferredTopEntryName);
    const proRacket = findPlayerRacket(entry, example.player);
    const proTension = findPlayerTension(entry, example.player);
    const stringSummary = entry?.summary || `${example.preferredTopEntryName} is used here as the anchor string for this curated pro-inspired example.`;

    return {
      player: example.player,
      style: example.style,
      racketFamily: example.racketFamily,
      actualRacket: proRacket?.racket || example.racketFamily,
      stringName: entry?.name || example.preferredTopEntryName,
      stringType: entry?.type || "Unknown",
      gauge: entry?.gauge || "Unknown",
      tensionLabel: proTension?.tension || formatTensionBand(entry?.tensionBand),
      tensionDetail: proTension?.detail || (entry?.tensionBand ? `${entry.tensionBand} reference band` : "No documented tension reference saved yet."),
      stringSummary,
      profile: {
        spin: blendScores(example.preferences.spin, entry?.spin),
        power: blendScores(example.preferences.power, entry?.power),
        control: blendScores(example.preferences.control, entry?.control),
        comfort: convertLevelToTen(entry?.comfort),
        durability: convertLevelToTen(entry?.durability)
      }
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
          <p class="eyebrow">Pro Matchup</p>
          <h3 class="tool-recommendation-name">${escapeHtml(comparison.left.player)} vs ${escapeHtml(comparison.right.player)}</h3>
          <p class="tool-note">${escapeHtml(comparison.summary)}</p>
        </div>
      </section>

      <section class="compare-tool-report-card">
        <div class="compare-tool-summary-grid">
          ${renderProCard("Setup A", comparison.left)}
          ${renderProCard("Setup B", comparison.right)}
        </div>
      </section>

      <section class="compare-tool-report-card">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Head-to-Head</p>
          <h3>How the setup profiles differ</h3>
        </div>
        <div class="compare-tool-metric-list">
          ${comparison.metricRows.map((row) => `
            <div class="compare-tool-metric-row">
              <div class="compare-tool-metric-side${row.winner === "left" ? " is-stronger" : ""}">
                <strong>${row.leftScore}/10</strong>
                <span>${escapeHtml(comparison.left.player)}</span>
              </div>
              <div class="compare-tool-metric-label">${escapeHtml(row.label)}</div>
              <div class="compare-tool-metric-side${row.winner === "right" ? " is-stronger" : ""}">
                <strong>${row.rightScore}/10</strong>
                <span>${escapeHtml(comparison.right.player)}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="compare-tool-report-card compare-tool-report-card-highlight">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Quick Read</p>
          <h3>What stands out</h3>
        </div>
        <ul class="setup-analyzer-point-list">
          ${comparison.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    `;
  }

  function renderProCard(label, setup) {
    return `
      <article class="compare-tool-string-card">
        <div>
          <p class="eyebrow">${escapeHtml(label)}</p>
          <h4>${escapeHtml(setup.player)}</h4>
          <p class="summary-copy">${escapeHtml(setup.stringSummary)}</p>
        </div>
        <div class="tool-stat-grid">
          <div class="tool-stat">
            <span class="tool-stat-label">Style</span>
            <strong>${escapeHtml(setup.style)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">String</span>
            <strong>${escapeHtml(setup.stringName)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Type</span>
            <strong>${escapeHtml(setup.stringType)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Gauge</span>
            <strong>${escapeHtml(setup.gauge)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Racket</span>
            <strong>${escapeHtml(setup.actualRacket)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Tension Ref</span>
            <strong>${escapeHtml(setup.tensionLabel)}</strong>
            <span class="tool-stat-note">${escapeHtml(setup.tensionDetail)}</span>
          </div>
        </div>
      </article>
    `;
  }

  function buildSummary(left, right) {
    if (left.style === right.style) {
      return `Both examples come from a ${left.style.toLowerCase()} profile, so the bigger difference is the string choice, racket family, and how much each setup leans toward comfort, power, or control.`;
    }

    return `${left.player} and ${right.player} represent different setup identities. The contrast here is driven by playing style, frame family, and the string each example is built around.`;
  }

  function buildQuickRead(left, right) {
    const bullets = [];

    if (left.profile.spin > right.profile.spin) {
      bullets.push(`${left.player} looks more spin-forward on paper, while ${right.player} comes out a little less shape-driven.`);
    } else if (right.profile.spin > left.profile.spin) {
      bullets.push(`${right.player} looks more spin-forward on paper, while ${left.player} comes out a little less shape-driven.`);
    }

    if (left.profile.control > right.profile.control) {
      bullets.push(`${left.player} looks a little more control-first, especially if you value a firmer or more disciplined response.`);
    } else if (right.profile.control > left.profile.control) {
      bullets.push(`${right.player} looks a little more control-first, especially if you value a firmer or more disciplined response.`);
    }

    if (left.profile.comfort > right.profile.comfort) {
      bullets.push(`${left.player} projects as the more forgiving setup, while ${right.player} looks a little firmer or narrower in comfort window.`);
    } else if (right.profile.comfort > left.profile.comfort) {
      bullets.push(`${right.player} projects as the more forgiving setup, while ${left.player} looks a little firmer or narrower in comfort window.`);
    }

    if (left.racketFamily !== right.racketFamily) {
      bullets.push(`${left.player} is anchored to ${left.racketFamily}, while ${right.player} sits in ${right.racketFamily}, so some of the difference comes from the frame family as much as the string.`);
    }

    if (!bullets.length) {
      bullets.push("These 2 examples are fairly close on paper. The bigger real-world difference may come from launch, feel, and how each setup ages over time.");
    }

    return bullets.slice(0, 4);
  }

  function buildMetricRow(label, leftScore, rightScore) {
    const difference = leftScore - rightScore;
    return {
      label,
      leftScore,
      rightScore,
      winner: difference > 0 ? "left" : difference < 0 ? "right" : "tie"
    };
  }

  function blendScores(preferenceLevel, stringLevel) {
    return Math.round((convertLevelToTen(preferenceLevel) + convertLevelToTen(stringLevel)) / 2);
  }

  function convertLevelToTen(value) {
    const scale = {
      Low: 4,
      Medium: 6,
      High: 8,
      "Very High": 10
    };

    return scale[value] || 6;
  }

  function formatTensionBand(tensionBand) {
    const map = {
      "Low 40s": "43-46 lbs",
      "Mid 40s": "46-48 lbs",
      "High 40s": "48-50 lbs",
      "Low 50s": "50-53 lbs",
      "Mid 50s": "54-56 lbs"
    };

    return map[tensionBand] || "Use Tension Calculator";
  }

  function findStringEntryByName(name) {
    const target = String(name || "").trim().toLowerCase();
    if (!target) {
      return null;
    }

    return strings.find((entry) => String(entry.name || "").trim().toLowerCase() === target) || null;
  }

  function findPlayerRacket(entry, player) {
    if (!entry || !player) {
      return null;
    }

    return (entry.proRackets || []).find((item) => item.player === player) || null;
  }

  function findPlayerTension(entry, player) {
    if (!entry || !player) {
      return null;
    }

    return (entry.proTensions || []).find((item) => item.player === player) || null;
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

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();
