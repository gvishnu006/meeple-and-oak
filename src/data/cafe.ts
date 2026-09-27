/* ------------------------------------------------------------------
   The building itself. Hours, tables, what is on this month.
   ------------------------------------------------------------------ */

export interface Table {
  id: string;
  name: string;
  seats: number;
  shape: "round" | "rect" | "oval";
  note: string;
  near: string;
}

export const TABLES: Table[] = [
  {
    id: "t1",
    name: "The Long Oak",
    seats: 8,
    shape: "rect",
    note: "The only table you can hear yourself think at. Reserved for anything over two hours.",
    near: "Back room, past the shelf",
  },
  {
    id: "t2",
    name: "Window Seat",
    seats: 4,
    shape: "round",
    note: "Best light in the building and the draughtiest window in the building.",
    near: "Front left",
  },
  {
    id: "t3",
    name: "The Copper Pot",
    seats: 6,
    shape: "oval",
    note: "Where most first-timers land. Loud enough to ask questions in.",
    near: "Centre, by the bar",
  },
  {
    id: "t4",
    name: "The Quiet One",
    seats: 2,
    shape: "round",
    note: "Two chairs, no eye contact required. For a date or a hard conversation.",
    near: "Corner by the fern",
  },
  {
    id: "t5",
    name: "Riverside",
    seats: 6,
    shape: "rect",
    note: "Saturday evenings this one is loud from about seven until close.",
    near: "Under the map wall",
  },
  {
    id: "t6",
    name: "The Cellar Table",
    seats: 10,
    shape: "rect",
    note: "Down the stairs, ten chairs, the campaign crowd. Book it weeks out.",
    near: "Basement, no lift",
  },
];

export const OPENING_HOURS = [
  { day: "Tuesday", open: "14:00", close: "23:00", quiet: false },
  { day: "Wednesday", open: "14:00", close: "23:00", quiet: false },
  { day: "Thursday", open: "14:00", close: "23:30", quiet: false },
  { day: "Friday", open: "14:00", close: "01:00", quiet: false },
  { day: "Saturday", open: "11:00", close: "01:00", quiet: false },
  { day: "Sunday", open: "11:00", close: "20:00", quiet: true },
  { day: "Monday", open: null as string | null, close: null as string | null, quiet: true },
];

export const MEMBERSHIP = [
  {
    name: "Day Pass",
    price: 7,
    unit: "per visit",
    blurb: "Table fee waived, four games out at a time, tea included while you're here.",
    includes: [
      "4 games out for the day",
      "Table fee waived (normally £4–£12)",
      "Unlimited tea & coffee refills",
      "No sign-up, pay at the bar",
    ],
    accent: "paper",
  },
  {
    name: "Shelf Member",
    price: 14,
    unit: "per month",
    blurb: "Two boxes home at a time for a fortnight, and the run-up to payday is covered.",
    includes: [
      "2 games out for 14 days",
      "Half-price teaching sessions",
      "Free table, always",
      "First look at new arrivals",
      "Members' table at Friday close",
    ],
    accent: "red",
    best: true,
  },
  {
    name: "Corner Table",
    price: 180,
    unit: "per year",
    blurb: "The monthly one. Bring a friend free, borrow six, and we keep your preferred table.",
    includes: [
      "6 games out at any time",
      "A guest seat free every visit",
      "£2 off every teaching session",
      "Your table held for two hours",
      "Late access on new-release Thursdays",
    ],
    accent: "felt",
  },
];

export interface Event_ {
  id: string;
  title: string;
  when: string;
  day: string;
  time: string;
  seats: number;
  left: number;
  host: string;
  price: number;
  kind: "teach" | "tournament" | "open-play" | "swap";
  blurb: string;
  table: string;
}

export const EVENTS: Event_[] = [
  {
    id: "e1",
    title: "Learn Wingspan in an hour",
    when: "2026-10-02",
    day: "Fri",
    time: "18:30",
    seats: 4,
    left: 2,
    host: "Rae",
    price: 4,
    kind: "teach",
    blurb:
      "We teach it properly, twice, then let you play it to death while we talk about bird puns. No experience needed, no notes taken.",
    table: "Copper Pot",
  },
  {
    id: "e2",
    title: "Friday close: learn a heavy",
    when: "2026-10-09",
    day: "Fri",
    time: "19:00",
    seats: 8,
    left: 5,
    host: "Dev",
    price: 8,
    kind: "teach",
    blurb:
      "A rotating pick from the back shelves. This month: Brass. Bring patience and leave the phone at the bar.",
    table: "The Long Oak",
  },
  {
    id: "e3",
    title: "Open play: bring whatever",
    when: "2026-10-11",
    day: "Sun",
    time: "13:00",
    seats: 16,
    left: 9,
    host: "Everyone",
    price: 0,
    kind: "open-play",
    blurb:
      "Pull whatever you like off the shelf and put it on a table. Cards out for what people are playing. The most sociable thing we do.",
    table: "All tables",
  },
  {
    id: "e4",
    title: "Gloomhaven campaign, session 14",
    when: "2026-10-15",
    day: "Thu",
    time: "18:00",
    seats: 4,
    left: 1,
    host: "Priya",
    price: 0,
    kind: "tournament",
    blurb:
      "The cellar table, a continuing campaign, and a spoilery silence policy. One seat left — join mid-campaign is fine.",
    table: "Cellar Table",
  },
  {
    id: "e5",
    title: "Swap Sunday: bring 20, take 20",
    when: "2026-10-18",
    day: "Sun",
    time: "11:00",
    seats: 40,
    left: 27,
    host: "Meeple & Oak",
    price: 0,
    kind: "swap",
    blurb:
      "Clear the cupboard. Bring twenty games you no longer love, take twenty you have never played. We serve toast and tea on the house.",
    table: "Whole café",
  },
  {
    id: "e6",
    title: "Tuesday quiet hours",
    when: "2026-10-20",
    day: "Tue",
    time: "14:00",
    seats: 12,
    left: 12,
    host: "House",
    price: 0,
    kind: "open-play",
    blurb:
      "No events, no loud ones. Room tone only, half the lights on, the good biscuits out. Regulars' favourite slot.",
    table: "All tables",
  },
];

export const KIND_LABEL: Record<Event_["kind"], string> = {
  teach: "Teaching",
  tournament: "Campaign",
  "open-play": "Open play",
  swap: "Swap",
};

export const CAFE = {
  name: "Meeple & Oak",
  strap: "board game café & lending library",
  address: "41 Meeple Row, Fishponds, Bristol",
  phone: "0117 496 0412",
  email: "shelf@meepleandoak.example",
  since: 2019,
  chairs: 34,
  since_note: "We started with 60 boxes and a folding table. The folding table is still here.",
};
