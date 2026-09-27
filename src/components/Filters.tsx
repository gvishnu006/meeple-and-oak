import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GAMES, TAGS, WEIGHT_LABEL } from "../data/games";
import type { Game, Weight } from "../data/games";

export interface Filters {
  q: string;
  tags: string[];
  players: number | null;
  weight: Weight | null;
  sort: Sort;
}

export type Sort = "shelf" | "quick" | "heavy" | "light" | "new" | "a-z";

export const SORTS: { id: Sort; label: string }[] = [
  { id: "shelf", label: "Shelf order" },
  { id: "quick", label: "Quickest first" },
  { id: "light", label: "Lightest first" },
  { id: "heavy", label: "Heaviest first" },
  { id: "new", label: "Newest box" },
  { id: "a-z", label: "A to Z" },
];

const num = (v: string | null, fallback: number) => {
  const n = v == null ? NaN : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export function useFilters(): {
  filters: Filters;
  set: (patch: Partial<Filters>) => void;
  toggleTag: (t: string) => void;
  clear: () => void;
  results: Game[];
  activeCount: number;
} {
  const [params, setParams] = useSearchParams();

  const filters: Filters = useMemo(
    () => ({
      q: params.get("q") ?? "",
      tags: params.get("tag") ? params.get("tag")!.split(",").filter(Boolean) : [],
      players: params.get("players") ? num(params.get("players"), 0) : null,
      weight: params.get("weight") ? (num(params.get("weight"), 1) as Weight) : null,
      sort: (params.get("sort") as Sort) ?? "shelf",
    }),
    [params],
  );

  // keep the input's own text in the URL so a search is shareable
  const set = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    const p = new URLSearchParams();
    if (next.q) p.set("q", next.q);
    if (next.tags.length) p.set("tag", next.tags.join(","));
    if (next.players) p.set("players", String(next.players));
    if (next.weight) p.set("weight", String(next.weight));
    if (next.sort !== "shelf") p.set("sort", next.sort);
    setParams(p, { replace: true });
  };

  const toggleTag = (t: string) =>
    set({ tags: filters.tags.includes(t) ? filters.tags.filter((x) => x !== t) : [...filters.tags, t] });

  const clear = () => {
    setParams(new URLSearchParams(), { replace: true });
  };

  const results = useMemo(() => {
    const needle = filters.q.trim().toLowerCase();
    let out = GAMES.filter((g) => {
      if (filters.players && g.players[0] > filters.players) return false;
      if (filters.weight && g.weight !== filters.weight) return false;
      if (filters.tags.length && !filters.tags.every((t) => g.tags.includes(t))) return false;
      if (!needle) return true;
      return (
        g.title.toLowerCase().includes(needle) ||
        g.designer.toLowerCase().includes(needle) ||
        g.tags.some((t) => t.includes(needle)) ||
        g.blurb.toLowerCase().includes(needle)
      );
    });

    const byMin = (g: Game) => g.minutes[0];
    out = [...out].sort((a, b) => {
      switch (filters.sort) {
        case "quick":
          return byMin(a) - byMin(b);
        case "light":
          return a.weight - b.weight || byMin(a) - byMin(b);
        case "heavy":
          return b.weight - a.weight || byMin(b) - byMin(a);
        case "new":
          return b.year - a.year;
        case "a-z":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    return out;
  }, [filters]);

  const activeCount =
    (filters.q ? 1 : 0) +
    filters.tags.length +
    (filters.players ? 1 : 0) +
    (filters.weight ? 1 : 0);

  return { filters, set, toggleTag, clear, results, activeCount };
}

export function FilterBar({
  filters,
  set,
  toggleTag,
  clear,
  count,
  total,
  onSearch,
}: {
  filters: Filters;
  set: (p: Partial<Filters>) => void;
  toggleTag: (t: string) => void;
  clear: () => void;
  count: number;
  total: number;
  onSearch: (q: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(filters.q);
  useEffect(() => setQ(filters.q), [filters.q]);

  // debounce by hand: the shelf should feel searched, not busy
  useEffect(() => {
    if (q === filters.q) return;
    const t = window.setTimeout(() => onSearch(q), 240);
    return () => window.clearTimeout(t);
  }, [q, filters.q, onSearch]);

  return (
    <div className="filters">
      <div className="filters__top">
        <div className="search">
          <label className="sr-only" htmlFor="shelf-search">
            Search the shelf
          </label>
          <span className="search__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4.3-4.3" />
            </svg>
          </span>
          <input
            id="shelf-search"
            type="search"
            value={q}
            placeholder="Search a title, a designer, a mood…"
            autoComplete="off"
            onChange={(e) => {
              setQ(e.target.value);
              onSearch(e.target.value);
            }}
          />
          {q && (
            <button className="search__clear" onClick={() => onSearch("")} aria-label="Clear search">
              ×
            </button>
          )}
        </div>

        <div className="filters__count" aria-live="polite">
          <span className="num">{count}</span> of <span className="num">{total}</span> boxes
        </div>

        <button className="btn btn--ghost btn--sm filters__toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? "Hide filters" : "Filters"}
        </button>
      </div>

      <div className={`filters__body${open ? " is-open" : ""}`}>
        <div className="filters__line">
          <span className="label">At the table</span>
          <div className="cluster">
            {TAGS.map((t) => (
              <button
                key={t}
                className="chip"
                aria-pressed={filters.tags.includes(t)}
                onClick={() => toggleTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="filters__line">
          <span className="label">How many of you</span>
          <div className="cluster">
            {[1, 2, 3, 4, 5, 6].map((p) => (
              <button
                key={p}
                className="chip"
                aria-pressed={filters.players === p}
                onClick={() => set({ players: filters.players === p ? null : p })}
              >
                {p}
                <span className="x">+</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filters__line">
          <span className="label">How much thinking</span>
          <div className="cluster">
            {([1, 2, 3, 4, 5] as Weight[]).map((w) => (
              <button
                key={w}
                className="chip"
                aria-pressed={filters.weight === w}
                onClick={() => set({ weight: filters.weight === w ? null : w })}
              >
                {w} · {WEIGHT_LABEL[w]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filters__foot">
        <label className="sort">
          <span className="label">Sort</span>
          <select value={filters.sort} onChange={(e) => set({ sort: e.target.value as Filters["sort"] })}>
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <button className="link-more" onClick={clear} disabled={!count && !filters.q}>
          Clear everything
        </button>
      </div>
    </div>
  );
}
