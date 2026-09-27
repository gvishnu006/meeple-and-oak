import { Link } from "react-router-dom";
import { Die } from "../components/Dice";
import { Reveal } from "../components/Reveal";
import { CAFE } from "../data/cafe";
import { GAMES } from "../data/games";

export function NotFound() {
  const suggestions = [GAMES[15], GAMES[4], GAMES[9], GAMES[23]];

  return (
    <div className="wrap nf">
      <span className="nf__dice" aria-hidden="true">
        <Die value={1} tone="red" />
        <Die value={1} tone="red" />
        <Die value={1} tone="red" />
      </span>
      <p className="label">Snake eyes</p>
      <h1>That is not a game we have.</h1>
      <p className="lede" style={{ textAlign: "center" }}>
        Either the box is back from loan, or the link was mistyped. Both happen. Here are
        four that are definitely in and definitely worth the walk over.
      </p>
      <div className="cluster" style={{ justifyContent: "center" }}>
        <Link to="/library" className="btn btn--red">
          Browse the shelf
        </Link>
        <Link to="/tables" className="btn btn--ghost">
          Book a table
        </Link>
        <a className="btn btn--paper" href={`mailto:${CAFE.email}`}>
          Tell us what broke
        </a>
      </div>
      <Reveal className="shelf nf__shelf" as="div">
        <div className="shelf__row">
          {suggestions.map((g) => (
            <div key={g.id}>
              <Link to={`/game/${g.id}`} className="box" style={{ paddingBottom: 12 }}>
                <div className="box__inner">
                  <div className="box__art">
                    <MiniArt game={g} />
                  </div>
                  <div className="box__label">
                    <span className="box__title">{g.title}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="shelf__board" role="presentation" />
      </Reveal>
    </div>
  );
}

/* a small standalone cover so this page does not depend on BoxArt's import order */
function MiniArt({ game }: { game: (typeof GAMES)[number] }) {
  return (
    <div
      className="box__art"
      style={{ background: `linear-gradient(158deg, ${game.art.base}, ${game.art.deep})` }}
    >
      <svg viewBox="0 0 100 133" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Cover of ${game.title}`}>
        <circle cx="50" cy="52" r="24" fill={game.art.pop} opacity=".9" />
        <path d="M50 20 L50 84 M18 52 L82 52" stroke={game.art.bone} strokeWidth="1.5" opacity=".5" />
        <rect x="0" y="103" width="100" height="30" fill={game.art.deep} opacity=".92" />
        <text
          x="50"
          y="119"
          textAnchor="middle"
          fill={game.art.bone}
          style={{ font: "600 10px Fraunces, Georgia, serif" }}
        >
          {game.title.length > 17 ? `${game.title.slice(0, 16)}…` : game.title}
        </text>
      </svg>
    </div>
  );
}
