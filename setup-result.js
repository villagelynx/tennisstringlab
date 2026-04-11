const recommendationApi = window.TennisSetupRecommendations;

if (!recommendationApi) {
  throw new Error("Recommendation engine failed to load.");
}

const state = recommendationApi.fromSearch(window.location.search);
const recommendation = recommendationApi.buildRecommendation(state);

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

const resultHeroTitle = document.getElementById("resultHeroTitle");
const resultHeroSummary = document.getElementById("resultHeroSummary");
const selectionProblem = document.getElementById("selectionProblem");
const selectionStyle = document.getElementById("selectionStyle");
const selectionRacket = document.getElementById("selectionRacket");
const selectionFeel = document.getElementById("selectionFeel");
const shopSetupButton = document.getElementById("shopSetupButton");
const resultMetricSpin = document.getElementById("resultMetricSpin");
const resultMetricControl = document.getElementById("resultMetricControl");
const resultMetricComfort = document.getElementById("resultMetricComfort");
const resultMeta = document.getElementById("resultMeta");
const resultChipA = document.getElementById("resultChipA");
const resultChipB = document.getElementById("resultChipB");
const resultChipC = document.getElementById("resultChipC");
const resultBenefitsList = document.getElementById("resultBenefitsList");
const resultSetupNotes = document.getElementById("resultSetupNotes");
const resultAltList = document.getElementById("resultAltList");
const databaseLinkButton = document.getElementById("databaseLinkButton");

function renderList(target, items) {
  if (!target) return;
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

if (resultHeroTitle) resultHeroTitle.textContent = recommendation.title;
if (resultHeroSummary) resultHeroSummary.textContent = recommendation.summary;
if (selectionProblem) selectionProblem.textContent = problemLabels[recommendation.state.problem] || "Need a better setup";
if (selectionStyle) selectionStyle.textContent = recommendation.styleLabel;
if (selectionRacket) selectionRacket.textContent = recommendation.racketLabel;
if (selectionFeel) selectionFeel.textContent = feelLabels[recommendation.state.feel] || "Balanced feel";
if (shopSetupButton) shopSetupButton.href = recommendation.shopHref;
if (databaseLinkButton) databaseLinkButton.href = recommendation.shopHref;
if (resultMetricSpin) resultMetricSpin.textContent = recommendation.metrics.spin;
if (resultMetricControl) resultMetricControl.textContent = recommendation.metrics.control;
if (resultMetricComfort) resultMetricComfort.textContent = recommendation.metrics.comfort;
if (resultMeta) resultMeta.textContent = recommendation.meta;
if (resultChipA) resultChipA.textContent = recommendation.chips[0];
if (resultChipB) resultChipB.textContent = recommendation.chips[1];
if (resultChipC) resultChipC.textContent = recommendation.chips[2];

renderList(resultBenefitsList, recommendation.benefits);
renderList(resultSetupNotes, [
  recommendation.meta,
  recommendation.styleNote,
  recommendation.racketNote,
  recommendation.feelNote
]);
renderList(resultAltList, recommendation.alt);
