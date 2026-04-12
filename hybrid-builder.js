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
    "Hybrid-Style Multi": 53,
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

  const GOAL_TENSION_ADJUSTMENTS = {
    Balanced: 0,
    Comfort: -1,
    Spin: 0,
    Control: 0.5,
    Power: -0.5,
    Durability: 0.5
  };

  const ARM_TENSION_ADJUSTMENTS = {
    Normal: 0,
    Sensitive: -1,
    "Very Sensitive": -2
  };

  const metricColors = {
    Spin: "#7658d7",
    Control: "#176b9f",
    Comfort: "#ea9b3c",
    Power: "#2f9658",
    Durability: "#5f6a77"
  };

  const elements = {
    mainString: document.getElementById("hybridMainString"),
    crossString: document.getElementById("hybridCrossString"),
    stringList: document.getElementById("hybridStringList"),
    racketFamily: document.getElementById("hybridRacketFamily"),
    goal: document.getElementById("hybridGoal"),
    armComfort: document.getElementById("hybridArmComfort"),
    button: document.getElementById("hybridBuilderButton"),
    report: document.getElementById("hybridBuilderReport")
  };

  if (!elements.mainString || !elements.crossString || !elements.stringList || !elements.racketFamily || !elements.goal || !elements.armComfort || !elements.button || !elements.report) {
    return;
  }

  populateControls();

  elements.button.addEventListener("click", () => {
    const report = buildReport();
    renderReport(report);
    if (!report.error) {
      trackToolUsage("hybrid_builder_run", "Build Hybrid", {
        mainString: report.main.name,
        crossString: report.cross.name,
        racketFamily: report.racketFamily,
        goal: report.goal
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
      <option value="">Choose a racket family</option>
      ${racketFamilies.map((family) => `<option value="${escapeHtml(family)}">${escapeHtml(family)}</option>`).join("")}
    `;
  }

  function buildReport() {
    const main = findStringEntryByName(elements.mainString.value);
    const cross = findStringEntryByName(elements.crossString.value);
    const racketFamily = elements.racketFamily.value || "";
    const goal = elements.goal.value || "Balanced";
    const armComfort = elements.armComfort.value || "Normal";

    if (!main || !cross) {
      return {
        error: {
          title: "Choose mains and crosses from the database",
          text: "Start typing both strings and choose names the database recognizes so the builder can use the stored string profiles."
        }
      };
    }

    if (main.name === cross.name) {
      return {
        error: {
          title: "Choose 2 different strings",
          text: "Use different strings for mains and crosses. If you want to check one string by itself, that is closer to a full bed than a hybrid."
        }
      };
    }

    if (!racketFamily) {
      return {
        error: {
          title: "Choose your racket family",
          text: "Add the racket family so the builder can turn the pairing into a more practical starting tension split."
        }
      };
    }

    const profile = buildHybridProfile(main, cross);
    const split = buildStartingSplit(main, cross, racketFamily, goal, armComfort);
    const identity = classifyHybrid(main, cross);
    const hybridScore = buildHybridScore({ main, cross, racketFamily, goal, armComfort, profile, split });

    return {
      main,
      cross,
      racketFamily,
      goal,
      armComfort,
      profile,
      split,
      identity,
      hybridScore,
      snapshotTitle: `${main.name} mains + ${cross.name} crosses`,
      snapshotSummary: `${identity.title} in ${racketFamily}. ${identity.summary}`,
      strengths: buildStrengths(main, cross, profile, goal, identity),
      watchouts: buildWatchouts(main, cross, profile, racketFamily, goal, identity),
      fitLines: buildFitLines(main, cross, profile, split),
      emailDraft: buildEmailDraft(main, cross, racketFamily, goal, armComfort, identity, split, hybridScore)
    };
  }

  function renderReport(report) {
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
          <p class="eyebrow">Hybrid Snapshot</p>
          <h3 class="tool-recommendation-name">${escapeHtml(report.snapshotTitle)}</h3>
          <p class="tool-note">${escapeHtml(report.snapshotSummary)}</p>
        </div>
        <div class="setup-fit-panel">
          <div class="setup-fit-total">
            <span class="setup-fit-kicker">Hybrid setup score</span>
            <strong>${report.hybridScore.total}/100</strong>
            <p class="tool-note tool-note-compact">${escapeHtml(report.hybridScore.summary)}</p>
          </div>
          <div class="setup-fit-breakdown">
            ${report.hybridScore.breakdown.map((item) => `
              <div class="setup-fit-breakdown-item">
                <span>${escapeHtml(item.label)}</span>
                <strong>${item.score}/${item.max}</strong>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="tool-stat-grid">
          <div class="tool-stat">
            <span class="tool-stat-label">Mains / Crosses</span>
            <strong>${escapeHtml(report.split.lbsSplit)}</strong>
            <span class="tool-stat-note">${escapeHtml(report.split.kgSplit)}</span>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Hybrid Goal</span>
            <strong>${escapeHtml(report.goal)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Racket Family</span>
            <strong>${escapeHtml(report.racketFamily)}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Arm Comfort</span>
            <strong>${escapeHtml(report.armComfort)}</strong>
          </div>
        </div>
        <p class="tool-mini-line">${escapeHtml(report.split.note)}</p>
        <div class="tool-inline-actions">
          <button class="secondary-button compact-button hybrid-builder-email-stringer" type="button">Email Hybrid to Stringer</button>
        </div>
      </section>

      <section class="compare-tool-report-card">
        <div class="compare-tool-summary-grid">
          ${renderStringCard("Mains", report.main)}
          ${renderStringCard("Crosses", report.cross)}
        </div>
      </section>

      <section class="setup-analyzer-report-card">
        <div class="setup-analyzer-card-header">
          <p class="eyebrow">Performance Profile</p>
          <h3>What this hybrid likely emphasizes</h3>
        </div>
        <div class="setup-analyzer-score-list">
          ${[
            { label: "Spin", score: report.profile.spin, color: metricColors.Spin },
            { label: "Control", score: report.profile.control, color: metricColors.Control },
            { label: "Comfort", score: report.profile.comfort, color: metricColors.Comfort },
            { label: "Power", score: report.profile.power, color: metricColors.Power },
            { label: "Durability", score: report.profile.durability, color: metricColors.Durability }
          ].map((row) => `
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
          <p class="eyebrow">What This Hybrid Is Trying To Do</p>
          <h3>Likely strengths</h3>
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
          <p class="eyebrow">Practical Read</p>
          <h3>How to think about this pairing</h3>
        </div>
        <ul class="setup-analyzer-point-list">
          ${report.fitLines.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    `;

    const emailButton = elements.report.querySelector(".hybrid-builder-email-stringer");
    if (emailButton) {
      emailButton.addEventListener("click", () => {
        trackToolUsage("hybrid_builder_email_stringer", "Email Hybrid to Stringer", {
          mainString: report.main.name,
          crossString: report.cross.name
        });
        openMailDraft(report.emailDraft);
      });
    }
  }

  function renderStringCard(label, entry) {
    return `
      <article class="compare-tool-string-card">
        <div>
          <p class="eyebrow">${escapeHtml(label)}</p>
          <h4>${escapeHtml(entry.name)}</h4>
          <p class="summary-copy">${escapeHtml(entry.summary || "No short summary saved yet.")}</p>
        </div>
        <div class="tool-stat-grid">
          <div class="tool-stat">
            <span class="tool-stat-label">Type</span>
            <strong>${escapeHtml(entry.type || "Unknown")}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Gauge</span>
            <strong>${escapeHtml(entry.gauge || "Unknown")}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Feel</span>
            <strong>${escapeHtml(entry.feel || "Balanced")}</strong>
          </div>
          <div class="tool-stat">
            <span class="tool-stat-label">Racket Fit</span>
            <strong>${escapeHtml(entry.racketFamily || "General fit")}</strong>
          </div>
        </div>
      </article>
    `;
  }

  function buildHybridProfile(main, cross) {
    const mainWeight = 0.68;
    const crossWeight = 0.32;

    return {
      spin: blendMetric(main.spin, cross.spin, mainWeight, crossWeight),
      control: blendMetric(main.control, cross.control, mainWeight, crossWeight),
      comfort: blendMetric(main.comfort, cross.comfort, mainWeight, crossWeight),
      power: blendMetric(main.power, cross.power, mainWeight, crossWeight),
      durability: blendMetric(main.durability, cross.durability, mainWeight, crossWeight)
    };
  }

  function buildStartingSplit(main, cross, racketFamily, goal, armComfort) {
    const mainType = normalizeType(main.type);
    const base = TENSION_TYPE_BASE[mainType] ?? 50;
    const racketAdjustment = TENSION_RACKET_ADJUSTMENTS[racketFamily] || 0;
    const goalAdjustment = GOAL_TENSION_ADJUSTMENTS[goal] || 0;
    const armAdjustment = ARM_TENSION_ADJUSTMENTS[armComfort] || 0;
    const baseTarget = clampNumber(roundToHalf(base + racketAdjustment + goalAdjustment + armAdjustment), 42, 58);
    const stiffnessGap = getTypeStiffness(main.type) - getTypeStiffness(cross.type);
    let mainsTarget = baseTarget;
    let crossesTarget = baseTarget;
    let note = "Start the mains and crosses even, then move one side 1-2 lbs after the first hit if you need more control, comfort, or pocketing.";

    if (stiffnessGap >= 2) {
      mainsTarget = clampNumber(roundToHalf(baseTarget - 0.5), 42, 58);
      crossesTarget = clampNumber(roundToHalf(baseTarget + 1), 42, 58);
      note = "The softer cross can start a little tighter than the firmer main so the bed does not get too lively too quickly.";
    } else if (stiffnessGap <= -2) {
      mainsTarget = clampNumber(roundToHalf(baseTarget + 0.5), 42, 58);
      crossesTarget = clampNumber(roundToHalf(baseTarget - 1), 42, 58);
      note = "The stiffer cross can start a little lower than the softer main so the bed does not lock up too quickly.";
    }

    return {
      mains: mainsTarget,
      crosses: crossesTarget,
      lbsSplit: `${formatTensionValue(mainsTarget)} / ${formatTensionValue(crossesTarget)} lbs`,
      kgSplit: `${formatTensionValue(toKilograms(mainsTarget))} / ${formatTensionValue(toKilograms(crossesTarget))} kg`,
      note
    };
  }

  function classifyHybrid(main, cross) {
    const mainSoft = isSoftType(main.type);
    const crossSoft = isSoftType(cross.type);
    const mainPoly = isPolyType(main.type);
    const crossPoly = isPolyType(cross.type);

    if (mainPoly && crossSoft) {
      return {
        title: "Poly main + soft cross hybrid",
        summary: "This is a classic control-plus-comfort hybrid shape. The firmer main drives the response while the softer cross opens the comfort window a little."
      };
    }

    if (mainSoft && crossPoly) {
      return {
        title: "Soft main + poly cross hybrid",
        summary: "This leans more toward touch and pocketing than a full poly bed, while the firmer cross helps keep the response from getting too loose."
      };
    }

    if (mainPoly && crossPoly) {
      return {
        title: "Poly + poly hybrid",
        summary: "This is a firmer, more control-first hybrid. It can make sense if you want a very specific feel shift between the two strings rather than a softer overall bed."
      };
    }

    if (mainSoft && crossSoft) {
      return {
        title: "Comfort / touch hybrid",
        summary: "This leans toward feel, easier power, and forgiveness rather than maximum spin durability."
      };
    }

    return {
      title: "Balanced blended hybrid",
      summary: "This is a mixed-category hybrid meant to blend two different responses rather than double down on one single string family."
    };
  }

  function buildStrengths(main, cross, profile, goal, identity) {
    const strengths = [];
    const topMetrics = getTopMetrics(profile);

    strengths.push(`${main.name} in the mains should drive most of the ${joinLabels(topMetrics)} in this build.`);

    if (isSoftType(cross.type)) {
      strengths.push(`${cross.name} in the crosses should make the bed a little easier to live with than a full bed of ${main.name}.`);
    } else if (isPolyType(cross.type)) {
      strengths.push(`${cross.name} in the crosses should keep the response a little cleaner and more disciplined than a full soft setup.`);
    } else {
      strengths.push(`${cross.name} in the crosses should tune the response without changing the overall identity of the mains too dramatically.`);
    }

    if (goal === "Comfort") {
      strengths.push("This pairing makes more sense if you want some control and shape without committing to the firmest possible full bed.");
    } else if (goal === "Spin") {
      strengths.push("If you are building for spin, the main string choice here is doing most of that work, which is usually the right place to bias the hybrid.");
    } else if (goal === "Control") {
      strengths.push("This build should feel easier to guide if you swing through the ball and want the response to stay readable.");
    } else if (goal === "Power") {
      strengths.push("The softer side of the hybrid should help the bed feel a little less effort-heavy than a control-first full bed.");
    } else if (goal === "Durability") {
      strengths.push("This setup keeps at least some durability intent in the build while still using the cross string to tune the overall feel.");
    } else {
      strengths.push(identity.summary);
    }

    return strengths.slice(0, 4);
  }

  function buildWatchouts(main, cross, profile, racketFamily, goal, identity) {
    const watchouts = [];

    if (isPolyType(main.type) && isPolyType(cross.type)) {
      watchouts.push("Both sides of this hybrid are still firm. If comfort matters, keep the split conservative and restring before the bed goes dead.");
    }

    if (isSoftType(main.type) && isSoftType(cross.type)) {
      watchouts.push("This should feel friendlier, but durability and directional stability may drop faster than a firmer hybrid.");
    }

    if (profile.power >= 8 && ["Babolat Pure Drive", "Wilson Clash", "Yonex Ezone", "Power Frame"].includes(racketFamily)) {
      watchouts.push("In a power-oriented frame, this pairing may launch a little more lively than expected unless you keep the split disciplined.");
    }

    if (goal === "Comfort" && profile.comfort <= 5) {
      watchouts.push("If comfort is the main brief, this pairing may still be firmer than the goal suggests. A softer main or softer cross would move the needle more.");
    }

    if (goal === "Durability" && profile.durability <= 6) {
      watchouts.push("If durability is the priority, this build may not hold up as long as the goal suggests, especially if the softer side frays or loses shape early.");
    }

    if (main.type === "Hybrid" || cross.type === "Hybrid") {
      watchouts.push("One side of this build is already labeled as a hybrid product, so pairing it again can make the setup logic harder to read cleanly.");
    }

    if (!watchouts.length) {
      watchouts.push(`The main tradeoff here is simply that ${identity.title.toLowerCase()} setups still need a few sessions to dial in. Start simple before over-correcting the split.`);
    }

    return watchouts.slice(0, 4);
  }

  function buildFitLines(main, cross, profile, split) {
    const fitLines = [
      `Think of ${main.name} as the string setting the tone. The crosses mainly tune around it rather than replacing its identity.`,
      `A sensible first hit is about ${split.lbsSplit}. If the bed feels too boardy, lower the firmer side first. If it feels too lively, bring the softer side up first.`,
      profile.spin >= 8
        ? "This hybrid projects as shape-friendly on paper, so it should suit players who like to swing through the ball rather than guide it."
        : "This hybrid does not look built purely for maximum shape. It makes more sense if you value balance, touch, or response over raw spin.",
      profile.comfort >= 7
        ? "The comfort window looks better than a typical firm full bed, which is usually the main point of building this kind of hybrid."
        : "The comfort score is only moderate, so do not assume 'hybrid' automatically means soft."
    ];

    return fitLines.slice(0, 4);
  }

  function buildEmailDraft(main, cross, racketFamily, goal, armComfort, identity, split, hybridScore) {
    const lines = [
      "Hi,",
      "",
      "Could you please string this hybrid setup for me?",
      "",
      `Mains: ${main.name} ${main.gauge || ""}`.trim(),
      `Crosses: ${cross.name} ${cross.gauge || ""}`.trim(),
      `Racket family: ${racketFamily}`,
      `Hybrid goal: ${goal}`,
      `Arm comfort: ${armComfort}`,
      `Suggested starting split: ${split.lbsSplit} (${split.kgSplit})`,
      `Hybrid type: ${identity.title}`,
      `Hybrid setup score: ${hybridScore.total}/100`,
      `Split note: ${split.note}`,
      main.summary ? `Main string note: ${main.summary}` : "",
      cross.summary ? `Cross string note: ${cross.summary}` : "",
      "",
      "Generated with TennisSetup.com"
    ].filter(Boolean);

    return {
      subject: `Hybrid setup request: ${main.name} / ${cross.name}`,
      body: lines.join("\n")
    };
  }

  function buildHybridScore({ main, cross, racketFamily, goal, armComfort, profile, split }) {
    const breakdown = [
      { label: "Goal Fit", score: scoreHybridGoalFit(profile, goal), max: 30 },
      { label: "Racket Fit", score: scoreHybridRacketFit(main, cross, racketFamily), max: 20 },
      { label: "String Pairing", score: scoreHybridPairingFit(main, cross, profile, goal), max: 20 },
      { label: "Split + Feel", score: scoreHybridSplitFit(split, goal), max: 15 },
      { label: "Comfort + Safety", score: scoreHybridComfortFit(main, cross, profile, armComfort), max: 15 }
    ];
    const total = clampWhole(breakdown.reduce((sum, item) => sum + item.score, 0), 0, 100);

    return {
      total,
      breakdown,
      summary: buildHybridScoreSummary(total, breakdown)
    };
  }

  function scoreHybridGoalFit(profile, goal) {
    const targets = {
      Balanced: {
        spin: { value: 7, weight: 1.5 },
        control: { value: 7, weight: 1.5 },
        comfort: { value: 7, weight: 1.5 },
        power: { value: 7, weight: 1.5 },
        durability: { value: 6, weight: 1 }
      },
      Comfort: {
        comfort: { value: 9, weight: 3 },
        power: { value: 7, weight: 1.5 },
        control: { value: 6, weight: 1.5 },
        spin: { value: 5, weight: 1 },
        durability: { value: 5, weight: 1 }
      },
      Spin: {
        spin: { value: 9, weight: 3 },
        control: { value: 7, weight: 2 },
        durability: { value: 7, weight: 1.5 },
        power: { value: 6, weight: 1 },
        comfort: { value: 5, weight: 1 }
      },
      Control: {
        control: { value: 9, weight: 3 },
        spin: { value: 7, weight: 1.5 },
        durability: { value: 7, weight: 1.5 },
        comfort: { value: 5, weight: 1 },
        power: { value: 5, weight: 1 }
      },
      Power: {
        power: { value: 9, weight: 3 },
        comfort: { value: 7, weight: 1.5 },
        spin: { value: 6, weight: 1.5 },
        control: { value: 5, weight: 1 },
        durability: { value: 5, weight: 1 }
      },
      Durability: {
        durability: { value: 9, weight: 3 },
        control: { value: 7, weight: 1.5 },
        spin: { value: 6, weight: 1.5 },
        power: { value: 5, weight: 1 },
        comfort: { value: 5, weight: 1 }
      }
    };

    return scoreProfileAgainstTarget(profile, targets[goal] || targets.Balanced, 30);
  }

  function scoreHybridRacketFit(main, cross, racketFamily) {
    const mainScore = scoreEntryRacketFit(main, racketFamily);
    const crossScore = scoreEntryRacketFit(cross, racketFamily);
    const normalized = (mainScore * 0.6) + (crossScore * 0.4);
    return clampWhole((normalized / 10) * 20, 0, 20);
  }

  function scoreHybridPairingFit(main, cross, profile, goal) {
    let score = 10;
    const mainPoly = isPolyType(main.type);
    const crossPoly = isPolyType(cross.type);
    const mainSoft = isSoftType(main.type);
    const crossSoft = isSoftType(cross.type);

    if (mainPoly && crossSoft) {
      score += 6;
    } else if (mainSoft && crossPoly) {
      score += 5;
    } else if (mainPoly && crossPoly) {
      score += 2;
    } else if (mainSoft && crossSoft) {
      score += 3;
    } else {
      score += 4;
    }

    const gaugeGap = Math.abs(parseGaugeValue(main.gauge) - parseGaugeValue(cross.gauge));
    if (Number.isFinite(gaugeGap)) {
      if (gaugeGap <= 0.5) {
        score += 2;
      } else if (gaugeGap <= 1) {
        score += 1;
      }
    }

    if (goal === "Comfort" && crossSoft) {
      score += 2;
    } else if (goal === "Spin" && mainPoly) {
      score += 2;
    } else if (goal === "Control" && (mainPoly || crossPoly)) {
      score += 1;
    } else if (goal === "Power" && (mainSoft || crossSoft)) {
      score += 2;
    } else if (goal === "Durability" && (mainPoly || crossPoly)) {
      score += 2;
    }

    if (profile.comfort <= 4 && mainPoly && crossPoly) {
      score -= 2;
    }

    return clampWhole(score, 0, 20);
  }

  function scoreHybridSplitFit(split, goal) {
    let score = 8;
    const average = (split.mains + split.crosses) / 2;
    const gap = Math.abs(split.mains - split.crosses);

    if (average >= 45 && average <= 55) {
      score += 3;
    } else if (average >= 43 && average <= 57) {
      score += 2;
    } else {
      score += 1;
    }

    if (gap <= 1.5) {
      score += 2;
    } else if (gap <= 2.5) {
      score += 1;
    }

    if (goal === "Comfort" && average <= 51) {
      score += 2;
    } else if (goal === "Power" && average <= 51.5) {
      score += 2;
    } else if ((goal === "Control" || goal === "Durability") && average >= 49) {
      score += 2;
    } else if (goal === "Spin" && average >= 47 && average <= 52) {
      score += 2;
    } else if (goal === "Balanced" && average >= 48 && average <= 52) {
      score += 2;
    }

    return clampWhole(score, 0, 15);
  }

  function scoreHybridComfortFit(main, cross, profile, armComfort) {
    let score = 6;
    const bothPoly = isPolyType(main.type) && isPolyType(cross.type);
    const hasSoftSide = isSoftType(main.type) || isSoftType(cross.type);

    if (profile.comfort >= 8) {
      score += 5;
    } else if (profile.comfort >= 6) {
      score += 3;
    } else if (profile.comfort >= 5) {
      score += 1;
    }

    if (armComfort === "Very Sensitive") {
      if (hasSoftSide) {
        score += 3;
      }
      if (bothPoly) {
        score -= 3;
      }
      if (profile.comfort <= 5) {
        score -= 2;
      }
    } else if (armComfort === "Sensitive") {
      if (hasSoftSide) {
        score += 2;
      }
      if (bothPoly) {
        score -= 1;
      }
    } else if (profile.control >= 6 || profile.durability >= 6) {
      score += 1;
    }

    if (isSoftType(cross.type)) {
      score += 1;
    }

    return clampWhole(score, 0, 15);
  }

  function buildHybridScoreSummary(total, breakdown) {
    const strongest = [...breakdown]
      .map((item) => ({ ...item, ratio: item.max ? item.score / item.max : 0 }))
      .sort((left, right) => right.ratio - left.ratio)
      .slice(0, 2)
      .map((item) => item.label.toLowerCase());
    const strongestText = strongest.length === 2
      ? `${strongest[0]} and ${strongest[1]}`
      : strongest[0] || "overall balance";

    if (total >= 84) {
      return `Excellent hybrid fit for ${strongestText}.`;
    }

    if (total >= 72) {
      return `Strong hybrid fit for ${strongestText}.`;
    }

    if (total >= 60) {
      return `Solid starting hybrid, especially for ${strongestText}.`;
    }

    return `Interesting hybrid idea, but it still needs more dialing-in around ${strongestText}.`;
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

  function scoreEntryRacketFit(entry, racketFamily) {
    const targetGroup = getRacketFamilyGroup(racketFamily);
    const entryFamily = String(entry.racketFamily || "").trim();

    if (!entryFamily || entryFamily === "General fit") {
      return 7;
    }

    if (entryFamily === racketFamily) {
      return 10;
    }

    if (getRacketFamilyGroup(entryFamily) === targetGroup) {
      return 8;
    }

    if (isSoftType(entry.type) && targetGroup === "control") {
      return 6;
    }

    if (isPolyType(entry.type) && (targetGroup === "spin" || targetGroup === "control")) {
      return 6;
    }

    return 5;
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

  function parseGaugeValue(gauge) {
    const match = String(gauge || "").match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : NaN;
  }

  function clampWhole(value, min = 0, max = 100) {
    return clampNumber(Math.round(value), min, max);
  }

  function blendMetric(mainValue, crossValue, mainWeight, crossWeight) {
    const blended = (convertLevelToTen(mainValue) * mainWeight) + (convertLevelToTen(crossValue) * crossWeight);
    return clampNumber(Math.round(blended), 1, 10);
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

  function getTopMetrics(profile) {
    return Object.entries(profile)
      .sort((left, right) => right[1] - left[1])
      .slice(0, 2)
      .map(([label]) => label);
  }

  function normalizeType(type) {
    if (type === "Poly" || type === "Co-Poly") {
      return "Co-Poly";
    }
    return type;
  }

  function isPolyType(type) {
    return type === "Poly" || type === "Co-Poly";
  }

  function isSoftType(type) {
    return ["Multifilament", "Natural Gut", "Synthetic Gut", "Hybrid-Style Multi"].includes(type);
  }

  function getTypeStiffness(type) {
    const map = {
      "Natural Gut": 1,
      Multifilament: 2,
      "Hybrid-Style Multi": 2.5,
      "Synthetic Gut": 3,
      Hybrid: 3.5,
      Poly: 5,
      "Co-Poly": 5
    };

    return map[type] || 3.5;
  }

  function roundToHalf(value) {
    return Math.round(value * 2) / 2;
  }

  function toKilograms(value) {
    return value * 0.45359237;
  }

  function formatTensionValue(value) {
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }

  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
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

  function findStringEntryByName(name) {
    const target = String(name || "").trim().toLowerCase();
    if (!target) {
      return null;
    }

    return strings.find((entry) => String(entry.name || "").trim().toLowerCase() === target) || null;
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
