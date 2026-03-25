const masterSearchInput = document.getElementById("masterSearchInput");
const masterBrandFilter = document.getElementById("masterBrandFilter");
const masterTypeFilter = document.getElementById("masterTypeFilter");
const masterPlayerFilter = document.getElementById("masterPlayerFilter");
const masterSortSelect = document.getElementById("masterSortSelect");
const masterDatabaseCount = document.getElementById("masterDatabaseCount");
const masterResultsCount = document.getElementById("masterResultsCount");
const masterListTable = document.getElementById("masterListTable");

const masterStrings = Array.isArray(window.TENNIS_STRING_DATA) ? window.TENNIS_STRING_DATA.slice() : [];

function populateMasterFilters() {
  const brands = [...new Set(masterStrings.map((entry) => entry.brand).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const types = [...new Set(masterStrings.map((entry) => entry.type).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const players = [...new Set(masterStrings.flatMap((entry) => [...(entry.atpPlayers || []), ...(entry.wtaPlayers || [])]).filter(Boolean))].sort((a, b) => a.localeCompare(b));

  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    masterBrandFilter.appendChild(option);
  });

  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    masterTypeFilter.appendChild(option);
  });

  players.forEach((player) => {
    const option = document.createElement("option");
    option.value = player;
    option.textContent = player;
    masterPlayerFilter.appendChild(option);
  });
}

function getFilteredMasterStrings() {
  const query = masterSearchInput.value.trim().toLowerCase();
  const brand = masterBrandFilter.value;
  const type = masterTypeFilter.value;
  const player = masterPlayerFilter.value;
  const sort = masterSortSelect.value;

  const filtered = masterStrings.filter((entry) => {
    const matchesQuery = !query || [entry.name, entry.brand, entry.type].filter(Boolean).some((value) => value.toLowerCase().includes(query));
    const matchesBrand = brand === "Any" || entry.brand === brand;
    const matchesType = type === "Any" || entry.type === type;
    const allPlayers = [...(entry.atpPlayers || []), ...(entry.wtaPlayers || [])];
    const matchesPlayer = player === "Any" || allPlayers.includes(player);
    return matchesQuery && matchesBrand && matchesType && matchesPlayer;
  });

  filtered.sort((left, right) => {
    const direction = sort === "za" ? -1 : 1;
    return left.name.localeCompare(right.name) * direction;
  });

  return filtered;
}

function renderMasterList() {
  const filtered = getFilteredMasterStrings();

  masterDatabaseCount.textContent = `${masterStrings.length} strings in database`;
  masterResultsCount.textContent = `${filtered.length} shown`;

  if (!filtered.length) {
    masterListTable.innerHTML = `
      <div class="master-empty-state">
        No strings matched that search. Try a different brand, type, or search term.
      </div>
    `;
    return;
  }

  masterListTable.innerHTML = `
    <div class="master-list-head">
      <span>String Name</span>
      <span>Brand</span>
      <span>Type</span>
      <span>Pro Players</span>
    </div>
    ${filtered.map((entry) => `
      <article class="master-list-row">
        <div class="master-list-name">
          <strong>${entry.name}</strong>
        </div>
        <div class="master-list-meta">${entry.brand || "Unknown"}</div>
        <div class="master-list-meta">${entry.type || "Unknown"}</div>
        <div class="master-list-meta">${formatProPlayers(entry)}</div>
      </article>
    `).join("")}
  `;
}

function formatProPlayers(entry) {
  const players = [...new Set([...(entry.atpPlayers || []), ...(entry.wtaPlayers || [])])];
  if (!players.length) {
    return "None listed";
  }

  if (players.length <= 3) {
    return players.join(", ");
  }

  const visiblePlayers = players.slice(0, 3).join(", ");
  const extraPlayers = players.slice(3).join(", ");
  return `
    <span>${visiblePlayers}</span>
    <details class="master-more-details">
      <summary class="master-more-players">+${players.length - 3} more</summary>
      <div class="master-more-panel">${escapeHtml(extraPlayers)}</div>
    </details>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

[masterSearchInput, masterBrandFilter, masterTypeFilter, masterPlayerFilter, masterSortSelect].forEach((element) => {
  element.addEventListener("input", renderMasterList);
  element.addEventListener("change", renderMasterList);
});

populateMasterFilters();
renderMasterList();
