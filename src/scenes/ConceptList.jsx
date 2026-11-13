import { useEffect } from "react";
import { Check, Flag, Download } from "lucide-react";
import { useLesson } from "../state/LessonProvider";
import { complete, passes } from "../state/lessonReducer";
import { filters } from "../data/lessonContent";
import ConceptForm from "../components/ConceptForm";
import Timer from "../components/Timer";
import { sound } from "../components/Audio";
export default function ConceptList() {
  const { state, set, flag } = useLesson();
  useEffect(() => {
    if (
      complete(state.soloConcepts[0]) ||
      state.soloConcepts[0].who ||
      state.soloConcepts[0].what ||
      state.soloConcepts[0].how
    )
      return;
    const selected = state.strongerConcept === "B" ? 1 : 0;
    const source = complete(state.pairConcepts[selected])
      ? state.pairConcepts[selected]
      : state.battles.at(-1)?.concepts[selected] || state.liveConcept;
    if (complete(source))
      set("soloConcepts", (p) => [
        { ...source, filters: [...source.filters] },
        p[1],
        p[2],
      ]);
  }, [
    state.pairConcepts,
    state.soloConcepts,
    state.liveConcept,
    state.strongerConcept,
    state.battles,
    set,
  ]);
  const count = state.soloConcepts.filter(complete).length;
  const passCount = state.soloConcepts.filter(passes).length;
  const ready = count === 3 && passCount > 0;
  function finish() {
    if (!ready) return;
    set("soloSubmitted", true);
    state.soloConcepts.forEach((c, i) => {
      if (passes(c)) flag(`solo-${i}`, c.name || `Concept ${i + 1}`);
    });
    sound("flag", state.audioEnabled);
  }
  const exportText =
    "VENTURECRAFT — DRAFT 3-CONCEPT LIST\n\n" +
    state.soloConcepts
      .map(
        (c, i) =>
          `CONCEPT ${i + 1}: ${c.name || "Untitled"}\nWHO: ${c.who}\nWHAT: ${c.what}\nHOW: ${c.how}\nFILTERS: ${filters.map((f, j) => `${f}: ${c.filters[j] ? "Pass" : "Not confirmed"}`).join(" | ")}`,
      )
      .join("\n\n");
  return (
    <div className="workbench">
      <div className="workbench-top">
        <div>
          <span className="eyebrow copper">
            YOUR OFFICIAL LESSON DELIVERABLE
          </span>
          <h2>
            Three concepts.
            <br />
            <em>All yours.</em>
          </h2>
          <p>
            Start with your pair concept. Create two more.
            <br />
            At least one must pass all four filters.
          </p>
        </div>
        <Timer id="solo" label="Quiet build time" quiet />
      </div>
      <div className="concept-sheets">
        {state.soloConcepts.map((c, i) => (
          <article className="concept-sheet" key={i}>
            <div className="sheet-heading">
              <span>CONCEPT / 0{i + 1}</span>
              {passes(c) ? (
                <span>
                  <Check size={16} /> 4 / 4
                </span>
              ) : (
                <span>
                  {i === 0 ? "FROM YOUR COLLABORATION" : "A NEW POSSIBILITY"}
                </span>
              )}
            </div>
            <ConceptForm
              prefix={`solo-${i}`}
              paper
              withFilters
              concept={c}
              onChange={(next) => {
                set("soloConcepts", (p) =>
                  p.map((v, j) => (i === j ? next : v)),
                );
                set("soloSubmitted", false);
              }}
            />
          </article>
        ))}
      </div>
      <div className="worksheet-footer">
        <p aria-live="polite">
          <strong>{count} / 3</strong> structured concepts <span>·</span>{" "}
          <strong>{passCount}</strong> passing all four
        </p>
        <div>
          <a
            className="download-link"
            download="VentureCraft_My_3_Concepts.txt"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(exportText)}`}
          >
            <Download size={18} /> Download my list
          </a>
          <button className="primary" disabled={!ready} onClick={finish}>
            <Flag size={18} />
            {state.soloSubmitted
              ? "List ready for the auction"
              : "Complete my concept list"}
          </button>
        </div>
      </div>
      {state.soloSubmitted && (
        <p className="success-message" role="status">
          Your three-concept list is saved. Bring it to Class 2’s auction.
        </p>
      )}
    </div>
  );
}
