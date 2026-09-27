import { useEffect, useRef, useState } from "react";

/* pip positions on a 3x3 face, as 0-indexed cells (row, col) */
const FACES: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

export const dieGlyph = (n: number) => "⚀⚁⚂⚃⚄⚅"[n - 1];

export function Die({
  value,
  size = "md",
  tone = "bone",
  title,
}: {
  value: number;
  size?: "sm" | "md";
  tone?: "bone" | "red" | "felt";
  title?: string;
}) {
  const cls = ["die", size === "sm" && "die--sm", tone !== "bone" && `die--${tone}`]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} role="img" aria-label={title ?? `die showing ${value}`}>
      <span className="pipset">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="pip"
            style={{ visibility: FACES[value].includes(i) ? "visible" : "hidden" }}
          />
        ))}
      </span>
    </span>
  );
}

export function DiceRow({
  values,
  tone = "bone",
  size = "md",
}: {
  values: number[];
  tone?: "bone" | "red" | "felt";
  size?: "sm" | "md";
}) {
  return (
    <>
      {values.map((v, i) => (
        <Die key={i} value={v} tone={tone} size={size} />
      ))}
    </>
  );
}

type Phase = "rolling" | "landed";

/* ------------------------------------------------------------------
   ShakeLoader — the café's loading state.
   A leather cup, three bone dice rattling inside, a number on the
   counter, then they land and the page is allowed to appear.
   ------------------------------------------------------------------ */

const READS = [
  "finding the box on the shelf",
  "checking the last four play-throughs",
  "counting loose meeples",
  "wiping the box lid",
  "asking the shelf if it's in stock",
  "finding the rulebook, always under something",
  "ruling out a game with a 90-minute average",
  "sharpening the pencil",
];

export function ShakeLoader({
  label = "Shaking the dice",
  minMs = 520,
  hold = 900,
  onDone,
  note,
}: {
  label?: string;
  minMs?: number;
  hold?: number;
  onDone?: () => void;
  note?: string;
}) {
  const [phase, setPhase] = useState<Phase>("rolling");
  const [faces, setFaces] = useState<number[]>(() => [3, 5, 1]);
  const [read, setRead] = useState(READS[0]);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();

    const spin = window.setInterval(() => {
      setFaces([1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5).slice(0, 3));
      setRead(READS[Math.floor(Math.random() * READS.length)]);
    }, reduce ? 400 : 110);

    const landAt = Math.max(minMs, 620);
    const land = window.setTimeout(() => {
      window.clearInterval(spin);
      setFaces([
        1 + Math.floor(Math.random() * 6),
        1 + Math.floor(Math.random() * 6),
        1 + Math.floor(Math.random() * 6),
      ]);
      setPhase("landed");
    }, landAt);

    const done = window.setTimeout(
      () => onDone?.(),
      Math.max(landAt + 240, landAt + hold),
    );

    timers.current = [spin, land, done];
    return () => {
      timers.current.forEach(window.clearTimeout);
      void t0;
    };
  }, [minMs, hold, onDone]);

  return (
    <div className="shake" data-state={phase} role="status" aria-live="polite">
      <div className="shake__cup">
        <div className="shake__dice">
          {faces.map((f, i) => (
            <Die key={i} value={f} />
          ))}
        </div>
      </div>
      <div className="shake__read">
        <p className="shake__title">{label}</p>
        <div className="shake__faces" aria-hidden="true">
          {faces.map((f, i) => (
            <span key={i}>{dieGlyph(f)}</span>
          ))}
        </div>
        <p className="shake__note">{note ?? read}</p>
      </div>
    </div>
  );
}
