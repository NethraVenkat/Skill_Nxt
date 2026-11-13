import { useEffect, useRef, useState } from "react";
import { Trophy, Check, Gavel, LockKeyhole } from "lucide-react";
import { useLesson } from "../state/LessonProvider";
import { stats } from "../state/lessonReducer";
import Globe from "../components/Globe";
import { sound } from "../components/Audio";
export default function Finale() {
  const { state, set } = useLesson();
  const [blackout, setBlackout] = useState(false);
  const revealTimer = useRef(null);
  const doors = useRef(null);
  useEffect(() => () => clearTimeout(revealTimer.current), []);
  const calculated = stats(state);
  const confirmed = state.statsConfirmed;
  function answer(ok) {
    if (ok) {
      set("recap", true);
      if (state.auctionOpen) return;
      setBlackout(true);
      doors.current?.scrollIntoView({ behavior: "instant", block: "center" });
      revealTimer.current = setTimeout(() => {
        setBlackout(false);
        sound("gavel", state.audioEnabled);
        set("auctionOpen", true);
      }, 400);
    } else set("recap", "try");
  }
  return (
    <div className={`finale ${state.auctionOpen ? "auction-unlocked" : ""}`}>
      {blackout && <div className="finale-blackout" aria-hidden="true" />}
      <div className="finale-main">
        <div>
          <span className="eyebrow copper">THE WORLD LOOKS DIFFERENT NOW</span>
          <h2>
            Look at
            <br />
            <em>your map.</em>
          </h2>
          <p>
            Those flags are your ideas.
            <br />
            And this is only the beginning.
          </p>
          <div className="class-stats">
            <label>
              Concepts generated
              <input
                aria-label="Concepts generated"
                type="number"
                min="0"
                max="9999"
                placeholder={String(calculated.generated)}
                value={state.classStats.generated}
                onChange={(e) => {
                  set("classStats", (s) => ({
                    ...s,
                    generated:
                      e.target.value === ""
                        ? ""
                        : Math.max(
                            0,
                            Math.min(9999, Math.floor(Number(e.target.value))),
                          ),
                  }));
                  set("statsConfirmed", false);
                }}
              />
            </label>
            <label>
              Passing all 4 filters
              <input
                aria-label="Concepts passing all four filters"
                type="number"
                min="0"
                max="9999"
                placeholder={String(calculated.passing)}
                value={state.classStats.passing}
                onChange={(e) => {
                  set("classStats", (s) => ({
                    ...s,
                    passing:
                      e.target.value === ""
                        ? ""
                        : Math.max(
                            0,
                            Math.min(9999, Math.floor(Number(e.target.value))),
                          ),
                  }));
                  set("statsConfirmed", false);
                }}
              />
            </label>
            <label className="best-pitch">
              <Trophy size={17} /> Best pitch of the day
              <input
                value={state.classStats.bestPitch}
                maxLength={70}
                placeholder="Celebrate a student or pair"
                onChange={(e) => {
                  set("classStats", (s) => ({
                    ...s,
                    bestPitch: e.target.value,
                  }));
                  set("statsConfirmed", false);
                }}
              />
            </label>
          </div>
          <p className="stats-note">
            Suggested totals use unique complete concepts saved here. Include
            paper work by editing the totals.
          </p>
          <button
            onClick={() => {
              set("classStats", (s) => ({
                ...s,
                generated:
                  s.generated === "" ? calculated.generated : s.generated,
                passing: s.passing === "" ? calculated.passing : s.passing,
              }));
              set("statsConfirmed", true);
            }}
            disabled={
              Number(
                state.classStats.passing === ""
                  ? calculated.passing
                  : state.classStats.passing,
              ) >
              Number(
                state.classStats.generated === ""
                  ? calculated.generated
                  : state.classStats.generated,
              )
            }
          >
            <Check size={16} />
            {confirmed ? "Class totals confirmed" : "Confirm classroom totals"}
          </button>
        </div>
        <Globe />
      </div>
      <div className="recap">
        <span className="eyebrow">ONE LAST QUESTION</span>
        <h3>
          What’s the ONE thing you need
          <br />
          before building a business?
        </h3>
        <div>
          <button onClick={() => answer(false)}>An expensive product</button>
          <button onClick={() => answer(true)}>
            A real problem / someone who has it
          </button>
          <button onClick={() => answer(false)}>A perfect logo</button>
        </div>
        {state.recap === "try" && (
          <p role="status">Go back to the beginning: WHO needs your help?</p>
        )}
      </div>
      <div
        ref={doors}
        className={`auction-doors ${state.auctionOpen ? "open" : ""}`}
      >
        <div className="auction-door left-door" />
        <div className="auction-door right-door" />
        <div className="auction-content">
          {state.auctionOpen ? (
            <>
              <Gavel size={36} />
              <span className="eyebrow">NEXT CLASS / 02</span>
              <h2>
                The Idea
                <br />
                <em>Auction.</em>
              </h2>
              <p>
                The map is filling up.
                <br />
                Class 2 — we auction!
              </p>
              <span className="auction-reminder">
                BRING YOUR THREE-CONCEPT LIST.
              </span>
            </>
          ) : (
            <>
              <LockKeyhole size={28} />
              <span className="eyebrow">AUCTION HALL</span>
              <p>Your next chapter waits behind these doors.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
