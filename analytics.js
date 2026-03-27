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
  const LANGUAGE_SWITCHER_LABELS = {
    en: "Language",
    fr: "Langue",
    es: "Idioma",
    it: "Lingua"
  };
  const LANGUAGE_FLAGS = {
    en: "/images/flag-gb.svg",
    fr: "/images/flag-fr.svg",
    es: "/images/flag-es.svg",
    it: "/images/flag-it.svg"
  };

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
      hybrid: "Guide hybride",
      armFriendly: "Confort bras",
      shape: "Forme du cordage",
      restring: "Quand recorder",
      playerType: "Guide par joueur",
      bestByNeed: "Selon le besoin",
      comparisons: "Comparaisons"
    },
    es: {
      home: "Inicio",
      stringTypes: "Tipos de cuerda",
      tension: "Guia de tension",
      gauge: "Guia de calibre",
      hybrid: "Guia hibrida",
      armFriendly: "Comodas para el brazo",
      shape: "Forma de cuerda",
      restring: "Cuando reencordar",
      playerType: "Guia por jugador",
      bestByNeed: "Segun la necesidad",
      comparisons: "Comparaciones"
    },
    it: {
      home: "Home",
      stringTypes: "Tipi di corda",
      tension: "Guida alla tensione",
      gauge: "Guida al calibro",
      hybrid: "Guida ibrida",
      armFriendly: "Comfort per il braccio",
      shape: "Forma della corda",
      restring: "Quando reincordare",
      playerType: "Guida per giocatore",
      bestByNeed: "Per esigenza",
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
        { selector: "title", text: "Tennis String Lab" },
        { selector: ".hero h1", text: "Find the best string setup for your game." },
        { selector: ".hero-copy", text: "Search by string, brand, player, or racket, then narrow everything with quick filters for type, spin, feel, durability, and player level." },
        { selector: "#stringSearchInput", attr: "placeholder", text: "Search string, brand, ATP player, WTA player, racket, or style" },
        { selector: "#clearSearchButton", text: "Clear" },
        { selector: ".search-help", text: "Search updates instantly as you type." },
        { selector: 'a[href="./master-list.html"] .hero-action-copy strong', text: "Master List" },
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
        { selector: '.hero-menu-link[href="./hybrid-guide.html"]', text: "Guide hybride" },
        { selector: '.hero-menu-link[href="./arm-friendly.html"]', text: "Cordages confort bras" },
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
        { selector: '.hero-action-panel-link[href="./hybrid-guide.html"]', text: "Guide hybride" },
        { selector: '.hero-action-panel-link[href="./arm-friendly.html"]', text: "Cordages confort bras" },
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

  function createVisitorId() {
    return "visitor-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function getCurrentPage() {
    if (!window.location) return "index.html";
    const path = window.location.pathname || "/";
    const file = path.split("/").filter(Boolean).pop();
    return file || "index.html";
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
    applyGuideNavTranslations(language);
    document.documentElement.lang = language;
    updateLanguageButtons(language);
    document.dispatchEvent(new CustomEvent("tsl-language-change", { detail: { language } }));
  }

  function updateLanguageButtons(language) {
    document.querySelectorAll(".language-switcher-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.language === language);
    });
    const label = document.querySelector(".language-switcher-label");
    if (label) {
      label.textContent = LANGUAGE_SWITCHER_LABELS[language] || LANGUAGE_SWITCHER_LABELS.en;
    }
  }

  function createLanguageSwitcher() {
    if (document.querySelector(".language-switcher")) return;

    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.setAttribute("aria-label", "Language switcher");

    const label = document.createElement("span");
    label.className = "language-switcher-label";
    label.textContent = LANGUAGE_SWITCHER_LABELS[getSelectedLanguage()] || LANGUAGE_SWITCHER_LABELS.en;
    switcher.appendChild(label);

    SUPPORTED_LANGUAGES.forEach((language) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "language-switcher-button";
      button.dataset.language = language;
      button.title = LANGUAGE_SWITCHER_LABELS[language] || LANGUAGE_LABELS[language];
      button.setAttribute("aria-label", LANGUAGE_SWITCHER_LABELS[language] || LANGUAGE_LABELS[language]);
      button.innerHTML = `<img class="language-flag" src="${LANGUAGE_FLAGS[language]}" alt="${LANGUAGE_SWITCHER_LABELS[language] || LANGUAGE_LABELS[language]}">`;
      button.addEventListener("click", () => {
        setSelectedLanguage(language);
        applyLanguage(language);
      });
      switcher.appendChild(button);
    });

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

  function init() {
    window.TSL_I18N = {
      getLanguage: getSelectedLanguage,
      t: translate
    };
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
