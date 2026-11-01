import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { speak } from "../audio/voice";
import { Echo } from "../echo/Echo";
import "./kit.css";

/** A page set on the stage: spotlight, a title card, and the content below. */
export function Scene({ kicker, title, sub, children, tone = "stage" }) {
  return (
    <div className="scene" data-tone={tone}>
      <header className="scene__head">
        <div className="scene__spot" aria-hidden="true" />
        {kicker && (
          <p className="pill" data-enter>
            {kicker}
          </p>
        )}
        <h1 data-enter>{title}</h1>
        {sub && (
          <p className="scene__sub" data-enter>
            {sub}
          </p>
        )}
      </header>
      <div className="scene__body">{children}</div>
    </div>
  );
}

/** Echo with a speech bubble. Tapping 🔊 reads the line aloud in Echo's voice. */
export function EchoSays({
  children,
  glow = 0.6,
  mood = "happy",
  size = 150,
  speakText,
}) {
  return (
    <div className="echosays" data-enter>
      <Echo glow={glow} mood={mood} size={size} />
      <div className="bubble" role="status">
        <b>Echo</b>
        <span>{children}</span>
        {speakText !== false && (
          <button
            type="button"
            className="bubble__play"
            onClick={() =>
              speak(
                typeof speakText === "string" ? speakText : String(children),
              )
            }
            aria-label="Hear Echo say this"
          >
            🔊
          </button>
        )}
      </div>
    </div>
  );
}

/** "How many butterflies in your tummy?" — 1 (calm) to 5 (very nervous). */
export function ButterflyCheck({
  question = "How many butterflies are in your tummy right now?",
  onPick,
  value,
}) {
  return (
    <div className="butterflies" role="group" aria-label={question}>
      <p>{question}</p>
      <div>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={value === n}
            onClick={() => onPick(n)}
            aria-label={`${n} butterfl${n === 1 ? "y" : "ies"}`}
          >
            {"🦋".repeat(n)}
          </button>
        ))}
      </div>
      <small>Butterflies are normal — they mean you care!</small>
    </div>
  );
}

/** A big friendly countdown timer. */
export function Timer({ seconds, running, onDone, label = "Time left" }) {
  const [left, setLeft] = useState(seconds);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });
  useEffect(() => {
    setLeft(seconds);
  }, [seconds]);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          clearInterval(t);
          done.current?.();
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running]);
  const pct = (left / seconds) * 100;
  return (
    <div
      className="timer"
      role="timer"
      aria-label={`${label}: ${left} seconds`}
      data-low={left <= 10 || undefined}
    >
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle
          cx="22"
          cy="22"
          r="19"
          fill="none"
          stroke="#ecd9b9"
          strokeWidth="5"
        />
        <circle
          cx="22"
          cy="22"
          r="19"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray={`${(pct * 119.4) / 100} 119.4`}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
        />
      </svg>
      <b>
        {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
      </b>
    </div>
  );
}

/** A burst of confetti from an element (or the screen centre). */
export function confetti(from) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const r = from?.getBoundingClientRect?.() ?? {
    left: innerWidth / 2,
    top: innerHeight / 2,
    width: 0,
    height: 0,
  };
  const colors = [
    "#ffc35c",
    "#d6457a",
    "#3a8bd6",
    "#2fae7e",
    "#a4202f",
    "#fff",
  ];
  for (let i = 0; i < 46; i++) {
    const p = document.createElement("i");
    p.className = "confetti";
    p.style.background = colors[i % colors.length];
    p.style.left = `${r.left + r.width / 2}px`;
    p.style.top = `${r.top + r.height / 2}px`;
    document.body.appendChild(p);
    gsap.to(p, {
      x: (Math.random() - 0.5) * 520,
      y: -(120 + Math.random() * 260),
      rotate: Math.random() * 720,
      duration: 0.9,
      ease: "power2.out",
      onComplete: () =>
        gsap.to(p, {
          y: "+=420",
          autoAlpha: 0,
          duration: 1.2,
          ease: "power1.in",
          onComplete: () => p.remove(),
        }),
    });
  }
}

/** The friendly mic switch: asks once, explains why, and offers a no-mic way. */
export function MicSwitch({ mic, label = "Turn on the microphone" }) {
  return (
    <div className="micswitch">
      {!mic.on ? (
        <button
          type="button"
          className="btn btn--gold"
          onClick={mic.start}
          disabled={mic.busy}
        >
          🎤 {mic.busy ? "Listening to the room…" : label}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn--ghost btn--small"
          onClick={mic.stop}
        >
          ⏹ Stop listening
        </button>
      )}
      <small>
        Echo only listens to how loud your voice is. Nothing is recorded.
      </small>
      {mic.error && (
        <p className="micswitch__err" role="alert">
          {mic.error}
        </p>
      )}
    </div>
  );
}
