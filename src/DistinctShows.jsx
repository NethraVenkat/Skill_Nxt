import { useState } from "react";
export const acts = [
  null,
  [
    "Choose your hook",
    "Build the opening",
    "Connect the ideas",
    "Test the opening",
    "Try a stronger version",
    "Share your opening",
  ],
  [
    "Enter the museum",
    "Build three clues",
    "Reveal clues slowly",
    "Make a guess",
    "Improve a clue",
    "Reveal & explain",
  ],
  [
    "Meet the pause",
    "Learn your rescue phrase",
    "Prepare a familiar talk",
    "Pause on purpose",
    "Recover and continue",
    "Reflect on recovery",
  ],
  [
    "Find a classroom problem",
    "Design your solution",
    "Who does it help?",
    "Pitch the invention",
    "Take a friendly question",
    "Refine your pitch",
  ],
  [
    "Choose your discovery",
    "Build your showcase card",
    "Choose your audience",
    "Rehearse your introduction",
    "Present your discovery",
    "Listen & reflect",
  ],
];
export default function DistinctShows({
  session,
  step,
  student,
  notes,
  setNotes,
  onSave,
}) {
  const [answers, setAnswers] = useState(["", "", ""]),
    [pick, setPick] = useState(""),
    [reveal, setReveal] = useState(0),
    [guess, setGuess] = useState(""),
    [paused, setPaused] = useState(false),
    [continued, setContinued] = useState(false),
    [feedback, setFeedback] = useState(""),
    [confirmed, setConfirmed] = useState(false),
    [saved, setSaved] = useState(false),
    [talkCue, setTalkCue] = useState(0);
  const cues = session===1 ? [answers[2] || answers[0],answers[1]] : answers.some(Boolean) ? answers : notes;
  const write = (i, value) =>
    setAnswers((v) => v.map((x, j) => (j === i ? value : x)));
  const field = (label, i, placeholder) => (
    <label>
      {label}
      <input
        value={answers[i]}
        maxLength={100}
        placeholder={placeholder}
        onChange={(e) => write(i, e.target.value)}
      />
    </label>
  );
  const cards = (items) => (
    <div className="distinct-cards">
      {items.map((x, i) => (
        <button
          key={x}
          className={pick === x ? "chosen" : ""}
          onClick={() => setPick(x)}
        >
          <span>0{i + 1}</span>
          <h2>{x}</h2>
        </button>
      ))}
    </div>
  );
  const talk = (prompt) => (
    <div className="distinct-talk">
      <span className="eyebrow">SPEAK TO A REAL LISTENER</span>
      <h2>{prompt}</h2>
      <p>
        {cues[Math.min(talkCue,cues.length-1)] || "Use your own paper reminder."}
      </p>
      <p>Glance at your cues. Then explain in your own words.</p>
      <div className="button-row"><button className="btn soft" disabled={!talkCue} onClick={()=>setTalkCue(v=>v-1)}>Previous cue</button><span>Idea {Math.min(talkCue,cues.length-1)+1} / {cues.length}</span><button className="btn soft" disabled={talkCue>=cues.length-1} onClick={()=>setTalkCue(v=>v+1)}>Next cue</button></div>
    </div>
  );
  let activity;
  if (session === 1) {
    activity = [
      <>
        {cards([
          "Ask a question",
          "Share a surprising fact",
          "Invite imagination",
        ])}
        <p className="bottom-prompt">
          Say one example of your chosen opening:{" "}
          {pick || "choose a style above"}.
        </p>
      </>,
      field("Write your opening", 0, "Did you know…? / Imagine…"),
      <>
        {field("Your first discovery idea", 1, "What will you explain next?")}
        <div className="distinct-talk">
          <h2>Connect the opening.</h2>
          <p>{answers[0] || "Say your opening, then explain your first discovery idea."}</p>
        </div>
      </>,
      talk("Does your opening make them curious?"),
      <>
        {field("Improve your opening", 2, "Use one helpful comment")}
        <p className="bottom-prompt">
          Say the first version, then the improved version. Ask which makes the
          message clearer.
        </p>
      </>,
      talk("Share your opening, then your discovery."),
    ][step];
  }
  if (session === 2) {
    activity = [
      <>
        {cards([
          "A classroom object",
          "Something from nature",
          "An everyday tool",
        ])}
        <p className="bottom-prompt">Choose an object. Keep its name secret.</p>
      </>,
      <div className="distinct-fields">
        {field("How it looks or feels", 0, "A short, useful clue")}
        {field("What it does", 1, "Its purpose")}
        {field("When we use it", 2, "An example")}
      </div>,
      <div className="clue-reveal">
        <h2>
          {reveal
            ? answers[reveal - 1] || "Tell your clue aloud."
            : "The mystery is waiting…"}
        </h2>
        <button
          className="btn"
          onClick={() => setReveal((v) => Math.min(3, v + 1))}
          disabled={reveal === 3}
        >
          Reveal clue {Math.min(3, reveal + 1)}
        </button>
        <p>Explain each clue before revealing another.</p>
      </div>,
      <label>
        Listener’s guess
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          maxLength={80}
          placeholder="What could the object be?"
        />
      </label>,
      <>
        {field(
          "Improve your clearest clue",
          0,
          "What detail would help the listener?",
        )}
        <p className="bottom-prompt">
          Which clue led to the guess? Explain why.
        </p>
      </>,
      talk("Reveal your object and explain the clues."),
    ][step];
  }
  if (session === 3) {
    activity = [
      <div className="distinct-talk">
        <h2>A pause is part of speaking.</h2>
        <p>
          Teacher: explain one fact, stop briefly, check your note, then
          continue. Students: notice what helped.
        </p>
      </div>,
      <>
        {cards([
          "My next idea is…",
          "Let me check my note…",
          "Here’s another detail…",
        ])}
        <p className="bottom-prompt">Practise your chosen phrase aloud.</p>
      </>,
      <div className="distinct-fields">
        {notes.map((n, i) => (
          <label key={i}>
            Reminder {i + 1}
            <input
              value={n}
              maxLength={70}
              onChange={(e) =>
                setNotes(notes.map((x, j) => (j === i ? e.target.value : x)))
              }
            />
          </label>
        ))}
      </div>,
      <div className="clue-reveal">
        <h2>
          {paused ? "Pause. Check your next note." : "Explain your first idea."}
        </h2>
        <button className="btn" onClick={() => setPaused(true)}>
          I’m ready for a planned pause
        </button>
        <p>No surprise interruptions. Practise with a partner.</p>
      </div>,
      <div className="clue-reveal">
        <h2>{pick || "My next idea is…"}</h2>
        <p>Use the phrase, explain your next reminder, and continue.</p>
        <label className="check">
          <input
            type="checkbox"
            checked={continued}
            onChange={(e) => setContinued(e.target.checked)}
          />{" "}
          I actually continued after the pause
        </label>
      </div>,
      <div className="distinct-talk">
        <h2>
          {continued
            ? "You practised continuing."
            : "Choose a supported repeat."}
        </h2>
        <p>
          Tell your partner what helped: the pause, your note, or the starting
          phrase.
        </p>
      </div>,
    ][step];
  }
  if (session === 4) {
    activity = [
      field("A problem in our classroom", 0, "Lost pencils? Untidy books?"),
      field("My invention and how it works", 1, "Explain a possible solution"),
      field("Who benefits, and how?", 2, "Who will your invention help?"),
      talk("Problem → solution → benefit"),
      <div className="question-card">
        <h2>“How would your invention work?”</h2>
        <p>
          A partner asks. Pause, then explain one practical detail. It’s okay to
          say you are still figuring it out.
        </p>
      </div>,
      talk("Use the question to improve your pitch."),
    ][step];
  }
  if (session === 5) {
    activity = [
      cards(["Animal discovery", "Mystery object", "Helpful invention"]),
      <div className="distinct-fields">
        {notes.map((n, i) => (
          <label key={i}>
            Idea {i + 1}
            <input
              value={n}
              maxLength={70}
              onChange={(e) =>
                setNotes(notes.map((x, j) => (j === i ? e.target.value : x)))
              }
            />
          </label>
        ))}
      </div>,
      cards([
        "One familiar listener",
        "A small group",
        "A supported stage turn",
      ]),
      field("My short introduction", 0, "I have a discovery to share…"),
      talk("Your discovery belongs in the spotlight."),
      <label>
        Listener: “One idea I remember…”
        <input
          value={feedback}
          maxLength={120}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Say it aloud, then optionally record it"
        />
      </label>,
    ][step];
  }
  return (
    <div className={"distinct-show mission-" + session}>
      <div className="lesson-top">
        <span className="eyebrow">
          {
            [
              "",
              "THE OPENING LAB",
              "MYSTERY MUSEUM",
              "THE RECOVERY STUDIO",
              "INVENTION WORKSHOP",
              "DISCOVERY SHOWCASE",
            ][session]
          }
        </span>
        <span className="timing">Activity {step + 1} of 6</span>
      </div>
      <h1 className="lesson-title">{acts[session][step]}</h1>
      <div className="distinct-activity">{activity}</div>
      {step === 5 && (
        <div className="distinct-record">
          <label className="check">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />{" "}
            {student.name} completed a real speaking attempt
          </label>
          <button
            className="btn"
            disabled={!confirmed || saved}
            onClick={() => {
              onSave({
                level: session===5 ? (pick==="A supported stage turn"?3:pick==="A small group"?2:0) : 0,
                recall: feedback || "Completed the section speaking task",
                feedback: "Choose one useful improvement for the next attempt",
                recovered: continued,
              });
              setSaved(true);
            }}
          >
            {saved ? "Attempt saved ✓" : "Save this attempt"}
          </button>
        </div>
      )}
    </div>
  );
}
