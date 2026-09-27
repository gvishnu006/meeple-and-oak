import { Link } from "react-router-dom";
import { LIBRARY } from "../data/games";
import { CAFE, OPENING_HOURS } from "../data/cafe";
import { Die } from "./Dice";

const todayIndex = () => {
  const d = new Date().getDay(); // 0 sun .. 6 sat
  return (d + 6) % 7; // 0 monday
};

export function Footer() {
  const nowIdx = todayIndex();
  const today = OPENING_HOURS[nowIdx];

  return (
    <footer className="foot">
      <div className="wrap foot__grid">
        <div>
          <p className="label label--paper">Find us</p>
          <p className="foot__addr">{CAFE.address}</p>
          <p className="mono-note" style={{ color: "var(--felt-300)" }}>
            <a href={`tel:${CAFE.phone.replace(/\s/g, "")}`}>{CAFE.phone}</a>
            <br />
            <a href={`mailto:${CAFE.email}`}>{CAFE.email}</a>
          </p>
          <p className="foot__hours">
            <span className="label label--paper">Today</span>
            {today.open ? (
              <span className="num">
                {today.open} – {today.close}
                {today.quiet && <em> · quiet day</em>}
              </span>
            ) : (
              <span>Closed. The shelf is a library on Mondays.</span>
            )}
          </p>
        </div>

        <div>
          <p className="label label--paper">Shelf</p>
          <ul className="foot__list">
            <li>
              <Link to="/library">All {LIBRARY.boxes} boxes</Link>
            </li>
            <li>
              <Link to="/library?weight=1">Gentle &amp; quick</Link>
            </li>
            <li>
              <Link to="/library?tag=two-player">Two-player nights</Link>
            </li>
            <li>
              <Link to="/library?tag=co-op">Co-op, all of it</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="label label--paper">Café</p>
          <ul className="foot__list">
            <li>
              <Link to="/tables">Tables &amp; booking</Link>
            </li>
            <li>
              <Link to="/whats-on">What's on</Link>
            </li>
            <li>
              <Link to="/join">Membership</Link>
            </li>
            <li>
              <a href="#main">Back to top</a>
            </li>
          </ul>
        </div>

        <div className="foot__colophon">
          <p className="foot__big">
            <Die value={3} tone="red" size="sm" />
            <br />
            Board games should be
            <br />
            played in person.
          </p>
          <p className="mono-note" style={{ color: "var(--felt-300)" }}>
            {CAFE.since_note}
          </p>
        </div>
      </div>

      <div className="wrap foot__base">
        <p className="mono-note">© {new Date().getFullYear()} {CAFE.name}. Rooms, tea, one grumpy d20.</p>
        <p className="mono-note">
          Built by the café · <span className="num">{LIBRARY.chairs}</span> chairs ·
          <span className="num"> {LIBRARY.members.toLocaleString("en-GB")}</span> members
        </p>
      </div>
    </footer>
  );
}
