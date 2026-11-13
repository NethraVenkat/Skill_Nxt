import { useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { useLesson } from "../state/LessonProvider";
import { sound } from "./Audio";
export default function Timer({ id, label = "Session timer", quiet = false }) {
  const { state, dispatch } = useLesson();
  const t = state.timers[id];
  const previous = useRef(t.remaining);
  useEffect(() => {
    if (
      t.remaining !== previous.current &&
      t.remaining <= 10 &&
      t.started &&
      !(id === "storm" && t.remaining === 0)
    )
      sound(t.remaining === 0 ? "gavel" : "tick", state.audioEnabled);
    previous.current = t.remaining;
  }, [t.remaining, t.started, state.audioEnabled, id]);
  const command = (c) =>
    dispatch({ type: "TIMER", id, command: c, now: Date.now() });
  return (
    <div
      className={`timer ${quiet ? "quiet" : ""} ${t.remaining <= 10 && !quiet ? "urgent" : ""} ${t.remaining === 0 ? "ended" : ""}`}
    >
      <div className="timer-face">
        <span className="eyebrow">{label}</span>
        <strong role="timer" aria-label={`${t.remaining} seconds remaining`}>
          {String(Math.floor(t.remaining / 60)).padStart(2, "0")}
          <span>:</span>
          {String(t.remaining % 60).padStart(2, "0")}
        </strong>
        <span className="timer-caption" aria-live="polite">
          {t.remaining === 0
            ? id === "storm"
              ? "STOP! Pencils down."
              : "Time complete."
            : t.running
              ? "Make every second count."
              : t.started
                ? "Paused. Take a breath."
                : "Ready when you are."}
        </span>
      </div>
      <div className="timer-controls">
        <button
          disabled={t.remaining === 0}
          onClick={() => command(t.running ? "pause" : "start")}
        >
          {t.running ? <Pause size={16} /> : <Play size={16} />}{" "}
          {t.running ? "Pause" : t.started ? "Resume" : "Start"}
        </button>
        <button aria-label={`Reset ${label}`} onClick={() => command("reset")}>
          <RotateCcw size={16} /> Reset
        </button>
        <button disabled={t.remaining === 0} onClick={() => command("end")}>
          <SkipForward size={16} />
          {id === "storm" ? "End early" : "Skip"}
        </button>
      </div>
    </div>
  );
}
