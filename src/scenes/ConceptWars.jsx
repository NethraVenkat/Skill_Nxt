import { Trophy, Plus, Minus, Swords, ArrowRight } from "lucide-react";
import { useLesson } from "../state/LessonProvider";
import { blankConcept, complete, newTimer } from "../state/lessonReducer";
import ConceptForm from "../components/ConceptForm";
import Timer from "../components/Timer";
import { sound } from "../components/Audio";
const phases = [
  "Build your concepts",
  "Pair A · 20-second pitch",
  "Pair B · 20-second pitch",
  "Class vote",
];
export default function ConceptWars() {
  const { state, set, dispatch, flag } = useLesson();
  const phase = state.battlePhase;
  const winner = state.strongerConcept;
  const bothReady = state.pairConcepts.every(complete);
  const timer = phase === 0 ? "battle" : phase === 1 ? "pitchA" : "pitchB";
  function next() {
    dispatch({ type: "PAUSE_ALL" });
    set("battlePhase", Math.min(3, phase + 1));
  }
  function reveal() {
    const [a, b] = state.pairVotes;
    const result = a === b ? "tie" : a > b ? "A" : "B";
    set("strongerConcept", result);
    sound("flag", state.audioEnabled);
    if (result !== "tie") {
      const c = state.pairConcepts[result === "A" ? 0 : 1];
      flag(`battle-${state.battles.length}`, c.name || `Pair ${result}`);
    }
  }
  function rematch() {
    dispatch({
      type: "PATCH",
      value: {
        battles: [
          ...state.battles,
          {
            concepts: state.pairConcepts,
            votes: state.pairVotes,
            strongerConcept: winner,
          },
        ],
        pairConcepts: [blankConcept(), blankConcept()],
        pairVotes: [0, 0],
        strongerConcept: null,
        battlePhase: 0,
        timers: {
          ...state.timers,
          battle: newTimer(120),
          pitchA: newTimer(20),
          pitchB: newTimer(20),
        },
      },
    });
  }
  return (
    <div className={`arena phase-${phase}`}>
      <div className="arena-top">
        <div>
          <span className="eyebrow copper">
            THE VENTURE ARENA · BATTLE{" "}
            {String(state.battles.length + 1).padStart(2, "0")}
          </span>
          <h2>
            Concept <em>wars.</em>
          </h2>
          <p>Which concept solves a more real problem?</p>
        </div>
        {phase < 3 ? (
          <Timer key={timer} id={timer} label={phases[phase]} />
        ) : (
          <div className="vote-prompt">
            <Swords size={30} />
            <strong>The class decides.</strong>
            <span>Count hands. Add the votes below.</span>
          </div>
        )}
      </div>
      <div className="arena-phases">
        {phases.map((p, i) => (
          <span key={p} className={phase === i ? "active" : ""}>
            0{i + 1} {p}
          </span>
        ))}
      </div>
      <div className="arena-floor">
        {state.pairConcepts.map((c, i) => (
          <section
            key={i}
            className={`pair-podium pair-${i} ${winner === (i ? "B" : "A") ? "victor" : ""} ${phase === i + 1 ? "pitching" : ""}`}
          >
            <div className="pair-label">
              <span>PAIR {i ? "B" : "A"}</span>
              <span>
                {winner === (i ? "B" : "A")
                  ? "STRONGER CONCEPT"
                  : phase === i + 1
                    ? "ON THE CLOCK"
                    : "WHO / WHAT / HOW"}
              </span>
            </div>
            {phase > 0 && (
              <div className="pitch-dossier">
                <span className="eyebrow">VENTURE / {i ? "B" : "A"}</span>
                <h3>{c.name || `Pair ${i ? "B" : "A"}’s venture`}</h3>
                <dl>
                  {["who", "what", "how"].map((key) => (
                    <div key={key}>
                      <dt>{key.toUpperCase()}</dt>
                      <dd>
                        {c[key] || "Capture this part of the pitch below."}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <details
              className="arena-editor"
              open={phase === 0 ? true : undefined}
              key={`editor-${phase}-${i}`}
            >
              <summary>
                {phase === 0 ? "Capture your venture" : "Edit this venture"}
              </summary>
              <ConceptForm
                prefix={`pair-${i}`}
                concept={c}
                onChange={(next) => {
                  set("pairConcepts", (p) =>
                    p.map((v, j) => (i === j ? next : v)),
                  );
                  set("strongerConcept", null);
                }}
              />
            </details>
            {phase === 3 && (
              <div className="voting">
                <div className="energy-tower" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, n) => (
                    <i
                      key={n}
                      className={
                        n <
                        Math.ceil(
                          (state.pairVotes[i] /
                            Math.max(1, ...state.pairVotes)) *
                            12,
                        )
                          ? "charged"
                          : ""
                      }
                    />
                  ))}
                </div>
                <div className="vote-tally">
                  <label htmlFor={`votes-${i}`}>
                    PAIR {i ? "B" : "A"} VOTES
                  </label>
                  <div>
                    <button
                      aria-label={`Remove vote for Pair ${i ? "B" : "A"}`}
                      disabled={!state.pairVotes[i]}
                      onClick={() => {
                        set("pairVotes", (p) =>
                          p.map((v, j) => (j === i ? Math.max(0, v - 1) : v)),
                        );
                        set("strongerConcept", null);
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      id={`votes-${i}`}
                      type="number"
                      min="0"
                      max="999"
                      value={state.pairVotes[i]}
                      onChange={(e) => {
                        set("pairVotes", (p) =>
                          p.map((v, j) =>
                            j === i
                              ? Math.max(
                                  0,
                                  Math.min(
                                    999,
                                    Math.floor(Number(e.target.value) || 0),
                                  ),
                                )
                              : v,
                          ),
                        );
                        set("strongerConcept", null);
                      }}
                    />
                    <button
                      aria-label={`Add vote for Pair ${i ? "B" : "A"}`}
                      onClick={() => {
                        set("pairVotes", (p) =>
                          p.map((v, j) => (j === i ? Math.min(999, v + 1) : v)),
                        );
                        set("strongerConcept", null);
                        sound("pass", state.audioEnabled);
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
        <div className="vs-plate" aria-hidden="true">
          VS
        </div>
      </div>
      <div className="arena-bottom">
        {phase < 3 ? (
          <button className="primary" onClick={next}>
            {phase === 0
              ? "Begin Pair A pitch"
              : phase === 1
                ? "Begin Pair B pitch"
                : "Open class voting"}{" "}
            <ArrowRight size={18} />
          </button>
        ) : winner === null ? (
          <>
            <button className="primary" disabled={!bothReady} onClick={reveal}>
              <Trophy size={18} /> Reveal the stronger concept
            </button>
            {!bothReady && (
              <p>Capture WHO, WHAT and HOW for both pairs first.</p>
            )}
          </>
        ) : (
          <div className="winner-reveal" role="status">
            <Trophy size={30} />
            <div>
              <span className="eyebrow">
                {winner === "tie"
                  ? "TWO IDEAS WORTH BACKING"
                  : "STRONGER CONCEPT"}
              </span>
              <h3>
                {winner === "tie"
                  ? "A worthy tie."
                  : state.pairConcepts[winner === "A" ? 0 : 1].name ||
                    `Pair ${winner}`}
              </h3>
              <p>What could make each idea even stronger?</p>
            </div>
            <button onClick={rematch}>Start another battle</button>
          </div>
        )}
      </div>
      {state.battles.length > 0 && (
        <details className="battle-history">
          <summary>
            {state.battles.length} completed battle
            {state.battles.length > 1 ? "s" : ""}
          </summary>
          {state.battles.map((b, i) => (
            <p key={i}>
              Battle {i + 1}:{" "}
              {b.concepts.map((c) => c.name || "Untitled concept").join(" / ")}{" "}
              · {b.votes.join(" – ")} ·{" "}
              {b.strongerConcept === "tie"
                ? "Tie"
                : `Pair ${b.strongerConcept} stronger`}
            </p>
          ))}
        </details>
      )}
    </div>
  );
}
