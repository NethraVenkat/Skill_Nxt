import "./echo.css";

/**
 * Echo the Mic, Postmaster of the Talking Post: a vintage microphone in a postal cap who glows. `glow` (0..1) is the heart of the character:
 * dim when the room is quiet, bright gold when children speak naturally. `mood` changes the face:
 * idle, listen, talk, happy, cheer, think, oops, sleepy. Drawn in code, so it is crisp at any size
 * and reacts live.
 */
export function Echo({
  glow = 0.3,
  mood = "idle",
  size = 220,
  className = "",
  label = "Echo the microphone",
  cap = true,
}) {
  const g = Math.max(0, Math.min(1, glow));
  // the grille warms from cool grey-brass to bright gold as the glow rises
  const warm = `hsl(${32 + g * 10} ${55 + g * 40}% ${48 + g * 20}%)`;
  const eyesClosed = mood === "sleepy";
  const happy = mood === "happy" || mood === "cheer";
  return (
    <figure
      className={`echo ${className}`}
      data-mood={mood}
      style={{ "--g": g, "--s": `${size}px` }}
      role="img"
      aria-label={`${label}, ${mood}`}
    >
      <span className="echo__halo" aria-hidden="true" />
      <svg
        viewBox="0 -12 200 312"
        width={size}
        height={size * 1.5}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="echo-chrome" x1="0" x2="1">
            <stop offset="0" stopColor="#9a7448" />
            <stop offset="0.35" stopColor="#f3d9a8" />
            <stop offset="0.6" stopColor="#c69a5b" />
            <stop offset="1" stopColor="#6e4c27" />
          </linearGradient>
          <radialGradient id="echo-grille" cx="0.4" cy="0.35" r="0.75">
            <stop
              offset="0"
              stopColor="#fff6dc"
              stopOpacity={0.35 + g * 0.65}
            />
            <stop offset="0.55" stopColor={warm} />
            <stop offset="1" stopColor="#6b4520" />
          </radialGradient>
          <clipPath id="echo-head">
            <rect x="38" y="20" width="124" height="150" rx="62" />
          </clipPath>
        </defs>
        {/* stand */}
        <rect
          x="92"
          y="196"
          width="16"
          height="70"
          rx="5"
          fill="url(#echo-chrome)"
        />
        <ellipse cx="100" cy="280" rx="62" ry="14" fill="#3b2412" />
        <ellipse cx="100" cy="274" rx="62" ry="14" fill="url(#echo-chrome)" />
        {/* yoke */}
        <path
          d="M30 96 Q30 196 100 196 Q170 196 170 96"
          fill="none"
          stroke="url(#echo-chrome)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="30" cy="96" r="9" fill="#6e4c27" />
        <circle cx="170" cy="96" r="9" fill="#6e4c27" />
        {/* head */}
        <g className="echo__head">
          <rect
            x="38"
            y="20"
            width="124"
            height="150"
            rx="62"
            fill="url(#echo-grille)"
          />
          <g
            clipPath="url(#echo-head)"
            stroke="#5a3a1a"
            strokeOpacity="0.28"
            strokeWidth="2"
          >
            {Array.from({ length: 15 }, (_, i) => (
              <line
                key={i}
                x1="30"
                x2="170"
                y1={28 + i * 10}
                y2={28 + i * 10}
              />
            ))}
          </g>
          <rect
            x="38"
            y="20"
            width="124"
            height="150"
            rx="62"
            fill="none"
            stroke="url(#echo-chrome)"
            strokeWidth="8"
          />
          <rect
            x="34"
            y="88"
            width="132"
            height="18"
            rx="6"
            fill="url(#echo-chrome)"
          />
          {cap && (
            <g className="echo__cap">
              <path d="M44 40 Q52 -6 100 -6 Q148 -6 156 40 Z" fill="#22305a" />
              <rect x="46" y="28" width="108" height="12" fill="#c8372d" />
              <path d="M30 42 Q100 26 170 42 Q172 52 160 52 Q100 42 40 52 Q28 52 30 42 Z" fill="#141d3a" />
              <rect x="88" y="6" width="24" height="17" rx="3" fill="#f2b632" />
              <path d="M88 7 l12 9 l12 -9" fill="none" stroke="#22305a" strokeWidth="2.5" />
            </g>
          )}
          {/* face */}
          <g className="echo__face">
            {eyesClosed ? (
              <>
                <path
                  d="M68 66 q10 8 20 0"
                  stroke="#2b1a0c"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M112 66 q10 8 20 0"
                  stroke="#2b1a0c"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </>
            ) : happy ? (
              <>
                <path
                  d="M66 70 q12 -14 24 0"
                  stroke="#2b1a0c"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M110 70 q12 -14 24 0"
                  stroke="#2b1a0c"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <g className="echo__eyes">
                <ellipse
                  cx="78"
                  cy="64"
                  rx="10"
                  ry={mood === "oops" ? 12 : 11}
                  fill="#2b1a0c"
                />
                <ellipse
                  cx="122"
                  cy="64"
                  rx="10"
                  ry={mood === "oops" ? 12 : 11}
                  fill="#2b1a0c"
                />
                <circle cx="81" cy="60" r="3.5" fill="#fff" />
                <circle cx="125" cy="60" r="3.5" fill="#fff" />
              </g>
            )}
            {mood === "think" && (
              <path
                d="M68 46 l20 4 M112 50 l20 -4"
                stroke="#2b1a0c"
                strokeWidth="4"
                strokeLinecap="round"
              />
            )}
            <ellipse
              cx="62"
              cy="82"
              rx="9"
              ry="5"
              fill="#ff8f6b"
              opacity={0.25 + g * 0.45}
            />
            <ellipse
              cx="138"
              cy="82"
              rx="9"
              ry="5"
              fill="#ff8f6b"
              opacity={0.25 + g * 0.45}
            />
            {mood === "oops" ? (
              <ellipse cx="100" cy="82" rx="7" ry="8" fill="#2b1a0c" />
            ) : mood === "talk" || mood === "cheer" ? (
              <path
                className="echo__mouth--talk"
                d="M86 76 Q100 96 114 76 Z"
                fill="#2b1a0c"
              />
            ) : mood === "think" || mood === "sleepy" ? (
              <path
                d="M90 82 h20"
                stroke="#2b1a0c"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M84 77 Q100 92 116 77"
                stroke="#2b1a0c"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            )}
          </g>
        </g>
      </svg>
      {mood === "listen" && (
        <span className="echo__waves" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
    </figure>
  );
}

/** A glow bar that shows how bright Echo is (used beside the live mic). */
export function GlowMeter({ value, label = "Echo’s glow" }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div
      className="glowmeter"
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}
