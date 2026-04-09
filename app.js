const STYLE_OPTIONS = [
  { value: "aggressive-baseliner", label: "Aggressive Baseliner" },
  { value: "baseline-grinder", label: "Baseline Grinder" },
  { value: "counterpuncher", label: "Counterpuncher" },
  { value: "all-court-attacker", label: "All-Court Attacker" },
  { value: "big-server-first-striker", label: "Big Server + First Striker" },
  { value: "serve-volleyer", label: "Serve + Volleyer" },
  { value: "disruptor-variety", label: "Disruptor / Variety Player" }
];

const SURFACE_OPTIONS = [
  { value: "hard", label: "Hard Court" },
  { value: "clay", label: "Clay" },
  { value: "grass", label: "Grass" },
  { value: "indoor", label: "Indoor Hard" }
];

const STRENGTH_OPTIONS = [
  { id: "big-first-serve", label: "Big first serve" },
  { id: "serve-placement", label: "Serve placement" },
  { id: "heavy-forehand", label: "Heavy forehand" },
  { id: "inside-out-forehand", label: "Inside-out forehand" },
  { id: "solid-backhand", label: "Reliable backhand" },
  { id: "return-pressure", label: "Return pressure" },
  { id: "consistency", label: "Consistency" },
  { id: "court-speed", label: "Speed / court coverage" },
  { id: "net-finishing", label: "Net finishing" },
  { id: "slice-variety", label: "Slice / variety" },
  { id: "drop-shot-touch", label: "Drop shot touch" },
  { id: "mental-resilience", label: "Mental resilience" },
  { id: "passing-shots", label: "Passing shots" },
  { id: "short-angles", label: "Short-angle creation" }
];

const WEAKNESS_OPTIONS = [
  { id: "weak-second-serve", label: "Weak second serve" },
  { id: "backhand-breaks-down", label: "Backhand breaks down" },
  { id: "forehand-sprays", label: "Forehand leaks under pace" },
  { id: "return-struggles", label: "Struggles on return" },
  { id: "short-balls", label: "Short balls sit up" },
  { id: "net-discomfort", label: "Uncomfortable at net" },
  { id: "slice-discomfort", label: "Struggles vs slice" },
  { id: "height-depth-discomfort", label: "Struggles vs height + depth" },
  { id: "wide-recovery", label: "Slow recovery after wide ball" },
  { id: "pressure-overhit", label: "Overhits when trailing" },
  { id: "fitness-drop", label: "Level drops in long rallies" },
  { id: "body-serve-trouble", label: "Trouble with body serve" },
  { id: "low-ball-trouble", label: "Trouble with low balls" },
  { id: "predictable-crosscourt", label: "Predictable crosscourt patterns" }
];

const RATING_FIELDS = [
  { id: "firstServe", label: "1st Serve" },
  { id: "secondServe", label: "2nd Serve" },
  { id: "forehand", label: "Forehand" },
  { id: "backhand", label: "Backhand" },
  { id: "forehandVolley", label: "FH Volley" },
  { id: "backhandVolley", label: "BH Volley" },
  { id: "dropShot", label: "Drop Shot" },
  { id: "lob", label: "Lob" },
  { id: "overhead", label: "Overhead" },
  { id: "fitness", label: "Fitness" },
  { id: "mental", label: "Mental" }
];

const RATING_OPTIONS = [
  { value: "excellent", label: "Excellent", score: 4 },
  { value: "good", label: "Good", score: 3 },
  { value: "average", label: "Average", score: 2 },
  { value: "weak", label: "Weak", score: 1 }
];

const RATING_SCORE = {
  excellent: 4,
  good: 3,
  average: 2,
  weak: 1
};

const optionLabelLookup = new Map(
  [...STYLE_OPTIONS, ...SURFACE_OPTIONS, ...STRENGTH_OPTIONS, ...WEAKNESS_OPTIONS].map((item) => [item.value || item.id, item.label])
);

function tactic(key, text, priority = 50) {
  return { key, text, priority };
}

function meta(text, priority = 60) {
  return { text, priority };
}

const STYLE_BLUEPRINTS = {
  "aggressive-baseliner": {
    headlines: {
      planA: meta("Take time away and own the first strike.", 74),
      planB: meta("If the match gets messy, add shape before you redirect.", 68)
    },
    meta: {
      identity: meta("You win this matchup when you stay front-footed without redlining from bad court position.", 72)
    },
    planA: [
      tactic("ab-forehand-first", "Build your point around the first forehand after serve or return instead of trying to finish off the very first ball.", 73),
      tactic("ab-baseline-position", "Stand on or just inside the baseline whenever the incoming ball is neutral enough to take time away.", 66),
      tactic("ab-close-forward", "After your best heavy crosscourt ball, close forward and finish rather than gifting them another neutral rally.", 64)
    ],
    planB: [
      tactic("ab-margin-reset", "For two games, add one meter of net clearance and two deep crosscourts before you redirect down the line.", 68),
      tactic("ab-simplify-pattern", "Simplify to one serve + one forehand pattern until you stop donating free errors.", 64)
    ],
    cues: [
      tactic("ab-cue-1", "Early feet. Early contact. Heavy first forehand.", 72),
      tactic("ab-cue-2", "Attack from balance, not from hope.", 67)
    ],
    avoid: [
      tactic("ab-avoid-1", "Do not chase highlight-line winners from behind the baseline in neutral rallies.", 70),
      tactic("ab-avoid-2", "Do not stay back too long after you already earned a short ball.", 62)
    ],
    reasons: [
      tactic("ab-reason-1", "Aggressive baseliners get the most value when their tempo forces the opponent to defend before the point settles.", 66)
    ]
  },
  "baseline-grinder": {
    headlines: {
      planA: meta("Win with depth, repeatability, and patience that asks the harder physical question.", 74),
      planB: meta("If the match speeds up on you, slow the rally shape before you re-accelerate.", 67)
    },
    meta: {
      identity: meta("Your edge is making the opponent hit uncomfortable extra balls instead of giving them cheap pace.", 70)
    },
    planA: [
      tactic("bg-depth", "Make depth your first job: deep crosscourt balls that land close to the baseline are your platform.", 72),
      tactic("bg-middle-reset", "Use deep middle balls when you are stretched so you can reset court position without bleeding errors.", 63),
      tactic("bg-tolerance", "Stay in rallies long enough to expose impatience rather than trying to end points too early.", 69)
    ],
    planB: [
      tactic("bg-height", "Add heavier height and shape for a full service game if the opponent is rushing you into lower-margin exchanges.", 66),
      tactic("bg-change-ball", "Once the rally reaches neutral, use one lower slice or shorter angle to break rhythm before going back behind them.", 61)
    ],
    cues: [
      tactic("bg-cue-1", "Depth first, direction second.", 71),
      tactic("bg-cue-2", "One more solid ball before you change.", 68)
    ],
    avoid: [
      tactic("bg-avoid-1", "Do not trade flat pace from identical court positions if that is what the opponent wants.", 68),
      tactic("bg-avoid-2", "Do not let frustration shrink your targets.", 60)
    ],
    reasons: [
      tactic("bg-reason-1", "Baseline grinders win value by shrinking the opponent's margin and extending the physical and mental workload.", 65)
    ]
  },
  counterpuncher: {
    headlines: {
      planA: meta("Absorb first, redirect second, and make the opponent hit the extra pressure ball.", 73),
      planB: meta("If absorbing is not enough, step in sooner and counter from inside the baseline.", 66)
    },
    meta: {
      identity: meta("Your best tennis comes from frustrating the first-strike player and turning their pace into your timing.", 71)
    },
    planA: [
      tactic("cp-absorb", "Use your depth tolerance to neutralize their first two attacks before you counter behind them.", 72),
      tactic("cp-middle", "Keep more balls through the middle third early in points so you do not open the court for them too soon.", 63),
      tactic("cp-redirect", "When they commit hard to one direction, redirect with your best balanced ball and make them recover on the run.", 67)
    ],
    planB: [
      tactic("cp-step-in", "Step half a meter closer on return and neutral rally balls if the opponent is getting too comfortable owning time.", 64),
      tactic("cp-short-angle", "Use one short angle per game to pull them wide and then counter behind the next recovery step.", 60)
    ],
    cues: [
      tactic("cp-cue-1", "Take their pace. Give them one extra ball.", 71),
      tactic("cp-cue-2", "Counter only after you have balance.", 65)
    ],
    avoid: [
      tactic("cp-avoid-1", "Do not start trading unnecessary down-the-line risks if your defense is already asking questions.", 68),
      tactic("cp-avoid-2", "Do not get pinned too far behind the baseline for whole games.", 61)
    ],
    reasons: [
      tactic("cp-reason-1", "Counterpunchers create value when the opponent feels like they must win the point two or three times.", 63)
    ]
  },
  "all-court-attacker": {
    headlines: {
      planA: meta("Win by changing the picture before the opponent can camp in one rhythm.", 74),
      planB: meta("If the variety gets noisy, reduce to your best serve + first-ball pattern.", 65)
    },
    meta: {
      identity: meta("You are strongest when you mix height, pace, and net pressure with a clear pattern behind each change.", 69)
    },
    planA: [
      tactic("aca-mix", "Use deliberate changes of height, spin, and court position so the opponent never sits in one comfortable pattern.", 72),
      tactic("aca-approach", "Attack short balls and move forward behind a ball that forces a low or rushed reply.", 66),
      tactic("aca-return-variety", "Vary return height and direction enough that their first serve + first ball pattern never settles.", 61)
    ],
    planB: [
      tactic("aca-simplify", "If your choices start leaking errors, simplify to one clear rally target and approach only off obvious short balls.", 66),
      tactic("aca-body", "Use more body serves and body returns to keep the opponent from camping on angles.", 58)
    ],
    cues: [
      tactic("aca-cue-1", "Change the picture with purpose, not for entertainment.", 71),
      tactic("aca-cue-2", "Enter the net behind quality, not out of boredom.", 64)
    ],
    avoid: [
      tactic("aca-avoid-1", "Do not use variety that leaves you out of position with no follow-up ball.", 67),
      tactic("aca-avoid-2", "Do not make every rally a creativity contest.", 61)
    ],
    reasons: [
      tactic("aca-reason-1", "All-court attackers separate themselves when each variation forces a specific defensive reply.", 62)
    ]
  },
  "big-server-first-striker": {
    headlines: {
      planA: meta("Protect serve and win with one or two front-foot blows after the return comes back.", 76),
      planB: meta("If the first strike is not landing, use more body targets and deeper middle balls to stabilize.", 69)
    },
    meta: {
      identity: meta("Your advantage comes from serve quality and taking the first neutral ball away from the opponent.", 73)
    },
    planA: [
      tactic("bsf-hold", "Treat every service game like a pressure game: first-serve percentage plus one aggressive follow-up ball.", 74),
      tactic("bsf-short-points", "Shorten points whenever possible, especially after you earn a weak return or mid-court ball.", 66),
      tactic("bsf-return-plus", "On return games, aim to steal one early strike each game instead of trying to out-grind from the back.", 61)
    ],
    planB: [
      tactic("bsf-body", "If your wide or T targets are not landing, shift to heavier body serves and look for the next forehand to the open court.", 69),
      tactic("bsf-middle", "When rallies start, use one deep middle reset before you try to finish from a stable position.", 60)
    ],
    cues: [
      tactic("bsf-cue-1", "Serve with shape, then own the next ball.", 73),
      tactic("bsf-cue-2", "Cheap points count the same.", 68)
    ],
    avoid: [
      tactic("bsf-avoid-1", "Do not force return-game winners too early if your main edge is protecting serve cleanly.", 67),
      tactic("bsf-avoid-2", "Do not overhit second balls just because the first serve did not finish the point.", 63)
    ],
    reasons: [
      tactic("bsf-reason-1", "Big servers gain separation when they turn service games into scoreboard pressure and protect that edge calmly.", 64)
    ]
  },
  "serve-volleyer": {
    headlines: {
      planA: meta("Use serve location and first-volley placement to keep the opponent under immediate stress.", 75),
      planB: meta("If the rushes get picked off, disguise your forward moves and chip-charge more selectively.", 67)
    },
    meta: {
      identity: meta("Your edge is forcing rushed returns and low passing decisions before the opponent settles.", 72)
    },
    planA: [
      tactic("sv-location", "Serve with location first so your first volley is played from advantage, not from survival mode.", 73),
      tactic("sv-first-volley", "Play the first volley deep through the larger court unless the opponent clearly gives you the open angle.", 68),
      tactic("sv-return-game", "On return games, chip low and follow only behind balls that keep their contact below net height.", 60)
    ],
    planB: [
      tactic("sv-fake", "Mix in occasional stay-back service points so the opponent cannot lock into one return picture.", 62),
      tactic("sv-body-serve", "If passes are flying crosscourt, use more body serves and first volleys behind them.", 65)
    ],
    cues: [
      tactic("sv-cue-1", "Low first volley. No hero angle needed.", 72),
      tactic("sv-cue-2", "Close with balance, split early.", 64)
    ],
    avoid: [
      tactic("sv-avoid-1", "Do not approach behind neutral or floating balls that leave easy passing angles.", 68),
      tactic("sv-avoid-2", "Do not turn every second serve into a panic net rush.", 61)
    ],
    reasons: [
      tactic("sv-reason-1", "Serve-and-volley tennis wins when the opponent is rushed into low-quality contact, not when you guess at the net.", 63)
    ]
  },
  "disruptor-variety": {
    headlines: {
      planA: meta("Break rhythm with purpose: height, slice, short-deep changes, and uncomfortable contact points.", 73),
      planB: meta("If the disruptions stop bothering them, go back to depth and pick one variation at a time.", 66)
    },
    meta: {
      identity: meta("Your value comes from making the opponent hit balls they do not enjoy timing, not from random trick shots.", 71)
    },
    planA: [
      tactic("dv-rhythm", "Use height, low slice, and depth changes to keep the opponent from hitting the same contact point twice in a row.", 72),
      tactic("dv-short-deep", "Short-deep combinations work best after you first push them behind the baseline with a high heavy ball.", 66),
      tactic("dv-middle-trap", "Use middle depth more often than you think so the next variation lands from a balanced court position.", 60)
    ],
    planB: [
      tactic("dv-reset", "If the opponent handles the junk comfortably, reset with depth for a game and then reintroduce one disruptive tool.", 67),
      tactic("dv-discipline", "Limit yourself to one surprise change per rally until your error rate cools down.", 60)
    ],
    cues: [
      tactic("dv-cue-1", "Uncomfortable contact beats random creativity.", 72),
      tactic("dv-cue-2", "Push them back first, then surprise them.", 65)
    ],
    avoid: [
      tactic("dv-avoid-1", "Do not feed short neutral balls and call it variety.", 69),
      tactic("dv-avoid-2", "Do not use drop shots without first earning a deep court position.", 62)
    ],
    reasons: [
      tactic("dv-reason-1", "Disruptors are most dangerous when every variation has a setup ball behind it.", 63)
    ]
  }
};

const OPPONENT_RESPONSES = {
  "aggressive-baseliner": {
    meta: {
      pressurePoint: meta("Deny the aggressive baseliner clean first-strike looks and force lower-contact or awkward-tempo balls.", 75)
    },
    planA: [
      tactic("or-ab-low", "Use low balls, body patterns, and changed tempo so they cannot camp on the same contact height.", 72),
      tactic("or-ab-extra-ball", "Make them hit one extra offensive ball before they get paid.", 67)
    ],
    planB: [
      tactic("or-ab-middle", "If they are flying, play more deep middle and then change only once they must generate their own angle.", 63)
    ],
    avoid: [
      tactic("or-ab-feed-slot", "Do not feed repeated medium-paced balls into their strike zone and favorite forehand setup.", 73)
    ]
  },
  "baseline-grinder": {
    meta: {
      pressurePoint: meta("Move the grinder away from repeatable depth and make them defend change of shape or court position.", 72)
    },
    planA: [
      tactic("or-bg-rhythm", "Break their steady rhythm with height changes, occasional low balls, and direction changes from balance.", 68),
      tactic("or-bg-short", "Take controlled chances on short balls so the grinder does not get to extend every rally on their terms.", 64)
    ],
    planB: [
      tactic("or-bg-serve-return", "If rallies get too physical, shift pressure onto serve quality and the first return ball.", 61)
    ],
    avoid: [
      tactic("or-bg-flat-neutral", "Do not settle into identical neutral crosscourt exchanges if they enjoy repetition more than you do.", 70)
    ]
  },
  counterpuncher: {
    meta: {
      pressurePoint: meta("Counterpunchers hate when you finish the point before they turn defense back into neutral.", 77)
    },
    planA: [
      tactic("or-cp-close", "Use your first attack to open the court and your second move to finish, especially by closing forward.", 72),
      tactic("or-cp-no-reset", "Do not give them free reset balls after you have already moved them.", 68)
    ],
    planB: [
      tactic("or-cp-margin", "If they are absorbing everything, keep the same target but add more net clearance before your redirect.", 65)
    ],
    avoid: [
      tactic("or-cp-hurry", "Do not panic because they make one more ball. Stay committed to the pattern, not the first miss.", 69)
    ]
  },
  "all-court-attacker": {
    meta: {
      pressurePoint: meta("The all-court attacker becomes more manageable when you force them to play simple balls from uncomfortable positions.", 71)
    },
    planA: [
      tactic("or-aca-body", "Use body serves, body returns, and deep middle depth to remove the easy angle that starts their variety.", 67),
      tactic("or-aca-pass", "Pass or counter mostly through the middle until their net entries are clearly earned.", 60)
    ],
    planB: [
      tactic("or-aca-boring", "If they are out-creating you, make the match a little boring for two games with shape, middle, and patience.", 63)
    ],
    avoid: [
      tactic("or-aca-random", "Do not try to out-variety the variety player without first stopping their patterns.", 64)
    ]
  },
  "big-server-first-striker": {
    meta: {
      pressurePoint: meta("Against the big server, neutralizing the first two balls matters more than winning flashy rallies.", 78)
    },
    planA: [
      tactic("or-bsf-return-block", "Block or chip the return deep through the middle third and make them hit their next ball from lower-quality court position.", 74),
      tactic("or-bsf-lengthen", "Whenever the point starts, push it one or two balls longer than they want.", 66)
    ],
    planB: [
      tactic("or-bsf-back-up", "If the serve is overwhelming you, back up slightly, prioritize depth, and stop chasing low-margin return winners.", 68)
    ],
    avoid: [
      tactic("or-bsf-hero-return", "Do not try to win every big-serve point with a heroic return swing.", 72)
    ]
  },
  "serve-volleyer": {
    meta: {
      pressurePoint: meta("Serve-and-volley players dislike body returns, dipping contact, and passing decisions taken out of their comfort zone.", 79)
    },
    planA: [
      tactic("or-sv-body", "Use body or backhand returns that dip at their feet so the first volley is defensive.", 75),
      tactic("or-sv-middle-pass", "When rushed, pass through the middle and force an extra volley before chasing angles.", 67)
    ],
    planB: [
      tactic("or-sv-lob", "If they close too well, add one surprise topspin lob each return game to stretch their court positioning.", 59)
    ],
    avoid: [
      tactic("or-sv-angle-chase", "Do not overforce miracle pass angles from outside the court.", 69)
    ]
  },
  "disruptor-variety": {
    meta: {
      pressurePoint: meta("The disruptor loses value when you refuse to get emotional about ugly balls and take time away on the next good contact.", 73)
    },
    planA: [
      tactic("or-dv-early", "Take the first reasonable ball early so their height and junk do not get full time to settle.", 70),
      tactic("or-dv-depth", "Use depth before pace; deep balls stop them from turning every rally into a chaos exchange.", 65)
    ],
    planB: [
      tactic("or-dv-simple", "If the weird ball pattern bothers you, simplify the rally to crosscourt depth for a game and then accelerate again.", 62)
    ],
    avoid: [
      tactic("or-dv-ego", "Do not let frustration make you overhit balls that are only mildly uncomfortable.", 68)
    ]
  }
};

const MATCHUP_OVERRIDES = {
  "aggressive-baseliner|counterpuncher": {
    headlines: {
      planA: meta("Use your tempo plus forward movement before the counterpuncher settles.", 82),
      planB: meta("If they are soaking up pace, keep the target but add more shape before you finish.", 77)
    },
    planA: [
      tactic("mo-ab-cp-1", "Attack the second serve or first neutral ball early, then close forward behind the next deep crosscourt ball.", 80),
      tactic("mo-ab-cp-2", "Direct 65-70% of your rally pressure into the weaker wing or the body so they cannot reset with clean angles.", 74)
    ],
    planB: [
      tactic("mo-ab-cp-3", "If they keep extending rallies, stop changing direction too early; go two heavy crosscourts first, then redirect.", 76)
    ],
    reasons: [
      tactic("mo-ab-cp-r", "This matchup is won by finishing your advantage before the counterpuncher turns defense into another neutral pattern.", 78)
    ]
  },
  "aggressive-baseliner|baseline-grinder": {
    headlines: {
      planA: meta("Push the grinder off repeatable depth before they settle into rally comfort.", 79),
      planB: meta("If your offense is leaking, attack with patience instead of speed alone.", 72)
    },
    planA: [
      tactic("mo-ab-bg-1", "Take balls earlier and use inside-out forehands to expose the grinder's recovery step before they camp in deep rhythm.", 75)
    ],
    planB: [
      tactic("mo-ab-bg-2", "If they are making every ball, use heavier spin and only change direction from balance.", 70)
    ]
  },
  "baseline-grinder|big-server-first-striker": {
    headlines: {
      planA: meta("Neutralize serve first, then drag the match into one extra neutral ball.", 81),
      planB: meta("If you are getting rushed, retreat half a step on return and prioritize depth over aggression.", 75)
    },
    planA: [
      tactic("mo-bg-bsf-1", "Block the serve return deep middle, then make them hit at least one extra rally ball before you open the court.", 79)
    ],
    planB: [
      tactic("mo-bg-bsf-2", "If their serve is dominating, start returns slightly deeper and focus on height and center targets until you settle.", 74)
    ]
  },
  "serve-volleyer|counterpuncher": {
    headlines: {
      planA: meta("Keep the counterpuncher low and rushed before they make the passing lanes predictable.", 79),
      planB: meta("If they read every rush, vary when you come forward rather than abandoning your identity.", 72)
    },
    planA: [
      tactic("mo-sv-cp-1", "Use body serves and first volleys behind the opponent to stop them setting up clean passing angles.", 77)
    ],
    planB: [
      tactic("mo-sv-cp-2", "If returns are dipping perfectly, stay back occasionally and attack the first shorter reply instead.", 70)
    ]
  }
};

const PLAYER_STRENGTH_RULES = {
  "big-first-serve": {
    planA: [
      tactic("ps-big-first-serve", "Lean on a high first-serve percentage so your first tactical advantage starts 1-0 instead of neutral.", 74)
    ],
    reasons: [
      tactic("psr-big-first-serve", "A strong first serve earns simpler holds and creates scoreboard pressure that feeds the rest of the plan.", 65)
    ]
  },
  "serve-placement": {
    planA: [
      tactic("ps-serve-placement", "Use serve location as a tactic tool: body on pressure points, wide only when it opens the next ball cleanly.", 72)
    ]
  },
  "heavy-forehand": {
    planA: [
      tactic("ps-heavy-forehand", "Look to dictate with your heavy forehand into the opponent's weaker wing or into their body before changing direction.", 78)
    ],
    cues: [
      tactic("psc-heavy-forehand", "Forehand first, then the open court.", 71)
    ]
  },
  "inside-out-forehand": {
    planA: [
      tactic("ps-inside-out", "Whenever you earn time, run your forehand around the backhand corner and start with the inside-out pattern before going inside-in.", 75)
    ]
  },
  "solid-backhand": {
    planA: [
      tactic("ps-solid-backhand", "Use your backhand crosscourt as a stable pressure lane so you can wait for the right change-of-direction ball.", 69)
    ]
  },
  "return-pressure": {
    planA: [
      tactic("ps-return-pressure", "Step inside on second serves and force the opponent to start rallies from defense or from the middle of the court.", 79)
    ]
  },
  consistency: {
    planA: [
      tactic("ps-consistency", "Accept a five-to-seven ball build if needed; your consistency lets you attack after the pattern has actually opened.", 68)
    ]
  },
  "court-speed": {
    planA: [
      tactic("ps-court-speed", "Use your speed to stretch them wide and then strike behind their recovery instead of going for the line too early.", 71)
    ]
  },
  "net-finishing": {
    planA: [
      tactic("ps-net-finishing", "Any ball that forces a floating or low-quality reply is a green light to close and finish at net.", 76)
    ]
  },
  "slice-variety": {
    planA: [
      tactic("ps-slice-variety", "Use low skid slices to change rhythm, especially before attacking the next higher-contact ball.", 69)
    ]
  },
  "drop-shot-touch": {
    planA: [
      tactic("ps-drop", "Only use the drop shot after you first push the opponent behind the baseline or when their recovery position gets lazy.", 66)
    ]
  },
  "mental-resilience": {
    planB: [
      tactic("ps-mental", "Stay with the pattern for a full service game before changing. Your composure is an asset, not just your strokes.", 68)
    ]
  },
  "passing-shots": {
    planA: [
      tactic("ps-passing", "If the opponent approaches too casually, invite the net entry with a low reply and trust your passing patterns.", 67)
    ]
  },
  "short-angles": {
    planA: [
      tactic("ps-short-angles", "Use short angles after depth has pushed the opponent back so their first recovery step gets exposed.", 70)
    ]
  }
};

const PLAYER_WEAKNESS_RULES = {
  "weak-second-serve": {
    headlines: {
      planB: meta("Protect the second serve before you worry about flashy return games.", 78)
    },
    meta: {
      adjustmentTrigger: meta("If they start camping on your second serve or you lose two service games quickly, shift to bigger targets and body patterns.", 80)
    },
    planA: [
      tactic("pw-weak-second-serve-a", "Use safer second-serve targets and plan the first groundstroke to the middle or body so you are not defending immediately.", 79)
    ],
    planB: [
      tactic("pw-weak-second-serve-b", "If they keep attacking second serves, serve 5-10% slower with more shape and make them hit the first aggressive ball from a tougher spot.", 76)
    ],
    avoid: [
      tactic("pw-weak-second-serve-c", "Do not chase low-percentage second-serve bombs when scoreboard pressure is already on you.", 75)
    ]
  },
  "backhand-breaks-down": {
    planA: [
      tactic("pw-backhand-a", "Protect your backhand by running around to forehand sooner or using a neutralizing slice when the opponent pins that wing.", 74)
    ],
    planB: [
      tactic("pw-backhand-b", "If they keep crowding your backhand, use more middle depth and avoid forcing down-the-line backhands from defense.", 70)
    ]
  },
  "forehand-sprays": {
    planB: [
      tactic("pw-forehand-a", "Use more height and spin on forehands for two games and stop changing direction unless you are fully balanced.", 73)
    ],
    avoid: [
      tactic("pw-forehand-b", "Do not keep trying to hit through pace with a leaking forehand from equal court position.", 68)
    ]
  },
  "return-struggles": {
    planA: [
      tactic("pw-return-a", "On return, prioritize depth through the middle third rather than trying to do damage on the first swing.", 72)
    ],
    planB: [
      tactic("pw-return-b", "If you are missing returns, simplify your backswing and look only for playable neutral depth.", 69)
    ]
  },
  "short-balls": {
    planA: [
      tactic("pw-short-balls-a", "If your neutral ball sits up, commit to heavier shape and deeper targets so you stop giving the opponent attackable mid-court pace.", 69)
    ]
  },
  "net-discomfort": {
    planB: [
      tactic("pw-net-a", "Approach only behind obvious floaters or stretched replies so your first volley is simple rather than nervous.", 64)
    ]
  },
  "slice-discomfort": {
    planB: [
      tactic("pw-slice-a", "Take the slice earlier and lift it high crosscourt instead of trying to flatten through a low contact point.", 70)
    ]
  },
  "height-depth-discomfort": {
    planB: [
      tactic("pw-height-a", "Back up half a step and use more height through the middle until your spacing feels clean again.", 69)
    ]
  },
  "wide-recovery": {
    avoid: [
      tactic("pw-wide-a", "Do not overcommit to the first angle if your recovery after wide balls is one of your leaks.", 66)
    ]
  },
  "pressure-overhit": {
    planB: [
      tactic("pw-pressure-a", "When trailing, use a simple two-ball build: one solid crosscourt, one deep middle, then reassess.", 74)
    ],
    cues: [
      tactic("pw-pressure-b", "Bigger target, same intent.", 69)
    ]
  },
  "fitness-drop": {
    planA: [
      tactic("pw-fitness-a", "Use more first-strike intent on your serve games and avoid volunteering for long neutral rallies with no tactical reason.", 70)
    ]
  },
  "body-serve-trouble": {
    planB: [
      tactic("pw-body-serve-a", "Stand a half-step back on return and clear the hips early so the body serve does not jam your first move.", 68)
    ]
  },
  "low-ball-trouble": {
    planB: [
      tactic("pw-low-ball-a", "Lower your base sooner and roll low balls with shape instead of forcing a flat contact point.", 68)
    ]
  },
  "predictable-crosscourt": {
    planB: [
      tactic("pw-predictable-a", "Schedule one deliberate change of direction after three neutral balls so the opponent cannot sit on your crosscourt lane.", 71)
    ]
  }
};

const OPPONENT_STRENGTH_RULES = {
  "big-first-serve": {
    planA: [
      tactic("os-big-first-serve", "Respect the serve by prioritizing a playable deep return over an ambitious swing winner.", 77)
    ]
  },
  "serve-placement": {
    planB: [
      tactic("os-serve-placement", "Do not camp on one return spot; protect the body serve and be willing to adjust your start position.", 65)
    ]
  },
  "heavy-forehand": {
    planA: [
      tactic("os-heavy-forehand", "Avoid feeding repeated medium-paced balls into their forehand slot; jam the body or pressure the other wing first.", 76)
    ]
  },
  "inside-out-forehand": {
    planB: [
      tactic("os-inside-out", "Protect the ad-court corner and occasionally show them the line so they cannot camp on their inside-out forehand.", 64)
    ]
  },
  "solid-backhand": {
    avoid: [
      tactic("os-solid-backhand", "Do not mindlessly hammer the backhand wing if that side is one of their strengths.", 72)
    ]
  },
  "return-pressure": {
    planA: [
      tactic("os-return-pressure", "Raise your first-serve percentage and use more body or jam patterns so they cannot start every return game on offense.", 76)
    ]
  },
  consistency: {
    avoid: [
      tactic("os-consistency", "Do not assume they will miss just because the rally gets long. You still need a real tactical lever.", 74)
    ]
  },
  "court-speed": {
    planA: [
      tactic("os-court-speed", "Use wrong-foot patterns and shots behind their recovery if they cover space exceptionally well.", 69)
    ]
  },
  "net-finishing": {
    planA: [
      tactic("os-net-finishing", "Keep returns and passing replies low through the middle so their first volley is uncomfortable.", 72)
    ]
  },
  "slice-variety": {
    planB: [
      tactic("os-slice-variety", "Simplify your feet and take slices a little earlier so you do not get dragged into ugly timing.", 63)
    ]
  },
  "drop-shot-touch": {
    planB: [
      tactic("os-drop", "Hold a slightly tighter court position so the drop shot is not free points for them.", 61)
    ]
  },
  "mental-resilience": {
    reasons: [
      tactic("os-mental", "This opponent is unlikely to donate the match mentally, so the plan needs real tactical edges instead of hope.", 68)
    ]
  },
  "passing-shots": {
    avoid: [
      tactic("os-passing", "Do not approach behind soft neutral balls if passing shots are one of their strengths.", 71)
    ]
  },
  "short-angles": {
    planB: [
      tactic("os-short-angles", "Recover a little narrower so you are ready for the short angle instead of overprotecting the line.", 62)
    ]
  }
};

const OPPONENT_WEAKNESS_RULES = {
  "weak-second-serve": {
    meta: {
      pressurePoint: meta("Their second serve is the most attackable pressure point in the matchup.", 82)
    },
    planA: [
      tactic("ow-weak-second-serve", "Step inside on second serves and send aggressive returns 65-70% to their weaker wing or deep middle to start the point on your terms.", 83)
    ]
  },
  "backhand-breaks-down": {
    meta: {
      pressurePoint: meta("Their backhand can be stress-tested under repeated tempo and depth.", 80)
    },
    planA: [
      tactic("ow-backhand", "Make the backhand prove itself. Send the majority of your neutral rally pressure there until they hold that wing cleanly.", 81)
    ]
  },
  "forehand-sprays": {
    planA: [
      tactic("ow-forehand", "Rush their forehand with body pressure and low balls so they feel crowded instead of free-swinging.", 74)
    ]
  },
  "return-struggles": {
    planA: [
      tactic("ow-return", "Protect your service games with high first-serve percentage because their return struggles should turn into scoreboard pressure quickly.", 79)
    ]
  },
  "short-balls": {
    planA: [
      tactic("ow-short-balls", "If their neutral ball sits up, use depth first and then attack the next mid-court ball with conviction.", 69)
    ]
  },
  "net-discomfort": {
    planA: [
      tactic("ow-net", "Use short slice, angle, or drop variations to draw them forward if they are uncomfortable finishing at net.", 69)
    ]
  },
  "slice-discomfort": {
    planA: [
      tactic("ow-slice", "Feed them low skid slices and make them lift from uncomfortable contact points until they prove they can handle it.", 74)
    ]
  },
  "height-depth-discomfort": {
    planA: [
      tactic("ow-height-depth", "Use height and depth first, then flatten the next shorter reply. They do not enjoy repeated heavy contact above shoulder level.", 78)
    ]
  },
  "wide-recovery": {
    planA: [
      tactic("ow-wide", "Stretch them wide once and hit behind the first recovery step instead of going for the sideline outright.", 77)
    ]
  },
  "pressure-overhit": {
    planB: [
      tactic("ow-pressure", "If the score gets tight, make them play one more neutral ball. Players who overhit when trailing usually leak under repetition.", 73)
    ]
  },
  "fitness-drop": {
    planA: [
      tactic("ow-fitness", "Test their legs early with heavier physical rallies so their quality drops later when the scoreboard matters most.", 68)
    ]
  },
  "body-serve-trouble": {
    planA: [
      tactic("ow-body-serve", "Body serves should be a staple, especially on pressure points, if they struggle to clear the jammed contact.", 77)
    ]
  },
  "low-ball-trouble": {
    planA: [
      tactic("ow-low-ball", "Use slice, skidding returns, and lower-contact patterns because low balls are an uncomfortable height for them.", 75)
    ]
  },
  "predictable-crosscourt": {
    planA: [
      tactic("ow-predictable", "Sit on their favorite crosscourt lane and counter behind it once or twice each game to make them doubt the pattern.", 70)
    ]
  }
};

const SURFACE_RULES = {
  hard: {
    planA: [
      tactic("sr-hard-a", "Hard court rewards early court position and clear serve + first-ball patterns, so stay intentional with your first strike.", 65)
    ],
    planB: [
      tactic("sr-hard-b", "If the pace is rushing you, use deeper middle targets for a game before reopening the court.", 59)
    ]
  },
  clay: {
    planA: [
      tactic("sr-clay-a", "Clay gives you time, so use more height, shape, and repeated depth before flattening out the shorter ball.", 71)
    ],
    planB: [
      tactic("sr-clay-b", "If you are pressing, remember the court lets you build longer: one more heavy ball before you change direction.", 66)
    ]
  },
  grass: {
    planA: [
      tactic("sr-grass-a", "Grass rewards low contact and first-strike clarity, so use skidding patterns and simpler finishes.", 71)
    ],
    planB: [
      tactic("sr-grass-b", "If rallies are chaotic, use body serves and through-the-middle depth to keep the bounce low and the picture simpler.", 63)
    ]
  },
  indoor: {
    planA: [
      tactic("sr-indoor-a", "Indoor conditions usually reward front-foot tennis, so be decisive with serve location and early contact.", 69)
    ],
    planB: [
      tactic("sr-indoor-b", "If both of you are rushing, add a little more net clearance rather than giving away flat errors.", 60)
    ]
  }
};

const PRIORITY_RULES = {
  balanced: {},
  "protect-serve": {
    planA: [
      tactic("priority-serve-a", "Make holding serve the anchor of the match: raise first-serve percentage and simplify the first rally ball behind it.", 77)
    ],
    planB: [
      tactic("priority-serve-b", "If return games are scarce, stop pressing for them and keep squeezing value from clean holds.", 65)
    ]
  },
  "attack-return": {
    planA: [
      tactic("priority-return-a", "Look for one aggressive return pattern every game, especially against second serves or body-serve habits you can read.", 77)
    ]
  },
  "reduce-errors": {
    headlines: {
      planB: meta("If the match is running through your error count, lower the risk before you raise the pressure again.", 77)
    },
    planB: [
      tactic("priority-errors-a", "Shrink your targets for two games and make the opponent hit one extra pressure ball before you accelerate.", 78)
    ],
    avoid: [
      tactic("priority-errors-b", "Do not confuse urgency with low-percentage shot selection.", 72)
    ]
  }
};

const DEMO_MATCHUP = {
  playerName: "Jannik Sinner",
  opponentName: "Carlos Alcaraz",
  playerImage: "assets/jannik-sinner-demo.jpg",
  playerImageFallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Jannik_Sinner_2025_US_Open.jpg/250px-Jannik_Sinner_2025_US_Open.jpg",
  opponentImage: "assets/carlos-alcaraz-demo.jpg",
  opponentImageFallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Carlos_Alcaraz_2025_FO.jpg/250px-Carlos_Alcaraz_2025_FO.jpg",
  playerStyle: "aggressive-baseliner",
  opponentStyle: "all-court-attacker",
  playerStrengths: ["big-first-serve", "heavy-forehand", "solid-backhand", "return-pressure"],
  playerWeaknesses: ["net-discomfort", "pressure-overhit"],
  opponentStrengths: ["court-speed", "drop-shot-touch", "short-angles", "net-finishing"],
  opponentWeaknesses: ["forehand-sprays", "body-serve-trouble"],
  playerRatings: {
    firstServe: "excellent",
    secondServe: "good",
    forehand: "excellent",
    backhand: "excellent",
    forehandVolley: "average",
    backhandVolley: "average",
    dropShot: "average",
    lob: "average",
    overhead: "good",
    fitness: "excellent",
    mental: "excellent"
  },
  opponentRatings: {
    firstServe: "good",
    secondServe: "good",
    forehand: "excellent",
    backhand: "good",
    forehandVolley: "good",
    backhandVolley: "good",
    dropShot: "excellent",
    lob: "good",
    overhead: "good",
    fitness: "excellent",
    mental: "excellent"
  },
  surface: "hard",
  priority: "balanced"
};

const PRESET_MATCHUPS = [
  {
    id: "sinner-alcaraz",
    label: "ATP | Jannik Sinner vs Carlos Alcaraz",
    scenario: DEMO_MATCHUP
  },
  {
    id: "djokovic-medvedev",
    label: "ATP | Novak Djokovic vs Daniil Medvedev",
    scenario: {
      playerName: "Novak Djokovic",
      opponentName: "Daniil Medvedev",
      playerStyle: "all-court-attacker",
      opponentStyle: "counterpuncher",
      playerStrengths: ["return-pressure", "solid-backhand", "mental-resilience", "court-speed"],
      playerWeaknesses: ["pressure-overhit"],
      opponentStrengths: ["consistency", "court-speed", "big-first-serve", "mental-resilience"],
      opponentWeaknesses: ["net-discomfort", "low-ball-trouble"],
      playerRatings: {
        firstServe: "good",
        secondServe: "excellent",
        forehand: "good",
        backhand: "excellent",
        forehandVolley: "good",
        backhandVolley: "good",
        dropShot: "good",
        lob: "good",
        overhead: "good",
        fitness: "excellent",
        mental: "excellent"
      },
      opponentRatings: {
        firstServe: "excellent",
        secondServe: "good",
        forehand: "good",
        backhand: "excellent",
        forehandVolley: "average",
        backhandVolley: "average",
        dropShot: "average",
        lob: "good",
        overhead: "good",
        fitness: "excellent",
        mental: "excellent"
      },
      surface: "hard",
      priority: "balanced"
    }
  },
  {
    id: "swiatek-sabalenka",
    label: "WTA | Iga Swiatek vs Aryna Sabalenka",
    scenario: {
      playerName: "Iga Swiatek",
      opponentName: "Aryna Sabalenka",
      playerStyle: "aggressive-baseliner",
      opponentStyle: "big-server-first-striker",
      playerStrengths: ["heavy-forehand", "return-pressure", "court-speed", "mental-resilience"],
      playerWeaknesses: ["net-discomfort"],
      opponentStrengths: ["big-first-serve", "heavy-forehand", "mental-resilience"],
      opponentWeaknesses: ["forehand-sprays", "low-ball-trouble"],
      playerRatings: {
        firstServe: "good",
        secondServe: "good",
        forehand: "excellent",
        backhand: "good",
        forehandVolley: "average",
        backhandVolley: "average",
        dropShot: "good",
        lob: "good",
        overhead: "good",
        fitness: "excellent",
        mental: "excellent"
      },
      opponentRatings: {
        firstServe: "excellent",
        secondServe: "good",
        forehand: "excellent",
        backhand: "good",
        forehandVolley: "average",
        backhandVolley: "average",
        dropShot: "average",
        lob: "average",
        overhead: "good",
        fitness: "excellent",
        mental: "excellent"
      },
      surface: "clay",
      priority: "attack-return"
    }
  },
  {
    id: "gauff-rybakina",
    label: "WTA | Coco Gauff vs Elena Rybakina",
    scenario: {
      playerName: "Coco Gauff",
      opponentName: "Elena Rybakina",
      playerStyle: "counterpuncher",
      opponentStyle: "big-server-first-striker",
      playerStrengths: ["court-speed", "solid-backhand", "mental-resilience", "return-pressure"],
      playerWeaknesses: ["forehand-sprays", "pressure-overhit"],
      opponentStrengths: ["big-first-serve", "heavy-forehand"],
      opponentWeaknesses: ["fitness-drop", "net-discomfort"],
      playerRatings: {
        firstServe: "good",
        secondServe: "good",
        forehand: "average",
        backhand: "excellent",
        forehandVolley: "average",
        backhandVolley: "average",
        dropShot: "average",
        lob: "good",
        overhead: "good",
        fitness: "excellent",
        mental: "excellent"
      },
      opponentRatings: {
        firstServe: "excellent",
        secondServe: "good",
        forehand: "excellent",
        backhand: "good",
        forehandVolley: "average",
        backhandVolley: "average",
        dropShot: "average",
        lob: "average",
        overhead: "good",
        fitness: "good",
        mental: "good"
      },
      surface: "hard",
      priority: "protect-serve"
    }
  },
  {
    id: "pegula-jabeur",
    label: "WTA | Jessica Pegula vs Ons Jabeur",
    scenario: {
      playerName: "Jessica Pegula",
      opponentName: "Ons Jabeur",
      playerStyle: "baseline-grinder",
      opponentStyle: "disruptor-variety",
      playerStrengths: ["consistency", "return-pressure", "solid-backhand"],
      playerWeaknesses: ["net-discomfort"],
      opponentStrengths: ["drop-shot-touch", "slice-variety", "short-angles"],
      opponentWeaknesses: ["fitness-drop", "weak-second-serve"],
      playerRatings: {
        firstServe: "good",
        secondServe: "good",
        forehand: "good",
        backhand: "good",
        forehandVolley: "average",
        backhandVolley: "average",
        dropShot: "average",
        lob: "good",
        overhead: "good",
        fitness: "good",
        mental: "good"
      },
      opponentRatings: {
        firstServe: "average",
        secondServe: "average",
        forehand: "good",
        backhand: "good",
        forehandVolley: "good",
        backhandVolley: "good",
        dropShot: "excellent",
        lob: "good",
        overhead: "average",
        fitness: "average",
        mental: "good"
      },
      surface: "hard",
      priority: "balanced"
    }
  }
];

const state = {
  selected: {
    playerStrengths: new Set(),
    playerWeaknesses: new Set(),
    opponentStrengths: new Set(),
    opponentWeaknesses: new Set()
  }
};

const SINGLES_STORAGE_KEY = "ttiq-singles-saved-plans-v1";

const SINGLES_TRAIT_MATCHUPS = {
  "big-first-serve": ["return-struggles", "body-serve-trouble"],
  "serve-placement": ["return-struggles", "body-serve-trouble", "predictable-crosscourt"],
  "heavy-forehand": ["backhand-breaks-down", "wide-recovery"],
  "inside-out-forehand": ["backhand-breaks-down", "wide-recovery", "predictable-crosscourt"],
  "solid-backhand": ["forehand-sprays", "predictable-crosscourt"],
  "return-pressure": ["weak-second-serve", "body-serve-trouble"],
  consistency: ["pressure-overhit", "fitness-drop"],
  "court-speed": ["wide-recovery", "fitness-drop"],
  "net-finishing": ["net-discomfort", "short-balls"],
  "slice-variety": ["slice-discomfort", "low-ball-trouble", "height-depth-discomfort"],
  "drop-shot-touch": ["fitness-drop", "height-depth-discomfort"],
  "mental-resilience": ["pressure-overhit"],
  "passing-shots": ["net-discomfort"],
  "short-angles": ["wide-recovery", "predictable-crosscourt"]
};

let currentSinglesView = null;

const elements = {
  form: document.getElementById("matchupForm"),
  presetMatchup: document.getElementById("presetMatchup"),
  loadPresetButton: document.getElementById("loadPresetButton"),
  presetNote: document.getElementById("presetNote"),
  presetNoteTitle: document.getElementById("presetNoteTitle"),
  presetNoteText: document.getElementById("presetNoteText"),
  playerName: document.getElementById("playerName"),
  opponentName: document.getElementById("opponentName"),
  playerStyle: document.getElementById("playerStyle"),
  opponentStyle: document.getElementById("opponentStyle"),
  surface: document.getElementById("surface"),
  priority: document.getElementById("priority"),
  playerPhotoPreview: document.getElementById("playerPhotoPreview"),
  opponentPhotoPreview: document.getElementById("opponentPhotoPreview"),
  playerPhotoFallback: document.getElementById("playerPhotoFallback"),
  opponentPhotoFallback: document.getElementById("opponentPhotoFallback"),
  summaryPlayerPhoto: document.getElementById("summaryPlayerPhoto"),
  summaryOpponentPhoto: document.getElementById("summaryOpponentPhoto"),
  summaryPlayerFallback: document.getElementById("summaryPlayerFallback"),
  summaryOpponentFallback: document.getElementById("summaryOpponentFallback"),
  summaryPlayerLabel: document.getElementById("summaryPlayerLabel"),
  summaryOpponentLabel: document.getElementById("summaryOpponentLabel"),
  playerRatings: document.getElementById("playerRatings"),
  opponentRatings: document.getElementById("opponentRatings"),
  playerStrengths: document.getElementById("playerStrengths"),
  playerWeaknesses: document.getElementById("playerWeaknesses"),
  opponentStrengths: document.getElementById("opponentStrengths"),
  opponentWeaknesses: document.getElementById("opponentWeaknesses"),
  playerStrengthCount: document.getElementById("playerStrengthCount"),
  playerWeaknessCount: document.getElementById("playerWeaknessCount"),
  opponentStrengthCount: document.getElementById("opponentStrengthCount"),
  opponentWeaknessCount: document.getElementById("opponentWeaknessCount"),
  demoButton: document.getElementById("demoButton"),
  demoSummaryButton: document.getElementById("demoSummaryButton"),
  resetButton: document.getElementById("resetButton"),
  resetSummaryButton: document.getElementById("resetSummaryButton"),
  saveButton: document.getElementById("saveButton"),
  printButton: document.getElementById("printButton"),
  copyButton: document.getElementById("copyButton"),
  matchupHeadline: document.getElementById("matchupHeadline"),
  strategyNarrative: document.getElementById("strategyNarrative"),
  playerStylePill: document.getElementById("playerStylePill"),
  opponentStylePill: document.getElementById("opponentStylePill"),
  surfacePill: document.getElementById("surfacePill"),
  pressurePointText: document.getElementById("pressurePointText"),
  fallbackTriggerText: document.getElementById("fallbackTriggerText"),
  identityReminderText: document.getElementById("identityReminderText"),
  planATitle: document.getElementById("planATitle"),
  planASummary: document.getElementById("planASummary"),
  planAList: document.getElementById("planAList"),
  planBTitle: document.getElementById("planBTitle"),
  planBSummary: document.getElementById("planBSummary"),
  planBList: document.getElementById("planBList"),
  cueList: document.getElementById("cueList"),
  avoidList: document.getElementById("avoidList"),
  reasonList: document.getElementById("reasonList"),
  matchupRatingValue: document.getElementById("matchupRatingValue"),
  matchupRatingLabel: document.getElementById("matchupRatingLabel"),
  matchupRatingSummary: document.getElementById("matchupRatingSummary"),
  matchupRatingList: document.getElementById("matchupRatingList"),
  matchCardTitle: document.getElementById("matchCardTitle"),
  matchCardSummary: document.getElementById("matchCardSummary"),
  matchCardList: document.getElementById("matchCardList"),
  savedPlansEmpty: document.getElementById("savedPlansEmpty"),
  savedPlansList: document.getElementById("savedPlansList")
};

function populateSelect(select, options) {
  select.innerHTML = "";
  options.forEach((option) => {
    const node = document.createElement("option");
    node.value = option.value;
    node.textContent = option.label;
    select.appendChild(node);
  });
}

function populatePresetSelect() {
  elements.presetMatchup.innerHTML = "";
  PRESET_MATCHUPS.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.label;
    elements.presetMatchup.appendChild(option);
  });
}

function getPresetById(id) {
  return PRESET_MATCHUPS.find((preset) => preset.id === id) || PRESET_MATCHUPS[0];
}

function showPresetNote(presetLabel) {
  elements.presetNote.hidden = false;
  elements.presetNoteTitle.textContent = `Demo preset loaded: ${presetLabel}`;
  elements.presetNoteText.textContent =
    "This is a demo preset. You can edit any field or switch to another preset anytime.";
}

function hidePresetNote() {
  elements.presetNote.hidden = true;
}

function createDefaultRatings(defaultValue = "average") {
  return RATING_FIELDS.reduce((accumulator, field) => {
    accumulator[field.id] = defaultValue;
    return accumulator;
  }, {});
}

function renderRatingGrid(container, groupPrefix) {
  container.innerHTML = "";
  RATING_FIELDS.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = "rating-card";

    const label = document.createElement("label");
    label.setAttribute("for", `${groupPrefix}-${field.id}`);
    label.textContent = field.label;

    const select = document.createElement("select");
    select.id = `${groupPrefix}-${field.id}`;
    select.dataset.ratingGroup = groupPrefix;
    select.dataset.ratingField = field.id;

    RATING_OPTIONS.forEach((option) => {
      const node = document.createElement("option");
      node.value = option.value;
      node.textContent = option.label;
      select.appendChild(node);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    container.appendChild(wrapper);
  });
}

function collectRatings(groupPrefix) {
  return RATING_FIELDS.reduce((accumulator, field) => {
    const select = document.getElementById(`${groupPrefix}-${field.id}`);
    accumulator[field.id] = select ? select.value : "average";
    return accumulator;
  }, {});
}

function setRatings(groupPrefix, ratings) {
  const mergedRatings = { ...createDefaultRatings(), ...(ratings || {}) };
  RATING_FIELDS.forEach((field) => {
    const select = document.getElementById(`${groupPrefix}-${field.id}`);
    if (select) {
      select.value = mergedRatings[field.id];
    }
  });
}

function syncImagePreview(targetImage, targetFallback, source, fallbackSource = "") {
  if (source) {
    targetImage.onerror = null;
    targetImage.dataset.fallbackSource = fallbackSource;
    targetImage.dataset.fallbackApplied = "0";
    if (fallbackSource) {
      targetImage.onerror = () => {
        if (targetImage.dataset.fallbackApplied !== "1") {
          targetImage.dataset.fallbackApplied = "1";
          targetImage.src = fallbackSource;
          return;
        }
        targetImage.onerror = null;
        targetImage.removeAttribute("src");
        targetImage.hidden = true;
        targetFallback.hidden = false;
      };
    }
    targetImage.src = source;
    targetImage.hidden = false;
    targetFallback.hidden = true;
  } else {
    targetImage.onerror = null;
    targetImage.dataset.fallbackSource = "";
    targetImage.dataset.fallbackApplied = "0";
    targetImage.removeAttribute("src");
    targetImage.hidden = true;
    targetFallback.hidden = false;
  }
}

function clearImageSelection(previewImage, previewFallback, summaryImage, summaryFallback) {
  syncImagePreview(previewImage, previewFallback, "");
  syncImagePreview(summaryImage, summaryFallback, "");
}

function setBuilderPhotoVisibility(previewImage, isVisible) {
  const wrapper = previewImage.closest(".builder-player-photo");
  if (wrapper) {
    wrapper.hidden = !isVisible;
  }
}

function setSummaryPhotoVisibility(summaryImage, isVisible) {
  const shell = summaryImage.closest(".matchup-avatar-shell");
  const card = summaryImage.closest(".matchup-player-card");
  if (shell) {
    shell.hidden = !isVisible;
  }
  if (card) {
    card.classList.toggle("matchup-player-card-no-avatar", !isVisible);
  }
}

function getRatingScore(value) {
  return RATING_SCORE[value] || 2;
}

function getTopRatedFields(ratings, minimumScore = 3, limit = 2) {
  return RATING_FIELDS
    .map((field) => ({ ...field, score: getRatingScore(ratings[field.id]) }))
    .filter((field) => field.score >= minimumScore)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((field) => field.label.toLowerCase());
}

function getLowestRatedFields(ratings, maximumScore = 2, limit = 2) {
  return RATING_FIELDS
    .map((field) => ({ ...field, score: getRatingScore(ratings[field.id]) }))
    .filter((field) => field.score <= maximumScore)
    .sort((left, right) => left.score - right.score)
    .slice(0, limit)
    .map((field) => field.label.toLowerCase());
}

function renderChipGroup(container, options, stateKey) {
  container.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.dataset.id = option.id;
    button.dataset.group = stateKey;
    button.textContent = option.label;
    button.addEventListener("click", () => toggleChip(stateKey, option.id, button));
    container.appendChild(button);
  });
}

function toggleChip(group, id, button) {
  const selectedSet = state.selected[group];
  if (selectedSet.has(id)) {
    selectedSet.delete(id);
    button.classList.remove("active");
  } else {
    selectedSet.add(id);
    button.classList.add("active");
  }
  updateCounts();
}

function updateCounts() {
  elements.playerStrengthCount.textContent = `${state.selected.playerStrengths.size} selected`;
  elements.playerWeaknessCount.textContent = `${state.selected.playerWeaknesses.size} selected`;
  elements.opponentStrengthCount.textContent = `${state.selected.opponentStrengths.size} selected`;
  elements.opponentWeaknessCount.textContent = `${state.selected.opponentWeaknesses.size} selected`;
}

function setChipGroupSelection(group, ids) {
  state.selected[group] = new Set(ids);
  document.querySelectorAll(`.chip[data-group="${group}"]`).forEach((chip) => {
    chip.classList.toggle("active", state.selected[group].has(chip.dataset.id));
  });
  updateCounts();
}

function collectInput() {
  return {
    playerName: elements.playerName.value,
    opponentName: elements.opponentName.value,
    playerStyle: elements.playerStyle.value,
    opponentStyle: elements.opponentStyle.value,
    playerStrengths: [...state.selected.playerStrengths],
    playerWeaknesses: [...state.selected.playerWeaknesses],
    opponentStrengths: [...state.selected.opponentStrengths],
    opponentWeaknesses: [...state.selected.opponentWeaknesses],
    playerRatings: collectRatings("player"),
    opponentRatings: collectRatings("opponent"),
    surface: elements.surface.value,
    priority: elements.priority.value
  };
}

function createDraft() {
  return {
    planA: [],
    planB: [],
    cues: [],
    avoid: [],
    reasons: [],
    headlines: {
      planA: [],
      planB: []
    },
    meta: {
      pressurePoint: [],
      adjustmentTrigger: [],
      identity: []
    }
  };
}

function addRule(draft, rule, bump = 0) {
  if (!rule) {
    return;
  }

  ["planA", "planB", "cues", "avoid", "reasons"].forEach((section) => {
    (rule[section] || []).forEach((item) => {
      draft[section].push({ ...item, priority: item.priority + bump });
    });
  });

  if (rule.headlines) {
    Object.entries(rule.headlines).forEach(([section, item]) => {
      draft.headlines[section].push({ ...item, priority: item.priority + bump });
    });
  }

  if (rule.meta) {
    Object.entries(rule.meta).forEach(([section, item]) => {
      draft.meta[section].push({ ...item, priority: item.priority + bump });
    });
  }
}

function finalizeItems(items, limit = 4) {
  const bestByKey = new Map();
  items.forEach((item) => {
    const existing = bestByKey.get(item.key);
    if (!existing || existing.priority < item.priority) {
      bestByKey.set(item.key, item);
    }
  });
  return [...bestByKey.values()].sort((left, right) => right.priority - left.priority).slice(0, limit);
}

function finalizeMeta(items, fallback) {
  if (!items.length) {
    return fallback;
  }
  return items.sort((left, right) => right.priority - left.priority)[0].text;
}

function getLabel(value) {
  return optionLabelLookup.get(value) || value;
}

function getPlayerName(value, fallback) {
  const trimmed = (value || "").trim();
  return trimmed || fallback;
}

function getInitials(value, fallback) {
  const trimmed = (value || "").trim();
  if (!trimmed) {
    return fallback;
  }
  const initials = trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials || fallback;
}

function refreshFallbackInitials(playerName, opponentName) {
  const playerInitials = getInitials(playerName, "P1");
  const opponentInitials = getInitials(opponentName, "P2");
  elements.playerPhotoFallback.textContent = playerInitials;
  elements.summaryPlayerFallback.textContent = playerInitials;
  elements.opponentPhotoFallback.textContent = opponentInitials;
  elements.summaryOpponentFallback.textContent = opponentInitials;
}

function listToPhrase(values) {
  if (!values.length) {
    return "";
  }
  if (values.length === 1) {
    return values[0];
  }
  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }
  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
}

function buildNarrative(input) {
  const playerTraitWeapons = input.playerStrengths.slice(0, 2).map(getLabel).map((label) => label.toLowerCase());
  const playerRatedWeapons = getTopRatedFields(input.playerRatings, 3, 2);
  const opponentTraitLeaks = input.opponentWeaknesses.slice(0, 2).map(getLabel).map((label) => label.toLowerCase());
  const opponentRatedLeaks = getLowestRatedFields(input.opponentRatings, 2, 2);
  const playerWeapons = listToPhrase(playerTraitWeapons.length ? playerTraitWeapons : playerRatedWeapons);
  const opponentLeaks = listToPhrase(opponentTraitLeaks.length ? opponentTraitLeaks : opponentRatedLeaks);
  const playerStyleLabel = getLabel(input.playerStyle);
  const opponentStyleLabel = getLabel(input.opponentStyle);
  const playerName = getPlayerName(input.playerName, "Player 1");
  const opponentName = getPlayerName(input.opponentName, "Player 2");

  if (playerWeapons && opponentLeaks) {
    return `${playerName} should lead with ${playerWeapons} and repeatedly test ${opponentLeaks} before ${opponentName} can settle into their ${opponentStyleLabel.toLowerCase()} comfort pattern.`;
  }
  if (playerWeapons) {
    return `${playerName}'s edge is to build the match around ${playerWeapons} while keeping ${opponentName} away from the preferred rhythm of an ${opponentStyleLabel.toLowerCase()}.`;
  }
  if (opponentLeaks) {
    return `This matchup is about forcing ${opponentName} to deal with ${opponentLeaks} over and over until the shape of the rally breaks.`;
  }
  return `This plan uses the core tension between ${playerName}'s ${playerStyleLabel.toLowerCase()} identity and ${opponentName}'s ${opponentStyleLabel.toLowerCase()} profile to create one clear front-foot pattern and one fallback adjustment.`;
}

function addRatingDrivenRules(draft, input) {
  const player = input.playerRatings;
  const opponent = input.opponentRatings;

  const playerFirstServe = getRatingScore(player.firstServe);
  const playerSecondServe = getRatingScore(player.secondServe);
  const playerForehand = getRatingScore(player.forehand);
  const playerBackhand = getRatingScore(player.backhand);
  const playerForehandVolley = getRatingScore(player.forehandVolley);
  const playerBackhandVolley = getRatingScore(player.backhandVolley);
  const playerDropShot = getRatingScore(player.dropShot);
  const playerLob = getRatingScore(player.lob);
  const playerFitness = getRatingScore(player.fitness);
  const playerMental = getRatingScore(player.mental);

  const opponentSecondServe = getRatingScore(opponent.secondServe);
  const opponentForehand = getRatingScore(opponent.forehand);
  const opponentBackhand = getRatingScore(opponent.backhand);
  const opponentForehandVolley = getRatingScore(opponent.forehandVolley);
  const opponentBackhandVolley = getRatingScore(opponent.backhandVolley);
  const opponentOverhead = getRatingScore(opponent.overhead);
  const opponentFitness = getRatingScore(opponent.fitness);
  const opponentMental = getRatingScore(opponent.mental);
  const opponentVolley = Math.min(opponentForehandVolley, opponentBackhandVolley);
  const playerVolley = Math.max(playerForehandVolley, playerBackhandVolley);

  if (playerFirstServe >= 3 && playerForehand >= 3) {
    addRule(draft, {
      planA: [
        tactic("rating-serve-forehand", "Build around your serve plus first forehand combination. Start points by creating a forehand you can dictate with immediately.", 82)
      ],
      reasons: [
        tactic("rating-serve-forehand-reason", "A good first serve paired with a good forehand is one of the cleanest ways to control the first two shots of the rally.", 72)
      ]
    }, 5);
  }

  if (playerSecondServe === 1) {
    addRule(draft, {
      headlines: {
        planB: meta("Protect your second serve and simplify the first two shots whenever scoreboard pressure rises.", 84)
      },
      meta: {
        adjustmentTrigger: meta("Switch earlier if the opponent starts attacking second serves or if your first two service games feel rushed.", 84)
      },
      planB: [
        tactic("rating-weak-second-serve", "On second serve, choose your safest target and expect to play the next ball through the middle third before opening the court.", 84)
      ]
    }, 6);
  }

  if (playerForehand >= 3 && opponentBackhand <= 2) {
    addRule(draft, {
      meta: {
        pressurePoint: meta("The clearest pressure lane is your forehand into their backhand side until they prove they can absorb it cleanly.", 86)
      },
      planA: [
        tactic("rating-forehand-vs-backhand", "Use your forehand to pressure their backhand repeatedly before you redirect or come forward.", 86)
      ]
    }, 7);
  }

  if (playerBackhand === 1) {
    addRule(draft, {
      planB: [
        tactic("rating-protect-backhand", "If they pin your backhand, neutralize with middle depth or slice and look to re-center the point instead of forcing from that wing.", 77)
      ],
      avoid: [
        tactic("rating-protect-backhand-avoid", "Do not turn their pressure into rushed down-the-line backhand misses.", 72)
      ]
    }, 5);
  }

  if (playerVolley >= 3 && opponentVolley <= 2) {
    addRule(draft, {
      planA: [
        tactic("rating-net-edge", "Look for more forward opportunities because your volleying profile is stronger than theirs once the point gets compressed.", 78)
      ]
    }, 5);
  }

  if (playerDropShot >= 3 && opponentFitness <= 2) {
    addRule(draft, {
      planA: [
        tactic("rating-drop-shot-fitness", "Use the drop shot as a true tactical tool once you have pushed them deep, especially if their movement or recovery fitness looks average or weak.", 73)
      ]
    }, 4);
  }

  if (playerLob >= 3 && opponentVolley >= 3 && opponentOverhead <= 2) {
    addRule(draft, {
      planA: [
        tactic("rating-lob-overhead", "If they close to net well but their overhead is shaky, show the lob enough that they stop rushing with confidence.", 76)
      ]
    }, 5);
  }

  if (playerFitness >= 4 && opponentFitness <= 2) {
    addRule(draft, {
      planA: [
        tactic("rating-fitness-edge", "Lean into physical rallies and make them play one or two extra balls, because the fitness edge should widen as the match wears on.", 79)
      ],
      reasons: [
        tactic("rating-fitness-edge-reason", "A clear fitness edge changes the value of longer points and gives you more freedom to stay patient.", 69)
      ]
    }, 6);
  }

  if (playerFitness === 1 && opponentFitness >= 3) {
    addRule(draft, {
      planB: [
        tactic("rating-fitness-protect", "Shorten points more aggressively on your serve games and avoid volunteering for long neutral exchanges with no tactical purpose.", 77)
      ]
    }, 5);
  }

  if (playerMental >= 4 && opponentMental <= 2) {
    addRule(draft, {
      cues: [
        tactic("rating-mental-edge", "Stay calm and make them feel every extra score pressure point.", 76)
      ],
      reasons: [
        tactic("rating-mental-edge-reason", "A mental edge matters most if you keep the tactical pattern disciplined and make the opponent hit under scoreboard stress.", 70)
      ]
    }, 5);
  }

  if (playerMental === 1) {
    addRule(draft, {
      planB: [
        tactic("rating-mental-protect", "When the score gets tight, go back to one trusted serve target and one trusted rally lane instead of reinventing the plan mid-game.", 79)
      ],
      cues: [
        tactic("rating-mental-protect-cue", "Trusted pattern first. Creativity second.", 74)
      ]
    }, 5);
  }

  if (opponentSecondServe <= 2) {
    addRule(draft, {
      meta: {
        pressurePoint: meta("Their second serve should be attacked often enough that it never becomes a neutral starting point.", opponentSecondServe === 1 ? 88 : 78)
      },
      planA: [
        tactic(
          "rating-opponent-second-serve",
          "Step in on the opponent's second serve and start the point with intent, especially to the weaker wing or deep middle.",
          opponentSecondServe === 1 ? 88 : 78
        )
      ]
    }, 6);
  }

  if (opponentForehand <= 2) {
    addRule(draft, {
      planA: [
        tactic("rating-opponent-forehand", "If their forehand is only average or weak, jam it with body patterns and low contact before you open angles elsewhere.", 74)
      ]
    }, 4);
  }

  if (opponentBackhand <= 2) {
    addRule(draft, {
      planA: [
        tactic("rating-opponent-backhand", "Keep asking their backhand to handle repeated depth and pace until it proves stable under pressure.", 80)
      ]
    }, 5);
  }

  if (opponentVolley <= 2) {
    addRule(draft, {
      planA: [
        tactic("rating-opponent-volley", "If they are not comfortable volleying, draw them forward with shorter or lower balls and make them finish from awkward net positions.", 72)
      ]
    }, 4);
  }

  if (opponentOverhead <= 2 && playerLob >= 3) {
    addRule(draft, {
      planA: [
        tactic("rating-opponent-overhead", "Do not forget the lob if they struggle overhead. It can stop them from crowding the net too early.", 73)
      ]
    }, 4);
  }

  if (opponentFitness <= 2) {
    addRule(draft, {
      planA: [
        tactic("rating-opponent-fitness", "If their fitness is average or weak, build a physical tax early so the tactical openings get bigger later.", 71)
      ]
    }, 4);
  }

  if (opponentMental <= 2) {
    addRule(draft, {
      planB: [
        tactic("rating-opponent-mental", "If the score gets close, keep the point structure solid and make them solve the pressure rather than rushing for winners yourself.", 74)
      ]
    }, 4);
  }
}

function generateGamePlan(input) {
  const draft = createDraft();

  addRule(draft, STYLE_BLUEPRINTS[input.playerStyle], 0);
  addRule(draft, OPPONENT_RESPONSES[input.opponentStyle], 4);
  addRule(draft, MATCHUP_OVERRIDES[`${input.playerStyle}|${input.opponentStyle}`], 8);
  addRule(draft, SURFACE_RULES[input.surface], 2);
  addRule(draft, PRIORITY_RULES[input.priority], 4);

  input.playerStrengths.forEach((id) => addRule(draft, PLAYER_STRENGTH_RULES[id], 3));
  input.playerWeaknesses.forEach((id) => addRule(draft, PLAYER_WEAKNESS_RULES[id], 4));
  input.opponentStrengths.forEach((id) => addRule(draft, OPPONENT_STRENGTH_RULES[id], 4));
  input.opponentWeaknesses.forEach((id) => addRule(draft, OPPONENT_WEAKNESS_RULES[id], 5));
  addRatingDrivenRules(draft, input);

  return {
    narrative: buildNarrative(input),
    planA: finalizeItems(draft.planA, 5),
    planB: finalizeItems(draft.planB, 5),
    cues: finalizeItems(draft.cues, 4),
    avoid: finalizeItems(draft.avoid, 4),
    reasons: finalizeItems(draft.reasons, 4),
    planAHeadline: finalizeMeta(draft.headlines.planA, "Own the first tactical advantage and press the clearest weakness."),
    planBHeadline: finalizeMeta(draft.headlines.planB, "If the first pattern stalls, add margin and simplify the next two games."),
    pressurePoint: finalizeMeta(
      draft.meta.pressurePoint,
      "Look for the wing, serve pattern, or rally shape the opponent struggles to repeat under pressure."
    ),
    adjustmentTrigger: finalizeMeta(
      draft.meta.adjustmentTrigger,
      "Switch to Plan B if you lose two quick games, miss your pattern ball repeatedly, or cannot protect your serve cleanly."
    ),
    identity: finalizeMeta(
      draft.meta.identity,
      "Protect your own best identity first, then build pressure from there."
    )
  };
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function getAverageRating(ratings, fieldIds = RATING_FIELDS.map((field) => field.id)) {
  const total = fieldIds.reduce((sum, fieldId) => sum + getRatingScore(ratings[fieldId]), 0);
  return total / fieldIds.length;
}

function countTraitMatchups(sourceIds, targetIds, mapping) {
  return sourceIds.reduce((count, id) => {
    const targets = mapping[id] || [];
    return count + (targets.some((target) => targetIds.includes(target)) ? 1 : 0);
  }, 0);
}

function addMatchupFactor(factors, weight, positiveText, negativeText) {
  if (Math.abs(weight) < 1) {
    return;
  }

  factors.push({
    weight,
    text: weight >= 0 ? positiveText : negativeText
  });
}

function getSinglesScoreBand(score) {
  if (score >= 76) {
    return {
      label: "Strong edge",
      summary: "This matchup looks favorable if you stay disciplined with the pressure lane the engine found."
    };
  }
  if (score >= 64) {
    return {
      label: "Slight edge",
      summary: "You have a real advantage, but it still depends on executing the first-ball patterns cleanly."
    };
  }
  if (score >= 52) {
    return {
      label: "Live matchup",
      summary: "This looks competitive with a small edge. The cleaner tactical decisions should matter."
    };
  }
  if (score >= 40) {
    return {
      label: "Tight matchup",
      summary: "This match needs sharper choices and a quicker move to Plan B if the first pattern stalls."
    };
  }
  return {
    label: "Tough spot",
    summary: "This profile looks difficult on paper, so protecting your leaks and simplifying early matters more."
  };
}

function calculateSinglesMatchup(input) {
  const playerAverage = getAverageRating(input.playerRatings, ["firstServe", "secondServe", "forehand", "backhand", "fitness", "mental"]);
  const opponentAverage = getAverageRating(input.opponentRatings, ["firstServe", "secondServe", "forehand", "backhand", "fitness", "mental"]);
  const playerFirstStrike = getAverageRating(input.playerRatings, ["firstServe", "forehand", "backhand"]);
  const opponentResistance = getAverageRating(input.opponentRatings, ["secondServe", "backhand", "fitness"]);
  const playerComposure = getAverageRating(input.playerRatings, ["fitness", "mental"]);
  const opponentComposure = getAverageRating(input.opponentRatings, ["fitness", "mental"]);
  const strengthBalance = (input.playerStrengths.length + input.opponentWeaknesses.length) - (input.playerWeaknesses.length + input.opponentStrengths.length);
  const matchupBonus = countTraitMatchups(input.playerStrengths, input.opponentWeaknesses, SINGLES_TRAIT_MATCHUPS);
  const exposurePenalty = countTraitMatchups(input.opponentStrengths, input.playerWeaknesses, SINGLES_TRAIT_MATCHUPS);
  const playerForehand = getRatingScore(input.playerRatings.forehand);
  const playerBackhand = getRatingScore(input.playerRatings.backhand);
  const playerFirstServe = getRatingScore(input.playerRatings.firstServe);
  const playerSecondServe = getRatingScore(input.playerRatings.secondServe);
  const playerFitness = getRatingScore(input.playerRatings.fitness);
  const playerMental = getRatingScore(input.playerRatings.mental);
  const opponentBackhand = getRatingScore(input.opponentRatings.backhand);
  const opponentSecondServe = getRatingScore(input.opponentRatings.secondServe);
  const opponentForehand = getRatingScore(input.opponentRatings.forehand);
  const opponentFitness = getRatingScore(input.opponentRatings.fitness);
  const opponentMental = getRatingScore(input.opponentRatings.mental);

  const factors = [];
  addMatchupFactor(
    factors,
    Math.round((playerAverage - opponentAverage) * 8),
    "Your overall rating profile is a little stronger across serve, baseline, fitness, and mental tools.",
    "The opponent's overall rating profile is a little stronger, so the plan has to protect more leaks."
  );
  addMatchupFactor(
    factors,
    Math.round((playerFirstStrike - opponentResistance) * 5),
    "The first-strike pattern looks available if you own the serve-plus-one or return-plus-one ball.",
    "The opponent looks capable of absorbing the first strike, so you may need one extra setup ball."
  );
  addMatchupFactor(
    factors,
    clamp(strengthBalance * 2, -12, 12),
    "The selected strengths and opponent leaks give you a clearer tactical pressure lane.",
    "The current strength-vs-leak balance asks you to protect your own problem areas first."
  );
  addMatchupFactor(
    factors,
    clamp((matchupBonus - exposurePenalty) * 4, -12, 12),
    "Your chosen strengths line up well with the opponent's likely weaknesses.",
    "Some of the opponent's strengths line up uncomfortably with your own weaker areas."
  );
  addMatchupFactor(
    factors,
    Math.round((playerComposure - opponentComposure) * 4),
    "The fitness and mental profile suggests you can stay more stable if the match gets long or tight.",
    "The opponent looks a bit better built for long or pressure-heavy stretches."
  );

  if (playerForehand >= 3 && opponentBackhand <= 2) {
    addMatchupFactor(
      factors,
      6,
      "Your forehand into their backhand looks like a live scoring pattern from the start.",
      ""
    );
  }

  if (playerFirstServe >= 3 && (input.opponentWeaknesses.includes("return-struggles") || input.opponentWeaknesses.includes("body-serve-trouble"))) {
    addMatchupFactor(
      factors,
      5,
      "A good first serve should create free or weak replies often enough to tilt serve games your way.",
      ""
    );
  }

  if (input.playerStrengths.includes("return-pressure") && opponentSecondServe <= 2) {
    addMatchupFactor(
      factors,
      5,
      "Their second serve looks attackable, which should give you real return-game chances.",
      ""
    );
  }

  if (playerSecondServe <= 1 && input.opponentStrengths.includes("return-pressure")) {
    addMatchupFactor(
      factors,
      -6,
      "",
      "Your second serve could come under real pressure, so protecting service games matters."
    );
  }

  if (playerBackhand <= 1 && opponentForehand >= 3) {
    addMatchupFactor(
      factors,
      -5,
      "",
      "If your backhand gets pinned by their stronger forehand wing, the rally shape can get uncomfortable quickly."
    );
  }

  if (playerFitness <= 2 && opponentFitness >= 3) {
    addMatchupFactor(
      factors,
      -4,
      "",
      "The physical side of the matchup may widen if rallies stretch or the match becomes long."
    );
  }

  if (playerMental <= 2 && opponentMental >= 3) {
    addMatchupFactor(
      factors,
      -4,
      "",
      "The mental profile suggests you should simplify patterns faster when the score tightens."
    );
  }

  const score = clamp(
    50 + factors.reduce((sum, factor) => sum + factor.weight, 0),
    8,
    92
  );
  const band = getSinglesScoreBand(score);
  const reasons = [...factors]
    .sort((left, right) => Math.abs(right.weight) - Math.abs(left.weight))
    .slice(0, 4)
    .map((factor) => factor.text);

  return {
    score,
    label: band.label,
    summary: band.summary,
    reasons
  };
}

function buildSinglesMatchCard(input, plan, rating) {
  const playerName = getPlayerName(input.playerName, "Player 1");
  const opponentName = getPlayerName(input.opponentName, "Player 2");

  return {
    title: `${playerName} vs ${opponentName}`,
    summary: `${rating.label} | ${rating.score}/100 matchup score`,
    bullets: [
      `Open with: ${plan.planA[0] ? plan.planA[0].text : plan.planAHeadline}`,
      `Primary pressure point: ${plan.pressurePoint}`,
      `Identity reminder: ${plan.identity}`,
      `Plan B trigger: ${plan.adjustmentTrigger}`,
      `Reset cue: ${plan.cues[0] ? plan.cues[0].text : "Early feet. Clear target. One strong pattern."}`,
      `Trap to avoid: ${plan.avoid[0] ? plan.avoid[0].text : "Do not rush the first change of direction."}`
    ]
  };
}

function renderList(container, items) {
  container.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;
    container.appendChild(li);
  });
}

function renderPlan(plan, input) {
  const playerName = getPlayerName(input.playerName, "Player 1");
  const opponentName = getPlayerName(input.opponentName, "Player 2");
  refreshFallbackInitials(playerName, opponentName);
  elements.matchupHeadline.textContent = `${playerName} vs ${opponentName}`;
  elements.strategyNarrative.textContent = plan.narrative;
  elements.summaryPlayerLabel.textContent = `${playerName} | ${getLabel(input.playerStyle)}`;
  elements.summaryOpponentLabel.textContent = `${opponentName} | ${getLabel(input.opponentStyle)}`;
  elements.playerStylePill.textContent = `${playerName}: ${getLabel(input.playerStyle)}`;
  elements.opponentStylePill.textContent = `${opponentName}: ${getLabel(input.opponentStyle)}`;
  elements.surfacePill.textContent = `Surface: ${getLabel(input.surface)}`;
  elements.pressurePointText.textContent = plan.pressurePoint;
  elements.fallbackTriggerText.textContent = plan.adjustmentTrigger;
  elements.identityReminderText.textContent = plan.identity;
  elements.planATitle.textContent = "Primary winning pattern";
  elements.planASummary.textContent = plan.planAHeadline;
  elements.planBTitle.textContent = "Fallback adjustment when momentum shifts";
  elements.planBSummary.textContent = plan.planBHeadline;
  renderList(elements.planAList, plan.planA);
  renderList(elements.planBList, plan.planB);
  renderList(elements.cueList, plan.cues);
  renderList(elements.avoidList, plan.avoid);
  renderList(elements.reasonList, plan.reasons);
}

function renderSinglesExtras(rating, matchCard) {
  elements.matchupRatingValue.textContent = `${rating.score} / 100`;
  elements.matchupRatingLabel.textContent = rating.label;
  elements.matchupRatingSummary.textContent = rating.summary;
  renderList(
    elements.matchupRatingList,
    rating.reasons.map((text, index) => ({ key: `rating-${index}`, text }))
  );

  elements.matchCardTitle.textContent = matchCard.title;
  elements.matchCardSummary.textContent = matchCard.summary;
  renderList(
    elements.matchCardList,
    matchCard.bullets.map((text, index) => ({ key: `card-${index}`, text }))
  );
}

function updateSinglesOutput(input) {
  const plan = generateGamePlan(input);
  const rating = calculateSinglesMatchup(input);
  const matchCard = buildSinglesMatchCard(input, plan, rating);

  currentSinglesView = {
    input: JSON.parse(JSON.stringify(input)),
    plan,
    rating,
    matchCard
  };

  renderPlan(plan, input);
  renderSinglesExtras(rating, matchCard);
}

function flashButton(button, successText) {
  if (!button) {
    return;
  }
  const originalText = button.textContent;
  button.textContent = successText;
  window.setTimeout(() => {
    button.textContent = originalText;
  }, 1400);
}

function readSavedSinglesPlans() {
  try {
    const raw = window.localStorage.getItem(SINGLES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeSavedSinglesPlans(plans) {
  window.localStorage.setItem(SINGLES_STORAGE_KEY, JSON.stringify(plans));
}

function formatSavedTimestamp(iso) {
  try {
    return new Date(iso).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  } catch (error) {
    return "recently";
  }
}

function applySavedSinglesInput(input) {
  elements.playerName.value = input.playerName || "";
  elements.opponentName.value = input.opponentName || "";
  elements.playerStyle.value = input.playerStyle || STYLE_OPTIONS[0].value;
  elements.opponentStyle.value = input.opponentStyle || STYLE_OPTIONS[1].value;
  elements.surface.value = input.surface || SURFACE_OPTIONS[0].value;
  elements.priority.value = input.priority || "balanced";
  clearImageSelection(
    elements.playerPhotoPreview,
    elements.playerPhotoFallback,
    elements.summaryPlayerPhoto,
    elements.summaryPlayerFallback
  );
  clearImageSelection(
    elements.opponentPhotoPreview,
    elements.opponentPhotoFallback,
    elements.summaryOpponentPhoto,
    elements.summaryOpponentFallback
  );
  setBuilderPhotoVisibility(elements.playerPhotoPreview, false);
  setBuilderPhotoVisibility(elements.opponentPhotoPreview, false);
  setSummaryPhotoVisibility(elements.summaryPlayerPhoto, false);
  setSummaryPhotoVisibility(elements.summaryOpponentPhoto, false);
  setRatings("player", input.playerRatings || createDefaultRatings());
  setRatings("opponent", input.opponentRatings || createDefaultRatings());
  setChipGroupSelection("playerStrengths", input.playerStrengths || []);
  setChipGroupSelection("playerWeaknesses", input.playerWeaknesses || []);
  setChipGroupSelection("opponentStrengths", input.opponentStrengths || []);
  setChipGroupSelection("opponentWeaknesses", input.opponentWeaknesses || []);
  hidePresetNote();
  updateSinglesOutput(collectInput());
}

function renderSavedSinglesPlans() {
  const savedPlans = readSavedSinglesPlans();
  elements.savedPlansList.innerHTML = "";
  elements.savedPlansEmpty.hidden = savedPlans.length > 0;

  savedPlans.forEach((savedPlan) => {
    const row = document.createElement("article");
    row.className = "saved-plan-row";
    row.innerHTML = `
      <div class="saved-plan-copy">
        <h3>${savedPlan.title}</h3>
        <p class="saved-plan-meta">Score ${savedPlan.score}/100 | ${savedPlan.scoreLabel} | ${savedPlan.surfaceLabel} | Saved ${formatSavedTimestamp(savedPlan.savedAt)}</p>
      </div>
      <div class="saved-plan-actions">
        <button type="button" class="btn btn-secondary btn-compact">Load</button>
        <button type="button" class="btn btn-ghost btn-compact">Delete</button>
      </div>
    `;

    const [loadButton, deleteButton] = row.querySelectorAll("button");
    loadButton.addEventListener("click", () => {
      applySavedSinglesInput(savedPlan.input);
    });
    deleteButton.addEventListener("click", () => {
      const nextPlans = readSavedSinglesPlans().filter((entry) => entry.id !== savedPlan.id);
      writeSavedSinglesPlans(nextPlans);
      renderSavedSinglesPlans();
    });

    elements.savedPlansList.appendChild(row);
  });
}

function saveCurrentSinglesPlan() {
  if (!currentSinglesView) {
    return;
  }

  try {
    const savedPlans = readSavedSinglesPlans();
    const playerName = getPlayerName(currentSinglesView.input.playerName, "Player 1");
    const opponentName = getPlayerName(currentSinglesView.input.opponentName, "Player 2");
    const entry = {
      id: `singles-${Date.now()}`,
      title: `${playerName} vs ${opponentName}`,
      score: currentSinglesView.rating.score,
      scoreLabel: currentSinglesView.rating.label,
      surfaceLabel: getLabel(currentSinglesView.input.surface),
      savedAt: new Date().toISOString(),
      input: currentSinglesView.input
    };

    savedPlans.unshift(entry);
    writeSavedSinglesPlans(savedPlans.slice(0, 8));
    renderSavedSinglesPlans();
    flashButton(elements.saveButton, "Saved");
  } catch (error) {
    flashButton(elements.saveButton, "Not Saved");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function openPrintWindow(config) {
  const printWindow = window.open("", "_blank", "width=900,height=720");
  if (!printWindow) {
    return;
  }

  const sectionsHtml = config.sections
    .map((section) => `
      <section class="print-section">
        <h2>${escapeHtml(section.title)}</h2>
        <ul>
          ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    `)
    .join("");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHtml(config.title)}</title>
      <style>
        body { font-family: Arial, sans-serif; color: #13273f; margin: 28px; }
        h1 { margin: 0 0 6px; font-size: 28px; }
        .subhead { margin: 0 0 14px; color: #47617d; font-weight: 700; }
        .summary { margin: 0 0 18px; line-height: 1.6; }
        .badge { display: inline-block; padding: 8px 12px; border-radius: 999px; background: #daf8c6; color: #143c28; font-weight: 700; }
        .print-section { margin-top: 18px; padding: 16px 18px; border: 1px solid #d6e3ef; border-radius: 14px; }
        h2 { margin: 0 0 10px; font-size: 18px; }
        ul { margin: 0; padding-left: 20px; line-height: 1.6; }
        li + li { margin-top: 8px; }
      </style>
    </head>
    <body>
      <h1>${escapeHtml(config.title)}</h1>
      <p class="subhead">${escapeHtml(config.subtitle)}</p>
      <p class="summary"><span class="badge">${escapeHtml(config.badge)}</span></p>
      <p class="summary">${escapeHtml(config.summary)}</p>
      ${sectionsHtml}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  window.setTimeout(() => {
    printWindow.print();
  }, 250);
}

function printCurrentSinglesMatchCard() {
  if (!currentSinglesView) {
    return;
  }

  openPrintWindow({
    title: currentSinglesView.matchCard.title,
    subtitle: "TennisTacticsIQ Singles Match Card",
    badge: `${currentSinglesView.rating.score}/100 | ${currentSinglesView.rating.label}`,
    summary: currentSinglesView.matchCard.summary,
    sections: [
      {
        title: "Court-side Match Card",
        items: currentSinglesView.matchCard.bullets
      },
      {
        title: "Plan A",
        items: currentSinglesView.plan.planA.map((item) => item.text).slice(0, 4)
      },
      {
        title: "Plan B",
        items: currentSinglesView.plan.planB.map((item) => item.text).slice(0, 3)
      },
      {
        title: "In-Match Cues",
        items: currentSinglesView.plan.cues.map((item) => item.text).slice(0, 3)
      }
    ]
  });
}

function copyPlanToClipboard() {
  const text = [
    elements.matchupHeadline.textContent,
    "",
    elements.strategyNarrative.textContent,
    "",
    `Plan A: ${elements.planASummary.textContent}`,
    ...[...elements.planAList.querySelectorAll("li")].map((item) => `- ${item.textContent}`),
    "",
    `Plan B: ${elements.planBSummary.textContent}`,
    ...[...elements.planBList.querySelectorAll("li")].map((item) => `- ${item.textContent}`),
    "",
    "In-Match Cues",
    ...[...elements.cueList.querySelectorAll("li")].map((item) => `- ${item.textContent}`),
    "",
    "What to Avoid",
    ...[...elements.avoidList.querySelectorAll("li")].map((item) => `- ${item.textContent}`)
  ].join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      const original = elements.copyButton.textContent;
      elements.copyButton.textContent = "Copied";
      window.setTimeout(() => {
        elements.copyButton.textContent = original;
      }, 1400);
    });
  }
}

function applyScenario(scenario) {
  elements.playerName.value = scenario.playerName || "";
  elements.opponentName.value = scenario.opponentName || "";
  elements.playerStyle.value = scenario.playerStyle;
  elements.opponentStyle.value = scenario.opponentStyle;
  elements.surface.value = scenario.surface;
  elements.priority.value = scenario.priority;
  if (scenario.playerImage) {
    setBuilderPhotoVisibility(elements.playerPhotoPreview, true);
    setSummaryPhotoVisibility(elements.summaryPlayerPhoto, true);
    syncImagePreview(
      elements.playerPhotoPreview,
      elements.playerPhotoFallback,
      scenario.playerImage,
      scenario.playerImageFallback || ""
    );
    syncImagePreview(
      elements.summaryPlayerPhoto,
      elements.summaryPlayerFallback,
      scenario.playerImage,
      scenario.playerImageFallback || ""
    );
  } else {
    clearImageSelection(
      elements.playerPhotoPreview,
      elements.playerPhotoFallback,
      elements.summaryPlayerPhoto,
      elements.summaryPlayerFallback
    );
    setBuilderPhotoVisibility(elements.playerPhotoPreview, false);
    setSummaryPhotoVisibility(elements.summaryPlayerPhoto, false);
  }
  if (scenario.opponentImage) {
    setBuilderPhotoVisibility(elements.opponentPhotoPreview, true);
    setSummaryPhotoVisibility(elements.summaryOpponentPhoto, true);
    syncImagePreview(
      elements.opponentPhotoPreview,
      elements.opponentPhotoFallback,
      scenario.opponentImage,
      scenario.opponentImageFallback || ""
    );
    syncImagePreview(
      elements.summaryOpponentPhoto,
      elements.summaryOpponentFallback,
      scenario.opponentImage,
      scenario.opponentImageFallback || ""
    );
  } else {
    clearImageSelection(
      elements.opponentPhotoPreview,
      elements.opponentPhotoFallback,
      elements.summaryOpponentPhoto,
      elements.summaryOpponentFallback
    );
    setBuilderPhotoVisibility(elements.opponentPhotoPreview, false);
    setSummaryPhotoVisibility(elements.summaryOpponentPhoto, false);
  }
  setRatings("player", scenario.playerRatings);
  setRatings("opponent", scenario.opponentRatings);
  setChipGroupSelection("playerStrengths", scenario.playerStrengths);
  setChipGroupSelection("playerWeaknesses", scenario.playerWeaknesses);
  setChipGroupSelection("opponentStrengths", scenario.opponentStrengths);
  setChipGroupSelection("opponentWeaknesses", scenario.opponentWeaknesses);
  updateSinglesOutput(collectInput());
}

function loadPreset(presetId) {
  const preset = getPresetById(presetId);
  elements.presetMatchup.value = preset.id;
  applyScenario(preset.scenario);
  showPresetNote(preset.label);
}

function resetAll() {
  elements.playerName.value = "";
  elements.opponentName.value = "";
  elements.playerStyle.value = STYLE_OPTIONS[0].value;
  elements.opponentStyle.value = STYLE_OPTIONS[1].value;
  elements.surface.value = SURFACE_OPTIONS[0].value;
  elements.priority.value = "balanced";
  clearImageSelection(
    elements.playerPhotoPreview,
    elements.playerPhotoFallback,
    elements.summaryPlayerPhoto,
    elements.summaryPlayerFallback
  );
  clearImageSelection(
    elements.opponentPhotoPreview,
    elements.opponentPhotoFallback,
    elements.summaryOpponentPhoto,
    elements.summaryOpponentFallback
  );
  setBuilderPhotoVisibility(elements.playerPhotoPreview, false);
  setBuilderPhotoVisibility(elements.opponentPhotoPreview, false);
  setSummaryPhotoVisibility(elements.summaryPlayerPhoto, false);
  setSummaryPhotoVisibility(elements.summaryOpponentPhoto, false);
  setRatings("player", createDefaultRatings());
  setRatings("opponent", createDefaultRatings());
  setChipGroupSelection("playerStrengths", []);
  setChipGroupSelection("playerWeaknesses", []);
  setChipGroupSelection("opponentStrengths", []);
  setChipGroupSelection("opponentWeaknesses", []);
  hidePresetNote();
  updateSinglesOutput(collectInput());
}

function initialize() {
  populateSelect(elements.playerStyle, STYLE_OPTIONS);
  populateSelect(elements.opponentStyle, STYLE_OPTIONS);
  populateSelect(elements.surface, SURFACE_OPTIONS);
  populatePresetSelect();
  renderRatingGrid(elements.playerRatings, "player");
  renderRatingGrid(elements.opponentRatings, "opponent");
  renderChipGroup(elements.playerStrengths, STRENGTH_OPTIONS, "playerStrengths");
  renderChipGroup(elements.playerWeaknesses, WEAKNESS_OPTIONS, "playerWeaknesses");
  renderChipGroup(elements.opponentStrengths, STRENGTH_OPTIONS, "opponentStrengths");
  renderChipGroup(elements.opponentWeaknesses, WEAKNESS_OPTIONS, "opponentWeaknesses");
  updateCounts();

  elements.playerName.addEventListener("input", () => {
    refreshFallbackInitials(elements.playerName.value, elements.opponentName.value);
  });

  elements.opponentName.addEventListener("input", () => {
    refreshFallbackInitials(elements.playerName.value, elements.opponentName.value);
  });

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateSinglesOutput(collectInput());
  });

  elements.loadPresetButton.addEventListener("click", () => {
    loadPreset(elements.presetMatchup.value);
  });

  elements.demoButton.addEventListener("click", () => {
    loadPreset("sinner-alcaraz");
  });

  if (elements.demoSummaryButton) {
    elements.demoSummaryButton.addEventListener("click", () => {
      loadPreset("sinner-alcaraz");
    });
  }

  elements.resetButton.addEventListener("click", resetAll);
  if (elements.resetSummaryButton) {
    elements.resetSummaryButton.addEventListener("click", resetAll);
  }
  elements.copyButton.addEventListener("click", copyPlanToClipboard);
  if (elements.saveButton) {
    elements.saveButton.addEventListener("click", saveCurrentSinglesPlan);
  }
  if (elements.printButton) {
    elements.printButton.addEventListener("click", printCurrentSinglesMatchCard);
  }

  renderSavedSinglesPlans();

  loadPreset("sinner-alcaraz");
}

initialize();

