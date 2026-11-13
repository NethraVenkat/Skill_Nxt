import {
  Check,
  LockKeyhole,
  UnlockKeyhole,
  ArrowRight,
  RotateCcw,
  Flag,
} from "lucide-react";
import { useLesson } from "../state/LessonProvider";
import {
  examples,
  challenges,
  filters,
  filterHints,
} from "../data/lessonContent";
import { sound } from "../components/Audio";
export default function FilterGates({ challenge = false }) {
  const { state, set, flag } = useLesson();
  const id = challenge ? 7 : 3;
  const data = challenge ? challenges : examples;
  const p = state.gates[id];
  const c = data[p.round];
  const patch = (value) =>
    set("gates", (g) => ({ ...g, [id]: { ...g[id], ...value } }));
  function decide(answer) {
    const correct = c.answers[p.gate];
    if (answer !== correct) {
      patch({
        feedback: correct
          ? "This idea can pass. Think about a simple school-sized version."
          : c.reason,
      });
      sound("fail", state.audioEnabled);
      return;
    }
    const result = !answer ? "stopped" : p.gate === 3 ? "alive" : null;
    patch({
      feedback: result
        ? c.reason
        : `${filters[p.gate]} gate open. Next: ${filters[p.gate + 1]}.`,
      gate: answer ? Math.min(4, p.gate + 1) : p.gate,
      result,
      done: result ? [...new Set([...p.done, p.round])] : p.done,
    });
    sound(answer ? "pass" : "fail", state.audioEnabled);
    if (result === "alive" && challenge) flag("book-exchange", "Book exchange");
  }
  return (
    <div className={`filter-room result-${p.result || "pending"}`}>
      <div className="filter-intro">
        <div>
          <span className="eyebrow copper">
            {challenge ? "THE GAUNTLET" : "FOUR FILTERS. ONE STRONG IDEA."}
          </span>
          <h2>
            {challenge ? "Can it make it" : "Small enough to start."}
            <br />
            <em>{challenge ? "through?" : "Good enough to matter."}</em>
          </h2>
        </div>
        <div className="round-switch" role="group" aria-label="Choose example">
          {data.map((c, i) => (
            <button
              key={c.name}
              className={i === p.round ? "selected" : ""}
              aria-label={`Example ${i + 1}: ${c.name}`}
              onClick={() =>
                patch({ round: i, gate: 0, result: null, feedback: "" })
              }
            >
              {p.done.includes(i) ? (
                <Check size={16} />
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </button>
          ))}
        </div>
      </div>
      <div
        className="gauntlet"
        style={{
          "--gate-index": Math.min(3, p.gate),
          "--gate-col": Math.min(3, p.gate) % 2,
          "--gate-row": Math.floor(Math.min(3, p.gate) / 2),
        }}
      >
        <div className="gate-track" />
        <div
          aria-hidden="true"
          className={`travelling-idea ${p.result === "stopped" ? "idea-stopped" : ""}`}
        >
          <Flag size={14} />
          {c.name}
        </div>
        {filters.map((f, i) => {
          const open = i < p.gate;
          const stopped = p.result === "stopped" && i === p.gate;
          return (
            <div
              key={f}
              className={`gate ${open ? "open" : ""} ${i === p.gate && !p.result ? "current" : ""} ${stopped ? "stopped" : ""}`}
            >
              <span className="gate-id">FILTER / 0{i + 1}</span>
              <div className="gate-frame">
                <div className="gate-door door-l" />
                <div className="gate-door door-r" />
                <div className="gate-symbol">
                  {open ? (
                    <UnlockKeyhole size={35} />
                  ) : (
                    <LockKeyhole size={35} />
                  )}
                </div>
              </div>
              <h3>{f}</h3>
              <span className="gate-status">
                {open
                  ? "PASS · OPEN"
                  : stopped
                    ? "FAIL · STOPPED"
                    : i === p.gate
                      ? "AWAITING CLASS VOTE"
                      : "READY"}
              </span>
              <p>{filterHints[i]}</p>
            </div>
          );
        })}
      </div>
      <div className={`candidate-console ${p.result || ""}`}>
        <div className="candidate" key={`${p.round}-${p.gate}`}>
          <span className="eyebrow">
            {p.result === "alive"
              ? "IDEA ALIVE!"
              : p.result === "stopped"
                ? "LET’S SHARPEN THE IDEA"
                : `CANDIDATE ${p.round + 1} / 3`}
          </span>
          <h3>{c.name}</h3>
          {!p.result && (
            <p>
              Does it pass <strong>{filters[p.gate]}</strong>?
            </p>
          )}
        </div>
        <div className="decision-controls">
          {!p.result ? (
            <>
              <button className="pass-button" onClick={() => decide(true)}>
                <Check /> Pass
              </button>
              <button className="fail-button" onClick={() => decide(false)}>
                × Fail
              </button>
            </>
          ) : (
            <>
              <button
                className="primary"
                onClick={() =>
                  patch({
                    round: (p.round + 1) % 3,
                    gate: 0,
                    result: null,
                    feedback: "",
                  })
                }
              >
                Next idea <ArrowRight size={18} />
              </button>
              <button
                className="icon-button"
                aria-label="Retry this idea"
                onClick={() => patch({ gate: 0, result: null, feedback: "" })}
              >
                <RotateCcw size={18} />
              </button>
            </>
          )}
        </div>
      </div>
      <p className="gate-feedback" aria-live="polite">
        {p.feedback || "Take a class vote. Then lock in your answer."}
        {p.result === "alive" && challenge && <Flag size={18} />}
      </p>
    </div>
  );
}
