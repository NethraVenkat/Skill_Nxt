import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useLesson } from "../state/LessonProvider";

function Shell({ eyebrow, title, children }) {
  return (
    <main id="main" className="hq-page mvp-surface">
      <Link className="quiet-link" to="/hq">
        <ArrowLeft size={16} /> Venture HQ
      </Link>
      <span className="eyebrow copper">{eyebrow}</span>
      <h1>{title}</h1>
      {children}
    </main>
  );
}

export function MissionPage() {
  const { state, dispatch } = useLesson();
  const [proof, setProof] = useState("");
  const submitted = state.missionSubmissions.includes("module-1-interviews");
  function submit(e) {
    e.preventDefault();
    if (!proof.trim()) return;
    dispatch({
      type: "SET",
      key: "missionSubmissions",
      value: [...state.missionSubmissions, "module-1-interviews"],
    });
    dispatch({
      type: "SET",
      key: "passportItems",
      value: [
        ...state.passportItems,
        {
          id: "problem-evidence",
          title: "Customer interview evidence",
          detail: proof.trim(),
          module: 1,
        },
      ],
    });
  }
  return (
    <Shell eyebrow="MODULE 1 / REAL MISSION" title="Interview five customers">
      <div className="mvp-columns">
        <section className="hq-panel">
          <h2>Find the problem before building.</h2>
          <p>
            Speak to five people who experienced your chosen problem in the
            last month. Ask what happened, what they did instead, and what it
            cost them.
          </p>
          <ol className="mission-steps">
            <li>Write your segment and recruit five matching people.</li>
            <li>Ask about a real recent episode. Do not pitch.</li>
            <li>Record three exact quotes and one contradiction.</li>
            <li>Rewrite your problem statement using the evidence.</li>
          </ol>
          <div className="proof-rule">
            <strong>Valid proof</strong>
            <span>
              Anonymised notes or transcript with dates, five conversations,
              quotes, frequency, consequence, and no fabricated answers.
            </span>
          </div>
        </section>
        <form className="hq-panel mission-form" onSubmit={submit}>
          <span className="eyebrow copper">PROOF DRAFT</span>
          <label htmlFor="proof">
            What did you learn?
            <textarea
              id="proof"
              value={proof}
              onChange={(event) => setProof(event.target.value)}
              placeholder="Segment: hostel students in Pune&#10;Repeated pattern: ...&#10;Quote: ...&#10;Contradiction: ...&#10;Revised problem: ..."
              disabled={submitted}
            />
          </label>
          <button className="primary" type="submit" disabled={submitted || !proof.trim()}>
            {submitted ? <CheckCircle2 size={17} /> : <Save size={17} />}
            {submitted ? "Proof submitted" : "Submit proof"}
          </button>
          {submitted && (
            <p className="success-copy">
              Mission recorded. Your evidence is now part of the Venture
              Passport and ready for facilitator review.
            </p>
          )}
        </form>
      </div>
    </Shell>
  );
}

export function LabPage({ type = "persona" }) {
  const [segment, setSegment] = useState("");
  const [frequency, setFrequency] = useState(3);
  const [severity, setSeverity] = useState(3);
  const [price, setPrice] = useState(500);
  const isPricing = type === "pricing";
  const score = frequency * severity + 3;
  return (
    <Shell
      eyebrow={isPricing ? "CONCEPT LAB / PRICING" : "CONCEPT LAB / CUSTOMER"}
      title={isPricing ? "Pricing Lab" : "Customer Persona Builder"}
    >
      <div className="hq-panel lab-card">
        {isPricing ? (
          <>
            <p>
              Explore the trade-off between price, conversion, contribution,
              and runway. This is a hypothesis, not a market fact.
            </p>
            <label>
              Monthly price: ₹{price.toLocaleString("en-IN")}
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </label>
            <div className="lab-results">
              <strong>Contribution per customer: ₹{Math.max(0, price - 120)}</strong>
              <span>
                At ₹{price}, you need{" "}
                {Math.ceil(83333 / Math.max(1, price - 120))} customers to cover
                the base burn.
              </span>
            </div>
          </>
        ) : (
          <>
            <p>
              Narrow your first segment. Unsupported claims stay visible as
              hypotheses until real conversations add evidence.
            </p>
            <label>
              Segment name
              <input
                value={segment}
                onChange={(event) => setSegment(event.target.value)}
                placeholder="e.g. hostel students in Pune"
              />
            </label>
            <label>
              How often does the problem happen? {frequency}/5
              <input
                type="range"
                min="1"
                max="5"
                value={frequency}
                onChange={(event) => setFrequency(Number(event.target.value))}
              />
            </label>
            <label>
              How serious is the consequence? {severity}/5
              <input
                type="range"
                min="1"
                max="5"
                value={severity}
                onChange={(event) => setSeverity(Number(event.target.value))}
              />
            </label>
            <div className="lab-results">
              <strong>Problem score: {score}/28</strong>
              <span>
                Add five interviews before treating this score as evidence.
              </span>
            </div>
          </>
        )}
        <Link className="secondary-link" to="/hq">
          Apply a hypothesis in the simulator <ArrowRight size={16} />
        </Link>
      </div>
    </Shell>
  );
}

export function PassportPage() {
  const { state } = useLesson();
  return (
    <Shell eyebrow="VENTURE PASSPORT" title="Your evidence, in one place.">
      <div className="passport-summary hq-panel">
        <div>
          <span className="eyebrow copper">COMPLETENESS</span>
          <strong>{state.passportItems.length}/12</strong>
          <span>required evidence items</span>
        </div>
        <FileText size={42} />
      </div>
      <section className="passport-list">
        {state.passportItems.length ? (
          state.passportItems.map((item) => (
            <article className="passport-item hq-panel" key={item.id}>
              <CheckCircle2 size={20} />
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="hq-panel">
            <p>
              Complete the first real mission to create your first Passport
              evidence card. Simulator choices alone do not count as proof.
            </p>
            <Link className="secondary-link" to="/mission/1">
              Open first mission <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>
    </Shell>
  );
}
