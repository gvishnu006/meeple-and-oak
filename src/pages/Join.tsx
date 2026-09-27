import { Link } from "react-router-dom";
import { MEMBERSHIP, CAFE, OPENING_HOURS } from "../data/cafe";
import { LIBRARY } from "../data/games";
import { Die } from "../components/Dice";
import { Reveal } from "../components/Reveal";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do I have to be a member to play?",
    a: "No. A day pass is £7, it waves the table fee, and you can play anything on the shelf. Members just pay less and take games home.",
  },
  {
    q: "What actually happens to a borrowed box?",
    a: "It goes home in the tote bag, with the rulebook and a pencil taped inside the lid. Fourteen days, then back on the shelf, or renew by phone if nobody is waiting.",
  },
  {
    q: "What if we turn up and everything is out?",
    a: "You will still play something. The shelf is 900 boxes, and the swap pile near the stairs is a genuine free-for-all on Sundays.",
  },
  {
    q: "Can I bring children?",
    a: "Before six on a weekday, all the time. There's a shelf of picture boxes kept behind the bar that we will point you at.",
  },
  {
    q: "Is it loud?",
    a: "Friday and Saturday after seven, somewhat. Tuesday and Wednesday are quiet, and the cellar table is always the calm one.",
  },
  {
    q: "Do you sell the games?",
    a: "Not really. There is a shelf of recommendations and a link, and we take a small cut if you buy one through us. That is the whole business model.",
  },
];

export function Join() {
  return (
    <div className="wrap">
      <header className="pagehead">
        <p className="crumbs">
          <Link to="/">Home</Link> / Join
        </p>
        <h1>Three ways in. All of them optional.</h1>
        <p className="lede">
          The cheapest way to use the café costs nothing but the time of your visit. The
          membership exists for people who want games in their own kitchen as well.
          {LIBRARY.members.toLocaleString("en-GB")} people have decided it is worth it.
        </p>
      </header>

      <section className="pad-sm" aria-label="Membership tiers">
        <div className="plans">
          {MEMBERSHIP.map((m, i) => (
            <Reveal key={m.name} delay={i * 80} className={`plan${m.best ? " plan--best" : ""}`}>
              {m.best && <span className="plan__flag stamp">most people</span>}
              <p className="label label--ink" style={m.best ? { color: "var(--felt-300)" } : undefined}>
                {m.name}
              </p>
              <p className="plan__price">
                <sup>£</sup>
                {m.price}
                <span>{m.unit}</span>
              </p>
              <p style={{ color: m.best ? "inherit" : "var(--fg-soft)", fontSize: "var(--step--1)", margin: 0 }}>
                {m.blurb}
              </p>
              <ul>
                {m.includes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <Link
                to="/tables#book"
                className={`btn ${m.best ? "btn--red" : "btn--ghost"}`}
                style={{ justifyContent: "center" }}
              >
                {m.price === 7 ? "Just turn up" : "Start it"}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pad-sm">
        <div className="story">
          <Reveal>
            <p className="label">The small print, plainly</p>
            <h2>What you are actually signing up for</h2>
            <ul className="plainlist">
              <li>Rolling month to month. No minimum term, no exit fee, cancel by reply.</li>
              <li>Cards stay on the file. People lose them; it is not a disciplinary matter.</li>
              <li>Late boxes are fine. We do not charge, we do not shame, we do stop lending.</li>
              <li>Members get first refusal on anything on the new-arrivals table.</li>
            </ul>
            <div className="cluster" style={{ marginTop: "1.3rem" }}>
              <Link to="/tables#book" className="btn btn--red">
                Book a table first
              </Link>
              <a className="btn btn--paper" href={`mailto:${CAFE.email}?subject=Membership`}>
                Ask a question
              </a>
            </div>
          </Reveal>
          <Reveal delay={100} className="card">
            <div className="hours-card">
              <p className="label">Opening hours</p>
              <table className="hours">
                <tbody>
                  {OPENING_HOURS.map((h) => {
                    const idx = (new Date().getDay() + 6) % 7;
                    const isToday = OPENING_HOURS.indexOf(h) === idx;
                    return (
                      <tr key={h.day} data-today={isToday || undefined}>
                        <th scope="row">
                          {h.day}
                          {isToday && <span className="tag tag--red">today</span>}
                        </th>
                        <td className="num">{h.open ? `${h.open} – ${h.close}` : "closed"}</td>
                        <td className="hours__note">
                          {h.quiet ? "quiet" : ""}
                          {h.close === "01:00" ? " · late" : ""}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="mono-note" style={{ marginTop: "0.8rem", marginBottom: 0 }}>
                <Die value={6} size="sm" tone="felt" /> {CAFE.address} · {CAFE.phone}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pad-sm">
        <div className="sec-head">
          <div>
            <p className="label">Questions people actually ask</p>
            <h2>Six of them, answered</h2>
          </div>
        </div>
        <div className="faq">
          {FAQ.map((f, i) => (
            <details className="faq__item" key={f.q} open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <span className="faq__mark" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
