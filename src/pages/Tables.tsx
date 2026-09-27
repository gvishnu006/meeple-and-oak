import { useState } from "react";
import { Link } from "react-router-dom";
import { TABLES, CAFE } from "../data/cafe";
import { GAMES, playerRange, timeRange } from "../data/games";
import { Die, DiceRow } from "../components/Dice";
import { Reveal } from "../components/Reveal";

const SLOTS = ["12:00", "13:00", "14:00", "15:00", "17:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

const BUSTED = [1, 2, 3];

export function Tables() {
  const [form, setForm] = useState({ name: "", date: "", time: "19:00", table: "t3", game: "", size: "4", note: "" });
  const [rolling, setRolling] = useState(false);
  const [booked, setBooked] = useState<null | { ref: string; table: string; roll: number[] }>(null);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.date || !form.game.trim()) {
      setError("We need a name, a date and which game — the rest we can guess.");
      return;
    }
    setError("");
    setRolling(true);
    window.setTimeout(() => {
      setRolling(false);
      setBooked({
        ref: `M&O-${Math.floor(1000 + Math.random() * 8999)}`,
        table: TABLES.find((t) => t.id === form.table)?.name ?? "a table",
        roll: BUSTED,
      });
    }, 900);
  };

  return (
    <div className="wrap">
      <header className="pagehead">
        <p className="crumbs">
          <Link to="/">Home</Link> / Tables
        </p>
        <h1>Six tables. That is genuinely all of them.</h1>
        <p className="lede">
          We cap the room at {CAFE.chairs} seats on purpose. It means the Long Oak is
          genuinely quiet, that teaching sessions can be heard across the room, and that
          nobody has ever played a two-hour game next to a football match.
        </p>
      </header>

      <section className="pad-sm" aria-label="Tables in the room">
        <div className="sec-head">
          <div>
            <p className="label">The room</p>
            <h2>Pick your patch of floor</h2>
          </div>
          <div className="sec-head__side">
            <a className="link-more" href={`tel:${CAFE.phone.replace(/\s/g, "")}`}>
              Or ring the bar
            </a>
          </div>
        </div>
        <div className="tables">
          {TABLES.map((t, i) => (
            <Reveal as="article" key={t.id} delay={i * 60} className="tablecard">
              <div className="tablecard__top">
                <h3>{t.name}</h3>
                <span className="seatpips" aria-label={`${t.seats} seats`}>
                  {Array.from({ length: t.seats }, (_, k) => (
                    <i key={k} />
                  ))}
                </span>
              </div>
              <p>{t.note}</p>
              <p className="mono-note">
                {t.seats} seats · {t.shape} · {t.near}
              </p>
              <span className="tablecard__shape" data-shape={t.shape} aria-hidden="true" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pad-sm" id="book" aria-label="Book a table">
        <div className="sec-head">
          <div>
            <p className="label">Booking</p>
            <h2>Hold a table</h2>
          </div>
        </div>

        <div className="booking">
          {booked ? (
            <div className="done">
              <div className="empty__dice" aria-hidden="true">
                <DiceRow values={booked.roll} tone="red" />
              </div>
              <h3>That is in the book, {form.name.split(" ")[0]}.</h3>
              <p className="lede" style={{ margin: 0 }}>
                {booked.table}, {form.date} at {form.time}. We have put{" "}
                <b>{form.game}</b> aside on the shelf so nobody claims it first. Reference{" "}
                <span className="num">{booked.ref}</span>.
              </p>
              <div className="cluster">
                <Link to="/library" className="btn btn--ghost btn--sm">
                  Keep browsing
                </Link>
                <button className="btn btn--paper btn--sm" onClick={() => setBooked(null)}>
                  Book another
                </button>
              </div>
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <label className="field">
                <span>Name on the booking</span>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Gemma Fisher"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="field">
                <span>Date</span>
                <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required />
              </label>
              <label className="field">
                <span>Time</span>
                <select value={form.time} onChange={(e) => set("time", e.target.value)}>
                  {SLOTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Table</span>
                <select value={form.table} onChange={(e) => set("table", e.target.value)}>
                  {TABLES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} · {t.seats} seats
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>How many of you</span>
                <select value={form.size} onChange={(e) => set("size", e.target.value)}>
                  {[2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Which game</span>
                <input
                  list="shelf-options"
                  value={form.game}
                  onChange={(e) => set("game", e.target.value)}
                  placeholder="Root, or nothing in particular"
                  required
                />
                <datalist id="shelf-options">
                  {GAMES.slice(0, 12).map((g) => (
                    <option key={g.id} value={g.title}>
                      {playerRange(g)}p · {timeRange(g)}
                    </option>
                  ))}
                </datalist>
              </label>
              <label className="field field--wide">
                <span>Anything we should know</span>
                <textarea
                  value={form.note}
                  onChange={(e) => set("note", e.target.value)}
                  placeholder="First time, birthday, needs a table with no draught…"
                />
              </label>

              <div className="form__foot">
                <button className="btn btn--red btn--lg" type="submit" disabled={rolling}>
                  {rolling ? "Rolling…" : "Hold it"}
                </button>
                <span className="hint">
                  <Die value={5} size="sm" tone="felt" /> free to hold, £4–£12 on the day,
                  waived with a day pass
                </span>
                {error && (
                  <span className="hint" style={{ color: "var(--red)" }} role="alert">
                    {error}
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
