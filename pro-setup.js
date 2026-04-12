(() => {
  const strings = Array.isArray(window.TENNIS_STRING_DATA)
    ? window.TENNIS_STRING_DATA
    : Array.isArray(window.TENNIS_STRING_PLANNER_STRINGS)
      ? window.TENNIS_STRING_PLANNER_STRINGS
      : [];

  const CURATED_PRO_SETUP_EXAMPLES = [
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

  const proSetupOptions = buildProSetupOptions();
  const proSetupIndex = new Map(
    proSetupOptions.map((example) => [normalizePlayerName(example.player), example])
  );
  const scoredProSetups = buildScoredProSetups();

  const elements = {
    select: document.getElementById("proSetupPlayerSelect"),
    button: document.getElementById("showProSetupButton"),
    report: document.getElementById("proSetupReport"),
    layout: document.getElementById("proSetupLayout"),
    pickerCard: document.getElementById("proSetupPickerCard"),
    navPanel: document.getElementById("proSetupNavPanel"),
    topScoring: document.getElementById("proSetupTopScoring")
  };

  if (!elements.select || !elements.button || !elements.report || !strings.length || !proSetupOptions.length) {
    return;
  }

  populateControls();
  populateNavDropdown();
  renderTopScoringSection();
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
    const options = proSetupOptions
      .map((example) => `<option value="${escapeHtml(example.player)}">${escapeHtml(example.player)}</option>`)
      .join("");

    elements.select.innerHTML = `<option value="">Choose a pro player</option>${options}`;
  }

  function populateNavDropdown() {
    if (!elements.navPanel) {
      return;
    }

    const links = [
      `<a href="./pro-setup.html">See All Pro Setups</a>`,
      ...proSetupOptions.map(
        (example) => `<a href="./pro-setup.html?player=${encodeURIComponent(example.player)}">${escapeHtml(example.player)}</a>`
      )
    ];

    elements.navPanel.innerHTML = links.join("");
  }

  function applyPrefillFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const requestedPlayer = normalizePlayerName(params.get("player"));
    if (!requestedPlayer) {
      showPickerCard();
      return;
    }

    const match = proSetupIndex.get(requestedPlayer);

    if (!match) {
      showPickerCard();
      return;
    }

    elements.select.value = match.player;
    hidePickerCard();
    renderSetup(buildSelectedSetup());
  }

  function renderTopScoringSection() {
    if (!elements.topScoring) {
      return;
    }

    const topSetups = scoredProSetups.slice(0, 8);
    const eliteSetups = scoredProSetups.filter((setup) => setup.setupScore.total >= 98);
    const intro = eliteSetups.length
      ? `${eliteSetups.length} player${eliteSetups.length === 1 ? "" : "s"} currently land at 98+ in this model.`
      : "No player is currently at 98+ in this model, but these are the highest-scoring setups in the database.";

    elements.topScoring.innerHTML = `
      <div class="setup-analyzer-card-header">
        <p class="eyebrow">Top Scoring</p>
        <h3>Top Scoring Pro Setups</h3>
      </div>
      <p class="summary-copy">${escapeHtml(intro)}</p>
      <div class="pro-setup-top-scoring-grid">
        ${topSetups.map((setup) => renderTopScoringCard(setup)).join("")}
      </div>
    `;
  }

  function renderTopScoringCard(setup) {
    return `
      <a class="pro-setup-top-scoring-card" href="./pro-setup.html?player=${encodeURIComponent(setup.player)}">
        <div class="pro-setup-top-scoring-header">
          <strong>${escapeHtml(setup.player)}</strong>
          <span class="pro-setup-score-badge">${setup.setupScore.total}/100</span>
        </div>
        <span class="pro-setup-top-scoring-meta">${escapeHtml(setup.stringName)} | ${escapeHtml(setup.actualRacket)}</span>
        <span class="pro-setup-top-scoring-label">${escapeHtml(setup.setupScore.summary)}</span>
      </a>
    `;
  }

  function buildSelectedSetup() {
    const selectedPlayer = String(elements.select.value || "").trim();
    const example = proSetupIndex.get(normalizePlayerName(selectedPlayer));

    if (!example) {
      return {
        error: {
          title: "Choose a pro player",
          text: "Pick one player from the dropdown so the page can load that player's setup reference from the current pro database."
        }
      };
    }

    return buildProSetup(example);
  }

  function buildProSetup(example) {
    const entry = findStringEntryByName(example.preferredTopEntryName);
    const proRacket = findPlayerRacket(entry, example.player) || findAnyPlayerRacket(example.player);
    const proTension = findPlayerTension(entry, example.player) || findAnyPlayerTension(example.player);
    const fallbackStringName = example.preferredTopEntryName || "the best available string reference";
    const stringSummary = entry?.summary || `${fallbackStringName} is used here as the anchor string for this player-specific setup reference.`;

    return {
      player: example.player,
      style: example.style,
      racketFamily: example.racketFamily,
      actualRacket: proRacket?.racket || example.racketFamily,
      stringName: entry?.name || example.preferredTopEntryName || "Best available string reference",
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
      },
      setupScore: buildProSetupScore({
        example,
        entry,
        actualRacket: proRacket?.racket || example.racketFamily,
        hasLiveTension: Boolean(proTension),
        hasTensionBand: Boolean(entry?.tensionBand)
      })
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
            <div class="pro-setup-score-row">
              <span class="pro-setup-score-badge">${setup.setupScore.total}/100</span>
              <span class="pro-setup-score-label">${escapeHtml(setup.setupScore.summary)}</span>
            </div>
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

  function buildScoredProSetups() {
    return proSetupOptions
      .map((example) => buildProSetup(example))
      .filter((setup) => !setup.error)
      .sort((left, right) => {
        const scoreGap = right.setupScore.total - left.setupScore.total;
        if (scoreGap !== 0) {
          return scoreGap;
        }
        return left.player.localeCompare(right.player);
      });
  }

  function buildProSetupOptions() {
    const curatedByPlayer = new Map(
      CURATED_PRO_SETUP_EXAMPLES.map((example) => [normalizePlayerName(example.player), example])
    );
    const fullPlayerRecords = collectPlayerRecords();

    fullPlayerRecords.forEach((record, playerKey) => {
      if (curatedByPlayer.has(playerKey)) {
        return;
      }

      curatedByPlayer.set(playerKey, buildFallbackExample(record));
    });

    return [...curatedByPlayer.values()].sort((left, right) => left.player.localeCompare(right.player));
  }

  function collectPlayerRecords() {
    const playerRecords = new Map();

    strings.forEach((entry) => {
      const playerNames = new Set([
        ...(entry.atpPlayers || []),
        ...(entry.wtaPlayers || []),
        ...(entry.proRackets || []).map((item) => item.player),
        ...(entry.proTensions || []).map((item) => item.player)
      ]);

      playerNames.forEach((playerName) => {
        const player = String(playerName || "").trim();
        if (!player) {
          return;
        }

        const playerKey = normalizePlayerName(player);
        if (!playerRecords.has(playerKey)) {
          playerRecords.set(playerKey, {
            player,
            entries: []
          });
        }

        playerRecords.get(playerKey).entries.push(entry);
      });
    });

    return playerRecords;
  }

  function buildFallbackExample(record) {
    const entry = pickBestEntryForPlayer(record);
    const racket = findAnyPlayerRacket(record.player);
    const style = inferPlayerStyle(entry);

    return {
      player: record.player,
      style,
      preferredTopEntryName: entry?.name || "",
      racketFamily: entry?.racketFamily || racket?.racket || "Control Frame",
      preferences: buildFallbackPreferences(entry, style)
    };
  }

  function pickBestEntryForPlayer(record) {
    return [...record.entries].sort((left, right) => {
      const scoreGap = scoreEntryForPlayer(right, record.player) - scoreEntryForPlayer(left, record.player);
      if (scoreGap !== 0) {
        return scoreGap;
      }
      return String(left.name || "").localeCompare(String(right.name || ""));
    })[0] || null;
  }

  function scoreEntryForPlayer(entry, player) {
    let score = 0;

    if ((entry.atpPlayers || []).includes(player) || (entry.wtaPlayers || []).includes(player)) {
      score += 5;
    }
    if ((entry.proRackets || []).some((item) => item.player === player)) {
      score += 8;
    }
    if ((entry.proTensions || []).some((item) => item.player === player)) {
      score += 8;
    }
    if (entry.summary) {
      score += 2;
    }
    if (entry.racketFamily) {
      score += 2;
    }
    if (entry.gameStyle) {
      score += 2;
    }
    if (entry.gauge) {
      score += 1;
    }
    if (entry.type) {
      score += 1;
    }

    return score;
  }

  function inferPlayerStyle(entry) {
    return entry?.gameStyle || "Aggressive Baseliner";
  }

  function buildFallbackPreferences(entry, style) {
    const defaultPreferencesByStyle = {
      "Aggressive Baseliner": { spin: "High", power: "Medium", control: "High" },
      "All-Court": { spin: "Medium", power: "Medium", control: "High" },
      "Flat Hitter": { spin: "Medium", power: "Medium", control: "Very High" },
      "Heavy Topspin": { spin: "Very High", power: "Low", control: "High" }
    };
    const defaults = defaultPreferencesByStyle[style] || defaultPreferencesByStyle["Aggressive Baseliner"];

    return {
      spin: entry?.spin || defaults.spin,
      power: entry?.power || defaults.power,
      control: entry?.control || defaults.control
    };
  }

  function buildProSetupScore({ example, entry, actualRacket, hasLiveTension, hasTensionBand }) {
    const profile = {
      spin: blendScores(example.preferences.spin, entry?.spin),
      power: blendScores(example.preferences.power, entry?.power),
      control: blendScores(example.preferences.control, entry?.control),
      comfort: convertLevelToTen(entry?.comfort),
      durability: convertLevelToTen(entry?.durability)
    };

    const breakdown = [
      scoreProStyleFit(example, profile),
      scoreProRacketFit(example.racketFamily, actualRacket),
      scoreProStringAnchor(entry, example, profile),
      scoreProTensionReference(hasLiveTension, hasTensionBand),
      scoreProComfortBalance(example, entry, profile)
    ];

    const total = clampWhole(breakdown.reduce((sum, item) => sum + item.score, 0), 0, 100);
    const strongest = [...breakdown]
      .sort((left, right) => (right.score / right.max) - (left.score / left.max))
      .slice(0, 2)
      .map((item) => item.label.toLowerCase());

    return {
      total,
      summary: total >= 88
        ? `Excellent pro fit for ${joinLabels(strongest)}.`
        : total >= 76
          ? `Strong pro fit for ${joinLabels(strongest)}.`
          : `Solid pro reference for ${joinLabels(strongest)}.`
    };
  }

  function scoreProStyleFit(example, profile) {
    const targets = {
      spin: { value: convertLevelToTen(example.preferences.spin), weight: 2 },
      power: { value: convertLevelToTen(example.preferences.power), weight: 1.5 },
      control: { value: convertLevelToTen(example.preferences.control), weight: 2 }
    };

    if (example.style === "All-Court") {
      targets.comfort = { value: 7, weight: 1 };
    } else if (example.style === "Heavy Topspin") {
      targets.spin.weight += 0.5;
    } else if (example.style === "Flat Hitter") {
      targets.control.weight += 0.5;
    }

    return {
      label: "Style Fit",
      score: scoreProfileAgainstTarget(profile, targets, 35),
      max: 35
    };
  }

  function scoreProRacketFit(targetFamily, actualRacket) {
    const familyGroup = getRacketFamilyGroup(targetFamily);
    let score = 12;

    if (String(actualRacket || "").trim() === targetFamily) {
      score = 20;
    } else if (getRacketFamilyGroup(actualRacket) === familyGroup) {
      score = 17;
    } else if (String(actualRacket || "").toLowerCase().includes(String(targetFamily).split(" ")[0].toLowerCase())) {
      score = 16;
    }

    return {
      label: "Racket Fit",
      score,
      max: 20
    };
  }

  function scoreProStringAnchor(entry, example, profile) {
    let score = 9;

    if (entry) {
      score += 5;
    }
    if (entry?.type && entry.type !== "Unknown") {
      score += 3;
    }
    if (entry?.gauge && entry.gauge !== "Unknown") {
      score += 2;
    }

    if (example.style === "Aggressive Baseliner" && (profile.spin >= 7 || profile.control >= 7)) {
      score += 4;
    } else if (example.style === "All-Court" && profile.control >= 7 && profile.comfort >= 6) {
      score += 4;
    } else if (example.style === "Flat Hitter" && profile.control >= 8) {
      score += 4;
    } else if (example.style === "Heavy Topspin" && profile.spin >= 8) {
      score += 4;
    }

    return {
      label: "String Anchor",
      score: clampWhole(score, 0, 20),
      max: 20
    };
  }

  function scoreProTensionReference(hasLiveTension, hasTensionBand) {
    return {
      label: "Tension Ref",
      score: hasLiveTension ? 15 : hasTensionBand ? 11 : 6,
      max: 15
    };
  }

  function scoreProComfortBalance(example, entry, profile) {
    let score = 5;

    if (profile.comfort >= 6 && profile.comfort <= 8) {
      score += 2;
    } else if (profile.comfort >= 5) {
      score += 1;
    }

    if (profile.durability >= 6) {
      score += 2;
    }

    if (example.style === "All-Court" && profile.comfort >= 6) {
      score += 1;
    }

    if (entry?.type === "Natural Gut" || entry?.type === "Multifilament") {
      score += 1;
    }

    return {
      label: "Comfort Balance",
      score: clampWhole(score, 0, 10),
      max: 10
    };
  }

  function scoreProfileAgainstTarget(profile, target, maxScore) {
    let weightedTotal = 0;
    let totalWeight = 0;

    Object.entries(target).forEach(([metric, config]) => {
      const actual = profile[metric] || 0;
      const closeness = 10 - Math.abs(actual - config.value);
      weightedTotal += closeness * config.weight;
      totalWeight += config.weight;
    });

    if (!totalWeight) {
      return 0;
    }

    return clampWhole((weightedTotal / totalWeight / 10) * maxScore, 0, maxScore);
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

  function findAnyPlayerRacket(player) {
    return findBestPlayerMatch(player, "proRackets");
  }

  function findPlayerTension(entry, player) {
    if (!entry || !player) {
      return null;
    }

    return (entry.proTensions || []).find((item) => item.player === player) || null;
  }

  function findAnyPlayerTension(player) {
    return findBestPlayerMatch(player, "proTensions");
  }

  function findBestPlayerMatch(player, collectionKey) {
    const playerKey = normalizePlayerName(player);
    let bestMatch = null;

    strings.forEach((entry) => {
      (entry[collectionKey] || []).forEach((item) => {
        if (normalizePlayerName(item.player) !== playerKey) {
          return;
        }

        const match = {
          ...item,
          entry
        };

        if (!bestMatch || scoreEntryForPlayer(entry, player) > scoreEntryForPlayer(bestMatch.entry, player)) {
          bestMatch = match;
        }
      });
    });

    return bestMatch;
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

  function joinLabels(labels) {
    if (labels.length <= 1) {
      return labels[0] || "overall fit";
    }

    if (labels.length === 2) {
      return `${labels[0]} and ${labels[1]}`;
    }

    return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
  }

  function clampWhole(value, min = 0, max = 100) {
    return Math.min(max, Math.max(min, Math.round(value)));
  }

  function normalizePlayerName(value) {
    return String(value || "").trim().toLowerCase();
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
