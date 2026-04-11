(function () {
  const setupPresets = {
    spin: {
      key: "spin",
      title: "Solinco Hyper-G 17 @ 48-50 lbs",
      shortTitle: "Solinco Hyper-G 17",
      meta: "Start around 48-50 lbs in a 98-100 sq in frame when you want heavier spin without losing the court.",
      summary: "High-spin poly recommendation for players who want heavier ball shape and a lower launch window without giving away control.",
      metrics: { spin: "+15%", control: "+10%", comfort: "+6%" },
      chips: ["+15% spin feel", "+10% control feel", "Lower launch"],
      benefits: [
        "Improves bite on crosscourt forehands and kick serves.",
        "Keeps bigger cuts from sailing when you accelerate harder.",
        "Still gives a clean benchmark tension range to adjust from."
      ],
      alt: [
        "Start 2 lbs lower if you want easier pocketing and net clearance.",
        "Shift to a softer co-poly if your elbow or shoulder gets tender.",
        "Compare against one round poly before going too shaped too fast."
      ]
    },
    power: {
      key: "power",
      title: "Luxilon 4G Soft 16L @ 50-52 lbs",
      shortTitle: "Luxilon 4G Soft 16L",
      meta: "Use this when your current setup feels jumpy, too hot, or hard to trust on full swings.",
      summary: "Control-first starting point for players fighting launch and wanting a firmer, calmer ball flight.",
      metrics: { spin: "+9%", control: "+16%", comfort: "+7%" },
      chips: ["+16% control feel", "Lower launch", "Tighter response"],
      benefits: [
        "Firms up impact so you can swing through targets with less fear.",
        "Helps flatter hitters keep the ball inside the baseline.",
        "Makes directional misses easier to diagnose."
      ],
      alt: [
        "Drop 1-2 lbs if it feels too rigid in a stiff frame.",
        "Blend with a softer cross if you want control without harshness.",
        "Use Compare Strings to test lower-powered alternatives side by side."
      ]
    },
    control: {
      key: "control",
      title: "Head Hawk Touch 17 @ 49-51 lbs",
      shortTitle: "Head Hawk Touch 17",
      meta: "A clean recommendation when you want more predictable depth, cleaner contact, and better directional trust.",
      summary: "Balanced control setup that keeps the response connected and readable without feeling totally boardy.",
      metrics: { spin: "+10%", control: "+14%", comfort: "+8%" },
      chips: ["+14% control feel", "Cleaner contact", "More trust"],
      benefits: [
        "Stabilizes the launch window on rally balls and return swings.",
        "Gives all-court players a more precise first-volley feel.",
        "Works as a dependable benchmark before chasing something more extreme."
      ],
      alt: [
        "Stay in the middle of the range if you want a more connected pocket.",
        "If you need extra bite, compare against a shaped co-poly next.",
        "If comfort is a bigger issue, use the softer feel option below."
      ]
    },
    comfort: {
      key: "comfort",
      title: "Head Velocity MLT 16 @ 51-53 lbs",
      shortTitle: "Head Velocity MLT 16",
      meta: "A comfort-first starting point for players managing harsh impact, dead feel, or arm irritation.",
      summary: "Softer multifilament recommendation that gives easier pocketing, less sting, and a friendlier full-session response.",
      metrics: { spin: "+7%", control: "+9%", comfort: "+18%" },
      chips: ["+18% comfort feel", "More pocketing", "Less shock"],
      benefits: [
        "Softens the hit immediately if your current setup feels too dead or stiff.",
        "Helps players with elbow or shoulder sensitivity stay on court longer.",
        "Gives a safer baseline before testing firmer hybrids."
      ],
      alt: [
        "Start 2 lbs lower if you want even easier depth and pocketing.",
        "Hybrid it later if you need to add some control back in.",
        "Analyze your current setup to see whether string age is part of the issue."
      ]
    }
  };

  const styleLabels = {
    baseline: "Aggressive baseline player",
    allcourt: "All-court player",
    topspin: "Heavy topspin player",
    flat: "Flat ball striker",
    counterpuncher: "Counterpuncher",
    bigserver: "Big server + first-strike player",
    servevolley: "Serve + volley / doubles-minded player",
    defender: "Defensive grinder"
  };

  const styleNotes = {
    baseline: "Built to reward faster baseline acceleration without giving away the middle of the court.",
    allcourt: "Keeps enough feel and directional trust for transition play, returns, and first volleys.",
    topspin: "Leans into shape, net clearance, and heavier ball rotation when you swing up hard.",
    flat: "Stays cleaner through flatter contact so the ball does not jump unexpectedly off the strings.",
    counterpuncher: "Keeps the response predictable when you redirect pace and stretch points longer.",
    bigserver: "Supports first-strike tennis with a tighter launch and enough trust on aggressive swings.",
    servevolley: "Keeps touch, first-volley control, and transition feel more connected.",
    defender: "Helps you stay in rallies longer without the setup feeling jumpy or unpredictable."
  };

  const racketLabels = {
    pureaero: "Babolat Pure Aero / spin frame",
    blade: "Wilson Blade / control frame",
    puredrive: "Babolat Pure Drive / power frame",
    speed: "Head Speed / balanced frame",
    clash: "Wilson Clash / comfort frame",
    ezone: "Yonex EZONE / modern power frame",
    other: "Other / not sure"
  };

  const racketNotes = {
    pureaero: "This recommendation assumes a spin-friendly frame that already helps with shape and net clearance.",
    blade: "This recommendation assumes a lower-powered control frame that can handle a cleaner, firmer response.",
    puredrive: "This recommendation assumes a livelier power frame, so control and launch management matter more.",
    speed: "This recommendation assumes a balanced modern frame where you can tune either control or comfort without overcorrecting.",
    clash: "This recommendation assumes a softer comfort frame, so you can usually handle a slightly firmer string choice.",
    ezone: "This recommendation assumes a modern power frame with easy pop, so directional trust stays important.",
    other: "This recommendation is meant as a safe starting point even if you are not fully sure how your frame should be classified."
  };

  const feelNotes = {
    soft: "Bias the lower end of the range for easier pocketing and a friendlier impact.",
    balanced: "Stay in the middle of the range so you keep both control and comfort in play.",
    crisp: "Use the upper end of the range if you want a tighter, more direct response."
  };

  function normalizeState(input) {
    return {
      problem: setupPresets[input && input.problem] ? input.problem : "spin",
      style: styleLabels[input && input.style] ? input.style : "baseline",
      feel: feelNotes[input && input.feel] ? input.feel : "balanced",
      racket: racketLabels[input && input.racket] ? input.racket : "pureaero"
    };
  }

  function buildRecommendation(input) {
    const state = normalizeState(input || {});
    const preset = setupPresets[state.problem];
    const feelNote = feelNotes[state.feel];
    const styleNote = styleNotes[state.style];
    const racketNote = racketNotes[state.racket];

    return {
      state,
      preset,
      styleLabel: styleLabels[state.style],
      racketLabel: racketLabels[state.racket],
      feelNote,
      styleNote,
      racketNote,
      title: preset.title,
      shortTitle: preset.shortTitle,
      meta: `${preset.meta} ${feelNote}`,
      summary: `${preset.summary} ${styleNote}`,
      metrics: preset.metrics,
      chips: preset.chips.slice(),
      benefits: preset.benefits.slice(),
      alt: [...preset.alt, racketNote],
      shopHref: `./master-list.html?q=${encodeURIComponent(preset.shortTitle)}`,
      compareHref: `./compare-strings.html`,
      quickSetupHref: `./quick-setup.html`
    };
  }

  function toQueryString(input) {
    const state = normalizeState(input || {});
    return `problem=${encodeURIComponent(state.problem)}&style=${encodeURIComponent(state.style)}&feel=${encodeURIComponent(state.feel)}&racket=${encodeURIComponent(state.racket)}`;
  }

  function fromSearch(search) {
    const params = new URLSearchParams(search || "");
    return normalizeState({
      problem: params.get("problem") || "spin",
      style: params.get("style") || "baseline",
      feel: params.get("feel") || "balanced",
      racket: params.get("racket") || "pureaero"
    });
  }

  window.TennisSetupRecommendations = {
    setupPresets,
    styleLabels,
    styleNotes,
    racketLabels,
    racketNotes,
    feelNotes,
    normalizeState,
    buildRecommendation,
    toQueryString,
    fromSearch
  };
})();
