(function () {
  const siteI18n = {
    getLanguage() {
      return window.TSL_I18N && typeof window.TSL_I18N.getLanguage === "function"
        ? window.TSL_I18N.getLanguage()
        : "en";
    }
  };

  const GUIDE_PAGE_CONTENT = {
    "string-types.html": {
      fr: {
        heroTitle: "Descriptions des types de cordage",
        heroText: "Utilisez cette page pour comparer rapidement les grandes familles de cordages et comprendre comment elles different en spin, confort, puissance, controle et durabilite.",
        sectionEyebrow: "Guide",
        sectionTitle: "Grandes familles de cordage"
      },
      es: {
        heroTitle: "Descripciones de tipos de cuerda",
        heroText: "Usa esta pagina para comparar rapidamente las principales familias de cuerdas y entender como difieren en spin, comodidad, potencia, control y durabilidad.",
        sectionEyebrow: "Guia",
        sectionTitle: "Principales familias de cuerdas"
      },
      it: {
        heroTitle: "Descrizioni dei tipi di corda",
        heroText: "Usa questa pagina per confrontare rapidamente le principali famiglie di corde e capire come differiscono per spin, comfort, potenza, controllo e durata.",
        sectionEyebrow: "Guida",
        sectionTitle: "Principali famiglie di corde"
      }
    },
    "tension-guide.html": {
      fr: {
        heroTitle: "Guide de tension",
        heroText: "La tension change la fermete, la vivacite, le controle et la tolerance du tamis. Ce guide donne un cadre simple pour savoir quand descendre, rester au milieu ou monter.",
        sectionEyebrow: "Guide essentiel",
        sectionTitle: "Comment la tension change les sensations",
        cards: [
          ["Basse tension", "Plus de poche et de profondeur", "Les tensions plus basses semblent souvent plus souples et plus vives. Les joueurs baissent souvent la tension pour obtenir plus de puissance facile, de confort et un peu plus de sortie de balle."],
          ["Tension moyenne", "Equilibre general", "La zone moyenne est souvent le point de depart le plus sur. Elle melange controle, confort et reponse sans aller trop loin vers la fermete ou l'effet trampoline."],
          ["Haute tension", "Plus ferme et plus direct", "Les tensions plus elevees paraissent souvent plus fermes, plus nettes et moins puissantes. Les joueurs y vont quand ils veulent une reponse plus basse et plus directe."],
          ["Joueurs en poly", "Souvent mieux un peu plus bas", "Beaucoup de joueurs en poly preferent des tensions plus basses que dans leurs anciens montages en synthetic gut ou en multifilament. Cela aide souvent a garder le montage plus jouable et plus confortable."],
          ["Recherche de confort", "Plus bas est souvent plus doux", "Si le confort ou la sante du bras compte, une tension plus basse est souvent la meilleure direction a tester d'abord. L'impact est plus souple et l'effet planche diminue."],
          ["Point de depart", "Ajuster par petites etapes", "Une bonne methode consiste a changer de deux livres a la fois. C'est souvent assez pour sentir une difference sans perdre completement les sensations aimees."]
        ]
      },
      es: {
        heroTitle: "Guia de tension",
        heroText: "La tension cambia lo firme, vivo, controlado y permisivo que se siente el encordado. Esta guia da una referencia practica para decidir cuando bajar, mantener o subir.",
        sectionEyebrow: "Guia esencial",
        sectionTitle: "Como cambia la sensacion con la tension",
        cards: [
          ["Tension baja", "Mas bolsillo y profundidad facil", "Las tensiones bajas suelen sentirse mas suaves y vivas. Muchos jugadores bajan tension para obtener potencia facil, mas comodidad y una salida de bola un poco mas alta."],
          ["Tension media", "Equilibrio general", "La tension media suele ser el punto de partida mas seguro. Mezcla control, comodidad y respuesta sin ir demasiado hacia la rigidez o el efecto trampolin."],
          ["Tension alta", "Mas firme y directa", "Las tensiones altas suelen sentirse mas firmes, mas crujientes y menos potentes. Los jugadores suben cuando quieren una respuesta mas limpia y mas plana."],
          ["Usuarios de poly", "A menudo mejor un poco mas baja", "Muchos jugadores de poly prefieren tensiones mas bajas que en antiguos montajes con synthetic gut o multifilamento. Eso suele ayudar a mantener la sensacion mas jugable y amigable para el brazo."],
          ["Buscan comodidad", "Mas baja suele ser mejor", "Si la comodidad o la salud del brazo importan, bajar tension suele ser la primera prueba correcta. Normalmente suaviza el impacto y reduce la sensacion de tabla."],
          ["Punto de partida", "Ajusta en pasos pequenos", "Una forma inteligente de probar es mover dos libras por vez. Normalmente eso basta para notar un cambio sin perder por completo el tacto conocido."]
        ]
      },
      it: {
        heroTitle: "Guida alla tensione",
        heroText: "La tensione cambia quanto il piatto corde risulta rigido, vivo, controllato e permissivo. Questa guida offre un riferimento pratico per capire quando scendere, restare nel mezzo o salire.",
        sectionEyebrow: "Guida essenziale",
        sectionTitle: "Come la tensione cambia le sensazioni",
        cards: [
          ["Tensione bassa", "Piu pocketing e profondita facile", "Le tensioni piu basse di solito sembrano piu morbide e piu vive. Molti giocatori le scelgono per avere piu potenza facile, comfort e una risposta un po piu generosa."],
          ["Tensione media", "Equilibrio generale", "La tensione media e spesso il punto di partenza piu sicuro. Unisce controllo, comfort e risposta senza spingere troppo verso rigidita o effetto trampolino."],
          ["Tensione alta", "Piu rigida e piu diretta", "Le tensioni alte spesso sembrano piu rigide, piu secche e meno potenti. I giocatori salgono quando vogliono una risposta piu pulita e piu bassa."],
          ["Giocatori con poly", "Spesso meglio un po piu bassa", "Molti giocatori che usano poly preferiscono tensioni piu basse rispetto ai vecchi setup con synthetic gut o multifilamento. Questo aiuta spesso a mantenere il feeling piu giocabile."],
          ["Ricerca di comfort", "Piu bassa e spesso piu gentile", "Se comfort o salute del braccio contano, una tensione piu bassa e spesso la prima direzione da provare. Di solito rende l'impatto piu morbido e meno secco."],
          ["Punto di partenza", "Regola a piccoli passi", "Un modo intelligente per testare e cambiare di due libbre per volta. In genere basta per sentire una differenza senza perdere completamente il feeling gia apprezzato."]
        ]
      }
    },
    "gauge-guide.html": {
      fr: {
        heroTitle: "Guide de jauge",
        heroText: "La jauge correspond a l'epaisseur du cordage. Les jauges plus fines semblent souvent plus vives et accrochent davantage, alors que les plus epaisses durent plus longtemps.",
        sectionEyebrow: "Guide essentiel",
        sectionTitle: "Comment la jauge change la jouabilite",
        cards: [
          ["Jauge 18", "Plus fine et plus vive", "Les jauges tres fines offrent souvent plus de toucher, d'accroche et de vivacite, mais elles cassent generalement plus vite. Elles peuvent tres bien convenir aux joueurs de toucher."],
          ["Jauge 17", "Equilibre populaire entre toucher et spin", "La jauge 17 est souvent un excellent compromis. Elle apporte assez de durabilite tout en donnant de meilleures sensations et un peu plus d'action sur la balle."],
          ["Jauge 16L", "Option intermediaire", "Le 16L se place entre 16 et 17, ce qui en fait un bon compromis pour gagner un peu de durabilite sans perdre autant de sensations qu'un vrai 16."],
          ["Jauge 16", "Solide et durable", "Le 16 est un choix courant quand la durabilite compte. Il se sent souvent un peu plus ferme et plus stable que les versions plus fines."],
          ["Si vous cassez souvent", "Allez plus epais d'abord", "Si votre montage casse trop vite, passer a une jauge plus epaisse est souvent la solution la plus simple avant de changer totalement de corde."],
          ["Si vous voulez plus de toucher", "Essayez plus fin d'abord", "Si votre montage parait trop mort ou trop etouffe, tester la meme corde dans une jauge plus fine est souvent une experience utile et a faible risque."]
        ]
      },
      es: {
        heroTitle: "Guia de calibre",
        heroText: "El calibre es el grosor de la cuerda. Los calibres finos suelen sentirse mas vivos y con mas agarre, mientras que los gruesos duran mas y se sienten mas firmes.",
        sectionEyebrow: "Guia esencial",
        sectionTitle: "Como cambia la jugabilidad con el calibre",
        cards: [
          ["Calibre 18", "Mas fino y mas vivo", "Los calibres muy finos suelen dar mas tacto, agarre y viveza, pero normalmente se rompen antes. Pueden ir muy bien para jugadores de toque."],
          ["Calibre 17", "Equilibrio popular de tacto y spin", "El calibre 17 suele ser el punto dulce para muchos jugadores. Mezcla suficiente durabilidad con mejores sensaciones y algo mas de accion sobre la bola."],
          ["Calibre 16L", "Punto intermedio", "El 16L queda entre 16 y 17, y suele ser un buen compromiso para ganar algo de durabilidad sin perder tanto tacto como con un 16 completo."],
          ["Calibre 16", "Duradero y fiable", "El calibre 16 es una eleccion comun cuando la durabilidad importa. Suele sentirse un poco mas firme y estable que las versiones mas finas."],
          ["Si rompes cuerdas", "Ve primero a mas grosor", "Si tu montaje se rompe demasiado rapido, subir a un calibre mas grueso suele ser la solucion mas sencilla antes de cambiar de cuerda."],
          ["Si quieres mas tacto", "Prueba mas fino primero", "Si tu setup actual se siente apagado, probar la misma cuerda en un calibre mas fino suele ser un experimento inteligente y de bajo riesgo."]
        ]
      },
      it: {
        heroTitle: "Guida al calibro",
        heroText: "Il calibro indica lo spessore della corda. I calibri piu sottili di solito sembrano piu vivi e incisivi, mentre quelli piu spessi durano di piu e risultano piu stabili.",
        sectionEyebrow: "Guida essenziale",
        sectionTitle: "Come il calibro cambia la giocabilita",
        cards: [
          ["Calibro 18", "Piu sottile e piu vivo", "I calibri molto sottili offrono spesso piu tocco, presa sulla palla e vivacita, ma tendono anche a rompersi prima. Possono essere ottimi per giocatori di tocco."],
          ["Calibro 17", "Equilibrio popolare tra tocco e spin", "Il calibro 17 e spesso il punto ideale per molti giocatori. Unisce abbastanza durata a migliori sensazioni e un po piu azione sulla palla."],
          ["Calibro 16L", "Scelta intermedia", "Il 16L sta tra 16 e 17 e rappresenta un buon compromesso per ottenere piu durata senza perdere troppo feeling rispetto a un 16 pieno."],
          ["Calibro 16", "Affidabile e durevole", "Il calibro 16 e una scelta comune quando conta la durata. Di solito risulta un po piu rigido e stabile rispetto alle versioni piu sottili."],
          ["Se rompi spesso", "Vai prima su un calibro piu spesso", "Se il setup si rompe troppo in fretta, passare a un calibro piu spesso e spesso la soluzione piu semplice prima di cambiare modello."],
          ["Se vuoi piu feeling", "Prova prima un calibro piu sottile", "Se il tuo setup sembra troppo spento, provare la stessa corda in un calibro piu sottile puo essere un test intelligente e poco rischioso."]
        ]
      }
    },
    "hybrid-guide.html": {
      fr: {
        heroTitle: "Guide des hybrides",
        heroText: "Le cordage hybride consiste a combiner deux cordages differents, souvent pour melanger des avantages comme le spin et le confort, ou le controle et le toucher, dans une meme raquette.",
        sectionEyebrow: "Guide essentiel",
        sectionTitle: "Idees courantes de montages hybrides",
        cards: [
          ["Poly + Boyau naturel", "Spin avec toucher premium", "C'est l'un des hybrides classiques du circuit. Les joueurs l'utilisent pour obtenir le controle et le snapback du poly, avec la puissance et le toucher du boyau."],
          ["Poly + Multifilament", "Plus de confort qu'un full poly", "C'est souvent un hybride pratique pour les joueurs qui aiment les performances du poly mais veulent adoucir le montage et le rendre plus tolerant."],
          ["Poly + Synthetic Gut", "Compromis abordable", "Cette voie peut offrir une grande partie de l'experience hybride a un cout plus bas. C'est souvent un test intelligent avant de passer au boyau ou aux multis premium."],
          ["Les montants comptent le plus", "Les montants pilotent souvent les sensations", "Dans la plupart des hybrides, les montants influencent plus fortement la reponse generale. Des montants en poly gardent donc souvent le montage oriente controle et spin."],
          ["Les travers affinent le toucher", "Utilisez les travers pour adoucir ou rendre plus net", "La corde en travers aide souvent a regler le confort, le toucher et la reponse. C'est pourquoi un travers plus souple est une facon courante d'adoucir un montant ferme."],
          ["Commencez simple", "Changez une chose a la fois", "Si vous testez les hybrides pour la premiere fois, gardez les changements controles. Modifier une seule corde a la fois aide a comprendre ce qui s'est vraiment ameliore."]
        ]
      },
      es: {
        heroTitle: "Guia de hibridos",
        heroText: "El encordado hibrido consiste en combinar dos cuerdas diferentes, normalmente para mezclar ventajas como spin y comodidad, o control y tacto, en una misma raqueta.",
        sectionEyebrow: "Guia esencial",
        sectionTitle: "Ideas comunes de hibridos",
        cards: [
          ["Poly + Natural Gut", "Spin con tacto premium", "Es uno de los hibridos clasicos del circuito. Se usa para obtener el control y el snapback del poly junto con la potencia y el tacto del gut."],
          ["Poly + Multifilamento", "Mas comodidad que un full poly", "Suele ser un hibrido practico para jugadores que quieren el rendimiento del poly pero buscan un montaje mas suave y permisivo."],
          ["Poly + Synthetic Gut", "Compromiso economico", "Esta via puede dar gran parte de la experiencia hibrida con un coste mas bajo. Suele ser una prueba inteligente antes de pasar a gut o multis premium."],
          ["Las mains mandan", "Las mains suelen definir la sensacion", "En la mayoria de los hibridos, las mains influyen mas en la respuesta general. Por eso unas mains de poly suelen mantener el montaje inclinado hacia control y spin."],
          ["Las cruces afinan el tacto", "Usa las cruces para suavizar o afilar", "La cuerda de cruces suele ayudar a ajustar comodidad, tacto y respuesta. Por eso una cruz mas suave es una forma comun de domesticar una cuerda principal mas firme."],
          ["Empieza simple", "Cambia una cosa cada vez", "Si pruebas hibridos por primera vez, conviene hacer cambios controlados. Cambiar una sola cuerda cada vez facilita entender que mejoro y que no."]
        ]
      },
      it: {
        heroTitle: "Guida agli ibridi",
        heroText: "L'incordatura ibrida significa combinare due corde diverse, di solito per unire vantaggi come spin e comfort, oppure controllo e feeling, nella stessa racchetta.",
        sectionEyebrow: "Guida essenziale",
        sectionTitle: "Idee comuni di setup ibridi",
        cards: [
          ["Poly + Budello naturale", "Spin con feeling premium", "E uno degli ibridi classici del tour. I giocatori lo usano per ottenere il controllo e lo snapback del poly insieme alla potenza e al tocco del budello."],
          ["Poly + Multifilamento", "Piu comfort di un full poly", "Spesso e un ibrido pratico per chi apprezza le prestazioni del poly ma vuole ammorbidire il setup e renderlo piu gestibile."],
          ["Poly + Synthetic Gut", "Compromesso conveniente", "Questa strada puo offrire gran parte dell'esperienza ibrida a un prezzo piu basso. Spesso e un test intelligente prima di passare a budello o multi premium."],
          ["Le verticali contano di piu", "Le verticali guidano di solito il feeling", "Nella maggior parte degli ibridi, le verticali influenzano piu fortemente la risposta complessiva. Verticali in poly mantengono quindi il setup orientato a controllo e spin."],
          ["Le orizzontali rifiniscono il feeling", "Usa le orizzontali per ammorbidire o rendere piu netto", "La corda in orizzontale aiuta spesso a regolare comfort, feeling e risposta. Per questo una orizzontale piu morbida e un modo comune per addolcire una principale piu rigida."],
          ["Parti in modo semplice", "Cambia una cosa alla volta", "Se provi gli ibridi per la prima volta, mantieni i cambiamenti controllati. Cambiare una sola corda per volta rende molto piu facile capire cosa e migliorato davvero."]
        ]
      }
    },
    "arm-friendly.html": {
      fr: {
        heroTitle: "Cordages confort pour le bras",
        heroText: "Si le confort compte ou si votre bras est deja sensible, le choix du cordage devient l'une des decisions les plus importantes du montage. Les materiaux plus souples et des tensions plus intelligentes aident le plus souvent.",
        sectionEyebrow: "Guide essentiel",
        sectionTitle: "Meilleures directions pour le confort",
        cards: [
          ["Boyau naturel", "Reference premium du confort", "Le boyau naturel est largement considere comme la reference absolue en confort. Il est puissant, souple et facile pour le bras, surtout si vous ne voulez pas d'un tamis agressif."],
          ["Multifilament", "Souple et tolerant", "Les multifilaments sont souvent le choix pratique le plus confortable pour le bras. Ils donnent en general un impact doux, une profondeur facile et une reponse plus indulgente que les polys fermes."],
          ["Evitez le poly rigide en full bed", "Surtout a haute tension", "Un montage complet en poly rigide a haute tension est souvent la premiere chose dont les joueurs sensibles au confort devraient s'eloigner. Cette combinaison peut sembler tres planche."],
          ["Baisser la tension aide", "Souvent plus doux a l'impact", "Meme avec la meme corde, baisser la tension est souvent l'une des facons les plus rapides de rendre le montage plus tolerant et moins sec."],
          ["Les hybrides peuvent aider", "Adoucir sans perdre tout le controle", "Pour les joueurs qui veulent encore certaines qualites du poly, un hybride avec un partenaire plus souple peut etre bien plus gerable qu'un full poly."],
          ["Ne pas ignorer la perte de tension", "Des cordes mortes peuvent sembler plus dures", "Des cordes usees ne jouent souvent plus comme au debut. Si votre montage devient soudain plus agressif, il est peut-etre temps de recorder plutot que de le pousser davantage."]
        ]
      },
      es: {
        heroTitle: "Cuerdas amigables con el brazo",
        heroText: "Si la comodidad importa o tu brazo ya esta sensible, la eleccion de cuerda se convierte en una de las decisiones mas importantes del setup. Los materiales mas suaves y tensiones mas inteligentes suelen ayudar mas.",
        sectionEyebrow: "Guia esencial",
        sectionTitle: "Mejores caminos para la comodidad",
        cards: [
          ["Natural Gut", "Referencia premium de comodidad", "El natural gut suele considerarse el estandar de oro en comodidad. Es potente, suave y amable con el brazo, especialmente para quienes no quieren un encordado agresivo."],
          ["Multifilamento", "Suave y permisivo", "Los multifilamentos suelen ser la opcion practica mas amigable con el brazo. Normalmente ofrecen impacto suave, profundidad facil y una respuesta mas indulgente que los polys firmes."],
          ["Evita el full poly rigido", "Especialmente a alta tension", "Un encordado completo de poly rigido a alta tension suele ser lo primero que un jugador sensible al confort deberia abandonar. Esa combinacion puede sentirse muy tabla."],
          ["Bajar tension ayuda", "Suele suavizar el impacto", "Incluso manteniendo la misma cuerda, bajar tension suele ser una de las formas mas rapidas de hacer el setup mas amable y menos brusco."],
          ["Los hibridos pueden ayudar", "Suaviza el setup sin perder todo el control", "Para jugadores que aun quieren algunas cualidades del poly, un hibrido con una cuerda mas suave puede ser mucho mas manejable que un full poly."],
          ["No ignores la perdida de tension", "Las cuerdas muertas pueden sentirse mas duras", "Las cuerdas viejas dejan de jugar como al principio. Si tu setup de repente se siente mas agresivo, quiza ya toca reencordar en lugar de alargarlo mas."]
        ]
      },
      it: {
        heroTitle: "Corde amiche del braccio",
        heroText: "Se il comfort conta o il tuo braccio e gia sensibile, la scelta della corda diventa una delle decisioni piu importanti del setup. Materiali piu morbidi e tensioni piu intelligenti aiutano quasi sempre di piu.",
        sectionEyebrow: "Guida essenziale",
        sectionTitle: "Direzioni migliori per il comfort",
        cards: [
          ["Budello naturale", "Riferimento premium per il comfort", "Il budello naturale e ampiamente considerato il punto di riferimento per il comfort. E potente, morbido e molto gentile sul braccio, soprattutto per chi non vuole un piatto corde aggressivo."],
          ["Multifilamento", "Morbido e permissivo", "I multifilamenti sono spesso la scelta pratica piu amica del braccio. Di solito offrono impatto morbido, profondita facile e una risposta piu indulgente rispetto ai poly rigidi."],
          ["Evita il full poly rigido", "Soprattutto ad alta tensione", "Un full bed di poly rigido ad alta tensione e spesso la prima cosa da evitare per i giocatori sensibili al comfort. Questa combinazione puo sembrare davvero secca."],
          ["Scendere di tensione aiuta", "Di solito piu morbido all'impatto", "Anche mantenendo la stessa corda, abbassare la tensione e spesso uno dei modi piu rapidi per rendere il setup piu confortevole e meno traumatico."],
          ["Gli ibridi possono aiutare", "Ammorbidire senza perdere tutto il controllo", "Per chi vuole ancora alcune qualita del poly, un ibrido con una corda piu morbida puo essere molto piu gestibile di un full poly."],
          ["Non ignorare la perdita di tensione", "Le corde morte possono sembrare piu dure", "Le corde vecchie smettono spesso di giocare come da nuove. Se il setup all'improvviso sembra piu aggressivo, potrebbe essere il momento di reincordare invece di tirarlo avanti."]
        ]
      }
    },
    "string-shape-guide.html": {
      fr: {
        heroTitle: "Guide de forme du cordage",
        heroText: "Les cordages ronds, formes et textures n'attrapent pas la balle de la meme facon. La forme change souvent le caractere du contact, plus net, plus mordant ou plus lisse.",
        sectionEyebrow: "Guide essentiel",
        sectionTitle: "Rond vs forme vs texture",
        cards: [
          ["Rond", "Plus lisse et souvent plus previsible", "Les cordages ronds paraissent souvent plus propres et plus directs. Beaucoup de joueurs les aiment pour leur prevision, leur glisse facile et une reponse plus simple."],
          ["Forme", "Concu pour accrocher davantage la balle", "Les cordages formes cherchent souvent a augmenter l'accroche et le potentiel de spin. Ils peuvent sembler plus tranchants et plus agressifs, surtout chez les joueurs qui brossent fort."],
          ["Texture", "La surface change les sensations", "Les cordages textures utilisent des reliefs ou des revetements pour influencer l'accroche et la reponse. Ils se situent souvent entre les ronds lisses et les formes bien marques."],
          ["Le spin ne vient pas que de la forme", "Le snapback compte aussi", "La forme aide, mais le spin ne vient pas seulement des aretes. La facon dont la corde glisse et revient en place peut compter autant que la forme visible."],
          ["Differences de confort", "Les cordages plus agressifs peuvent sembler plus fermes", "Certains cordages formes paraissent un peu plus fermes ou plus directs que des options plus lisses. Si votre montage est deja dur, une version plus ronde peut valoir le test."],
          ["Testez dans une meme famille", "Les petits changements sont plus faciles a sentir", "Une bonne experience consiste a comparer des versions rondes et formees dans la meme famille de marque. Cela aide a isoler l'effet de la forme sans trop d'autres variables."]
        ]
      },
      es: {
        heroTitle: "Guia de forma de cuerda",
        heroText: "Las cuerdas redondas, con forma y texturadas no agarran la bola de la misma manera. La forma suele cambiar cuan limpia, agresiva o controlada se siente la respuesta.",
        sectionEyebrow: "Guia esencial",
        sectionTitle: "Redonda vs con forma vs texturada",
        cards: [
          ["Redonda", "Mas suave y normalmente mas predecible", "Las cuerdas redondas suelen sentirse mas limpias y directas. Muchos jugadores las prefieren por su previsibilidad, deslizamiento facil y respuesta mas simple."],
          ["Con forma", "Pensada para agarrar mas la bola", "Las cuerdas con forma suelen buscar mas mordida y potencial de spin. Pueden sentirse mas afiladas y agresivas, sobre todo para quien cepilla fuerte la pelota."],
          ["Texturada", "La superficie cambia el tacto", "Las cuerdas texturadas usan relieves o recubrimientos para influir en el agarre y la respuesta. Suelen quedar entre las redondas lisas y los perfiles claramente marcados."],
          ["El spin no depende solo de la forma", "El snapback tambien importa", "La forma ayuda, pero el spin no viene solo de los bordes. Como la cuerda se desliza y vuelve a su sitio puede importar tanto como la forma visible."],
          ["Diferencias de comodidad", "Las cuerdas mas agresivas pueden sentirse mas firmes", "Algunas cuerdas con forma se sienten un poco mas firmes o directas que opciones mas suaves. Si tu setup ya es duro, una version mas redonda puede ser una buena prueba."],
          ["Prueba dentro de una misma familia", "Los pequenos cambios se notan mejor", "Un buen experimento es comparar cuerdas redondas y con forma dentro de la misma familia de marca. Asi es mas facil notar que cambio realmente la forma."]
        ]
      },
      it: {
        heroTitle: "Guida alla forma della corda",
        heroText: "Le corde tonde, sagomate e testurizzate non agganciano la palla allo stesso modo. La forma cambia spesso quanto il colpo sembra netto, aggressivo o controllato.",
        sectionEyebrow: "Guida essenziale",
        sectionTitle: "Tonda vs sagomata vs testurizzata",
        cards: [
          ["Tonda", "Piu liscia e spesso piu prevedibile", "Le corde tonde di solito sembrano piu pulite e dirette. Molti giocatori le apprezzano per la prevedibilita, lo scorrimento facile e una risposta piu lineare."],
          ["Sagomata", "Pensata per mordere di piu la palla", "Le corde sagomate cercano spesso di aumentare grip e potenziale di spin. Possono sembrare piu taglienti e aggressive, soprattutto per chi spazzola forte la palla."],
          ["Testurizzata", "La superficie cambia il feeling", "Le corde testurizzate usano rilievi o rivestimenti per influenzare presa e risposta. Spesso si collocano a meta tra le tonde lisce e i profili sagomati veri e propri."],
          ["Lo spin non dipende solo dalla forma", "Conta anche lo snapback", "La forma aiuta, ma lo spin non nasce solo dagli spigoli. Il modo in cui la corda scorre e torna in posizione puo contare quanto la forma visibile."],
          ["Differenze di comfort", "Le corde piu aggressive possono sembrare piu rigide", "Alcune corde sagomate sembrano un po piu rigide o dirette rispetto a opzioni piu lisce. Se il setup e gia duro, una versione piu tonda puo valere la prova."],
          ["Prova dentro la stessa famiglia", "I piccoli cambiamenti si sentono meglio", "Un test utile e confrontare corde tonde e sagomate della stessa famiglia di marca. Cosi e piu facile capire cosa ha cambiato davvero la forma."]
        ]
      }
    },
    "restring-guide.html": {
      fr: {
        heroTitle: "Quand recorder",
        heroText: "Meme un excellent montage finit par perdre ses qualites s'il reste trop longtemps dans la raquette. Ce guide donne une facon pratique de juger le bon moment selon votre niveau, votre type de cordage et les sensations du tamis.",
        sectionEyebrow: "Guide essentiel",
        sectionTitle: "Quand un montage doit etre change",
        cards: [
          ["Regle generale", "Plus vous jouez, plus il faut recorder souvent", "Les joueurs qui frappent plus souvent devraient recorder plus souvent. Meme sans casser, un cordage perd habituellement vivacite, controle et confort avec le temps."],
          ["Cordages poly", "Ils meurent souvent avant de casser", "Le poly doit souvent etre change selon le ressenti, pas seulement la casse. Des qu'il devient plat, dur ou imprevisible, il a souvent passe sa meilleure fenetre."],
          ["Multis et boyau", "Surveillez l'effilochage et la perte de controle", "Les cordages plus souples peuvent rester confortables plus longtemps, mais ils fatiguent aussi. Effilochage accru, reponse molle et precision en baisse sont des signes courants."],
          ["Si cela devient dur", "N'attendez pas trop", "Un tamis qui devient soudain planche, dur ou mort a souvent besoin d'etre remplace. Jouer trop longtemps avec des cordes fatiguees peut empirer les sensations sans qu'aucune corde ne casse."],
          ["Pour les joueurs de competition", "La regularite compte le plus", "Les joueurs qui disputent souvent des matchs gagnent generalement a recorder selon un calendrier plutot qu'a attendre une panne evidente. Cela garde la reponse plus stable d'un match a l'autre."],
          ["Test simple", "Demandez-vous si la corde joue encore comme elle-meme", "Si le montage ne ressemble plus a la corde que vous aimiez au depart, il a probablement besoin d'attention. La perte de sensations est l'un des signaux les plus clairs."]
        ]
      },
      es: {
        heroTitle: "Cada cuanto reencordar",
        heroText: "Incluso un gran setup deja de rendir cuando permanece demasiado tiempo en la raqueta. Esta guia ofrece una forma practica de decidir el momento segun nivel, tipo de cuerda y sensaciones del encordado.",
        sectionEyebrow: "Guia esencial",
        sectionTitle: "Cuando un setup ya debe cambiarse",
        cards: [
          ["Regla general", "Mas juego significa reencordar mas", "Los jugadores que pegan mas a menudo deberian reencordar con mas frecuencia. Aunque la cuerda no se rompa, suele perder viveza, control y comodidad con el tiempo."],
          ["Cuerdas poly", "Normalmente mueren antes de romperse", "El poly suele necesitar cambio por sensaciones, no solo por rotura. Cuando empieza a sentirse plano, duro o impredecible, normalmente ya paso su mejor ventana."],
          ["Multis y gut", "Vigila el deshilachado y la perdida de control", "Las cuerdas mas suaves pueden seguir siendo comodas durante mas tiempo, pero tambien caen. Mas deshilachado, respuesta blanda y menos precision suelen ser senales claras."],
          ["Si se siente dura", "No esperes demasiado", "Un encordado que de repente se siente tabla, duro o muerto suele pedir cambio. Jugar demasiado tiempo con cuerdas viejas puede empeorar mucho la sensacion aunque no se haya roto nada."],
          ["Para jugadores competitivos", "La consistencia importa mas", "Los jugadores que compiten con regularidad suelen beneficiarse de reencordar por calendario en lugar de esperar a un fallo obvio. Asi mantienen una respuesta mas repetible partido a partido."],
          ["Comprobacion simple", "Pregunta si la cuerda sigue sintiendose como ella misma", "Si el setup ya no se parece a la cuerda que te gustaba al principio, probablemente necesita atencion. La perdida de sensaciones es una de las senales mas claras."]
        ]
      },
      it: {
        heroTitle: "Quanto spesso reincordare",
        heroText: "Anche un ottimo setup smette di rendere quando resta troppo a lungo sulla racchetta. Questa guida offre un modo pratico per capire il momento giusto in base al livello, al tipo di corda e alle sensazioni del piatto corde.",
        sectionEyebrow: "Guida essenziale",
        sectionTitle: "Quando un setup va cambiato",
        cards: [
          ["Regola generale", "Piu giochi, piu spesso devi reincordare", "Chi gioca piu spesso dovrebbe reincordare piu spesso. Anche senza rottura, una corda perde normalmente vivacita, controllo e comfort con il tempo."],
          ["Corde poly", "Spesso muoiono prima di rompersi", "Il poly spesso va cambiato in base alle sensazioni, non solo alla rottura. Quando inizia a sembrare piatto, duro o imprevedibile, di solito ha gia superato la sua finestra migliore."],
          ["Multi e budello", "Osserva sfrangiatura e perdita di controllo", "Le corde piu morbide possono restare confortevoli piu a lungo, ma anche loro calano. Sfrangiatura maggiore, risposta pastosa e precisione in calo sono segnali comuni."],
          ["Se sembra dura", "Non aspettare troppo", "Un piatto corde che all'improvviso sembra secco, duro o morto spesso ha bisogno di essere sostituito. Giocare troppo a lungo con corde stanche puo peggiorare molto il feeling anche senza rotture."],
          ["Per i giocatori agonisti", "La costanza conta di piu", "Chi compete regolarmente trae spesso vantaggio dal reincordare su programma invece di aspettare un cedimento evidente. Cosi la risposta resta piu costante partita dopo partita."],
          ["Controllo semplice", "Chiediti se la corda sembra ancora se stessa", "Se il setup non assomiglia piu alla corda che ti piaceva all'inizio, probabilmente richiede attenzione. La perdita di feeling e uno dei segnali piu chiari."]
        ]
      }
    },
    "player-type-guide.html": {
      fr: {
        heroTitle: "Meilleurs cordages selon le profil du joueur",
        heroText: "Des joueurs differents attendent des choses differentes du tamis. Ce guide relie les profils de joueurs les plus courants aux types de cordages qui leur conviennent le plus souvent.",
        sectionEyebrow: "Guide essentiel",
        sectionTitle: "Directions typiques selon le profil",
        cards: [
          ["Debutant", "Priorite a la profondeur facile et au confort", "Les debutants profitent souvent de montages plus simples, plus souples et plus indulgents. Le synthetic gut et le multifilament sont souvent plus faciles a vivre qu'un poly rigide."],
          ["Intermediaire all-court", "Une reponse equilibree compte", "Les joueurs en progression aiment souvent des cordages qui melangent controle et toucher sans devenir trop exigeants. C'est une zone ou co-polys, multis et hybrides peuvent tous avoir du sens."],
          ["Joueur avance a fort topspin", "Le spin et le controle deviennent prioritaires", "Les joueurs qui accelerent fort avec intention se dirigent souvent vers le poly ou le co-poly forme, car ces cordages encaissent mieux les swings agressifs et recompensent la vitesse de tete de raquette."],
          ["Joueur de toucher", "Le feeling et le pocketing ressortent", "Les joueurs qui valorisent le toucher au filet et sur les variations de rythme preferent souvent des cordages plus souples, des multis premium, du boyau ou des hybrides qui preservent le contact."],
          ["Junior en developpement", "Ne pas se precipiter vers des montages durs", "Un junior n'a pas toujours besoin d'un full poly simplement parce qu'il swingue fort. Le confort, la mecanique saine et la regularite restent essentiels pendant la croissance."],
          ["Senior ou joueur en quete de confort", "Plus souple est souvent plus malin", "Les joueurs qui veulent plus de confort, de profondeur facile ou d'aide du tamis se portent souvent mieux avec du multifilament, du boyau ou d'autres solutions plus amicales pour le bras."]
        ]
      },
      es: {
        heroTitle: "Mejores cuerdas por tipo de jugador",
        heroText: "Distintos jugadores necesitan cosas distintas del encordado. Esta guia relaciona perfiles comunes de jugador con los tipos de cuerda que normalmente les encajan mejor.",
        sectionEyebrow: "Guia esencial",
        sectionTitle: "Direcciones tipicas por perfil de jugador",
        cards: [
          ["Principiante", "Primero profundidad facil y comodidad", "Los principiantes suelen beneficiarse de setups mas simples, suaves y permisivos. El synthetic gut y el multifilamento suelen ser mas faciles de llevar que un poly rigido."],
          ["Intermedio all-court", "Importa una respuesta equilibrada", "Los jugadores en fase intermedia suelen preferir cuerdas que mezclen control y tacto sin volverse demasiado exigentes. Aqui pueden tener sentido buenos co-polys, multis e hibridos."],
          ["Jugador avanzado con mucho topspin", "Spin y control pasan a importar mas", "Quien acelera mucho y golpea con intencion suele ir hacia poly o co-poly con forma, porque normalmente soportan mejor swings agresivos y premian la velocidad de cabeza de raqueta."],
          ["Jugador de toque", "Destacan tacto y pocketing", "Los jugadores que valoran el tacto en la red y en cambios de ritmo suelen preferir cuerdas mas suaves, multis premium, gut o hibridos que preserven el contacto."],
          ["Junior desarrollando potencia", "No corras hacia setups duros", "Un junior no siempre necesita full poly solo porque golpee fuerte. La comodidad, la mecanica sana y la consistencia siguen importando mientras el jugador se desarrolla fisicamente."],
          ["Senior o jugador que busca comodidad", "Mas suave suele ser mas inteligente", "Los jugadores que quieren comodidad, profundidad facil o mas ayuda del encordado normalmente se llevan mejor con multifilamento, gut u otros montajes mas amigables con el brazo."]
        ]
      },
      it: {
        heroTitle: "Migliori corde per tipo di giocatore",
        heroText: "Giocatori diversi cercano cose diverse dal piatto corde. Questa guida collega i profili di gioco piu comuni ai tipi di corde che di solito li aiutano di piu.",
        sectionEyebrow: "Guida essenziale",
        sectionTitle: "Direzioni tipiche per profilo di giocatore",
        cards: [
          ["Principiante", "Prima comfort e profondita facile", "I principianti traggono spesso vantaggio da setup piu semplici, morbidi e permissivi. Synthetic gut e multifilamento sono spesso piu facili da gestire rispetto a un poly rigido."],
          ["Intermedio all-court", "Conta una risposta equilibrata", "I giocatori in crescita apprezzano spesso corde che uniscono controllo e feeling senza diventare troppo impegnative. Qui possono avere senso buoni co-poly, multi e ibridi."],
          ["Giocatore avanzato con topspin", "Spin e controllo diventano piu importanti", "Chi accelera forte con intenzione tende spesso verso poly o co-poly sagomati, perche in genere reggono meglio gli swing aggressivi e premiano la velocita della testa racchetta."],
          ["Giocatore di tocco", "Feeling e pocketing emergono", "I giocatori che danno valore al tocco a rete e alle variazioni di ritmo spesso preferiscono corde piu morbide, multi premium, budello o ibridi che conservano sensibilita."],
          ["Junior in sviluppo", "Non correre verso setup troppo duri", "Un junior non ha sempre bisogno di full poly solo perche colpisce forte. Comfort, meccanica sana e continuita restano fondamentali durante la crescita fisica."],
          ["Senior o giocatore orientato al comfort", "Piu morbido e spesso piu intelligente", "I giocatori che vogliono comfort, profondita facile o piu aiuto dal piatto corde di solito stanno meglio con multifilamento, budello o altri setup piu gentili sul braccio."]
        ]
      }
    },
    "best-by-need.html": {
      fr: {
        heroTitle: "Meilleurs cordages selon le besoin",
        heroText: "Certains joueurs choisissent par categorie, mais beaucoup choisissent par probleme a resoudre. Ce guide relie des besoins comme le spin, la puissance, le confort, le controle et la durabilite aux types de cordages les plus adaptes.",
        sectionEyebrow: "Guide essentiel",
        sectionTitle: "Que chercher selon l'objectif",
        cards: [
          ["Pour le spin", "Regardez du cote des polys et des profils formes", "Les joueurs qui cherchent plus d'accroche et de snapback se retrouvent souvent du cote du poly ou du co-poly, surtout avec des cordages penses pour des swings rapides."],
          ["Pour le controle", "Choisissez une reponse plus ferme et plus directe", "Les joueurs axes sur le controle aiment souvent des cordages qui lancent plus bas et repondent de facon previsible sous pression. Des co-polys fermes et des hybrides controles entrent souvent ici."],
          ["Pour la puissance", "Les cordages plus souples et elastiques aident", "Si vous voulez de la profondeur facile et moins d'effort, les multifilaments, le boyau et les constructions plus vives apportent generalement plus d'aide qu'un poly axe controle."],
          ["Pour le confort", "Allez vers des materiaux plus souples", "Les joueurs en quete de confort font souvent mieux avec du multifilament, du boyau naturel ou des hybrides souples. La baisse de tension peut compter autant que la categorie elle-meme."],
          ["Pour la durabilite", "Allez plus epais ou plus ferme", "Si vous cassez trop vite, des jauges plus epaisses et des constructions plus robustes sont souvent la premiere reponse. Il ne faut pas toujours changer de famille, parfois une version plus solide suffit."],
          ["Pour le toucher", "Cherchez sensations et retour d'information", "Les joueurs sensibles au pocketing, au toucher et au feedback preferent souvent des multis premium, du boyau ou des hybrides plus souples qui preservent les sensations a l'impact."]
        ]
      },
      es: {
        heroTitle: "Mejores cuerdas segun la necesidad",
        heroText: "Algunos jugadores compran por categoria, pero muchos compran por problema. Esta guia conecta necesidades como spin, potencia, comodidad, control y durabilidad con los tipos de cuerda que normalmente las resuelven mejor.",
        sectionEyebrow: "Guia esencial",
        sectionTitle: "Que buscar segun el objetivo",
        cards: [
          ["Para spin", "Mira hacia poly y perfiles con forma", "Los jugadores que buscan mas mordida y snapback suelen acabar en poly o co-poly, especialmente con cuerdas pensadas para swings mas rapidos."],
          ["Para control", "Elige una respuesta mas firme y directa", "Los jugadores centrados en el control suelen preferir cuerdas que lancen mas bajo y respondan con mas previsibilidad bajo presion. Aqui suelen encajar co-polys firmes e hibridos controlados."],
          ["Para potencia", "Las cuerdas mas suaves y elasticas ayudan", "Si quieres profundidad facil y menos esfuerzo, multifilamento, gut y construcciones mas vivas suelen ofrecer mas ayuda que un poly orientado al control."],
          ["Para comodidad", "Acercate a materiales mas suaves", "Quien busca comodidad suele hacerlo mejor con multifilamento, natural gut o hibridos suaves. Bajar la tension puede importar tanto como la categoria de cuerda."],
          ["Para durabilidad", "Ve a mas grosor o mas firmeza", "Si rompes demasiado rapido, calibres mas gruesos y construcciones mas duraderas suelen ser la primera respuesta. No siempre hace falta cambiar de familia, a veces basta una version mas resistente."],
          ["Para tacto", "Busca toque y feedback", "Los jugadores que valoran pocketing, tacto y feedback suelen preferir multis premium, gut o hibridos mas suaves que mantengan detalle en el impacto."]
        ]
      },
      it: {
        heroTitle: "Migliori corde per esigenza",
        heroText: "Alcuni giocatori scelgono per categoria, ma molti scelgono in base al problema da risolvere. Questa guida collega esigenze come spin, potenza, comfort, controllo e durata ai tipi di corde che di solito funzionano meglio.",
        sectionEyebrow: "Guida essenziale",
        sectionTitle: "Cosa cercare in base all'obiettivo",
        cards: [
          ["Per lo spin", "Guarda verso poly e profili sagomati", "I giocatori che cercano piu presa e snapback finiscono spesso nella categoria poly o co-poly, specialmente con corde pensate per swing veloci."],
          ["Per il controllo", "Scegli una risposta piu rigida e diretta", "I giocatori orientati al controllo spesso preferiscono corde che lanciano piu basso e rispondono in modo piu prevedibile sotto pressione. Qui rientrano spesso co-poly rigidi e ibridi controllati."],
          ["Per la potenza", "Le corde piu morbide ed elastiche aiutano", "Se vuoi profondita facile e meno sforzo, multifilamento, budello e costruzioni piu vive offrono di solito piu assistenza rispetto a un poly focalizzato sul controllo."],
          ["Per il comfort", "Vai verso materiali piu morbidi", "Chi cerca comfort di solito si trova meglio con multifilamento, budello naturale o ibridi piu morbidi. Abbassare la tensione puo contare tanto quanto la categoria stessa."],
          ["Per la durata", "Vai piu spesso o piu rigido", "Se rompi troppo in fretta, calibri piu spessi e costruzioni piu robuste sono spesso la prima risposta. Non serve sempre cambiare famiglia: a volte basta una versione piu resistente."],
          ["Per il feeling", "Cerca tocco e feedback", "I giocatori che danno valore a pocketing, tocco e feedback spesso preferiscono multi premium, budello o ibridi piu morbidi che preservano dettaglio all'impatto."]
        ]
      }
    },
    "popular-comparisons.html": {
      fr: {
        heroTitle: "Comparaisons populaires de cordages",
        heroText: "Voici quelques duels que les joueurs demandent le plus souvent. Utilisez-les comme guide rapide quand deux cordages connus semblent proches sur le papier mais differents sur le court.",
        sectionEyebrow: "Guide essentiel",
        sectionTitle: "Duels les plus courants",
        cards: [
          ["RPM Blast vs Hyper-G", "Deux references modernes du spin", "RPM Blast est souvent decrit comme un peu plus lisse et plus controle, tandis que Hyper-G est souvent associe a une reponse plus ferme et plus mordante. Les joueurs les comparent souvent pour choisir un poly performance forme."],
          ["ALU Power vs 4G", "Toucher contre stabilite", "ALU Power est souvent choisi pour son toucher plus vivant, alors que 4G est plutot associe a une reponse plus ferme, plus verrouillee et a une meilleure tenue de tension dans le temps."],
          ["X-One Biphase vs Wilson NXT", "Duel de multis premium", "Les joueurs comparent souvent ces deux cordages quand ils veulent confort et puissance sans passer au boyau naturel. Le choix depend souvent du toucher prefere, du croustillant et du pocketing."],
          ["Poly Tour Pro vs Lynx Tour", "Poly plus souple vs option spin plus ferme", "Poly Tour Pro est souvent vu comme un poly plus doux et plus polyvalent, alors que Lynx Tour attire davantage les joueurs voulant une reponse plus directe et plus controlee."],
          ["Boyau naturel vs Multifilament", "Deux routes premium vers le confort", "C'est une comparaison courante pour les joueurs qui privilegient le toucher et le confort du bras. Le boyau reste souvent la reference ultime, tandis que le multifilament est l'alternative pratique plus accessible."],
          ["Poly rond vs Poly forme", "Previsibilite contre mordant supplementaire", "Les joueurs comparent souvent ces categories plutot qu'un modele exact. Le poly rond semble en general plus lisse et plus propre, tandis que le poly forme est choisi pour une reponse plus axee spin."]
        ]
      },
      es: {
        heroTitle: "Comparaciones populares de cuerdas",
        heroText: "Estos son algunos de los enfrentamientos que mas preguntan los jugadores. Usalos como guia rapida cuando dos cuerdas conocidas parecen parecidas sobre el papel pero se sienten distintas en pista.",
        sectionEyebrow: "Guia esencial",
        sectionTitle: "Enfrentamientos mas comunes",
        cards: [
          ["RPM Blast vs Hyper-G", "Dos favoritos modernos del spin", "RPM Blast suele describirse como algo mas suave y controlada, mientras que Hyper-G suele asociarse con una respuesta un poco mas firme y mas mordiente. Muchos jugadores las comparan al elegir un poly de rendimiento con forma."],
          ["ALU Power vs 4G", "Tacto frente a estabilidad", "ALU Power suele elegirse por su sensacion mas viva y su toque, mientras que 4G suele asociarse con una respuesta mas firme, mas bloqueada y con mejor estabilidad de tension con el tiempo."],
          ["X-One Biphase vs Wilson NXT", "Duelo de multis premium", "Los jugadores suelen compararlas cuando buscan comodidad y potencia sin llegar al natural gut. La eleccion suele depender del tacto preferido, la respuesta crujiente y el pocketing."],
          ["Poly Tour Pro vs Lynx Tour", "Poly mas suave frente a opcion mas firme para spin", "Poly Tour Pro suele verse como el poly mas amigable y completo, mientras que Lynx Tour suele atraer a quien quiere una respuesta mas directa y mas controlada."],
          ["Natural Gut vs Multifilamento", "Caminos premium hacia la comodidad", "Es una comparacion muy comun para jugadores que priorizan tacto y comodidad para el brazo. El gut suele ser la referencia premium, mientras que el multifilamento actua como alternativa practica mas accesible."],
          ["Poly redondo vs Poly con forma", "Previsibilidad frente a mordida extra", "Los jugadores suelen comparar mas estas categorias que cuerdas exactas. El poly redondo suele sentirse mas limpio y suave, mientras que el poly con forma suele elegirse por una respuesta mas orientada al spin."]
        ]
      },
      it: {
        heroTitle: "Confronti popolari tra corde",
        heroText: "Questi sono alcuni dei confronti che i giocatori chiedono piu spesso. Usali come guida rapida quando due corde note sembrano simili sulla carta ma diverse in campo.",
        sectionEyebrow: "Guida essenziale",
        sectionTitle: "Confronti testa a testa piu comuni",
        cards: [
          ["RPM Blast vs Hyper-G", "Due favorite moderne per lo spin", "RPM Blast viene spesso descritta come un po piu liscia e controllata, mentre Hyper-G e spesso associata a una risposta un po piu rigida e piu aggressiva sulla palla. I giocatori le confrontano spesso quando scelgono un poly sagomato performante."],
          ["ALU Power vs 4G", "Feeling contro stabilita", "ALU Power viene spesso scelta per il feeling piu vivo e il tocco, mentre 4G e di solito associata a una risposta piu rigida, piu bloccata e a una migliore tenuta di tensione nel tempo."],
          ["X-One Biphase vs Wilson NXT", "Sfida tra multi premium", "I giocatori confrontano spesso queste corde quando vogliono comfort e potenza senza arrivare al budello naturale. La scelta dipende spesso da feeling preferito, crispness e pocketing."],
          ["Poly Tour Pro vs Lynx Tour", "Poly piu morbido contro opzione spin piu rigida", "Poly Tour Pro e spesso vista come il poly piu amichevole e completo, mentre Lynx Tour piace di piu a chi cerca una risposta piu diretta e controllata."],
          ["Budello naturale vs Multifilamento", "Due strade premium verso il comfort", "E un confronto comune per i giocatori che danno priorita a feeling e comfort del braccio. Il budello resta di solito il riferimento premium, mentre il multifilamento e l'alternativa pratica piu accessibile."],
          ["Poly tondo vs Poly sagomato", "Prevedibilita contro mordente extra", "I giocatori spesso confrontano queste categorie piu che modelli precisi. Il poly tondo tende a sembrare piu liscio e pulito, mentre il poly sagomato viene scelto per una risposta piu orientata allo spin."]
        ]
      }
    }
  };

  function getCurrentGuidePage() {
    const path = window.location.pathname || "/";
    const file = path.split("/").filter(Boolean).pop() || "index.html";
    if (GUIDE_PAGE_CONTENT[file]) return file;

    const normalized = file.toLowerCase();
    if (GUIDE_PAGE_CONTENT[normalized]) return normalized;

    if (!normalized.includes(".")) {
      const htmlKey = `${normalized}.html`;
      if (GUIDE_PAGE_CONTENT[htmlKey]) return htmlKey;
    }

    return normalized || "index.html";
  }

  function applyGuideTranslations() {
    const page = getCurrentGuidePage();
    const language = siteI18n.getLanguage();
    const pageContent = GUIDE_PAGE_CONTENT[page];
    const content = pageContent ? pageContent[language] : null;
    if (!content) return;

    const heroTitle = document.querySelector(".hero-card h1");
    const heroText = document.querySelector(".hero-card .summary-copy");
    const sectionEyebrow = document.querySelector(".results-header .eyebrow");
    const sectionTitle = document.querySelector(".results-header h2");

    if (heroTitle) heroTitle.textContent = content.heroTitle;
    if (heroText) heroText.textContent = content.heroText;
    if (sectionEyebrow) sectionEyebrow.textContent = content.sectionEyebrow;
    if (sectionTitle) sectionTitle.textContent = content.sectionTitle;

    (content.cards || []).forEach((card, index) => {
      const article = document.querySelectorAll(".type-guide-card")[index];
      if (!article) return;
      const eyebrow = article.querySelector(".eyebrow");
      const title = article.querySelector("h3");
      const text = article.querySelector(".summary-copy");
      if (eyebrow) eyebrow.textContent = card[0];
      if (title) title.textContent = card[1];
      if (text) text.textContent = card[2];
    });
  }

  window.TSL_APPLY_GUIDE_TRANSLATIONS = applyGuideTranslations;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyGuideTranslations, { once: true });
  } else {
    applyGuideTranslations();
  }
  window.addEventListener("load", applyGuideTranslations, { once: true });
  document.addEventListener("tsl-language-change", applyGuideTranslations);
  document.addEventListener("click", (event) => {
    const button = event.target && event.target.closest ? event.target.closest(".language-switcher-button") : null;
    if (!button) return;
    window.setTimeout(applyGuideTranslations, 0);
  });
  if (typeof MutationObserver !== "undefined" && document.documentElement) {
    const observer = new MutationObserver(() => {
      applyGuideTranslations();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
})();
