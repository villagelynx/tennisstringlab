const recommendationApi = window.TennisSetupRecommendations;

if (!recommendationApi) {
  throw new Error("Recommendation engine failed to load.");
}

const state = recommendationApi.normalizeState({
  problem: "spin",
  style: "baseline",
  feel: "balanced",
  racket: "pureaero"
});

const previewBadge = document.getElementById("previewBadge");
const previewTitle = document.getElementById("previewTitle");
const previewScore = document.getElementById("previewScore");
const previewScoreSummary = document.getElementById("previewScoreSummary");
const previewMeta = document.getElementById("previewMeta");
const previewBullets = document.getElementById("previewBullets");
const metricSpin = document.getElementById("metricSpin");
const metricControl = document.getElementById("metricControl");
const metricComfort = document.getElementById("metricComfort");

const resultTitle = document.getElementById("resultTitle");
const resultSummary = document.getElementById("resultSummary");
const resultBenefits = document.getElementById("resultBenefits");
const resultAltList = document.getElementById("resultAltList");

const heroSetupCta = document.getElementById("heroSetupCta");
const analyzerSetupCta = document.getElementById("analyzerSetupCta");
const resultSetupCta = document.getElementById("resultSetupCta");
const premiumReportCta = document.getElementById("premiumReportCta");
const analyzerStyleSelect = document.getElementById("analyzerStyleSelect");
const analyzerRacketSelect = document.getElementById("analyzerRacketSelect");

function renderList(target, items) {
  if (!target) return;
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function syncSetupLinks() {
  const query = recommendationApi.toQueryString(state);
  const href = new URL(`./setup-result.html?${query}`, window.location.href).href;
  const premiumHref = new URL(`./premium-report.html?${query}`, window.location.href).href;

  [analyzerSetupCta, resultSetupCta].forEach((link) => {
    if (link) {
      link.href = href;
    }
  });

  if (premiumReportCta) {
    premiumReportCta.href = premiumHref;
  }
}

function updateRecommendation() {
  const recommendation = recommendationApi.buildRecommendation(state);

  if (previewBadge) previewBadge.textContent = recommendation.styleLabel;
  if (previewTitle) previewTitle.textContent = recommendation.shortTitle;
  if (previewScore) previewScore.textContent = `${recommendation.score.total}/100`;
  if (previewScoreSummary) previewScoreSummary.textContent = recommendation.score.summary;
  if (previewMeta) previewMeta.textContent = `${recommendation.meta} ${recommendation.racketNote}`;
  if (metricSpin) metricSpin.textContent = recommendation.metrics.spin;
  if (metricControl) metricControl.textContent = recommendation.metrics.control;
  if (metricComfort) metricComfort.textContent = recommendation.metrics.comfort;
  renderList(previewBullets, recommendation.benefits);

  if (resultTitle) resultTitle.textContent = recommendation.title;
  if (resultSummary) resultSummary.textContent = recommendation.summary;
  renderList(resultBenefits, recommendation.benefits);
  renderList(resultAltList, recommendation.alt);

  syncSetupLinks();
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

[analyzerStyleSelect, analyzerRacketSelect].forEach((select) => {
  if (!select) return;

  select.addEventListener("change", () => {
    const group = select.dataset.group;
    if (!group) return;
    state[group] = select.value;
    updateRecommendation();
  });
});

if (analyzerStyleSelect) {
  analyzerStyleSelect.value = state.style;
}

if (analyzerRacketSelect) {
  analyzerRacketSelect.value = state.racket;
}

updateRecommendation();
