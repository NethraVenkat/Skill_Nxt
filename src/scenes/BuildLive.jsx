import { Flag, Check, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import { useLesson } from "../state/LessonProvider";
import { complete } from "../state/lessonReducer";
import ConceptForm from "../components/ConceptForm";
import { sound } from "../components/Audio";
export default function BuildLive() {
  const { state, set, flag } = useLesson();
  const valid = complete(state.liveConcept) && state.liveConcept.name.trim();
  const build = () => {
    if (!valid) return;
    set("liveBuilt", true);
    flag("live", state.liveConcept.name);
    sound("flag", state.audioEnabled);
  };
  return (
    <div className="build-room">
      <div className="scene-intro">
        <span className="eyebrow copper">FROM OBSERVATION TO OPPORTUNITY</span>
        <h2>
          One problem.
          <br />
          <em>Build it together.</em>
        </h2>
      </div>
      <div className="build-layout">
        <aside className="problem-bank">
          <h3>
            <PenTool size={20} /> Your storm inventory
          </h3>
          <p>Choose one problem for the class.</p>
          {state.problemStormProblems.length ? (
            <div className="problem-options">
              {state.problemStormProblems.map((p) => (
                <button
                  key={p.id}
                  className={state.selectedProblem === p.id ? "selected" : ""}
                  onClick={() => {
                    set("selectedProblem", p.id);
                    set("liveConcept", (c) => ({ ...c, what: p.text }));
                    set("liveBuilt", false);
                  }}
                >
                  {state.selectedProblem === p.id && <Check size={16} />}{" "}
                  {p.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="empty-bank">
              <p>No storm problems captured yet.</p>
              <Link to="/scene/6">Visit the problem storm</Link>
              <p>Or type the class’s spoken problem in WHAT.</p>
            </div>
          )}
          <div className="reference-note">
            <span className="eyebrow">NOVA’S REFERENCE</span>
            <strong>PenStop</strong>
            <p>
              WHO · Grades 6–8
              <br />
              WHAT · Forgotten stationery
              <br />
              HOW · Lending library, ₹2 refundable deposit
            </p>
          </div>
        </aside>
        <div className="build-machine">
          <div className="machine-top">
            <span>CONCEPT ASSEMBLY / 001</span>
            <span>
              {
                ["who", "what", "how"].filter((k) =>
                  state.liveConcept[k].trim(),
                ).length
              }{" "}
              / 3 MODULES CONNECTED
            </span>
          </div>
          <div className="assembly-circuit" aria-label="Assembly progress">
            {["who", "what", "how"].map((key, i) => (
              <div
                key={key}
                className={state.liveConcept[key].trim() ? "engaged" : ""}
              >
                <span>0{i + 1}</span>
                <strong>{key.toUpperCase()}</strong>
                <small>
                  {state.liveConcept[key].trim()
                    ? "MODULE CONNECTED"
                    : "AWAITING INPUT"}
                </small>
              </div>
            ))}
          </div>
          <ConceptForm
            prefix="live"
            concept={state.liveConcept}
            withFilters
            onChange={(c) => {
              set("liveConcept", c);
              set("liveBuilt", false);
            }}
          />
          <button className="primary" disabled={!valid} onClick={build}>
            <Flag size={18} />
            {state.liveBuilt
              ? "Update your venture flag"
              : "Assemble concept & plant flag"}
          </button>
          {state.liveBuilt && (
            <div className="built-ticket" role="status">
              <span className="eyebrow">CLASS VENTURE ASSEMBLED</span>
              <h3>{state.liveConcept.name}</h3>
              <p>
                {state.liveConcept.who} · {state.liveConcept.how}
              </p>
              <span>Saved for the next stage.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
