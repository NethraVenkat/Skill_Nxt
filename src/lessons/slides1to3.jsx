import { useEffect, useState } from "react";
import { useMic } from "../audio/useMic";
import { speak } from "../audio/voice";
import { Echo, GlowMeter } from "../echo/Echo";
import { useStore } from "../state/store";
import { EchoSays, MicSwitch, confetti } from "../ui/kit";
import { LessonFrame } from "./LessonFrame";

/* ---------- Slide 1 · Echo Arrives ---------- */
export function S1() {
  const mic = useMic();
  const { lessonDone } = useStore();
  const [glow, setGlow] = useState(0.08);
  const [spokenMs, setSpokenMs] = useState(0);
  const [hands, setHands] = useState(0);
  const awake = spokenMs > 1500;

  useEffect(() => {
    if (!mic.on) return;
    setGlow((g) => Math.max(g, 0.08 + Math.min(0.92, mic.stats.talkMs / 4000)));
    setSpokenMs(mic.stats.talkMs);
  }, [mic.on, mic.stats]);

  useEffect(() => {
    if (!awake) return;
    lessonDone(1);
    confetti();
  }, [awake, lessonDone]);

  return (
    <LessonFrame
      n={1}
      objective="Spark curiosity and want to sound expressive and natural."
    >
      <div className="arrive">
        <div className="robot-card" data-enter>
          <p className="big">“Ever read out loud and sounded like a robot?”</p>
          <div className="robot">
            <span aria-hidden="true">🤖</span>
            <p>Beep boop. The. Cat. Sat. On. The. Mat.</p>
          </div>
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={() => speak("Beep boop. The cat sat on the mat.", "robot")}
          >
            🔊 Hear the robot
          </button>
        </div>
        <div className="arrive__echo" data-enter>
          <Echo
            glow={glow}
            mood={
              mic.on && mic.stats.speaking
                ? "listen"
                : awake
                  ? "cheer"
                  : glow < 0.2
                    ? "sleepy"
                    : "happy"
            }
            size={210}
          />
          <GlowMeter value={glow} />
        </div>
      </div>
      <EchoSays glow={glow} mood={awake ? "cheer" : "happy"}>
        {awake
          ? "You woke me up! Let’s make you sound like YOU — not a robot!"
          : "I’m Echo! I’m a little sleepy… say “Hello Echo!” and watch me glow."}
      </EchoSays>
      <div className="card row" data-enter>
        <MicSwitch mic={mic} label="Say hello to Echo" />
        {!mic.on && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => (setGlow(0.9), setSpokenMs(2000))}
          >
            No mic? Tap to wake Echo 👋
          </button>
        )}
      </div>
      <div className="card poll" data-enter>
        <p className="big">
          Hands up if reading aloud sometimes sounds robotic! ✋
        </p>
        <div className="row">
          <button
            type="button"
            className="btn btn--red"
            onClick={() => setHands((h) => h + 1)}
          >
            ✋ Hand up
          </button>
          <span className="poll__count" aria-live="polite">
            {hands} {hands === 1 ? "hand" : "hands"} up
          </span>
        </div>
      </div>
    </LessonFrame>
  );
}

/* ---------- Slide 2 · What Are We Doing Today? ---------- */
const PLAN = [
  ["👀", "See the difference between reading and talking"],
  ["✏️", "Turn a paragraph into 3 short notes"],
  ["🎤", "Practise talking from our notes"],
  ["⭐", "Show a partner!"],
];
export function S2() {
  const [lit, setLit] = useState(0);
  const { lessonDone } = useStore();
  useEffect(() => {
    if (lit >= PLAN.length) return;
    const t = setTimeout(() => setLit((l) => l + 1), 700);
    return () => clearTimeout(t);
  }, [lit]);
  useEffect(() => {
    if (lit === PLAN.length) {
      lessonDone(2);
    }
  }, [lit, lessonDone]);
  return (
    <LessonFrame
      n={2}
      objective="Know the plan, so nothing feels scary or surprising."
    >
      <p className="big" data-enter>
        Today’s 4-Step Plan
      </p>
      <ol className="plan">
        {PLAN.map(([icon, text], i) => (
          <li key={text} data-on={i < lit || undefined}>
            <span className="plan__light" aria-hidden="true" />
            <span className="plan__n">{i + 1}</span>
            <span className="plan__icon" aria-hidden="true">
              {icon}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
      <EchoSays mood={lit === PLAN.length ? "cheer" : "happy"}>
        Four things. Simple. By the end — you’ll be talking from memory, not
        reading from paper. Ready? 👍
      </EchoSays>
    </LessonFrame>
  );
}

/* ---------- Slide 3 · Reading vs Talking ---------- */
const A = "The dog is a popular pet animal. It is loyal and friendly.";
const B = "So — dogs! Super popular pets, right? They’re loyal, friendly…";
const SORT = [
  { t: "The. Sun. Is. Hot.", robot: true },
  { t: "Guess what? The sun is super hot!", robot: false },
  { t: "Rain falls from clouds. It is water.", robot: true },
  { t: "You know rain? It falls right out of the clouds!", robot: false },
  { t: "Cats are animals. They have fur.", robot: true },
  { t: "Cats are so soft — all that fluffy fur!", robot: false },
];
export function S3() {
  const [heard, setHeard] = useState(null);
  const [vote, setVote] = useState(null);
  const [sorted, setSorted] = useState({});
  const [wrong, setWrong] = useState(null);
  const { lessonDone } = useStore();
  const allSorted = Object.keys(sorted).length === SORT.length;
  useEffect(() => {
    if (allSorted && vote === "B") {
      lessonDone(3);
    }
  }, [allSorted, vote, lessonDone]);
  const put = (i, robot) => {
    if (SORT[i].robot !== robot) {
      setWrong(i);
      setTimeout(() => setWrong(null), 600);
      return;
    }
    setSorted((s) => ({ ...s, [i]: robot }));
  };
  return (
    <LessonFrame
      n={3}
      objective="Feel and recognise the difference between reading and talking."
    >
      <p className="big" data-enter>
        Which sounds better?
      </p>
      <div className="two">
        <div
          className="versus versus--a"
          data-heard={heard === "A" || undefined}
        >
          <span className="versus__tag">Version A · Reading</span>
          <p>“{A}”</p>
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={() => (setHeard("A"), speak(A, "robot"))}
          >
            🔊 Listen
          </button>
        </div>
        <div
          className="versus versus--b"
          data-heard={heard === "B" || undefined}
        >
          <span className="versus__tag">Version B · Talking</span>
          <p>“{B}”</p>
          <button
            type="button"
            className="btn btn--gold btn--small"
            onClick={() => (setHeard("B"), speak(B, "friend"))}
          >
            🔊 Listen
          </button>
        </div>
      </div>
      <EchoSays
        glow={heard === "A" ? 0.15 : heard === "B" ? 1 : 0.5}
        mood={heard === "A" ? "sleepy" : heard === "B" ? "cheer" : "happy"}
      >
        One sounds like a textbook, one sounds like a friend!
      </EchoSays>
      <div className="card" data-enter>
        <p className="big">Hands up for the one you enjoyed more!</p>
        <div className="row" style={{ marginTop: 12 }}>
          <button
            type="button"
            className="btn btn--ghost"
            aria-pressed={vote === "A"}
            onClick={() => setVote("A")}
          >
            ✋ Version A
          </button>
          <button
            type="button"
            className="btn btn--gold"
            aria-pressed={vote === "B"}
            onClick={() => setVote("B")}
          >
            ✋ Version B
          </button>
        </div>
        {vote && (
          <p className="done-line" style={{ marginTop: 12 }}>
            {vote === "B"
              ? "Yes! B sounds like a real person talking to you."
              : "Listen again — which one sounds like a friend?"}
          </p>
        )}
      </div>
      <div className="card" data-enter>
        <p className="big">Game: Robot or Friend? 🤖 / 😊</p>
        <p className="muted">Sort each sentence into the right box.</p>
        <ul className="sort">
          {SORT.map((x, i) =>
            i in sorted ? null : (
              <li key={i} className={wrong === i ? "shake" : ""}>
                <span>“{x.t}”</span>
                <span className="row">
                  <button
                    type="button"
                    className="btn btn--ghost btn--small"
                    onClick={() => put(i, true)}
                  >
                    🤖 Robot
                  </button>
                  <button
                    type="button"
                    className="btn btn--mint btn--small"
                    onClick={() => put(i, false)}
                  >
                    😊 Friend
                  </button>
                </span>
              </li>
            ),
          )}
        </ul>
        <div className="two" style={{ marginTop: 16 }}>
          {[true, false].map((robot) => (
            <div
              key={String(robot)}
              className="sortbox"
              data-robot={robot || undefined}
            >
              <b>{robot ? "🤖 Robot box" : "😊 Friend box"}</b>
              {SORT.map((x, i) =>
                sorted[i] === robot ? <span key={i}>{x.t}</span> : null,
              )}
            </div>
          ))}
        </div>
        {allSorted && (
          <p className="done-line">
            All sorted! Friend voices are warm and alive. ✨
          </p>
        )}
      </div>
    </LessonFrame>
  );
}
