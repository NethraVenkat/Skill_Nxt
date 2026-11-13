import { useState } from "react";
import { Plus, Wind, X } from "lucide-react";
import { useLesson } from "../state/LessonProvider";
import Timer from "../components/Timer";
export default function ProblemStorm() {
  const { state, set } = useLesson();
  const [text, setText] = useState("");
  const t = state.timers.storm;
  const ended = t.remaining === 0;
  const add = (e) => {
    e.preventDefault();
    if (!text.trim() || ended) return;
    set("problemStormProblems", (p) => [
      ...p,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text: text.trim(),
      },
    ]);
    setText("");
  };
  return (
    <div
      className={`storm-room ${t.running ? "storm-running" : ""} ${ended ? "storm-frozen" : ""} ${t.remaining > 0 && t.remaining <= 3 ? "storm-critical" : ""} ${t.remaining <= 10 ? "storm-amber" : ""}`}
    >
      <div className="storm-heading">
        <div>
          <span className="eyebrow copper">QUANTITY FIRST. JUDGE LATER.</span>
          <h2>
            60-second
            <br />
            <em>problem storm.</em>
          </h2>
          <p>
            Write as many school problems as you can.
            <br />
            No filtering. No judging.
          </p>
        </div>
        <Timer id="storm" label="Problem storm" />
      </div>
      <form className="storm-input" onSubmit={add}>
        <label className="sr-only" htmlFor="problem">
          School problem
        </label>
        <input
          id="problem"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={180}
          placeholder={
            ended
              ? "Your observations are safely captured."
              : "What’s one problem you notice at school?"
          }
          disabled={ended}
        />
        <button className="primary" disabled={!text.trim() || ended}>
          <Plus size={20} /> Add problem
        </button>
      </form>
      {!ended && state.seeds.some(Boolean) && (
        <div className="seed-import">
          <span>From your observations</span>
          {state.seeds.filter(Boolean).map((s, i) => (
            <button
              key={i}
              onClick={() =>
                set("problemStormProblems", (p) =>
                  p.some((x) => x.text === s)
                    ? p
                    : [
                        ...p,
                        {
                          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                          text: s,
                        },
                      ],
                )
              }
            >
              <Plus size={14} />
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="storm-counter">
        <Wind size={18} /> {state.problemStormProblems.length} PROBLEMS CAPTURED{" "}
        <span>
          {ended ? "FROZEN · READY TO BUILD" : "ALL OBSERVATIONS WELCOME"}
        </span>
      </div>
      <div className="storm-field">
        {state.problemStormProblems.length ? (
          state.problemStormProblems.map((p, i) => (
            <article
              className="problem-slip"
              key={p.id}
              style={{
                "--tilt": `${((i % 5) - 2) * 2}deg`,
                "--lift": `${(i % 3) * 16}px`,
                "--orbit": `${Math.min(18, 3 + state.problemStormProblems.length)}px`,
                "--delay": `${(i % 5) * 0.35}s`,
              }}
            >
              <span>OBSERVATION / {String(i + 1).padStart(2, "0")}</span>
              <p>{p.text}</p>
              <button
                className="remove-problem"
                disabled={ended}
                onClick={() =>
                  set("problemStormProblems", (problems) =>
                    problems.filter((x) => x.id !== p.id),
                  )
                }
                aria-label={`Remove problem: ${p.text}`}
              >
                <X size={15} />
              </button>
            </article>
          ))
        ) : (
          <div className="storm-empty">
            <Wind size={46} />
            <p>The room is waiting for your observations.</p>
            <span>
              Use the field above, or brainstorm on paper and capture the class
              ideas.
            </span>
          </div>
        )}
      </div>
      {ended && (
        <div className="storm-stop" role="status">
          STOP! <span>Ideas stay. Judgement comes next.</span>
        </div>
      )}
    </div>
  );
}
