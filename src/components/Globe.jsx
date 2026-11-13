import { Flag } from "lucide-react";
import { useLesson } from "../state/LessonProvider";
export default function Globe({ interactive = false, compact = false }) {
  const { state, set } = useLesson();
  return (
    <div className={`globe-stage rendered-globe ${compact ? "small" : ""}`}>
      <div className="globe-object">
        <img
          src="/art/globe.webp"
          alt={`Venture globe with ${state.globeFlags.length} concept flags, in its copper mechanical mount`}
        />
        {state.globeFlags.map((f, i) => (
          <div
            key={f.id}
            className="globe-flag"
            style={{
              left: `${26 + ((i * 19) % 48)}%`,
              top: `${18 + ((i * 17) % 44)}%`,
            }}
            title={f.label}
          >
            <Flag size={24} fill="currentColor" />
            <span>{f.label}</span>
          </div>
        ))}
      </div>
      <div className="globe-readout">
        {String(state.globeFlags.length).padStart(2, "0")} FLAGS PLANTED{" "}
        <span>•</span> ENDLESS POSSIBILITIES
      </div>
      {interactive && (
        <button
          className={`globe-pin ${state.reserved ? "reserved" : ""}`}
          onClick={() => set("reserved", true)}
        >
          <Flag size={18} />
          {state.reserved ? "Your place is reserved" : "Your idea goes here"}
        </button>
      )}
    </div>
  );
}
