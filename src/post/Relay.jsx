import { useMemo, useState } from "react";
import { Echo } from "../echo/Echo";
import { LETTERS, letterById } from "../data/content";
import { EchoSays, Scene, Timer, confetti } from "../ui/kit";
import "./post.css";

const MODES = {
  notes: { icon: "📝", name: "With the 3-Note Trick", how: "Each courier listens, writes 3 tiny notes, then TELLS the next courier." },
  whisper: { icon: "🤫", name: "No notes (whisper)", how: "Each courier whispers the message from memory — no notes allowed." },
};
const mix = (arr, seed) =>
  arr
    .map((x, i) => ({ x, k: Math.sin(seed * 41 + i * 5.1) }))
    .sort((a, b) => a.k - b.k)
    .map((o) => o.x);

/**
 * Class Relay (projector): a message travels from child to child. At the end, the class checks how
 * much of it arrived. Play it with and without notes — and see for yourselves why notes help.
 */
export function Relay() {
  const [letterId, setLetterId] = useState(LETTERS[2].id);
  const [n, setN] = useState(5);
  const [mode, setMode] = useState("notes");
  const [phase, setPhase] = useState("setup"); // setup, secret, chain, final, check, result
  const [k, setK] = useState(1);
  const [peek, setPeek] = useState(false);
  const [picked, setPicked] = useState([]);
  const [rounds, setRounds] = useState([]);
  const letter = letterById(letterId);
  const options = useMemo(() => mix([...letter.notes, ...letter.decoys], rounds.length + letter.id.length), [letter, rounds.length]);
  const arrived = picked.filter((p) => letter.notes.includes(p)).length;
  const wrong = picked.length - arrived;

  const start = () => {
    setK(1);
    setPeek(false);
    setPicked([]);
    setPhase("secret");
  };
  const check = () => {
    setRounds((r) => [...r, { mode, n, topic: letter.topic, arrived, wrong }]);
    setPhase("result");
    if (arrived === 3) confetti();
  };

  return (
    <Scene
      kicker="Projector game · for the whole class"
      title="📡 Class Relay"
      sub="A message travels from courier to courier across the class. At the end, does it still arrive? Play it once without notes and once with the 3-Note Trick."
    >
      {phase === "setup" && (
        <div className="two">
          <div className="card stack" data-enter>
            <h2>1 · Pick the message</h2>
            <div className="chips">
              {LETTERS.map((l) => (
                <button key={l.id} type="button" className="chip" aria-pressed={l.id === letterId} onClick={() => setLetterId(l.id)}>
                  {l.icon} {l.topic}
                </button>
              ))}
            </div>
            <label className="namefield" style={{ maxWidth: 260 }}>
              2 · How many couriers in the chain?
              <input type="number" min={3} max={10} value={n} onChange={(e) => setN(Math.max(3, Math.min(10, +e.target.value || 3)))} />
            </label>
          </div>
          <div className="card stack" data-enter>
            <h2>3 · How will they pass it?</h2>
            {Object.entries(MODES).map(([id, m]) => (
              <button key={id} type="button" className="chip chip--big" aria-pressed={mode === id} onClick={() => setMode(id)}>
                {m.icon} <b>{m.name}</b> — {m.how}
              </button>
            ))}
            <p className="muted">Volunteers only. Couriers stand in a line; everyone else is the audience who checks the message at the end.</p>
            <button type="button" className="btn btn--gold" onClick={start}>
              ▶ Start the relay
            </button>
          </div>
        </div>
      )}

      {phase !== "setup" && phase !== "result" && (
        <div className="relay" data-enter>
          <div className="relay__route" aria-label={`Courier ${k} of ${n}`}>
            {Array.from({ length: n }, (_, i) => (
              <span key={i} className="relay__stop" data-done={i + 1 < k || phase === "final" || phase === "check" || undefined} data-now={(i + 1 === k && phase !== "final" && phase !== "check") || undefined}>
                <b>{i + 1}</b>
                {i + 1 === k && phase !== "final" && phase !== "check" && <span className="relay__bike">🚲</span>}
              </span>
            ))}
            <span className="relay__stop relay__stop--end" data-now={phase === "final" || phase === "check" || undefined}>
              📢
            </span>
          </div>

          {phase === "secret" && (
            <div className="stack" style={{ justifyItems: "center", textAlign: "center" }}>
              <p className="big">🙈 Everyone except Courier 1 — close your eyes!</p>
              {!peek ? (
                <button type="button" className="btn btn--gold" onClick={() => setPeek(true)}>
                  👀 Courier 1: show me the letter
                </button>
              ) : (
                <>
                  <p className="relay__letter">{letter.text}</p>
                  {mode === "notes" && <Timer seconds={60} running label="Note time" />}
                  <p>{mode === "notes" ? "Write 3 tiny notes on paper. Then hide the letter!" : "Read it once. Remember it — no notes!"}</p>
                  <button type="button" className="btn btn--red" onClick={() => (setPeek(false), setPhase("chain"))}>
                    🙈 Hide the letter — start passing!
                  </button>
                </>
              )}
            </div>
          )}

          {phase === "chain" && (
            <div className="stack" style={{ justifyItems: "center", textAlign: "center" }}>
              <p className="relay__pass">
                Courier {k} ➜ Courier {k + 1}
              </p>
              <p>{mode === "notes" ? "Tell it from your notes. The next courier listens and writes 3 new notes." : "Whisper it from memory. No notes!"}</p>
              <Timer key={k} seconds={30} running label="Passing time" />
              <button type="button" className="btn btn--gold" onClick={() => (k + 1 >= n ? setPhase("final") : setK(k + 1))}>
                {k + 1 >= n ? "✅ Passed! Now the last courier" : "✅ Passed it on ➜"}
              </button>
            </div>
          )}

          {phase === "final" && (
            <div className="stack" style={{ justifyItems: "center", textAlign: "center" }}>
              <Echo glow={0.8} mood="listen" size={110} />
              <p className="relay__pass">📢 Courier {n}: tell the WHOLE class!</p>
              <p>Everyone listens carefully. What arrived?</p>
              <button type="button" className="btn btn--gold" onClick={() => setPhase("check")}>
                ✍️ Check the message
              </button>
            </div>
          )}

          {phase === "check" && (
            <div className="stack">
              <p className="big" style={{ textAlign: "center" }}>
                Class: tap everything the last courier said about {letter.topic}
              </p>
              <div className="slip__grid">
                {options.map((o) => (
                  <button key={o} type="button" className="chip chip--big" aria-pressed={picked.includes(o)} onClick={() => setPicked((v) => (v.includes(o) ? v.filter((x) => x !== o) : [...v, o]))}>
                    {picked.includes(o) ? "✔ " : ""}
                    {o}
                  </button>
                ))}
              </div>
              <button type="button" className="btn btn--gold" style={{ justifySelf: "center" }} onClick={check}>
                📬 Show the real message
              </button>
            </div>
          )}
        </div>
      )}

      {phase === "result" && (
        <>
          <div className="two">
            <div className="card stack" data-enter>
              <h2>The real message</h2>
              <p className="relay__letter relay__letter--small">{letter.text}</p>
              <p className="big">
                Arrived: {"✉️".repeat(arrived)}
                {"▫️".repeat(3 - arrived)} {arrived}/3
              </p>
              {wrong > 0 && <p className="muted">🌀 {wrong} new idea{wrong > 1 ? "s" : ""} sneaked in that were never in the letter!</p>}
            </div>
            <div className="card stack" data-enter>
              <h2>Rounds so far</h2>
              <table className="rounds">
                <thead>
                  <tr>
                    <th>How</th>
                    <th>Couriers</th>
                    <th>Arrived</th>
                  </tr>
                </thead>
                <tbody>
                  {rounds.map((r, i) => (
                    <tr key={i}>
                      <td>
                        {MODES[r.mode].icon} {MODES[r.mode].name}
                      </td>
                      <td>{r.n}</td>
                      <td>
                        {r.arrived}/3{r.wrong ? ` (+${r.wrong} wrong)` : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row">
                <button type="button" className="btn btn--gold" onClick={() => (setMode(mode === "notes" ? "whisper" : "notes"), setPhase("setup"))}>
                  🔁 Try {mode === "notes" ? "without" : "with"} notes
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => setPhase("setup")}>
                  New relay
                </button>
              </div>
            </div>
          </div>
          <EchoSays mood="cheer">
            {rounds.some((r) => r.mode === "notes") && rounds.some((r) => r.mode === "whisper")
              ? "See the difference? Notes keep the big ideas safe — so you can TELL the message instead of losing it."
              : "Messages get lost when we only try to remember every word. Try the other way and compare!"}
          </EchoSays>
        </>
      )}
    </Scene>
  );
}
