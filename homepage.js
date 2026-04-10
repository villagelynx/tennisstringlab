const recommendationApi = window.TennisSetupRecommendations;

if (!recommendationApi) {
  throw new Error("Recommendation engine failed to load.");
}

const state = recommendationApi.normalizeState({
  problem: "spin",
  style: "baseline",
  feel: "balanced"
});

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

const heroSetupCta = document.getElementById("heroSetupCta");
const analyzerSetupCta = document.getElementById("analyzerSetupCta");
const resultSetupCta = document.getElementById("resultSetupCta");

function renderList(target, items) {
  if (!target) return;
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function syncSetupLinks() {
  const query = recommendationApi.toQueryString(state);
  const href = new URL(`./setup-result.html?${query}`, window.location.href).href;

  [heroSetupCta, analyzerSetupCta, resultSetupCta].forEach((link) => {
    if (link) {
      link.href = href;
    }
  });
}

function updateRecommendation() {
  const recommendation = recommendationApi.buildRecommendation(state);

  if (previewBadge) previewBadge.textContent = recommendation.styleLabel;
  if (previewTitle) previewTitle.textContent = recommendation.shortTitle;
  if (previewMeta) previewMeta.textContent = recommendation.meta;
  if (metricSpin) metricSpin.textContent = recommendation.metrics.spin;
  if (metricControl) metricControl.textContent = recommendation.metrics.control;
  if (metricComfort) metricComfort.textContent = recommendation.metrics.comfort;
  renderList(previewBullets, recommendation.benefits);

  if (resultTitle) resultTitle.textContent = recommendation.title;
  if (resultSummary) resultSummary.textContent = recommendation.summary;
  if (resultChip1) resultChip1.textContent = recommendation.chips[0];
  if (resultChip2) resultChip2.textContent = recommendation.chips[1];
  if (resultChip3) resultChip3.textContent = recommendation.chips[2];
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

updateRecommendation();
