import { useState } from "react";
import {
  ArrowRight,
  Banknote,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  RotateCcw,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DECISIONS } from "../simulator/engine.js";
import { useLesson } from "../state/LessonProvider";

const money = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;
const labels = {
  problem: "Define the problem",
  evidence: "Collect customer evidence",
  quality: "Improve delivery quality",
  runway: "Protect runway",
  growth: "Find repeatable growth",
  cash: "Recover cash",
};

function Stat({ label, value, detail, tone = "" }) {
  return (
    <article className={`hq-stat ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

export default function VentureHQ() {
  const { state, dispatch } = useLesson();
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [consequence, setConsequence] = useState(null);
  const company = state.companyState;

  function commitDecision() {
    if (!selectedDecision) return;
    dispatch({ type: "COMPANY_DECISION", decisionId: selectedDecision });
    const decision = DECISIONS.find((item) => item.id === selectedDecision);
    setConsequence(decision);
    setSelectedDecision(null);
  }

  return (
    <main id="main" className="hq-page">
      <div className="hq-topline">
        <div>
          <span className="eyebrow copper">VENTURE HQ / COMPANY SIMULATOR</span>
          <h1>Run the company.</h1>
          <p>
            Every decision changes your cash, customers, and learning. Start
            with a small experiment, then inspect the consequence.
          </p>
        </div>
        <Link className="quiet-link" to="/">
          <RotateCcw size={16} /> Return to Atlas
        </Link>
      </div>

      <section className="hq-stats" aria-label="Company health">
        <Stat label="Cash" value={money(company.cash)} detail="virtual cash" />
        <Stat
          label="Runway"
          value={`${company.runwayMonths} mo`}
          detail="at current burn"
          tone={company.runwayMonths < 6 ? "warning" : ""}
        />
        <Stat
          label="Customers"
          value={company.customers}
          detail={`${company.conversionRate}% conversion`}
        />
        <Stat
          label="Morale"
          value={`${company.morale}/100`}
          detail={`${company.quality}/100 quality`}
        />
        <Stat
          label="Practice valuation"
          value={money(company.valuation)}
          detail="learning score, not a forecast"
          tone="highlight"
        />
      </section>

      <div className="hq-grid">
        <section className="hq-panel challenge-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow copper">MONTH {company.monthsElapsed + 1}</span>
              <h2>What do you do next?</h2>
            </div>
            <span className="hq-tag">DECIDE BEFORE THEORY</span>
          </div>
          <p>
            Three residents mention a recurring problem. You have not built
            anything yet. Choose the action that creates the strongest learning
            signal.
          </p>
          <div className="decision-grid">
            {DECISIONS.map((decision) => (
              <button
                className={`decision-card ${selectedDecision === decision.id ? "selected" : ""}`}
                key={decision.id}
                onClick={() => setSelectedDecision(decision.id)}
              >
                <span className="decision-number">
                  {String(DECISIONS.indexOf(decision) + 1).padStart(2, "0")}
                </span>
                <strong>{decision.label}</strong>
                <span>{decision.description}</span>
              </button>
            ))}
          </div>
          <button
            className="primary hq-commit"
            disabled={!selectedDecision}
            onClick={commitDecision}
          >
            Run decision <ArrowRight size={18} />
          </button>
          {consequence && (
            <div className="consequence-card" role="status">
              <span className="eyebrow copper">CONSEQUENCE RECORDED</span>
              <strong>{consequence.insight}</strong>
              <span>
                Your company state updated. Open the history after your next
                decision to compare the trade-offs.
              </span>
            </div>
          )}
        </section>

        <aside className="hq-side">
          <section className="hq-panel">
            <div className="panel-heading">
              <span className="eyebrow copper">NEXT MISSION</span>
              <CheckCircle2 size={20} />
            </div>
            <h3>Interview five customers</h3>
            <p>
              Ask about a recent episode, current workaround, and consequence.
              Do not pitch a solution.
            </p>
            <div className="mission-meta">
              <span>20 min</span>
              <span>Proof required</span>
            </div>
            <Link className="secondary-link" to="/mission/1">
              Open mission <ArrowRight size={16} />
            </Link>
          </section>
          <section className="hq-panel">
            <div className="panel-heading">
              <span className="eyebrow copper">WEAK SPOT</span>
              <CircleHelp size={20} />
            </div>
            <h3>{labels[company.weakSpot]}</h3>
            <p>
              Your next useful action should make this variable more
              observable, not just make the dashboard look better.
            </p>
          </section>
        </aside>
      </div>

      <section className="hq-progress">
        <div>
          <span className="eyebrow copper">LEARNING MAP</span>
          <h2>From first problem to pitch-ready.</h2>
        </div>
        <div className="module-row">
          {[
            "Find problems",
            "Know customers",
            "Validate ideas",
            "Build an MVP",
            "Price & money",
            "Grow",
            "Lead",
            "Pitch",
            "Scale",
          ].map((module, index) => (
            <div className={`module-node ${index === 0 ? "active" : ""}`} key={module}>
              <span>{index + 1}</span>
              <small>{module}</small>
            </div>
          ))}
        </div>
        <div className="hq-links">
          <Link to="/lab/persona">
            <Users size={17} /> Customer Persona Lab
          </Link>
          <Link to="/passport">
            <BookOpen size={17} /> Venture Passport
          </Link>
          <Link to="/lab/pricing">
            <Banknote size={17} /> Pricing Lab
          </Link>
        </div>
      </section>
    </main>
  );
}
