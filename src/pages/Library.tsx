import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GAMES, LIBRARY } from "../data/games";
import { FilterBar, useFilters } from "../components/Filters";
import { BoxSkeleton, ShelfRow } from "../components/GameCard";
import { Die } from "../components/Dice";
import { Reveal } from "../components/Reveal";

const ROW = 7;

export function Library() {
  const { filters, set, toggleTag, clear, results, activeCount } = useFilters();
  const [params] = useSearchParams();
  const [settling, setSettling] = useState(true);

  // the shelf takes a beat to re-sort itself; show placeholders, not a spinner
  useEffect(() => {
    setSettling(true);
    const t = window.setTimeout(() => setSettling(false), 300);
    return () => window.clearTimeout(t);
  }, [params]);

  const rows: (typeof GAMES)[] = [];
  for (let i = 0; i < results.length; i += ROW) rows.push(results.slice(i, i + ROW));

  return (
    <div className="wrap pagehead">
      <p className="crumbs">
        <Link to="/">Home</Link> / The shelf
      </p>
      <h1>Everything we own, in the order it hangs.</h1>
      <p className="lede">
        {LIBRARY.boxes} boxes on {LIBRARY.shelfWidthM} metres of shelf. Sorted light to
        heavy down each row, so if you cannot decide, walk the left-hand end first and
        stop when something looks fun. That is how most people choose.
      </p>

      <div style={{ marginTop: "1.8rem" }}>
        <FilterBar
          filters={filters}
          set={set}
          toggleTag={toggleTag}
          clear={clear}
          count={results.length}
          total={GAMES.length}
          onSearch={(q) => set({ q })}
        />
      </div>

      <section aria-label="Game library" aria-busy={settling}>
        {settling ? (
          <BoxSkeleton count={ROW} />
        ) : results.length ? (
          <>
            {rows.map((row, i) => (
              <Reveal key={`${filters.sort}-${filters.tags.join()}-${filters.q}-${filters.players}-${filters.weight}-${i}`} delay={i * 40}>
                <div className="shelf">
                  <ShelfRow games={row} eager={i === 0} />
                </div>
                <div className="shelf__gap" />
              </Reveal>
            ))}
            <p className="mono-note shelf__foot">
              end of row {rows.length} · {results.length} boxes shown · that is the whole
              lending collection
            </p>
          </>
        ) : (
          <div className="empty">
            <span className="empty__dice" aria-hidden="true">
              <Die value={1} tone="red" size="sm" />
              <Die value={1} tone="red" size="sm" />
              <Die value={1} tone="red" size="sm" />
            </span>
            <h3>Nothing on this row, which is annoying.</h3>
            <p>
              We have that many games with every one of those filters on. Try taking one
              off — the weight filter is the fussy one.
            </p>
            <button className="btn btn--ghost" onClick={clear}>
              Clear the filters
            </button>
            {activeCount > 0 && (
              <p className="hint">
                {activeCount} filter{activeCount === 1 ? "" : "s"} on
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
