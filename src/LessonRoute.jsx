import { useState, useEffect } from "react";
import { lesson, stages, routes } from "./shared-lesson";
import EchoInteraction from "./EchoInteraction";
import ActivityWorkshop from "./ActivityWorkshop";
import "./echo-interaction.css";
const options = [
  "Amazing smell",
  "Scents humans miss",
  "Police find people",
  "Dogs have an amazing sense of smell.",
  "They can smell things humans cannot.",
  "Police use dogs to find missing people and objects.",
];
export default function LessonRoute({
  session,
  step,
  student,
  notes,
  setNotes,
  onSave,
  onGoal,
  onComplete,
  onPrint,
}) {
  const [view, setView] = useState("play");
  const [cue, setCue] = useState(0),
    [chosen, setChosen] = useState([]),
    [choice, setChoice] = useState(""),
    [listener, setListener] = useState(""),
    [recall, setRecall] = useState(""),
    [feedback, setFeedback] = useState(""),
    [support, setSupport] = useState("Independent"),
    [confirmed, setConfirmed] = useState(false),
    [saved, setSaved] = useState({}),
    [rescue, setRescue] = useState(false),
    [recovered, setRecovered] = useState(false),
    [stageSupport, setStageSupport] = useState("Buddy beside me"),
    [playing, setPlaying] = useState(false);
  useEffect(() => {
    setView("play");
    setCue(0);
    setChoice("");
    setRescue(false);
    setConfirmed(false);
    setRecovered(false);
    window.speechSynthesis?.cancel();
    setPlaying(false);
  }, [step]);
  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  const route = routes[session],
    detective = session === 1,
    buddy = session === 2,
    ready = notes.every((n) => n.trim());
  function audio(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (playing) {
      setPlaying(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.88;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(u);
  }
  const button = (text, fn, disabled = false) => (
    <button className="btn" onClick={fn} disabled={disabled}>
      {text}
    </button>
  );
  const prompt = (text) => <p className="route-prompt">{text}</p>;
  const choices = (items) => (
    <div className={"route-choices choices-" + items.length}>
      {items.map((item, i) => (
        <button
          key={item}
          className={choice === item ? "selected" : ""}
          aria-pressed={choice === item}
          onClick={() => setChoice(item)}
        >
          <span>0{i + 1}</span>
          <strong>{item}</strong>
        </button>
      ))}
    </div>
  );
  const cueControls = (length = 3) => (
    <div className="route-cue-controls">
      <button
        className="btn soft"
        disabled={!cue}
        onClick={() => setCue(cue - 1)}
      >
        ← Previous cue
      </button>
      <span>
        {cue + 1} / {length}
      </span>
      <button
        className="btn soft"
        disabled={cue >= length - 1}
        onClick={() => setCue(cue + 1)}
      >
        Next cue →
      </button>
    </div>
  );
  function record(kind) {
    if (saved[kind]) return;
    onSave({
      attempt: kind === "retry" ? 2 : kind === "stage" ? 3 : 1,
      level: kind === "stage" ? (stageSupport === "Independent" ? 4 : 3) : 0,
      listener:
        kind === "stage"
          ? "Classroom audience"
          : listener || "Classroom partner",
      recall:
        kind === "stage"
          ? "Stage turn completed"
          : recall || "Partner explanation completed",
      feedback: feedback || "Practise explaining the next idea clearly",
      support: kind === "stage" ? stageSupport : support,
      clarity: "Teacher observation required",
      recovered,
      lessonId: lesson.id,
    });
    setSaved((v) => ({ ...v, [kind]: true }));
  }
  const speaking = (label) => (
    <>
      <div className="route-stage">
        <span className="eyebrow">{label}</span>
        <h2>{notes[cue] || "Use your own paper note card."}</h2>
        <p>
          Glance at the note. Look toward listeners. Explain in your own words.
        </p>
      </div>
      {cueControls()}
      <div className="button-row">
        <button className="btn soft" onClick={() => setRescue(!rescue)}>
          Help me continue
        </button>
        {rescue && (
          <span className="rescue-inline">
            Pause. Breathe comfortably. “My next idea is…”
          </span>
        )}
      </div>
      {rescue && (
        <label className="check">
          <input
            type="checkbox"
            checked={recovered}
            onChange={(e) => setRecovered(e.target.checked)}
          />{" "}
          I paused and continued
        </label>
      )}
    </>
  );
  let content;
  switch (step) {
    case 0:
      content = (
        <div className="route-intro">
          <img src="/art/echo-character.png" alt="Echo welcomes your voice" />
          <div>
            <h2>{route.tag}</h2>
            <p>{route.description}</p>
            <p className="route-prompt">
              Same lesson. Same animal facts. A different way to learn.
            </p>
            <span className="eyebrow">
              30-MINUTE CORE + 5 MINUTES FOR TRANSITIONS
            </span>
          </div>
        </div>
      );
      break;
    case 1:
      content = (
        <>
          {choices(
            detective
              ? [
                  "Listen for a stiff reading",
                  "Listen for a friendly explanation",
                ]
              : buddy
                ? ["Partner A: funny robot", "Partner B: friendly voice"]
                : ["Hear Echo’s stiff reading", "Try it like a friend"],
          )}
          <div className="route-panel">
            <h2>“The. Cat. Sat. On. The. Mat.”</h2>
            {button(playing ? "Stop audio" : "Hear the example", () =>
              audio("The. Cat. Sat. On. The. Mat."),
            )}
          </div>
          {prompt(
            detective
              ? "What did you notice? Say one difference aloud."
              : buddy
                ? "Take turns saying the same sentence. Change your delivery, not the message."
                : "Teacher: model both voices. Students: try a natural explanation.",
          )}
        </>
      );
      break;
    case 2:
      content = (
        <>
          {choices([
            "See the difference",
            "Make three notes",
            "Practise talking",
            "Show a partner",
          ])}
          {prompt(
            buddy
              ? "Each partner explains one step to the other. Then swap."
              : detective
                ? "Choose the step where you practise speaking. Tell us why it matters."
                : "Point to each step as your teacher explains today’s mission.",
          )}
        </>
      );
      break;
    case 3:
      content = buddy ? (
        <>
          <div className="route-panel">
            <span className="eyebrow">
              {cue === 0
                ? "PARTNER A · READING ROLE"
                : "PARTNER B · FRIENDLY EXPLANATION"}
            </span>
            <h2>{cue === 0 ? lesson.formal : lesson.natural}</h2>
          </div>
          {cueControls(2)}
          {prompt(
            "Perform the same message in two ways. Switch the roles and explain what changed.",
          )}
        </>
      ) : (
        <>
          {choices([lesson.formal, lesson.natural])}
          {!detective &&
            button(playing ? "Stop example" : "Hear the selected version", () =>
              audio(choice || lesson.formal),
            )}
          {prompt(
            detective
              ? "Choose the conversational version. Point to a word or phrase that supports your choice."
              : "Teacher demonstrates both. Which sounded more natural, and why?",
          )}
          {choice && (
            <p className="route-feedback">
              Explain what helped you follow the same message.
            </p>
          )}
        </>
      );
      break;
    case 4:
      content = (
        <>
          <p className="route-source">{lesson.cats}</p>
          {detective ? (
            choices([
              "A full paragraph",
              "Three short reminders",
              "A memorised script",
            ])
          ) : (
            <div className="route-three">
              {lesson.catNotes.map((n, i) => (
                <div key={n}>
                  <span>0{i + 1}</span>
                  <h2>{n}</h2>
                </div>
              ))}
            </div>
          )}
          {prompt(
            detective
              ? "Which tool helps you remember without reading word for word? Name the three cat ideas."
              : buddy
                ? "Share the three ideas between partners. Each explains why their note is short."
                : "Read → find three big ideas → write 3–4 words each.",
          )}
        </>
      );
      break;
    case 5:
      content = (
        <>
          <div className="route-stage">
            <span className="eyebrow">SHORT NOTE</span>
            <h2>{lesson.catNotes[cue]}</h2>
          </div>
          {detective ? (
            choices([lesson.catNotes[cue], lesson.catSpeech[cue]])
          ) : (
            <p className="route-source">{lesson.catSpeech[cue]}</p>
          )}
          {cueControls()}
          {prompt(
            detective
              ? "Which is the reminder, and which is the spoken explanation? Say your own explanation."
              : buddy
                ? "One partner gives the cue; the other expands it. Switch with the next cue."
                : "A note is not the speech. Explain this idea in your own words.",
          )}
        </>
      );
      break;
    case 6:
      content = (
        <>
          <div className="route-model">
            <span className="eyebrow">{lesson.butterflyNotes[cue]}</span>
            <h2>{lesson.butterflySpeech[cue]}</h2>
          </div>
          {cueControls()}
          {button(playing ? "Stop example" : "Hear the whole model", () =>
            audio(lesson.butterflySpeech.join(" ")),
          )}
          {prompt(
            detective
              ? "Listen, then find which note matches the idea you heard."
              : buddy
                ? "Watch the teacher first. Partners then take turns explaining one reminder."
                : "Teacher: highlight each note while you explain. Students notice the glance, then look up.",
          )}
        </>
      );
      break;
    case 7:
      content = (
        <>
          <p className="route-source">{lesson.dog}</p>
          {detective
            ? choices(lesson.dogIdeas)
            : buddy
              ? choices([
                  "A reads the paragraph",
                  "B recalls an idea",
                  "Switch and check together",
                ])
              : button(playing ? "Stop reading" : "Read along with Echo", () =>
                  audio(lesson.dog),
                )}
          {prompt(
            detective
              ? "Find the sentence that supports your chosen idea. Explain the connection."
              : buddy
                ? "Read together, then recall the same three ideas without adding new facts."
                : "Read for meaning. Find the three ideas you want your listener to remember.",
          )}
        </>
      );
      break;
    case 8:
      content = detective ? (
        <>
          <div className="note-choice-grid">
            {options.map((n, i) => (
              <button
                key={n}
                className={chosen.includes(i) ? "selected" : ""}
                onClick={() => {
                  const next = chosen.includes(i)
                    ? chosen.filter((x) => x !== i)
                    : chosen.length < 3
                      ? [...chosen, i]
                      : chosen;
                  setChosen(next);
                  setNotes(
                    next
                      .map((x) => options[x])
                      .concat(["", "", ""])
                      .slice(0, 3),
                  );
                }}
              >
                {n}
              </button>
            ))}
          </div>
          {prompt(
            "Choose three short reminders. Full sentences are scripts; can you shorten them?",
          )}
          {chosen.some((i) => i >= 3) && (
            <p className="route-feedback">
              You selected a full sentence. Try the shorter reminder for that
              same idea.
            </p>
          )}
        </>
      ) : buddy ? (
        <>
          <div className="route-panel">
            <label>
              Build reminder {cue + 1} together
              <input
                aria-label={"Note " + (cue + 1)}
                value={notes[cue]}
                maxLength={70}
                placeholder={lesson.dogIdeas[cue]}
                onChange={(e) =>
                  setNotes(
                    notes.map((n, i) => (i === cue ? e.target.value : n)),
                  )
                }
              />
            </label>
          </div>
          {cueControls()}
          {prompt(
            "One partner names the idea. The other shortens it. Switch roles for the next reminder.",
          )}
        </>
      ) : (
        <div className="route-note-fields">
          {notes.map((n, i) => (
            <label key={i}>
              Reminder {i + 1}
              <input
                aria-label={"Note " + (i + 1)}
                value={n}
                maxLength={70}
                placeholder={lesson.dogIdeas[i]}
                onChange={(e) =>
                  setNotes(notes.map((x, j) => (i === j ? e.target.value : x)))
                }
              />
              <small>
                {n.trim().split(/\s+/).filter(Boolean).length} words · aim for
                3–4
              </small>
            </label>
          ))}
        </div>
      );
      break;
    case 9:
      content = (
        <>
          <label>
            Your real listener
            <input
              value={listener}
              maxLength={60}
              onChange={(e) => setListener(e.target.value)}
              placeholder="A partner’s name, or ‘my partner’"
            />
          </label>
          {choices(
            buddy
              ? ["Speaker: explain the ideas", "Coach: listen and help"]
              : detective
                ? ["Listen for natural speech", "Listen for the three ideas"]
                : ["A speaks first", "B listens, then speaks"],
          )}
          {prompt(
            "Both partners use their own notes or paper cards. About one minute each; the whole partner block shares six minutes.",
          )}
          {!ready && (
            <p className="route-feedback">
              Use paper cards, or go Back to complete your three reminders.
            </p>
          )}
        </>
      );
      break;
    case 10:
      content = (
        <>
          {speaking(buddy ? "PARTNER A · PRESENTER" : "PARTNER A SPEAKS")}
          {prompt(
            detective
              ? "Partner B: listen for three ideas and note a clue that sounded natural."
              : buddy
                ? "Coach listens quietly. Offer help only if the presenter asks."
                : "Partner B listens for the main message.",
          )}
        </>
      );
      break;
    case 11:
      content = (
        <>
          {speaking(
            buddy ? "PARTNER B · PRESENTER" : "SWITCH ROLES · PARTNER B SPEAKS",
          )}
          {prompt(
            "Partner B uses their own notes. Partner A listens. Select the correct presenter profile before saving observations.",
          )}
        </>
      );
      break;
    case 12:
      content = (
        <>
          <div className="route-feedback-fields">
            <label>
              Listener: “I learned…”
              <input
                value={recall}
                maxLength={120}
                onChange={(e) => setRecall(e.target.value)}
                placeholder="One idea you remember"
              />
            </label>
            <label>
              Listener: “Next time, try…”
              <input
                value={feedback}
                maxLength={120}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="One kind, specific comment"
              />
            </label>
            <label>
              Support used
              <select
                value={support}
                onChange={(e) => setSupport(e.target.value)}
              >
                <option>Independent</option>
                <option>Buddy beside me</option>
                <option>Teacher prompts</option>
              </select>
            </label>
          </div>
          {prompt(
            detective
              ? "Use evidence: “Your explanation helped me understand…”"
              : buddy
                ? "Coach gives one useful comment, then hands the role back to the presenter."
                : "Partners discuss aloud. The teacher can record the observation.",
          )}
          <label className="check">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />{" "}
            These observations are for {student.name}, who actually spoke
          </label>
          {button(
            saved.first ? "Attempt saved ✓" : "Save first attempt",
            () => record("first"),
            !confirmed || !recall.trim() || !feedback.trim() || saved.first,
          )}
        </>
      );
      break;
    case 13:
      content = (
        <>
          {speaking("USE ONE HELPFUL COMMENT")}
          {prompt(
            feedback ||
              "Choose one small improvement with your listener, then repeat the same message.",
          )}
          <label className="check">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />{" "}
            The repeat has happened
          </label>
          {button(
            saved.retry ? "Repeat saved ✓" : "Save second attempt",
            () => record("retry"),
            !confirmed || !saved.first || saved.retry,
          )}
        </>
      );
      break;
    case 14:
      content = (
        <>
          {speaking("TWO VOLUNTEERS · WHOLE-CLASS SHOWCASE")}
          <select
            aria-label="Stage support"
            value={stageSupport}
            onChange={(e) => setStageSupport(e.target.value)}
          >
            <option>Buddy beside me</option>
            <option>Teacher prompts</option>
            <option>Independent</option>
          </select>
          <label className="check">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />{" "}
            This presenter completed a stage turn
          </label>
          {button(
            saved.stage ? "Stage turn saved ✓" : "Save stage turn",
            () => record("stage"),
            !confirmed || saved.stage,
          )}
        </>
      );
      break;
    case 15:
      content = (
        <>
          {choices(
            detective
              ? ["Which idea reached you?", "What helped you understand?"]
              : buddy
                ? ["Audience: recall an idea", "Coach: celebrate the attempt"]
                : ["One idea I remember…", "One clear explanation…"],
          )}
          {prompt(
            "Say your response aloud. Give every presenter the same respectful celebration. Feedback is about the message, not the person.",
          )}
        </>
      );
      break;
    case 16:
      content = (
        <div className="route-habits">
          {lesson.habits.map((h, i) => (
            <div key={h}>
              <span>0{i + 1}</span>
              <strong>{h}</strong>
            </div>
          ))}
          {prompt(
            detective
              ? "Find an example from today for each habit."
              : buddy
                ? "Each partner explains two habits, then switch."
                : "Teacher leads the recap: notes, look up, natural speech, helpful listening.",
          )}
        </div>
      );
      break;
    case 17:
      content = (
        <>
          <label>
            My next small goal
            <input
              value={student.goal}
              maxLength={100}
              onChange={(e) => onGoal(e.target.value)}
            />
          </label>
          <div className="route-panel">
            <span className="eyebrow">NEXT CLASS</span>
            <h2>{lesson.next}</h2>
            <p>
              We will learn how to make people want to listen from the first
              sentence.
            </p>
          </div>
          {button("Complete this teaching route ✓", onComplete)}
          {prompt(
            "A completed lesson is not a confidence score. Choose a manageable next speaking step with your teacher.",
          )}
        </>
      );
      break;
  }
  return (
    <section className={"lesson-route route-" + route.id}>
      <header className="route-heading">
      <div className="route-heading-copy">
      <div className="lesson-top">
        <span className="eyebrow">{route.title}</span>
        <span className="timing">{stages[step].group}</span>
      </div>
      <h1 className="lesson-title">{stages[step].title}</h1>
      </div>
      <EchoInteraction step={step}/>
      </header>
      <nav className="lesson-view-tabs" aria-label="Activity view">
        <button aria-pressed={view === "play"} onClick={() => setView("play")}>Play & practise ✦</button>
        <button aria-pressed={view === "lesson"} onClick={() => setView("lesson")}>{[12,13,14].includes(step) ? "Lesson & save attempt" : "Lesson & notes"}</button>
      </nav>
      {view === "play" ? <ActivityWorkshop step={step} notes={notes} setNotes={setNotes} onGoal={onGoal} onComplete={onComplete}/> : <div className="route-content">{content}</div>}
      {step === 8 && view === "lesson" && (
        <button className="btn soft route-print" onClick={onPrint}>
          Print my reminders
        </button>
      )}
    </section>
  );
}
