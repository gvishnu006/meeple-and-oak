/* ------------------------------------------------------------------
   The lending library.
   `art` colours are lifted from each box's own cover, then the card,
   spine and detail page all drink from them. No two shelves look alike.
   ------------------------------------------------------------------ */

export type Motif =
  | "sunburst"
  | "grid"
  | "route"
  | "meeples"
  | "tower"
  | "waves"
  | "orbit"
  | "stack"
  | "map"
  | "tiles";

export type Weight = 1 | 2 | 3 | 4 | 5;

export interface Game {
  id: string;
  title: string;
  year: number;
  designer: string;
  players: [number, number];
  best: number;
  minutes: [number, number];
  weight: Weight;
  tags: string[];
  blurb: string;
  hook: string;
  motif: Motif;
  art: { base: string; deep: string; pop: string; bone: string };
  copies: number;
  onShelf: "in" | "out" | "teaching";
  shelfRow: number;
  teaches: boolean;
  lending: boolean;
}

type Seed = Omit<Game, "id" | "onShelf" | "shelfRow" | "copies"> &
  Partial<Pick<Game, "onShelf" | "shelfRow" | "copies">>;

const raw: Seed[] = [
  {
    title: "Wingspan",
    year: 2019,
    designer: "Elizabeth Hargrave",
    players: [1, 5],
    best: 4,
    minutes: [40, 70],
    weight: 2,
    tags: ["engine-building", "cards", "nature"],
    blurb:
      "You run a nature preserve with a very small staff and a very good engine file. Chain birds into habitats, lay eggs, and watch the maths get out of hand.",
    hook: "Best game to teach a first-timer who likes animals.",
    motif: "orbit",
    art: { base: "#2f5d74", deep: "#1b3a4a", pop: "#e0a13c", bone: "#f0e6d2" },
    teaches: true,
    lending: true,
  },
  {
    title: "Cascadia",
    year: 2021,
    designer: "Randy Flynn",
    players: [1, 4],
    best: 4,
    minutes: [30, 45],
    weight: 1,
    tags: ["tiling", "puzzle", "calm"],
    blurb:
      "Pair a habitat tile with a matching wildlife token and the landscape gets quiet and lovely. Nobody raises their voice. It is the café's nap substitute.",
    hook: "Our most-played game before 11am.",
    motif: "tiles",
    art: { base: "#4a6b3f", deep: "#2c4526", pop: "#d9a03a", bone: "#eef0e0" },
    copies: 3,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Root",
    year: 2018,
    designer: "Cole Wehrle",
    players: [2, 4],
    best: 4,
    minutes: [60, 90],
    weight: 4,
    tags: ["asymmetric", "strategy", "conflict"],
    blurb:
      "Four factions want the same woodland for incompatible reasons. You will lose two of the three markers on turn one and it will still be worth it.",
    hook: "Ask a staffer to teach it. Do not learn it alone.",
    motif: "tower",
    art: { base: "#8c4a35", deep: "#4a2418", pop: "#d8b04a", bone: "#f2e2c4" },
    copies: 2,
    onShelf: "teaching",
    teaches: true,
    lending: true,
  },
  {
    title: "Brass: Birmingham",
    year: 2018,
    designer: "Gavan Brown, Matt Tolman, Martin Wallace",
    players: [2, 4],
    best: 4,
    minutes: [60, 120],
    weight: 4,
    tags: ["network", "economy", "heavy"],
    blurb:
      "Build canals, coal and iron in industrial England, then try to out-network the person sitting next to you. Every single point of this game is about shared rails.",
    hook: "The two-hour warning sign. We keep one copy back for late nights.",
    motif: "grid",
    art: { base: "#3d4a5c", deep: "#1e2733", pop: "#c9a24a", bone: "#e8e2d2" },
    copies: 2,
    onShelf: "out",
    teaches: false,
    lending: true,
  },
  {
    title: "Azul",
    year: 2017,
    designer: "Michael Kiesling",
    players: [2, 4],
    best: 3,
    minutes: [30, 45],
    weight: 1,
    tags: ["abstract", "pattern", "quick"],
    blurb:
      "Draft azulejo tiles onto a wall, try not to leave a gap. Beautiful, tense, over in half an hour, and a good first game to buy someone as a gift.",
    hook: "Two copies, because people photograph the wall and then want to beat each other.",
    motif: "grid",
    art: { base: "#1f4a6b", deep: "#12304a", pop: "#e8c25a", bone: "#f2ecdf" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Ark Nova",
    year: 2021,
    designer: "Mathias Wigge",
    players: [1, 4],
    best: 4,
    minutes: [90, 150],
    weight: 5,
    tags: ["engine-building", "cards", "heavy"],
    blurb:
      "Run a zoo, research animals, support conservation projects you will never see the end of. Long. Enormous board. The end-game scoring is worth the whole climb.",
    hook: "Reserve a whole table. This is an evening, not a game.",
    motif: "stack",
    art: { base: "#4b7a52", deep: "#26452c", pop: "#e0a13c", bone: "#f2ead6" },
    copies: 1,
    onShelf: "out",
    teaches: false,
    lending: true,
  },
  {
    title: "Scythe",
    year: 2016,
    designer: "Jamey Stegmaier",
    players: [1, 5],
    best: 4,
    minutes: [115, 150],
    weight: 3,
    tags: ["engine-building", "sci-fi", "solo"],
    blurb:
      "Alternate-history dieselpunk where you farm, fight and build mechs on a beautiful grim board. The power action is the cleanest combat design going.",
    hook: "Gorgeous to look at while you lose to a nine-year-old.",
    motif: "sunburst",
    art: { base: "#5a5347", deep: "#2b2823", pop: "#c2b280", bone: "#e6e0cf" },
    copies: 2,
    onShelf: "in",
    teaches: false,
    lending: true,
  },
  {
    title: "Terraforming Mars",
    year: 2016,
    designer: "Jacob Fryxelius",
    players: [1, 5],
    best: 5,
    minutes: [90, 180],
    weight: 3,
    tags: ["cards", "engine-building", "co-op"],
    blurb:
      "Six corporations, one red planet, and a global temperature that will punish you both. The Prelude module is on permanently — do not argue with us.",
    hook: "The game we keep a second table free for at 8pm on Fridays.",
    motif: "orbit",
    art: { base: "#a8432a", deep: "#5e2114", pop: "#e8c25a", bone: "#f4e8d4" },
    copies: 3,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Concordia",
    year: 2013,
    designer: "Mac Gerdts",
    players: [2, 5],
    best: 5,
    minutes: [30, 45],
    weight: 1,
    tags: ["economy", "cards", "roman"],
    blurb:
      "Sell brick, wine and fish across the Roman empire. No dice, no combat, no table talk required. The most polite game on the shelf.",
    hook: "Plays perfectly at 22:30 after the room gets loud.",
    motif: "meeples",
    art: { base: "#7a4a3a", deep: "#452a20", pop: "#c9a24a", bone: "#efe0c8" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Jaipur",
    year: 2009,
    designer: "Seiji Kanai",
    players: [2, 2],
    best: 2,
    minutes: [15, 20],
    weight: 1,
    tags: ["card-drafting", "two-player", "quick"],
    blurb:
      "Two players, camels, cloth and diamonds. The best two-player game we own and the only one we will happily play in a queue.",
    hook: "The fifteen-minute game. Perfect for a gap, a coffee break, a first visit.",
    motif: "tiles",
    art: { base: "#c08a2c", deep: "#7d5416", pop: "#2b6a55", bone: "#f6ecd8" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Dune: Imperium",
    year: 2020,
    designer: "Paul Dennen",
    players: [1, 4],
    best: 4,
    minutes: [60, 120],
    weight: 4,
    tags: ["deck-building", "worker-placement", "sci-fi"],
    blurb:
      "Deck-building that happens to look like worker placement because everyone is too busy scheming to notice. Combines with the expansion into something enormous.",
    hook: "If you like Dune the novel, this is better. If you like the film, still good.",
    motif: "sunburst",
    art: { base: "#b8862f", deep: "#5e4212", pop: "#3d2a52", bone: "#f0e4c6" },
    copies: 2,
    onShelf: "out",
    teaches: false,
    lending: true,
  },
  {
    title: "Castles of Burgundy",
    year: 2011,
    designer: "Stefan Feld",
    players: [2, 4],
    best: 2,
    minutes: [30, 45],
    weight: 2,
    tags: ["dice", "tile-laying", "classic"],
    blurb:
      "Dice, tiles, a hill, and six workers. Half a century old now and still the best thing to do with two friends and forty minutes.",
    hook: "If you only ever try one old box, try this one.",
    motif: "map",
    art: { base: "#8d2f2f", deep: "#4a1616", pop: "#dfae52", bone: "#f2e6cf" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Viticulture Essential Edition",
    year: 2015,
    designer: "Alan Stone, Paul Pazderski",
    players: [2, 6],
    best: 4,
    minutes: [45, 75],
    weight: 2,
    tags: ["cards", "worker-placement", "wine"],
    blurb:
      "Plant vines, harvest, make wine, sell it, repeat with feeling. A worker-placement game that never quite picks its fights.",
    hook: "Pairs with the Malbec we pour. That is the whole pitch.",
    motif: "meeples",
    art: { base: "#6b2d4a", deep: "#3a1428", pop: "#d9b24a", bone: "#f2e4d2" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Gloomhaven: Jaws of the Lion",
    year: 2020,
    designer: "Isaac Childres",
    players: [1, 4],
    best: 4,
    minutes: [60, 150],
    weight: 5,
    tags: ["campaign", "co-op", "heavy"],
    blurb:
      "A self-contained campaign box: retire a Gloomhaven character, fight through a hundred scenarios with cards that break. The best solo experience we own.",
    hook: "The campaign runs 30+ sessions. Start it only if you mean it.",
    motif: "map",
    art: { base: "#3a4a6b", deep: "#1a2237", pop: "#d4603a", bone: "#ece4d4" },
    copies: 1,
    onShelf: "in",
    teaches: false,
    lending: true,
  },
  {
    title: "Spirit Island",
    year: 2017,
    designer: "Randy Flynn",
    players: [1, 4],
    best: 4,
    minutes: [60, 120],
    weight: 5,
    tags: ["co-op", "card-play", "complex"],
    blurb:
      "You are an island's angry spirit, throwing blights at colonisers who are entirely too efficient. Hard to explain, impossible to put down.",
    hook: "Ask for the two-hour teaching. Bring patience.",
    motif: "orbit",
    art: { base: "#2a5c3f", deep: "#132f20", pop: "#c94f2a", bone: "#efe6d0" },
    copies: 1,
    onShelf: "in",
    teaches: false,
    lending: true,
  },
  {
    title: "Ticket to Ride",
    year: 2004,
    designer: "Alan R. Moon",
    players: [2, 5],
    best: 4,
    minutes: [30, 60],
    weight: 1,
    tags: ["family", "set-collection", "classic"],
    blurb:
      "Claim railway routes across a map while other people snipe at your plans. The reason a lot of our regulars started coming in.",
    hook: "The gateway box. Non-negotiable.",
    motif: "map",
    art: { base: "#1f4f6b", deep: "#123247", pop: "#d2452f", bone: "#f2e9d8" },
    copies: 3,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "The Crew",
    year: 2019,
    designer: "Thomas Sing",
    players: [2, 5],
    best: 2,
    minutes: [20, 30],
    weight: 1,
    tags: ["co-op", "cards", "quiet"],
    blurb:
      "Trick-taking in space where you cannot talk. Designed for two people on a train, and equally good for two people avoiding eye contact across a café.",
    hook: "Silent, tidy, and the box fits in a coat pocket.",
    motif: "orbit",
    art: { base: "#20344f", deep: "#0e1a2b", pop: "#5fa8c9", bone: "#eef1f4" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Iki",
    year: 2019,
    designer: "Nikita Malyavin",
    players: [1, 4],
    best: 3,
    minutes: [30, 45],
    weight: 2,
    tags: ["cards", "hand-management", "nature"],
    blurb:
      "Follow the seasons, shape a hand of cards, and paint a very good dog. The hand-size limit is the whole game and it is a very good limit.",
    hook: "Unusually pretty, unusually quick, unusually good at 2 players.",
    motif: "waves",
    art: { base: "#c96a3a", deep: "#7d3a1c", pop: "#4b6b3f", bone: "#f4e8d4" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Mage Knight",
    year: 2017,
    designer: "Cole Wehrle",
    players: [1, 4],
    best: 4,
    minutes: [60, 75],
    weight: 4,
    tags: ["cards", "co-op", "campaign"],
    blurb:
      "A solo box that is also a campaign for up to four. Tough, fair, and a great deal of fun alone on a rainy Tuesday with the café wifi.",
    hook: "The only game here we actively recommend you play solo.",
    motif: "tower",
    art: { base: "#4b2f6b", deep: "#241338", pop: "#d8a03c", bone: "#efe8dc" },
    copies: 1,
    onShelf: "in",
    teaches: false,
    lending: true,
  },
  {
    title: "Café (deluxe)",
    year: 2019,
    designer: "Friedemann Friese",
    players: [1, 4],
    best: 2,
    minutes: [20, 30],
    weight: 1,
    tags: ["cards", "engine-building", "quick"],
    blurb:
      "Build a coffee shop, hire a manager, rush orders. Takes twenty minutes, hits the exact subject matter of the building you are sitting in.",
    hook: "Yes, the café is named after it. No, we will not stop talking about it.",
    motif: "grid",
    art: { base: "#6b4423", deep: "#3a2412", pop: "#d9a45c", bone: "#f4ead6" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "A Feast for Odin",
    year: 2017,
    designer: "Sven Füner",
    players: [1, 4],
    best: 4,
    minutes: [40, 60],
    weight: 3,
    tags: ["worker-placement", "dice", "viking"],
    blurb:
      "Vikings, food, a ring board that will eat your afternoon. Roll, place, cook, score, repeat until someone falls behind and gets a smaller plate.",
    hook: "Free food, in spirit. Everyone loves it, everyone is slightly behind.",
    motif: "grid",
    art: { base: "#2b4a6b", deep: "#132a42", pop: "#d9a03c", bone: "#eee6d4" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Anachrony",
    year: 2018,
    designer: "Rich Walker",
    players: [2, 4],
    best: 4,
    minutes: [90, 120],
    weight: 5,
    tags: ["negotiation", "tiles", "heavy"],
    blurb:
      "Post-apocalyptic archaeologists bidding for a market to sell relics into. The barter phase is the most talkative ten minutes in the collection.",
    hook: "For the people who read the rulebook for fun.",
    motif: "stack",
    art: { base: "#7d6b3a", deep: "#3f351a", pop: "#4b7a8c", bone: "#efe6ce" },
    copies: 1,
    onShelf: "in",
    teaches: false,
    lending: true,
  },
  {
    title: "Hanabi",
    year: 2002,
    designer: "Nobuyuki Frukawa",
    players: [2, 5],
    best: 5,
    minutes: [20, 30],
    weight: 2,
    tags: ["co-op", "cards", "deduction"],
    blurb:
      "You cannot see your own cards, only your partners', and everybody has to trust everybody. Small box, enormous tension.",
    hook: "Plays best with four people and complete silence.",
    motif: "sunburst",
    art: { base: "#2b3a7a", deep: "#131c40", pop: "#e8a83c", bone: "#f2ecdd" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Sagrada",
    year: 2017,
    designer: "Adrian Adamescu, Michael Kiesling",
    players: [1, 4],
    best: 3,
    minutes: [30, 45],
    weight: 1,
    tags: ["dice", "pattern", "calm"],
    blurb:
      "Roll coloured dice and place them on a stained-glass window. The most photogenic box on the shelf and a genuinely lovely puzzle underneath.",
    hook: "Best game for a table that wants to talk but not about the game.",
    motif: "tiles",
    art: { base: "#8c3a52", deep: "#4a1c2b", pop: "#e8a83c", bone: "#f4ece0" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Wanderlust",
    year: 2023,
    designer: "Marnie G. Foulke",
    players: [1, 4],
    best: 3,
    minutes: [60, 90],
    weight: 3,
    tags: ["route-building", "cards", "nature"],
    blurb:
      "Drive a campervan round Australia, pitching at surf beaches and reef coasts. Slow, generous, and the kind of game people apologise for still playing at midnight.",
    hook: "Our most-loved new arrival. Fair warning: one round is never one round.",
    motif: "route",
    art: { base: "#c98a3c", deep: "#7d4d18", pop: "#2b6a6b", bone: "#f4ead4" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Pax Pamir: Second Edition",
    year: 2019,
    designer: "Cole Wehrle",
    players: [2, 5],
    best: 4,
    minutes: [60, 120],
    weight: 4,
    tags: ["cards", "negotiation", "historical"],
    blurb:
      "Afghanistan in the 1840s, five rulers, and a table where alliances last approximately one turn. The market mechanic is an all-timer.",
    hook: "We schedule this one on quiet Tuesdays, on purpose.",
    motif: "map",
    art: { base: "#2b5c4a", deep: "#123024", pop: "#c2a24a", bone: "#f0e6d0" },
    copies: 1,
    onShelf: "in",
    teaches: false,
    lending: true,
  },
  {
    title: "Harmonies",
    year: 2024,
    designer: "Johan Benvenuto",
    players: [1, 4],
    best: 2,
    minutes: [30, 45],
    weight: 1,
    tags: ["pattern-building", "nature", "calm"],
    blurb:
      "Build a landscape that a fox, a bird, a fish and a deer would all be happy in. Pattern building with real ecological logic underneath it.",
    hook: "Newest box on the shelf. Mostly plays itself out in front of a window.",
    motif: "waves",
    art: { base: "#4a7a4a", deep: "#22402a", pop: "#d9a03c", bone: "#f2eddc" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Sky Team",
    year: 2023,
    designer: "Luc Rémond",
    players: [2, 2],
    best: 2,
    minutes: [15, 20],
    weight: 2,
    tags: ["co-op", "dice", "two-player"],
    blurb:
      "Two pilots, one cockpit, no talking allowed. Roll a die, decide together, commit. Fifteen minutes and an unfairly tense landing.",
    hook: "The two-player game we hand couples most often.",
    motif: "orbit",
    art: { base: "#1f4a5c", deep: "#0e2733", pop: "#d9a45c", bone: "#eef0ee" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "The White Castle",
    year: 2023,
    designer: "Mac Gerdts",
    players: [1, 4],
    best: 3,
    minutes: [80, 100],
    weight: 3,
    tags: ["worker-placement", "dice", "delicate"],
    blurb:
      "Train retainers, feed the castle, stack dice to make attendants better at everything. Hideo Ueda's wooden pieces are the best money spent on this shelf.",
    hook: "Handle with the two hands provided. Everyone says that. Everyone means it.",
    motif: "stack",
    art: { base: "#3f5c6b", deep: "#1c2f3a", pop: "#e0b45c", bone: "#f4efe2" },
    copies: 2,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
  {
    title: "Forest Shuffle",
    year: 2023,
    designer: "Sjoerd Brunn",
    players: [2, 5],
    best: 4,
    minutes: [30, 45],
    weight: 1,
    tags: ["cards", "animal", "set-collection"],
    blurb:
      "Cards face up, cards face down, and every one you flip is a group of animals you may or may not be allowed to claim. Rounds of five minutes that stack up.",
    hook: "Comes in a cloth bag. Small games in pouches rule this café.",
    motif: "meeples",
    art: { base: "#2b6b4a", deep: "#143424", pop: "#d9b24a", bone: "#f0ead6" },
    copies: 3,
    onShelf: "in",
    teaches: true,
    lending: true,
  },
];

export const GAMES: Game[] = raw.map((g, i) => ({
  ...(g as Game),
  id: `g${String(i + 1).padStart(2, "0")}`,
  onShelf: g.onShelf ?? "in",
  copies: g.copies ?? 2,
  shelfRow: Math.floor(i / 7) + 1,
  teaches: g.teaches ?? true,
  lending: g.lending ?? true,
}));

export const byId = (id: string) => GAMES.find((g) => g.id === id);

export const bySlug = (slug: string) =>
  GAMES.find((g) => g.id.toLowerCase() === slug.toLowerCase());

export const slugOf = (g: Game) => g.id;

const ALL_TAGS = Array.from(new Set(GAMES.flatMap((g) => g.tags))).sort();

export const TAGS = [
  "two-player",
  "quick",
  "calm",
  "co-op",
  "heavy",
  "engine-building",
  "cards",
  "dice",
  "family",
  "strategy",
  "cooperative",
].filter((t) => ALL_TAGS.includes(t));

export const WEIGHT_LABEL: Record<Weight, string> = {
  1: "Gentle",
  2: "Easygoing",
  3: "Medium thinking",
  4: "Heavy",
  5: "Brain-burner",
};

export const playerRange = (g: Game) =>
  g.players[0] === g.players[1] ? `${g.players[0]}` : `${g.players[0]}–${g.players[1]}`;

export const timeRange = (g: Game) =>
  g.minutes[0] === g.minutes[1] ? `${g.minutes[0]} min` : `${g.minutes[0]}–${g.minutes[1]} min`;

export const similarTo = (g: Game, n = 4) => {
  const score = (o: Game) => {
    const shared = o.tags.filter((t) => g.tags.includes(t)).length;
    const gap = Math.abs(o.weight - g.weight);
    return shared * 2 - gap;
  };
  return GAMES.filter((o) => o.id !== g.id)
    .map((o) => ({ o, s: score(o) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.o);
};

export const LIBRARY = {
  boxes: 912,
  games: GAMES.length,
  members: 1840,
  tables: 6,
  chairs: 34,
  shelfWidthM: 41,
};
