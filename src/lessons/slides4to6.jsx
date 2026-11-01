import { useEffect, useRef, useState } from "react";
import { speak, stopSpeaking } from "../audio/voice";
import { Echo, GlowMeter } from "../echo/Echo";
import { useStore } from "../state/store";
import { EchoSays, Timer, confetti } from "../ui/kit";
import { LessonFrame } from "./LessonFrame";

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

/** A note card as the lesson draws them: a blue dot and 3–4 words. */
export function NoteCard({ children, on, i }) {
  return (
    <div className="note" data-on={on || undefined} style={{ "--i": i }}>
      <span className="note__dot" aria-hidden="true" />
      {children}
    </div>
  );
}

/* ---------- Slide 4 · The 3-Note Trick ---------- */
const CAT = [
  { s: "Cats sleep 16 hours.", note: "Sleep — 16 hrs" },
  { s: "Sharp claws for climbing.", note: "Sharp claws" },
  { s: "100+ sounds.", note: "100+ sounds" },
];
const SAY = [
  { t: "“Sharp claws.”", ok: false, why: "That’s just reading the note!" },
  {
    t: "“Cats have really sharp claws they use for climbing!”",
    ok: true,
    why: "Yes! The note reminded you — then YOU did the talking.",
  },
  {
    t: "“Claws. Sharp. Climbing. The end.”",
    ok: false,
    why: "That sounds like a robot. Talk like a friend!",
  },
];
const SQUEEZE = [
  "Cats can make more than one hundred different sounds with their voices.",
  "Butterflies start their lives as tiny hungry caterpillars.",
];
export function S4() {
  const [found, setFound] = useState([]);
  const [say, setSay] = useState(null);
  const [sq, setSq] = useState(["", ""]);
  const { lessonDone } = useStore();
  const sqOk = sq.every((x) => words(x) >= 1 && words(x) <= 4);
  const done = found.length === 3 && SAY[say]?.ok && sqOk;
  useEffect(() => {
    if (done) {
      lessonDone(4);
    }
  }, [done, lessonDone]);
  return (
    <LessonFrame
      n={4}
      objective="Notes are memory triggers — not a script to read."
    >
      <ol className="steps" data-enter>
        <li>
          <b>1</b> Read the paragraph
        </li>
        <li>
          <b>2</b> Find 3 big ideas
        </li>
        <li>
          <b>3</b> Write 3–4 words each
        </li>
      </ol>
      <div className="card" data-enter>
        <p className="big">Idea Hunt 🔍 — tap the 3 big ideas</p>
        <div className="trick">
          <p className="para">
            {CAT.map((c, i) => (
              <button
                key={i}
                type="button"
                className="para__idea"
                data-found={found.includes(i) || undefined}
                onClick={() => setFound((f) => (f.includes(i) ? f : [...f, i]))}
              >
                {c.s}
              </button>
            ))}
          </p>
          <span className="trick__arrow" aria-hidden="true">
            ➔
          </span>
          <div className="notes">
            {CAT.map((c, i) => (
              <NoteCard key={i} i={i} on={found.includes(i)}>
                {found.includes(i) ? c.note : "…"}
              </NoteCard>
            ))}
          </div>
        </div>
        {found.length === 3 && (
          <p className="done-line">3 notes! Now — YOU do the talking.</p>
        )}
      </div>
      <EchoSays mood="happy">
        The note is NOT the speech. It’s just a reminder. When you see “Sleep —
        16 hrs”, you say: “Cats actually sleep up to 16 hours every day!”
      </EchoSays>
      <div className="card" data-enter>
        <p className="big">
          If your note says “Sharp claws”, what would you SAY?
        </p>
        <div className="choices">
          {SAY.map((x, i) => (
            <button
              key={i}
              type="button"
              className="choice"
              data-state={say === i ? (x.ok ? "right" : "wrong") : undefined}
              onClick={() => setSay(i)}
            >
              {x.t}
            </button>
          ))}
        </div>
        {say !== null && (
          <p className={SAY[say].ok ? "done-line" : "muted"}>{SAY[say].why}</p>
        )}
      </div>
      <div className="card" data-enter>
        <p className="big">
          Note Squeezer 🗜️ — squeeze each sentence into 3–4 words
        </p>
        {SQUEEZE.map((s, i) => {
          const n = words(sq[i]);
          return (
            <label key={i} className="squeeze">
              <span>“{s}”</span>
              <input
                value={sq[i]}
                onChange={(e) =>
                  setSq((v) => v.map((x, k) => (k === i ? e.target.value : x)))
                }
                placeholder="3–4 words…"
              />
              <em data-ok={(n >= 1 && n <= 4) || undefined}>
                {n === 0
                  ? "Type your note"
                  : n <= 4
                    ? `${n} words — short and sweet! ✓`
                    : `${n} words — too long! Squeeze it!`}
              </em>
            </label>
          );
        })}
      </div>
    </LessonFrame>
  );
}

/* ---------- Slide 5 · Watch Echo Do It ---------- */
const DEMO = [
  {
    note: "Start caterpillars",
    line: "So butterflies — did you know they start as caterpillars?",
  },
  { note: "Cocoon change", line: "They wrap up in a cocoon —" },
  { note: "Wings fly", line: "and when they come out? Wings! They fly!" },
];
export function S5() {
  const [step, setStep] = useState(-1);
  const [ans, setAns] = useState(null);
  const playing = useRef(false);
  const { lessonDone } = useStore();
  useEffect(() => () => stopSpeaking(), []);
  const play = () => {
    playing.current = true;
    const go = (i) => {
      if (!playing.current) return;
      if (i >= DEMO.length) {
        setStep(DEMO.length);
        playing.current = false;
        return;
      }
      setStep(i);
      speak(DEMO[i].line, "echo", () => setTimeout(() => go(i + 1), 250));
    };
    go(0);
  };
  useEffect(() => {
    if (ans === "remember") {
      lessonDone(5);
    }
  }, [ans, lessonDone]);
  const glow = step < 0 ? 0.3 : Math.min(1, 0.35 + (step + 1) * 0.22);
  return (
    <LessonFrame
      n={5}
      objective="See the whole journey: paragraph → notes → speech."
    >
      <div className="card" data-enter>
        <p className="muted">The paragraph</p>
        <p className="big">
          Butterflies start as caterpillars, cocoon, get wings.
        </p>
      </div>
      <div className="demo" data-enter>
        <div className="demo__echo">
          <Echo
            glow={glow}
            mood={
              step >= 0 && step < DEMO.length
                ? "talk"
                : step === DEMO.length
                  ? "cheer"
                  : "happy"
            }
            size={200}
          />
          <GlowMeter value={glow} />
        </div>
        <div className="demo__right">
          <div className="notes notes--row">
            {DEMO.map((d, i) => (
              <NoteCard key={i} i={i} on={step === i}>
                {d.note}
              </NoteCard>
            ))}
          </div>
          <p className="demo__speech" aria-live="polite">
            {step >= 0 && step < DEMO.length
              ? `“${DEMO[step].line}”`
              : step === DEMO.length
                ? "“So butterflies — did you know they start as caterpillars? They wrap up in a cocoon — and when they come out? Wings! They fly!”"
                : "Press play and watch Echo glance at each note."}
          </p>
          <button type="button" className="btn btn--gold" onClick={play}>
            ▶ Watch Echo do it
          </button>
        </div>
      </div>
      <div className="card" data-enter>
        <p className="big">
          Did Echo read the notes — or just use them to remember?
        </p>
        <div className="row" style={{ marginTop: 12 }}>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setAns("read")}
          >
            📖 Read them
          </button>
          <button
            type="button"
            className="btn btn--mint"
            onClick={() => setAns("remember")}
          >
            🧠 Used them to remember
          </button>
        </div>
        {ans && (
          <p
            className={ans === "remember" ? "done-line" : "muted"}
            style={{ marginTop: 10 }}
          >
            {ans === "remember"
              ? "Yes! Echo just glanced at them — then talked like a friend."
              : "Watch again — did Echo say the notes word for word?"}
          </p>
        )}
      </div>
    </LessonFrame>
  );
}

/* ---------- Slide 6 · Your Turn: Make Your Notes ---------- */
const DOG =
  "Dogs have an amazing sense of smell. They can smell things humans cannot. Police use dogs to find missing people and objects.";
export function S6() {
  const { myNotes = ["", "", ""], setField, lessonDone } = useStore();
  const [running, setRunning] = useState(false);
  const [checked, setChecked] = useState(false);
  const ref = useRef(null);
  const issues = myNotes.map((x) => {
    const n = words(x);
    if (!n) return "empty";
    if (n > 4 || /[.!?]$/.test(x.trim())) return "long";
    return null;
  });
  const good = issues.every((x) => !x);
  const check = () => {
    setChecked(true);
    setRunning(false);
    if (good) {
      lessonDone(6);
      confetti(ref.current);
    }
  };
  return (
    <LessonFrame
      n={6}
      objective="Turn facts into 3 short memory notes — all by yourself."
    >
      <div className="card" data-enter>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <p className="pill">Writing challenge · 3 minutes</p>
          <Timer seconds={180} running={running} onDone={check} />
        </div>
        <p className="big" style={{ marginTop: 14 }}>
          “{DOG}”
        </p>
      </div>
      <div className="card" ref={ref} data-enter>
        <p className="big">Write 3 short notes (3–4 words each)</p>
        <div className="mynotes">
          {[0, 1, 2].map((i) => (
            <label
              key={i}
              className="mynote"
              data-issue={checked ? issues[i] || "ok" : undefined}
            >
              <span className="note__dot" aria-hidden="true" />
              <input
                value={myNotes[i]}
                onFocus={() => setRunning(true)}
                onChange={(e) =>
                  setField(
                    "myNotes",
                    myNotes.map((x, k) => (k === i ? e.target.value : x)),
                  )
                }
                placeholder={`Note ${i + 1}`}
                aria-label={`Note ${i + 1}`}
              />
              <em>{words(myNotes[i])} words</em>
            </label>
          ))}
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <button type="button" className="btn btn--gold" onClick={check}>
            ✓ I’m done
          </button>
        </div>
      </div>
      <EchoSays mood={checked ? (good ? "cheer" : "think") : "happy"}>
        {!checked
          ? "Short and sweet. No full sentences!"
          : good
            ? "Perfect note card! Keep it — you’ll talk from it with your partner."
            : issues.includes("long")
              ? "Too long! Can you squeeze it to 3 words?"
              : "Fill in all 3 notes — find 3 big ideas."}
      </EchoSays>
    </LessonFrame>
  );
}
