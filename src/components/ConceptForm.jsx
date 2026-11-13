import { Check, UserRound, Search, Wrench } from "lucide-react";
import { filters } from "../data/lessonContent";
export default function ConceptForm({
  concept,
  onChange,
  prefix = "concept",
  paper = false,
  withFilters = false,
}) {
  const update = (key, value) => onChange({ ...concept, [key]: value });
  return (
    <div className={`concept-form ${paper ? "paper" : ""}`}>
      <label className="name-field" htmlFor={`${prefix}-name`}>
        <span>CONCEPT NAME</span>
        <input
          id={`${prefix}-name`}
          value={concept.name}
          placeholder="Give your idea a name"
          maxLength={70}
          onChange={(e) => update("name", e.target.value)}
        />
      </label>
      <div className="modules">
        {[
          ["who", "WHO", "Who has the problem?", UserRound],
          ["what", "WHAT", "What is the problem?", Search],
          ["how", "HOW", "How will you solve it?", Wrench],
        ].map(([key, title, placeholder, Icon]) => (
          <label
            className={`module ${concept[key].trim() ? "connected" : ""}`}
            key={key}
            htmlFor={`${prefix}-${key}`}
          >
            <span className="module-label">
              <Icon size={18} />
              {title}
              {concept[key].trim() && <Check size={16} />}
            </span>
            <textarea
              id={`${prefix}-${key}`}
              value={concept[key]}
              rows={3}
              maxLength={300}
              placeholder={placeholder}
              onChange={(e) => update(key, e.target.value)}
            />
          </label>
        ))}
      </div>
      {withFilters && (
        <fieldset className="filter-checks">
          <legend>Test your concept</legend>
          {filters.map((f, i) => (
            <label key={f}>
              <input
                type="checkbox"
                checked={concept.filters[i]}
                onChange={(e) =>
                  update(
                    "filters",
                    concept.filters.map((v, j) =>
                      j === i ? e.target.checked : v,
                    ),
                  )
                }
              />
              <span>{f}</span>
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
}
