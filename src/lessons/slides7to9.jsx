import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useMic } from "../audio/useMic";
import { Echo, GlowMeter } from "../echo/Echo";
import { useStore } from "../state/store";
import {
  ButterflyCheck,
  EchoSays,
  MicSwitch,
  Timer,
  confetti,
} from "../ui/kit";
import { LessonFrame } from "./LessonFrame";
import { NoteCard } from "./slides4to6";

const DEFAULT_NOTES = [
  "Amazing smell",
  "Smell what humans can’t",
  "Police use dogs",
];
const useNotes = () => {
  const { myNotes } = useStore();
  return myNotes?.every((n) => n.trim()) ? myNotes : DEFAULT_NOTES;
};

/* ---------- Slide 7 · Talk to Your Partner ---------- */
export function S7() {
  const notes = useNotes();
  const mic = useMic();
  const [round, setRound] = useState(0); // 0 ready, 1 you speak, 2 switch, 3 done
  const [running, setRunning] = useState(false);
  const [fb, setFb] = useState({});
  const { lessonDone } = useStore();
  const finished = round === 3;
  useEffect(() => {
    if (!finished) return;
    lessonDone(7);
  }, [finished, fb, lessonDone]);
  const startRound = (r) => {
    setRound(r);
    setRunning(true);
  };
  const glow = mic.on ? 0.2 + mic.stats.level * 0.8 : running ? 0.6 : 0.3;
  return (
    <LessonFrame
      n={7}
      objective="Glance at your notes — then look UP and talk like a friend."
    >
      <div className="partner" data-enter>
        <div className="partner__notes">
          <p className="muted">Your 3 notes</p>
          {notes.map((n, i) => (
            <NoteCard key={i} i={i} on>
              {n}
            </NoteCard>
          ))}
        </div>
        <div className="partner__stage">
          <div className="faces" aria-hidden="true">
            <span className={round === 1 ? "speaking" : ""}>🧒</span>
            <span className="faces__eyes">👀 ↔ 👀</span>
            <span className={round === 2 ? "speaking" : ""}>👧</span>
          </div>
          <p className="eyesup" data-on={running || undefined}>
            Eyes UP! Talk to your partner, not your paper!
          </p>
          <Echo
            glow={glow}
            mood={mic.on && mic.stats.speaking ? "listen" : "happy"}
            size={120}
          />
          <GlowMeter value={glow} />
        </div>
      </div>
      <div className="card" data-enter>
        {round === 0 && (
          <>
            <p className="big">
              Round 1 (1 min): You speak first! Glance at notes → look UP → talk
              about dogs.
            </p>
            <div className="row" style={{ marginTop: 14 }}>
              <button
                type="button"
                className="btn btn--gold"
                onClick={() => startRound(1)}
              >
                ▶ Start Round 1
              </button>
              <MicSwitch mic={mic} label="Let Echo hear (optional)" />
            </div>
          </>
        )}
        {(round === 1 || round === 2) && (
          <div className="row" style={{ justifyContent: "space-between" }}>
            <p className="big">
              {round === 1
                ? "Round 1 · You are speaking"
                : "Round 2 · Switch! Your partner speaks, you listen"}
            </p>
            <Timer
              key={round}
              seconds={60}
              running={running}
              onDone={() => setRunning(false)}
            />
            <button
              type="button"
              className="btn btn--ghost btn--small"
              onClick={() => setRunning(false)}
            >
              Finished early
            </button>
          </div>
        )}
        {(round === 1 || round === 2) && !running && (
          <div className="feedback">
            <p className="big">
              {round === 1
                ? "Partner check: "
                : "Your check for your partner: "}
              did it sound like talking or reading?
            </p>
            <div className="row">
              <button
                type="button"
                className="btn btn--mint"
                aria-pressed={fb[round]?.talk === "talking"}
                onClick={() =>
                  setFb((f) => ({
                    ...f,
                    [round]: { ...f[round], talk: "talking" },
                  }))
                }
              >
                😊 Talking
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                aria-pressed={fb[round]?.talk === "reading"}
                onClick={() =>
                  setFb((f) => ({
                    ...f,
                    [round]: { ...f[round], talk: "reading" },
                  }))
                }
              >
                🤖 Reading
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                aria-pressed={!!fb[round]?.eyes}
                onClick={() =>
                  setFb((f) => ({
                    ...f,
                    [round]: { ...f[round], eyes: !f[round]?.eyes },
                  }))
                }
              >
                👀 Looked up!
              </button>
            </div>
            {fb[round]?.talk && (
              <button
                type="button"
                className="btn btn--gold"
                onClick={() => (round === 1 ? startRound(2) : setRound(3))}
              >
                {round === 1 ? "🔄 Switch! Start Round 2" : "✓ Finish"}
              </button>
            )}
          </div>
        )}
        {finished && (
          <p className="done-line">
            Both rounds done! You spoke AND you listened — that’s real
            communication. 🤝
          </p>
        )}
        {finished && (
          <div className="row">
            <Link to="/deliver?parcel=mine&kind=friend" className="btn btn--gold">
              ✍️ Partner: sign their delivery slip
            </Link>
            <span className="muted">Your partner was your first real receiver!</span>
          </div>
        )}
      </div>
    </LessonFrame>
  );
}

/* ---------- Slide 8 · Star Speakers! ---------- */
const CLAPS = [
  { n: 1, text: "Great trying!" },
  { n: 2, text: "Sounded super natural!" },
  { n: 3, text: "Amazing eye contact too!" },
];
export function S8() {
  const notes = useNotes();
  const [phase, setPhase] = useState("ready"); // ready, butterflies, speaking, clap, done
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [claps, setClaps] = useState(0);
  const windowEnd = useRef(0);
  const stage = useRef(null);
  const mic = useMic({
    onClap: () => {
      if (phase === "clap" && performance.now() < windowEnd.current)
        setClaps((c) => Math.min(3, c + 1));
    },
  });
  const { butterfly, lessonDone } = useStore();
  const startClaps = () => {
    setClaps(0);
    setPhase("clap");
    windowEnd.current = performance.now() + 4000;
  };
  const finish = (n) => {
    setClaps(n);
    setPhase("done");
    lessonDone(8);
    confetti(stage.current);
  };
  useEffect(() => {
    if (phase !== "clap") return;
    const t = setTimeout(() => finish(Math.max(1, claps)), 4200);
    return () => clearTimeout(t);
    // the clap window closes once, after 4 seconds
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);
  return (
    <LessonFrame
      n={8}
      objective="Speak to an audience with confidence — and be cheered for trying."
    >
      <div className="spotlight" ref={stage} data-enter data-phase={phase}>
        <div className="spotlight__beam" aria-hidden="true" />
        <p className="spotlight__title">
          ⭐ 2 Brave Volunteers — Come to the Front! ⭐
        </p>
        <p className="spotlight__sub">
          Same paragraph. Same notes. Talk to the whole class!
        </p>
        <div className="notes notes--row notes--stage">
          {notes.map((n, i) => (
            <NoteCard key={i} i={i} on>
              {n}
            </NoteCard>
          ))}
        </div>
        {phase === "done" && (
          <p className="spotlight__result">
            {"👏".repeat(claps)} {CLAPS[claps - 1].text}
          </p>
        )}
      </div>
      <div className="card" data-enter>
        {phase === "ready" && (
          <button
            type="button"
            className="btn btn--red"
            onClick={() => setPhase("butterflies")}
          >
            🙋 I’m brave — I’ll go!
          </button>
        )}
        {phase === "butterflies" && (
          <>
            <ButterflyCheck
              value={before}
              onPick={(n) => (
                setBefore(n),
                butterfly("before", n, "Star Speakers")
              )}
            />
            {before && (
              <div className="row" style={{ marginTop: 14 }}>
                <p>
                  Take one big balloon breath… 🎈 Now step into the spotlight!
                </p>
                <button
                  type="button"
                  className="btn btn--gold"
                  onClick={() => setPhase("speaking")}
                >
                  🎤 I’m on stage
                </button>
              </div>
            )}
          </>
        )}
        {phase === "speaking" && (
          <div className="row">
            <p className="big">
              Talk to us — not to your paper! Glance… look UP… talk!
            </p>
            <button
              type="button"
              className="btn btn--gold"
              onClick={startClaps}
            >
              ✓ I finished — audience, clap!
            </button>
          </div>
        )}
        {phase === "clap" && (
          <div>
            <p className="big">
              Audience Clap Meter 👏 One clap, two claps, or three?
            </p>
            <ul className="claplist">
              {CLAPS.map((c) => (
                <li key={c.n} data-on={claps >= c.n || undefined}>
                  {"👏".repeat(c.n)} = {c.text}
                </li>
              ))}
            </ul>
            <div className="row">
              <MicSwitch mic={mic} label="Let Echo count the claps" />
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  className="btn btn--ghost btn--small"
                  onClick={() => finish(n)}
                >
                  {"👏".repeat(n)}
                </button>
              ))}
            </div>
          </div>
        )}
        {phase === "done" && (
          <>
            <p className="done-line">
              You were BRAVE! Every attempt gets claps on Echo’s stage.
            </p>
            <ButterflyCheck
              question="And now — how many butterflies?"
              value={after}
              onPick={(n) => (
                setAfter(n),
                butterfly("after", n, "Star Speakers")
              )}
            />
            {after && before && after < before && (
              <p className="done-line">Your butterflies flew away! 🦋 → ✨</p>
            )}
          </>
        )}
      </div>
      <EchoSays mood={phase === "done" ? "cheer" : "happy"}>
        {phase === "done"
          ? "Wow! You made me glow so bright!"
          : "I’ll step aside — the spotlight is yours!"}
      </EchoSays>
    </LessonFrame>
  );
}

/* ---------- Slide 9 · Recap with Echo ---------- */
const TAKEAWAYS = [
  ["🤖", "Robotic!", "Reading word-for-word = sounds robotic"],
  ["✏️", "Notes!", "Turn paragraphs into 3 short notes"],
  ["👀", "Look up!", "Glance at notes — then look UP"],
  ["🎤", "Natural!", "Talk naturally — like talking to a friend!"],
];
export function S9() {
  const [shown, setShown] = useState(0);
  const [ans, setAns] = useState(null);
  const { lessonDone } = useStore();
  const mic = useMic();
  const loud = useRef(false);
  // shout each word together: a loud chant reveals the next takeaway
  useEffect(() => {
    if (!mic.on) return;
    if (mic.stats.level > 0.55 && !loud.current && shown < TAKEAWAYS.length) {
      loud.current = true;
      setShown((s) => s + 1);
      setTimeout(() => (loud.current = false), 900);
    }
  }, [mic.on, mic.stats, shown]);
  useEffect(() => {
    if (shown === TAKEAWAYS.length && ans === "remember") {
      lessonDone(9);
      confetti();
    }
  }, [shown, ans, lessonDone]);
  return (
    <LessonFrame
      n={9}
      objective="Remember the 4 habits of natural speaking — and get excited for Class 2."
    >
      <p className="big" data-enter>
        What did we learn today? Say them together!
      </p>
      <div className="chant">
        {TAKEAWAYS.map(([icon, word, line], i) => (
          <div
            key={word}
            className="chant__card"
            data-on={i < shown || undefined}
          >
            <span className="chant__icon" aria-hidden="true">
              {icon}
            </span>
            <b>{word}</b>
            <span>{i < shown ? line : "?"}</span>
          </div>
        ))}
      </div>
      <div className="row" data-enter>
        <button
          type="button"
          className="btn btn--gold"
          onClick={() => setShown((s) => Math.min(4, s + 1))}
          disabled={shown >= 4}
        >
          📣 Next chant
        </button>
        <MicSwitch mic={mic} label="Chant out loud to reveal" />
      </div>
      <EchoSays
        glow={0.25 + shown * 0.19}
        mood={shown === 4 ? "cheer" : "happy"}
      >
        {shown === 4
          ? "You gave me a great glow today!"
          : "Robotic! Notes! Look up! Natural! — say it loud!"}
      </EchoSays>
      <div className="card" data-enter>
        <p className="big">What are notes for in speaking?</p>
        <div className="row" style={{ marginTop: 12 }}>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setAns("read")}
          >
            📖 To read from
          </button>
          <button
            type="button"
            className="btn btn--mint"
            onClick={() => setAns("remember")}
          >
            🧠 To help you remember
          </button>
        </div>
        {ans && (
          <p
            className={ans === "remember" ? "done-line" : "muted"}
            style={{ marginTop: 10 }}
          >
            {ans === "remember"
              ? "Yes — notes help you remember, not read!"
              : "Not quite — notes are reminders, not a script."}
          </p>
        )}
      </div>
      <div className="teaser" data-enter>
        <span className="pill">Next Class</span>
        <p className="big">Making a Great Opening! 🎬</p>
        <p>How to make people WANT to listen right from sentence one.</p>
      </div>
    </LessonFrame>
  );
}
