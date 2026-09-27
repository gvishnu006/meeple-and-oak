# Meeple &amp; Oak

A board game café and lending library. The game library is browsable like a
shelf of boxes, and the loading state is a handful of dice in a leather cup
rather than a spinner.

**Stack:** React 19 + Vite + TypeScript, hand-written CSS. No UI kit, no
component library, no generated palette.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run preview  # serve the build
npm run lint
```

## The design

- **Felt green, oiled oak, bone paper, one loud red.** Four families of colour
  and nothing else. Rules, tags and hairlines are all derived from the oak.
- **The type is the brand.** Fraunces (a wonky old-style serif) for headings and
  pull quotes, Archivo for anything with instructions in it, Space Mono for
  counts, prices and shelf references.
- **Nothing is generated at runtime.** Every box cover is drawn in SVG from that
  game's own three-colour art palette, so no two rows of the shelf look alike
  and the accent colour on a card is literally the colour of the box it is.
- **Motion is small and physical.** The dice tumble and land, the box lifts and
  tilts towards you, the shelf cards rise once. All of it collapses to nothing
  under `prefers-reduced-motion`.

## Shake the dice

`src/components/Dice.tsx` holds a small `Die` (drilled bone pips) and the
`ShakeLoader` state machine: `rolling` → `landed`. Three dice rattle inside a
leather tumbler while the page fetches, then land on real faces and the page
appears. Route changes go through it; typing in the search box deliberately does
not, because shaking dice at someone who is still typing is not a joke.

## Structure

```
src/
  components/    Die, ShakeLoader, BoxArt, GameCard, Filters, Header, Footer
  data/          games.ts (the library), cafe.ts (tables, hours, diary, plans)
  pages/         Home, Library, GameDetail, Tables, Events, Join, NotFound
  styles/        tokens, type, shake, shelf, site, home
```

`src/data/` is the whole data layer for now: 28 boxes with designers, player
counts, run times, complexity, tags and palettes, plus the café's own details.
It is a plain typed module on purpose — the pages only import from it, so
replacing it with a fetch against an API later is a one-file change.
