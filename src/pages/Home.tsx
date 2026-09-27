import { Link } from "react-router-dom";
import { GAMES, LIBRARY, playerRange, timeRange } from "../data/games";
import { EVENTS, KIND_LABEL } from "../data/cafe";
import { BoxArt } from "../components/BoxArt";
import { WeightPips } from "../components/GameCard";
import { Die, dieGlyph } from "../components/Dice";
import { Reveal } from "../components/Reveal";

const PICKS = ["g03", "g11", "g16", "g05"].map((id) => GAMES.find((g) => g.id === id)!).filter(Boolean);

const STEPS = [
  {
    n: "1",
    t: "Find something on the shelf",
    d: "Nine hundred boxes, sorted by how much brain they ask for rather than by alphabet. Every box has a card: players, length, how hard it hits.",
  },
  {
    n: "2",
    t: "Ask, or just ask",
    d: "Nobody is on commission here. Point at a box and say the word — we'll tell you honestly whether your table will like it.",
  },
  {
    n: "3",
    t: "Play it at a table",
    d: "Table fee is waived with a day pass. Tea is refilled until you leave. Teaching sessions are £4 and run most evenings.",
  },
];

const WALL_ROWS = [GAMES.slice(0, 6), GAMES.slice(6, 12), GAMES.slice(12, 18)];

function HeroWall() {
  return (
    <div className="hero__wall" aria-hidden="true">
      <span className="hero__ticket">shelf B · row 2</span>
      {WALL_ROWS.map((row, i) => (
        <div className="hero__wallrow" key={i}>
          {row.map((g, j) => (
            <div
              className="hero__mini"
              key={g.id}
              style={{
                height: `${62 + ((i * 7 + j * 11) % 34)}%`,
                background: `linear-gradient(170deg, ${g.art.base}, ${g.art.deep})`,
                transform: `rotate(${((i * 3 + j * 5) % 5) - 2}deg)`,
              }}
            >
              <svg viewBox="0 0 100 133" preserveAspectRatio="xMidYMid slice">
                <rect x="8" y="30" width="84" height="46" fill={g.art.deep} opacity=".45" />
                <rect x="18" y="84" width="64" height="16" fill={g.art.pop} opacity=".9" />
                <circle cx="50" cy="52" r="17" fill={g.art.pop} opacity=".85" />
              </svg>
            </div>
          ))}
        </div>
      ))}
      <div className="hero__board" />
    </div>
  );
}

function PickRow({ g, i }: { g: (typeof GAMES)[number]; i: number }) {
  return (
    <Reveal as="article" delay={i * 70} className="pickcard">
      <Link to={`/game/${g.id}`} className="pickcard__art">
        <BoxArt game={g} showTitle={false} />
      </Link>
      <div className="pickcard__body">
        <p className="label label--ink">{g.tags[0]}</p>
        <h3>
          <Link to={`/game/${g.id}`}>{g.title}</Link>
        </h3>
        <p className="pickcard__why">{g.hook}</p>
        <div className="cluster">
          <span className="tag num">{playerRange(g)} players</span>
          <span className="tag num">{timeRange(g)}</span>
          <WeightPips n={g.weight} />
        </div>
      </div>
    </Reveal>
  );
}

export function Home() {
  const next = EVENTS.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div>
            <p className="label">
              <Die value={6} size="sm" tone="red" />
              {LIBRARY.boxes} boxes · {LIBRARY.chairs} chairs · Bristol
            </p>
            <h1>
              A café that <em>keeps</em> the games.
            </h1>
            <p className="hero__sub">
              Meeple &amp; Oak is a board game café and a lending library in the same
              building. Come for the shelf and stay for the tea. If you would rather not
              own nine hundred boxes, borrow ours for a fortnight.
            </p>
            <div className="hero__cta">
              <Link to="/library" className="btn btn--red btn--lg">
                Browse the shelf
              </Link>
              <Link to="/tables" className="btn btn--ghost btn--lg">
                Book a table
              </Link>
              <span className="hint">no account needed to browse</span>
            </div>
            <div className="hero__facts">
              <div className="hero__fact">
                <b className="num">{LIBRARY.boxes}</b>
                <span>boxes on the shelf</span>
              </div>
              <div className="hero__fact">
                <b className="num">{LIBRARY.members.toLocaleString("en-GB")}</b>
                <span>people with a card</span>
              </div>
              <div className="hero__fact">
                <b className="num">{LIBRARY.shelfWidthM}m</b>
                <span>of shelving, hand-built</span>
              </div>
              <div className="hero__fact">
                <b className="num">{dieGlyph(6)}</b>
                <span>best game: 3 hours</span>
              </div>
            </div>
          </div>
          <HeroWall />
        </div>
      </section>

      <section className="wrap pad-sm">
        <div className="story">
          <Reveal>
            <p className="label">Why we exist</p>
            <h2>
              The best games are the ones somebody teaches you in person.
            </h2>
            <p className="lede">
              We opened in {2019} with sixty boxes and a folding table. The folding
              table is still here, holding the overflow. Nothing is sold, nothing is
              loud, and no one has ever been asked to leave for playing too long.
            </p>
            <div className="cluster" style={{ marginTop: "1.2rem" }}>
              <Link to="/join" className="link-more">
                Membership from £7 a day
              </Link>
              <Link to="/whats-on" className="link-more">
                This week's evenings
              </Link>
            </div>
            <div className="factlist" style={{ marginTop: "1.8rem" }}>
              <div className="factrow">
                <span>Table fee, waived with a day pass</span>
                <b className="num">£4–£12</b>
              </div>
              <div className="factrow">
                <span>Teaching session</span>
                <b className="num">£4</b>
              </div>
              <div className="factrow">
                <span>Borrow a box for a fortnight</span>
                <b className="num">£14/mo</b>
              </div>
              <div className="factrow">
                <span>Tea and coffee refills</span>
                <b>always</b>
              </div>
            </div>
          </Reveal>
          <Reveal as="div" delay={120} className="story__stack">
            {GAMES.slice(20, 24).map((g) => (
              <BoxArt key={g.id} game={g} showTitle={false} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="wrap pad-sm">
        <div className="sec-head">
          <div>
            <p className="label">Ask a member</p>
            <h2>Four we would hand a first-timer</h2>
          </div>
          <div className="sec-head__side">
            <Link to="/library?tag=quick" className="link-more">
              Quick games
            </Link>
            <Link to="/library" className="link-more">
              All 912
            </Link>
          </div>
        </div>
        <div className="picks">
          {PICKS.map((g, i) => (
            <PickRow key={g.id} g={g} i={i} />
          ))}
        </div>
      </section>

      <section className="wrap pad-sm">
        <div className="sec-head">
          <div>
            <p className="label">This week</p>
            <h2>Evenings in the back room</h2>
          </div>
          <div className="sec-head__side">
            <Link to="/whats-on" className="link-more">
              Full diary
            </Link>
          </div>
        </div>
        <div className="events">
          {next.map((e) => (
            <article className="event" key={e.id} data-full={e.left === 0 ? "1" : "0"}>
              <div className="event__date">
                <b>{e.day}</b>
                <span>{e.time}</span>
              </div>
              <div>
                <p className="label label--ink">{KIND_LABEL[e.kind]}</p>
                <h3>{e.title}</h3>
                <p>{e.blurb}</p>
              </div>
              <div className="event__side">
                <span className="event__left num">
                  <b>{e.left}</b> of {e.seats} left
                </span>
                <Link to="/whats-on" className="btn btn--paper btn--sm">
                  {e.price ? `£${e.price}` : "Free"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap pad-sm">
        <div className="sec-head">
          <div>
            <p className="label">How it works</p>
            <h2>Three steps, no forms</h2>
          </div>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90} className="step">
              <span className="step__n">
                <Die value={Number(s.n)} tone="felt" />
              </span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="wrap pad-sm">
        <Reveal className="tuck">
          <div className="shelfcard">
            <p>
              “I came in for a coffee and left four hours later owning nothing, having
              played nine games, and being taught how to lose at Root by a sixteen-year-old
              who works here on Saturdays.”
            </p>
            <p className="label label--ink">— Gemma, member since 2021</p>
          </div>
          <div>
            <h2>Borrow it or play it here. Both are fine.</h2>
            <p className="lede">
              Members take two boxes home at a time for a fortnight. Everyone else pays
              the day pass and plays the copy on the shelf until the kettle boils.
            </p>
            <div className="cluster" style={{ marginTop: "1.3rem" }}>
              <Link to="/join" className="btn btn--red">
                See membership
              </Link>
              <Link to="/tables" className="btn btn--ghost">
                Book tonight
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
