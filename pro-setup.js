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
    select: document.getElementById("proSetupPlayerSelect"),
    button: document.getElementById("showProSetupButton"),
    report: document.getElementById("proSetupReport"),
    layout: document.getElementById("proSetupLayout"),
    pickerCard: document.getElementById("proSetupPickerCard")
  };

  if (!elements.select || !elements.button || !elements.report || !strings.length) {
    return;
  }

  populateControls();
  applyPrefillFromQuery();

  elements.button.addEventListener("click", () => {
    const setup = buildSelectedSetup();
    renderSetup(setup);
  });

  elements.select.addEventListener("change", () => {
    const setup = buildSelectedSetup();
    if (!setup.error) {
      renderSetup(setup);
    }
  });

  function populateControls() {
    const options = PRO_SETUP_EXAMPLES
      .map((example) => `<option value="${escapeHtml(example.player)}">${escapeHtml(example.player)}</option>`)
      .join("");

    elements.select.innerHTML = `<option value="">Choose a pro player</option>${options}`;
  }

  function applyPrefillFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const requestedPlayer = (params.get("player") || "").trim().toLowerCase();
    if (!requestedPlayer) {
      showPickerCard();
      return;
    }

    const match = PRO_SETUP_EXAMPLES.find(
      (example) => example.player.toLowerCase() === requestedPlayer
    );

    if (!match) {
      showPickerCard();
      return;
    }

    elements.select.value = match.player;
    hidePickerCard();
    renderSetup(buildSelectedSetup());
  }

  function buildSelectedSetup() {
    const selectedPlayer = String(elements.select.value || "").trim();
    const example = PRO_SETUP_EXAMPLES.find((item) => item.player === selectedPlayer);

    if (!example) {
      return {
        error: {
          title: "Choose a pro player",
          text: "Pick one player from the dropdown so the page can load that curated pro-inspired setup."
        }
      };
    }

    return buildProSetup(example);
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

  function renderSetup(setup) {
    if (setup.error) {
      elements.report.innerHTML = `
        <section class="compare-tool-report-card compare-tool-report-card-empty">
          <p class="eyebrow">Need One More Detail</p>
          <h3>${escapeHtml(setup.error.title)}</h3>
          <p class="summary-copy">${escapeHtml(setup.error.text)}</p>
        </section>
      `;
      return;
    }

    syncUrl(setup.player);
    trackToolUsage("pro_setup_view", "Pro Setup", { player: setup.player });

    const bullets = buildQuickRead(setup);

    elements.report.innerHTML = `
      <section class="compare-tool-report-card">
        <div class="tool-result-header">
          <p class="eyebrow">Pro Setup</p>
          <h3 class="tool-recommendation-name">${escapeHtml(setup.player)}</h3>
        </div>
      </section>

      <section class="compare-tool-report-card">
        <article class="compare-tool-string-card compare-tool-string-card-single">
          <div>
            <p class="eyebrow">Setup Snapshot</p>
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
      </section>

      <section class="compare-tool-report-card">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Setup Profile</p>
          <h3>What this setup leans toward</h3>
        </div>
        <div class="tool-stat-grid">
          ${renderProfileStat("Spin", setup.profile.spin)}
          ${renderProfileStat("Power", setup.profile.power)}
          ${renderProfileStat("Control", setup.profile.control)}
          ${renderProfileStat("Comfort", setup.profile.comfort)}
          ${renderProfileStat("Durability", setup.profile.durability)}
        </div>
      </section>

      <section class="compare-tool-report-card compare-tool-report-card-highlight">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Quick Read</p>
          <h3>What stands out</h3>
        </div>
        <ul class="setup-analyzer-point-list">
          ${bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    `;
  }

  function renderProfileStat(label, score) {
    return `
      <div class="tool-stat">
        <span class="tool-stat-label">${escapeHtml(label)}</span>
        <strong>${escapeHtml(String(score))}/10</strong>
      </div>
    `;
  }

  function buildQuickRead(setup) {
    const bullets = [
      `${setup.player} is anchored to ${setup.racketFamily}, so some of this identity comes from the frame family as much as the string itself.`,
      `${setup.stringName} is the anchor string in this example, which gives you the cleanest first clue about the setup direction.`,
      `The documented tension reference is ${setup.tensionLabel}, so that is the best starting point if you want to stay close to this example.`
    ];

    if (setup.profile.spin >= 9) {
      bullets.push(`This setup reads as especially spin-forward on paper, so it fits players who want more shape and heavier ball flight.`);
    } else if (setup.profile.control >= 9) {
      bullets.push(`This setup reads as especially control-first on paper, so it fits players who want a firmer and more disciplined response.`);
    } else if (setup.profile.power >= 8) {
      bullets.push(`This setup reads as a little more power-friendly on paper, so it may suit players who want easier pace without building the whole setup around stiffness.`);
    } else if (setup.profile.comfort >= 8) {
      bullets.push(`This setup projects as relatively forgiving on paper, so comfort and touch matter a bit more here than in harsher full-poly examples.`);
    } else {
      bullets.push(`This example looks fairly balanced overall, so the real-world difference may show up more in feel and launch than in one single extreme trait.`);
    }

    return bullets.slice(0, 4);
  }

  function syncUrl(player) {
    const url = new URL(window.location.href);
    url.searchParams.set("player", player);
    window.history.replaceState({}, "", url.toString());
  }

  function hidePickerCard() {
    if (elements.pickerCard) {
      elements.pickerCard.hidden = true;
    }
    if (elements.layout) {
      elements.layout.classList.add("is-direct-player-view");
    }
  }

  function showPickerCard() {
    if (elements.pickerCard) {
      elements.pickerCard.hidden = false;
    }
    if (elements.layout) {
      elements.layout.classList.remove("is-direct-player-view");
    }
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
