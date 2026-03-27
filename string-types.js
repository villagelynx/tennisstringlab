const guideTranslations = {
  en: [
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
  ],
  fr: [
    {
      eyebrow: "Poly",
      title: "Cordages poly",
      text: "Les cordages poly privilegient souvent le spin, le controle et la durabilite. Ils sont generalement plus fermes et conviennent surtout aux joueurs avec de grandes vitesses de bras."
    },
    {
      eyebrow: "Co-Poly",
      title: "Cordages co-poly",
      text: "Les co-poly sont une version plus affinee du polyester. Ils restent orientes spin et controle, mais beaucoup offrent un toucher un peu plus vivant ou plus confortable."
    },
    {
      eyebrow: "Multifilament",
      title: "Cordages multifilament",
      text: "Les multifilaments sont construits pour le confort, la puissance et un toucher plus souple. Ils conviennent souvent aux joueurs qui veulent plus de profondeur et de tolerance."
    },
    {
      eyebrow: "Natural Gut",
      title: "Boyau naturel",
      text: "Le boyau naturel est connu pour son toucher haut de gamme, son confort, sa puissance et sa tenue de tension. Il est souvent choisi pour des montages premium ou hybrides."
    },
    {
      eyebrow: "Synthetic Gut",
      title: "Synthetic gut",
      text: "Le synthetic gut offre un bon equilibre entre jouabilite, prix et simplicite. C'est souvent une option solide pour les joueurs en progression."
    },
    {
      eyebrow: "Hybrid",
      title: "Montages hybrides",
      text: "Un hybride combine deux cordages differents pour melanger leurs points forts, comme spin plus confort ou controle plus toucher."
    }
  ],
  es: [
    {
      eyebrow: "Poly",
      title: "Cuerdas poly",
      text: "Las cuerdas poly suelen favorecer el spin, el control y la durabilidad. Normalmente son mas firmes y funcionan mejor para jugadores con swings rapidos."
    },
    {
      eyebrow: "Co-Poly",
      title: "Cuerdas co-poly",
      text: "Las co-poly son una rama mas refinada del poliester. Siguen orientadas al spin y al control, pero muchas se sienten un poco mas vivas o comodas."
    },
    {
      eyebrow: "Multifilament",
      title: "Cuerdas multifilamento",
      text: "Los multifilamentos estan hechos para comodidad, potencia y una sensacion mas suave. Suelen ir muy bien a jugadores que quieren profundidad facil y perdon."
    },
    {
      eyebrow: "Natural Gut",
      title: "Tripa natural",
      text: "La tripa natural es conocida por su gran sensacion, comodidad, potencia y mantenimiento de tension. A menudo se elige para configuraciones premium o hibridas."
    },
    {
      eyebrow: "Synthetic Gut",
      title: "Synthetic gut",
      text: "El synthetic gut ofrece un equilibrio general entre jugabilidad, precio y facilidad de uso. Suele ser una opcion solida para jugadores en desarrollo."
    },
    {
      eyebrow: "Hybrid",
      title: "Montajes hibridos",
      text: "Un hibrido combina dos cuerdas distintas para mezclar ventajas, como spin mas comodidad o control mas tacto."
    }
  ],
  it: [
    {
      eyebrow: "Poly",
      title: "Corde poly",
      text: "Le corde poly privilegiano spesso spin, controllo e durata. Di solito sono piu rigide e funzionano meglio per giocatori con swing veloci."
    },
    {
      eyebrow: "Co-Poly",
      title: "Corde co-poly",
      text: "Le co-poly sono una versione piu raffinata del poliestere. Restano orientate a spin e controllo, ma molte risultano un po piu vive o confortevoli."
    },
    {
      eyebrow: "Multifilament",
      title: "Corde multifilamento",
      text: "I multifilamenti sono pensati per comfort, potenza e una sensazione piu morbida. Spesso sono ideali per chi cerca profondita facile e maggiore tolleranza."
    },
    {
      eyebrow: "Natural Gut",
      title: "Budello naturale",
      text: "Il budello naturale e noto per tocco eccellente, comfort, potenza e tenuta di tensione. Viene spesso scelto per configurazioni premium o ibride."
    },
    {
      eyebrow: "Synthetic Gut",
      title: "Synthetic gut",
      text: "Il synthetic gut offre un buon equilibrio tra giocabilita, prezzo e semplicita. Spesso e una scelta valida per i giocatori in crescita."
    },
    {
      eyebrow: "Hybrid",
      title: "Setup ibridi",
      text: "Un ibrido combina due corde diverse per unire vantaggi come spin e comfort oppure controllo e tocco."
    }
  ]
};

const siteI18n = window.TSL_I18N || { getLanguage: () => "en", t: (_key, fallback, vars) => {
  let text = fallback || "";
  Object.entries(vars || {}).forEach(([name, value]) => {
    text = text.replaceAll(`{${name}}`, String(value));
  });
  return text;
} };

const guideGrid = document.getElementById("stringTypeGuideGrid");
const guideCount = document.getElementById("typeGuideCount");

function renderStringTypeGuides() {
  if (!guideGrid || !guideCount) return;

  const language = siteI18n.getLanguage();
  const guides = guideTranslations[language] || guideTranslations.en;
  guideCount.textContent = siteI18n.t("typeGuideDescriptions", "{count} descriptions", { count: guides.length });
  guideGrid.innerHTML = guides.map((entry) => `
    <article class="type-guide-card">
      <p class="eyebrow">${entry.eyebrow}</p>
      <h3>${entry.title}</h3>
      <p class="summary-copy">${entry.text}</p>
    </article>
  `).join("");
}

renderStringTypeGuides();

document.addEventListener("tsl-language-change", () => {
  renderStringTypeGuides();
});
