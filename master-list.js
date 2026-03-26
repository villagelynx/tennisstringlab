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

function styleSpecialSelectOptions(select) {
  if (!select) {
    return;
  }

  Array.from(select.options).forEach((option) => {
    if (option.value === "Any") {
      option.style.background = "#e5f4ff";
      option.style.color = "#134d82";
      option.style.fontWeight = "600";
    }
  });
}

function getFilteredMasterStrings() {
  const query = masterSearchInput.value.trim().toLowerCase();
  const brand = masterBrandFilter.value;
  const type = masterTypeFilter.value;
  const player = masterPlayerFilter.value;
  const sort = masterSortSelect.value;
  const useMostPros = player === "__most_pros__";

  const filtered = masterStrings.filter((entry) => {
    const matchesQuery = !query || [entry.name, entry.brand, entry.type].filter(Boolean).some((value) => value.toLowerCase().includes(query));
    const matchesBrand = brand === "Any" || entry.brand === brand;
    const matchesType = type === "Any" || entry.type === type;
    const allPlayers = [...(entry.atpPlayers || []), ...(entry.wtaPlayers || [])];
    const matchesPlayer = useMostPros || player === "Any" || allPlayers.includes(player);
    return matchesQuery && matchesBrand && matchesType && matchesPlayer;
  });

  filtered.sort((left, right) => {
    if (useMostPros || sort === "pros") {
      return getMasterProCount(right) - getMasterProCount(left) || left.name.localeCompare(right.name);
    }
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
      <span>Details</span>
    </div>
    ${filtered.map((entry) => `
      <details class="master-list-card">
        <summary class="master-list-row master-list-toggle">
          <div class="master-list-name">
            <div class="master-list-name-top">
              <strong>${entry.name}</strong>
              ${renderMasterProBadge(entry)}
            </div>
          </div>
          <div class="master-list-meta">${entry.brand || "Unknown"}</div>
          <div class="master-list-meta">${entry.type || "Unknown"}</div>
          <div class="master-list-meta">${formatProPlayers(entry)}</div>
          <div class="master-details-action">
            <span class="details-label">Details</span>
            <span class="hide-label">Hide</span>
          </div>
        </summary>
        <div class="master-detail-body">
          <p class="master-detail-copy">${entry.summary || "No summary yet."}</p>
          <p class="master-detail-copy">${entry.note || ""}</p>
          <div class="master-detail-grid">
            <span class="tag"><strong>Spin:</strong> ${entry.spin}</span>
            <span class="tag"><strong>Power:</strong> ${entry.power}</span>
            <span class="tag"><strong>Control:</strong> ${entry.control}</span>
            <span class="tag"><strong>Durability:</strong> ${entry.durability}</span>
            <span class="tag"><strong>Comfort:</strong> ${entry.comfort}</span>
            <span class="tag"><strong>Feel:</strong> ${entry.feel}</span>
            <span class="tag"><strong>Gauge:</strong> ${entry.gauge}</span>
            <span class="tag"><strong>Color:</strong> ${entry.stringColor}</span>
            <span class="tag"><strong>Shape:</strong> ${entry.stringShape}</span>
            <span class="tag"><strong>Racket Fit:</strong> ${entry.racketFamily}</span>
            <span class="tag"><strong>Set:</strong> ${typeof formatPrice === "function" ? formatPrice(entry.costPerSet) : "Varies"}</span>
            <span class="tag"><strong>Reel:</strong> ${typeof formatPrice === "function" ? formatPrice(entry.costPerReel) : "Varies"}</span>
          </div>
          <div class="master-detail-section">
            <strong>Pro Players Using</strong>
            <div class="master-detail-copy">${renderFullProPlayers(entry)}</div>
          </div>
          ${renderMasterTensions(entry)}
          ${renderMasterRackets(entry)}
        </div>
      </details>
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

function renderFullProPlayers(entry) {
  const customAssociations = typeof getCustomProAssociations === "function" ? getCustomProAssociations(entry) : { atpPlayers: [], wtaPlayers: [] };
  const atpPlayers = [...new Set([...(entry.atpPlayers || []), ...(customAssociations.atpPlayers || [])])];
  const wtaPlayers = [...new Set([...(entry.wtaPlayers || []), ...(customAssociations.wtaPlayers || [])])];

  if (!atpPlayers.length && !wtaPlayers.length) {
    return "None listed";
  }

  const lines = [];
  if (atpPlayers.length) {
    lines.push(`<div><strong>ATP:</strong> ${escapeHtml(atpPlayers.join(", "))}</div>`);
  }
  if (wtaPlayers.length) {
    lines.push(`<div><strong>WTA:</strong> ${escapeHtml(wtaPlayers.join(", "))}</div>`);
  }
  return lines.join("");
}

function renderMasterProBadge(entry) {
  const customAssociations = typeof getCustomProAssociations === "function" ? getCustomProAssociations(entry) : { atpPlayers: [], wtaPlayers: [] };
  const allPlayers = [...new Set([
    ...(entry.atpPlayers || []),
    ...(entry.wtaPlayers || []),
    ...(customAssociations.atpPlayers || []),
    ...(customAssociations.wtaPlayers || [])
  ])];
  const count = allPlayers.length;
  const title = count ? escapeHtml(allPlayers.join(", ")) : "No pros listed";

  if (count === 0) {
    return "";
  }

  return `
    <div class="pro-count-badge pro-count-badge-small" aria-label="${count} pro players use this string" title="${title}">
      <span>${count}</span>
      <small>Pros</small>
      <div class="pro-count-tooltip">${title}</div>
    </div>
  `;
}

function getMasterProCount(entry) {
  const customAssociations = typeof getCustomProAssociations === "function" ? getCustomProAssociations(entry) : { atpPlayers: [], wtaPlayers: [] };
  return [...new Set([
    ...(entry.atpPlayers || []),
    ...(entry.wtaPlayers || []),
    ...(customAssociations.atpPlayers || []),
    ...(customAssociations.wtaPlayers || [])
  ])].length;
}

function renderMasterTensions(entry) {
  const customAssociations = typeof getCustomProAssociations === "function" ? getCustomProAssociations(entry) : { tensions: [] };
  const items = [...(entry.proTensions || []), ...(customAssociations.tensions || [])];
  if (!items.length) {
    return "";
  }

  return `
    <div class="master-detail-section">
      <strong>Known Pro Tensions</strong>
      ${items.map((item) => `<div class="master-detail-copy">${escapeHtml(item.player)} | ${escapeHtml(item.tension)} | ${escapeHtml(item.detail || "")}</div>`).join("")}
    </div>
  `;
}

function renderMasterRackets(entry) {
  const customAssociations = typeof getCustomProAssociations === "function" ? getCustomProAssociations(entry) : { rackets: [] };
  const items = [...(entry.proRackets || []), ...(customAssociations.rackets || [])];
  if (!items.length) {
    return "";
  }

  return `
    <div class="master-detail-section">
      <strong>Known Pro Rackets</strong>
      ${items.map((item) => `<div class="master-detail-copy">${escapeHtml(item.player)} | ${escapeHtml(item.racket)}</div>`).join("")}
    </div>
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
styleSpecialSelectOptions(masterBrandFilter);
styleSpecialSelectOptions(masterTypeFilter);
styleSpecialSelectOptions(masterPlayerFilter);
styleSpecialSelectOptions(masterSortSelect);
renderMasterList();
