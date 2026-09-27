import { Link } from "react-router-dom";
import type { Game } from "../data/games";
import { playerRange, timeRange, WEIGHT_LABEL } from "../data/games";
import { BoxArt } from "./BoxArt";

export function WeightPips({ n, title = true }: { n: number; title?: boolean }) {
  return (
    <span
      className="pips"
      title={title ? `${WEIGHT_LABEL[n as 1 | 2 | 3 | 4 | 5]} — weight ${n} of 5` : undefined}
      aria-label={title ? `Complexity ${n} of 5, ${WEIGHT_LABEL[n as 1 | 2 | 3 | 4 | 5]}` : undefined}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} data-on={i <= n ? "1" : "0"} aria-hidden="true" />
      ))}
    </span>
  );
}

export function GameCard({ g, eager = false }: { g: Game; eager?: boolean }) {
  return (
    <Link to={`/game/${g.id}`} className="box" aria-label={`${g.title}, ${timeRange(g)}, ${playerRange(g)} players`}>
      <div className="box__inner">
        <div className="box__art" data-eager={eager || undefined}>
          <BoxArt game={g} />
          <span
            className="box__flag"
            data-state={g.onShelf}
            title={
              g.onShelf === "in"
                ? "On the shelf now"
                : g.onShelf === "out"
                  ? "Both copies out"
                  : "Out with a teacher"
            }
          />
        </div>
        <div className="box__label">
          <span className="box__title">{g.title}</span>
          <span className="box__meta num">
            {g.year} · {timeRange(g)}
          </span>
        </div>
        <div className="box__label" style={{ paddingTop: 0, gap: ".6rem" }}>
          <span className="box__meta">
            {playerRange(g)}p
          </span>
          <WeightPips n={g.weight} />
        </div>
      </div>
      <span className="box__contact" aria-hidden="true" />
    </Link>
  );
}

export function ShelfRow({ games, eager = false }: { games: Game[]; eager?: boolean }) {
  return (
    <>
      <div className="shelf__row">
        {games.map((g, i) => (
          <GameCard key={g.id} g={g} eager={eager && i < 8} />
        ))}
      </div>
      <div className="shelf__board" role="presentation" />
    </>
  );
}

export function BoxSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div aria-hidden="true">
      <div className="shelf__row">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} style={{ paddingBottom: 12 }}>
            <div className="skel-box" style={{ aspectRatio: "3 / 4" }} />
            <div className="skel-box" style={{ height: 10, width: "70%", marginTop: 10 }} />
            <div className="skel-box" style={{ height: 8, width: "40%", marginTop: 7 }} />
          </div>
        ))}
      </div>
      <div className="skel-shelf" />
    </div>
  );
}
