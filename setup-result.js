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
const resultSetupScore = document.getElementById("resultSetupScore");
const resultScoreSummary = document.getElementById("resultScoreSummary");
const resultScoreIssue = document.getElementById("resultScoreIssue");
const resultScoreRacket = document.getElementById("resultScoreRacket");
const resultScoreString = document.getElementById("resultScoreString");
const resultScoreFeel = document.getElementById("resultScoreFeel");
const resultScoreComfort = document.getElementById("resultScoreComfort");
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
if (resultSetupScore) resultSetupScore.textContent = `${recommendation.score.total}/100`;
if (resultScoreSummary) resultScoreSummary.textContent = recommendation.score.summary;
if (resultScoreIssue) resultScoreIssue.textContent = formatBreakdownScore(recommendation.score.breakdown, "Issue Fit");
if (resultScoreRacket) resultScoreRacket.textContent = formatBreakdownScore(recommendation.score.breakdown, "Racket Fit");
if (resultScoreString) resultScoreString.textContent = formatBreakdownScore(recommendation.score.breakdown, "String + Gauge");
if (resultScoreFeel) resultScoreFeel.textContent = formatBreakdownScore(recommendation.score.breakdown, "Feel Fit");
if (resultScoreComfort) resultScoreComfort.textContent = formatBreakdownScore(recommendation.score.breakdown, "Comfort + Safety");

renderList(resultBenefitsList, recommendation.benefits);
renderList(resultSetupNotes, [
  recommendation.meta,
  recommendation.styleNote,
  recommendation.racketNote,
  recommendation.feelNote
]);
renderList(resultAltList, recommendation.alt);

function formatBreakdownScore(items, label) {
  const row = Array.isArray(items) ? items.find((item) => item.label === label) : null;
  if (!row) {
    return "";
  }
  return `${row.score}/${row.max}`;
}
