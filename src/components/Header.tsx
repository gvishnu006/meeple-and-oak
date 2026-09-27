import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Die } from "./Dice";
import { LIBRARY } from "../data/games";

const NAV = [
  { to: "/library", label: "The shelf" },
  { to: "/tables", label: "Tables" },
  { to: "/whats-on", label: "What's on" },
  { to: "/join", label: "Join" },
];

export function Header({ shaking }: { shaking: boolean }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header className={`site-head${solid ? " is-solid" : ""}`}>
      <div className="site-head__bar wrap">
        <Link to="/" className="wordmark" aria-label="Meeple and Oak, home">
          <span className="wordmark__die" aria-hidden="true">
            <Die value={5} tone="red" size="sm" />
          </span>
          <span className="wordmark__text">
            Meeple <em>&amp;</em> Oak
          </span>
          <span className="wordmark__sub num">est. 2019 · bristol</span>
        </Link>

        <nav className={`site-nav${open ? " is-open" : ""}`} aria-label="Main">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => `site-nav__link${isActive ? " is-on" : ""}`}
            >
              {n.label}
            </NavLink>
          ))}
          <Link to="/tables#book" className="btn btn--red btn--sm site-nav__cta">
            Book a table
          </Link>
        </nav>

        <div className="site-head__end">
          {shaking && (
            <span className="tumble" role="status" aria-live="polite">
              <span className="tumble__die" aria-hidden="true">
                <Die value={2} tone="felt" size="sm" />
              </span>
              <span className="label">rolling</span>
            </span>
          )}
          <button
            className="burger"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="burger__bars" aria-hidden="true" data-open={open} />
          </button>
        </div>
      </div>
      <p className="site-head__ticker num" aria-hidden="true">
        {LIBRARY.boxes} boxes · {LIBRARY.shelfWidthM}m of shelving · open until 1am on fridays
        <span>— {LIBRARY.boxes} boxes · {LIBRARY.shelfWidthM}m of shelving · open until 1am on fridays —</span>
      </p>
    </header>
  );
}
