import { Link, useParams } from "react-router-dom";
import { GAMES, LIBRARY, byId, playerRange, similarTo, timeRange, WEIGHT_LABEL } from "../data/games";
import { EVENTS } from "../data/cafe";
import { BoxArt } from "../components/BoxArt";
import { GameCard, ShelfRow, WeightPips } from "../components/GameCard";
import { Die } from "../components/Dice";
import { Reveal } from "../components/Reveal";
import { NotFound } from "./NotFound";

const STATE_COPY = {
  in: { text: "On the shelf now", tone: "var(--felt-500)" },
  out: { text: "Both copies are out — back tomorrow", tone: "var(--red)" },
  teaching: { text: "Out with a member who is learning it", tone: "var(--brass)" },
} as const;

export function GameDetail() {
  const { id = "" } = useParams();
  const g = byId(id);

  if (!g) return <NotFound />;

  const state = STATE_COPY[g.onShelf];
  const near = similarTo(g);
  const teaching = EVENTS.filter((e) => e.kind === "teach").slice(0, 1);

  return (
    <div className="wrap">
      <div className="detail">
        <Reveal className="detail__art">
          <div className="detail__box">
            <BoxArt game={g} />
            {g.copies === 1 && <span className="box__wear" aria-hidden="true" />}
          </div>
          <p className="detail__state">
            <span
              className="box__flag"
              data-state={g.onShelf}
              style={{ position: "static", boxShadow: "none" }}
              aria-hidden="true"
            />
            {state.text}
          </p>
          <p className="hangtag">
            {g.copies === 1 ? "one copy" : `${g.copies} copies`} · shelf row {g.shelfRow}
          </p>
        </Reveal>

        <Reveal delay={90}>
          <p className="crumbs">
            <Link to="/">Home</Link> / <Link to="/library">The shelf</Link> / {g.title}
          </p>
          <h1>{g.title}</h1>
          <p className="detail__by">
            {g.designer}, {g.year} · {playerRange(g)} players · {timeRange(g)}
          </p>

          <p className="detail__hook">{g.hook}</p>

          <p className="lede">{g.blurb}</p>

          <div className="specs">
            <div className="spec">
              <b className="num">{playerRange(g)}</b>
              <span>players</span>
            </div>
            <div className="spec">
              <b className="num">{timeRange(g)}</b>
              <span>at the table</span>
            </div>
            <div className="spec">
              <b>
                <WeightPips n={g.weight} />
              </b>
              <span>{WEIGHT_LABEL[g.weight]}</span>
            </div>
            <div className="spec">
              <b className="num">{g.year}</b>
              <span>published</span>
            </div>
          </div>

          <div className="cluster" style={{ marginBottom: "1.3rem" }}>
            {g.tags.map((t) => (
              <Link key={t} to={`/library?tag=${t}`} className="tag">
                {t}
              </Link>
            ))}
          </div>

          <div className="detail__cta">
            <Link to="/tables#book" className="btn btn--red">
              Play this tonight
            </Link>
            {g.lending ? (
              <Link to="/join" className="btn btn--ghost">
                Borrow it for a fortnight
              </Link>
            ) : (
              <span className="hint">reference only — this one stays on the shelf</span>
            )}
            <span className="hint">
              <Die value={4} size="sm" tone="felt" /> teaching sessions {g.teaches ? "run" : "on request"}
            </span>
          </div>

          <div className="prose">
            <h3>Why it is on the shelf</h3>
            <p>
              {g.title} is one of the {LIBRARY.games} boxes we actively hand to people
              rather than keep for ourselves. It asks a lot of one thing and lets you off
              the rest, which is a rare balance on a shelf this size.{" "}
              {g.weight >= 4
                ? "It is a long sit — book the Long Oak, not the window seat."
                : "It fits an hour, which is why it disappears so reliably."}
            </p>
            <h3>Before you sit down</h3>
            <ul>
              <li>
                Best at {g.best} players. It does not collapse with {g.players[1]}, but it
                is better with fewer opinions.
              </li>
              <li>
                {g.minutes[1] > 90
                  ? "Plan an evening. The teach alone is twenty minutes."
                  : "Short enough to finish before the second pot of tea."}
              </li>
              <li>
                {g.teaches
                  ? "We run a teaching session on this one. £4, forty minutes, no notes taken."
                  : "Read the rulebook before you sit down. Bring a pencil, not a phone."}
              </li>
              <li>
                {g.copies === 1
                  ? "One copy only. Members get first refusal on it — ask at the bar."
                  : `${g.copies} copies, so the odds are good.`}
              </li>
            </ul>
            {teaching.length > 0 && g.teaches && (
              <p className="hint" style={{ marginTop: "1rem" }}>
                Next teaching slot: {teaching[0].day} {teaching[0].time} — {teaching[0].title}
              </p>
            )}
          </div>
        </Reveal>
      </div>

      <section className="pad-sm" aria-label="Similar games">
        <div className="sec-head">
          <div>
            <p className="label">If you like that</p>
            <h2>Four boxes the same length of brain</h2>
          </div>
          <div className="sec-head__side">
            <Link to="/library" className="link-more">
              Back to the shelf
            </Link>
          </div>
        </div>
        <div className="shelf">
          <ShelfRow games={near} eager />
        </div>
      </section>
    </div>
  );
}

export const ALL_GAME_IDS = GAMES.map((x) => x.id);
export { GameCard };
