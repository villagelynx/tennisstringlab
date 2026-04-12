(function () {
  const VISITOR_KEY = "tsl_visitor_id_v1";
  const SESSION_PREFIX = "tsl_visit_sent:";
  const TRACK_ENDPOINT = "/.netlify/functions/track-visit";
  const LANGUAGE_KEY = "tsl_site_language_v1";
  const SUPPORTED_LANGUAGES = ["en", "fr", "es", "it"];
  const LANGUAGE_LABELS = {
    en: "EN",
    fr: "FR",
    es: "ES",
    it: "IT"
  };
  const LANGUAGE_FLAGS = {
    en: "🇬🇧",
    fr: "🇫🇷",
    es: "🇪🇸",
    it: "🇮🇹"
  };

  normalizeHomeLinksForLocalFiles();

  function normalizeHomeLinksForLocalFiles() {
    if (!window.location || window.location.protocol !== "file:") {
      return;
    }

    document.querySelectorAll('a[href="/"]').forEach((link) => {
      link.setAttribute("href", "./index.html");
    });
  }

  const GUIDE_LINK_TRANSLATIONS = {
    en: {
      home: "Home Page",
      stringTypes: "String Types",
      tension: "Tension Guide",
      gauge: "Gauge Guide",
      hybrid: "Hybrid Guide",
      armFriendly: "Arm-Friendly",
      shape: "String Shape",
      restring: "How Often to Restring",
      playerType: "Player Type Guide",
      bestByNeed: "Best by Need",
      comparisons: "Comparisons"
    },
    fr: {
      home: "Accueil",
      stringTypes: "Types de cordage",
      tension: "Guide de tension",
      gauge: "Guide de jauge",
      hybrid: "Guide des hybrides",
      armFriendly: "Confort du bras",
      shape: "Forme du cordage",
      restring: "Quand recorder",
      playerType: "Guide par profil",
      bestByNeed: "Selon le besoin",
      comparisons: "Comparaisons"
    },
    es: {
      home: "Inicio",
      stringTypes: "Tipos de cuerda",
      tension: "Guia de tension",
      gauge: "Guia de calibre",
      hybrid: "Guia de hibridos",
      armFriendly: "Brazo y confort",
      shape: "Forma de cuerda",
      restring: "Cuando reencordar",
      playerType: "Guia por perfil",
      bestByNeed: "Segun la necesidad",
      comparisons: "Comparaciones"
    },
    it: {
      home: "Home",
      stringTypes: "Tipi di corda",
      tension: "Guida alla tensione",
      gauge: "Guida al calibro",
      hybrid: "Guida agli ibridi",
      armFriendly: "Comfort per il braccio",
      shape: "Forma della corda",
      restring: "Quando reincordare",
      playerType: "Guida per profilo",
      bestByNeed: "In base all'esigenza",
      comparisons: "Confronti"
    }
  };

  const DYNAMIC_TRANSLATIONS = {
    en: {
      resultsTitleDefault: "String Recommendations",
      resultsTitlePopular: "Most Popular Strings",
      resultsTitlePros: "Pro Player Strings",
      resultsTitleSearch: "Search Results",
      popularStringsCount: "{count} popular strings",
      proStringsCount: "{count} pro-player strings",
      searchMatchesCount: "{count} search matches",
      matchesCount: "{count} matches",
      sliderMatchesCount: "{count} of {total} matches",
      sliderShowingCount: "Showing {count} of {total} strings",
      emptyResults: "No strings matched the current setup. Try relaxing one or two filters to see more options.",
      guidesZero: "0 guides",
      guidesCount: "{count} guide",
      guidesCountPlural: "{count} guides",
      referenceGuide: "Reference Guide",
      activePopular: "Showing 20 Most Popular",
      activePros: "Showing Pro Player Strings",
      activeSearch: "Searching for \"{query}\"",
      activeShowing: "Showing {value}",
      activeSliders: "Using preference sliders",
      backToMainChoices: "Back to main choices",
      masterDatabaseCount: "{count} strings in database",
      masterShownCount: "{count} shown",
      masterEmpty: "No strings matched that search. Try a different brand, type, or search term.",
      masterHeadName: "String Name",
      masterHeadBrand: "Brand",
      masterHeadType: "Type",
      masterHeadPros: "Pro Players",
      masterHeadDetails: "Details",
      masterUnknown: "Unknown",
      masterDetails: "Details",
      masterHide: "Hide",
      masterSet: "Set:",
      masterReel: "Reel:",
      masterProsUsing: "Pro Players Using",
      masterKnownTensions: "Known Pro Tensions",
      masterKnownRackets: "Known Pro Rackets",
      masterNoneListed: "None listed",
      typeGuideDescriptions: "{count} descriptions"
    },
    fr: {
      resultsTitleDefault: "Recommandations de cordage",
      resultsTitlePopular: "Cordages les plus populaires",
      resultsTitlePros: "Cordages des pros",
      resultsTitleSearch: "Resultats de recherche",
      popularStringsCount: "{count} cordages populaires",
      proStringsCount: "{count} cordages de pros",
      searchMatchesCount: "{count} resultats",
      matchesCount: "{count} correspondances",
      sliderMatchesCount: "{count} sur {total} correspondances",
      sliderShowingCount: "{count} cordages affiches sur {total}",
      emptyResults: "Aucun cordage ne correspond a la configuration actuelle. Essayez d'assouplir un ou deux filtres.",
      guidesZero: "0 guides",
      guidesCount: "{count} guide",
      guidesCountPlural: "{count} guides",
      referenceGuide: "Guide de reference",
      activePopular: "Affichage des 20 plus populaires",
      activePros: "Affichage des cordages des pros",
      activeSearch: "Recherche de \"{query}\"",
      activeShowing: "Affichage de {value}",
      activeSliders: "Utilisation des curseurs de preference",
      backToMainChoices: "Retour aux choix principaux",
      masterDatabaseCount: "{count} cordages dans la base",
      masterShownCount: "{count} affiches",
      masterEmpty: "Aucun cordage ne correspond a cette recherche. Essayez une autre marque, un autre type ou un autre terme.",
      masterHeadName: "Nom du cordage",
      masterHeadBrand: "Marque",
      masterHeadType: "Type",
      masterHeadPros: "Joueurs pros",
      masterHeadDetails: "Details",
      masterUnknown: "Inconnu",
      masterDetails: "Details",
      masterHide: "Masquer",
      masterSet: "Set :",
      masterReel: "Bobine :",
      masterProsUsing: "Pros utilisant ce cordage",
      masterKnownTensions: "Tensions pros connues",
      masterKnownRackets: "Raquettes pros connues",
      masterNoneListed: "Aucun",
      typeGuideDescriptions: "{count} descriptions"
    },
    es: {
      resultsTitleDefault: "Recomendaciones de cuerda",
      resultsTitlePopular: "Cuerdas mas populares",
      resultsTitlePros: "Cuerdas de profesionales",
      resultsTitleSearch: "Resultados de busqueda",
      popularStringsCount: "{count} cuerdas populares",
      proStringsCount: "{count} cuerdas de pros",
      searchMatchesCount: "{count} resultados",
      matchesCount: "{count} coincidencias",
      sliderMatchesCount: "{count} de {total} coincidencias",
      sliderShowingCount: "Mostrando {count} de {total} cuerdas",
      emptyResults: "Ninguna cuerda coincide con la configuracion actual. Intenta relajar uno o dos filtros.",
      guidesZero: "0 guias",
      guidesCount: "{count} guia",
      guidesCountPlural: "{count} guias",
      referenceGuide: "Guia de referencia",
      activePopular: "Mostrando las 20 mas populares",
      activePros: "Mostrando cuerdas de profesionales",
      activeSearch: "Buscando \"{query}\"",
      activeShowing: "Mostrando {value}",
      activeSliders: "Usando deslizadores de preferencia",
      backToMainChoices: "Volver a las opciones principales",
      masterDatabaseCount: "{count} cuerdas en la base",
      masterShownCount: "{count} mostradas",
      masterEmpty: "Ninguna cuerda coincide con esa busqueda. Prueba otra marca, tipo o termino.",
      masterHeadName: "Nombre de la cuerda",
      masterHeadBrand: "Marca",
      masterHeadType: "Tipo",
      masterHeadPros: "Profesionales",
      masterHeadDetails: "Detalles",
      masterUnknown: "Desconocido",
      masterDetails: "Detalles",
      masterHide: "Ocultar",
      masterSet: "Set:",
      masterReel: "Rollo:",
      masterProsUsing: "Profesionales que la usan",
      masterKnownTensions: "Tensiones conocidas",
      masterKnownRackets: "Raquetas conocidas",
      masterNoneListed: "Ninguno",
      typeGuideDescriptions: "{count} descripciones"
    },
    it: {
      resultsTitleDefault: "Consigli corde",
      resultsTitlePopular: "Corde piu popolari",
      resultsTitlePros: "Corde dei professionisti",
      resultsTitleSearch: "Risultati di ricerca",
      popularStringsCount: "{count} corde popolari",
      proStringsCount: "{count} corde dei professionisti",
      searchMatchesCount: "{count} risultati",
      matchesCount: "{count} corrispondenze",
      sliderMatchesCount: "{count} su {total} corrispondenze",
      sliderShowingCount: "Visualizzazione di {count} corde su {total}",
      emptyResults: "Nessuna corda corrisponde alla configurazione attuale. Prova ad allentare uno o due filtri.",
      guidesZero: "0 guide",
      guidesCount: "{count} guida",
      guidesCountPlural: "{count} guide",
      referenceGuide: "Guida di riferimento",
      activePopular: "Visualizzazione delle 20 piu popolari",
      activePros: "Visualizzazione delle corde dei professionisti",
      activeSearch: "Ricerca di \"{query}\"",
      activeShowing: "Visualizzazione di {value}",
      activeSliders: "Uso dei cursori di preferenza",
      backToMainChoices: "Torna alle scelte principali",
      masterDatabaseCount: "{count} corde nel database",
      masterShownCount: "{count} visualizzate",
      masterEmpty: "Nessuna corda corrisponde a questa ricerca. Prova un'altra marca, tipo o termine.",
      masterHeadName: "Nome corda",
      masterHeadBrand: "Marca",
      masterHeadType: "Tipo",
      masterHeadPros: "Professionisti",
      masterHeadDetails: "Dettagli",
      masterUnknown: "Sconosciuto",
      masterDetails: "Dettagli",
      masterHide: "Nascondi",
      masterSet: "Set:",
      masterReel: "Bobina:",
      masterProsUsing: "Professionisti che la usano",
      masterKnownTensions: "Tensioni note",
      masterKnownRackets: "Racchette note",
      masterNoneListed: "Nessuno",
      typeGuideDescriptions: "{count} descrizioni"
    }
  };

  const PAGE_TRANSLATIONS = {
    "index.html": {
      en: [
        { selector: "title", text: "Tennis Setup" },
        { selector: ".hero h1", text: "TennisSetup" },
        { selector: ".hero-copy", text: "Use Quick Setup and Tension Calculator tools to build a quick pro-inspired setup." },
        { selector: "#stringSearchInput", attr: "placeholder", text: "Search string, brand, ATP player, WTA player, racket, or style" },
        { selector: "#clearSearchButton", text: "Clear" },
        { selector: ".search-help", text: "Search updates instantly as you type." },
        { selector: 'a[href="./master-list.html"] .hero-action-copy strong', text: "All Strings" },
        { selector: 'a[href="./master-list.html"] .hero-action-copy span:last-child', text: "Browse every string in one place" },
        { selector: "#referenceGuideButton .hero-action-copy strong", text: "Reference Guide" },
        { selector: "#referenceGuideButton .hero-action-copy span:last-child", text: "Open all information pages" },
        { selector: "#popularStringsButton .hero-action-copy strong", text: "20 Most Popular" },
        { selector: "#popularStringsButton .hero-action-copy span:last-child", text: "Start with the most searched strings" },
        { selector: "#proPlayersButton .hero-action-copy strong", text: "Pro Player Strings" },
        { selector: "#proPlayersButton .hero-action-copy span:last-child", text: "See what top ATP and WTA players use" },
        { selector: '.hero-menu-link[href="./string-types.html"]', text: "String Type Descriptions" },
        { selector: '.hero-menu-link[href="./tension-guide.html"]', text: "Tension Guide" },
        { selector: '.hero-menu-link[href="./gauge-guide.html"]', text: "Gauge Guide" },
        { selector: '.hero-menu-link[href="./hybrid-guide.html"]', text: "Hybrid String Guide" },
        { selector: '.hero-menu-link[href="./arm-friendly.html"]', text: "Arm-Friendly Strings" },
        { selector: '.hero-menu-link[href="./string-shape-guide.html"]', text: "String Shape Guide" },
        { selector: '.hero-menu-link[href="./restring-guide.html"]', text: "How Often to Restring" },
        { selector: '.hero-menu-link[href="./player-type-guide.html"]', text: "Best Strings by Player Type" },
        { selector: '.hero-menu-link[href="./best-by-need.html"]', text: "Best Strings by Need" },
        { selector: '.hero-menu-link[href="./popular-comparisons.html"]', text: "Popular String Comparisons" },
        { selector: '.hero-menu-link[href="./proshops.html"]', text: "Pro Shops" },
        { selector: ".hero-menu-link-admin", text: "Admin Stats" },
        { selector: '.hero-action-panel-link[href="./string-types.html"]', text: "String Type Descriptions" },
        { selector: '.hero-action-panel-link[href="./tension-guide.html"]', text: "Tension Guide" },
        { selector: '.hero-action-panel-link[href="./gauge-guide.html"]', text: "Gauge Guide" },
        { selector: '.hero-action-panel-link[href="./hybrid-guide.html"]', text: "Hybrid String Guide" },
        { selector: '.hero-action-panel-link[href="./arm-friendly.html"]', text: "Arm-Friendly Strings" },
        { selector: '.hero-action-panel-link[href="./string-shape-guide.html"]', text: "String Shape Guide" },
        { selector: '.hero-action-panel-link[href="./restring-guide.html"]', text: "How Often to Restring" },
        { selector: '.hero-action-panel-link[href="./player-type-guide.html"]', text: "Best Strings by Player Type" },
        { selector: '.hero-action-panel-link[href="./best-by-need.html"]', text: "Best Strings by Need" },
        { selector: '.hero-action-panel-link[href="./popular-comparisons.html"]', text: "Popular String Comparisons" }
      ],
      fr: [
        { selector: "title", text: "Tennis String Lab" },
        { selector: ".hero h1", text: "Trouvez le meilleur cordage pour votre jeu." },
        { selector: ".hero-copy", text: "Recherchez par cordage, marque, joueur ou raquette, puis affinez avec des filtres rapides pour le type, le spin, les sensations, la durabilite et le niveau." },
        { selector: "#stringSearchInput", attr: "placeholder", text: "Rechercher un cordage, une marque, un joueur ATP, WTA, une raquette ou un style" },
        { selector: "#clearSearchButton", text: "Effacer" },
        { selector: ".search-help", text: "La recherche se met a jour instantanement pendant la saisie." },
        { selector: 'a[href="./master-list.html"] .hero-action-copy strong', text: "Liste complete" },
        { selector: 'a[href="./master-list.html"] .hero-action-copy span:last-child', text: "Parcourez tous les cordages en un seul endroit" },
        { selector: "#referenceGuideButton .hero-action-copy strong", text: "Guide de reference" },
        { selector: "#referenceGuideButton .hero-action-copy span:last-child", text: "Ouvrir toutes les pages d'information" },
        { selector: "#popularStringsButton .hero-action-copy strong", text: "20 plus populaires" },
        { selector: "#popularStringsButton .hero-action-copy span:last-child", text: "Commencez par les cordages les plus recherches" },
        { selector: "#proPlayersButton .hero-action-copy strong", text: "Cordages des pros" },
        { selector: "#proPlayersButton .hero-action-copy span:last-child", text: "Voir ce qu'utilisent les meilleurs ATP et WTA" },
        { selector: '.hero-menu-link[href="./string-types.html"]', text: "Descriptions des types de cordage" },
        { selector: '.hero-menu-link[href="./tension-guide.html"]', text: "Guide de tension" },
        { selector: '.hero-menu-link[href="./gauge-guide.html"]', text: "Guide de jauge" },
        { selector: '.hero-menu-link[href="./hybrid-guide.html"]', text: "Guide des hybrides" },
        { selector: '.hero-menu-link[href="./arm-friendly.html"]', text: "Confort du bras" },
        { selector: '.hero-menu-link[href="./string-shape-guide.html"]', text: "Guide de forme du cordage" },
        { selector: '.hero-menu-link[href="./restring-guide.html"]', text: "Quand recorder" },
        { selector: '.hero-menu-link[href="./player-type-guide.html"]', text: "Meilleurs cordages par joueur" },
        { selector: '.hero-menu-link[href="./best-by-need.html"]', text: "Meilleurs cordages par besoin" },
        { selector: '.hero-menu-link[href="./popular-comparisons.html"]', text: "Comparaisons populaires" },
        { selector: '.hero-menu-link[href="./proshops.html"]', text: "Magasins pro" },
        { selector: ".hero-menu-link-admin", text: "Stats admin" },
        { selector: '.hero-action-panel-link[href="./string-types.html"]', text: "Descriptions des types de cordage" },
        { selector: '.hero-action-panel-link[href="./tension-guide.html"]', text: "Guide de tension" },
        { selector: '.hero-action-panel-link[href="./gauge-guide.html"]', text: "Guide de jauge" },
        { selector: '.hero-action-panel-link[href="./hybrid-guide.html"]', text: "Guide des hybrides" },
        { selector: '.hero-action-panel-link[href="./arm-friendly.html"]', text: "Confort du bras" },
        { selector: '.hero-action-panel-link[href="./string-shape-guide.html"]', text: "Guide de forme du cordage" },
        { selector: '.hero-action-panel-link[href="./restring-guide.html"]', text: "Quand recorder" },
        { selector: '.hero-action-panel-link[href="./player-type-guide.html"]', text: "Meilleurs cordages par joueur" },
        { selector: '.hero-action-panel-link[href="./best-by-need.html"]', text: "Meilleurs cordages par besoin" },
        { selector: '.hero-action-panel-link[href="./popular-comparisons.html"]', text: "Comparaisons populaires" }
      ],
      es: [
        { selector: ".hero h1", text: "Encuentra la mejor configuracion de cuerdas para tu juego." },
        { selector: ".hero-copy", text: "Busca por cuerda, marca, jugador o raqueta y luego ajusta con filtros rapidos de tipo, spin, sensacion, durabilidad y nivel." },
        { selector: "#stringSearchInput", attr: "placeholder", text: "Buscar cuerda, marca, jugador ATP, WTA, raqueta o estilo" },
        { selector: "#clearSearchButton", text: "Borrar" },
        { selector: ".search-help", text: "La busqueda se actualiza al instante mientras escribes." },
        { selector: 'a[href="./master-list.html"] .hero-action-copy strong', text: "Lista maestra" },
        { selector: 'a[href="./master-list.html"] .hero-action-copy span:last-child', text: "Explora todas las cuerdas en un solo lugar" },
        { selector: "#referenceGuideButton .hero-action-copy strong", text: "Guia de referencia" },
        { selector: "#referenceGuideButton .hero-action-copy span:last-child", text: "Abrir todas las paginas informativas" },
        { selector: "#popularStringsButton .hero-action-copy strong", text: "20 mas populares" },
        { selector: "#popularStringsButton .hero-action-copy span:last-child", text: "Empieza con las cuerdas mas buscadas" },
        { selector: "#proPlayersButton .hero-action-copy strong", text: "Cuerdas de profesionales" },
        { selector: "#proPlayersButton .hero-action-copy span:last-child", text: "Ver lo que usan los mejores ATP y WTA" }
      ],
      it: [
        { selector: ".hero h1", text: "Trova la migliore configurazione di corde per il tuo gioco." },
        { selector: ".hero-copy", text: "Cerca per corda, marca, giocatore o racchetta, poi restringi con filtri rapidi per tipo, spin, sensibilita, durata e livello." },
        { selector: "#stringSearchInput", attr: "placeholder", text: "Cerca corda, marca, giocatore ATP, WTA, racchetta o stile" },
        { selector: "#clearSearchButton", text: "Cancella" },
        { selector: ".search-help", text: "La ricerca si aggiorna immediatamente mentre scrivi." },
        { selector: 'a[href="./master-list.html"] .hero-action-copy strong', text: "Elenco completo" },
        { selector: 'a[href="./master-list.html"] .hero-action-copy span:last-child', text: "Sfoglia tutte le corde in un solo posto" },
        { selector: "#referenceGuideButton .hero-action-copy strong", text: "Guida di riferimento" },
        { selector: "#referenceGuideButton .hero-action-copy span:last-child", text: "Apri tutte le pagine informative" },
        { selector: "#popularStringsButton .hero-action-copy strong", text: "20 piu popolari" },
        { selector: "#popularStringsButton .hero-action-copy span:last-child", text: "Inizia con le corde piu cercate" },
        { selector: "#proPlayersButton .hero-action-copy strong", text: "Corde dei professionisti" },
        { selector: "#proPlayersButton .hero-action-copy span:last-child", text: "Vedi cosa usano i migliori ATP e WTA" }
      ]
    },
    "master-list.html": {
      en: [
        { selector: "title", text: "Tennis String Lab Master List" },
        { selector: ".utility-links a", text: "Back to Home" },
        { selector: ".hero h1", text: "Browse every string in the database by name, brand, and type." },
        { selector: ".hero-copy", text: "Use the master list to scan the full catalog, search by string name, and sort alphabetically or narrow by brand and string type." },
        { selector: "#masterSearchInput", attr: "placeholder", text: "Search by string name or brand" },
        { selector: '#masterBrandFilter option[value="Any"]', text: "All Brands" },
        { selector: '#masterTypeFilter option[value="Any"]', text: "All Types" },
        { selector: '#masterPlayerFilter option[value="Any"]', text: "All Pro Players" },
        { selector: '#masterPlayerFilter option[value="__most_pros__"]', text: "Most Pros Using" },
        { selector: '#masterSortSelect option[value="az"]', text: "Alphabetical A-Z" },
        { selector: '#masterSortSelect option[value="za"]', text: "Alphabetical Z-A" }
      ],
      fr: [
        { selector: ".utility-links a", text: "Retour a l'accueil" },
        { selector: ".hero h1", text: "Parcourez chaque cordage de la base par nom, marque et type." },
        { selector: ".hero-copy", text: "Utilisez la liste complete pour parcourir tout le catalogue, rechercher par nom de cordage et filtrer par marque ou type." },
        { selector: "#masterSearchInput", attr: "placeholder", text: "Rechercher par nom de cordage ou marque" },
        { selector: '#masterBrandFilter option[value="Any"]', text: "Toutes les marques" },
        { selector: '#masterTypeFilter option[value="Any"]', text: "Tous les types" },
        { selector: '#masterPlayerFilter option[value="Any"]', text: "Tous les pros" },
        { selector: '#masterPlayerFilter option[value="__most_pros__"]', text: "Le plus de pros" },
        { selector: '#masterSortSelect option[value="az"]', text: "Alphabetique A-Z" },
        { selector: '#masterSortSelect option[value="za"]', text: "Alphabetique Z-A" }
      ],
      es: [
        { selector: ".utility-links a", text: "Volver al inicio" },
        { selector: ".hero h1", text: "Explora cada cuerda de la base por nombre, marca y tipo." },
        { selector: ".hero-copy", text: "Usa la lista maestra para recorrer todo el catalogo, buscar por nombre y filtrar por marca o tipo." },
        { selector: "#masterSearchInput", attr: "placeholder", text: "Buscar por nombre de cuerda o marca" },
        { selector: '#masterBrandFilter option[value="Any"]', text: "Todas las marcas" },
        { selector: '#masterTypeFilter option[value="Any"]', text: "Todos los tipos" }
      ],
      it: [
        { selector: ".utility-links a", text: "Torna alla home" },
        { selector: ".hero h1", text: "Sfoglia ogni corda nel database per nome, marca e tipo." },
        { selector: ".hero-copy", text: "Usa l'elenco completo per esplorare tutto il catalogo, cercare per nome e filtrare per marca o tipo." },
        { selector: "#masterSearchInput", attr: "placeholder", text: "Cerca per nome della corda o marca" },
        { selector: '#masterBrandFilter option[value="Any"]', text: "Tutte le marche" },
        { selector: '#masterTypeFilter option[value="Any"]', text: "Tutti i tipi" }
      ]
    },
    "proshops.html": {
      en: [
        { selector: ".hero h1", text: "Find pro shops and stringing locations." },
        { selector: ".hero-copy", text: "Search city, region, or shop name to find places that sell tennis gear or offer racket stringing." },
        { selector: "#shopSearchInput", attr: "placeholder", text: "Search city, shop, state, or province" }
      ],
      fr: [
        { selector: ".hero h1", text: "Trouvez des pro shops et des lieux de cordage." },
        { selector: ".hero-copy", text: "Recherchez une ville, une region ou un magasin pour trouver des lieux de vente ou de cordage." },
        { selector: "#shopSearchInput", attr: "placeholder", text: "Rechercher ville, magasin, etat ou province" }
      ],
      es: [
        { selector: ".hero h1", text: "Encuentra pro shops y lugares de encordado." },
        { selector: ".hero-copy", text: "Busca ciudad, region o tienda para encontrar lugares que vendan tenis o ofrezcan encordado." },
        { selector: "#shopSearchInput", attr: "placeholder", text: "Buscar ciudad, tienda, estado o provincia" }
      ],
      it: [
        { selector: ".hero h1", text: "Trova pro shop e punti di incordatura." },
        { selector: ".hero-copy", text: "Cerca citta, area o negozio per trovare posti che vendono articoli da tennis o offrono incordatura." },
        { selector: "#shopSearchInput", attr: "placeholder", text: "Cerca citta, negozio, stato o provincia" }
      ]
    },
    "visit-stats.html": {
      en: [
        { selector: "title", text: "Tennis String Lab Visit Stats" },
        { selector: ".hero-card h1", text: "Visit Stats" }
      ],
      fr: [
        { selector: ".hero-card h1", text: "Statistiques de visites" },
        { selector: ".hero-card .summary-copy", text: "Cette page affiche les vues et visiteurs uniques enregistres par le compteur Netlify." }
      ],
      es: [
        { selector: ".hero-card h1", text: "Estadisticas de visitas" },
        { selector: ".hero-card .summary-copy", text: "Esta pagina muestra vistas y visitantes unicos registrados por el contador de Netlify." }
      ],
      it: [
        { selector: ".hero-card h1", text: "Statistiche visite" },
        { selector: ".hero-card .summary-copy", text: "Questa pagina mostra visualizzazioni e visitatori unici registrati dal contatore Netlify." }
      ]
    }
  };

  const HOMEPAGE_GUIDE_FIXES = {
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
        "./gauge-guide.html": "Guia de calibre",
        "./hybrid-guide.html": "Guia de hibridos",
        "./arm-friendly.html": "Brazo y confort",
        "./string-shape-guide.html": "Guia de forma de cuerda",
        "./restring-guide.html": "Cuando reencordar",
        "./player-type-guide.html": "Mejores cuerdas por jugador",
        "./best-by-need.html": "Mejores cuerdas por necesidad",
        "./popular-comparisons.html": "Comparaciones populares",
        "./proshops.html": "Pro shops"
      },
      admin: "Estadisticas admin"
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
        "./gauge-guide.html": "Guida al calibro",
        "./hybrid-guide.html": "Guida agli ibridi",
        "./arm-friendly.html": "Comfort del braccio",
        "./string-shape-guide.html": "Guida alla forma della corda",
        "./restring-guide.html": "Quando reincordare",
        "./player-type-guide.html": "Migliori corde per profilo",
        "./best-by-need.html": "Migliori corde per esigenza",
        "./popular-comparisons.html": "Confronti popolari",
        "./proshops.html": "Pro shop"
      },
      admin: "Statistiche admin"
    }
  };

  function getSafeLanguageFlag(language) {
    const flags = {
      en: "\uD83C\uDDEC\uD83C\uDDE7",
      fr: "\uD83C\uDDEB\uD83C\uDDF7",
      es: "\uD83C\uDDEA\uD83C\uDDF8",
      it: "\uD83C\uDDEE\uD83C\uDDF9"
    };
    return flags[language] || language.toUpperCase();
  }

  function getFlagMarkup(language) {
    const svgMap = {
      en: '<svg class="language-flag-svg" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#1f4aa8"/><path d="M0 0l24 16M24 0L0 16" stroke="#fff" stroke-width="4"/><path d="M0 0l24 16M24 0L0 16" stroke="#d91f26" stroke-width="2"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="6"/><path d="M12 0v16M0 8h24" stroke="#d91f26" stroke-width="3"/></svg>',
      fr: '<svg class="language-flag-svg" viewBox="0 0 24 16" aria-hidden="true"><rect width="8" height="16" x="0" fill="#1f4aa8"/><rect width="8" height="16" x="8" fill="#ffffff"/><rect width="8" height="16" x="16" fill="#d91f26"/></svg>',
      es: '<svg class="language-flag-svg" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#f2c500"/><rect width="24" height="4" y="0" fill="#c51f28"/><rect width="24" height="4" y="12" fill="#c51f28"/></svg>',
      it: '<svg class="language-flag-svg" viewBox="0 0 24 16" aria-hidden="true"><rect width="8" height="16" x="0" fill="#169b62"/><rect width="8" height="16" x="8" fill="#ffffff"/><rect width="8" height="16" x="16" fill="#d91f26"/></svg>'
    };
    return svgMap[language] || `<span class="language-flag" aria-hidden="true">${getSafeLanguageFlag(language)}</span>`;
  }

  function applyHomepageGuideFixes(language) {
    const fixes = HOMEPAGE_GUIDE_FIXES[language];
    if (!fixes) return;

    const masterTitle = document.querySelector('a[href="./master-list.html"] .hero-action-copy strong');
    const masterCopy = document.querySelector('a[href="./master-list.html"] .hero-action-copy span:last-child');
    const referenceTitle = document.querySelector("#referenceGuideButton .hero-action-copy strong");
    const referenceCopy = document.querySelector("#referenceGuideButton .hero-action-copy span:last-child");
    const popularTitle = document.querySelector("#popularStringsButton .hero-action-copy strong");
    const popularCopy = document.querySelector("#popularStringsButton .hero-action-copy span:last-child");
    const prosTitle = document.querySelector("#proPlayersButton .hero-action-copy strong");
    const prosCopy = document.querySelector("#proPlayersButton .hero-action-copy span:last-child");

    if (masterTitle) masterTitle.textContent = fixes.masterListTitle;
    if (masterCopy) masterCopy.textContent = fixes.masterListCopy;
    if (referenceTitle) referenceTitle.textContent = fixes.referenceTitle;
    if (referenceCopy) referenceCopy.textContent = fixes.referenceCopy;
    if (popularTitle) popularTitle.textContent = fixes.popularTitle;
    if (popularCopy) popularCopy.textContent = fixes.popularCopy;
    if (prosTitle) prosTitle.textContent = fixes.prosTitle;
    if (prosCopy) prosCopy.textContent = fixes.prosCopy;

    Object.entries(fixes.menu).forEach(([href, text]) => {
      document.querySelectorAll(`.hero-menu-link[href="${href}"], .hero-action-panel-link[href="${href}"]`).forEach((element) => {
        element.textContent = text;
      });
    });

    document.querySelectorAll(".hero-menu-link-admin").forEach((element) => {
      element.textContent = fixes.admin;
    });
  }

  function createVisitorId() {
    return "visitor-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function getCurrentPage() {
    if (!window.location) return "index.html";
    const path = window.location.pathname || "/";
    const file = path.split("/").filter(Boolean).pop();
    return file || "index.html";
  }

  const SHARED_HEADER_TOOL_PAGES = new Set([
    "analyze-current-setup.html",
    "quick-setup.html",
    "tension-calculator.html",
    "compare-strings.html",
    "compare-pro-setups.html",
    "hybrid-builder.html"
  ]);

  const SHARED_HEADER_REFERENCE_PAGES = new Set([
    "string-library.html",
    "string-types.html",
    "string-materials-guide.html",
    "how-tennis-string-is-made.html",
    "tension-guide.html",
    "tension-logic.html",
    "gauge-guide.html",
    "hybrid-guide.html",
    "arm-friendly.html",
    "string-shape-guide.html",
    "string-dampeners-guide.html",
    "restring-guide.html",
    "player-type-guide.html",
    "best-by-need.html",
    "popular-comparisons.html",
    "best-strings-for-beginners.html",
    "best-strings-for-intermediate-players.html",
    "best-strings-for-pure-aero.html",
    "best-strings-for-tennis-elbow.html",
    "best-strings-for-wilson-blade.html",
    "do-tennis-strings-lose-tension-if-you-dont-play.html",
    "full-bed-vs-hybrid.html",
    "how-much-can-a-good-string-setup-improve-your-tennis-game.html",
    "how-weather-affects-string-tension.html",
    "natural-gut-vs-multifilament.html",
    "poly-vs-co-poly.html",
    "string-setup-mistakes-that-cost-performance.html",
    "what-setup-changes-help-intermediate-players-most.html",
    "what-strings-help-beginners-improve-most.html",
    "when-poly-goes-dead.html",
    "about.html",
    "contact.html",
    "privacy.html",
    "terms.html"
  ]);

  function setupSharedDropdownMenu(button, panel, containerSelector) {
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

  function getSharedHeaderMarkup(page) {
    const isDatabasePage = page === "master-list.html";
    const isGuidePage = page === "string-library.html" || SHARED_HEADER_REFERENCE_PAGES.has(page);
    const databaseCurrent = isDatabasePage ? ' aria-current="page"' : "";
    const guidesCurrent = isGuidePage ? ' aria-current="page"' : "";

    return `
      <div class="landing-header-inner">
        <a class="landing-brand" href="./index.html" aria-label="Go to TennisSetup home">
          <span class="landing-brand-mark" aria-hidden="true"></span>
          <span class="landing-brand-wordmark">TennisSetup</span>
        </a>

        <nav class="landing-nav" aria-label="Primary">
          <a href="./master-list.html"${databaseCurrent}>String Database</a>
          <a href="./index.html#analyzer">Analyzer</a>
          <a href="./index.html#popular-setups">Popular Setups</a>
          <a href="./string-library.html"${guidesCurrent}>Guides</a>
          <a href="./proshops.html"${page === "proshops.html" ? ' aria-current="page"' : ""}>Pro Shops</a>
        </nav>

        <details class="landing-menu">
          <summary aria-label="Open menu">
            <span></span>
            <span></span>
            <span></span>
          </summary>
          <div class="landing-menu-panel">
            <a href="./master-list.html"${databaseCurrent}>String Database</a>
            <a href="./pro-setup.html?player=Carlos%20Alcaraz">Pro Setups</a>
            <a href="./analyze-current-setup.html">Analyze Current Setup</a>
            <a href="./quick-setup.html">Quick Setup</a>
            <a href="./tension-calculator.html">Tension Calculator</a>
            <a href="./compare-strings.html">Compare Strings</a>
            <a href="./hybrid-builder.html">Hybrid Builder</a>
            <a href="./string-library.html"${guidesCurrent}>Reference Guide</a>
            <a href="./proshops.html">Pro Shops</a>
          </div>
        </details>
      </div>
    `;
  }

  function ensureHomepageHeaderStyles() {
    const existing = document.querySelector('link[href*="homepage.css"]');
    if (existing) {
      if (existing.sheet) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", resolve, { once: true });
      });
    }

    return new Promise((resolve) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "./homepage.css?v=20260411ad";
      link.addEventListener("load", resolve, { once: true });
      link.addEventListener("error", resolve, { once: true });
      const manifest = document.querySelector('link[rel="manifest"]');
      if (manifest && manifest.parentNode) {
        manifest.parentNode.insertBefore(link, manifest.nextSibling);
      } else {
        document.head.appendChild(link);
      }
    });
  }

  function applySharedHeaderActiveStates(page) {
    const setActive = (selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add("is-active");
        element.setAttribute("aria-current", "page");
      }
    };

    if (page === "master-list.html") {
      setActive("#sharedHeaderMasterListLink");
      return;
    }

    if (page === "proshops.html") {
      setActive("#sharedProShopsLink");
      return;
    }

    if (page === "proplayers.html") {
      setActive("#sharedProPlayersLink");
      return;
    }

    if (SHARED_HEADER_TOOL_PAGES.has(page)) {
      setActive("#sharedToolsMenuButton");
      return;
    }

    if (SHARED_HEADER_REFERENCE_PAGES.has(page)) {
      setActive("#sharedReferenceGuideLink");
    }
  }

  function updateSharedHeaderDatabaseCount() {
    const title = document.getElementById("sharedHeaderMasterListTitle");
    if (!title) return;

    if (Array.isArray(window.STRINGS) && window.STRINGS.length) {
      title.textContent = `All Strings - ${window.STRINGS.length} in Database`;
    } else {
      title.textContent = "All Strings";
    }
  }

  function ensureSharedSiteHeader() {
    const page = getCurrentPage();
    if (page === "index.html" || document.querySelector(".site-header") || document.querySelector(".landing-header")) {
      return;
    }

    ensureHomepageHeaderStyles().then(() => {
      if (document.querySelector(".landing-header")) {
        return;
      }

      const header = document.createElement("header");
      header.className = "landing-header";
      header.innerHTML = getSharedHeaderMarkup(page);

      const firstMain = document.querySelector("main");
      if (firstMain && firstMain.parentNode === document.body) {
        document.body.insertBefore(header, firstMain);
      } else {
        document.body.insertBefore(header, document.body.firstChild);
      }
    });
  }

  function getSelectedLanguage() {
    try {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      return SUPPORTED_LANGUAGES.includes(stored) ? stored : "en";
    } catch (error) {
      return "en";
    }
  }

  function setSelectedLanguage(language) {
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {}
  }

  function translate(key, fallback, vars) {
    const language = getSelectedLanguage();
    const dictionary = DYNAMIC_TRANSLATIONS[language] || DYNAMIC_TRANSLATIONS.en;
    let text = dictionary[key] || fallback || key;
    Object.entries(vars || {}).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, String(value));
    });
    return text;
  }

  function getVisitorId() {
    try {
      const existing = localStorage.getItem(VISITOR_KEY);
      if (existing) return existing;
      const next = createVisitorId();
      localStorage.setItem(VISITOR_KEY, next);
      return next;
    } catch (error) {
      return createVisitorId();
    }
  }

  function getPathKey(pathname) {
    return SESSION_PREFIX + pathname;
  }

  function alreadyTracked(pathname) {
    try {
      return sessionStorage.getItem(getPathKey(pathname)) === "1";
    } catch (error) {
      return false;
    }
  }

  function markTracked(pathname) {
    try {
      sessionStorage.setItem(getPathKey(pathname), "1");
    } catch (error) {}
  }

  function applyEntries(entries) {
    (entries || []).forEach((entry) => {
      document.querySelectorAll(entry.selector).forEach((element) => {
        if (entry.attr) {
          element.setAttribute(entry.attr, entry.text);
        } else {
          element.textContent = entry.text;
        }
      });
    });
  }

  function applyGuideNavTranslations(language) {
    const labels = GUIDE_LINK_TRANSLATIONS[language] || GUIDE_LINK_TRANSLATIONS.en;
    const navMap = [
      ['nav.info-page-nav a[href="./index.html"]', labels.home],
      ['nav.info-page-nav a[href="./string-types.html"]', labels.stringTypes],
      ['nav.info-page-nav a[href="./tension-guide.html"]', labels.tension],
      ['nav.info-page-nav a[href="./gauge-guide.html"]', labels.gauge],
      ['nav.info-page-nav a[href="./hybrid-guide.html"]', labels.hybrid],
      ['nav.info-page-nav a[href="./arm-friendly.html"]', labels.armFriendly],
      ['nav.info-page-nav a[href="./string-shape-guide.html"]', labels.shape],
      ['nav.info-page-nav a[href="./restring-guide.html"]', labels.restring],
      ['nav.info-page-nav a[href="./player-type-guide.html"]', labels.playerType],
      ['nav.info-page-nav a[href="./best-by-need.html"]', labels.bestByNeed],
      ['nav.info-page-nav a[href="./popular-comparisons.html"]', labels.comparisons]
    ];
    navMap.forEach(([selector, text]) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.textContent = text;
      });
    });
  }

  function applyLanguage(language) {
    const page = getCurrentPage();
    const pageMap = PAGE_TRANSLATIONS[page];
    const entries = (pageMap && (pageMap[language] || pageMap.en)) || [];
    applyEntries(entries);
    if (page === "index.html") {
      applyHomepageGuideFixes(language);
    }
    applyGuideNavTranslations(language);
    if (typeof window.TSL_APPLY_GUIDE_TRANSLATIONS === "function") {
      window.TSL_APPLY_GUIDE_TRANSLATIONS();
    }
    document.documentElement.lang = language;
    updateLanguageButtons(language);
    document.dispatchEvent(new CustomEvent("tsl-language-change", { detail: { language } }));
  }

  function updateLanguageButtons(language) {
    const select = document.querySelector(".language-switcher-select");
    if (select && select.value !== language) {
      select.value = language;
    }
  }

  function createLanguageSwitcher() {
    if (document.querySelector(".language-switcher")) return;

    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.setAttribute("aria-label", "Language switcher");

    const select = document.createElement("select");
    select.className = "language-switcher-select";
    select.setAttribute("aria-label", "Select language");

    SUPPORTED_LANGUAGES.forEach((language) => {
      const option = document.createElement("option");
      option.value = language;
      option.textContent = LANGUAGE_LABELS[language] || language.toUpperCase();
      select.appendChild(option);
    });

    select.value = getSelectedLanguage();
    select.addEventListener("change", () => {
      const language = SUPPORTED_LANGUAGES.includes(select.value) ? select.value : "en";
      setSelectedLanguage(language);
      applyLanguage(language);
    });

    switcher.appendChild(select);

    const sharedHeaderRow = document.querySelector("body.has-shared-site-header .site-header .brand-row");
    if (sharedHeaderRow) {
      switcher.classList.add("language-switcher--header");
      const overflowMenu = sharedHeaderRow.querySelector(".hero-overflow-menu");
      if (overflowMenu) {
        sharedHeaderRow.insertBefore(switcher, overflowMenu);
      } else {
        sharedHeaderRow.appendChild(switcher);
      }
      return;
    }

    document.body.appendChild(switcher);
  }

  async function trackVisit() {
    if (!window.location || window.location.protocol === "file:") return;

    const path = window.location.pathname || "/";
    if (alreadyTracked(path)) return;

    markTracked(path);

    const payload = {
      visitorId: getVisitorId(),
      path,
      title: document.title || "",
      referrer: document.referrer || "",
      screen: window.screen ? `${window.screen.width}x${window.screen.height}` : ""
    };

    try {
      await fetch(TRACK_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        keepalive: true
      });
    } catch (error) {}
  }

  async function trackAnalyticsEvent(eventName, eventLabel = "", extra = {}) {
    if (!window.location || window.location.protocol === "file:") return;
    if (!eventName) return;

    const payload = {
      visitorId: getVisitorId(),
      path: window.location.pathname || "/",
      title: document.title || "",
      referrer: document.referrer || "",
      screen: window.screen ? `${window.screen.width}x${window.screen.height}` : "",
      eventName,
      eventLabel,
      ...extra
    };

    try {
      await fetch(TRACK_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        keepalive: true
      });
    } catch (error) {}
  }

  function init() {
    window.TSL_I18N = {
      getLanguage: getSelectedLanguage,
      t: translate
    };
    window.TSL_ANALYTICS = {
      trackEvent: trackAnalyticsEvent
    };
    ensureSharedSiteHeader();
    createLanguageSwitcher();
    applyLanguage(getSelectedLanguage());
    trackVisit();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
