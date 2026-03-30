const filterGrid = document.getElementById("filterGrid");
const resultsList = document.getElementById("resultsList");
const resultsCount = document.getElementById("resultsCount");
const databaseCount = document.getElementById("databaseCount");
const heroDatabaseButton = document.getElementById("heroDatabaseButton");
const pageKey = document.body?.dataset?.page || "home";
const resetButton = document.getElementById("resetButton");
const hasPlannerSurface = Boolean(filterGrid && resultsList && resultsCount && databaseCount && resetButton);
const mobileFilterToggle = document.getElementById("mobileFilterToggle");
const mobileQuickPlayerFilter = document.getElementById("mobileQuickPlayerFilter");
const mobileQuickTypeFilter = document.getElementById("mobileQuickTypeFilter");
const mobileQuickTypeRow = document.querySelector(".mobile-quick-type-row");
const stringSearchInput = document.getElementById("stringSearchInput");
const clearSearchButton = document.getElementById("clearSearchButton");
const popularStringsButton = document.getElementById("popularStringsButton");
const proPlayersButton = document.getElementById("proPlayersButton");
const typeMenu = document.getElementById("typeMenu");
const heroSection = document.getElementById("heroSection");
const layoutGrid = document.getElementById("layoutGrid");
const heroHomeButton = document.getElementById("heroHomeButton");
const activeModeBar = document.getElementById("activeModeBar");
const toolWorkbenchToggleRow = document.getElementById("toolWorkbenchToggleRow");
const toolWorkbenchToggleButton = document.getElementById("toolWorkbenchToggleButton");
const toolWorkbenchHeaderToggleButton = document.getElementById("toolWorkbenchHeaderToggleButton");
const toolWorkbench = document.querySelector(".tool-workbench");
const resultsPanel = document.querySelector(".results-panel");
const heroMenuButton = document.getElementById("heroMenuButton");
const heroMenuPanel = document.getElementById("heroMenuPanel");
const referenceGuideButton = document.getElementById("referenceGuideButton");
const referenceGuidePanel = document.getElementById("referenceGuidePanel");
const typeDescriptionCard = document.getElementById("typeDescriptionCard");
const typeDescriptionEyebrow = document.getElementById("typeDescriptionEyebrow");
const typeDescriptionTitle = document.getElementById("typeDescriptionTitle");
const typeDescriptionText = document.getElementById("typeDescriptionText");
const resultsTypeDescriptionCard = document.getElementById("resultsTypeDescriptionCard");
const resultsTypeDescriptionEyebrow = document.getElementById("resultsTypeDescriptionEyebrow");
const resultsTypeDescriptionTitle = document.getElementById("resultsTypeDescriptionTitle");
const resultsTypeDescriptionText = document.getElementById("resultsTypeDescriptionText");
const guideMatchesSection = document.getElementById("guideMatchesSection");
const guideMatchesList = document.getElementById("guideMatchesList");
const guideMatchesCount = document.getElementById("guideMatchesCount");
const sliderPower = document.getElementById("sliderPower");
const sliderSpin = document.getElementById("sliderSpin");
const sliderControl = document.getElementById("sliderControl");
const sliderProPlayers = document.getElementById("sliderProPlayers");
const sliderPowerValue = document.getElementById("sliderPowerValue");
const sliderSpinValue = document.getElementById("sliderSpinValue");
const sliderControlValue = document.getElementById("sliderControlValue");
const sliderProPlayersValue = document.getElementById("sliderProPlayersValue");

normalizeHomeLinksForLocalFiles();

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

function normalizeHomeLinksForLocalFiles() {
  if (!window.location || window.location.protocol !== "file:") {
    return;
  }

  document.querySelectorAll('a[href="/"]').forEach((link) => {
    link.setAttribute("href", "./index.html");
  });
}

const UI_TRANSLATIONS = {
  en: {
    mobileShowFilters: "Show Filters",
    mobileHideFilters: "Hide Filters",
    sliderShow: "Show Sliders",
    sliderHide: "Hide Sliders",
    sliderPanelTitle: "Preference Sliders",
    sliderPanelCopy: "Move the sliders toward what matters most and the rankings will rebalance live.",
    sliderPower: "Power",
    sliderSpin: "Spin",
    sliderControl: "Control",
    sliderPros: "Pro Players Using",
    scaleLow: "Low",
    scaleBalanced: "Balanced",
    scaleHigh: "High",
    scaleFew: "Few",
    mobileQuickPlayer: "Pro Player",
    mobileQuickType: "String Type",
    allProPlayers: "All Pro Players",
    allStringTypes: "All String Types",
    quickFiltersEyebrow: "Quick Filters",
    stringFiltersTitle: "String Filters",
    reset: "Reset",
    stringTypeGuide: "String Type Guide",
    allStringTypeTitle: "All String Types",
    allStringTypeText: "Compare different string families to find the blend of spin, comfort, control, and power that best fits your game."
  },
  fr: {
    mobileShowFilters: "Afficher les filtres",
    mobileHideFilters: "Masquer les filtres",
    sliderShow: "Afficher les curseurs",
    sliderHide: "Masquer les curseurs",
    sliderPanelTitle: "Curseurs de preference",
    sliderPanelCopy: "Deplacez les curseurs vers ce qui compte le plus et le classement se reequilibrera en direct.",
    sliderPower: "Puissance",
    sliderSpin: "Spin",
    sliderControl: "Controle",
    sliderPros: "Pros utilisant",
    scaleLow: "Faible",
    scaleBalanced: "Equilibre",
    scaleHigh: "Eleve",
    scaleFew: "Peu",
    mobileQuickPlayer: "Joueur pro",
    mobileQuickType: "Type de cordage",
    allProPlayers: "Tous les pros",
    allStringTypes: "Tous les types de cordage",
    quickFiltersEyebrow: "Filtres rapides",
    stringFiltersTitle: "Filtres de cordage",
    reset: "Reinitialiser",
    stringTypeGuide: "Guide des types de cordage",
    allStringTypeTitle: "Tous les types de cordage",
    allStringTypeText: "Comparez les grandes familles de cordage pour trouver le bon melange de spin, confort, controle et puissance pour votre jeu."
  },
  es: {
    mobileShowFilters: "Mostrar filtros",
    mobileHideFilters: "Ocultar filtros",
    sliderShow: "Mostrar deslizadores",
    sliderHide: "Ocultar deslizadores",
    sliderPanelTitle: "Deslizadores de preferencia",
    sliderPanelCopy: "Mueve los deslizadores hacia lo que mas importa y la clasificacion se reequilibrara al instante.",
    sliderPower: "Potencia",
    sliderSpin: "Spin",
    sliderControl: "Control",
    sliderPros: "Profesionales que la usan",
    scaleLow: "Bajo",
    scaleBalanced: "Equilibrado",
    scaleHigh: "Alto",
    scaleFew: "Pocos",
    mobileQuickPlayer: "Jugador pro",
    mobileQuickType: "Tipo de cuerda",
    allProPlayers: "Todos los profesionales",
    allStringTypes: "Todos los tipos de cuerda",
    quickFiltersEyebrow: "Filtros rapidos",
    stringFiltersTitle: "Filtros de cuerda",
    reset: "Restablecer",
    stringTypeGuide: "Guia de tipos de cuerda",
    allStringTypeTitle: "Todos los tipos de cuerda",
    allStringTypeText: "Compara las principales familias de cuerdas para encontrar la mezcla de spin, comodidad, control y potencia que mejor encaja con tu juego."
  },
  it: {
    mobileShowFilters: "Mostra filtri",
    mobileHideFilters: "Nascondi filtri",
    sliderShow: "Mostra cursori",
    sliderHide: "Nascondi cursori",
    sliderPanelTitle: "Cursori di preferenza",
    sliderPanelCopy: "Sposta i cursori verso cio che conta di piu e la classifica si riequilibrera in tempo reale.",
    sliderPower: "Potenza",
    sliderSpin: "Spin",
    sliderControl: "Controllo",
    sliderPros: "Professionisti che la usano",
    scaleLow: "Basso",
    scaleBalanced: "Bilanciato",
    scaleHigh: "Alto",
    scaleFew: "Pochi",
    mobileQuickPlayer: "Giocatore pro",
    mobileQuickType: "Tipo di corda",
    allProPlayers: "Tutti i professionisti",
    allStringTypes: "Tutti i tipi di corda",
    quickFiltersEyebrow: "Filtri rapidi",
    stringFiltersTitle: "Filtri corde",
    reset: "Reimposta",
    stringTypeGuide: "Guida ai tipi di corda",
    allStringTypeTitle: "Tutti i tipi di corda",
    allStringTypeText: "Confronta le principali famiglie di corde per trovare il mix di spin, comfort, controllo e potenza piu adatto al tuo gioco."
  }
};

const HOME_STATIC_TRANSLATIONS = {
  en: {
    masterListTitle: "All Strings",
    masterListCopy: "Browse every string in one place",
    referenceTitle: "Reference Guide",
    referenceCopy: "Open all information pages",
    popularTitle: "20 Most Popular",
    popularCopy: "Start with the most searched strings",
    prosTitle: "Pro Player Strings",
    prosCopy: "See what top ATP and WTA players use",
    menu: {
      "./string-types.html": "String Type Descriptions",
      "./tension-guide.html": "Tension Guide",
      "./tension-logic.html": "Tension Calculator Logic",
      "./gauge-guide.html": "Gauge Guide",
      "./hybrid-guide.html": "Hybrid String Guide",
      "./arm-friendly.html": "Arm-Friendly Strings",
      "./string-shape-guide.html": "String Shape Guide",
      "./restring-guide.html": "How Often to Restring",
      "./player-type-guide.html": "Best Strings by Player Type",
      "./best-by-need.html": "Best Strings by Need",
      "./popular-comparisons.html": "Popular String Comparisons",
      "./proshops.html": "Pro Shops"
    }
  },
  fr: {
    masterListTitle: "Liste complete",
    masterListCopy: "Parcourez tous les cordages en un seul endroit",
    referenceTitle: "Guide de reference",
    referenceCopy: "Ouvrir toutes les pages d'information",
    popularTitle: "20 plus populaires",
    popularCopy: "Commencez par les cordages les plus recherches",
    prosTitle: "Cordages des pros",
    prosCopy: "Voir ce qu'utilisent les meilleurs ATP et WTA",
    menu: {
      "./string-types.html": "Descriptions des types de cordage",
      "./tension-guide.html": "Guide de tension",
      "./tension-logic.html": "Logique du calculateur de tension",
      "./gauge-guide.html": "Guide de jauge",
      "./hybrid-guide.html": "Guide des hybrides",
      "./arm-friendly.html": "Confort du bras",
      "./string-shape-guide.html": "Guide de forme du cordage",
      "./restring-guide.html": "Quand recorder",
      "./player-type-guide.html": "Meilleurs cordages par profil",
      "./best-by-need.html": "Meilleurs cordages par besoin",
      "./popular-comparisons.html": "Comparaisons populaires",
      "./proshops.html": "Magasins pro"
    }
  },
  es: {
    masterListTitle: "Lista maestra",
    masterListCopy: "Explora todas las cuerdas en un solo lugar",
    referenceTitle: "Guia de referencia",
    referenceCopy: "Abrir todas las paginas informativas",
    popularTitle: "20 mas populares",
    popularCopy: "Empieza con las cuerdas mas buscadas",
    prosTitle: "Cuerdas de profesionales",
    prosCopy: "Ver lo que usan los mejores ATP y WTA",
    menu: {
      "./string-types.html": "Descripciones de tipos de cuerda",
      "./tension-guide.html": "Guia de tension",
      "./tension-logic.html": "Logica del calculador de tension",
      "./gauge-guide.html": "Guia de calibre",
      "./hybrid-guide.html": "Guia de hibridos",
      "./arm-friendly.html": "Brazo y confort",
      "./string-shape-guide.html": "Guia de forma de cuerda",
      "./restring-guide.html": "Cuando reencordar",
      "./player-type-guide.html": "Mejores cuerdas por perfil",
      "./best-by-need.html": "Mejores cuerdas por necesidad",
      "./popular-comparisons.html": "Comparaciones populares",
      "./proshops.html": "Pro shops"
    }
  },
  it: {
    masterListTitle: "Elenco completo",
    masterListCopy: "Sfoglia tutte le corde in un solo posto",
    referenceTitle: "Guida di riferimento",
    referenceCopy: "Apri tutte le pagine informative",
    popularTitle: "20 piu popolari",
    popularCopy: "Inizia con le corde piu cercate",
    prosTitle: "Corde dei professionisti",
    prosCopy: "Vedi cosa usano i migliori ATP e WTA",
    menu: {
      "./string-types.html": "Descrizioni dei tipi di corda",
      "./tension-guide.html": "Guida alla tensione",
      "./tension-logic.html": "Logica del calcolatore di tensione",
      "./gauge-guide.html": "Guida al calibro",
      "./hybrid-guide.html": "Guida agli ibridi",
      "./arm-friendly.html": "Comfort del braccio",
      "./string-shape-guide.html": "Guida alla forma della corda",
      "./restring-guide.html": "Quando reincordare",
      "./player-type-guide.html": "Migliori corde per profilo",
      "./best-by-need.html": "Migliori corde per esigenza",
      "./popular-comparisons.html": "Confronti popolari",
      "./proshops.html": "Pro shop"
    }
  }
};

function getUiText(key, fallback) {
  const language = siteI18n.getLanguage();
  return UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS.en[key] || fallback || key;
}

function updateDatabaseCountLabels() {
  const countText = siteI18n.t("masterDatabaseCount", "{count} strings in database", { count: STRINGS.length });
  if (databaseCount) databaseCount.textContent = countText;
  if (heroDatabaseButton) heroDatabaseButton.textContent = countText;
}

function updateHomepageStaticTranslations() {
  const language = siteI18n.getLanguage();
  const content = HOME_STATIC_TRANSLATIONS[language] || HOME_STATIC_TRANSLATIONS.en;

  const masterTitle = document.getElementById("heroMasterListTitle");
  const masterCopy = document.getElementById("heroMasterListCopy");
  const referenceTitle = document.getElementById("heroReferenceGuideTitle");
  const referenceCopy = document.getElementById("heroReferenceGuideCopy");
  const popularTitle = document.getElementById("heroPopularTitle");
  const popularCopy = document.getElementById("heroPopularCopy");
  const prosTitle = document.getElementById("heroProsTitle");
  const prosCopy = document.getElementById("heroProsCopy");

  if (masterTitle) masterTitle.textContent = content.masterListTitle;
  if (masterCopy) masterCopy.textContent = content.masterListCopy;
  if (referenceTitle) referenceTitle.textContent = content.referenceTitle;
  if (referenceCopy) referenceCopy.textContent = content.referenceCopy;
  if (popularTitle) popularTitle.textContent = content.popularTitle;
  if (popularCopy) popularCopy.textContent = content.popularCopy;
  if (prosTitle) prosTitle.textContent = content.prosTitle;
  if (prosCopy) prosCopy.textContent = content.prosCopy;

  const menuIdMap = {
    "./string-types.html": ["menuStringTypes", "guideStringTypes"],
    "./tension-guide.html": ["menuTensionGuide", "guideTensionGuide"],
    "./tension-logic.html": ["menuTensionLogic", "guideTensionLogic"],
    "./gauge-guide.html": ["menuGaugeGuide", "guideGaugeGuide"],
    "./hybrid-guide.html": ["menuHybridGuide", "guideHybridGuide"],
    "./arm-friendly.html": ["menuArmFriendly", "guideArmFriendly"],
    "./string-shape-guide.html": ["menuShapeGuide", "guideShapeGuide"],
    "./restring-guide.html": ["menuRestringGuide", "guideRestringGuide"],
    "./player-type-guide.html": ["menuPlayerTypeGuide", "guidePlayerTypeGuide"],
    "./best-by-need.html": ["menuBestByNeed", "guideBestByNeed"],
    "./popular-comparisons.html": ["menuPopularComparisons", "guidePopularComparisons"],
    "./proshops.html": ["menuProShops"]
  };

  Object.entries(content.menu).forEach(([href, text]) => {
    (menuIdMap[href] || []).forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = text;
      }
    });
  });

  const adminLink = document.getElementById("menuAdminStats");
  if (adminLink) {
    adminLink.textContent = language === "fr"
      ? "Stats admin"
      : language === "es"
        ? "Estadisticas admin"
        : language === "it"
          ? "Statistiche admin"
          : "Admin Stats";
  }
}

const sliderPanelToggle = document.getElementById("sliderPanelToggle");
const sliderPanelBody = document.getElementById("sliderPanelBody");
const sliderResultsSummary = document.getElementById("sliderResultsSummary");
const exampleSetupButtons = Array.from(document.querySelectorAll(".example-setup-button"));
const quickSetupStyle = document.getElementById("quickSetupStyle");
const quickSetupPro = document.getElementById("quickSetupPro");
const quickSetupSpin = document.getElementById("quickSetupSpin");
const quickSetupPower = document.getElementById("quickSetupPower");
const quickSetupControl = document.getElementById("quickSetupControl");
const quickSetupRacket = document.getElementById("quickSetupRacket");
const quickSetupUseProRacket = document.getElementById("quickSetupUseProRacket");
const quickSetupProRacketHelp = document.getElementById("quickSetupProRacketHelp");
const quickSetupProRacketNote = document.getElementById("quickSetupProRacketNote");
const quickSetupButton = document.getElementById("quickSetupButton");
const quickSetupApplyButton = document.getElementById("quickSetupApplyButton");
const quickSetupResult = document.getElementById("quickSetupResult");
const quickSetupExampleSelect = document.getElementById("quickSetupExampleSelect");
const tensionCalcType = document.getElementById("tensionCalcType");
const tensionCalcRacket = document.getElementById("tensionCalcRacket");
const tensionCalcPreference = document.getElementById("tensionCalcPreference");
const tensionCalcArm = document.getElementById("tensionCalcArm");
const tensionCalcButton = document.getElementById("tensionCalcButton");
const tensionCalcResult = document.getElementById("tensionCalcResult");
const tensionSourceStorageKey = "tennisStringPlannerTensionSource";
const hasSetupWorkbenchSurface = Boolean(
  quickSetupButton
  || tensionCalcButton
  || quickSetupExampleSelect
  || exampleSetupButtons.length
);

if (mobileFilterToggle) {
  mobileFilterToggle.addEventListener("click", () => {
    const shouldCollapse = !filterGrid.classList.contains("is-collapsed");
    filterGrid.classList.toggle("is-collapsed", shouldCollapse);
    mobileFilterToggle.textContent = shouldCollapse ? getUiText("mobileShowFilters", "Show Filters") : getUiText("mobileHideFilters", "Hide Filters");
    mobileFilterToggle.setAttribute("aria-expanded", shouldCollapse ? "false" : "true");
  });
}

function setupDropdownMenu(button, panel, containerSelector) {
  if (!button || !panel) return;

  const container = button.closest(containerSelector) || document.querySelector(containerSelector);
  let closeTimer = null;
  const canHoverOpen = () => window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const openMenu = () => {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
    button.setAttribute("aria-expanded", "true");
    panel.hidden = false;
  };

  const closeMenu = () => {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
    button.setAttribute("aria-expanded", "false");
    panel.hidden = true;
  };

  const scheduleCloseMenu = () => {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
    }
    closeTimer = window.setTimeout(() => {
      closeMenu();
    }, 90);
  };

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!panel.hidden && !event.target.closest(containerSelector)) {
      closeMenu();
    }
  });

  if (container) {
    container.addEventListener("mouseenter", () => {
      if (canHoverOpen()) {
        openMenu();
      }
    });

    container.addEventListener("mouseleave", () => {
      if (canHoverOpen()) {
        scheduleCloseMenu();
      }
    });

    container.addEventListener("focusout", (event) => {
      if (!container.contains(event.relatedTarget)) {
        closeMenu();
      }
    });
  }
}

setupDropdownMenu(heroMenuButton, heroMenuPanel, ".hero-overflow-menu");
setupDropdownMenu(referenceGuideButton, referenceGuidePanel, ".hero-action-menu");

const IMAGE_STORAGE_PREFIX = "tennisStringPlannerImage:";
const PRO_PLAYER_STORAGE_KEY = "tennisStringPlannerCustomPros";
const POPULAR_STRING_NAMES = [
  "Babolat RPM Blast",
  "Luxilon ALU Power",
  "Solinco Hyper-G",
  "Tecnifibre X-One Biphase",
  "Wilson NXT",
  "Babolat VS Touch",
  "Yonex Poly Tour Pro",
  "Head Lynx Tour",
  "Solinco Confidential",
  "Luxilon 4G",
  "Prince Synthetic Gut Duraflex",
  "Tecnifibre Razor Code",
  "Babolat RPM Team",
  "Wilson Revolve Spin",
  "Head Velocity MLT",
  "Volkl Cyclone",
  "Wilson Champion's Choice",
  "Luxilon Element",
  "Yonex Poly Tour Rev",
  "Tecnifibre Triax"
];
const STRING_COLOR_OVERRIDES = {
  "Babolat RPM Blast": "Black",
  "Luxilon ALU Power": "Silver",
  "Solinco Hyper-G": "Green",
  "Tecnifibre X-One Biphase": "Natural",
  "Wilson NXT": "Natural",
  "Babolat VS Touch": "Natural",
  "Yonex Poly Tour Pro": "Yellow",
  "Head Lynx Tour": "Champagne",
  "Solinco Confidential": "Grey",
  "Luxilon 4G": "Gold",
  "Prince Synthetic Gut Duraflex": "Natural",
  "Tecnifibre Razor Code": "White",
  "Babolat RPM Team": "Black",
  "Wilson Revolve Spin": "Green",
  "Yonex Rexis Comfort": "White",
  "Head Velocity MLT": "Natural",
  "Kirschbaum Max Power": "Red",
  "Volkl Cyclone": "Purple",
  "Wilson Champion's Choice": "Natural",
  "Solinco Tour Bite Soft": "Silver",
  "Luxilon Element": "Bronze",
  "Babolat Origin": "Natural",
  "Yonex Poly Tour Rev": "Blue",
  "Head Hawk Power": "Orange",
  "Wilson Sensation": "Natural",
  "Tecnifibre Triax": "Natural",
  "Prince Premier Control": "Natural",
  "Babolat Addixion+": "Natural",
  "Head Synthetic Gut PPS": "White",
  "Luxilon Eco Power": "Green",
  "Toroline Wasabi": "Green",
  "Gosen OG-Sheep Micro": "White",
  "Yonex Dynawire": "Silver",
  "Wilson Revolve": "Blue",
  "Head Hawk Touch": "Copper",
  "Prince Premier Touch": "Natural",
  "Luxilon Natural Gut / ALU Hybrid": "Natural",
  "Babolat Touch VS / RPM Blast Hybrid": "Natural"
};

const STRING_COLOR_HEX = {
  Black: "#2f3136",
  Silver: "#b9c2ca",
  Grey: "#7f8791",
  White: "#f5f7f8",
  Natural: "#ead9b8",
  Gold: "#d8b347",
  Bronze: "#b77d4a",
  Blue: "#4c8fe8",
  Green: "#8fd645",
  Yellow: "#efe34d",
  Orange: "#ee9442",
  Red: "#df5454",
  Purple: "#9f72de",
  Champagne: "#d8bf8a",
  Copper: "#b87333"
};

const FILTERS = [
  { key: "brand", label: "String Brand", options: ["Any", "Ashaway", "Babolat", "Diadem", "Dunlop", "Forten", "Gamma", "Genesis", "Gosen", "Grapplesnake", "Head", "IsoSpeed", "Kirschbaum", "Klip", "Luxilon", "Mayami", "MSV", "Prince", "Restring", "Signum Pro", "Solinco", "Tecnifibre", "Topspin", "Toroline", "Tourna", "Volkl", "Weiss Cannon", "Wilson", "YTex", "Yonex"] },
  { key: "type", label: "Type of String", options: ["Any", "Poly", "Co-Poly", "Synthetic Gut", "Multifilament", "Hybrid-Style Multi", "Natural Gut", "Hybrid"] },
  { key: "atpPlayer", label: "ATP Player", options: ["Any", "Jannik Sinner", "Alexander Zverev", "Carlos Alcaraz", "Taylor Fritz", "Novak Djokovic", "Casper Ruud", "Daniil Medvedev", "Andrey Rublev", "Stefanos Tsitsipas", "Alex de Minaur", "Holger Rune", "Tommy Paul", "Ben Shelton", "Ugo Humbert", "Grigor Dimitrov", "Hubert Hurkacz", "Lorenzo Musetti", "Frances Tiafoe", "Sebastian Korda", "Arthur Fils", "Karen Khachanov", "Nicolas Jarry", "Felix Auger-Aliassime", "Matteo Berrettini", "Matteo Arnaldi", "Cameron Norrie", "Alejandro Tabilo", "Jiri Lehecka", "Jack Draper", "Alexander Bublik", "Tomas Machac", "Alexei Popyrin", "Nuno Borges", "Sebastian Baez", "Federico Agustin Gomez", "Daniel Gimeno Traver", "Julian Cash", "Rafael Nadal", "Roger Federer"] },
  { key: "wtaPlayer", label: "WTA Player", options: ["Any", "Iga Swiatek", "Aryna Sabalenka", "Coco Gauff", "Jessica Pegula", "Elena Rybakina", "Amanda Anisimova", "Belinda Bencic", "Clara Tauson", "Marketa Vondrousova", "Qinwen Zheng", "Ons Jabeur", "Maria Sakkari", "Jelena Ostapenko", "Daria Kasatkina", "Danielle Collins", "Barbora Krejcikova", "Emma Navarro", "Beatriz Haddad Maia", "Liudmila Samsonova", "Caroline Garcia", "Madison Keys", "Anna Kalinskaya", "Naomi Osaka", "Paula Badosa", "Donna Vekic", "Ekaterina Alexandrova", "Marta Kostyuk", "Elina Svitolina", "Mirra Andreeva", "Karolina Muchova", "Veronika Kudermetova", "Jasmine Paolini", "Leylah Fernandez", "Diana Shnaider", "McCartney Kessler", "Anna Blinkova", "Sloane Stephens"] },
  { key: "stringColor", label: "String Color", options: ["Any", "Black", "Silver", "Grey", "White", "Natural", "Gold", "Bronze", "Blue", "Green", "Yellow", "Orange", "Red", "Purple", "Champagne", "Copper"] },
  { key: "stringShape", label: "String Shape", options: ["Any", "Round", "Shaped", "Textured", "Hybrid Mix"] },
  { key: "spin", label: "Spin", options: ["Any", "Low", "Medium", "High", "Very High"] },
  { key: "power", label: "Power", options: ["Any", "Low", "Medium", "High"] },
  { key: "control", label: "Control", options: ["Any", "Low", "Medium", "High", "Very High"] },
  { key: "durability", label: "Durability", options: ["Any", "Low", "Medium", "High", "Very High"] },
  { key: "comfort", label: "Comfort", options: ["Any", "Low", "Medium", "High"] },
  { key: "feel", label: "Feel", options: ["Any", "Crisp", "Plush", "Muted", "Responsive"] },
  { key: "gauge", label: "String Gauge", options: ["Any", "15L", "16", "16L", "17", "17L", "18"] },
  { key: "playerLevel", label: "Player Level", options: ["Any", "Beginner", "Novice", "Intermediate", "Advanced", "Pro"] },
  { key: "gameStyle", label: "Game Style", options: ["Any", "Aggressive Baseliner", "Counterpuncher", "All-Court", "Serve and Volley", "Flat Hitter", "Heavy Topspin"] },
  { key: "tensionBand", label: "Recommended Tension", options: ["Any", "Low 40s", "Mid 40s", "High 40s", "Low 50s", "Mid 50s"] },
  { key: "racketFamily", label: "Racket Being Used", options: ["Any", "Babolat Pure Aero", "Babolat Pure Drive", "Wilson Blade", "Wilson Clash", "Wilson Pro Staff", "Yonex Ezone", "Yonex VCORE", "Head Speed", "Head Radical", "Control Frame", "Power Frame", "Spin Frame"] },
  { key: "armFriendliness", label: "Arm Friendliness", options: ["Any", "Low", "Medium", "High"] },
  { key: "surface", label: "Best Court Fit", options: ["Any", "Clay", "Hard Court", "Grass", "All Surfaces"] },
  { key: "priceTier", label: "Price / Value", options: ["Any", "Budget", "Mid-Range", "Premium"] }
];

const TYPE_DESCRIPTIONS = {
  Any: {
    eyebrow: "String Type Guide",
    title: "All String Types",
    text: "Compare different string families to find the blend of spin, comfort, control, and power that best fits your game."
  },
  Poly: {
    eyebrow: "Poly",
    title: "Poly Strings",
    text: "Poly strings usually favor spin, control, and durability. They are often firmer and work best for stronger players with fast swings who generate their own pace."
  },
  "Co-Poly": {
    eyebrow: "Co-Poly",
    title: "Co-Poly Strings",
    text: "Co-polys are modern polyester blends that aim to keep the control and spin of poly while improving feel, comfort, or tension maintenance. Many advanced players live in this category."
  },
  "Synthetic Gut": {
    eyebrow: "Synthetic Gut",
    title: "Synthetic Gut Strings",
    text: "Synthetic gut is the classic all-around option. It is usually affordable, crisp, and balanced, making it a strong starting point for beginners and everyday club players."
  },
  Multifilament: {
    eyebrow: "Multifilament",
    title: "Multifilament Strings",
    text: "Multifilaments are built for comfort, touch, and easier power. They are popular with players who want a softer feel, more forgiveness, or better arm-friendliness."
  },
  "Natural Gut": {
    eyebrow: "Natural Gut",
    title: "Natural Gut Strings",
    text: "Natural gut offers premium power, comfort, feel, and tension maintenance. It is expensive, but still one of the best choices for touch players, hybrids, and arm comfort."
  },
  Hybrid: {
    eyebrow: "Hybrid",
    title: "Hybrid String Setups",
    text: "Hybrids combine two different string types, often to blend control and spin from poly with the comfort, feel, or power of gut or multifilament."
  }
};

if (typeof window !== "undefined") {
  window.TENNIS_STRING_TYPE_DESCRIPTIONS = TYPE_DESCRIPTIONS;
}

const GUIDE_PAGES = [
  {
    title: "String Type Descriptions",
    href: "./string-types.html",
    description: "Compare the main string families and understand how they differ in spin, comfort, power, control, and durability.",
    keywords: ["string type", "string types", "types", "poly", "co-poly", "multifilament", "natural gut", "synthetic gut", "hybrid"]
  },
  {
    title: "Tension Guide",
    href: "./tension-guide.html",
    description: "Learn how lower and higher tension change comfort, power, control, and overall response.",
    keywords: ["tension", "lbs", "pounds", "low tension", "high tension", "string tension"]
  },
  {
    title: "Tension Calculator Logic",
    href: "./tension-logic.html",
    description: "See exactly how the calculator combines string type, racket family, feel goal, arm comfort, and displayed range.",
    keywords: ["tension calculator", "calculator logic", "how tension works", "stringing formula", "lbs", "kg", "feel goal", "arm comfort"]
  },
  {
    title: "Gauge Guide",
    href: "./gauge-guide.html",
    description: "See how string thickness affects feel, durability, spin, and liveliness.",
    keywords: ["gauge", "16", "17", "18", "thickness", "string gauge", "16l"]
  },
  {
    title: "Hybrid String Guide",
    href: "./hybrid-guide.html",
    description: "Understand mains, crosses, and common hybrid combinations like poly plus gut or poly plus multi.",
    keywords: ["hybrid", "mains", "crosses", "poly gut", "poly multi", "hybrid strings"]
  },
  {
    title: "Arm-Friendly Strings",
    href: "./arm-friendly.html",
    description: "Comfort-focused guidance for players dealing with harsh setups, tennis elbow, or arm sensitivity.",
    keywords: ["arm", "arm friendly", "comfort", "tennis elbow", "elbow", "soft strings"]
  },
  {
    title: "String Shape Guide",
    href: "./string-shape-guide.html",
    description: "Compare round, shaped, and textured strings and how they influence feel and spin.",
    keywords: ["shape", "shaped", "round", "textured", "spin shape", "string shape"]
  },
  {
    title: "How Often to Restring",
    href: "./restring-guide.html",
    description: "Know when a string setup is ready to be changed based on feel, hours played, and string type.",
    keywords: ["restring", "how often", "how often to restring", "dead strings", "replace strings", "old strings"]
  },
  {
    title: "Best Strings by Player Type",
    href: "./player-type-guide.html",
    description: "Find the best string directions for beginners, intermediates, advanced hitters, touch players, and more.",
    keywords: ["player type", "beginner", "intermediate", "advanced", "junior", "senior", "all court", "touch player"]
  },
  {
    title: "Best Strings by Need",
    href: "./best-by-need.html",
    description: "Browse practical directions for players shopping by spin, control, power, comfort, durability, or feel.",
    keywords: ["best for spin", "best for control", "best for power", "best for comfort", "durability", "feel", "need"]
  },
  {
    title: "Best Strings for Pure Aero",
    href: "./best-strings-for-pure-aero.html",
    description: "Find string directions that usually work best in a Babolat Pure Aero, from control-first polys to softer comfort paths.",
    keywords: ["pure aero", "babolat pure aero", "best strings for pure aero", "pure aero strings", "spin frame", "aero setup"]
  },
  {
    title: "Best Strings for Wilson Blade",
    href: "./best-strings-for-wilson-blade.html",
    description: "See which string directions usually fit the Wilson Blade best, including round polys, softer setups, and feel-oriented options.",
    keywords: ["wilson blade", "best strings for blade", "blade strings", "best strings for wilson blade", "control frame", "blade setup"]
  },
  {
    title: "Best Strings for Tennis Elbow",
    href: "./best-strings-for-tennis-elbow.html",
    description: "Comfort-focused guidance for players dealing with tennis elbow, harsh strings, or sensitive arms.",
    keywords: ["tennis elbow", "best strings for tennis elbow", "arm friendly strings", "soft strings", "comfortable strings", "elbow pain"]
  },
  {
    title: "Popular String Comparisons",
    href: "./popular-comparisons.html",
    description: "Quick head-to-head guidance for common string matchups like RPM Blast vs Hyper-G and ALU Power vs 4G.",
    keywords: ["comparison", "compare", "vs", "rpm blast", "hyper-g", "alu power", "4g", "nxt", "x-one"]
  }
];

const OFFICIAL_BRAND_PAGES = {
  Babolat: "https://www.babolat.com/us/tennis/strings.html",
  Luxilon: "https://www.wilson.com/en-us/tennis/strings",
  Wilson: "https://www.wilson.com/en-us/tennis/strings",
  Yonex: "https://www.yonex.com/tennis/strings",
  Head: "https://www.head.com/en/strings/tennis-strings",
  Tecnifibre: "https://tecnifibre.com/en/tennis/tennis-strings/",
  Solinco: "https://www.solincosports.com/products-strings/",
  Kirschbaum: "https://www.kirschbaum-tennis.de/en/strings/",
  Volkl: "https://www.volkltennis.com/collections/strings",
  Prince: "https://princetennis.com/collections/strings",
  Gosen: "https://gosenamerica.com/",
  Toroline: "https://toroline.com/collections/strings",
  "Signum Pro": "https://www.signumpro.de/",
  Dunlop: "https://dunlopsports.com/collections/tennis-strings",
  Gamma: "https://gammasports.com/collections/tennis-strings",
  MSV: "https://www.msv-tennis.com/",
  "Weiss Cannon": "https://weisscannon.com/",
  Mayami: "https://mayamistrings.com/collections/strings",
  Restring: "https://restring.com/collections/tennis-strings",
  Diadem: "https://diademsports.com/collections/strings",
  Genesis: "https://www.genesis-tennis.com/"
};

const state = Object.fromEntries(FILTERS.map((filter) => [filter.key, "Any"]));
let searchQuery = "";
let popularOnly = false;
let proOnly = false;
let toolsHiddenForPrimaryModes = false;
let autoCollapsedToolsForSearch = false;
let toolsHiddenBeforeSearch = false;
const sliderPreferences = {
  power: 5,
  spin: 5,
  control: 5,
  proPlayers: 5
};
let sliderRenderTimeout = null;
let sliderInteractionActive = false;
let sliderInteractionTimeout = null;
let latestQuickSetupRecommendation = null;
let latestTensionCalculatorSource = null;
let activeQuickSetupExampleIndex = -1;

function persistTensionCalculatorSource(source) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!source) {
      window.localStorage.removeItem(tensionSourceStorageKey);
      return;
    }

    window.localStorage.setItem(tensionSourceStorageKey, JSON.stringify(source));
  } catch {
    // Ignore storage failures so the tool still works without persistence.
  }
}

function loadStoredTensionCalculatorSource() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(tensionSourceStorageKey);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
const QUICK_SETUP_EXAMPLES = [
  {
    buttonLabel: "Example 1/12: Carlos Alcaraz",
    style: "Aggressive Baseliner",
    player: "Carlos Alcaraz",
    preferredTopEntryName: "Babolat RPM Blast",
    racketFamily: "Babolat Pure Aero",
    useProRacket: true,
    preferences: {
      spin: "Very High",
      power: "Medium",
      control: "High"
    }
  },
  {
    buttonLabel: "Example 2/12: Jannik Sinner",
    style: "Aggressive Baseliner",
    player: "Jannik Sinner",
    preferredTopEntryName: "Head Hawk Touch",
    racketFamily: "Head Speed",
    useProRacket: true,
    preferences: {
      spin: "High",
      power: "Medium",
      control: "Very High"
    }
  },
  {
    buttonLabel: "Example 3/12: Aryna Sabalenka",
    style: "Aggressive Baseliner",
    player: "Aryna Sabalenka",
    preferredTopEntryName: "Luxilon ALU Power",
    racketFamily: "Wilson Blade",
    useProRacket: true,
    preferences: {
      spin: "High",
      power: "High",
      control: "High"
    }
  },
  {
    buttonLabel: "Example 4/12: Taylor Fritz",
    style: "Aggressive Baseliner",
    player: "Taylor Fritz",
    preferredTopEntryName: "Head Hawk",
    racketFamily: "Head Radical",
    useProRacket: true,
    preferences: {
      spin: "Medium",
      power: "Low",
      control: "Very High"
    }
  },
  {
    buttonLabel: "Example 5/12: Ben Shelton",
    style: "Aggressive Baseliner",
    player: "Ben Shelton",
    preferredTopEntryName: "Yonex Poly Tour Pro",
    racketFamily: "Yonex Ezone",
    useProRacket: true,
    preferences: {
      spin: "High",
      power: "Medium",
      control: "High"
    }
  },
  {
    buttonLabel: "Example 6/12: Iga Swiatek",
    style: "Aggressive Baseliner",
    player: "Iga Swiatek",
    preferredTopEntryName: "Tecnifibre Razor Code",
    racketFamily: "Control Frame",
    useProRacket: true,
    preferences: {
      spin: "High",
      power: "Medium",
      control: "Very High"
    }
  },
  {
    buttonLabel: "Example 7/12: Novak Djokovic",
    style: "All-Court",
    player: "Novak Djokovic",
    preferredTopEntryName: "Babolat VS Touch",
    racketFamily: "Control Frame",
    useProRacket: true,
    preferences: {
      spin: "Medium",
      power: "High",
      control: "High"
    }
  },
  {
    buttonLabel: "Example 8/12: Alexander Zverev",
    style: "Flat Hitter",
    player: "Alexander Zverev",
    preferredTopEntryName: "Head Hawk Touch",
    racketFamily: "Head Radical",
    useProRacket: true,
    preferences: {
      spin: "Medium",
      power: "Low",
      control: "Very High"
    }
  },
  {
    buttonLabel: "Example 9/12: Coco Gauff",
    style: "Aggressive Baseliner",
    player: "Coco Gauff",
    preferredTopEntryName: "Luxilon ALU Power",
    racketFamily: "Wilson Blade",
    useProRacket: true,
    preferences: {
      spin: "High",
      power: "Medium",
      control: "High"
    }
  },
  {
    buttonLabel: "Example 10/12: Tommy Paul",
    style: "Heavy Topspin",
    player: "Tommy Paul",
    preferredTopEntryName: "Solinco Tour Bite",
    racketFamily: "Spin Frame",
    useProRacket: true,
    preferences: {
      spin: "Very High",
      power: "Low",
      control: "Very High"
    }
  },
  {
    buttonLabel: "Example 11/12: Paula Badosa",
    style: "Aggressive Baseliner",
    player: "Paula Badosa",
    preferredTopEntryName: "Luxilon ALU Power",
    racketFamily: "Wilson Blade",
    useProRacket: true,
    preferences: {
      spin: "High",
      power: "Medium",
      control: "High"
    }
  },
  {
    buttonLabel: "Example 12/12: Elena Rybakina",
    style: "Aggressive Baseliner",
    player: "Elena Rybakina",
    preferredTopEntryName: "Yonex Poly Tour Fire",
    racketFamily: "Yonex Ezone",
    useProRacket: true,
    preferences: {
      spin: "High",
      power: "Medium",
      control: "High"
    }
  }
];
const TENSION_BAND_DETAILS = {
  "Low 40s": { min: 43, max: 46, center: 44.5, lbs: "43-46 lbs" },
  "Mid 40s": { min: 46, max: 48, center: 47, lbs: "46-48 lbs" },
  "High 40s": { min: 48, max: 50, center: 49, lbs: "48-50 lbs" },
  "Low 50s": { min: 50, max: 53, center: 51.5, lbs: "50-53 lbs" },
  "Mid 50s": { min: 54, max: 56, center: 55, lbs: "54-56 lbs" }
};
const TENSION_TYPE_BASE = {
  Poly: 48.5,
  "Co-Poly": 49,
  "Synthetic Gut": 55,
  Multifilament: 54,
  "Natural Gut": 55.5,
  Hybrid: 52.5
};
const TENSION_RACKET_ADJUSTMENTS = {
  "Babolat Pure Aero": 0,
  "Babolat Pure Drive": 1.5,
  "Wilson Blade": 0.5,
  "Wilson Clash": 1.5,
  "Wilson Pro Staff": 0.5,
  "Yonex Ezone": 1,
  "Yonex VCORE": 0,
  "Head Speed": 0.5,
  "Head Radical": 0.5,
  "Control Frame": 0.5,
  "Power Frame": 1.5,
  "Spin Frame": 0
};
const TENSION_FEEL_ADJUSTMENTS = {
  Comfort: -2,
  Balanced: 0,
  Control: 2
};
const TENSION_ARM_ADJUSTMENTS = {
  Normal: 0,
  Sensitive: -1.5,
  "Very Sensitive": -3
};

// Admin note:
// To add Amazon affiliate links for a specific string, include these optional fields
// inside that stringEntry(...) object:
// amazonSetUrl: "https://www.amazon.com/dp/SETLINK?tag=yourtag-20",
// amazonReelUrl: "https://www.amazon.com/dp/REELLINK?tag=yourtag-20"
// If left blank, the app falls back to an Amazon search link for that string.

const STRINGS = [
  stringEntry("Babolat RPM Blast", {
    brand: "Babolat", type: "Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Babolat Pure Aero", atpPlayers: ["Arthur Fils", "Carlos Alcaraz", "Holger Rune", "Alexander Bublik", "Rafael Nadal"], wtaPlayers: ["Leylah Fernandez"],
    proRackets: [
      { player: "Arthur Fils", racket: "Babolat Pure Aero 98" },
      { player: "Carlos Alcaraz", racket: "Babolat Pure Aero 98" },
      { player: "Alexander Bublik", racket: "Babolat Aero-style pro stock / blacked-out frame" },
      { player: "Leylah Fernandez", racket: "Babolat Pure Aero 98" }
    ],
    armFriendliness: "Low", surface: "All Surfaces", priceTier: "Premium", imageTone: "#d1ff38",
    proTensions: [
      { player: "Arthur Fils", detail: "Typical full-bed example", tension: "22 / 23 kg" },
      { player: "Carlos Alcaraz", detail: "Typical full-bed example", tension: "55 / 53 lbs" },
      { player: "Rafael Nadal", detail: "Typical full-bed example", tension: "55 / 55 lbs" }
    ],
    summary: "A benchmark shaped poly for players who want heavy spin and a lively-but-controlled launch.",
    note: "Great fit for big swings and modern topspin mechanics."
  }),
stringEntry("Luxilon ALU Power", {
  brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
  comfort: "Low", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
  tensionBand: "Low 50s", racketFamily: "Wilson Blade", atpPlayers: ["Cameron Norrie", "Jack Draper", "Jiri Lehecka", "Karen Khachanov", "Novak Djokovic", "Daniil Medvedev", "Sebastian Korda"], wtaPlayers: ["Anna Kalinskaya", "Amanda Anisimova", "Anna Blinkova", "Aryna Sabalenka", "Barbora Krejcikova", "Beatriz Haddad Maia", "Coco Gauff", "Maria Sakkari", "McCartney Kessler", "Mirra Andreeva", "Ons Jabeur", "Paula Badosa"],
    proRackets: [
      { player: "Anna Kalinskaya", racket: "Wilson Ultra 100 v5" },
      { player: "Amanda Anisimova", racket: "Wilson Steam 100 BLX" },
      { player: "Anna Blinkova", racket: "Wilson Steam 100" },
      { player: "Barbora Krejcikova", racket: "Customized HEAD Youtek IG Extreme Pro (Extreme MP cosmetic)" },
      { player: "Beatriz Haddad Maia", racket: "Wilson Steam 100" },
      { player: "Coco Gauff", racket: "HEAD racquet" },
      { player: "Maria Sakkari", racket: "Wilson Ultra 100 v5" },
      { player: "Novak Djokovic", racket: "Head Speed Pro Legend" },
      { player: "Karen Khachanov", racket: "Wilson Blade 98 18x20 v9" },
      { player: "Aryna Sabalenka", racket: "Wilson Blade 98 18x20 v9" },
      { player: "Jiri Lehecka", racket: "Wilson Pro Staff 97 V14 cosmetic / customized Six One 95" },
      { player: "McCartney Kessler", racket: "Wilson Blade 98 16x19 / Blade Pro mold" },
      { player: "Paula Badosa", racket: "Wilson Blade 98 v9 / customized Wilson Steam 100" },
      { player: "Sebastian Korda", racket: "Wilson Blade 98" },
      { player: "Ons Jabeur", racket: "Wilson Pro Staff 97 v14" }
    ],
    proTensions: [
      { player: "Anna Kalinskaya", detail: "Typical full-bed example", tension: "53 lbs" },
      { player: "Coco Gauff", detail: "Typical full-bed example", tension: "53-55 lbs" },
      { player: "Cameron Norrie", detail: "Typical full-bed example", tension: "Mid-40s lbs" },
      { player: "Jiri Lehecka", detail: "Typical full-bed example", tension: "24 / 22 kg" },
      { player: "Sebastian Korda", detail: "Typical full-bed example", tension: "50 / 47 lbs" }
    ],
    armFriendliness: "Low", surface: "All Surfaces", priceTier: "Premium", imageTone: "#9cc8ff",
    summary: "Classic tour-level co-poly with clean response and strong control on full swings.",
    note: "Best for players who create pace and want a connected ball feel."
  }),
  stringEntry("Solinco Hyper-G", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: ["Hubert Hurkacz"], wtaPlayers: ["Sloane Stephens"],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#90d550",
    summary: "Spin-focused co-poly that rewards fast racquet head speed and aggressive shapes on the ball.",
    note: "Popular among players who want trajectory control and bite."
  }),
  stringEntry("Tecnifibre X-One Biphase", {
    brand: "Tecnifibre", type: "Multifilament", stringShape: "Round", spin: "Medium", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: ["Daniil Medvedev"], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f4e6af",
    summary: "Premium multi with strong pop and comfort for players wanting easier depth and touch.",
    note: "Great for players protecting the arm without moving to full gut."
  }),
  stringEntry("Wilson NXT", {
    brand: "Wilson", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Wilson Clash", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#ffd4b5",
    summary: "Comfort-first multifilament that gives easy power and a soft impact feel.",
    note: "A strong option for newer players and anyone managing arm tenderness."
  }),
  stringEntry("Babolat VS Touch", {
    brand: "Babolat", type: "Natural Gut", stringShape: "Round", spin: "Medium", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Pro", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: ["Novak Djokovic", "Roger Federer"], wtaPlayers: ["Iga Swiatek", "Belinda Bencic", "McCartney Kessler", "Anna Blinkova"],
    proRackets: [
      { player: "Novak Djokovic", racket: "Head Speed Pro Legend" },
      { player: "Roger Federer", racket: "Wilson RF 01 Pro" },
      { player: "Belinda Bencic", racket: "Yonex EZONE 100" },
      { player: "McCartney Kessler", racket: "Wilson Blade 98 16x19 / Blade Pro mold" },
      { player: "Anna Blinkova", racket: "Wilson Steam 100" }
    ],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f7deb0",
    proTensions: [
      { player: "Novak Djokovic", detail: "Typical gut/poly hybrid example", tension: "59 / 56 lbs" }
    ],
    summary: "Reference natural gut for players who want premium power, touch, and tension maintenance.",
    note: "Often used in hybrids for elite feel and arm comfort."
  }),
stringEntry("Yonex Poly Tour Pro", {
  brand: "Yonex", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
  comfort: "Medium", feel: "Muted", gauge: "16L", playerLevel: "Intermediate", gameStyle: "Counterpuncher",
  tensionBand: "High 40s", racketFamily: "Yonex Ezone", atpPlayers: ["Alejandro Tabilo", "Ben Shelton", "Casper Ruud", "Frances Tiafoe", "Nick Kyrgios"], wtaPlayers: ["Belinda Bencic", "Jasmine Paolini", "Naomi Osaka"],
    proRackets: [
      { player: "Alejandro Tabilo", racket: "Yonex VCORE 98 (older paint generation)" },
      { player: "Belinda Bencic", racket: "Yonex EZONE 100" }
    ],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#f1da4b",
    summary: "Softer co-poly that balances control and comfort without feeling too dead.",
    note: "Works well for players transitioning into poly. Alejandro Tabilo is commonly documented with a Poly Tour Pro mains / Poly Tour Spin crosses hybrid, so this is the closest in-database match."
  }),
  stringEntry("Head Lynx Tour", {
    brand: "Head", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Head Speed", atpPlayers: ["Andrey Rublev", "Lorenzo Musetti"], wtaPlayers: ["Liudmila Samsonova"],
    proRackets: [
      { player: "Liudmila Samsonova", racket: "HEAD Speed MP 2024" }
    ],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#f39b61",
    summary: "Firm six-sided co-poly built for precision, bite, and dependable directional control.",
    note: "Good for speed-frame users wanting extra spin structure."
  }),
  stringEntry("Solinco Confidential", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Muted", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Wilson Blade", atpPlayers: ["Hubert Hurkacz"], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#767676",
    summary: "Control-heavy poly for bigger hitters who want a tighter, more predictable response.",
    note: "A strong fit when launch control matters more than free power."
  }),
  stringEntry("Luxilon 4G", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "Very High",
    comfort: "Low", feel: "Muted", gauge: "16L", playerLevel: "Pro", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: ["Alexander Zverev", "Alexei Popyrin", "Nicolas Jarry"], wtaPlayers: ["Ekaterina Alexandrova", "Jelena Ostapenko", "Marta Kostyuk", "Qinwen Zheng", "Veronika Kudermetova"],
    proRackets: [
      { player: "Alexei Popyrin", racket: "Dunlop FX 500 Tour" },
      { player: "Ekaterina Alexandrova", racket: "Wilson Blade 98S v9" },
      { player: "Marta Kostyuk", racket: "Wilson Ultra 99 Pro v5" },
      { player: "Qinwen Zheng", racket: "Wilson Ultra 99 Pro / 95 QZ" },
      { player: "Veronika Kudermetova", racket: "Wilson Steam 99 / Blade 98 V9 paint" },
      { player: "Nicolas Jarry", racket: "Wilson Blade 98 V9 paint / Blade pro stock" },
      { player: "Jelena Ostapenko", racket: "Wilson Steam 100 BLX (Blade paint)" }
    ],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Premium", imageTone: "#e0b143",
    proTensions: [
      { player: "Stefanos Tsitsipas", detail: "Typical 4G / ALU example", tension: "57 / 57 lbs" },
      { player: "Jelena Ostapenko", detail: "Typical full-bed example", tension: "57-60 lbs" },
      { player: "Marta Kostyuk", detail: "Typical full-bed example", tension: "55 lbs" }
    ],
    summary: "Very stable co-poly known for tension maintenance and a controlled launch window.",
    note: "Best for players who hit hard and restring less often."
  }),
  stringEntry("Luxilon 4G Soft", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "16L", playerLevel: "Pro", gameStyle: "Counterpuncher",
    tensionBand: "Mid 40s", racketFamily: "Wilson Blade", atpPlayers: ["Ugo Humbert"], wtaPlayers: [],
    proRackets: [
      { player: "Ugo Humbert", racket: "Wilson Blade 98 16x19" }
    ],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#dcb756",
    proTensions: [
      { player: "Ugo Humbert", detail: "Typical full-bed example", tension: "42-49 lbs" }
    ],
    summary: "Softer version of 4G that keeps the family control and stability while offering a more forgiving response.",
    note: "Useful for players who like controlled Luxilon performance but want a friendlier feel and lower-tension setup."
  }),
  stringEntry("Prince Synthetic Gut Duraflex", {
    brand: "Prince", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f4d39b",
    summary: "Classic all-around synthetic gut with balanced playability and easy value.",
    note: "Great starting point for rec players figuring out what they like."
  }),
  stringEntry("Tecnifibre Razor Code", {
    brand: "Tecnifibre", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Head Radical", atpPlayers: [], wtaPlayers: ["Iga Swiatek"],
    proRackets: [
      { player: "Iga Swiatek", racket: "Tecnifibre TFight 300S" }
    ],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Premium", imageTone: "#e7c7ff",
    proTensions: [
      { player: "Iga Swiatek", detail: "Typical full-bed example", tension: "53 / 53 lbs" }
    ],
    summary: "Crisp, tour-style co-poly that blends pop, shape, and directional trust.",
    note: "Useful for aggressive all-court players who want a modern poly feel."
  }),
  stringEntry("Tecnifibre Razor Soft", {
    brand: "Tecnifibre", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: ["Danielle Collins"],
    proRackets: [
      { player: "Danielle Collins", racket: "Tecnifibre T-Fight 300" }
    ],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#f1d7f8",
    summary: "Softer-feeling Razor-family co-poly that aims to blend modern control with a friendlier response.",
    note: "A strong fit for players who want a cleaner Tecnifibre poly feel without the harshest impact."
  }),
  stringEntry("Babolat RPM Team", {
    brand: "Babolat", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Babolat Pure Drive", atpPlayers: ["Carlos Alcaraz", "Felix Auger-Aliassime"], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#b6ec69",
    summary: "A slightly softer RPM-family option with strong spin and easier access to pace.",
    note: "Nice bridge string for players curious about firmer polys."
  }),
  stringEntry("Wilson Revolve Spin", {
    brand: "Wilson", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Wilson Blade", atpPlayers: ["Stefanos Tsitsipas"], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#7df0a4",
    summary: "Shaped co-poly designed to help aggressive topspin players get extra bite and shape.",
    note: "Strong fit for modern baseline patterns and spin frames."
  }),
  stringEntry("Yonex Rexis Comfort", {
    brand: "Yonex", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Yonex Ezone", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#dff0ff",
    summary: "Soft, lively multifilament aimed at comfort and easy depth.",
    note: "A good option for players coming from synthetic gut and wanting more comfort."
  }),
  stringEntry("Head Velocity MLT", {
    brand: "Head", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Head Speed", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Budget", imageTone: "#8fd5ec",
    summary: "Popular multi with above-average control for the category and a cleaner response than many soft strings.",
    note: "Great value pick for comfort-oriented players."
  }),
  stringEntry("Kirschbaum Max Power", {
    brand: "Kirschbaum", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: ["Dominic Thiem"], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#e36b5c",
    summary: "Control-first co-poly for flatter ball strikers who want a firmer, cleaner contact point.",
    note: "Particularly useful when you need to rein in a lively racket."
  }),
  stringEntry("Signum Pro Firestorm", {
    brand: "Signum Pro", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: ["Matteo Berrettini"], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#e58a52",
    proTensions: [
      { player: "Matteo Berrettini", detail: "Typical full-bed example", tension: "51 lbs" }
    ],
    summary: "Popular Signum Pro co-poly known for balancing power, control, and a more comfortable feel than many firmer polys.",
    note: "A strong option for aggressive ball strikers who want a livelier full-bed poly without losing too much control."
  }),
  stringEntry("Volkl Cyclone", {
    brand: "Volkl", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Budget", imageTone: "#d69aff",
    summary: "Firm shaped poly that gives excellent bite and directional confidence on fast swings.",
    note: "Best suited to players who already like a firmer poly response."
  }),
  stringEntry("Wilson Champion's Choice", {
    brand: "Wilson", type: "Hybrid", stringShape: "Hybrid Mix", spin: "High", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Pro", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Wilson Pro Staff", atpPlayers: ["Roger Federer"], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f0e7bf",
    proTensions: [
      { player: "Roger Federer", detail: "Typical gut/poly hybrid example", tension: "48.5 / 45 lbs" }
    ],
    summary: "Classic gut/poly hybrid for players wanting elite power, touch, and string-bed definition.",
    note: "A premium all-court setup with broad performance range."
  }),
  stringEntry("Solinco Tour Bite Soft", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: ["Sloane Stephens"],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#9bd46a",
    summary: "A friendlier Tour Bite variant that keeps spin and control while softening impact slightly.",
    note: "Useful for players who like shaped polys but want a gentler ride."
  }),
  stringEntry("Luxilon Element", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "High 40s", racketFamily: "Wilson Clash", atpPlayers: ["Gael Monfils"], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#d9cbff",
    summary: "Soft-feeling co-poly for players who want control and easier comfort in a poly setup.",
    note: "A nice bridge between multis and firmer tour polys."
  }),
  stringEntry("Babolat Origin", {
    brand: "Babolat", type: "Hybrid", stringShape: "Hybrid Mix", spin: "Medium", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Plush", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f8deb5",
    summary: "Comfort-oriented performance string with more life and softness than most firm polys.",
    note: "Useful for players who like easy depth and a forgiving response."
  }),
  stringEntry("Yonex Poly Tour Rev", {
    brand: "Yonex", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Yonex VCORE", atpPlayers: ["Nick Kyrgios"], wtaPlayers: ["Emma Navarro", "Jessica Pegula", "Madison Keys"],
    proRackets: [
      { player: "Jessica Pegula", racket: "Yonex EZONE 98" }
    ],
    proTensions: [
      { player: "Jessica Pegula", detail: "Typical example with 10% pre-stretch", tension: "42 lbs" }
    ],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#7bd1ff",
    summary: "Spin-centric shaped co-poly with strong snapback and a lively modern feel.",
    note: "Ideal for players wanting RPMs without going all the way to the firmest polys."
  }),
  stringEntry("Head Hawk Power", {
    brand: "Head", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Head Speed", atpPlayers: ["Jannik Sinner"], wtaPlayers: [],
    proRackets: [
      { player: "Jannik Sinner", racket: "Head Speed MP 2026" }
    ],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#ffcb6b",
    summary: "A more explosive take on a control poly for players who still want a firmer launch window.",
    note: "Pairs well with fast modern frames."
  }),
  stringEntry("Wilson Sensation", {
    brand: "Wilson", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Budget", imageTone: "#ffcfc0",
    summary: "Easy-power multi built for recreational players wanting comfort and softer feedback.",
    note: "A strong starter upgrade from entry-level strings."
  }),
  stringEntry("Tecnifibre Triax", {
    brand: "Tecnifibre", type: "Multifilament", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#ffd8f7",
    summary: "Control-oriented multi with a more disciplined response than most soft string options.",
    note: "Good for players who want arm comfort without losing too much precision."
  }),
  stringEntry("Prince Premier Control", {
    brand: "Prince", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "16", playerLevel: "Intermediate", gameStyle: "Counterpuncher",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#efdfa9",
    summary: "Comfort-friendly multi with firmer control than many power-oriented multifilaments.",
    note: "A useful choice for steadier ball strikers."
  }),
  stringEntry("Babolat Addixion+", {
    brand: "Babolat", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Babolat Pure Drive", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#fceca6",
    summary: "Comfortable multi with accessible power and a cleaner response than entry-level synthetic gut.",
    note: "Good for recreational Babolat users wanting an easier string bed."
  }),
  stringEntry("Head Synthetic Gut PPS", {
    brand: "Head", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#cfeee9",
    summary: "Reliable budget string with predictable response and solid all-around playability.",
    note: "A sensible low-cost restring for club players."
  }),
  stringEntry("Luxilon Eco Power", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Wilson Blade", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#9ddf6a",
    summary: "Modern co-poly with a clean response and eco-minded construction.",
    note: "A newer option for players who still want recognizable Luxilon control."
  }),
  stringEntry("Toroline Wasabi", {
    brand: "Toroline", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Premium", imageTone: "#b6f25a",
    summary: "Lively shaped co-poly for players who want heavy rotation with a more modern, energetic response.",
    note: "Strong fit for spin-first baseline patterns."
  }),
  stringEntry("Gosen OG-Sheep Micro", {
    brand: "Gosen", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#efe4cb",
    summary: "Value synthetic gut that stays simple, predictable, and easy to recommend for everyday club play.",
    note: "A good baseline restring when budget matters."
  }),
  stringEntry("Yonex Dynawire", {
    brand: "Yonex", type: "Synthetic Gut", stringShape: "Textured", spin: "Medium", power: "Medium", control: "Medium", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Intermediate", gameStyle: "Flat Hitter",
    tensionBand: "Mid 50s", racketFamily: "Yonex Ezone", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#b0d8ff",
    summary: "Crisper synthetic setup with solid durability for players who want cleaner feedback than a soft multi.",
    note: "Useful for frequent club hitters and junior competitors."
  }),
  stringEntry("Wilson Revolve", {
    brand: "Wilson", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Wilson Clash", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#8cc9ff",
    summary: "Round co-poly with a smooth snapback feel and a friendlier response than the stiffest tour strings.",
    note: "Nice for players wanting spin and control without a very harsh bed."
  }),
  stringEntry("Head Hawk Touch", {
    brand: "Head", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Head Radical", atpPlayers: ["Alexander Zverev", "Jannik Sinner", "Nuno Borges"], wtaPlayers: [],
    proRackets: [
      { player: "Jannik Sinner", racket: "Head Speed MP 2026" },
      { player: "Nuno Borges", racket: "HEAD Radical pro stock (TGT 307)" }
    ],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#d8a56d",
    proTensions: [
      { player: "Jannik Sinner", detail: "Typical full-bed example", tension: "61 / 61 lbs" }
    ],
    summary: "Control-oriented co-poly with a slightly cleaner feel than deader low-powered options.",
    note: "Works well for players who redirect pace and value precise targeting."
  }),
  stringEntry("Prince Premier Touch", {
    brand: "Prince", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "17", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f7e1b4",
    summary: "Soft multifilament aimed at comfort, easy pace, and a forgiving overall ride.",
    note: "A dependable option for players prioritizing feel over durability."
  }),
  stringEntry("Luxilon Natural Gut / ALU Hybrid", {
    brand: "Luxilon", type: "Hybrid", stringShape: "Hybrid Mix", spin: "High", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Pro", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: ["Grigor Dimitrov", "Roger Federer"], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#efe3c2",
    summary: "Premium gut/poly hybrid recipe for players chasing elite touch, power, and controlled launch.",
    note: "A luxury choice that plays big and feels connected."
  }),
  stringEntry("Luxilon Natural Gut / 4G Rough Hybrid", {
    brand: "Luxilon", type: "Hybrid", stringShape: "Hybrid Mix", spin: "High", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16L", playerLevel: "Pro", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: ["Alex de Minaur"], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Premium", imageTone: "#ece1c4",
    proTensions: [
      { player: "Alex de Minaur", detail: "Typical gut / 4G Rough hybrid example", tension: "46-51 lbs" }
    ],
    summary: "Specific Luxilon gut and 4G Rough hybrid built around touch, controlled launch, and strong tension stability.",
    note: "A premium low-tension hybrid for players wanting feel in the mains and firmer poly control in the crosses."
  }),
  stringEntry("Babolat Touch VS / RPM Blast Hybrid", {
    brand: "Babolat", type: "Hybrid", stringShape: "Hybrid Mix", spin: "High", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Pro", gameStyle: "Aggressive Baseliner",
    tensionBand: "Mid 50s", racketFamily: "Babolat Pure Aero", atpPlayers: ["Carlos Alcaraz", "Rafael Nadal"], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#edf2b5",
    summary: "Gut and shaped poly hybrid that blends pocketing, pop, and heavier-ball potential.",
    note: "Great for advanced players wanting more complete performance than a full poly."
  }),
  stringEntry("Yonex Poly Tour Air / Babolat VS Touch Hybrid", {
    brand: "Yonex", type: "Hybrid", stringShape: "Hybrid Mix", spin: "High", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16L", playerLevel: "Pro", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Yonex Ezone", atpPlayers: [], wtaPlayers: ["Marketa Vondrousova"],
    proRackets: [
      { player: "Marketa Vondrousova", racket: "Yonex EZONE 100" }
    ],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#b8dfff",
    summary: "Soft poly and natural gut hybrid that blends comfort, power, and controlled spin in a very playable premium setup.",
    note: "A strong fit for players who want a more comfortable hybrid with touch from the gut and shape from the poly."
  }),
  stringEntry("Head Hawk Touch / Babolat VS Touch Hybrid", {
    brand: "Head", type: "Hybrid", stringShape: "Hybrid Mix", spin: "High", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16L", playerLevel: "Pro", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Head Speed", atpPlayers: [], wtaPlayers: ["Karolina Muchova"],
    proRackets: [
      { player: "Karolina Muchova", racket: "HEAD Speed MP" }
    ],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#d5d9df",
    summary: "Poly-and-gut hybrid that combines controlled poly response in the mains with natural-gut touch and power in the crosses.",
    note: "A premium setup for all-court players who want precision, feel, and comfort in one string bed."
  }),
  stringEntry("Luxilon ALU Power Rough", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Textured", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Low", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Wilson Pro Staff", atpPlayers: ["Grigor Dimitrov"], wtaPlayers: [],
    armFriendliness: "Low", surface: "All Surfaces", priceTier: "Premium", imageTone: "#9fc2d9",
    summary: "Textured version of ALU Power that adds a little extra bite without losing the classic connected feel.",
    note: "Popular with players who like ALU but want a touch more spin response."
  }),
  stringEntry("Luxilon Savage", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#8ec3ff",
    summary: "Firm, spin-oriented Luxilon string for players who want sharper bite and a lower-powered launch.",
    note: "Best when you swing fast and want more grab on the ball."
  }),
  stringEntry("Solinco Tour Bite", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: ["Tommy Paul"], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#8fdd68",
    summary: "One of the benchmark shaped polys for maximum bite, control, and RPM production.",
    note: "A common choice for aggressive baseliners with fast racquet-head speed."
  }),
  stringEntry("Tecnifibre Black Code", {
    brand: "Tecnifibre", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: ["Daria Kasatkina"],
    proRackets: [
      { player: "Daria Kasatkina", racket: "Customized Artengo TR990" }
    ],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#555555",
    summary: "Softer-feeling shaped poly that balances spin, comfort, and a smoother trajectory than firmer tour strings.",
    note: "A good transition string for players testing shaped polys."
  }),
  stringEntry("Babolat RPM Power", {
    brand: "Babolat", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Babolat Pure Drive", atpPlayers: ["Felix Auger-Aliassime"], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#a65757",
    summary: "Slicker, more explosive Babolat poly for players who want pace plus a modern controlled response.",
    note: "Pairs well with livelier modern frames."
  }),
  stringEntry("Babolat Synthetic Gut", {
    brand: "Babolat", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f6e6b5",
    summary: "Simple, affordable all-rounder for club players who want predictable response and value.",
    note: "A sensible first restring for newer players."
  }),
  stringEntry("Wilson Hyper-G Round", {
    brand: "Wilson", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Wilson Blade", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#9ebeff",
    summary: "Round co-poly feel profile aimed at a cleaner response and easy snapback.",
    note: "A nice fit for players wanting control without a shaped edge."
  }),
  stringEntry("Wilson Natural Gut", {
    brand: "Wilson", type: "Natural Gut", stringShape: "Round", spin: "Medium", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Advanced", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: ["Roger Federer"], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f2deba",
    summary: "Premium gut option with excellent feel, power, and tension maintenance.",
    note: "Often chosen for luxury gut/poly hybrid builds."
  }),
  stringEntry("Head Lynx", {
    brand: "Head", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "High 40s", racketFamily: "Head Speed", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#74e2c7",
    summary: "More forgiving round poly in the Head family with balanced control and comfort.",
    note: "Good for players stepping into poly for the first time."
  }),
stringEntry("Head Hawk", {
  brand: "Head", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "High",
  comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
  tensionBand: "High 40s", racketFamily: "Head Radical", atpPlayers: ["Alexander Zverev", "Taylor Fritz", "Matteo Arnaldi"], wtaPlayers: [],
    proRackets: [
      { player: "Taylor Fritz", racket: "Head Radical MP 2025" },
      { player: "Matteo Arnaldi", racket: "HEAD Radical MP / Graphene 360+ Radical MP pro stock" }
    ],
  armFriendliness: "Low", surface: "Hard Court", priceTier: "Premium", imageTone: "#9caab4",
    summary: "Firm control poly built for precise direction and a tight, stable ball flight.",
    note: "Best for flatter strikers and redirectors."
  }),
  stringEntry("Yonex Poly Tour Strike", {
    brand: "Yonex", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Yonex VCORE", atpPlayers: ["Sebastian Baez"], wtaPlayers: ["Caroline Garcia", "Clara Tauson", "Donna Vekic"],
    proRackets: [
      { player: "Sebastian Baez", racket: "Yonex VCORE 100" },
      { player: "Clara Tauson", racket: "Yonex Percept 100 cosmetic / VCORE Pro 100" },
      { player: "Donna Vekic", racket: "Yonex VCORE 100" }
    ],
    stringColor: "Grey",
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Premium", imageTone: "#f0d857",
    summary: "Control-first Yonex poly for players who want lower launch and a firmer tour feel.",
    note: "Strong option for big hitters who like clean feedback."
  }),
stringEntry("Yonex Poly Tour Fire", {
  brand: "Yonex", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
  comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
  tensionBand: "High 40s", racketFamily: "Yonex Ezone", atpPlayers: ["Tomas Machac"], wtaPlayers: ["Diana Shnaider", "Elena Rybakina"],
    proRackets: [
      { player: "Tomas Machac", racket: "Yonex VCORE 100" },
      { player: "Diana Shnaider", racket: "Yonex EZONE 100" }
    ],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#e0624f",
    summary: "Slick, modern Yonex co-poly with livelier response and solid spin support.",
    note: "Useful if you want more pace than Poly Tour Strike."
  }),
  stringEntry("Kirschbaum Super Smash Orange", {
    brand: "Kirschbaum", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#f38b42",
    summary: "Classic low-powered poly with firm response and durable performance.",
    note: "A strong budget choice for control-minded hitters."
  }),
  stringEntry("Volkl V-Square", {
    brand: "Volkl", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#d98cff",
    summary: "Shaped Volkl poly built for extra bite and heavy rotation.",
    note: "Best for players who want aggressive shape on the ball."
  }),
  stringEntry("Prince Tour XP", {
    brand: "Prince", type: "Co-Poly", stringShape: "Textured", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#b8f26f",
    summary: "Textured Prince poly with good pop and above-average spin.",
    note: "Works well for players who want a lively poly bed."
  }),
  stringEntry("Prince Duraflex Plus", {
    brand: "Prince", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f5d890",
    summary: "Reliable everyday synthetic gut with classic feel and straightforward value.",
    note: "A practical club-player restring choice."
  }),
  stringEntry("Gosen AK Pro CX", {
    brand: "Gosen", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f2d2b7",
    summary: "Comfortable multi with a cleaner, more controlled response than most soft strings.",
    note: "Nice for players who want comfort but not too much trampoline."
  }),
  stringEntry("Babolat RPM Soft", {
    brand: "Babolat", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Babolat Pure Drive", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#d8d05c",
    summary: "Softer Babolat poly designed to offer easier comfort without giving up modern control.",
    note: "Good for players moving toward poly but avoiding harsh setups."
  }),
  stringEntry("Babolat Pro Hurricane Tour", {
    brand: "Babolat", type: "Poly", stringShape: "Shaped", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#dcb94d",
    summary: "Older-school firm poly with dependable bite and a controlled response.",
    note: "Best suited to confident swingers who prefer a firmer string bed."
  }),
  stringEntry("Babolat Excel", {
    brand: "Babolat", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f2e5aa",
    summary: "Comfort-focused multi with easy depth, touch, and a very forgiving impact feel.",
    note: "A nice softer alternative to synthetic gut."
  }),
  stringEntry("Luxilon M2 Pro", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "High 40s", racketFamily: "Wilson Blade", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Premium", imageTone: "#b4b7be",
    summary: "A more elastic Luxilon option with a smoother, more forgiving response than 4G or ALU.",
    note: "Useful if you want Luxilon control with easier comfort."
  }),
  stringEntry("Luxilon Big Banger Original", {
    brand: "Luxilon", type: "Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "Very High",
    comfort: "Low", feel: "Muted", gauge: "16", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Premium", imageTone: "#c8c07a",
    summary: "Legendary low-powered poly with stable control and long-play consistency.",
    note: "Best for players who want to keep launch and power in check."
  }),
  stringEntry("Solinco Revolution", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#8bd96b",
    summary: "Modern Solinco co-poly with a livelier feel than Confidential and strong control.",
    note: "Good for players who want a cleaner response with easy spin."
  }),
  stringEntry("Solinco Vanquish", {
    brand: "Solinco", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#efe5b4",
    summary: "Soft Solinco multi geared toward comfort, feel, and easy pace.",
    note: "A nice fit for players who want arm relief."
  }),
  stringEntry("Tecnifibre Ice Code", {
    brand: "Tecnifibre", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#edf2f8",
    summary: "Crisp co-poly with a smoother feel and easy pace compared with firmer control strings.",
    note: "A strong modern option for players wanting a cleaner white poly."
  }),
  stringEntry("Tecnifibre Red Code", {
    brand: "Tecnifibre", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#d85a5a",
    summary: "Firm control poly with a crisp response and reliable directional confidence.",
    note: "Best for flatter ball strikers and full swings."
  }),
  stringEntry("Tecnifibre HDMX", {
    brand: "Tecnifibre", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f0dcb7",
    summary: "Hybrid-style multi blend that leans more controlled than many comfort strings.",
    note: "Good for players wanting comfort with disciplined response."
  }),
  stringEntry("Wilson Revolve Twist", {
    brand: "Wilson", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#8fead7",
    summary: "Twisted co-poly aimed at extra bite and heavy-topspin response.",
    note: "A strong fit for players wanting more action on the ball."
  }),
  stringEntry("Wilson Ripspin", {
    brand: "Wilson", type: "Co-Poly", stringShape: "Textured", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Muted", gauge: "16", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#5f636a",
    summary: "Textured control string for players who want lower-powered spin response.",
    note: "Best for aggressive baseliners who create their own pace."
  }),
  stringEntry("Wilson Stamina", {
    brand: "Wilson", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#efe2c4",
    summary: "Durable synthetic option with classic response and straightforward value.",
    note: "Useful for frequent hitters on a budget."
  }),
  stringEntry("Wilson Duo Control", {
    brand: "Wilson", type: "Hybrid", stringShape: "Hybrid Mix", spin: "Medium", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#d6dce4",
    summary: "Prebuilt Wilson hybrid for players wanting control with more comfort than a full poly.",
    note: "A convenient way to try a hybrid setup."
  }),
  stringEntry("Head Gravity", {
    brand: "Head", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#dcdcdc",
    summary: "Soft multifilament built for comfort, depth, and a relaxed response.",
    note: "Strong option for recreational players seeking easy power."
  }),
  stringEntry("Yonex Rexis Feel", {
    brand: "Yonex", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f2ead3",
    summary: "Feel-first multi with softer impact and more touch-oriented response.",
    note: "Ideal for players prioritizing comfort and finesse."
  }),
  stringEntry("Yonex Aeron Super 850", {
    brand: "Yonex", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f6eccd",
    summary: "Soft Yonex multi built around comfort and easy depth.",
    note: "Nice fit for recreational players wanting less impact shock."
  }),
  stringEntry("Kirschbaum Pro Line II", {
    brand: "Kirschbaum", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#c76262",
    summary: "Firm German co-poly with controlled response and reliable tension stability.",
    note: "Good for disciplined all-court and counterpunching styles."
  }),
  stringEntry("Kirschbaum Flash", {
    brand: "Kirschbaum", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f0cc4c",
    summary: "More lively Kirschbaum poly that still keeps a clean, controlled feel.",
    note: "A stronger fit if you want easier pace than Max Power."
  }),
  stringEntry("Volkl Cyclone Tour", {
    brand: "Volkl", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#d8a7ff",
    summary: "Softer sibling to Cyclone that keeps spin but offers a friendlier response.",
    note: "A nice choice for topspin players who dislike harsh beds."
  }),
  stringEntry("Volkl Classic Synthetic Gut", {
    brand: "Volkl", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f5e2bb",
    summary: "Straightforward synthetic gut with classic feel and easy value.",
    note: "A sensible everyday restring for rec players."
  }),
  stringEntry("Prince Beast XP", {
    brand: "Prince", type: "Co-Poly", stringShape: "Textured", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#91ef61",
    summary: "Lively Prince co-poly with easy spin and a modern response.",
    note: "Good for players who want a slightly friendlier poly bed."
  }),
  stringEntry("Prince Lightning Pro", {
    brand: "Prince", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f6df9f",
    summary: "Affordable Prince multi with easy pace and good comfort.",
    note: "A practical softer option for newer players."
  }),
  stringEntry("Gosen Polylon", {
    brand: "Gosen", type: "Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#dadfe5",
    summary: "Simple control poly with a lower-powered old-school feel.",
    note: "Best for budget-conscious hitters who want control."
  }),
  stringEntry("Gosen Sidewinder", {
    brand: "Gosen", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#92ca68",
    summary: "Shaped Gosen poly built for extra bite and spin support.",
    note: "A nice option for topspin-oriented club players."
  }),
  stringEntry("Gosen AK Pro", {
    brand: "Gosen", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#ead8bd",
    summary: "Classic Gosen multi with a cleaner, more controlled feel than many soft strings.",
    note: "Useful for players who want comfort without a trampoline effect."
  }),
  stringEntry("Toroline Toro Toro", {
    brand: "Toroline", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Premium", imageTone: "#ef6b6b",
    summary: "Boutique shaped poly with big spin and energetic response.",
    note: "A lively option for players who want RPMs and modern feel."
  }),
  stringEntry("Toroline Enso Pro", {
    brand: "Toroline", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#66c4f5",
    summary: "Smooth modern co-poly with a balanced mix of control and pop.",
    note: "Good for players wanting boutique feel without an extreme shape."
  }),
  stringEntry("Toroline K-Pop", {
    brand: "Toroline", type: "Hybrid", stringShape: "Hybrid Mix", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "16", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Premium", imageTone: "#d5a6ff",
    summary: "Boutique prebuilt hybrid designed to blend spin, feel, and a more complete response.",
    note: "A convenient option if you want to try a hybrid without mixing sets."
  }),
  stringEntry("Head RIP Control", {
    brand: "Head", type: "Multifilament", stringShape: "Textured", spin: "Low", power: "Low", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "16", playerLevel: "Intermediate", gameStyle: "Counterpuncher",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Budget", imageTone: "#d5caa5",
    summary: "Control-oriented soft string with uniquely muted response and low-powered feel.",
    note: "A favorite for players wanting comfort plus directional discipline."
  }),
  stringEntry("Head Hawk Rough", {
    brand: "Head", type: "Co-Poly", stringShape: "Textured", spin: "High", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Head Radical", atpPlayers: ["Nuno Borges"], wtaPlayers: [],
    proRackets: [
      { player: "Nuno Borges", racket: "HEAD Radical pro stock (TGT 307)" }
    ],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Premium", imageTone: "#8a969e",
    summary: "Textured Head control poly with a firmer feel and extra grip on the ball.",
    note: "Best for advanced players who like a lower-powered setup."
  }),
  stringEntry("Wilson Duo Power", {
    brand: "Wilson", type: "Hybrid", stringShape: "Hybrid Mix", spin: "Medium", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f0dcc0",
    summary: "Power-oriented Wilson hybrid for players wanting easier depth without losing too much feel.",
    note: "Good for club players wanting a more premium blended setup."
  }),
  stringEntry("Tecnifibre Synthetic Gut", {
    brand: "Tecnifibre", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f2e0c1",
    summary: "Straightforward synthetic gut with balanced performance and good value.",
    note: "A practical choice for frequent restringers."
  }),
  stringEntry("Prince Tour XR", {
    brand: "Prince", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#7cb9ef",
    summary: "Round Prince poly that leans livelier than Tour XP while keeping control in check.",
    note: "Good for players who want a cleaner feel than textured polys."
  }),
  stringEntry("Prince Warrior Response", {
    brand: "Prince", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#efe0bc",
    summary: "Control-oriented Prince multi with strong comfort and a more disciplined launch.",
    note: "Useful for players who want feel without excess power."
  }),
  stringEntry("Gosen Multi CX", {
    brand: "Gosen", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#eadbc0",
    summary: "Comfortable Gosen multi that leans toward control and clean feel rather than raw power.",
    note: "A nice fit for players who want comfort with structure."
  }),
  stringEntry("Volkl V-Torque Tour", {
    brand: "Volkl", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#b77bff",
    summary: "Spin-focused Volkl poly with good bite and a friendlier response than the firmest shaped strings.",
    note: "A solid choice for topspin-heavy baseliners wanting easier comfort."
  }),
  stringEntry("Babolat Pro Hurricane", {
    brand: "Babolat", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#f1cd58",
    summary: "Firm classic Babolat poly with a controlled launch and dependable durability.",
    note: "Best for players who want a traditional polyester feel without a shaped profile."
  }),
  stringEntry("Babolat Syn Gut", {
    brand: "Babolat", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f5e7b6",
    summary: "Simple synthetic gut with balanced performance and easy value.",
    note: "Useful for recreational players who restring often and want a straightforward setup."
  }),
  stringEntry("Luxilon Adrenaline", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#b8c3cc",
    summary: "Value-minded Luxilon poly with a firm, controlled response and strong durability.",
    note: "A practical alternative for players who want the Luxilon feel at a lower cost."
  }),
  stringEntry("Luxilon Original", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "Very High",
    comfort: "Low", feel: "Muted", gauge: "16L", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "Low 50s", racketFamily: "Wilson Pro Staff", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Premium", imageTone: "#b8b3aa",
    summary: "Legendary low-powered control poly with exceptional predictability and durability.",
    note: "Best for strong hitters who prefer a deader, very stable string bed."
  }),
  stringEntry("Solinco Hyper-G Round", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#89d34b",
    summary: "Rounder Hyper-G variant for players who want the family feel with a cleaner response.",
    note: "Useful if you like Solinco control but want less extreme shape."
  }),
  stringEntry("Solinco Outlast", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "Very High",
    comfort: "Low", feel: "Crisp", gauge: "16", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#9aa7b3",
    summary: "Durability-first Solinco poly with a firmer, lower-powered response.",
    note: "Great for string breakers who still want directional control."
  }),
  stringEntry("Tecnifibre Black Code 4S", {
    brand: "Tecnifibre", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#3e4349",
    summary: "Sharper-edged Black Code version built for stronger bite and a lower launch.",
    note: "A good fit for aggressive topspin players wanting a firm Tecnifibre poly."
  }),
  stringEntry("Tecnifibre MultiFeel", {
    brand: "Tecnifibre", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f0e0b6",
    summary: "Soft budget-friendly multi aimed at comfort and easy depth.",
    note: "A strong option for recreational players moving away from harsh strings."
  }),
  stringEntry("Tecnifibre NRG2", {
    brand: "Tecnifibre", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "Very High", feel: "Plush", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Very High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f2dec5",
    summary: "Classic premium multifilament known for comfort, touch, and lively response.",
    note: "Excellent for players prioritizing feel or protecting the arm."
  }),
  stringEntry("Wilson NXT Control", {
    brand: "Wilson", type: "Multifilament", stringShape: "Textured", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "16", playerLevel: "Intermediate", gameStyle: "Counterpuncher",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#efe0c2",
    summary: "Textured Wilson multi that reins in power and adds a more controlled launch.",
    note: "A nice bridge for players who want comfort but not a trampoline feel."
  }),
  stringEntry("Wilson Red Alert", {
    brand: "Wilson", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#df5a5a",
    summary: "Firm budget poly aimed at control and durability over comfort.",
    note: "Works best for players who generate their own pace and restring often."
  }),
  stringEntry("Wilson Ultra Synthetic Gut", {
    brand: "Wilson", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f3e6cb",
    summary: "Classic Wilson synthetic gut with even-handed all-around performance.",
    note: "Great as an affordable everyday setup for recreational players."
  }),
  stringEntry("Head Reflex MLT", {
    brand: "Head", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "Very High", feel: "Plush", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Very High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f2e2c0",
    summary: "Premium Head multi built for comfort, touch, and easy pace.",
    note: "A great choice for players dealing with arm sensitivity."
  }),
  stringEntry("Head Sonic Pro", {
    brand: "Head", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "Medium", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Head Extreme", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#7aa8ef",
    summary: "Accessible Head poly that keeps things simple with balanced response and decent comfort.",
    note: "Works well for players trying poly without jumping into the firmest options."
  }),
  stringEntry("Head Sonic Pro Edge", {
    brand: "Head", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Intermediate", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Head Extreme", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Budget", imageTone: "#88b4f0",
    summary: "Shaped Sonic Pro variant that adds bite while staying playable for club hitters.",
    note: "A nice budget spin option for modern baseline games."
  }),
  stringEntry("Yonex Rexis Speed", {
    brand: "Yonex", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Yonex Ezone", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f4e7c6",
    summary: "Lively Yonex multi that favors easy depth and cleaner rebound speed.",
    note: "Good for players who want power without going to full poly."
  }),
  stringEntry("Yonex Rexis Spin", {
    brand: "Yonex", type: "Multifilament", stringShape: "Textured", spin: "Medium", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Yonex VCORE", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f0ddbc",
    summary: "Textured Yonex multi built to add a little more grip and control than a typical soft string.",
    note: "Useful for players who want comfort but still like a modern ball shape."
  }),
  stringEntry("Yonex Poly Tour Drive", {
    brand: "Yonex", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Yonex Ezone", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#74b6f1",
    summary: "Balanced Yonex co-poly with a little more pace than the firmest control options.",
    note: "Good for players who want a less dead feel without losing shape on the ball."
  }),
  stringEntry("Kirschbaum Super Smash", {
    brand: "Kirschbaum", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#c6b289",
    summary: "Longtime Kirschbaum staple with classic low-powered poly control.",
    note: "Appeals to players who like firmer traditional polyester response."
  }),
  stringEntry("Kirschbaum Competition", {
    brand: "Kirschbaum", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Muted", gauge: "16", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#cfd0c6",
    summary: "Stable Kirschbaum poly built around consistency, durability, and control.",
    note: "A solid budget choice for players who want dependable behavior over flash."
  }),
  stringEntry("Kirschbaum Pro Line Evolution", {
    brand: "Kirschbaum", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#ee6767",
    summary: "More modern-feeling Kirschbaum poly with livelier pace and cleaner feedback.",
    note: "Useful if you want control but not a completely dead response."
  }),
  stringEntry("Volkl Power Fiber Pro", {
    brand: "Volkl", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "Very High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Very High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#efe2c7",
    summary: "Soft premium Volkl multi built around comfort and lively feel.",
    note: "Excellent for arm-conscious players who want easier pace."
  }),
  stringEntry("Volkl Synthetic Gut", {
    brand: "Volkl", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f1e5cb",
    summary: "Straightforward synthetic gut offering balanced playability at low cost.",
    note: "Good for casual players or frequent restringers."
  }),
  stringEntry("Prince Tournament Nylon", {
    brand: "Prince", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#efe0c8",
    summary: "Traditional Prince nylon string with balanced value-oriented performance.",
    note: "A dependable starter choice for recreational tennis."
  }),
  stringEntry("Prince ResiPro", {
    brand: "Prince", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f3e4c8",
    summary: "Comfort-friendly Prince multi with easy depth and a softer ride.",
    note: "Good for players who want forgiveness without premium pricing."
  }),
  stringEntry("Gamma Live Wire", {
    brand: "Gamma", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "Very High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Very High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f1e1c4",
    summary: "Very soft Gamma multi designed for comfort, touch, and easy pace.",
    note: "A strong option for players with arm concerns or compact swings."
  }),
  stringEntry("Gamma Live Wire XP", {
    brand: "Gamma", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f0dfc2",
    summary: "Livelier Gamma multi with slightly firmer response and better durability than classic Live Wire.",
    note: "Useful for players who want comfort with a little extra structure."
  }),
  stringEntry("Gamma TNT2 Touch", {
    brand: "Gamma", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f1e3cb",
    summary: "Popular Gamma all-around string with a crisp but playable synthetic-gut feel.",
    note: "A safe all-purpose choice for club players."
  }),
  stringEntry("Gamma Moto", {
    brand: "Gamma", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#6db858",
    summary: "Firm Gamma shaped poly for players chasing heavy spin and lower launch.",
    note: "Best for fast swingers who want strong bite on the ball."
  }),
  stringEntry("Gamma Ocho", {
    brand: "Gamma", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#6aa8f0",
    summary: "Eight-sided Gamma poly with strong spin access and a more modern response.",
    note: "A good fit for players wanting RPMs without a dead feel."
  }),
  stringEntry("Gamma IO Soft", {
    brand: "Gamma", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#f0b18c",
    summary: "Softer Gamma poly that makes polyester more approachable for club players.",
    note: "Useful for players who want control and durability without harsh impact."
  }),
  stringEntry("Dunlop Explosive Spin", {
    brand: "Dunlop", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#eea84a",
    summary: "Spin-heavy Dunlop poly for players wanting sharper bite and stronger trajectory control.",
    note: "Best for modern baseliners who create racquet-head speed."
  }),
  stringEntry("Dunlop Explosive Bite", {
    brand: "Dunlop", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#efb24e",
    summary: "Livelier Dunlop spin poly that blends bite with more rebound pace.",
    note: "Useful if you want spin support without an overly dead response."
  }),
  stringEntry("Dunlop Silk", {
    brand: "Dunlop", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f2e2c8",
    summary: "Comfort-oriented Dunlop multi with soft impact and easy pace.",
    note: "A friendly option for newer players or sore arms."
  }),
  stringEntry("Dunlop S-Gut", {
    brand: "Dunlop", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#efe0c6",
    summary: "Basic synthetic gut with solid all-around playability and good value.",
    note: "Ideal for recreational use and frequent restringing."
  }),
  stringEntry("MSV Focus Hex", {
    brand: "MSV", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Budget", imageTone: "#d7c559",
    summary: "Budget-friendly shaped poly known for strong bite and control.",
    note: "A nice value option for players who want spin without premium pricing."
  }),
  stringEntry("MSV Swift", {
    brand: "MSV", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#79b7f2",
    summary: "Softer MSV poly built for players who want poly control with easier comfort.",
    note: "Useful for transitioning into polyester without the harshest impact."
  }),
  stringEntry("Weiss Cannon Ultra Cable", {
    brand: "Weiss Cannon", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#d8d24e",
    summary: "Textured spin monster for players chasing maximum bite and heavy action.",
    note: "Best for advanced hitters who want the ball to jump off the court."
  }),
  stringEntry("Weiss Cannon Silverstring", {
    brand: "Weiss Cannon", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#bdc6cf",
    summary: "Popular round control poly with clean response and a slightly softer feel than the firmest polys.",
    note: "A strong fit for players who prioritize consistency and feel."
  }),
  stringEntry("Mayami Big Spin", {
    brand: "Mayami", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#8fda5b",
    summary: "Boutique spin poly with strong bite and a firm, controlled response.",
    note: "Good for players who want sharper RPM-focused performance."
  }),
  stringEntry("Mayami Tour Hex", {
    brand: "Mayami", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#7fc1f0",
    summary: "Hexagonal boutique poly with modern response and easy spin access.",
    note: "A balanced pick for players who want both bite and usable pace."
  }),
  stringEntry("Restring Zero", {
    brand: "Restring", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#d8dce1",
    summary: "Modern control poly with a lower-powered, stable, point-and-shoot response.",
    note: "Great for precision-oriented players who want a predictable launch."
  }),
  stringEntry("Restring Sync", {
    brand: "Restring", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#78bdf2",
    summary: "Slightly livelier Restring poly that blends control with a cleaner rebound speed.",
    note: "Useful for players who want precision without going too dead."
  }),
  stringEntry("Diadem Solstice Power", {
    brand: "Diadem", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: ["Elina Svitolina"],
    proRackets: [
      { player: "Elina Svitolina", racket: "Diadem Axis 98" }
    ],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#6fc86c",
    summary: "Popular Diadem shaped poly with easy spin and a more energetic response.",
    note: "A good fit for modern topspin players who still want some pop. Used here as the closest in-database match to Svitolina's current full Diadem setup."
  }),
  stringEntry("Diadem Flash", {
    brand: "Diadem", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#84bef2",
    summary: "Round Diadem poly with a balanced mix of pace, control, and playability.",
    note: "Nice for players who want a cleaner feel than heavily shaped strings."
  }),
  stringEntry("Diadem Evolution", {
    brand: "Diadem", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#efe1c9",
    summary: "Simple value string from Diadem with balanced all-around playability.",
    note: "A practical everyday setup for newer players."
  }),
  stringEntry("Toroline Caviar", {
    brand: "Toroline", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#2f3136",
    summary: "Boutique black control poly with strong stability and a more precise launch.",
    note: "A strong pick for players who like low-powered confidence."
  }),
  stringEntry("Toroline O-Toro", {
    brand: "Toroline", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Premium", imageTone: "#e9cf58",
    summary: "Popular Toroline spin poly with lively jump and strong grab on the ball.",
    note: "Great for players who want heavy RPMs with boutique feel."
  }),
  stringEntry("Genesis Black Magic", {
    brand: "Genesis", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#2e3136",
    summary: "Smooth black co-poly with a balanced mix of control, pace, and clean feel.",
    note: "A nice all-around poly for players who want a modern response without going too stiff."
  }),
  stringEntry("Solinco Mach-10", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#7fc4f4",
    summary: "Modern Solinco co-poly designed to blend speed, spin, and a slightly more energetic feel.",
    note: "Good for players who want a cleaner launch than heavily shaped polys."
  }),
  stringEntry("Solinco X-Natural", {
    brand: "Solinco", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "Very High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Very High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f0dfc3",
    summary: "Comfort-focused Solinco multi with easy depth and a soft, forgiving response.",
    note: "A strong option for players who want maximum comfort without moving to natural gut."
  }),
  stringEntry("Wilson Sensation Control", {
    brand: "Wilson", type: "Multifilament", stringShape: "Textured", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "16", playerLevel: "Intermediate", gameStyle: "Counterpuncher",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#eadcc1",
    summary: "Control-oriented Sensation variant for players who want softer feel with more restraint.",
    note: "Useful when a standard power multi launches a little too high."
  }),
  stringEntry("Wilson Optimus", {
    brand: "Wilson", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "Very High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Very High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f2e2c9",
    summary: "High-end Wilson multi aimed at comfort, touch, and easier offensive depth.",
    note: "A premium pick for players prioritizing arm safety and feel."
  }),
  stringEntry("Head Lynx Touch", {
    brand: "Head", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Head Speed", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#d4bf90",
    summary: "Softer-feeling Lynx family poly with easier pace and a cleaner touch response.",
    note: "A nice middle ground for players not wanting the firmest Head polys."
  }),
  stringEntry("Head Hawk Black", {
    brand: "Head", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Head Radical", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Premium", imageTone: "#2f3136",
    summary: "Control-first Hawk variant with a firm, deadened response and strong predictability.",
    note: "Best for advanced players who want to rein in a lively frame."
  }),
  stringEntry("Yonex Poly Tour Spin", {
    brand: "Yonex", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Yonex VCORE", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#e56f4f",
    summary: "Spin-oriented Yonex poly with extra bite and lively modern snapback.",
    note: "A strong fit for VCORE users who want easy RPM production."
  }),
  stringEntry("Yonex Rexis", {
    brand: "Yonex", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "Very High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Yonex Ezone", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Very High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f1e2c6",
    summary: "Premium Yonex multifilament with strong comfort, feel, and easy access to pace.",
    note: "A dependable non-poly option for players wanting a softer string bed."
  }),
  stringEntry("Kirschbaum Pro Line X", {
    brand: "Kirschbaum", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#c75f5f",
    summary: "Sharper Kirschbaum poly built for bite, firmness, and controlled acceleration.",
    note: "Good for aggressive players wanting a crisper German co-poly feel."
  }),
  stringEntry("Volkl V-Cell", {
    brand: "Volkl", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#efe2ca",
    summary: "Value-friendly Volkl all-around string with a crisp but approachable response.",
    note: "Useful for recreational players who want easy restrings without much fuss."
  }),
  stringEntry("Prince Tour XC", {
    brand: "Prince", type: "Co-Poly", stringShape: "Textured", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#7eb8ee",
    summary: "Prince co-poly with textured grip on the ball and a lower-powered launch.",
    note: "A solid fit for players who want extra bite without going too lively."
  }),
  stringEntry("Gosen G-Tour 3", {
    brand: "Gosen", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#7fbdf1",
    summary: "Modern Gosen co-poly with a smooth response and a balanced control-to-power ratio.",
    note: "Good for players who want a round poly that stays lively enough to attack with."
  }),
  stringEntry("Toroline Super Toro", {
    brand: "Toroline", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Premium", imageTone: "#79d262",
    summary: "Boutique Toroline spin string with extra bite, lively response, and heavy action.",
    note: "Great for players who want more jump without sacrificing too much pace."
  }),
  stringEntry("Dunlop Black Widow", {
    brand: "Dunlop", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Budget", imageTone: "#2f3136",
    summary: "Classic spin-focused Dunlop poly built to help players roll the ball with confidence.",
    note: "Best for topspin hitters who like shaped strings and lower power."
  }),
  stringEntry("Gamma Jet", {
    brand: "Gamma", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#74baf1",
    summary: "Faster-feeling Gamma poly with good pocketing and a more energetic rebound.",
    note: "A nice option for players wanting modern response without extreme stiffness."
  }),
  stringEntry("Diadem Elite XT", {
    brand: "Diadem", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f0e1c7",
    summary: "Comfort-friendly Diadem multi with a little extra structure and cleaner feel than entry-level multis.",
    note: "Useful for players who want soft performance without too much trampoline."
  }),
  stringEntry("Mayami Hit Pro", {
    brand: "Mayami", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#77bdf2",
    summary: "Boutique round poly with clean contact, solid control, and enough pace to finish points.",
    note: "A balanced pick for big hitters who do not want an overly dead bed."
  }),
  stringEntry("Weiss Cannon Scorpion", {
    brand: "Weiss Cannon", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#b8c1ca",
    summary: "Control-focused Weiss Cannon poly with a cleaner response than many dead-feeling polys.",
    note: "Nice for players who want precision while keeping some pocketing."
  }),
  stringEntry("MSV Co Focus", {
    brand: "MSV", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#c0c7cf",
    summary: "Value co-poly with classic control and a predictable, no-nonsense response.",
    note: "A good option for players who prioritize direction and durability over free pace."
  }),
  stringEntry("Genesis Typhoon", {
    brand: "Genesis", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Budget", imageTone: "#81d35e",
    summary: "Spin-heavy Genesis poly with sharp bite and lower-powered confidence.",
    note: "Useful for players who want maximum rotation from a budget-friendly string."
  }),
  stringEntry("Signum Pro Poly Plasma", {
    brand: "Signum Pro", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "Very High",
    comfort: "Low", feel: "Muted", gauge: "16", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#d6c15b",
    summary: "Classic Signum Pro control poly known for stability, tension hold, and durability.",
    note: "A dependable option for players who want a firm, traditional polyester response."
  }),
  stringEntry("Babolat RPM Hurricane", {
    brand: "Babolat", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Babolat Pure Aero", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#e2cf5b",
    summary: "Firm Babolat control poly for players who want a traditional, lower-powered response.",
    note: "A nice fit for heavy swingers wanting predictable ball flight."
  }),
  stringEntry("Babolat RPM Dual", {
    brand: "Babolat", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Premium", imageTone: "#c9ef67",
    summary: "Spin-heavy Babolat poly with a more energetic response than the firmest RPM options.",
    note: "Useful for players who want a livelier shaped-poly feel."
  }),
  stringEntry("Luxilon Eco Rough", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Textured", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "16L", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#8fd645",
    summary: "Sustainability-minded Luxilon poly that keeps the brand's control DNA with extra texture.",
    note: "A strong pick for players who want control and a lower-powered launch."
  }),
  stringEntry("Solinco Hyper-G Soft", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16L", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#8fd645",
    summary: "Softer Hyper-G variant that keeps spin and control while easing impact firmness.",
    note: "Ideal for players who like shaped polys but want a gentler ride."
  }),
  stringEntry("Tecnifibre Razor Code Soft", {
    brand: "Tecnifibre", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Premium", imageTone: "#e8d2ff",
    summary: "Friendlier Tecnifibre control poly with easier comfort and a more forgiving feel.",
    note: "A solid bridge for players stepping down from firmer tour strings."
  }),
  stringEntry("Tecnifibre Multifeel Black", {
    brand: "Tecnifibre", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Budget", imageTone: "#2f3136",
    summary: "Softer Tecnifibre multi with easy power and a darker cosmetic option.",
    note: "Good for players prioritizing comfort over durability."
  }),
  stringEntry("Wilson Reaction", {
    brand: "Wilson", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#efe0c8",
    summary: "Comfort-driven Wilson multi built for easy depth and a softer impact feel.",
    note: "Nice for recreational players or anyone looking for an arm-friendly setup."
  }),
  stringEntry("Wilson Hollow Core Pro", {
    brand: "Wilson", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#f2e4cc",
    summary: "Classic hollow-core synthetic with a comfortable, balanced response.",
    note: "A practical option for players wanting value and easy restringing."
  }),
  stringEntry("Head Hawk Silver", {
    brand: "Head", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Head Radical", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Premium", imageTone: "#b8c1ca",
    summary: "Another Hawk-family control option with a clean, lower-powered launch and firm response.",
    note: "Best for players who want tight directional precision."
  }),
  stringEntry("Head Velocity Power", {
    brand: "Head", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Budget", imageTone: "#dfe9c6",
    summary: "Livelier companion to Velocity MLT with easier depth and softer feedback.",
    note: "A nice value pick for comfort-first club players."
  }),
  stringEntry("Yonex Poly Tour Tough", {
    brand: "Yonex", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "Very High",
    comfort: "Low", feel: "Muted", gauge: "16", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Yonex VCORE", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#7aaef0",
    summary: "Durability-oriented Yonex poly designed for string breakers and control-first hitters.",
    note: "Useful when you want longevity without giving up predictability."
  }),
  stringEntry("Yonex Poly Tour Spin G", {
    brand: "Yonex", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Yonex VCORE", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Premium", imageTone: "#8fda5b",
    summary: "Sharply spin-focused Yonex poly for players who want extra grip and heavier action.",
    note: "A strong fit for big topspin mechanics and modern baseline play."
  }),
  stringEntry("Kirschbaum Touch Multifiber", {
    brand: "Kirschbaum", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f0dfc8",
    summary: "Comfortable Kirschbaum multi with a cleaner feel than many softer strings.",
    note: "Good for players who want touch and control without harsh impact."
  }),
  stringEntry("Volkl Cyclone Soft", {
    brand: "Volkl", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Clay", priceTier: "Mid-Range", imageTone: "#c58aff",
    summary: "Softer Cyclone variant that keeps spin alive while making the bed more comfortable.",
    note: "Great for players who like Volkl spin strings but want less stiffness."
  }),
  stringEntry("Prince Premier LT", {
    brand: "Prince", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "17", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f2e4c6",
    summary: "Very soft Prince multi with easy power and a forgiving sweet spot response.",
    note: "A nice comfort-first choice for recreational players."
  }),
  stringEntry("Gosen AK Pro 17", {
    brand: "Gosen", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#eadcc1",
    summary: "Thinner AK Pro variant with enhanced feel and a little more touch-oriented response.",
    note: "A nice fit for players who want comfort without excessive power."
  }),
  stringEntry("Toroline Snapper", {
    brand: "Toroline", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#77bdf2",
    summary: "Boutique round poly with a lively response and reliable snapback.",
    note: "Useful for players wanting a modern poly feel without a sharp shape."
  }),
  stringEntry("Dunlop Iconic All", {
    brand: "Dunlop", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#efe1c8",
    summary: "Balanced Dunlop multi offering comfort, touch, and decent structure for the category.",
    note: "A versatile option for club players seeking softer performance."
  }),
  stringEntry("Gamma Moto Soft", {
    brand: "Gamma", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Clay", priceTier: "Mid-Range", imageTone: "#74c367",
    summary: "Friendlier Moto variant that keeps spin alive while softening impact.",
    note: "A nice bridge for topspin players who need more comfort."
  }),
  stringEntry("Diadem Nova", {
    brand: "Diadem", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f0e1c9",
    summary: "Comfort-driven Diadem string built for easy depth and softer impact.",
    note: "Good for players wanting forgiveness and liveliness."
  }),
  stringEntry("Mayami Hepta Power", {
    brand: "Mayami", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#79d35f",
    summary: "Seven-sided boutique poly built for heavy spin and an energetic modern response.",
    note: "A good pick for aggressive players who want extra shape on the ball."
  }),
  stringEntry("Weiss Cannon Super Cable Pro", {
    brand: "Weiss Cannon", type: "Co-Poly", stringShape: "Textured", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#d7cf57",
    summary: "Aggressive Weiss Cannon spin string with extra grip and a lower-powered trajectory.",
    note: "Best for topspin hitters who want maximum bite."
  }),
  stringEntry("MSV Hepta Twist", {
    brand: "MSV", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Budget", imageTone: "#cfd25d",
    summary: "Classic budget spin poly with a twisted shape and strong bite on the ball.",
    note: "A solid choice for players who want heavy rotation at a lower price."
  }),
  stringEntry("Genesis Twisted Razor", {
    brand: "Genesis", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Budget", imageTone: "#82d45f",
    summary: "Spin-oriented Genesis poly with a shaped profile and controlled, lower-powered response.",
    note: "A good fit for players who want extra bite and a budget-friendly polyester."
  }),
  stringEntry("Babolat Xalt", {
    brand: "Babolat", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Babolat Pure Drive", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f7e2be",
    summary: "Modern comfort-oriented multi aimed at easy power and arm-friendly response.",
    note: "Useful for players who want a softer alternative to firmer Babolat setups."
  }),
  stringEntry("Babolat Pro Last", {
    brand: "Babolat", type: "Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "Very High",
    comfort: "Low", feel: "Crisp", gauge: "15L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Babolat Pure Aero", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Premium", imageTone: "#d8c66a",
    summary: "Extra-durable Babolat tour poly built for long life and a dead, controlled launch.",
    note: "Best for string breakers who want maximum longevity and a firmer response."
  }),
  stringEntry("Luxilon Monotec Supersense", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#8fd2aa",
    summary: "Smoother Luxilon poly with a little more ball pocketing and feel than the brand's deadest strings.",
    note: "Useful for advanced players who want control without a completely muted response."
  }),
  stringEntry("Babolat RPM Rough", {
    brand: "Babolat", type: "Poly", stringShape: "Textured", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Babolat Pure Aero", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Premium", imageTone: "#d6cd65",
    summary: "Textured RPM variant built for extra grab and heavier ball rotation.",
    note: "A natural fit for spin-first baseline games."
  }),
  stringEntry("Luxilon Big Banger Ace", {
    brand: "Luxilon", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "18", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Premium", imageTone: "#9ad778",
    summary: "Thin-gauge Luxilon poly that offers easier access to spin and livelier snapback.",
    note: "Great for players who want a tour poly feel with extra bite from a thinner gauge."
  }),
  stringEntry("Solinco Barb Wire", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Mid-Range", imageTone: "#7ecf60",
    summary: "Firm, aggressively shaped Solinco poly built to maximize bite and directional control.",
    note: "Best for committed topspin hitters who like a deader, more locked-in bed."
  }),
  stringEntry("Tecnifibre HDMX Tour", {
    brand: "Tecnifibre", type: "Hybrid-Style Multi", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#efd4bd",
    summary: "Complex Tecnifibre construction blending multi comfort with a little more control and durability.",
    note: "A nice step up for players who want premium comfort without a trampoline feel."
  }),
  stringEntry("Solinco Tour Bite Diamond Rough", {
    brand: "Solinco", type: "Co-Poly", stringShape: "Textured", spin: "Very High", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Clay", priceTier: "Premium", imageTone: "#86d067",
    summary: "Extra-grippy Tour Bite variant built for maximum spin and firm directional trust.",
    note: "Ideal for high-rpm hitters who like a shaped, aggressive bed."
  }),
  stringEntry("Tecnifibre XR3", {
    brand: "Tecnifibre", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Lively", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f1d2c4",
    summary: "Elastic premium Tecnifibre multi with easy depth, strong comfort, and a lively launch.",
    note: "Works well for players who want multi power with a slightly cleaner response than the softest options."
  }),
  stringEntry("Wilson Syn Gut Power", {
    brand: "Wilson", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#e8dbc3",
    summary: "Straightforward Wilson synthetic gut with balanced pop, crisp feel, and solid value.",
    note: "A dependable option for recreational players or backup stringing."
  }),
  stringEntry("Wilson Sensation Plus", {
    brand: "Wilson", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Wilson Clash", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f3d9c1",
    summary: "More durable take on Wilson Sensation with soft feel and easy depth.",
    note: "Nice for players wanting comfort without moving into a premium price tier."
  }),
  stringEntry("Wilson Super Tour", {
    brand: "Wilson", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Wilson Blade", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#ead8c7",
    summary: "Classic Wilson value string with a familiar crisp synthetic gut response.",
    note: "Useful as a budget-friendly all-around setup for casual players."
  }),
  stringEntry("Head Intellitour", {
    brand: "Head", type: "Hybrid", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Head Radical", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#d7d3bc",
    summary: "Pre-packaged Head hybrid that leans into comfort, touch, and a lower-powered response.",
    note: "Good for players who want a softer, more controlled bed without building their own hybrid."
  }),
  stringEntry("Yonex Poly Tour Air", {
    brand: "Yonex", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "16L", playerLevel: "Intermediate", gameStyle: "Counterpuncher",
    tensionBand: "Low 50s", racketFamily: "Yonex Ezone", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#8dd7ef",
    summary: "Comfort-first Yonex poly aimed at softer impact and easier playability.",
    note: "A good bridge string for players easing into polyester."
  }),
  stringEntry("Head Master", {
    brand: "Head", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#e7ddc7",
    summary: "Affordable Head synthetic gut with a traditional feel and balanced response.",
    note: "A sensible entry-level string for general recreational use."
  }),
  stringEntry("Prince Lightning XX", {
    brand: "Prince", type: "Synthetic Gut", stringShape: "Textured", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Lively", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#efe0c5",
    summary: "Lively Prince synthetic gut with extra sparkle and a slightly textured outer wrap.",
    note: "Good for players wanting an inexpensive string with easy depth."
  }),
  stringEntry("Kirschbaum Max Power Rough", {
    brand: "Kirschbaum", type: "Co-Poly", stringShape: "Textured", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#e56a62",
    summary: "Textured Max Power variant with a firmer response and extra bite.",
    note: "Works for flatter hitters who still want some added grip."
  }),
  stringEntry("Prince Topspin Plus", {
    brand: "Prince", type: "Synthetic Gut", stringShape: "Textured", spin: "Medium", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Budget", imageTone: "#e6e0b8",
    summary: "Budget Prince option with a textured wrap aimed at adding a little more grip on the ball.",
    note: "Useful for recreational players who want a spin-leaning synthetic gut."
  }),
  stringEntry("Prince Premier Power", {
    brand: "Prince", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#f1e2c7",
    summary: "Power-focused Prince multi designed for easier depth and a smooth response.",
    note: "Great when you want a softer string bed with help on pace."
  }),
  stringEntry("Gamma Ocho TNT", {
    brand: "Gamma", type: "Synthetic Gut", stringShape: "Shaped", spin: "Medium", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#8fd8ef",
    summary: "Gamma TNT-family string with an octagonal profile for a little more spin and bite.",
    note: "A nice middle ground for players who want texture without going full poly."
  }),
  stringEntry("Diadem Impulse", {
    brand: "Diadem", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#bfe0f7",
    summary: "Soft Diadem multi built for comfort, clean pocketing, and easy depth.",
    note: "Helpful for players prioritizing arm relief and a forgiving response."
  }),
  stringEntry("Kirschbaum Synthetic Gut", {
    brand: "Kirschbaum", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#e7cfc0",
    summary: "Value-oriented Kirschbaum synthetic gut with predictable launch and traditional feel.",
    note: "Good as a low-cost all-around option or backup restring."
  }),
  stringEntry("Restring Vivo", {
    brand: "Restring", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#8abff0",
    summary: "Modern boutique poly with a livelier response and easy snapback for aggressive hitters.",
    note: "A good option when you want more pop than the deadest control polys."
  }),
  stringEntry("Diadem Pro X", {
    brand: "Diadem", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#88c6f1",
    summary: "Controlled Diadem poly with balanced pop, spin, and directional trust.",
    note: "A versatile modern poly for players who want a little of everything."
  }),
  stringEntry("Volkl V-Pro", {
    brand: "Volkl", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#8bb7f0",
    summary: "Control-led Volkl poly with a stable, lower-powered response and dependable flight.",
    note: "Useful for players who prefer precision and predictable trajectory over free pace."
  }),
  stringEntry("Babolat Xcel", {
    brand: "Babolat", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Plush", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Babolat Pure Drive", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f3dec8",
    summary: "Premium Babolat multifilament with easy depth, plush comfort, and a more polished feel than entry-level multis.",
    note: "A strong option for players who want comfort and power without moving into natural gut."
  }),
  stringEntry("ISOSPEED Cream", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "17", playerLevel: "Intermediate", gameStyle: "Counterpuncher",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#e8ddbf",
    summary: "Comfort-first co-poly that gives big swings a controlled, arm-friendlier response.",
    note: "Useful for players easing into polyester or wanting a softer full bed."
  }),
  stringEntry("ISOSPEED Control Classic", {
    brand: "IsoSpeed", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#e7d9bf",
    summary: "Ultra-soft classic multifilament built around comfort, muted feel, and stable tension maintenance.",
    note: "Best for players who want arm relief and a very gentle stringbed."
  }),
  stringEntry("ISOSPEED Professional Classic", {
    brand: "IsoSpeed", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Plush", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#ead6c4",
    summary: "Soft ribbon-based multi with lively pocketing and standout comfort for a non-gut setup.",
    note: "Great for players chasing easy depth and a premium-feeling response on a friendlier budget."
  }),
  stringEntry("Tourna Big Hitter Silver 7 Tour", {
    brand: "Tourna", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#c8d0d6",
    summary: "Firm seven-sided Tourna poly aimed at maximum control, spin, and strong tension maintenance.",
    note: "A good fit for experienced poly users who want a crisp, lower-powered bed."
  }),
  stringEntry("Tourna Big Hitter Black 7", {
    brand: "Tourna", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#3d434b",
    summary: "Softer seven-sided Tourna poly with big spin and more pop than the brand's firmest control strings.",
    note: "Useful for players who want shaped-poly bite without a harsh response."
  }),
  stringEntry("Tourna Quasi Gut Armor", {
    brand: "Tourna", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#ead9c5",
    summary: "Arm-friendly Tourna multi with added ribbons for better control and durability than a typical soft multi.",
    note: "A nice bridge option for players who want comfort but do not want the stringbed to get too lively."
  }),
  stringEntry("Ashaway MonoGut ZX", {
    brand: "Ashaway", type: "Synthetic Gut", stringShape: "Round", spin: "Medium", power: "High", control: "Medium", durability: "High",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#e2d5b3",
    summary: "Unique Zyex monofilament that blends big power and comfort with unusually good durability for a soft string.",
    note: "Helpful for players who want monofilament longevity without the harshness of polyester."
  }),
  stringEntry("Ashaway MonoGut ZX Pro", {
    brand: "Ashaway", type: "Synthetic Gut", stringShape: "Round", spin: "Medium", power: "Medium", control: "High", durability: "High",
    comfort: "High", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#c4b79f",
    summary: "Thinner, more control-oriented version of MonoGut ZX with impressive comfort and surprising spin.",
    note: "Good for players who want a softer monofilament feel but still value precision."
  }),
  stringEntry("Ashaway Dynamite Soft", {
    brand: "Ashaway", type: "Multifilament", stringShape: "Textured", spin: "Medium", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "18", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#efe0cf",
    summary: "Very soft Zyex multifilament with easy pocketing, high comfort, and a livelier launch.",
    note: "Best for players prioritizing comfort and touch over maximum string life."
  }),
  stringEntry("Ashaway Dynamite Natural", {
    brand: "Ashaway", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#eddcc8",
    summary: "Comfortable Ashaway multi with easy power and better tension maintenance than many soft nylon options.",
    note: "A solid fit for players who want a softer, more forgiving everyday restring."
  }),
  stringEntry("Ashaway Crossfire ZX Tour", {
    brand: "Ashaway", type: "Hybrid", stringShape: "Hybrid Mix", spin: "Medium", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#d2c59f",
    summary: "Kevlar and Zyex hybrid built for very high control, strong durability, and better comfort than classic Kevlar setups.",
    note: "Most useful for advanced players who want a long-lasting hybrid with a dead, predictable launch."
  }),
  stringEntry("Grapplesnake Tour Sniper", {
    brand: "Grapplesnake", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: ["Federico Agustin Gomez"], wtaPlayers: [],
    proRackets: [
      { player: "Federico Agustin Gomez", racket: "Head Prestige pro stock / TK293 mold" }
    ],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#9aa2a8",
    summary: "Firm five-sided co-poly that leans hard into control, spin-loaded trajectory, and clean targeting.",
    note: "A smart option for big hitters who want a firmer response than softer boutique polys."
  }),
  stringEntry("Grapplesnake Alpha", {
    brand: "Grapplesnake", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#9bc48d",
    summary: "Softer Grapplesnake poly designed to give players a more accessible blend of spin, pocketing, and comfort.",
    note: "A good first full-bed poly for players wanting modern spin without an overly harsh feel."
  }),
  stringEntry("Grapplesnake Tour M8", {
    brand: "Grapplesnake", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: ["Daniel Gimeno Traver", "Julian Cash"], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#8eb06d",
    summary: "Eight-sided boutique co-poly with heavy spin, strong control, and a more balanced feel than many firm tour strings.",
    note: "Useful for advanced players who want spin and touch without going to the deadest control polys."
  }),
  stringEntry("Klip Legend Natural Gut", {
    brand: "Klip", type: "Natural Gut", stringShape: "Round", spin: "Medium", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Advanced", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f2dec2",
    summary: "Classic Australian natural gut with premium power, touch, comfort, and tension maintenance.",
    note: "A strong luxury option for full beds or gut/poly hybrid mains."
  }),
  stringEntry("Klip X-Plosive", {
    brand: "Klip", type: "Hybrid", stringShape: "Hybrid Mix", spin: "Medium", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Advanced", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#ddd0b8",
    summary: "Natural gut and co-poly hybrid built to blend gut comfort and power with more control and longevity.",
    note: "Appeals to players who want a premium hybrid without building one from separate sets."
  }),
  stringEntry("Topspin Cyber Flash", {
    brand: "Topspin", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#b9c1c7",
    summary: "Control-oriented co-poly with solid durability and better touch than many old-school firm polys.",
    note: "A dependable pick for big hitters who want a round poly with a slightly more playable feel."
  }),
  stringEntry("YTex Quadro Twist", {
    brand: "YTex", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#7ac66b",
    summary: "Shaped YTex co-poly built for heavy rotation, lively snapback, and a modern attacking response.",
    note: "Good for topspin players who want extra bite without dropping too low on power."
  }),
  stringEntry("Forten Synthetic Gut Sweet", {
    brand: "Forten", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#e7d1a9",
    summary: "Value synthetic gut with a lively response, solid tension maintenance, and easy all-around playability.",
    note: "A simple budget-friendly choice for casual players or inexpensive hybrid crosses."
  }),
  stringEntry("Forten Nylon", {
    brand: "Forten", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#eadcc4",
    summary: "Basic nylon string that keeps cost low while delivering a predictable all-around response.",
    note: "Useful for home stringers, budget restrings, or hybrid parts."
  }),
  stringEntry("IsoSpeed AXON Multi", {
    brand: "IsoSpeed", type: "Hybrid-Style Multi", stringShape: "Round", spin: "Medium", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16L", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#edd8bf",
    summary: "Elastic hybrid-style multi built to give multi users more spin, control, and tension stability.",
    note: "A strong bridge string for players moving away from poly but still wanting structure and bite."
  }),
  stringEntry("IsoSpeed Control", {
    brand: "IsoSpeed", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Muted", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#ead8c7",
    summary: "Gut-inspired multifilament with soft feel, easy depth, and a little more control than the Classic version.",
    note: "Good for players chasing comfort and touch without an overly lively launch."
  }),
  stringEntry("IsoSpeed Professional", {
    brand: "IsoSpeed", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Plush", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#efddca",
    summary: "Power Ribbon multi designed to mimic natural-gut comfort, power, and tension maintenance.",
    note: "Helpful for players with arm sensitivity who still want a premium-feeling response."
  }),
  stringEntry("IsoSpeed Black Fire", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#4a4d57",
    summary: "Firm value co-poly with a low-powered response, strong control, and better comfort than many cheap polys.",
    note: "A smart pick for big hitters who want precision without a premium price tag."
  }),
  stringEntry("IsoSpeed Grey Fire", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#aeb4bd",
    summary: "Snapback-focused co-poly with surgical control and a little more pocketing than older-school firm polys.",
    note: "Useful for players who want a cleaner, more spin-friendly take on a control poly."
  }),
  stringEntry("IsoSpeed Pyramid", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Clay", priceTier: "Budget", imageTone: "#d9c676",
    summary: "Arm-friendly shaped co-poly that adds sharp bite and easier spin without the harshness of firmer tour strings.",
    note: "A nice option for players who want shaped-poly RPMs with more comfort."
  }),
  stringEntry("IsoSpeed Touch Poly V18", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Round", spin: "Very High", power: "Medium", control: "High", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "18", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#f1d55f",
    summary: "Ultra-thin co-poly with strong ball bite, lively touch, and more comfort than most ultra-thin polys.",
    note: "Best for advanced players who want extra spin and feel from a thinner gauge."
  }),
  stringEntry("Tourna Grit", {
    brand: "Tourna", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#c8ccd1",
    summary: "Modern Tourna co-poly with above-average comfort, solid control, and long-lasting playability for the category.",
    note: "A good fit for players who want a controlled poly that does not go dead too quickly."
  }),
  stringEntry("Tourna Big Hitter Blue Rough", {
    brand: "Tourna", type: "Co-Poly", stringShape: "Textured", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#5a8fce",
    summary: "Twisted pentagonal co-poly built for big bite, easy spin, and a comfortably firm response.",
    note: "Works well for baseline players who want RPMs and enough pop to drive the ball through the court."
  }),
  stringEntry("Tourna Quasi Gut", {
    brand: "Tourna", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#eedfcf",
    summary: "Soft PU-infused multi made to mimic natural-gut comfort and easy depth at a lower price.",
    note: "A good comfort-first option for doubles players or anyone wanting a forgiving stringbed."
  }),
  stringEntry("Tourna Synthetic Gut Armor", {
    brand: "Tourna", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#d8d0c8",
    summary: "Durability-boosted synthetic gut that stays crisp while offering better mileage than a basic nylon setup.",
    note: "Handy for budget players and as a hybrid cross for firmer mains."
  }),
  stringEntry("Ashaway Liberty Synthetic Gut", {
    brand: "Ashaway", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Crisp", gauge: "16", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#e6d4bb",
    summary: "Value tournament nylon with honest all-around playability and excellent price-to-performance.",
    note: "A solid low-cost restring for newer players or high-volume stringers."
  }),
  stringEntry("Ashaway Synthetic Gut", {
    brand: "Ashaway", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "Medium", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Beginner", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#e7d9c8",
    summary: "Responsive entry-level synthetic gut with a clean feel and a little more touch than bargain-basement nylon.",
    note: "Useful as a simple full bed or as an inexpensive hybrid cross."
  }),
  stringEntry("Ashaway Crossfire ZX", {
    brand: "Ashaway", type: "Hybrid", stringShape: "Hybrid Mix", spin: "High", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#d6c8a8",
    summary: "Kevlar and Zyex hybrid that delivers standout control and spin with surprisingly good comfort for the breed.",
    note: "Best suited to experienced players who want a durable, low-powered hybrid with a more forgiving feel than classic Kevlar."
  }),
  stringEntry("Signum Pro X-Perience", {
    brand: "Signum Pro", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#77b85b",
    summary: "Shaped Signum Pro co-poly with impressive control, strong spin, and above-average comfort for a firm poly.",
    note: "A good option for big hitters who want predictable ball flight without a completely dead feel."
  }),
  stringEntry("Signum Pro Tornado", {
    brand: "Signum Pro", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#2d2f31",
    summary: "Twisted heptagonal co-poly built for heavy bite, strong spin creation, and controlled power.",
    note: "Useful for topspin players who want a lively shaped poly with strong durability."
  }),
  stringEntry("Topspin Cyber Blue", {
    brand: "Topspin", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#8db4e8",
    summary: "Control-oriented poly with a softer, more dampened feel and better tension maintenance than Cyber Flash.",
    note: "Nice for players who like round polys but want a touch more comfort and playability."
  }),
  stringEntry("Forten Kevlar Thin Blend", {
    brand: "Forten", type: "Hybrid", stringShape: "Hybrid Mix", spin: "Medium", power: "Low", control: "Very High", durability: "Very High",
    comfort: "Low", feel: "Crisp", gauge: "18", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "All Surfaces", priceTier: "Budget", imageTone: "#c8a57a",
    summary: "Thin Kevlar hybrid that blends exceptional durability and control with better playability than many harsh Kevlar setups.",
    note: "Best for string breakers and advanced players who prioritize longevity and directional trust."
  }),
  stringEntry("Gamma TNT2", {
    brand: "Gamma", type: "Synthetic Gut", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#ead8bf",
    summary: "Lively TNT-processed synthetic string with easy power, clean feel, and better playability than a basic nylon.",
    note: "A good all-around option for players who want more pop and feel than standard synthetic gut."
  }),
  stringEntry("Wilson NXT Power", {
    brand: "Wilson", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Low",
    comfort: "High", feel: "Plush", gauge: "17", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Wilson Clash", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#f0ddcf",
    summary: "Extra-soft Wilson multi with standout comfort, touch, and easy power for players who want a premium cushioned response.",
    note: "Especially appealing in stiff frames or for players prioritizing arm-friendliness."
  }),
  stringEntry("IsoSpeed Baseline Spin", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Intermediate", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Budget", imageTone: "#d9d16f",
    summary: "Value co-poly designed to give topspin players easier bite, lively snapback, and solid control for the price.",
    note: "A smart budget poly for players who want spin without jumping to a harsher premium setup."
  }),
  stringEntry("IsoSpeed Baseline Control", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#d8d8d1",
    summary: "Control-first budget co-poly with a firm, predictable response and enough durability for heavier hitters.",
    note: "Best for players who value direction and consistency over free power."
  }),
  stringEntry("IsoSpeed Baseline Speed", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Medium", control: "Medium", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "All Surfaces", priceTier: "Budget", imageTone: "#e4cf88",
    summary: "Faster, livelier Baseline option built for easier depth and a more forgiving polyester response.",
    note: "A useful entry point for players who want poly durability but still need some help from the stringbed."
  }),
  stringEntry("IsoSpeed Baseline Long Life", {
    brand: "IsoSpeed", type: "Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "Very High",
    comfort: "Low", feel: "Crisp", gauge: "15L", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#cab98a",
    summary: "Longevity-focused polyester monofilament built for string breakers who want maximum life and a dead, controlled launch.",
    note: "Most useful for players who routinely shear through softer strings."
  }),
  stringEntry("IsoSpeed Rexxxer", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#cfa65b",
    summary: "Aggressively shaped IsoSpeed co-poly with heavy spin creation, lively snapback, and stronger touch than the stiffest tour polys.",
    note: "A natural fit for modern baseline games that lean on height and RPMs."
  }),
  stringEntry("IsoSpeed Black Fire S", {
    brand: "IsoSpeed", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Low", control: "Very High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#4d4d4d",
    summary: "Spin-loaded control poly with a firmer feel, lower launch, and stronger directional accuracy than the softer IsoSpeed offerings.",
    note: "Best for experienced players who like to attack with full swings and tight targets."
  }),
  stringEntry("Tourna Big Hitter Silver", {
    brand: "Tourna", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "Silver",
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#bfc4ca",
    summary: "Classic budget co-poly with a lively but controlled response, dependable spin, and excellent value for high-volume hitters.",
    note: "One of the more approachable low-cost polys for players who want a familiar modern feel."
  }),
  stringEntry("Tourna Black Zone", {
    brand: "Tourna", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Low", control: "Very High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "Black",
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#43484f",
    summary: "Lower-powered Tourna poly made for flatter hitters and redirectors who want predictable depth and crisp control.",
    note: "A nice value option when you want a simpler round poly with a deader response."
  }),
  stringEntry("Tourna Premium Poly", {
    brand: "Tourna", type: "Poly", stringShape: "Round", spin: "High", power: "Low", control: "High", durability: "High",
    comfort: "Low", feel: "Crisp", gauge: "16", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "Hard Court", priceTier: "Budget", imageTone: "#d8d8d0",
    summary: "Straightforward polyester monofilament that gives chronic breakers affordable control, spin, and durability.",
    note: "Works as a no-frills full bed for players who prioritize value and longevity."
  }),
  stringEntry("Ashaway Dynamite Tough", {
    brand: "Ashaway", type: "Multifilament", stringShape: "Round", spin: "Low", power: "Medium", control: "High", durability: "High",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#ead9c8",
    summary: "Durability-oriented Zyex multi that keeps a softer feel while lasting longer than many comfort strings.",
    note: "A strong comfort option for players who routinely shred ordinary multis."
  }),
  stringEntry("Ashaway Crossfire+ Plus", {
    brand: "Ashaway", type: "Hybrid", stringShape: "Hybrid Mix", spin: "Medium", power: "Low", control: "Very High", durability: "Very High",
    comfort: "Low", feel: "Crisp", gauge: "16", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "All Surfaces", priceTier: "Budget", imageTone: "#d3c3a3",
    summary: "Kevlar hybrid built for serious durability and an extremely controlled response, with more power than the deadest aramid setups.",
    note: "Best suited to heavy hitters and string breakers who still want some liveliness."
  }),
  stringEntry("Ashaway Crossfire II", {
    brand: "Ashaway", type: "Hybrid", stringShape: "Hybrid Mix", spin: "Medium", power: "Low", control: "Very High", durability: "Very High",
    comfort: "Low", feel: "Crisp", gauge: "16", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "All Surfaces", priceTier: "Budget", imageTone: "#c9b695",
    summary: "Classic aramid hybrid with maximum durability, a firm impact feel, and locked-in directional control.",
    note: "A practical choice for advanced players who want their strings to last and launch low."
  }),
  stringEntry("Ashaway Crossfire", {
    brand: "Ashaway", type: "Hybrid", stringShape: "Hybrid Mix", spin: "Medium", power: "Low", control: "Very High", durability: "Very High",
    comfort: "Low", feel: "Crisp", gauge: "17", playerLevel: "Advanced", gameStyle: "Counterpuncher",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Low", surface: "All Surfaces", priceTier: "Budget", imageTone: "#c3af8b",
    summary: "Thin-gauge Kevlar hybrid with strong bite, a very controlled launch, and unusually long life for players who hit big.",
    note: "Useful for experienced players wanting maximum durability from a slightly livelier aramid blend."
  }),
  stringEntry("Signum Pro Yellow Jacket", {
    brand: "Signum Pro", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "Yellow",
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#e5d25f",
    summary: "Six-sided Signum Pro co-poly with standout spin, strong control, and better feel than many shaped tour strings.",
    note: "A nice middle ground for players who want Hyper-G style bite without an overly harsh response."
  }),
  stringEntry("Signum Pro Poly Plasma Pure", {
    brand: "Signum Pro", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "White",
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#f0efeb",
    summary: "Co-polyester monofilament that pairs strong control and spin with above-average comfort and tension hold for the category.",
    note: "Good for aggressive players who want a durable poly that does not feel completely dead."
  }),
  stringEntry("Signum Pro Poly Megaforce", {
    brand: "Signum Pro", type: "Co-Poly", stringShape: "Round", spin: "Medium", power: "Low", control: "High", durability: "High",
    comfort: "Medium", feel: "Muted", gauge: "17L", playerLevel: "Advanced", gameStyle: "Flat Hitter",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Budget", imageTone: "#cbd4db",
    summary: "Budget-minded co-poly with a firmer, more controlled response and excellent value for frequent restringers.",
    note: "A clean fit for players who want a reliable round poly without paying premium prices."
  }),
  stringEntry("Signum Pro Hyperion", {
    brand: "Signum Pro", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#cfa45d",
    summary: "Playability-first Signum co-poly with more pop and feel than the deadest control strings while keeping a stable flight.",
    note: "Useful for players who want a round poly that feels a touch livelier and more forgiving."
  }),
  stringEntry("Klip Legend Tour Natural Gut", {
    brand: "Klip", type: "Natural Gut", stringShape: "Round", spin: "Medium", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "Black",
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#3f3b3c",
    summary: "Highest-grade black natural gut with premium comfort, touch, power, and slightly more durability from its coated construction.",
    note: "A luxury option for players who want gut performance with a unique look and a smooth response."
  }),
  stringEntry("YTex Square-X", {
    brand: "YTex", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "High", feel: "Responsive", gauge: "16L", playerLevel: "Intermediate", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#2f2f31",
    summary: "Soft square-shaped co-poly with easy access to spin, strong feel, and unusually friendly comfort for a shaped polyester.",
    note: "A compelling option for players who want RPM Blast style bite with a softer response."
  }),
  stringEntry("YTex Hexagon-X", {
    brand: "YTex", type: "Co-Poly", stringShape: "Shaped", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#cf4d4d",
    summary: "Six-sided co-poly that blends spin, control, and durability with a more complete all-around response than many ultra-dead polys.",
    note: "A strong fit for players who want shape and bite without sacrificing too much feel."
  }),
  stringEntry("Topspin Cyber Twirl", {
    brand: "Topspin", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "Black",
    armFriendliness: "Medium", surface: "Clay", priceTier: "Mid-Range", imageTone: "#2d3036",
    summary: "Twisted pentagonal co-poly with heavy bite, lively ball speed, and better playability than many firm spin strings.",
    note: "A good fit for topspin players who want a shaped poly that feels more alive than a dead control setup."
  }),
  stringEntry("Grapplesnake Irukandji", {
    brand: "Grapplesnake", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "All-Court",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Premium", imageTone: "#8b9299",
    summary: "Comfort-focused polyester made to work as a soft cross string or a surprisingly playable full bed with easy snapback.",
    note: "Useful for players building hybrids and for poly users who want more pocketing and less harshness."
  }),
  stringEntry("Grapplesnake Paradox Pro", {
    brand: "Grapplesnake", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#6c8b57",
    summary: "Smooth boutique co-poly that aims for the rare middle ground of pop, precision, durability, and softer impact feel.",
    note: "A strong choice for players who like round polys but still want some grip and a more complete response."
  }),
  stringEntry("Grapplesnake Aspera Triplum", {
    brand: "Grapplesnake", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "High", durability: "High",
    comfort: "High", feel: "Responsive", gauge: "18", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Clay", priceTier: "Premium", imageTone: "#d7d63f",
    summary: "Square textured co-poly built for maximum rotation, sharp grab, and unusually soft feedback for a spin-first string.",
    note: "Best for players who want one of the grippiest shapes in the database without dropping into a harsh feel."
  }),
  stringEntry("Grapplesnake Tour Mako", {
    brand: "Grapplesnake", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "High", feel: "Responsive", gauge: "16L", playerLevel: "Advanced", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "High", surface: "Hard Court", priceTier: "Premium", imageTone: "#6ea6a1",
    summary: "Smooth poly with extra feel, reliable control, and a softer response than many boutique tour-oriented strings.",
    note: "A clean option for players who want a round poly that does not feel boardy or dead."
  }),
  stringEntry("Grapplesnake Soldier", {
    brand: "Grapplesnake", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "Medium", control: "Very High", durability: "Very High",
    comfort: "Medium", feel: "Crisp", gauge: "16L", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "Black",
    armFriendliness: "Medium", surface: "Hard Court", priceTier: "Premium", imageTone: "#26292d",
    summary: "Heptagonal control poly with excellent stability, long tension life, and a firmer response aimed at advanced hitters.",
    note: "Appeals to players who want shaped-poly bite with a more locked-in launch and above-average durability."
  }),
  stringEntry("Grapplesnake Game Changer", {
    brand: "Grapplesnake", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "High", control: "High", durability: "High",
    comfort: "Medium", feel: "Responsive", gauge: "17", playerLevel: "Advanced", gameStyle: "Heavy Topspin",
    tensionBand: "High 40s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    armFriendliness: "Medium", surface: "Clay", priceTier: "Premium", imageTone: "#8e8c89",
    summary: "Power-friendly square co-poly with strong bite, lively response, and enough comfort to feel more forgiving than many spin strings.",
    note: "Useful for topspin players who want a little more pop and feel than the stiffest square polys."
  }),
  stringEntry("YTex Pro-Feel", {
    brand: "YTex", type: "Co-Poly", stringShape: "Round", spin: "High", power: "Medium", control: "High", durability: "High",
    comfort: "High", feel: "Responsive", gauge: "16L", playerLevel: "Intermediate", gameStyle: "Aggressive Baseliner",
    tensionBand: "Low 50s", racketFamily: "Control Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "Natural",
    armFriendliness: "High", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#ead7bb",
    summary: "Soft co-poly that leans into pocketing, comfort, and controllable spin without feeling mushy or underpowered.",
    note: "A good bridge string for players moving from firm polys toward something easier on the arm."
  }),
  stringEntry("YTex Touch Natural", {
    brand: "YTex", type: "Multifilament", stringShape: "Round", spin: "Low", power: "High", control: "Medium", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "16", playerLevel: "Intermediate", gameStyle: "All-Court",
    tensionBand: "Mid 50s", racketFamily: "Power Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "Natural",
    armFriendliness: "High", surface: "All Surfaces", priceTier: "Mid-Range", imageTone: "#e8cfad",
    summary: "Soft nylon multifilament built for touch, easy power, and a more arm-friendly transition away from polyester.",
    note: "A nice fit for comfort-first players and anyone wanting a livelier multi that still feels connected."
  }),
  stringEntry("YTex Square-X Sharp", {
    brand: "YTex", type: "Co-Poly", stringShape: "Shaped", spin: "Very High", power: "High", control: "High", durability: "Medium",
    comfort: "High", feel: "Responsive", gauge: "18", playerLevel: "Intermediate", gameStyle: "Heavy Topspin",
    tensionBand: "Low 50s", racketFamily: "Spin Frame", atpPlayers: [], wtaPlayers: [],
    stringColor: "Green",
    armFriendliness: "High", surface: "Hard Court", priceTier: "Mid-Range", imageTone: "#98d448",
    summary: "Extra-thin square co-poly that delivers sharp spin, easy pace, and a softer ride than most spin-first polys.",
    note: "A strong choice for players who want arm-friendly spin and do not need maximum durability."
  })
];

window.TENNIS_STRING_DATA = STRINGS;

const strictFilterKeys = new Set(["brand", "type", "atpPlayer", "wtaPlayer", "stringColor", "gauge", "playerLevel", "gameStyle", "tensionBand", "racketFamily"]);

window.TENNIS_STRING_PLANNER_STRINGS = STRINGS;
window.TENNIS_STRING_PLANNER_PLAYER_OPTIONS = {
  atp: (FILTERS.find((filter) => filter.key === "atpPlayer")?.options || []).filter((option) => option !== "Any"),
  wta: (FILTERS.find((filter) => filter.key === "wtaPlayer")?.options || []).filter((option) => option !== "Any")
};

if (hasPlannerSurface) {
  updateLocalizedUiText();
  updateHomepageStaticTranslations();
  renderFilters();
  populateMobileQuickPlayerFilter();
  syncMobileQuickTypeFilter();
  initializeSetupWorkbench();
  syncClearSearchButton();
  renderResults();

  if (stringSearchInput) {
    stringSearchInput.addEventListener("input", (event) => {
      const wasSearching = Boolean(searchQuery);
      searchQuery = event.currentTarget.value.trim().toLowerCase();
      popularOnly = false;
      proOnly = false;
      if (searchQuery) {
        clearNonSearchFilters();
        if (!wasSearching) {
          toolsHiddenBeforeSearch = toolsHiddenForPrimaryModes;
          toolsHiddenForPrimaryModes = true;
          autoCollapsedToolsForSearch = true;
        }
      } else if (wasSearching && autoCollapsedToolsForSearch) {
        toolsHiddenForPrimaryModes = toolsHiddenBeforeSearch;
        autoCollapsedToolsForSearch = false;
      }
      syncClearSearchButton();
      syncPopularButton();
      syncProButton();
      renderResults();
    });
  }

  if (clearSearchButton && stringSearchInput) {
    clearSearchButton.addEventListener("click", () => {
      const wasSearching = Boolean(searchQuery);
      stringSearchInput.value = "";
      stringSearchInput.focus();
      searchQuery = "";
      if (wasSearching && autoCollapsedToolsForSearch) {
        toolsHiddenForPrimaryModes = toolsHiddenBeforeSearch;
        autoCollapsedToolsForSearch = false;
      }
      syncClearSearchButton();
      renderResults();
    });
  }

  if (popularStringsButton) {
    popularStringsButton.addEventListener("click", () => {
      const nextPopularOnly = !popularOnly;
      if (nextPopularOnly) {
        clearPrimaryMenuModeInputs();
      }
      popularOnly = nextPopularOnly;
      if (popularOnly) {
        proOnly = false;
      }
      toolsHiddenForPrimaryModes = popularOnly;
      syncPopularButton();
      syncProButton();
      renderResults();
    });
  }
  if (proPlayersButton) {
    proPlayersButton.addEventListener("click", () => {
      const nextProOnly = !proOnly;
      if (nextProOnly) {
        clearPrimaryMenuModeInputs();
      }
      proOnly = nextProOnly;
      if (proOnly) {
        popularOnly = false;
      }
      toolsHiddenForPrimaryModes = proOnly;
      syncProButton();
      syncPopularButton();
      renderResults();
    });
  }

  if (toolWorkbenchToggleButton) {
    toolWorkbenchToggleButton.addEventListener("click", () => {
      autoCollapsedToolsForSearch = false;
      toolsHiddenForPrimaryModes = !toolsHiddenForPrimaryModes;
      syncFocusedMode();
    });
  }

  if (toolWorkbenchHeaderToggleButton) {
    toolWorkbenchHeaderToggleButton.addEventListener("click", () => {
      autoCollapsedToolsForSearch = false;
      toolsHiddenForPrimaryModes = !toolsHiddenForPrimaryModes;
      syncFocusedMode();
    });
  }

  if (typeMenu) {
    typeMenu.querySelectorAll("[data-type]").forEach((button) => {
      button.addEventListener("click", () => {
        const selectedType = button.dataset.type || "Any";
        state.type = selectedType;
        const typeSelect = document.getElementById("filter-type");
        if (typeSelect) {
          typeSelect.value = selectedType;
        }
        syncTypeMenu();
        syncMobileQuickTypeFilter();
        renderResults();
      });
    });
    syncTypeMenu();
  }

  resetButton.addEventListener("click", () => {
    resetToMainChoices();
  });
}

if (hasSetupWorkbenchSurface && !hasPlannerSurface) {
  initializeSetupWorkbench();
  updateDatabaseCountLabels();
}

function initializeSliderPanelToggle() {
  if (!sliderPanelToggle || !sliderPanelBody) {
    return;
  }

  sliderPanelToggle.addEventListener("click", () => {
    const nextCollapsed = !sliderPanelBody.classList.contains("is-collapsed");
    sliderPanelBody.classList.toggle("is-collapsed", nextCollapsed);
    sliderPanelToggle.textContent = nextCollapsed ? getUiText("sliderShow", "Show Sliders") : getUiText("sliderHide", "Hide Sliders");
    sliderPanelToggle.setAttribute("aria-expanded", nextCollapsed ? "false" : "true");
  });
}

function initializePreferenceSliders() {
  [
    { input: sliderPower, output: sliderPowerValue, key: "power" },
    { input: sliderSpin, output: sliderSpinValue, key: "spin" },
    { input: sliderControl, output: sliderControlValue, key: "control" },
    { input: sliderProPlayers, output: sliderProPlayersValue, key: "proPlayers" }
  ].forEach((item) => {
    if (!item.input || !item.output) {
      return;
    }

    item.output.textContent = String(sliderPreferences[item.key]);
    item.input.value = String(sliderPreferences[item.key]);
    item.input.addEventListener("input", (event) => {
      const nextValue = Number(event.currentTarget.value || 5);
      sliderPreferences[item.key] = nextValue;
      item.output.textContent = String(nextValue);
      markSliderInteraction();
      scheduleSliderRender();
    });
    item.input.addEventListener("change", () => {
      markSliderInteraction();
      flushSliderRender();
    });
  });
}

function syncSliderControls() {
  if (sliderPower) sliderPower.value = String(sliderPreferences.power);
  if (sliderSpin) sliderSpin.value = String(sliderPreferences.spin);
  if (sliderControl) sliderControl.value = String(sliderPreferences.control);
  if (sliderProPlayers) sliderProPlayers.value = String(sliderPreferences.proPlayers);
  if (sliderPowerValue) sliderPowerValue.textContent = String(sliderPreferences.power);
  if (sliderSpinValue) sliderSpinValue.textContent = String(sliderPreferences.spin);
  if (sliderControlValue) sliderControlValue.textContent = String(sliderPreferences.control);
  if (sliderProPlayersValue) sliderProPlayersValue.textContent = String(sliderPreferences.proPlayers);
}

function scheduleSliderRender() {
  if (sliderRenderTimeout) {
    window.clearTimeout(sliderRenderTimeout);
  }

  sliderRenderTimeout = window.setTimeout(() => {
    sliderRenderTimeout = null;
    renderResults();
  }, 180);
}

function flushSliderRender() {
  if (sliderRenderTimeout) {
    window.clearTimeout(sliderRenderTimeout);
    sliderRenderTimeout = null;
  }
  renderResults();
}

function markSliderInteraction() {
  sliderInteractionActive = true;
  if (sliderInteractionTimeout) {
    window.clearTimeout(sliderInteractionTimeout);
  }
  sliderInteractionTimeout = window.setTimeout(() => {
    sliderInteractionActive = false;
    sliderInteractionTimeout = null;
  }, 700);
}

function renderFilters() {
  const playerCoverage = getPlayerCoverage();

  filterGrid.innerHTML = FILTERS.map((filter) => `
    <div class="field">
      <label for="filter-${filter.key}">${getFilterLabel(filter.key)}</label>
      <select id="filter-${filter.key}" data-key="${filter.key}" class="${filter.key === "atpPlayer" || filter.key === "wtaPlayer" ? "player-filter-select" : ""}">
        ${buildFilterOptions(filter, playerCoverage)}
      </select>
      ${buildFilterNote(filter, playerCoverage)}
    </div>
  `).join("");

  FILTERS.forEach((filter) => {
    const select = document.getElementById(`filter-${filter.key}`);
    if (!select) {
      return;
    }

    select.addEventListener("change", (event) => {
      state[filter.key] = event.currentTarget.value;
      if (filter.key === "type") {
        syncTypeMenu();
        syncMobileQuickTypeFilter();
      }
      if (filter.key === "atpPlayer" || filter.key === "wtaPlayer") {
        syncMobileQuickPlayerFilter();
      }
      renderResults();
    });
  });
}

function populateMobileQuickPlayerFilter() {
  if (!mobileQuickPlayerFilter) {
    return;
  }

  const atpPlayers = FILTERS.find((filter) => filter.key === "atpPlayer")?.options.filter((option) => option !== "Any") || [];
  const wtaPlayers = FILTERS.find((filter) => filter.key === "wtaPlayer")?.options.filter((option) => option !== "Any") || [];
  const players = sortNamesBySurname([...new Set([...atpPlayers, ...wtaPlayers])]);

  mobileQuickPlayerFilter.innerHTML = `
    <option value="Any">${getUiText("allProPlayers", "All Pro Players")}</option>
    ${players.map((player) => `<option value="${player}">${player}</option>`).join("")}
  `;

  mobileQuickPlayerFilter.onchange = (event) => {
    const selectedPlayer = event.currentTarget.value;
    const isAtpPlayer = atpPlayers.includes(selectedPlayer);
    const isWtaPlayer = wtaPlayers.includes(selectedPlayer);

    state.atpPlayer = isAtpPlayer ? selectedPlayer : "Any";
    state.wtaPlayer = isWtaPlayer ? selectedPlayer : "Any";

    const atpSelect = document.getElementById("filter-atpPlayer");
    const wtaSelect = document.getElementById("filter-wtaPlayer");

    if (atpSelect) {
      atpSelect.value = state.atpPlayer;
    }

    if (wtaSelect) {
      wtaSelect.value = state.wtaPlayer;
    }

    renderResults();
  };

  syncMobileQuickPlayerFilter();
}

function initializeSetupWorkbench() {
  populateQuickSetupControls();
  populateTensionCalculatorControls();
  populateQuickSetupExampleSelect();

  [
    quickSetupStyle,
    quickSetupPro,
    quickSetupSpin,
    quickSetupPower,
    quickSetupControl,
    quickSetupRacket,
    quickSetupUseProRacket
  ].forEach((control) => {
    if (!control) {
      return;
    }

    control.addEventListener("change", () => {
      clearActiveQuickSetupExample();
    });
  });

  if (quickSetupPro) {
    quickSetupPro.addEventListener("change", () => {
      syncQuickSetupProRacketUi();
    });
  }

  if (quickSetupUseProRacket) {
    quickSetupUseProRacket.addEventListener("change", () => {
      syncQuickSetupProRacketUi();
    });
  }

  if (quickSetupButton) {
    quickSetupButton.addEventListener("click", () => {
      const recommendation = buildQuickSetupRecommendation(
        quickSetupStyle?.value || "Any",
        quickSetupPro?.value || "Any",
        {
          spin: quickSetupSpin?.value || "Any",
          power: quickSetupPower?.value || "Any",
          control: quickSetupControl?.value || "Any",
          racketFamily: quickSetupRacket?.value || "Any",
          useProRacket: quickSetupUseProRacket?.checked || false
        }
      );
      renderQuickSetupRecommendation(recommendation);
    });
  }

  if (quickSetupApplyButton) {
    quickSetupApplyButton.addEventListener("click", () => {
      applyQuickSetupRecommendation();
    });
  }

  if (exampleSetupButtons.length) {
    exampleSetupButtons.forEach((button) => {
      button.addEventListener("click", () => {
        applyExampleSetup(Number(button.dataset.exampleIndex || 0));
      });
    });
  }

  if (quickSetupExampleSelect) {
    quickSetupExampleSelect.addEventListener("change", (event) => {
      const selectedIndex = Number(event.currentTarget.value || -1);
      if (selectedIndex >= 0) {
        applyExampleSetup(selectedIndex);
      } else {
        clearActiveQuickSetupExample();
      }
    });
  }

  if (tensionCalcButton) {
    tensionCalcButton.addEventListener("click", () => {
      renderTensionCalculatorRecommendation();
    });
  }

  restoreStoredTensionCalculatorSource();
  renderQuickSetupRecommendation(null);
  renderTensionCalculatorRecommendation();
  syncQuickSetupProRacketUi();
  syncExampleSetupButtons();
}

function syncExampleSetupButtons() {
  if (exampleSetupButtons.length) {
    exampleSetupButtons.forEach((button, index) => {
      const isActive = index === activeQuickSetupExampleIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  if (quickSetupExampleSelect) {
    quickSetupExampleSelect.value = activeQuickSetupExampleIndex >= 0 ? String(activeQuickSetupExampleIndex) : "";
  }
}

function clearActiveQuickSetupExample() {
  if (activeQuickSetupExampleIndex === -1) {
    return;
  }

  activeQuickSetupExampleIndex = -1;
  syncExampleSetupButtons();
}

function populateQuickSetupControls() {
  if (quickSetupStyle) {
    const styles = FILTERS.find((filter) => filter.key === "gameStyle")?.options.filter((option) => option !== "Any") || [];
    quickSetupStyle.innerHTML = `
      <option value="Any">Choose a playing style</option>
      ${styles.map((style) => `<option value="${style}">${style}</option>`).join("")}
    `;
  }

  if (quickSetupPro) {
    const players = getCoveredQuickSetupPlayers();
    quickSetupPro.innerHTML = `
      <option value="Any">Choose a pro player</option>
      ${players.map((player) => `<option value="${player}">${player}</option>`).join("")}
    `;
  }

  if (quickSetupSpin) {
    const spinLevels = FILTERS.find((filter) => filter.key === "spin")?.options || ["Any"];
    quickSetupSpin.innerHTML = spinLevels.map((value) => `
      <option value="${value}">${value === "Any" ? "Any spin level" : value}</option>
    `).join("");
    quickSetupSpin.value = "Any";
  }

  if (quickSetupPower) {
    const powerLevels = FILTERS.find((filter) => filter.key === "power")?.options || ["Any"];
    quickSetupPower.innerHTML = powerLevels.map((value) => `
      <option value="${value}">${value === "Any" ? "Any power level" : value}</option>
    `).join("");
    quickSetupPower.value = "Any";
  }

  if (quickSetupControl) {
    const controlLevels = FILTERS.find((filter) => filter.key === "control")?.options || ["Any"];
    quickSetupControl.innerHTML = controlLevels.map((value) => `
      <option value="${value}">${value === "Any" ? "Any control level" : value}</option>
    `).join("");
    quickSetupControl.value = "Any";
  }

  if (quickSetupRacket) {
    const racketFamilies = FILTERS.find((filter) => filter.key === "racketFamily")?.options || ["Any"];
    quickSetupRacket.innerHTML = racketFamilies.map((value) => `
      <option value="${value}">${value === "Any" ? "Any racket family" : value}</option>
    `).join("");
    quickSetupRacket.value = "Any";
  }

  if (quickSetupUseProRacket) {
    quickSetupUseProRacket.checked = false;
  }
}

function populateQuickSetupExampleSelect() {
  if (!quickSetupExampleSelect) {
    return;
  }

  quickSetupExampleSelect.innerHTML = `
    <option value="">Choose an example pro setup</option>
    ${QUICK_SETUP_EXAMPLES.map((example, index) => `<option value="${index}">${example.player}</option>`).join("")}
  `;
}

function populateTensionCalculatorControls() {
  if (tensionCalcType) {
    const types = FILTERS.find((filter) => filter.key === "type")?.options.filter((option) => option !== "Any") || [];
    tensionCalcType.innerHTML = types.map((type) => `<option value="${type}">${type}</option>`).join("");
    tensionCalcType.value = "Co-Poly";
  }

  if (tensionCalcRacket) {
    const rackets = FILTERS.find((filter) => filter.key === "racketFamily")?.options.filter((option) => option !== "Any") || [];
    tensionCalcRacket.innerHTML = rackets.map((family) => `<option value="${family}">${family}</option>`).join("");
    tensionCalcRacket.value = "Control Frame";
  }

  if (tensionCalcPreference) {
    tensionCalcPreference.value = "Balanced";
  }

  if (tensionCalcArm) {
    tensionCalcArm.value = "Normal";
  }
}

function restoreStoredTensionCalculatorSource() {
  const storedSource = loadStoredTensionCalculatorSource();
  if (!storedSource) {
    return;
  }

  latestTensionCalculatorSource = storedSource;

  if (tensionCalcType && storedSource.type) {
    tensionCalcType.value = storedSource.type;
  }

  if (tensionCalcRacket && storedSource.appliedRacketFamily) {
    tensionCalcRacket.value = storedSource.appliedRacketFamily;
  }

  if (tensionCalcPreference && storedSource.inferredPreference) {
    tensionCalcPreference.value = storedSource.inferredPreference;
  }
}

function getCoveredQuickSetupPlayers() {
  const coverage = getPlayerCoverage();
  const atpPlayers = (window.TENNIS_STRING_PLANNER_PLAYER_OPTIONS?.atp || []).filter((player) => coverage.atp.has(player));
  const wtaPlayers = (window.TENNIS_STRING_PLANNER_PLAYER_OPTIONS?.wta || []).filter((player) => coverage.wta.has(player));
  return sortNamesBySurname([...new Set([...atpPlayers, ...wtaPlayers])]);
}

function buildQuickSetupRecommendation(styleValue, playerValue, preferenceValues = {}, forcedTopEntryName = "") {
  const selectedStyle = styleValue || "Any";
  const selectedPlayer = playerValue || "Any";
  const requestedRacketFamily = preferenceValues.racketFamily || "Any";
  const wantsProRacket = Boolean(preferenceValues.useProRacket) && selectedPlayer !== "Any";
  const resolvedProRacketFamily = wantsProRacket ? resolveQuickSetupPlayerRacketFamily(selectedPlayer) : "";
  const selectedPreferences = {
    spin: preferenceValues.spin || "Any",
    power: preferenceValues.power || "Any",
    control: preferenceValues.control || "Any"
  };
  const selectedRacketFamily = resolvedProRacketFamily || requestedRacketFamily;

  const hasPreferenceFilters = Object.values(selectedPreferences).some((value) => value !== "Any");
  if (selectedStyle === "Any" && selectedPlayer === "Any" && selectedRacketFamily === "Any" && !hasPreferenceFilters) {
    return null;
  }

  let pool = [...STRINGS];

  if (selectedPlayer !== "Any") {
    const playerPool = pool.filter((entry) => getAllPlayersForEntry(entry).includes(selectedPlayer));
    if (!playerPool.length) {
      return null;
    }
    pool = playerPool;
  }

  if (selectedStyle !== "Any" && selectedPlayer === "Any") {
    const stylePool = pool.filter((entry) => entry.gameStyle === selectedStyle);
    if (stylePool.length) {
      pool = stylePool;
    }
  }

  if (selectedRacketFamily !== "Any" && selectedPlayer === "Any") {
    const exactRacketPool = pool.filter((entry) => entry.racketFamily === selectedRacketFamily);
    if (exactRacketPool.length) {
      pool = exactRacketPool;
    } else {
      const groupedRacketPool = pool.filter((entry) => getRacketFamilyGroup(entry.racketFamily) === getRacketFamilyGroup(selectedRacketFamily));
      if (groupedRacketPool.length) {
        pool = groupedRacketPool;
      }
    }
  }

  const ranked = pool
    .map((entry) => {
      const playerTension = findPlayerTensionForEntry(entry, selectedPlayer);
      const playerRacket = findPlayerRacketForEntry(entry, selectedPlayer);
      const proReferenceStrength = getQuickSetupProReferenceStrength(playerTension, playerRacket);
      let score = calculateQuickSetupFitScore(entry, selectedStyle, selectedPreferences, selectedRacketFamily);

      if (selectedPlayer !== "Any") {
        score += 3.5;
      }

      if (playerTension) {
        score += 2.5;
      }

      if (entry.type === "Hybrid") {
        score -= 0.35;
      }

      score += Math.min(getKnownProPlayerCount(entry), 10) * 0.08;

      return {
        entry,
        playerTension,
        playerRacket,
        proReferenceStrength,
        score
      };
    })
    .sort((left, right) => {
      if (selectedPlayer !== "Any" && right.proReferenceStrength !== left.proReferenceStrength) {
        return right.proReferenceStrength - left.proReferenceStrength;
      }

      if (right.score !== left.score) {
        return right.score - left.score;
      }

      const leftHasExactTension = left.playerTension ? 1 : 0;
      const rightHasExactTension = right.playerTension ? 1 : 0;
      if (rightHasExactTension !== leftHasExactTension) {
        return rightHasExactTension - leftHasExactTension;
      }

      const proDifference = getKnownProPlayerCount(right.entry) - getKnownProPlayerCount(left.entry);
      if (proDifference !== 0) {
        return proDifference;
      }

      return left.entry.name.localeCompare(right.entry.name);
    });

  if (!ranked.length) {
    return null;
  }

  const pinnedRanked = pinQuickSetupOption(ranked, forcedTopEntryName);
  const hasForcedTopMatch = Boolean(forcedTopEntryName) && pinnedRanked[0]?.entry?.name === forcedTopEntryName;
  const hasPinnedProSetup = selectedPlayer !== "Any" && ranked.some((item) => item.proReferenceStrength > 0);
  const options = selectQuickSetupOptions(pinnedRanked, 5, 3).map((item, index) => ({
    entry: item.entry,
    playerTension: item.playerTension,
    playerRacket: item.playerRacket,
    tensionDisplay: buildQuickSetupTensionDisplay(item.entry, item.playerTension),
    rankLabel: index === 0
      ? hasForcedTopMatch
        ? "Example Pick"
        : "Top Match"
      : `Option ${index + 1}`
  }));
  const best = options[0];
  const reasonParts = [];

  if (hasForcedTopMatch) {
    reasonParts.push(`Pinned example string: ${forcedTopEntryName}.`);
  }

  if (selectedStyle !== "Any") {
    reasonParts.push(`Matches a ${selectedStyle.toLowerCase()} profile.`);
  }

  if (selectedPlayer !== "Any") {
    reasonParts.push(best.playerTension
      ? `Includes a documented ${selectedPlayer} tension reference.`
      : `Uses a string associated with ${selectedPlayer}.`);
  }

  if (wantsProRacket) {
    reasonParts.push(resolvedProRacketFamily
      ? `Using ${selectedPlayer}'s racket family: ${resolvedProRacketFamily}.`
      : requestedRacketFamily !== "Any"
        ? `No saved racket family found for ${selectedPlayer}, so your selected racket stayed in place.`
        : `No saved racket family found for ${selectedPlayer}, so racket fit stayed open.`);
  }

  if (selectedRacketFamily !== "Any") {
    reasonParts.push(best.entry.racketFamily === selectedRacketFamily
      ? `Aligned to your ${selectedRacketFamily.toLowerCase()} frame.`
      : `Closest racket-family fit to ${selectedRacketFamily.toLowerCase()}.`);
  }

  if (selectedPreferences.spin !== "Any") {
    reasonParts.push(`Biased toward ${selectedPreferences.spin.toLowerCase()} spin.`);
  }

  if (selectedPreferences.power !== "Any") {
    reasonParts.push(`Biased toward ${selectedPreferences.power.toLowerCase()} power.`);
  }

  if (selectedPreferences.control !== "Any") {
    reasonParts.push(`Biased toward ${selectedPreferences.control.toLowerCase()} control.`);
  }

  if (!reasonParts.length) {
    reasonParts.push("Closest in-database fit for a fast starting point.");
  }

  const logic = buildQuickSetupLogicSummary({
    selectedPlayer,
    selectedStyle,
    selectedPreferences,
    selectedRacketFamily,
    hasPinnedProSetup,
    hasForcedTopMatch,
    forcedTopEntryName,
    wantsProRacket,
    resolvedProRacketFamily
  });

  return {
    style: selectedStyle,
    player: selectedPlayer,
    requestedRacketFamily,
    racketFamily: selectedRacketFamily,
    useProRacket: wantsProRacket,
    proRacketFamily: resolvedProRacketFamily,
    preferences: selectedPreferences,
    options,
    entry: best.entry,
    playerTension: best.playerTension,
    playerRacket: best.playerRacket,
    tensionDisplay: best.tensionDisplay,
    logic,
    reason: reasonParts.join(" ")
  };
}

function getQuickSetupProReferenceStrength(playerTension, playerRacket) {
  if (playerTension && playerRacket) {
    return 3;
  }

  if (playerTension) {
    return 2;
  }

  if (playerRacket) {
    return 1;
  }

  return 0;
}

function pinQuickSetupOption(ranked, forcedTopEntryName = "") {
  if (!Array.isArray(ranked) || !ranked.length || !forcedTopEntryName) {
    return ranked;
  }

  const forcedIndex = ranked.findIndex((item) => item?.entry?.name === forcedTopEntryName);
  if (forcedIndex <= 0) {
    return ranked;
  }

  return [ranked[forcedIndex], ...ranked.slice(0, forcedIndex), ...ranked.slice(forcedIndex + 1)];
}

function buildQuickSetupLogicSummary({
  selectedPlayer,
  selectedStyle,
  selectedPreferences,
  selectedRacketFamily,
  hasPinnedProSetup,
  hasForcedTopMatch,
  forcedTopEntryName,
  wantsProRacket,
  resolvedProRacketFamily
}) {
  const parts = [];

  if (hasForcedTopMatch && forcedTopEntryName) {
    parts.push(`${forcedTopEntryName} pinned first`);
  }

  if (selectedPlayer !== "Any") {
    parts.push(`${selectedPlayer} string pool`);
    if (hasPinnedProSetup) {
      parts.push("documented pro setup first");
    }
  }

  if (selectedStyle !== "Any") {
    parts.push(`${selectedStyle} fit`);
  }

  if (selectedRacketFamily !== "Any") {
    const racketLabel = wantsProRacket && resolvedProRacketFamily
      ? `${resolvedProRacketFamily} racket family`
      : `${selectedRacketFamily} racket fit`;
    parts.push(racketLabel);
  }

  const preferenceLabels = [
    selectedPreferences.spin !== "Any" ? `${selectedPreferences.spin} spin` : "",
    selectedPreferences.power !== "Any" ? `${selectedPreferences.power} power` : "",
    selectedPreferences.control !== "Any" ? `${selectedPreferences.control} control` : ""
  ].filter(Boolean);

  if (preferenceLabels.length) {
    parts.push(preferenceLabels.join(" / "));
  }

  return parts.length ? parts.join(" -> ") : "Closest in-database fit";
}

function resolveQuickSetupPlayerRacketFamily(player) {
  if (!player || player === "Any") {
    return "";
  }

  const counts = new Map();

  STRINGS.forEach((entry) => {
    if (!getAllPlayersForEntry(entry).includes(player) || !entry.racketFamily) {
      return;
    }

    const hasDirectRacketReference = Boolean(findPlayerRacketForEntry(entry, player));
    const weight = hasDirectRacketReference ? 3 : 1;
    counts.set(entry.racketFamily, (counts.get(entry.racketFamily) || 0) + weight);
  });

  return [...counts.entries()]
    .sort((left, right) => {
      if (right[1] !== left[1]) {
        return right[1] - left[1];
      }
      return left[0].localeCompare(right[0]);
    })[0]?.[0] || "";
}

function syncQuickSetupProRacketUi() {
  const selectedPlayer = quickSetupPro?.value || "Any";
  const hasPlayer = selectedPlayer !== "Any";
  const resolvedRacketFamily = hasPlayer ? resolveQuickSetupPlayerRacketFamily(selectedPlayer) : "";
  const useProRacket = Boolean(quickSetupUseProRacket?.checked);

  if (quickSetupUseProRacket) {
    quickSetupUseProRacket.disabled = !hasPlayer;
    if (!hasPlayer) {
      quickSetupUseProRacket.checked = false;
    }
  }

  if (quickSetupProRacketNote) {
    const helpText = !hasPlayer
      ? "Pick a pro to narrow results to that pro's strings. Turn this on to also use the pro's racket family."
      : resolvedRacketFamily
        ? useProRacket
          ? `${selectedPlayer} now narrows results by both string and racket family: ${resolvedRacketFamily}.`
          : `${selectedPlayer} already narrows results to that pro's strings. Turn this on to also use ${selectedPlayer}'s racket family: ${resolvedRacketFamily}.`
        : `${selectedPlayer} already narrows results to that pro's strings, but no racket family is saved yet.`;
    quickSetupProRacketNote.textContent = helpText;
    if (quickSetupProRacketHelp) {
      quickSetupProRacketHelp.setAttribute("aria-label", helpText);
      quickSetupProRacketHelp.setAttribute("title", helpText);
    }
  }
}

function selectQuickSetupOptions(ranked, desiredCount = 5, minimumBrandCount = 3) {
  if (!Array.isArray(ranked) || ranked.length === 0) {
    return [];
  }

  const targetCount = Math.max(1, desiredCount);
  const availableBrandCount = new Set(ranked.map((item) => item.entry.brand).filter(Boolean)).size;
  const targetBrandCount = Math.min(minimumBrandCount, availableBrandCount, targetCount);
  const selected = [];
  const selectedNames = new Set();
  const selectedBrands = new Set();

  const addOption = (item) => {
    if (!item || selectedNames.has(item.entry.name)) {
      return false;
    }

    selected.push(item);
    selectedNames.add(item.entry.name);
    if (item.entry.brand) {
      selectedBrands.add(item.entry.brand);
    }
    return true;
  };

  addOption(ranked[0]);

  if (selectedBrands.size < targetBrandCount) {
    ranked.forEach((item) => {
      if (selected.length >= targetCount || selectedBrands.size >= targetBrandCount) {
        return;
      }

      if (!item.entry.brand || selectedBrands.has(item.entry.brand)) {
        return;
      }

      addOption(item);
    });
  }

  ranked.forEach((item) => {
    if (selected.length >= targetCount) {
      return;
    }

    addOption(item);
  });

  return selected;
}

function calculateQuickSetupFitScore(entry, selectedStyle, selectedPreferences = {}, selectedRacketFamily = "Any") {
  if (!selectedStyle || selectedStyle === "Any") {
    const preferenceOnlyScore = calculateQuickSetupPreferenceScore(entry, selectedPreferences);
    const racketScore = calculateQuickSetupRacketScore(entry, selectedRacketFamily);
    return (preferenceOnlyScore > 0 ? preferenceOnlyScore : 3) + racketScore;
  }

  const styleWeights = {
    "Aggressive Baseliner": { spin: 2.2, control: 2, power: 1.2, durability: 1.2, comfort: 0.4 },
    Counterpuncher: { control: 2, comfort: 1.6, durability: 1.4, spin: 1.1, power: 0.6 },
    "All-Court": { comfort: 1.6, power: 1.5, control: 1.4, durability: 0.8, spin: 0.8 },
    "Serve and Volley": { power: 1.7, comfort: 1.5, control: 1.4, durability: 0.6, spin: 0.4 },
    "Flat Hitter": { control: 2.2, power: 1.1, durability: 1.4, spin: 0.6, comfort: 0.6 },
    "Heavy Topspin": { spin: 2.4, control: 1.7, durability: 1.5, power: 0.8, comfort: 0.4 }
  };

  const weights = styleWeights[selectedStyle];
  if (!weights) {
    return 3;
  }

  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);
  if (!totalWeight) {
    return 3;
  }

  const weightedValue =
    mapStringLevelToNumeric(entry.spin) * (weights.spin || 0) +
    mapStringLevelToNumeric(entry.control) * (weights.control || 0) +
    mapStringLevelToNumeric(entry.power) * (weights.power || 0) +
    mapStringLevelToNumeric(entry.durability) * (weights.durability || 0) +
    mapStringLevelToNumeric(entry.comfort) * (weights.comfort || 0);

  const normalized = weightedValue / totalWeight;
  return normalized * 2
    + calculateQuickSetupPreferenceScore(entry, selectedPreferences)
    + calculateQuickSetupRacketScore(entry, selectedRacketFamily);
}

function calculateQuickSetupPreferenceScore(entry, selectedPreferences = {}) {
  const affinityWeights = {
    spin: 1.6,
    power: 1.2,
    control: 1.6
  };

  return Object.entries(affinityWeights).reduce((sum, [key, weight]) => {
    const desired = selectedPreferences[key];
    if (!desired || desired === "Any") {
      return sum;
    }

    const difference = Math.abs(mapStringLevelToNumeric(entry[key]) - mapStringLevelToNumeric(desired));
    const closeness = Math.max(0, 1 - difference / 3);
    return sum + closeness * weight;
  }, 0);
}

function calculateQuickSetupRacketScore(entry, selectedRacketFamily = "Any") {
  if (!selectedRacketFamily || selectedRacketFamily === "Any") {
    return 0;
  }

  if (entry.racketFamily === selectedRacketFamily) {
    return 2.25;
  }

  if (getRacketFamilyGroup(entry.racketFamily) === getRacketFamilyGroup(selectedRacketFamily)) {
    return 0.9;
  }

  return 0;
}

function getAllPlayersForEntry(entry) {
  const customAssociations = getCustomProAssociations(entry);
  return mergeUniqueStrings(
    [...(entry.atpPlayers || []), ...(entry.wtaPlayers || [])],
    [...customAssociations.atpPlayers, ...customAssociations.wtaPlayers]
  );
}

function findPlayerTensionForEntry(entry, player) {
  if (!player || player === "Any") {
    return null;
  }

  const customAssociations = getCustomProAssociations(entry);
  return [...(entry.proTensions || []), ...customAssociations.tensions].find((item) => item.player === player) || null;
}

function findPlayerRacketForEntry(entry, player) {
  if (!player || player === "Any") {
    return null;
  }

  const customAssociations = getCustomProAssociations(entry);
  return [...(entry.proRackets || []), ...customAssociations.rackets].find((item) => item.player === player) || null;
}

function buildQuickSetupTensionDisplay(entry, playerTension) {
  if (playerTension) {
    return {
      label: playerTension.tension,
      detail: playerTension.detail
    };
  }

  const band = TENSION_BAND_DETAILS[entry.tensionBand];
  return {
    label: band ? band.lbs : entry.tensionBand,
    detail: `${entry.tensionBand} starting range`
  };
}

function renderQuickSetupRecommendation(recommendation) {
  latestQuickSetupRecommendation = recommendation;

  if (!quickSetupResult) {
    return;
  }

  if (!recommendation) {
    quickSetupResult.innerHTML = `<p class="summary-copy">Pick a racket, style, pro, or your preferred spin, power, and control to generate a starting setup.</p>`;
    if (quickSetupApplyButton) {
      quickSetupApplyButton.hidden = true;
      quickSetupApplyButton.textContent = hasPlannerSurface
        ? "Apply Top Pick to Pre-Populate Tension Calculator fields"
        : "Open Top Pick in Tension Calculator";
    }
    return;
  }

  const { options, reason, logic } = recommendation;
  const matchLabel = options.length === 1 ? "1 strong match" : `${options.length} strong matches`;
  quickSetupResult.innerHTML = `
    <div class="tool-result-header">
      <p class="eyebrow">Recommended Setups</p>
      <h3 class="tool-recommendation-name">${matchLabel}</h3>
      <p class="tool-note">${reason}</p>
      <p class="tool-mini-line"><strong>Logic:</strong> ${logic}</p>
    </div>
    <div class="quick-setup-option-list">
      ${options.map((option, index) => `
        <article class="quick-setup-option${index === 0 ? " is-primary" : ""}">
          <div class="quick-setup-option-header">
            <div>
              <p class="eyebrow">${option.rankLabel}</p>
              <h4 class="quick-setup-option-name">${option.entry.name}</h4>
            </div>
            <button class="secondary-button compact-button quick-setup-option-apply" type="button" data-index="${index}">Use This Setup</button>
          </div>
          <div class="tool-stat-grid quick-setup-option-stats">
            <div class="tool-stat">
              <span class="tool-stat-label">String Type</span>
              <strong>${option.entry.type}</strong>
            </div>
            <div class="tool-stat">
              <span class="tool-stat-label">Gauge</span>
              <strong>${option.entry.gauge}</strong>
            </div>
            <div class="tool-stat">
              <span class="tool-stat-label">Tension</span>
              <strong>${option.tensionDisplay.label}</strong>
            </div>
            <div class="tool-stat">
              <span class="tool-stat-label">Racket Fit</span>
              <strong>${option.entry.racketFamily}</strong>
            </div>
          </div>
          <p class="tool-note tool-note-compact">${option.entry.summary}</p>
          <p class="tool-note tool-note-compact">Reference: ${option.tensionDisplay.detail}${option.playerRacket ? ` | ${option.playerRacket.player} uses ${option.playerRacket.racket}` : ""}</p>
        </article>
      `).join("")}
    </div>
  `;

  quickSetupResult.querySelectorAll(".quick-setup-option-apply").forEach((button) => {
    button.addEventListener("click", () => {
      const optionIndex = Number(button.dataset.index || 0);
      applyQuickSetupRecommendation(optionIndex);
    });
  });

  if (quickSetupApplyButton) {
    quickSetupApplyButton.hidden = false;
    quickSetupApplyButton.textContent = hasPlannerSurface
      ? "Apply Top Pick to Pre-Populate Tension Calculator fields"
      : "Open Top Pick in Tension Calculator";
  }
}

function applyQuickSetupRecommendation(optionIndex = 0) {
  if (!latestQuickSetupRecommendation) {
    return;
  }

  const selectedOption = latestQuickSetupRecommendation.options?.[optionIndex] || latestQuickSetupRecommendation.options?.[0];
  if (!selectedOption) {
    return;
  }

  const appliedRecommendation = {
    ...latestQuickSetupRecommendation,
    entry: selectedOption.entry,
    playerTension: selectedOption.playerTension,
    playerRacket: selectedOption.playerRacket,
    tensionDisplay: selectedOption.tensionDisplay
  };
  applyTensionCalculatorFromQuickSetup(appliedRecommendation);
  persistTensionCalculatorSource(latestTensionCalculatorSource);

  if (hasPlannerSurface) {
    const filters = buildPlannerFiltersFromRecommendation(appliedRecommendation);
    applyPlannerSelection(filters);
  } else if (pageKey === "quick-setup") {
    window.location.href = "./tension-calculator.html";
  }
}

function applyExampleSetup(exampleIndex = 0) {
  const example = QUICK_SETUP_EXAMPLES[exampleIndex] || QUICK_SETUP_EXAMPLES[0];
  if (!example) {
    return;
  }

  activeQuickSetupExampleIndex = exampleIndex;
  syncExampleSetupButtons();

  if (quickSetupStyle) {
    quickSetupStyle.value = example.style;
  }

  if (quickSetupPro) {
    quickSetupPro.value = example.player;
  }

  if (quickSetupSpin) {
    quickSetupSpin.value = example.preferences.spin;
  }

  if (quickSetupPower) {
    quickSetupPower.value = example.preferences.power;
  }

  if (quickSetupControl) {
    quickSetupControl.value = example.preferences.control;
  }

  if (quickSetupRacket) {
    quickSetupRacket.value = example.racketFamily;
  }

  if (quickSetupUseProRacket) {
    quickSetupUseProRacket.checked = Boolean(example.useProRacket);
  }

  syncQuickSetupProRacketUi();

  const recommendation = buildQuickSetupRecommendation(
    example.style,
    example.player,
    {
      ...example.preferences,
      racketFamily: example.racketFamily,
      useProRacket: example.useProRacket
    },
    example.preferredTopEntryName || ""
  );
  renderQuickSetupRecommendation(recommendation);
  if (recommendation) {
    applyTensionCalculatorFromQuickSetup(recommendation);
    persistTensionCalculatorSource(latestTensionCalculatorSource);
  }

  if (hasPlannerSurface) {
    const filters = recommendation
      ? buildPlannerFiltersFromRecommendation(recommendation)
      : buildExampleFallbackFilters(example);
    applyPlannerSelection(filters);
  }
}

function buildExampleFallbackFilters(example) {
  const filters = {
    racketFamily: example.racketFamily,
    gameStyle: example.style
  };

  if (isKnownAtpPlayer(example.player)) {
    filters.atpPlayer = example.player;
  } else if (isKnownWtaPlayer(example.player)) {
    filters.wtaPlayer = example.player;
  }

  return filters;
}

function buildPlannerFiltersFromRecommendation(recommendation) {
  const entry = recommendation.entry;
  const filters = {
    type: entry.type,
    gauge: entry.gauge,
    tensionBand: entry.tensionBand,
    racketFamily: entry.racketFamily
  };

  if (recommendation.style && recommendation.style !== "Any" && entry.gameStyle === recommendation.style) {
    filters.gameStyle = recommendation.style;
  }

  if (recommendation.preferences?.spin && recommendation.preferences.spin !== "Any") {
    filters.spin = recommendation.preferences.spin;
  }

  if (recommendation.preferences?.power && recommendation.preferences.power !== "Any") {
    filters.power = recommendation.preferences.power;
  }

  if (recommendation.preferences?.control && recommendation.preferences.control !== "Any") {
    filters.control = recommendation.preferences.control;
  }

  if (recommendation.player && recommendation.player !== "Any" && getAllPlayersForEntry(entry).includes(recommendation.player)) {
    if (isKnownAtpPlayer(recommendation.player)) {
      filters.atpPlayer = recommendation.player;
    } else if (isKnownWtaPlayer(recommendation.player)) {
      filters.wtaPlayer = recommendation.player;
    }
  }

  return filters;
}

function applyTensionCalculatorFromQuickSetup(recommendation) {
  if (!recommendation) {
    return;
  }

  const nextType = recommendation.entry?.type || tensionCalcType?.value || "Co-Poly";
  const nextRacketFamily = recommendation.racketFamily && recommendation.racketFamily !== "Any"
    ? recommendation.racketFamily
    : recommendation.entry?.racketFamily || tensionCalcRacket?.value || "Control Frame";
  const nextPreference = inferTensionPreferenceFromQuickSetup(recommendation);
  latestTensionCalculatorSource = buildTensionCalculatorSource(recommendation, nextPreference, nextRacketFamily);

  if (tensionCalcType) {
    tensionCalcType.value = nextType;
  }

  if (tensionCalcRacket && nextRacketFamily) {
    tensionCalcRacket.value = nextRacketFamily;
  }

  if (tensionCalcPreference) {
    tensionCalcPreference.value = nextPreference;
  }

  renderTensionCalculatorRecommendation();
}

function buildTensionCalculatorSource(recommendation, inferredPreference, appliedRacketFamily) {
  if (!recommendation?.entry) {
    return null;
  }

  return {
    name: recommendation.entry.name,
    gauge: recommendation.entry.gauge,
    type: recommendation.entry.type,
    entryRacketFamily: recommendation.entry.racketFamily,
    appliedRacketFamily,
    inferredPreference,
    player: recommendation.player || "Any",
    tensionDisplay: recommendation.tensionDisplay || buildQuickSetupTensionDisplay(recommendation.entry, recommendation.playerTension),
    playerTension: recommendation.playerTension || null,
    playerRacket: recommendation.playerRacket || null
  };
}

function inferTensionPreferenceFromQuickSetup(recommendation) {
  const selectedPower = recommendation.preferences?.power;
  const selectedControl = recommendation.preferences?.control;
  const powerScore = !selectedPower || selectedPower === "Any"
    ? 0
    : mapStringLevelToNumeric(selectedPower);
  const controlScore = !selectedControl || selectedControl === "Any"
    ? 0
    : mapStringLevelToNumeric(selectedControl);

  if (!powerScore && !controlScore) {
    return "Balanced";
  }

  if (powerScore === controlScore) {
    return "Balanced";
  }

  return controlScore > powerScore ? "Control" : "Comfort";
}

function isKnownAtpPlayer(player) {
  return (window.TENNIS_STRING_PLANNER_PLAYER_OPTIONS?.atp || []).includes(player);
}

function isKnownWtaPlayer(player) {
  return (window.TENNIS_STRING_PLANNER_PLAYER_OPTIONS?.wta || []).includes(player);
}

function renderTensionCalculatorRecommendation() {
  if (!tensionCalcResult) {
    return;
  }

  const recommendation = buildTensionCalculatorRecommendation({
    type: tensionCalcType?.value || "Co-Poly",
    racketFamily: tensionCalcRacket?.value || "Control Frame",
    preference: tensionCalcPreference?.value || "Balanced",
    armComfort: tensionCalcArm?.value || "Normal",
    source: latestTensionCalculatorSource
  });

  if (!recommendation) {
    tensionCalcResult.innerHTML = `<p class="summary-copy">Choose a string type and racket family to calculate a starting range.</p>`;
    return;
  }

  const typeDescription = TYPE_DESCRIPTIONS[recommendation.type] || null;

  tensionCalcResult.innerHTML = `
    <div class="tool-result-header">
      <p class="eyebrow">Starting Tension</p>
      <h3 class="tool-recommendation-name">${recommendation.lbsRange}</h3>
      <p class="tool-note">${recommendation.kgRange}</p>
    </div>
    <div class="tool-stat-grid">
      ${recommendation.source ? `
        <div class="tool-stat">
          <span class="tool-stat-label">Selected String</span>
          <strong>${recommendation.source.name} ${recommendation.source.gauge}</strong>
        </div>
      ` : ""}
      ${recommendation.proReference ? `
        <div class="tool-stat">
          <span class="tool-stat-label">Pro Tension</span>
          <strong>${recommendation.proReference.tension}</strong>
          <span class="tool-stat-note">${recommendation.proReference.player}${recommendation.proReference.detail ? ` | ${recommendation.proReference.detail}` : ""}</span>
        </div>
      ` : ""}
      <div class="tool-stat">
        <span class="tool-stat-label">String Type</span>
        <strong>${recommendation.type}</strong>
      </div>
      <div class="tool-stat">
        <span class="tool-stat-label">Racket Family</span>
        <strong>${recommendation.racketFamily}</strong>
      </div>
      <div class="tool-stat">
        <span class="tool-stat-label">Feel Goal</span>
        <strong>${recommendation.preference}</strong>
      </div>
      <div class="tool-stat">
        <span class="tool-stat-label">Arm Comfort</span>
        <strong>${recommendation.armComfort}</strong>
      </div>
    </div>
    ${recommendation.sourceNote ? `<p class="tool-note tool-note-compact">${recommendation.sourceNote}</p>` : ""}
    <p class="tool-mini-line">${recommendation.explanation}</p>
    ${typeDescription ? `
      <article class="type-description-card tool-type-description-card">
        <p class="eyebrow">${typeDescription.eyebrow}</p>
        <h3>${typeDescription.title}</h3>
        <p class="summary-copy">${typeDescription.text}</p>
      </article>
    ` : ""}
    ${recommendation.hybridNote ? `<p class="tool-note">${recommendation.hybridNote}</p>` : ""}
    <details class="tool-logic-details">
      <summary class="secondary-button compact-button tension-logic-toggle">String Tension Logic</summary>
      <div class="tool-logic-panel">
        <p class="tool-note tool-note-compact"><strong>Formula:</strong> ${recommendation.logic.formula}</p>
        <p class="tool-note tool-note-compact">Range shown: ${recommendation.logic.rangeExplanation}</p>
        ${recommendation.logic.clampNote ? `<p class="tool-note tool-note-compact">${recommendation.logic.clampNote}</p>` : ""}
      </div>
    </details>
    ${recommendation.references.length > 0 ? `
      <div class="tool-reference-list">
        ${recommendation.references.map((entry) => `
          <div class="tool-reference-item">
            <strong>${entry.name}</strong>
            <span>${entry.tensionBand} | ${formatTensionBandRange(entry.tensionBand)}</span>
          </div>
        `).join("")}
      </div>
    ` : ""}
  `;
}

function buildTensionCalculatorRecommendation({ type, racketFamily, preference, armComfort, source = null }) {
  const base = TENSION_TYPE_BASE[type];
  if (!base) {
    return null;
  }

  const racketAdjustment = TENSION_RACKET_ADJUSTMENTS[racketFamily] || 0;
  const preferenceAdjustment = TENSION_FEEL_ADJUSTMENTS[preference] || 0;
  const armAdjustment = TENSION_ARM_ADJUSTMENTS[armComfort] || 0;
  const rawTargetPounds = base + racketAdjustment + preferenceAdjustment + armAdjustment;
  const targetPounds = clampNumber(
    rawTargetPounds,
    42,
    58
  );
  const min = clampNumber(targetPounds - 1.5, 42, 58);
  const max = clampNumber(targetPounds + 1.5, 42, 58);
  const explanationParts = [];

  explanationParts.push((type === "Poly" || type === "Co-Poly")
    ? `${type} setups usually start lower than softer strings.`
    : `${type} setups usually start a little higher than stiff poly beds.`);
  explanationParts.push(preference === "Comfort"
    ? "Your comfort target pulls the starting point down."
    : preference === "Control"
      ? "Your control target nudges the starting point higher."
      : "Balanced keeps the range near the middle.");

  if (armComfort !== "Normal") {
    explanationParts.push("Extra arm comfort lowers the recommendation a bit.");
  }

  const sourceMatchesCurrentFields = Boolean(source)
    && source.type === type
    && source.appliedRacketFamily === racketFamily;
  const proReference = source?.playerTension
    ? {
        player: source.playerTension.player || source.player,
        tension: source.playerTension.tension,
        detail: source.playerTension.detail || ""
      }
    : null;
  const sourceNote = !source
    ? ""
    : sourceMatchesCurrentFields
      ? source.playerTension
        ? `From Quick String Setup Tool: ${source.player === "Any" ? source.name : `${source.player}'s ${source.name}`} with a documented reference of ${source.tensionDisplay.label}.`
        : `From Quick String Setup Tool: ${source.name} ${source.gauge} using ${source.appliedRacketFamily}.`
      : `Quick String Setup source: ${source.name} ${source.gauge}. The current calculator fields have been adjusted from the original handoff.`;

  return {
    type,
    racketFamily,
    preference,
    armComfort,
    source,
    proReference,
    sourceNote,
    lbsRange: formatPoundsRange(min, max),
    kgRange: formatKilogramRange(min, max),
    explanation: explanationParts.join(" "),
    logic: {
      formula: `${formatDecimalNumber(base)} base ${formatSignedAdjustment(racketAdjustment)} racket ${formatSignedAdjustment(preferenceAdjustment)} feel ${formatSignedAdjustment(armAdjustment)} arm = ${formatDecimalNumber(targetPounds)} lbs target`,
      rangeExplanation: `${formatPoundsRange(min, max)} is shown as a simple starting window around the ${formatDecimalNumber(targetPounds)} lbs target.`,
      clampNote: rawTargetPounds !== targetPounds
        ? `The raw result was capped to keep calculator outputs between 42 and 58 lbs.`
        : ""
    },
    hybridNote: type === "Hybrid"
      ? "Hybrid tip: if you use a softer main with a poly cross, a common starting point is to string the cross 2 lbs lower."
      : "",
    references: getClosestTensionExamples(type, racketFamily, targetPounds, source)
  };
}

function getClosestTensionExamples(type, racketFamily, targetPounds, source = null) {
  const sameType = STRINGS.filter((entry) => doesEntryMatchCalculatorType(entry.type, type));
  const exactFamily = sameType.filter((entry) => entry.racketFamily === racketFamily);
  const groupedFamily = sameType.filter((entry) => getRacketFamilyGroup(entry.racketFamily) === getRacketFamilyGroup(racketFamily));
  const candidatePool = exactFamily.length ? exactFamily : groupedFamily.length ? groupedFamily : sameType;
  const selectedEntry = source?.name ? STRINGS.find((entry) => entry.name === source.name) : null;
  const ordered = candidatePool
    .slice()
    .sort((left, right) => {
      const leftDifference = Math.abs(getTensionBandCenter(left.tensionBand) - targetPounds);
      const rightDifference = Math.abs(getTensionBandCenter(right.tensionBand) - targetPounds);
      if (leftDifference !== rightDifference) {
        return leftDifference - rightDifference;
      }
      return left.name.localeCompare(right.name);
    });

  if (!selectedEntry) {
    return ordered.slice(0, 3);
  }

  const withoutSelected = ordered.filter((entry) => entry.name !== selectedEntry.name);
  return [selectedEntry, ...withoutSelected].slice(0, 3);
}

function doesEntryMatchCalculatorType(entryType, selectedType) {
  if (selectedType === "Poly" || selectedType === "Co-Poly") {
    return entryType === "Poly" || entryType === "Co-Poly";
  }

  return entryType === selectedType;
}

function getRacketFamilyGroup(racketFamily) {
  if (["Babolat Pure Aero", "Yonex VCORE", "Spin Frame"].includes(racketFamily)) {
    return "spin";
  }

  if (["Babolat Pure Drive", "Wilson Clash", "Yonex Ezone", "Power Frame"].includes(racketFamily)) {
    return "power";
  }

  return "control";
}

function getTensionBandCenter(tensionBand) {
  return TENSION_BAND_DETAILS[tensionBand]?.center || 51;
}

function formatTensionBandRange(tensionBand) {
  return TENSION_BAND_DETAILS[tensionBand]?.lbs || tensionBand;
}

function formatPoundsRange(min, max) {
  return `${Math.round(min)}-${Math.round(max)} lbs`;
}

function formatDecimalNumber(value) {
  return Number(value).toFixed(1);
}

function formatSignedAdjustment(value) {
  return `${value >= 0 ? "+" : "-"} ${formatDecimalNumber(Math.abs(value))}`;
}

function formatKilogramRange(min, max) {
  const poundsToKg = (value) => (value * 0.45359237).toFixed(1);
  return `${poundsToKg(min)}-${poundsToKg(max)} kg`;
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clearNonSearchFilters() {
  FILTERS.forEach((filter) => {
    state[filter.key] = "Any";
    const select = document.getElementById(`filter-${filter.key}`);
    if (select) {
      select.value = "Any";
    }
  });

  syncTypeMenu();
  syncMobileQuickPlayerFilter();
  syncMobileQuickTypeFilter();
}

function clearPrimaryMenuModeInputs() {
  clearNonSearchFilters();
  searchQuery = "";
  autoCollapsedToolsForSearch = false;
  toolsHiddenBeforeSearch = false;

  if (stringSearchInput) {
    stringSearchInput.value = "";
  }

  syncClearSearchButton();
}

if (mobileQuickTypeFilter) {
  mobileQuickTypeFilter.addEventListener("change", (event) => {
    const selectedType = event.currentTarget.value || "Any";
    state.type = selectedType;

    const typeSelect = document.getElementById("filter-type");
    if (typeSelect) {
      typeSelect.value = selectedType;
    }

    syncTypeMenu();
    syncMobileQuickTypeFilter();
    renderResults();
  });
}

function syncMobileQuickPlayerFilter() {
  if (!mobileQuickPlayerFilter) {
    return;
  }

  if (state.atpPlayer && state.atpPlayer !== "Any") {
    mobileQuickPlayerFilter.value = state.atpPlayer;
    return;
  }

  if (state.wtaPlayer && state.wtaPlayer !== "Any") {
    mobileQuickPlayerFilter.value = state.wtaPlayer;
    return;
  }

  mobileQuickPlayerFilter.value = "Any";
}

function syncMobileQuickTypeFilter() {
  if (!mobileQuickTypeFilter) {
    return;
  }

  mobileQuickTypeFilter.value = state.type || "Any";
}

function getFilterLabel(key) {
  const labels = {
    brand: {
      en: "String Brand",
      fr: "Marque de cordage",
      es: "Marca de cuerda",
      it: "Marca della corda"
    },
    type: {
      en: "Type of String",
      fr: "Type de cordage",
      es: "Tipo de cuerda",
      it: "Tipo di corda"
    },
    atpPlayer: {
      en: "ATP Player",
      fr: "Joueur ATP",
      es: "Jugador ATP",
      it: "Giocatore ATP"
    },
    wtaPlayer: {
      en: "WTA Player",
      fr: "Joueuse WTA",
      es: "Jugadora WTA",
      it: "Giocatrice WTA"
    },
    stringColor: {
      en: "String Color",
      fr: "Couleur du cordage",
      es: "Color de cuerda",
      it: "Colore della corda"
    },
    stringShape: {
      en: "String Shape",
      fr: "Forme du cordage",
      es: "Forma de cuerda",
      it: "Forma della corda"
    },
    spin: {
      en: "Spin",
      fr: "Spin",
      es: "Spin",
      it: "Spin"
    },
    power: {
      en: "Power",
      fr: "Puissance",
      es: "Potencia",
      it: "Potenza"
    },
    control: {
      en: "Control",
      fr: "Controle",
      es: "Control",
      it: "Controllo"
    },
    durability: {
      en: "Durability",
      fr: "Durabilite",
      es: "Durabilidad",
      it: "Durata"
    },
    comfort: {
      en: "Comfort",
      fr: "Confort",
      es: "Comodidad",
      it: "Comfort"
    },
    feel: {
      en: "Feel",
      fr: "Sensation",
      es: "Sensacion",
      it: "Feeling"
    },
    gauge: {
      en: "Gauge",
      fr: "Jauge",
      es: "Calibre",
      it: "Calibro"
    },
    playerLevel: {
      en: "Player Level",
      fr: "Niveau du joueur",
      es: "Nivel del jugador",
      it: "Livello del giocatore"
    },
    gameStyle: {
      en: "Game Style",
      fr: "Style de jeu",
      es: "Estilo de juego",
      it: "Stile di gioco"
    },
    tensionBand: {
      en: "Tension Feel",
      fr: "Sensation de tension",
      es: "Sensacion de tension",
      it: "Sensazione di tensione"
    },
    racketFamily: {
      en: "Racket Fit",
      fr: "Compatibilite raquette",
      es: "Compatibilidad con raqueta",
      it: "Compatibilita con racchetta"
    },
    armFriendliness: {
      en: "Arm Friendliness",
      fr: "Confort bras",
      es: "Comodidad para el brazo",
      it: "Comfort per il braccio"
    },
    surface: {
      en: "Best Court Fit",
      fr: "Surface ideale",
      es: "Mejor pista",
      it: "Superficie ideale"
    },
    priceTier: {
      en: "Price / Value",
      fr: "Prix / valeur",
      es: "Precio / valor",
      it: "Prezzo / valore"
    }
  };
  const language = siteI18n.getLanguage();
  return labels[key]?.[language] || labels[key]?.en || key;
}

function updateLocalizedUiText() {
  const sliderTitle = document.getElementById("sliderPanelTitle");
  const sliderCopy = document.querySelector(".slider-panel-copy");
  const mobileQuickPlayerLabel = document.querySelector('label[for="mobileQuickPlayerFilter"]');
  const mobileQuickTypeLabel = document.querySelector('label[for="mobileQuickTypeFilter"]');
  const quickFiltersEyebrow = document.querySelector(".panel-header .eyebrow");
  const stringFiltersTitle = document.querySelector(".panel-header h2");

  if (sliderTitle) sliderTitle.textContent = getUiText("sliderPanelTitle", "Preference Sliders");
  if (sliderCopy) sliderCopy.textContent = getUiText("sliderPanelCopy", "Move the sliders toward what matters most and the rankings will rebalance live.");
  if (mobileQuickPlayerLabel) mobileQuickPlayerLabel.textContent = getUiText("mobileQuickPlayer", "Pro Player");
  if (mobileQuickTypeLabel) mobileQuickTypeLabel.textContent = getUiText("mobileQuickType", "String Type");
  if (quickFiltersEyebrow) quickFiltersEyebrow.textContent = getUiText("quickFiltersEyebrow", "Quick Filters");
  if (stringFiltersTitle) stringFiltersTitle.textContent = getUiText("stringFiltersTitle", "String Filters");
  if (resetButton) resetButton.textContent = getUiText("reset", "Reset");
  if (mobileFilterToggle) {
    const collapsed = filterGrid.classList.contains("is-collapsed");
    mobileFilterToggle.textContent = collapsed ? getUiText("mobileShowFilters", "Show Filters") : getUiText("mobileHideFilters", "Hide Filters");
  }
  if (sliderPanelToggle) {
    const collapsed = sliderPanelBody?.classList.contains("is-collapsed");
    sliderPanelToggle.textContent = collapsed ? getUiText("sliderShow", "Show Sliders") : getUiText("sliderHide", "Hide Sliders");
  }

  if (typeDescriptionEyebrow) typeDescriptionEyebrow.textContent = getUiText("stringTypeGuide", "String Type Guide");
  if (typeDescriptionTitle && state.type === "Any") typeDescriptionTitle.textContent = getUiText("allStringTypeTitle", "All String Types");
  if (typeDescriptionText && state.type === "Any") typeDescriptionText.textContent = getUiText("allStringTypeText", "Compare different string families to find the blend of spin, comfort, control, and power that best fits your game.");
  if (resultsTypeDescriptionEyebrow) resultsTypeDescriptionEyebrow.textContent = getUiText("stringTypeGuide", "String Type Guide");
  if (resultsTypeDescriptionTitle && state.type === "Any") resultsTypeDescriptionTitle.textContent = getUiText("allStringTypeTitle", "All String Types");
  if (resultsTypeDescriptionText && state.type === "Any") resultsTypeDescriptionText.textContent = getUiText("allStringTypeText", "Compare different string families to find the blend of spin, comfort, control, and power that best fits your game.");

  const sliderFieldLabels = document.querySelectorAll(".slider-field > span");
  const sliderScales = document.querySelectorAll(".slider-scale-labels");
  if (sliderFieldLabels[0]) sliderFieldLabels[0].textContent = getUiText("sliderPower", "Power");
  if (sliderFieldLabels[1]) sliderFieldLabels[1].textContent = getUiText("sliderSpin", "Spin");
  if (sliderFieldLabels[2]) sliderFieldLabels[2].textContent = getUiText("sliderControl", "Control");
  if (sliderFieldLabels[3]) sliderFieldLabels[3].textContent = getUiText("sliderPros", "Pro Players Using");
  sliderScales.forEach((scale, index) => {
    const spans = scale.querySelectorAll("span");
    if (spans.length !== 3) return;
    if (index === 3) {
      spans[0].textContent = getUiText("scaleFew", "Few");
    } else {
      spans[0].textContent = getUiText("scaleLow", "Low");
    }
    spans[1].textContent = getUiText("scaleBalanced", "Balanced");
    spans[2].textContent = getUiText("scaleHigh", "High");
  });

  if (mobileQuickPlayerFilter) {
    const anyOption = mobileQuickPlayerFilter.querySelector('option[value="Any"]');
    if (anyOption) anyOption.textContent = getUiText("allProPlayers", "All Pro Players");
  }
  if (mobileQuickTypeFilter) {
    const anyTypeOption = mobileQuickTypeFilter.querySelector('option[value="Any"]');
    if (anyTypeOption) anyTypeOption.textContent = getUiText("allStringTypes", "All String Types");
  }
}

function buildFilterOptions(filter, playerCoverage) {
  if (filter.key !== "atpPlayer" && filter.key !== "wtaPlayer") {
    const brandCounts = filter.key === "brand" ? getBrandFilterCounts() : null;
    return filter.options.map((option) => {
      let label = option;
      if (option === "Any" && filter.key === "type") {
        label = getUiText("allStringTypes", "All String Types");
      }
      if (option !== "Any" && filter.key === "brand") {
        const count = brandCounts[option] || 0;
        label = `${option} (${count})`;
      }
      return `<option value="${option}">${label}</option>`;
    }).join("");
  }

  const coveredPlayers = filter.key === "atpPlayer" ? playerCoverage.atp : playerCoverage.wta;
  const orderedOptions = ["Any", ...sortNamesBySurname(filter.options.filter((option) => option !== "Any"))];

  return orderedOptions.map((option) => {
    if (option === "Any") {
      return `<option value="Any">${filter.key === "atpPlayer" || filter.key === "wtaPlayer" ? getUiText("allProPlayers", "All Pro Players") : "Any"}</option>`;
    }

    const isCovered = coveredPlayers.has(option);
    const label = isCovered ? option : `${option}  |  no string yet`;
    const style = isCovered ? ` style="background:#e5f4ff;color:#134d82;font-weight:600;"` : ` style="color:#7d8ea0;"`;
    const disabled = isCovered ? "" : " disabled";
    const selected = state[filter.key] === option ? " selected" : "";

    return `<option value="${option}"${style}${disabled}${selected}>${label}</option>`;
  }).join("");
}

function getBrandFilterCounts() {
  return STRINGS.reduce((counts, entry) => {
    if (entry && entry.brand) {
      counts[entry.brand] = (counts[entry.brand] || 0) + 1;
    }
    return counts;
  }, {});
}

function buildFilterNote(filter, playerCoverage) {
  if (filter.key !== "atpPlayer" && filter.key !== "wtaPlayer") {
    return "";
  }

  const listedPlayers = filter.options.filter((option) => option !== "Any");
  const coveredPlayers = filter.key === "atpPlayer" ? playerCoverage.atp : playerCoverage.wta;
  const totalPlayers = listedPlayers.length;
  const coveredCount = listedPlayers.filter((player) => coveredPlayers.has(player)).length;
  return `<p class="field-note">${coveredCount} of ${totalPlayers} players currently have string associations.</p>`;
}

function getPlayerCoverage() {
  const customRecords = getStoredCustomProPlayers();
  const atp = new Set();
  const wta = new Set();

  STRINGS.forEach((entry) => {
    (entry.atpPlayers || []).forEach((player) => atp.add(player));
    (entry.wtaPlayers || []).forEach((player) => wta.add(player));
  });

  customRecords.forEach((record) => {
    if (record.tour === "ATP") {
      atp.add(record.name);
    }
    if (record.tour === "WTA") {
      wta.add(record.name);
    }
  });

  return { atp, wta };
}

function getStoredCustomProPlayers() {
  try {
    const raw = window.localStorage.getItem(PRO_PLAYER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function renderResults() {
  const hasHardFilters = FILTERS.some((filter) => state[filter.key] && state[filter.key] !== "Any");
  const hasSliderOnlyFocus = hasActiveSliderPreferences() && !hasHardFilters && !searchQuery && !popularOnly && !proOnly;
  const shouldRequirePositiveScore = hasHardFilters;
  const sliderScoreThreshold = hasSliderOnlyFocus ? 6.4 : 0;
  const ranked = STRINGS
    .map((entry) => ({
      string: entry,
      ...scoreString(entry)
    }))
    .filter((entry) => {
      if (shouldRequirePositiveScore && entry.score <= 0) {
        return false;
      }
      if (hasSliderOnlyFocus && entry.score < sliderScoreThreshold) {
        return false;
      }
      return matchesSearch(entry.string) && matchesPopular(entry.string) && matchesProPlayers(entry.string);
    })
    .sort(compareRankedStrings);

  renderTypeDescription();
  renderGuideMatches();
  syncFocusedMode();
  updateDatabaseCountLabels();
  const resultsTitle = document.getElementById("resultsTitle");
  if (resultsTitle) {
    resultsTitle.textContent = popularOnly
      ? siteI18n.t("resultsTitlePopular", "Most Popular Strings")
      : proOnly
        ? siteI18n.t("resultsTitlePros", "Pro Player Strings")
        : searchQuery
          ? siteI18n.t("resultsTitleSearch", "Search Results")
          : siteI18n.t("resultsTitleDefault", "String Recommendations");
  }
  const baseResultsText = popularOnly
    ? siteI18n.t("popularStringsCount", "{count} popular strings", { count: ranked.length })
    : proOnly
      ? siteI18n.t("proStringsCount", "{count} pro-player strings", { count: ranked.length })
      : searchQuery
        ? siteI18n.t("searchMatchesCount", "{count} search matches", { count: ranked.length })
        : siteI18n.t("matchesCount", "{count} matches", { count: ranked.length });
  resultsCount.textContent = hasSliderOnlyFocus
    ? siteI18n.t("sliderMatchesCount", "{count} of {total} matches", { count: ranked.length, total: STRINGS.length })
    : baseResultsText;
  if (sliderResultsSummary) {
    sliderResultsSummary.textContent = siteI18n.t("sliderShowingCount", "Showing {count} of {total} strings", { count: ranked.length, total: STRINGS.length });
  }

  if (ranked.length === 0) {
    resultsList.innerHTML = `
      <article class="empty-state">
        ${siteI18n.t("emptyResults", "No strings matched the current setup. Try relaxing one or two filters to see more options.")}
      </article>
    `;
    return;
  }

  resultsList.innerHTML = ranked
    .map(({ string, score, matchedTags }) => renderStringCard(string, score, matchedTags))
    .join("");
}

function renderGuideMatches() {
  if (!guideMatchesSection || !guideMatchesList || !guideMatchesCount) {
    return;
  }

  const matches = getGuideMatches(searchQuery);
  const showGuides = Boolean(searchQuery) && matches.length > 0;

  guideMatchesSection.hidden = !showGuides;
  if (!showGuides) {
    guideMatchesList.innerHTML = "";
    guideMatchesCount.textContent = siteI18n.t("guidesZero", "0 guides");
    return;
  }

  guideMatchesCount.textContent = matches.length === 1
    ? siteI18n.t("guidesCount", "{count} guide", { count: matches.length })
    : siteI18n.t("guidesCountPlural", "{count} guides", { count: matches.length });
  guideMatchesList.innerHTML = matches.map((guide) => `
    <a class="guide-match-card" href="${guide.href}">
      <p class="eyebrow">${siteI18n.t("referenceGuide", "Reference Guide")}</p>
      <h3>${guide.title}</h3>
      <p class="summary-copy">${guide.description}</p>
    </a>
  `).join("");
}

function getGuideMatches(query) {
  const source = String(query || "").trim().toLowerCase();
  if (!source) {
    return [];
  }

  return GUIDE_PAGES
    .map((guide) => {
      const haystack = [guide.title, guide.description, ...(guide.keywords || [])]
        .join(" ")
        .toLowerCase();

      let score = 0;
      if (guide.title.toLowerCase().includes(source)) {
        score += 6;
      }
      if (haystack.includes(source)) {
        score += 3;
      }
      for (const keyword of guide.keywords || []) {
        const normalizedKeyword = String(keyword).toLowerCase();
        if (normalizedKeyword === source) {
          score += 10;
        } else if (normalizedKeyword.includes(source) || source.includes(normalizedKeyword)) {
          score += 4;
        }
      }

      return { guide, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.guide.title.localeCompare(right.guide.title);
    })
    .slice(0, 4)
    .map((entry) => entry.guide);
}

function renderTypeDescription() {
  if (!typeDescriptionCard || !typeDescriptionEyebrow || !typeDescriptionTitle || !typeDescriptionText) {
    return;
  }

  const typeKey = state.type || "Any";
  const content = TYPE_DESCRIPTIONS[typeKey] || TYPE_DESCRIPTIONS.Any;
  const showDescription = typeKey !== "Any" && activeQuickSetupExampleIndex === -1;

  typeDescriptionCard.hidden = !showDescription;

  typeDescriptionEyebrow.textContent = content.eyebrow;
  typeDescriptionTitle.textContent = content.title;
  typeDescriptionText.textContent = content.text;

  if (resultsTypeDescriptionCard && resultsTypeDescriptionEyebrow && resultsTypeDescriptionTitle && resultsTypeDescriptionText) {
    resultsTypeDescriptionCard.hidden = !showDescription;
    resultsTypeDescriptionEyebrow.textContent = content.eyebrow;
    resultsTypeDescriptionTitle.textContent = content.title;
    resultsTypeDescriptionText.textContent = content.text;
  }
}

function matchesSearch(entry) {
  if (!searchQuery) {
    return true;
  }

  const customAssociations = getCustomProAssociations(entry);

  const haystack = [
    entry.name,
    entry.brand,
    entry.type,
    entry.stringColor,
    entry.stringShape,
    entry.playerLevel,
    entry.gameStyle,
    entry.racketFamily,
    entry.tensionBand,
    entry.surface,
    entry.priceTier,
    entry.summary,
    entry.note,
    ...(entry.atpPlayers || []),
    ...(entry.wtaPlayers || []),
    ...customAssociations.atpPlayers,
    ...customAssociations.wtaPlayers,
    ...customAssociations.tensions.map((item) => `${item.player} ${item.tension} ${item.detail}`)
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(searchQuery);
}

function matchesPopular(entry) {
  if (!popularOnly) {
    return true;
  }

  return POPULAR_STRING_NAMES.includes(entry.name);
}

function matchesProPlayers(entry) {
  if (!proOnly) {
    return true;
  }

  const customAssociations = getCustomProAssociations(entry);
  return (entry.atpPlayers && entry.atpPlayers.length > 0)
    || (entry.wtaPlayers && entry.wtaPlayers.length > 0)
    || customAssociations.atpPlayers.length > 0
    || customAssociations.wtaPlayers.length > 0;
}

function syncPopularButton() {
  if (!popularStringsButton) {
    return;
  }

  popularStringsButton.classList.toggle("is-active", popularOnly);
}

function syncProButton() {
  if (!proPlayersButton) {
    return;
  }

  proPlayersButton.classList.toggle("is-active", proOnly);
}

function syncClearSearchButton() {
  if (!clearSearchButton) {
    return;
  }

  clearSearchButton.hidden = !searchQuery;
}

function syncFocusedMode() {
  const selectedPlayer = state.atpPlayer !== "Any" ? state.atpPlayer : state.wtaPlayer !== "Any" ? state.wtaPlayer : "";
  const hasSliderFocus = hasActiveSliderPreferences();
  const isFocused = popularOnly || proOnly || Boolean(searchQuery) || state.type !== "Any" || Boolean(selectedPlayer) || hasSliderFocus;
  const hasPrimaryMainMode = popularOnly || proOnly;
  const hasActiveExampleFocus = activeQuickSetupExampleIndex !== -1
    && QUICK_SETUP_EXAMPLES[activeQuickSetupExampleIndex]?.player === selectedPlayer;
  const showStandaloneToolsToggle = !hasPrimaryMainMode && toolsHiddenForPrimaryModes;
  const modeLabel = popularOnly
    ? siteI18n.t("activePopular", "Showing 20 Most Popular")
    : proOnly
      ? siteI18n.t("activePros", "Showing Pro Player Strings")
      : searchQuery
        ? siteI18n.t("activeSearch", 'Searching for "{query}"', { query: searchQuery })
        : selectedPlayer
          ? siteI18n.t("activeShowing", "Showing {value}", { value: selectedPlayer })
          : state.type !== "Any"
            ? siteI18n.t("activeShowing", "Showing {value}", { value: state.type })
            : siteI18n.t("activeSliders", "Using preference sliders");
  const showModePill = !(hasPrimaryMainMode && !toolsHiddenForPrimaryModes) && !hasActiveExampleFocus;
  const hasActiveModeControls = showModePill || hasPrimaryMainMode;

  if (heroSection) {
    heroSection.classList.toggle("is-results-focused", isFocused);
  }

  if (layoutGrid) {
    layoutGrid.classList.toggle("is-results-focused", isFocused);
  }

  if (mobileQuickTypeRow) {
    mobileQuickTypeRow.hidden = Boolean(selectedPlayer);
  }

  if (toolWorkbench) {
    toolWorkbench.hidden = toolsHiddenForPrimaryModes;
  }

  if (toolWorkbenchToggleRow) {
    toolWorkbenchToggleRow.hidden = !showStandaloneToolsToggle;
  }

  if (toolWorkbenchToggleButton) {
    toolWorkbenchToggleButton.textContent = siteI18n.t("showTools", "Show Tools");
  }

  if (toolWorkbenchHeaderToggleButton) {
    toolWorkbenchHeaderToggleButton.hidden = hasPrimaryMainMode || toolsHiddenForPrimaryModes;
    toolWorkbenchHeaderToggleButton.textContent = siteI18n.t("hideTools", "Hide Tools");
  }

  if (heroHomeButton) {
    heroHomeButton.hidden = !isFocused;
  }

  if (activeModeBar) {
    if (!isFocused || !hasActiveModeControls) {
      activeModeBar.hidden = true;
      activeModeBar.innerHTML = "";
    } else {
      activeModeBar.hidden = false;
      activeModeBar.innerHTML = `
        ${showModePill ? `<span class="active-mode-pill">${modeLabel}</span>` : ""}
        ${hasPrimaryMainMode ? `<button class="active-mode-clear active-mode-tools-toggle" type="button">${toolsHiddenForPrimaryModes ? siteI18n.t("showTools", "Show Tools") : siteI18n.t("hideTools", "Hide Tools")}</button>` : ""}
      `;

      const toolsToggleButton = activeModeBar.querySelector(".active-mode-tools-toggle");
      if (toolsToggleButton) {
        toolsToggleButton.addEventListener("click", () => {
          toolsHiddenForPrimaryModes = !toolsHiddenForPrimaryModes;
          syncFocusedMode();
        });
      }
    }
  }

  const shouldAutoScrollResults = isFocused && !searchQuery;
  if (shouldAutoScrollResults) {
    scrollToResultsOnMobile();
  }
}

function hasActiveSliderPreferences() {
  return false;
}

function getActiveSliderKeys() {
  return [];
}

function compareRankedStrings(left, right) {
  if (proOnly) {
    const proCountDifference = getKnownProPlayerCount(right.string) - getKnownProPlayerCount(left.string);
    if (proCountDifference !== 0) {
      return proCountDifference;
    }
  }

  const scoreDifference = right.score - left.score;
  if (Math.abs(scoreDifference) > 0.001) {
    return scoreDifference;
  }

  const activeSliderKeys = getActiveSliderKeys();
  for (const key of activeSliderKeys) {
    const preferredDirection = Number(sliderPreferences[key]) >= 5 ? "desc" : "asc";
    const leftValue = getSliderMetricSortValue(left.string, key);
    const rightValue = getSliderMetricSortValue(right.string, key);

    if (leftValue !== rightValue) {
      return preferredDirection === "desc" ? rightValue - leftValue : leftValue - rightValue;
    }
  }

  return left.string.name.localeCompare(right.string.name);
}

function getSliderMetricSortValue(entry, key) {
  if (key === "proPlayers") {
    return getKnownProPlayerCount(entry);
  }

  return mapStringLevelToNumeric(entry[key]);
}

function scrollToResultsOnMobile() {
  if (!resultsPanel || typeof window === "undefined" || window.innerWidth > 760 || sliderInteractionActive) {
    return;
  }

  window.requestAnimationFrame(() => {
    resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function applyPlannerSelection(nextFilters = {}) {
  FILTERS.forEach((filter) => {
    state[filter.key] = nextFilters[filter.key] || "Any";
    const select = document.getElementById(`filter-${filter.key}`);
    if (select) {
      select.value = state[filter.key];
    }
  });

  searchQuery = "";
  popularOnly = false;
  proOnly = false;
  toolsHiddenForPrimaryModes = false;
  autoCollapsedToolsForSearch = false;
  toolsHiddenBeforeSearch = false;

  if (stringSearchInput) {
    stringSearchInput.value = "";
  }

  syncClearSearchButton();
  syncPopularButton();
  syncProButton();
  syncTypeMenu();
  syncMobileQuickPlayerFilter();
  syncMobileQuickTypeFilter();

  if (hasPlannerSurface) {
    renderResults();
  }
}

function resetToMainChoices() {
  applyPlannerSelection();
}

function syncTypeMenu() {
  if (!typeMenu) {
    return;
  }

  typeMenu.querySelectorAll("[data-type]").forEach((button) => {
    button.classList.toggle("is-active", (button.dataset.type || "Any") === state.type);
  });
}

document.addEventListener("tsl-language-change", () => {
  if (!(filterGrid && resultsList && resultsCount && databaseCount && resetButton)) {
    return;
  }

  updateLocalizedUiText();
  updateHomepageStaticTranslations();
  renderFilters();
  populateMobileQuickPlayerFilter();
  syncMobileQuickPlayerFilter();
  syncMobileQuickTypeFilter();
  renderResults();
});

function scoreString(entry) {
  const activeFilters = FILTERS.filter((filter) => state[filter.key] && state[filter.key] !== "Any");
  const weights = {
    brand: 1.2,
    type: 1.8,
    stringColor: 1.1,
    stringShape: 1.1,
    spin: 1.7,
    power: 1.5,
    control: 1.8,
    durability: 1.5,
    comfort: 1.4,
    feel: 1.1,
    gauge: 1.1,
    playerLevel: 1.6,
    gameStyle: 1.7,
    tensionBand: 1.2,
    racketFamily: 1.7,
    atpPlayer: 1.3,
    wtaPlayer: 1.3,
    armFriendliness: 1.4,
    surface: 1.1,
    priceTier: 0.9
  };

  if (activeFilters.length === 0) {
    return {
      score: 10,
      matchedTags: buildMatchedTags(entry, FILTERS.slice(0, 6))
    };
  }

  let matchedWeight = 0;
  let totalWeight = 0;
  const matchedTags = [];

  for (const filter of activeFilters) {
    const weight = weights[filter.key] || 1;
    const matchesFilter = doesStringMatchFilter(entry, filter.key, state[filter.key]);

    if (strictFilterKeys.has(filter.key) && !matchesFilter) {
      return {
        score: 0,
        matchedTags: []
      };
    }

    totalWeight += weight;

    if (matchesFilter) {
      matchedWeight += weight;
      matchedTags.push({
        label: filter.label,
        value: getFilterDisplayValue(entry, filter.key)
      });
    }
  }

  const baseScore = totalWeight > 0 ? (matchedWeight / totalWeight) * 10 : 0;

  return {
    score: Math.max(0, Math.min(10, baseScore)),
    matchedTags: matchedTags.length > 0 ? matchedTags : buildMatchedTags(entry, FILTERS.slice(0, 5))
  };
}

function calculateSliderPreferenceScore(entry) {
  const targets = {
    power: mapStringLevelToNumeric(entry.power),
    spin: mapStringLevelToNumeric(entry.spin),
    control: mapStringLevelToNumeric(entry.control),
    proPlayers: mapProPlayerCountToNumeric(getKnownProPlayerCount(entry))
  };

  const activeSliderKeys = Object.keys(sliderPreferences).filter((key) => Number(sliderPreferences[key]) !== 5);

  if (!activeSliderKeys.length) {
    return 5;
  }

  const weightedScores = activeSliderKeys.map((key) => {
    const desired = mapSliderToTarget(sliderPreferences[key]);
    const difference = Math.abs(targets[key] - desired);
    return Math.max(0, 1 - difference / 4);
  });

  const average = weightedScores.reduce((sum, value) => sum + value, 0) / weightedScores.length;
  return average * 10;
}

function mapSliderToTarget(value) {
  return (Number(value || 5) / 10) * 4;
}

function mapStringLevelToNumeric(value) {
  const scale = {
    Low: 1,
    Medium: 2,
    High: 3,
    "Very High": 4
  };

  return scale[value] || 2;
}

function getKnownProPlayerCount(entry) {
  const customAssociations = getCustomProAssociations(entry);
  return mergeUniqueStrings(
    [...(entry.atpPlayers || []), ...(entry.wtaPlayers || [])],
    [...customAssociations.atpPlayers, ...customAssociations.wtaPlayers]
  ).length;
}

function mapProPlayerCountToNumeric(count) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function doesStringMatchFilter(entry, key, selectedValue) {
  if (!selectedValue || selectedValue === "Any") {
    return true;
  }

  const customAssociations = getCustomProAssociations(entry);

  if (key === "atpPlayer") {
    return mergeUniqueStrings(entry.atpPlayers || [], customAssociations.atpPlayers).includes(selectedValue);
  }

  if (key === "wtaPlayer") {
    return mergeUniqueStrings(entry.wtaPlayers || [], customAssociations.wtaPlayers).includes(selectedValue);
  }

  return entry[key] === selectedValue;
}

function buildMatchedTags(entry, filters) {
  return filters.map((filter) => ({
    label: filter.label,
    value: getFilterDisplayValue(entry, filter.key)
  }));
}

function getFilterDisplayValue(entry, key) {
  const customAssociations = getCustomProAssociations(entry);

  if (key === "atpPlayer") {
    const atpPlayers = sortNamesBySurname(mergeUniqueStrings(entry.atpPlayers || [], customAssociations.atpPlayers));
    return atpPlayers.length > 0 ? atpPlayers.join(", ") : "No ATP player noted yet";
  }

  if (key === "wtaPlayer") {
    const wtaPlayers = sortNamesBySurname(mergeUniqueStrings(entry.wtaPlayers || [], customAssociations.wtaPlayers));
    return wtaPlayers.length > 0 ? wtaPlayers.join(", ") : "No WTA player noted yet";
  }

  return entry[key];
}

function renderStringCard(entry, score, matchedTags) {
  const fallbackImage = entry.fallbackImage || createStringImage(entry.name, entry.imageTone);
  const customAssociations = getCustomProAssociations(entry);
  const atpPlayers = sortNamesBySurname(mergeUniqueStrings(entry.atpPlayers || [], customAssociations.atpPlayers));
  const wtaPlayers = sortNamesBySurname(mergeUniqueStrings(entry.wtaPlayers || [], customAssociations.wtaPlayers));
  const allProPlayers = sortNamesBySurname(mergeUniqueStrings(atpPlayers, wtaPlayers));
  const totalProPlayers = allProPlayers.length;
  const proBadgeTitle = totalProPlayers ? escapeHtml(allProPlayers.join(", ")) : "No pros listed";
  const proTensions = [...(entry.proTensions || []), ...customAssociations.tensions];
  const proRackets = [...(entry.proRackets || []), ...customAssociations.rackets];
  const compactMatchedTags = matchedTags.filter((tag) => tag.label !== "ATP Player" && tag.label !== "WTA Player");
  const officialLink = getOfficialStringLink(entry);
  const amazonSetLink = getAmazonSetLink(entry);
  const amazonReelLink = getAmazonReelLink(entry);

  return `
    <details class="result-card result-card-collapsible">
      <summary class="result-summary">
        <div class="result-summary-main">
          <div class="plant-image plant-image-compact">
            <img
              src="${entry.image}"
              alt="${entry.name}"
              data-fallback="${fallbackImage}"
              onerror="this.onerror=null;this.src=this.dataset.fallback;"
            >
          </div>
          <div class="result-title">
            <h3>${entry.name}</h3>
            <p class="latin-name">${entry.brand} | ${entry.type} | ${entry.gauge}</p>
          </div>
        </div>
        <div class="result-badge-stack">
          ${totalProPlayers > 0 ? `
            <div class="pro-count-badge" aria-label="${totalProPlayers} pro players use this string" title="${proBadgeTitle}">
              <span>${totalProPlayers}</span>
              <small>Pros</small>
              <div class="pro-count-tooltip">${proBadgeTitle}</div>
            </div>
          ` : ""}
          <div class="score-pill">
            <span>${score.toFixed(1)}/10</span>
            <small>Match Score</small>
          </div>
          <div class="result-details-action">
            <span class="details-label">Details</span>
            <span class="hide-label">Hide</span>
          </div>
        </div>
      </summary>
      <div class="result-content">
        <p class="summary-copy">${entry.summary}</p>
        <p class="summary-note">${entry.note}</p>
        <div class="tag-grid">
          <span class="tag"><strong>Spin:</strong> ${entry.spin}</span>
          <span class="tag"><strong>Power:</strong> ${entry.power}</span>
          <span class="tag"><strong>Control:</strong> ${entry.control}</span>
          <span class="tag"><strong>Durability:</strong> ${entry.durability}</span>
          <span class="tag"><strong>Color:</strong> ${entry.stringColor}</span>
          <span class="tag"><strong>Shape:</strong> ${entry.stringShape}</span>
          <span class="tag"><strong>Tension:</strong> ${entry.tensionBand}</span>
          <span class="tag"><strong>Value:</strong> ${entry.priceTier}</span>
          <span class="tag"><strong>Set:</strong> ${formatPrice(entry.costPerSet)}</span>
          <span class="tag"><strong>Reel:</strong> ${formatPrice(entry.costPerReel)}</span>
          <span class="tag"><strong>Racket Fit:</strong> ${entry.racketFamily}</span>
          ${compactMatchedTags.map((tag) => `<span class="tag"><strong>${tag.label}:</strong> ${tag.value}</span>`).join("")}
        </div>
        <div class="result-actions">
          ${officialLink ? `<a class="secondary-button compact-button official-brand-button" href="${officialLink}" target="_blank" rel="noopener noreferrer">Official Brand Page</a>` : ""}
          <a class="secondary-button compact-button result-buy-link amazon-buy-button" href="${amazonSetLink}" target="_blank" rel="noopener noreferrer">Buy Set</a>
          <a class="secondary-button compact-button amazon-buy-button" href="${amazonReelLink}" target="_blank" rel="noopener noreferrer">Buy Reel</a>
        </div>
        <div class="pro-player-panel">
          <div class="pro-player-tag">
            <strong>ATP:</strong> ${atpPlayers.length > 0 ? atpPlayers.join(", ") : "None listed"}
          </div>
          <div class="pro-player-tag">
            <strong>WTA:</strong> ${wtaPlayers.length > 0 ? wtaPlayers.join(", ") : "None listed"}
          </div>
          ${proTensions.length > 0 ? `
            <div class="pro-tension-box">
              <strong>Known Pro Tensions</strong>
              <div class="pro-tension-list">
                ${proTensions.map((item) => `
                  <div class="pro-tension-item">
                    <span class="pro-tension-player">${item.player}</span>
                    <span class="pro-tension-detail">${item.detail}</span>
                    <span class="pro-tension-value">${item.tension}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}
          ${proRackets.length > 0 ? `
            <div class="pro-tension-box">
              <strong>Known Pro Rackets</strong>
              <div class="pro-tension-list">
                ${proRackets.map((item) => `
                  <div class="pro-tension-item">
                    <span class="pro-tension-player">${item.player}</span>
                    <span class="pro-tension-value">${item.racket}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    </details>
  `;
}

function getCustomProAssociations(entry) {
  const records = getCustomProPlayers().filter((record) => record.stringName === entry.name);
  return {
    atpPlayers: records.filter((record) => record.tour === "ATP").map((record) => record.name),
    wtaPlayers: records.filter((record) => record.tour === "WTA").map((record) => record.name),
    tensions: records.map((record) => ({
      player: record.name,
      detail: record.note || `Saved ${record.tour} note`,
      tension: record.tension
    })),
    rackets: records
      .filter((record) => record.racket)
      .map((record) => ({
        player: record.name,
        racket: record.racket
      }))
  };
}

function getCustomProPlayers() {
  try {
    const raw = window.localStorage.getItem(PRO_PLAYER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mergeUniqueStrings(primary, secondary) {
  return [...new Set([...(primary || []), ...(secondary || [])])];
}

function sortNamesBySurname(names) {
  return [...(names || [])].sort((left, right) => {
    const leftKey = getSurnameSortKey(left);
    const rightKey = getSurnameSortKey(right);

    if (leftKey !== rightKey) {
      return leftKey.localeCompare(rightKey);
    }

    return String(left || "").localeCompare(String(right || ""));
  });
}

function getSurnameSortKey(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return String(name || "").toLowerCase();
  }

  const surnameParts = [parts[parts.length - 1]];
  let index = parts.length - 2;
  const surnamePrefixes = new Set(["de", "del", "della", "di", "du", "la", "le", "van", "von"]);

  while (index >= 0 && surnamePrefixes.has(parts[index].toLowerCase())) {
    surnameParts.unshift(parts[index]);
    index -= 1;
  }

  return surnameParts.join(" ").toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function stringEntry(name, attributes) {
  const estimatedPricing = estimateStringPricing(attributes);
  const normalizedAttributes = {
    atpPlayers: attributes.atpPlayers || [],
    wtaPlayers: attributes.wtaPlayers || [],
    proTensions: attributes.proTensions || [],
    proRackets: attributes.proRackets || [],
    costPerSet: attributes.costPerSet ?? estimatedPricing.costPerSet,
    costPerReel: attributes.costPerReel ?? estimatedPricing.costPerReel,
    stringColor: attributes.stringColor || resolveStringColor(name, attributes),
    officialUrl: attributes.officialUrl || "",
    amazonSetUrl: attributes.amazonSetUrl || "",
    amazonReelUrl: attributes.amazonReelUrl || "",
    ...attributes
  };
  const resolvedImage = resolveStringImage(name, normalizedAttributes);
  const fallbackImage = createStringImage(name, normalizedAttributes.imageTone, normalizedAttributes.stringColor, normalizedAttributes.brand);

  return {
    name,
    image: resolvedImage,
    fallbackImage,
    ...normalizedAttributes
  };
}

function getOfficialStringLink(entry) {
  if (entry.officialUrl) {
    return entry.officialUrl;
  }

  return OFFICIAL_BRAND_PAGES[entry.brand] || "";
}

function getAmazonSetLink(entry) {
  if (entry.amazonSetUrl) {
    return entry.amazonSetUrl;
  }

  return buildAmazonSearchUrl(entry, "set");
}

function getAmazonReelLink(entry) {
  if (entry.amazonReelUrl) {
    return entry.amazonReelUrl;
  }

  return buildAmazonSearchUrl(entry, "reel");
}

function buildAmazonSearchUrl(entry, format) {
  const suffix = format === "reel" ? " reel tennis string" : " set tennis string";
  const query = `${entry.brand} ${entry.name}${suffix}`;
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
}

function estimateStringPricing(attributes) {
  const type = attributes.type || "";
  const tier = attributes.priceTier || "Mid-Range";

  const pricingMatrix = {
    Premium: {
      Poly: { set: 22, reel: 280 },
      "Co-Poly": { set: 21, reel: 260 },
      "Synthetic Gut": { set: 8, reel: 70 },
      Multifilament: { set: 22, reel: 270 },
      "Natural Gut": { set: 45, reel: 0 },
      Hybrid: { set: 32, reel: 0 }
    },
    "Mid-Range": {
      Poly: { set: 16, reel: 150 },
      "Co-Poly": { set: 15, reel: 145 },
      "Synthetic Gut": { set: 6, reel: 45 },
      Multifilament: { set: 14, reel: 135 },
      "Natural Gut": { set: 35, reel: 0 },
      Hybrid: { set: 24, reel: 0 }
    },
    Budget: {
      Poly: { set: 10, reel: 80 },
      "Co-Poly": { set: 10, reel: 85 },
      "Synthetic Gut": { set: 4, reel: 35 },
      Multifilament: { set: 9, reel: 90 },
      "Natural Gut": { set: 30, reel: 0 },
      Hybrid: { set: 18, reel: 0 }
    }
  };

  const tierPricing = pricingMatrix[tier] || pricingMatrix["Mid-Range"];
  const typePricing = tierPricing[type] || tierPricing["Co-Poly"];

  return {
    costPerSet: typePricing.set,
    costPerReel: typePricing.reel
  };
}

function formatPrice(value) {
  if (!value) {
    return "Varies";
  }

  return `$${Number(value).toFixed(0)}`;
}

function resolveStringColor(name, attributes) {
  if (attributes.stringColor) {
    return attributes.stringColor;
  }

  return STRING_COLOR_OVERRIDES[name] || "Natural";
}

function resolveStringImage(name, attributes) {
  const explicitImage = attributes.image || attributes.imageUrl || attributes.photo || attributes.photoUrl;
  if (explicitImage) {
    return explicitImage;
  }

  const localSource = attributes.imagePath || attributes.photoPath || attributes.imageFile || attributes.photoFile;
  if (localSource) {
    return normalizeImagePath(localSource);
  }

  const storedImage = getStoredStringImage(name);
  if (storedImage) {
    return storedImage;
  }

  return createStringImage(name, attributes.imageTone);
}

function normalizeImagePath(path) {
  if (/^(data:|https?:\/\/|\.\/|\/)/i.test(path)) {
    return path;
  }

  return `./images/${path}`;
}

function getStoredStringImage(name) {
  try {
    return window.localStorage.getItem(`${IMAGE_STORAGE_PREFIX}${slugifyName(name)}`) || "";
  } catch {
    return "";
  }
}

function slugifyName(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createStringImage(name, tone, stringColor, brand) {
  const accent = stringColor || "Natural";
  const fill = STRING_COLOR_HEX[accent] || tone || "#d7f36a";
  const safeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 420">
      <rect width="500" height="420" rx="32" fill="#eef5ff"/>
      <ellipse cx="250" cy="214" rx="152" ry="138" fill="#c9d2db" opacity="0.32"/>
      <circle cx="250" cy="196" r="140" fill="#f5f6f8" stroke="#bcc4cb" stroke-width="6"/>
      <circle cx="250" cy="196" r="110" fill="none" stroke="${fill}" stroke-width="30"/>
      <circle cx="250" cy="196" r="94" fill="none" stroke="${fill}" stroke-width="4" opacity="0.75"/>
      <circle cx="250" cy="196" r="82" fill="none" stroke="${fill}" stroke-width="4" opacity="0.75"/>
      <circle cx="250" cy="196" r="70" fill="none" stroke="${fill}" stroke-width="4" opacity="0.75"/>
      <circle cx="250" cy="196" r="58" fill="none" stroke="${fill}" stroke-width="4" opacity="0.75"/>
      <circle cx="250" cy="196" r="48" fill="#d7dce1" stroke="#9aa4ad" stroke-width="4"/>
      <circle cx="250" cy="196" r="38" fill="#eceff2" stroke="#ffffff" stroke-width="2"/>
      <rect x="198" y="160" width="104" height="24" rx="8" fill="#2f3338"/>
      <text x="250" y="176" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="#ffffff">${brand || "STRING"}</text>
      <text x="250" y="197" text-anchor="middle" font-family="Arial" font-size="9" font-weight="700" fill="#46525d">${accent.toUpperCase()}</text>
      <text x="250" y="210" text-anchor="middle" font-family="Arial" font-size="8" fill="#5d6771">TENNIS STRING</text>
      <circle cx="250" cy="224" r="11" fill="#d84747"/>
      <text x="250" y="228" text-anchor="middle" font-family="Arial" font-size="8" font-weight="700" fill="#ffffff">${accent.charAt(0)}</text>
      <rect x="88" y="332" width="324" height="30" rx="15" fill="#ffffff" stroke="#d3dce6"/>
      <text x="250" y="352" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="#17385c">${name}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(safeSvg)}`;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 420">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f8fbff"/>
          <stop offset="100%" stop-color="#ddeafb"/>
        </linearGradient>
        <radialGradient id="shadow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </linearGradient>
        <radialGradient id="reelRing" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="65%" stop-color="#edf1f4"/>
          <stop offset="100%" stop-color="#cfd7de"/>
        </linearGradient>
        <radialGradient id="centerDisc" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stop-color="#f3f5f7"/>
          <stop offset="70%" stop-color="#c8ced4"/>
          <stop offset="100%" stop-color="#9aa4ad"/>
        </radialGradient>
        <linearGradient id="labelBand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#4a4f56"/>
          <stop offset="100%" stop-color="#20252b"/>
        </linearGradient>
      </defs>
      <rect width="500" height="420" rx="32" fill="url(#bg)"/>
      <ellipse cx="250" cy="218" rx="164" ry="148" fill="url(#shadow)"/>
      <circle cx="250" cy="202" r="142" fill="url(#reelRing)" stroke="#bcc4cb" stroke-width="6"/>
      <circle cx="250" cy="202" r="112" fill="none" stroke="${fill}" stroke-width="28"/>
      <circle cx="250" cy="202" r="97" fill="none" stroke="${fill}" stroke-width="5" opacity="0.75"/>
      <circle cx="250" cy="202" r="84" fill="none" stroke="${fill}" stroke-width="5" opacity="0.75"/>
      <circle cx="250" cy="202" r="71" fill="none" stroke="${fill}" stroke-width="5" opacity="0.75"/>
      <circle cx="250" cy="202" r="58" fill="none" stroke="${fill}" stroke-width="5" opacity="0.75"/>
      <circle cx="250" cy="202" r="50" fill="url(#centerDisc)" stroke="#8a939b" stroke-width="4"/>
      <circle cx="250" cy="202" r="41" fill="#d9dee3" stroke="#ffffff" stroke-width="2"/>
      <rect x="205" y="166" width="90" height="26" rx="8" fill="url(#labelBand)"/>
      <text x="250" y="183" text-anchor="middle" font-family="Segoe UI, Arial" font-size="13" font-weight="700" fill="#ffffff">${brand || "STRING"}</text>
      <text x="250" y="206" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8.8" font-weight="700" fill="#35414d">${accent.toUpperCase()}</text>
      <text x="250" y="218" text-anchor="middle" font-family="Segoe UI, Arial" font-size="7.6" fill="#4e5b68">TENNIS STRING</text>
      <circle cx="250" cy="231" r="12" fill="#bf2c2c"/>
      <circle cx="250" cy="231" r="9" fill="#e54a4a"/>
      <text x="250" y="235" text-anchor="middle" font-family="Segoe UI, Arial" font-size="8" font-weight="700" fill="#ffffff">${accent.charAt(0)}</text>
      <rect x="92" y="334" width="316" height="30" rx="15" fill="#ffffff" fill-opacity="0.76" stroke="#d3dce6"/>
      <text x="250" y="354" text-anchor="middle" font-family="Segoe UI, Arial" font-size="19" font-weight="600" fill="#17385c">${name}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

