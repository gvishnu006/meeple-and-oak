import { useState } from "react";
import { Link } from "react-router-dom";
import { EVENTS, KIND_LABEL, CAFE } from "../data/cafe";
import type { Event_ } from "../data/cafe";
import { Die } from "../components/Dice";
import { Reveal } from "../components/Reveal";

const KINDS = ["all", "teach", "tournament", "open-play", "swap"] as const;

const KIND_NOTE: Record<Event_["kind"], string> = {
  teach: "Someone on staff teaches it from zero, twice, then you play it properly.",
  tournament: "A continuing campaign or a bracket. Bring patience and a plan.",
  "open-play": "You choose. Cards go out so you can see what other people picked up.",
  swap: "Bring twenty, take twenty. The cupboard gets lighter every month.",
};

export function Events() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("all");
  const [name, setName] = useState("");
  const [joined, setJoined] = useState<string | null>(null);

  const list = EVENTS.filter(
    (e) => (kind === "all" || e.kind === kind) &&
      (e.title.toLowerCase().includes(name.toLowerCase()) || e.host.toLowerCase().includes(name.toLowerCase())),
  );

  return (
    <div className="wrap">
      <header className="pagehead">
        <p className="crumbs">
          <Link to="/">Home</Link> / What's on
        </p>
        <h1>The diary, more or less.</h1>
        <p className="lede">
          Everything here happens in the room, at a table, with a person. Teaching
          sessions are £4, swap Sunday is free, and the Open Play slot is where most
          people end up staying for three hours on a Sunday.
        </p>
      </header>

      <div className="filters" style={{ marginTop: "1.6rem" }}>
        <div className="filters__top">
          <div className="search">
            <label className="sr-only" htmlFor="ev-search">
              Search the diary
            </label>
            <span className="search__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4.3-4.3" />
              </svg>
            </span>
            <input
              id="ev-search"
              type="search"
              value={name}
              placeholder="Search by game, host, evening…"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="filters__count" aria-live="polite">
            <span className="num">{list.length}</span> coming up
          </div>
        </div>
        <div className="filters__body is-open" style={{ display: "grid" }}>
          <div className="filters__line">
            <span className="label">Kind of evening</span>
            <div className="cluster">
              {KINDS.map((k) => (
                <button key={k} className="chip" aria-pressed={kind === k} onClick={() => setKind(k)}>
                  {k === "all" ? "Everything" : KIND_LABEL[k]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="pad-sm" aria-label="Upcoming events">
        {list.length ? (
          <div className="events">
            {list.map((e, i) => {
              const full = e.left === 0;
              const isIn = joined === e.id;
              return (
                <Reveal as="article" key={e.id} delay={i * 45} className="event" data-full={full ? "1" : "0"}>
                  <div className="event__date">
                    <b>{e.day}</b>
                    <span>{e.time}</span>
                  </div>
                  <div>
                    <p className="label label--ink">
                      {KIND_LABEL[e.kind]} · {e.table}
                    </p>
                    <h3>{e.title}</h3>
                    <p>
                      {e.blurb} <em style={{ color: "var(--fg-faint)" }}>Hosted by {e.host}.</em>
                    </p>
                    <p className="mono-note" style={{ margin: "0.4rem 0 0" }}>
                      {KIND_NOTE[e.kind]}
                    </p>
                  </div>
                  <div className="event__side">
                    <span className="event__left num">
                      <b>{e.left}</b> of {e.seats} left
                    </span>
                    {isIn ? (
                      <span className="tag tag--me">
                        <Die value={3} size="sm" tone="felt" /> you are in
                      </span>
                    ) : (
                      <button
                        className={`btn btn--sm ${full ? "btn--paper" : "btn--red"}`}
                        disabled={full}
                        onClick={() => setJoined(e.id)}
                      >
                        {full ? "Full" : e.price ? `£${e.price} · join` : "Free · join"}
                      </button>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="empty">
            <span className="empty__dice" aria-hidden="true">
              <Die value={2} tone="red" size="sm" />
              <Die value={2} tone="red" size="sm" />
              <Die value={2} tone="red" size="sm" />
            </span>
            <h3>No evening matches that.</h3>
            <p>The diary is a month long and half of it is Open Play. Try that, or ask us to put something on.</p>
            <a className="btn btn--ghost" href={`mailto:${CAFE.email}?subject=An evening, please`}>
              Suggest an evening
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
