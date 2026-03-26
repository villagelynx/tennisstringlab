const STRING_TYPE_GUIDES = [
  {
    eyebrow: "Poly",
    title: "Poly Strings",
    text: "Poly strings usually favor spin, control, and durability. They are often firmer and work best for stronger players with fast swings who generate their own pace."
  },
  {
    eyebrow: "Co-Poly",
    title: "Co-Poly Strings",
    text: "Co-poly strings are a more refined branch of polyester. They still lean toward spin and control, but many are designed to feel a little livelier, softer, or more comfortable than traditional poly."
  },
  {
    eyebrow: "Multifilament",
    title: "Multifilament Strings",
    text: "Multifilaments are built for comfort, power, and a softer feel. They are often a great fit for players who want easier depth, better arm comfort, or a more forgiving string bed."
  },
  {
    eyebrow: "Natural Gut",
    title: "Natural Gut Strings",
    text: "Natural gut is known for elite feel, comfort, power, and tension maintenance. It is often chosen by players who want premium touch and arm-friendliness, especially in hybrids."
  },
  {
    eyebrow: "Synthetic Gut",
    title: "Synthetic Gut Strings",
    text: "Synthetic gut offers an all-around balance of playability, price, and ease of use. It is often a solid option for developing players or anyone who wants a simple, affordable setup."
  },
  {
    eyebrow: "Hybrid",
    title: "Hybrid Setups",
    text: "Hybrid stringing combines two different strings, usually to blend strengths like spin plus comfort or control plus feel. A common example is poly in one direction and gut or multi in the other."
  }
];

const guideGrid = document.getElementById("stringTypeGuideGrid");
const guideCount = document.getElementById("typeGuideCount");

function renderStringTypeGuides() {
  if (!guideGrid || !guideCount) return;

  guideCount.textContent = `${STRING_TYPE_GUIDES.length} descriptions`;
  guideGrid.innerHTML = STRING_TYPE_GUIDES.map((entry) => `
    <article class="type-guide-card">
      <p class="eyebrow">${entry.eyebrow}</p>
      <h3>${entry.title}</h3>
      <p class="summary-copy">${entry.text}</p>
    </article>
  `).join("");
}

renderStringTypeGuides();
