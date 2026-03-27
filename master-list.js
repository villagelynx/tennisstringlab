const masterSearchInput = document.getElementById("masterSearchInput");
const masterBrandFilter = document.getElementById("masterBrandFilter");
const masterTypeFilter = document.getElementById("masterTypeFilter");
const masterPlayerFilter = document.getElementById("masterPlayerFilter");
const masterSortSelect = document.getElementById("masterSortSelect");
const masterDatabaseCount = document.getElementById("masterDatabaseCount");
const masterResultsCount = document.getElementById("masterResultsCount");
const masterListTable = document.getElementById("masterListTable");
const masterTypeDescriptionCard = document.getElementById("masterTypeDescriptionCard");
const masterTypeDescriptionEyebrow = document.getElementById("masterTypeDescriptionEyebrow");
const masterTypeDescriptionTitle = document.getElementById("masterTypeDescriptionTitle");
const masterTypeDescriptionText = document.getElementById("masterTypeDescriptionText");
const siteI18n = {
  getLanguage() {
    return window.TSL_I18N && typeof window.TSL_I18N.getLanguage === "function"
      ? window.TSL_I18N.getLanguage()
      : "en";
  },
  t(key, fallback, vars) {
    if (window.TSL_I18N && typeof window.TSL_I18N.t === "function") {
      return window.TSL_I18N.t(key, fallback, vars);
    }
    let text = fallback || key || "";
    Object.entries(vars || {}).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, String(value));
    });
    return text;
  }
};

const masterStringsSource = Array.isArray(window.TENNIS_STRING_DATA)
  ? window.TENNIS_STRING_DATA
  : Array.isArray(window.TENNIS_STRING_PLANNER_STRINGS)
    ? window.TENNIS_STRING_PLANNER_STRINGS
    : [];
const masterStrings = masterStringsSource.slice();
const masterTypeDescriptions = window.TENNIS_STRING_TYPE_DESCRIPTIONS || {};
const masterTypeDescriptionTranslations = {
  fr: {
    Any: {
      eyebrow: "Guide des types de cordage",
      title: "Tous les types de cordage",
      text: "Comparez les grandes familles de cordage pour trouver le bon melange de spin, confort, controle et puissance pour votre jeu."
    },
    Poly: {
      eyebrow: "Poly",
      title: "Cordages poly",
      text: "Les polys privilegient en general le spin, le controle et la durabilite. Ils sont souvent plus fermes et conviennent mieux aux joueurs qui accelerent fort."
    },
    "Co-Poly": {
      eyebrow: "Co-Poly",
      title: "Cordages co-poly",
      text: "Les co-polys sont des melanges polyester modernes qui cherchent a garder spin et controle tout en ameliorant le toucher, le confort ou la tenue de tension."
    },
    "Synthetic Gut": {
      eyebrow: "Synthetic Gut",
      title: "Cordages synthetic gut",
      text: "Le synthetic gut est l'option classique polyvalente. Il est souvent abordable, net et equilibre, ideal pour beaucoup de joueurs de club."
    },
    Multifilament: {
      eyebrow: "Multifilament",
      title: "Cordages multifilament",
      text: "Les multis sont faits pour le confort, le toucher et la puissance facile. Ils conviennent bien aux joueurs qui veulent plus de douceur et de tolerance."
    },
    "Natural Gut": {
      eyebrow: "Boyau naturel",
      title: "Cordages en boyau naturel",
      text: "Le boyau naturel offre une puissance, un confort, un toucher et une tenue de tension haut de gamme. C'est l'une des meilleures options pour le confort du bras."
    },
    Hybrid: {
      eyebrow: "Hybride",
      title: "Montages hybrides",
      text: "Les hybrides combinent deux types de cordage pour melanger par exemple controle et spin du poly avec confort, toucher ou puissance du boyau ou du multifilament."
    }
  },
  es: {
    Any: {
      eyebrow: "Guia de tipos de cuerda",
      title: "Todos los tipos de cuerda",
      text: "Compara las principales familias de cuerdas para encontrar la mezcla de spin, comodidad, control y potencia que mejor encaja con tu juego."
    },
    Poly: {
      eyebrow: "Poly",
      title: "Cuerdas poly",
      text: "Las polys suelen priorizar spin, control y durabilidad. Normalmente se sienten mas firmes y funcionan mejor para jugadores con swings rapidos."
    },
    "Co-Poly": {
      eyebrow: "Co-Poly",
      title: "Cuerdas co-poly",
      text: "Las co-polys son mezclas modernas de poliester que intentan mantener spin y control mejorando tacto, comodidad o mantenimiento de tension."
    },
    "Synthetic Gut": {
      eyebrow: "Synthetic Gut",
      title: "Cuerdas synthetic gut",
      text: "El synthetic gut es la opcion clasica y equilibrada. Suele ser asequible, limpia y versatil para muchos jugadores de club."
    },
    Multifilament: {
      eyebrow: "Multifilamento",
      title: "Cuerdas multifilamento",
      text: "Los multifilamentos estan pensados para comodidad, tacto y potencia facil. Van muy bien para quien busca una respuesta mas suave y permisiva."
    },
    "Natural Gut": {
      eyebrow: "Natural Gut",
      title: "Cuerdas de tripa natural",
      text: "La tripa natural ofrece potencia, comodidad, tacto y mantenimiento de tension de primer nivel. Sigue siendo una de las mejores opciones para el brazo."
    },
    Hybrid: {
      eyebrow: "Hibrido",
      title: "Montajes hibridos",
      text: "Los hibridos combinan dos tipos de cuerda para mezclar, por ejemplo, control y spin del poly con la comodidad, el tacto o la potencia del gut o del multifilamento."
    }
  },
  it: {
    Any: {
      eyebrow: "Guida ai tipi di corda",
      title: "Tutti i tipi di corda",
      text: "Confronta le principali famiglie di corde per trovare il mix di spin, comfort, controllo e potenza piu adatto al tuo gioco."
    },
    Poly: {
      eyebrow: "Poly",
      title: "Corde poly",
      text: "Le poly puntano in genere su spin, controllo e durata. Sono spesso piu rigide e funzionano meglio per chi accelera molto lo swing."
    },
    "Co-Poly": {
      eyebrow: "Co-Poly",
      title: "Corde co-poly",
      text: "Le co-poly sono miscele moderne di poliestere che cercano di mantenere spin e controllo migliorando feeling, comfort o tenuta di tensione."
    },
    "Synthetic Gut": {
      eyebrow: "Synthetic Gut",
      title: "Corde synthetic gut",
      text: "Il synthetic gut e l'opzione classica e versatile. Di solito e accessibile, pulita e bilanciata per molti giocatori di club."
    },
    Multifilament: {
      eyebrow: "Multifilamento",
      title: "Corde multifilamento",
      text: "I multifilamenti sono pensati per comfort, tocco e potenza facile. Sono ideali per chi vuole una risposta piu morbida e permissiva."
    },
    "Natural Gut": {
      eyebrow: "Budello naturale",
      title: "Corde in budello naturale",
      text: "Il budello naturale offre potenza, comfort, tocco e tenuta di tensione premium. Resta una delle migliori opzioni per la salute del braccio."
    },
    Hybrid: {
      eyebrow: "Ibrido",
      title: "Setup ibridi",
      text: "Gli ibridi combinano due tipi di corda per unire, ad esempio, controllo e spin del poly con comfort, feeling o potenza di budello o multifilamento."
    }
  }
};

function populateMasterFilters() {
  if (!masterBrandFilter || !masterTypeFilter || !masterPlayerFilter) {
    return;
  }

  const brands = [...new Set(masterStrings.map((entry) => entry.brand).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const types = [...new Set(masterStrings.map((entry) => entry.type).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const players = [...new Set(
    masterStrings
      .reduce((allPlayers, entry) => allPlayers.concat(entry.atpPlayers || [], entry.wtaPlayers || []), [])
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));

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

function syncSelectDefaultState(select) {
  if (!select) {
    return;
  }

  const isAny = select.value === "Any";
  select.classList.toggle("select-any-active", isAny);
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
  if (!masterDatabaseCount || !masterResultsCount || !masterListTable) {
    return;
  }

  const filtered = getFilteredMasterStrings();
  renderMasterTypeDescription();

  masterDatabaseCount.textContent = siteI18n.t("masterDatabaseCount", "{count} strings in database", { count: masterStrings.length });
  masterResultsCount.textContent = siteI18n.t("masterShownCount", "{count} shown", { count: filtered.length });

  if (!masterStrings.length) {
    masterListTable.innerHTML = `
      <div class="master-empty-state">
        Master List data is unavailable right now. Refresh the page or reload the latest scripts.
      </div>
    `;
    return;
  }

  if (!filtered.length) {
    masterListTable.innerHTML = `
      <div class="master-empty-state">
        ${siteI18n.t("masterEmpty", "No strings matched that search. Try a different brand, type, or search term.")}
      </div>
    `;
    return;
  }

  masterListTable.innerHTML = `
    <div class="master-list-head">
      <span>${siteI18n.t("masterHeadName", "String Name")}</span>
      <span>${siteI18n.t("masterHeadBrand", "Brand")}</span>
      <span>${siteI18n.t("masterHeadType", "Type")}</span>
      <span>${siteI18n.t("masterHeadPros", "Pro Players")}</span>
      <span>${siteI18n.t("masterHeadDetails", "Details")}</span>
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
          <div class="master-list-meta">${entry.brand || siteI18n.t("masterUnknown", "Unknown")}</div>
          <div class="master-list-meta">${entry.type || siteI18n.t("masterUnknown", "Unknown")}</div>
          <div class="master-list-meta">${formatProPlayers(entry)}</div>
          <div class="master-details-action">
            <span class="details-label">${siteI18n.t("masterDetails", "Details")}</span>
            <span class="hide-label">${siteI18n.t("masterHide", "Hide")}</span>
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
            <span class="tag"><strong>${siteI18n.t("masterSet", "Set:")}</strong> ${typeof formatPrice === "function" ? formatPrice(entry.costPerSet) : "Varies"}</span>
            <span class="tag"><strong>${siteI18n.t("masterReel", "Reel:")}</strong> ${typeof formatPrice === "function" ? formatPrice(entry.costPerReel) : "Varies"}</span>
          </div>
          <div class="master-detail-section">
            <strong>${siteI18n.t("masterProsUsing", "Pro Players Using")}</strong>
            <div class="master-detail-copy">${renderFullProPlayers(entry)}</div>
          </div>
          ${renderMasterTensions(entry)}
          ${renderMasterRackets(entry)}
        </div>
      </details>
    `).join("")}
  `;
}

function renderMasterTypeDescription() {
  if (!masterTypeDescriptionCard || !masterTypeDescriptionEyebrow || !masterTypeDescriptionTitle || !masterTypeDescriptionText) {
    return;
  }

  const typeKey = masterTypeFilter ? masterTypeFilter.value : "Any";
  const language = siteI18n.getLanguage();
  const translated = masterTypeDescriptionTranslations[language] || {};
  const content = translated[typeKey] || masterTypeDescriptions[typeKey] || translated.Any || masterTypeDescriptions.Any;
  const showDescription = typeKey !== "Any" && content;

  masterTypeDescriptionCard.hidden = !showDescription;
  if (!showDescription) {
    return;
  }

  masterTypeDescriptionEyebrow.textContent = content.eyebrow;
  masterTypeDescriptionTitle.textContent = content.title;
  masterTypeDescriptionText.textContent = content.text;
}

function formatProPlayers(entry) {
  const players = [...new Set([...(entry.atpPlayers || []), ...(entry.wtaPlayers || [])])];
  if (!players.length) {
    return siteI18n.t("masterNoneListed", "None listed");
  }

  if (players.length <= 3) {
    return escapeHtml(players.join(", "));
  }

  const visiblePlayers = players.slice(0, 3).join(", ");
  const extraPlayers = players.slice(3).join(", ");
  return `
    <span>${escapeHtml(visiblePlayers)}</span>
    <span class="master-more-players" title="${escapeHtml(extraPlayers)}">+${players.length - 3} more</span>
  `;
}

function renderFullProPlayers(entry) {
  const customAssociations = typeof getCustomProAssociations === "function" ? getCustomProAssociations(entry) : { atpPlayers: [], wtaPlayers: [] };
  const atpPlayers = [...new Set([...(entry.atpPlayers || []), ...(customAssociations.atpPlayers || [])])];
  const wtaPlayers = [...new Set([...(entry.wtaPlayers || []), ...(customAssociations.wtaPlayers || [])])];

  if (!atpPlayers.length && !wtaPlayers.length) {
    return siteI18n.t("masterNoneListed", "None listed");
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
      <strong>${siteI18n.t("masterKnownTensions", "Known Pro Tensions")}</strong>
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
      <strong>${siteI18n.t("masterKnownRackets", "Known Pro Rackets")}</strong>
      ${items.map((item) => `<div class="master-detail-copy">${escapeHtml(item.player)} | ${escapeHtml(item.racket)}</div>`).join("")}
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .split("&").join("&amp;")
    .split('"').join("&quot;")
    .split("<").join("&lt;")
    .split(">").join("&gt;");
}

function renderMasterError(message) {
  if (!masterListTable) {
    return;
  }
  masterListTable.innerHTML = `
    <div class="master-empty-state">
      ${escapeHtml(message)}
    </div>
  `;
}

function initializeMasterList() {
  const controls = [masterSearchInput, masterBrandFilter, masterTypeFilter, masterPlayerFilter, masterSortSelect];
  if (controls.some((element) => !element)) {
    renderMasterError("Master List controls are missing on this page.");
    return;
  }

  controls.forEach((element) => {
    element.addEventListener("input", renderMasterList);
    element.addEventListener("change", renderMasterList);
  });

  populateMasterFilters();
  styleSpecialSelectOptions(masterBrandFilter);
  styleSpecialSelectOptions(masterTypeFilter);
  styleSpecialSelectOptions(masterPlayerFilter);
  styleSpecialSelectOptions(masterSortSelect);
  syncSelectDefaultState(masterBrandFilter);
  syncSelectDefaultState(masterTypeFilter);
  syncSelectDefaultState(masterPlayerFilter);
  syncSelectDefaultState(masterSortSelect);

  [masterBrandFilter, masterTypeFilter, masterPlayerFilter, masterSortSelect].forEach((select) => {
    select.addEventListener("change", () => syncSelectDefaultState(select));
  });

  renderMasterList();
}

try {
  initializeMasterList();
} catch (error) {
  renderMasterError(`Master List failed to load: ${error && error.message ? error.message : "Unknown error"}`);
}

document.addEventListener("tsl-language-change", () => {
  try {
    renderMasterList();
  } catch (error) {
    renderMasterError(`Master List failed to refresh: ${error && error.message ? error.message : "Unknown error"}`);
  }
});
