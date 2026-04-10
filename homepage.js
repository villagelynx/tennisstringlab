const setupPresets = {
  spin: {
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
    title: "Luxilon 4G Soft 16L @ 50-52 lbs",
    shortTitle: "Luxilon 4G Soft 16L",
    meta: "Use this when your current setup feels jumpy, too hot, or hard to trust on full swings.",
    summary: "Control-first starting point for players fighting launch and wanting a firmer, calmer ball flight.",
    metrics: { spin: "+9%", control: "+16%", comfort: "+7%" },
    chips: ["+16% control feel", "Lower launch", "Tighter response"],
    benefits: [
      "Firms up impact so you can swing through targets with less fear.",
      "Helps flattening players keep the ball inside the baseline.",
      "Makes directional misses easier to diagnose."
    ],
    alt: [
      "Drop 1-2 lbs if it feels too rigid in a stiff frame.",
      "Blend with a softer cross if you want control without harshness.",
      "Use Compare Strings to test lower-powered alternatives side by side."
    ]
  },
  control: {
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
    title: "Head Velocity MLT 16 @ 51-53 lbs",
    shortTitle: "Head Velocity MLT 16",
    meta: "A comfort-first starting point for players managing harsh impact, dead feel, or arm irritation.",
    summary: "Softer multi recommendation that gives easier pocketing, less sting, and a friendlier full-session response.",
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
  baseline: "Baseline attacker",
  allcourt: "All-court player",
  topspin: "Heavy topspin player",
  flat: "Flat ball striker"
};

const feelNotes = {
  soft: "Bias the lower end of the range for easier pocketing and a friendlier impact.",
  balanced: "Stay in the middle of the range so you keep both control and comfort in play.",
  crisp: "Use the upper end of the range if you want a tighter, more direct response."
};

const state = {
  problem: "spin",
  style: "baseline",
  feel: "balanced"
};

const previewBadge = document.getElementById("previewBadge");
const previewTitle = document.getElementById("previewTitle");
const previewMeta = document.getElementById("previewMeta");
const previewBullets = document.getElementById("previewBullets");
const metricSpin = document.getElementById("metricSpin");
const metricControl = document.getElementById("metricControl");
const metricComfort = document.getElementById("metricComfort");

const resultTitle = document.getElementById("resultTitle");
const resultSummary = document.getElementById("resultSummary");
const resultChip1 = document.getElementById("resultChip1");
const resultChip2 = document.getElementById("resultChip2");
const resultChip3 = document.getElementById("resultChip3");
const resultBenefits = document.getElementById("resultBenefits");
const resultAltList = document.getElementById("resultAltList");

function renderList(target, items) {
  if (!target) return;
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function updateRecommendation() {
  const preset = setupPresets[state.problem];
  const styleLabel = styleLabels[state.style] || "Competitive player";
  const feelNote = feelNotes[state.feel] || "Stay in the middle of the range for balance.";

  if (previewBadge) previewBadge.textContent = styleLabel;
  if (previewTitle) previewTitle.textContent = preset.shortTitle;
  if (previewMeta) previewMeta.textContent = `${preset.meta} ${feelNote}`;
  if (metricSpin) metricSpin.textContent = preset.metrics.spin;
  if (metricControl) metricControl.textContent = preset.metrics.control;
  if (metricComfort) metricComfort.textContent = preset.metrics.comfort;
  renderList(previewBullets, preset.benefits);

  if (resultTitle) resultTitle.textContent = preset.title;
  if (resultSummary) resultSummary.textContent = `${preset.summary} ${feelNote}`;
  if (resultChip1) resultChip1.textContent = preset.chips[0];
  if (resultChip2) resultChip2.textContent = preset.chips[1];
  if (resultChip3) resultChip3.textContent = preset.chips[2];
  renderList(resultBenefits, preset.benefits);
  renderList(resultAltList, preset.alt);
}

document.querySelectorAll(".choice-pill").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.group;
    const value = button.dataset.value;
    if (!group || !value) return;

    state[group] = value;

    document.querySelectorAll(`.choice-pill[data-group="${group}"]`).forEach((pill) => {
      pill.classList.toggle("is-active", pill === button);
    });

    updateRecommendation();
  });
});

updateRecommendation();
