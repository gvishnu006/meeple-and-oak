import { useEffect, useRef, useState } from "react";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ShakeLoader } from "./components/Dice";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { GameDetail } from "./pages/GameDetail";
import { Tables } from "./pages/Tables";
import { Events } from "./pages/Events";
import { Join } from "./pages/Join";
import { NotFound } from "./pages/NotFound";

const ROUTES: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/library", element: <Library /> },
  { path: "/game/:id", element: <GameDetail /> },
  { path: "/tables", element: <Tables /> },
  { path: "/whats-on", element: <Events /> },
  { path: "/join", element: <Join /> },
  { path: "*", element: <NotFound /> },
];

/* ------------------------------------------------------------------
   Every route change gets the dice out of the cup for a moment.
   Filter changes do not: rolling dice while you type a search would
   be a joke nobody thanks you for.
   ------------------------------------------------------------------ */

function Shell() {
  const loc = useLocation();
  const firstRun = useRef(true);
  const [shown, setShown] = useState(loc.pathname);
  const [rolling, setRolling] = useState(true);
  const [shaking, setShaking] = useState(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      const t = window.setTimeout(() => {
        setShown(loc.pathname);
        setRolling(false);
        setShaking(false);
      }, 940);
      return () => window.clearTimeout(t);
    }

    if (loc.pathname === shown) return;
    setRolling(true);
    setShaking(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(
      () => {
        setShown(loc.pathname);
        setRolling(false);
        setShaking(false);
        window.scrollTo({ top: 0, behavior: "auto" });
      },
      reduce ? 180 : 430,
    );
    return () => window.clearTimeout(t);
  }, [loc.pathname, shown]);

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Meeple & Oak — board game café & lending library",
      "/library": "The shelf — 912 boxes",
      "/tables": "Tables & booking",
      "/whats-on": "What's on",
      "/join": "Join the café",
    };
    document.title = titles[loc.pathname] ?? "Meeple & Oak";
  }, [loc.pathname]);

  const Routes = useRoutes(ROUTES, { pathname: shown });

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header shaking={shaking} />
      <main id="main" tabIndex={-1}>
        {rolling ? (
          <ShakeLoader
            label={firstRun.current ? "Setting out the dice" : "Rolling to a new table"}
            minMs={firstRun.current ? 800 : 300}
            hold={220}
            note={
              firstRun.current
                ? "moving a chair out of the way"
                : "checking the table is free"
            }
          />
        ) : (
          Routes
        )}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
