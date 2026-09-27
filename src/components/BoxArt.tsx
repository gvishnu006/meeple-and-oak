import type { Game, Motif } from "../data/games";

/* ------------------------------------------------------------------
   BoxArt — every box gets its cover drawn from its own palette.
   No photographs: flat screen-printed shapes, the way a good cover
   should be, plus the real title set on the lid.
   ------------------------------------------------------------------ */

const S = { base: "var(--a-base)", deep: "var(--a-deep)", pop: "var(--a-pop)", bone: "var(--a-bone)" };

function Meeple({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <circle cx="0" cy="-19" r="6.4" />
      <path d="M-8 -12 h16 a3 3 0 0 1 3 3.6 l-1.6 7.2 h-4.2 l-1.4 -4.4 v6.4 h4 v3.2 h-12.8 v-3.2 h4 v-6.4 l-1.4 4.4 h-4.2 l-1.6 -7.2 a3 3 0 0 1 3 -3.6 z" />
      <rect x="-4.6" y="4.2" width="3.6" height="6.2" rx="1.4" />
      <rect x="1" y="4.2" width="3.6" height="6.2" rx="1.4" />
    </g>
  );
}

function Motif({ kind }: { kind: Motif }) {
  switch (kind) {
    case "sunburst":
      return (
        <g>
          {Array.from({ length: 15 }, (_, i) => (
            <path
              key={i}
              d={`M50 128 L${50 + (i - 7) * 13} 10 L${50 + (i - 7) * 15.4} 10 Z`}
              fill={i % 2 ? S.pop : S.deep}
              opacity={i % 2 ? 0.55 : 0.3}
            />
          ))}
          <circle cx="50" cy="62" r="27" fill={S.pop} />
          <path d="M20 92 q10 -14 18 0 t18 0 t18 0" stroke={S.bone} strokeWidth="1.6" fill="none" opacity=".7" />
          <g fill={S.deep}>
            <circle cx="43" cy="56" r="3.4" />
            <circle cx="57" cy="56" r="3.4" />
          </g>
          <path d="M42 70 q8 6 16 0" stroke={S.deep} strokeWidth="2" fill="none" />
        </g>
      );
    case "grid":
      return (
        <g>
          {Array.from({ length: 5 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => {
              const hot = (r * 3 + c * 5) % 7 === 0;
              const soft = (r + c) % 3 === 0;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={9 + c * 21}
                  y={16 + r * 20}
                  width="18"
                  height="17"
                  rx="1.5"
                  fill={hot ? S.pop : soft ? S.bone : S.deep}
                  opacity={hot ? 1 : soft ? 0.3 : 0.55}
                />
              );
            }),
          )}
          <circle cx="50" cy="54" r="20" fill={S.base} stroke={S.bone} strokeWidth="1.4" opacity=".9" />
        </g>
      );
    case "route":
      return (
        <g>
          <path
            d="M8 104 C 24 78, 18 60, 40 52 S 74 44, 70 22 S 92 14, 94 12"
            stroke={S.bone}
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
            opacity=".8"
          />
          {[
            [8, 104],
            [40, 52],
            [70, 22],
            [94, 12],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.4" fill={i === 3 ? S.pop : S.bone} />
          ))}
          <path d="M14 118 h74 l-9 -16 h-56 z" fill={S.deep} />
          <rect x="34" y="88" width="20" height="13" rx="2.4" fill={S.pop} />
          <path d="M40 88 l4 -6 h8 l4 6 z" fill={S.bone} />
        </g>
      );
    case "meeples":
      return (
        <g>
          <path d="M50 8 L88 40 v56 H12 V40 Z" fill={S.deep} opacity=".55" />
          <rect x="10" y="96" width="80" height="6" rx="2" fill={S.bone} opacity=".55" />
          <Meeple x={30} y={78} s={0.82} fill={S.bone} />
          <Meeple x={50} y={74} s={1} fill={S.pop} />
          <Meeple x={70} y={78} s={0.82} fill={S.bone} />
          <circle cx="50" cy="30" r="9" fill={S.pop} opacity=".9" />
        </g>
      );
    case "tower":
      return (
        <g>
          <path d="M50 14 L84 34 H16 Z" fill={S.pop} />
          <rect x="20" y="34" width="60" height="16" fill={S.bone} opacity=".9" />
          <rect x="26" y="50" width="48" height="15" fill={S.bone} opacity=".7" />
          <rect x="32" y="65" width="36" height="14" fill={S.bone} opacity=".5" />
          <rect x="38" y="79" width="24" height="13" fill={S.bone} opacity=".34" />
          <rect x="45" y="92" width="10" height="12" fill={S.deep} />
          {[20, 30, 40, 50, 60, 70, 80].map((x) => (
            <rect key={x} x={x - 3} y="30" width="6" height="6" fill={S.deep} opacity=".5" />
          ))}
        </g>
      );
    case "waves":
      return (
        <g>
          <circle cx="66" cy="38" r="15" fill={S.pop} />
          {[46, 60, 74, 88].map((y, i) => (
            <path
              key={y}
              d={`M-4 ${y} q 14 ${i % 2 ? 8 : -8} 28 0 t 28 0 t 28 0 t 28 0 V140 H-4 Z`}
              fill={i % 2 ? S.bone : S.deep}
              opacity={0.24 + i * 0.16}
            />
          ))}
          <path d="M18 44 q10 -18 20 0" stroke={S.bone} strokeWidth="1.5" fill="none" opacity=".6" />
        </g>
      );
    case "orbit":
      return (
        <g>
          <circle cx="50" cy="58" r="24" fill={S.pop} />
          <ellipse cx="50" cy="58" rx="44" ry="14" fill="none" stroke={S.bone} strokeWidth="1.5" opacity=".65" transform="rotate(-18 50 58)" />
          <ellipse cx="50" cy="58" rx="40" ry="11" fill="none" stroke={S.bone} strokeWidth="1" opacity=".4" transform="rotate(22 50 58)" />
          <circle cx="18" cy="38" r="4.4" fill={S.bone} />
          <circle cx="86" cy="76" r="3" fill={S.bone} opacity=".8" />
          <circle cx="50" cy="34" r="1.7" fill={S.deep} opacity=".5" />
          <path d="M26 60 q24 14 48 -4" stroke={S.deep} strokeWidth="1.4" fill="none" opacity=".5" />
        </g>
      );
    case "stack":
      return (
        <g>
          {[
            [50, 26, 62, 12],
            [50, 42, 52, 11],
            [50, 57, 42, 10],
            [50, 70, 32, 9],
            [50, 82, 22, 8],
          ].map(([cx, cy, w, h], i) => (
            <g key={i}>
              <rect x={Number(cx) - Number(w) / 2} y={Number(cy)} width={Number(w)} height={Number(h)} rx="1.6" fill={i === 0 ? S.pop : S.bone} opacity={i === 0 ? 1 : 0.72 - i * 0.09} />
              <rect x={Number(cx) - Number(w) / 2} y={Number(cy) + Number(h) - 2.4} width={Number(w)} height="2.4" fill={S.deep} opacity=".5" />
            </g>
          ))}
          <rect x="6" y="94" width="88" height="5" rx="2" fill={S.deep} opacity=".45" />
        </g>
      );
    case "map":
      return (
        <g>
          <path
            d="M28 30 q22 -14 40 -2 t6 34 q-6 22 -26 22 t-28 -18 q-6 -22 8 -36 z"
            fill={S.bone}
            opacity=".82"
          />
          <path d="M34 46 q14 -8 28 2" stroke={S.deep} strokeWidth="1.3" fill="none" opacity=".45" />
          <path
            d="M10 108 C 26 92, 74 96, 92 74"
            stroke={S.pop}
            strokeWidth="2"
            strokeDasharray="3 3.4"
            fill="none"
          />
          <g transform="translate(84 62)">
            <circle r="9" fill={S.deep} />
            <path d="M0 -12 L2.6 -2 L0 0 L-2.6 -2 Z" fill={S.pop} />
            <path d="M0 12 L2.6 2 L0 0 L-2.6 2 Z" fill={S.bone} />
          </g>
        </g>
      );
    case "tiles":
      return (
        <g>
          {Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 5 }, (_, c) => {
              const x = 12 + c * 19 + (r % 2 ? 9.5 : 0);
              const y = 20 + r * 17;
              const hot = (r * 2 + c) % 5 === 0;
              return (
                <path
                  key={`${r}-${c}`}
                  d={`M${x} ${y - 8} l8.5 4.8 v9.6 l-8.5 4.8 l-8.5 -4.8 v-9.6 z`}
                  fill={hot ? S.pop : S.deep}
                  opacity={hot ? 0.95 : 0.4 + ((r + c) % 3) * 0.14}
                />
              );
            }),
          )}
          <circle cx="50" cy="54" r="13" fill={S.bone} opacity=".9" />
          <circle cx="50" cy="54" r="5" fill={S.pop} />
        </g>
      );
  }
}

export function BoxArt({ game, showTitle = true }: { game: Game; showTitle?: boolean }) {
  const { art } = game;
  return (
    <div
      className="box__art"
      style={
        {
          "--a-base": art.base,
          "--a-deep": art.deep,
          "--a-pop": art.pop,
          "--a-bone": art.bone,
          background: `linear-gradient(158deg, ${art.base} 0%, ${art.deep} 108%)`,
        } as React.CSSProperties
      }
    >
      <svg viewBox="0 0 100 133" role="img" aria-label={`Cover of ${game.title}`} preserveAspectRatio="xMidYMid slice">
        <Motif kind={game.motif} />
        {showTitle && (
          <>
            <rect x="0" y="103" width="100" height="30" fill={art.deep} opacity=".9" />
            <text
              x="50"
              y="117"
              textAnchor="middle"
              fill={art.bone}
              style={{
                font: '600 11px Fraunces, Georgia, serif',
                letterSpacing: "-0.3px",
              }}
            >
              {game.title.length > 17 ? `${game.title.slice(0, 16)}…` : game.title}
            </text>
            <text
              x="50"
              y="126"
              textAnchor="middle"
              fill={art.bone}
              opacity=".62"
              style={{ font: '500 5.4px Archivo, sans-serif', letterSpacing: "0.9px" }}
            >
              {game.designer.split(",")[0].toUpperCase()}
            </text>
          </>
        )}
      </svg>
      {game.copies === 1 && <span className="box__wear" aria-hidden="true" />}
    </div>
  );
}
