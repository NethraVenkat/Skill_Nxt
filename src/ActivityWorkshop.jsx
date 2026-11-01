import { useState, useEffect } from "react";
import { lesson } from "./shared-lesson";
import "./activity-workshop.css";

const missions = [
  ["reveal", "Open your voice passport", "Tap a ticket. Try its tiny speaking challenge.", ["Say hello to your partner", "Explain what a reminder does", "Choose a buddy or teacher for support"]],
  ["compare", "Echo’s voice mixer", "Perform the sentence in both styles. Keep the message the same.", ["Robot voice", "Friendly voice"]],
  ["sequence", "Build the mission trail", "Tap the steps in the order you will use them.", ["See the difference", "Make three notes", "Practise talking", "Show a partner"]],
  ["compare", "Two deliveries. One message.", "Listen to the versions, then explain which sounds like a conversation.", [lesson.formal, lesson.natural]],
  ["match", "Unlock the cat clues", "Choose a short reminder, then match its explanation.", lesson.catNotes, lesson.catSpeech],
  ["reveal", "Make a tiny note speak", "Tap a reminder. Read its model, hide it, then explain it your way.", lesson.catNotes, lesson.catSpeech],
  ["sequence", "Follow the butterfly change", "Put the reminders in order. Explain each change to your listener.", lesson.butterflyNotes, lesson.butterflySpeech],
  ["reveal", "Dog discovery windows", "Read the paragraph. Open each window to find its idea.", lesson.dogIdeas, lesson.dog.split(". ").map(x=>x.replace(/\.$/,"")+".")],
  ["match", "Cue or full script?", "Match a compact reminder with the idea it helps you explain.", lesson.dogIdeas, lesson.dog.split(". ").map(x=>x.replace(/\.$/,"")+".")],
  ["role", "Set up your mini broadcast", "Tap a role to see its job. Both partners get a turn.", ["Speaker", "Listener", "Switch roles"]],
  ["rehearse", "Partner A’s cue spotlight", "Reveal one note, hide it, then look toward your partner and explain."],
  ["rehearse", "Partner B takes the microphone", "Switch roles. Use your own reminders to explain the same three ideas."],
  ["feedback", "Build a helpful comment", "Choose a comment. Say what makes it useful, then add your own detail.", ["I learned that dogs can notice smells humans miss.", "Next time, explain your last idea a little more.", "You are bad at speaking."]],
  ["rehearse", "Try the message again", "Choose one improvement. Repeat your actual talk to your listener."],
  ["role", "Your supported stage entrance", "Pick support and practise your first step toward the audience.", ["Buddy beside me", "Teacher prompts", "Independent"]],
  ["reveal", "Audience listening windows", "Open a window after a real presenter speaks. Respond aloud.", ["Remember an idea", "Notice a clear explanation", "Celebrate the attempt"], ["One idea I remember is…", "Your explanation helped me understand…", "Thank you for sharing your ideas with us."]],
  ["reveal", "The four habit spotlights", "Reveal each habit. Give an example from today.", ["Reading", "Reminders", "Looking up", "Natural voice"], lesson.habits],
  ["goal", "Pack your next speaking step", "Choose one manageable goal. Tell your teacher how you will practise it.", ["Make three short notes", "Glance, look up, explain", "Talk like I’m telling a friend"]],
];

export default function ActivityWorkshop({ step, notes, setNotes, onGoal, onComplete }) {
  const [selected, setSelected] = useState(-1), [answer, setAnswer] = useState(-1), [trail, setTrail] = useState([]), [hidden, setHidden] = useState(false), [done, setDone] = useState(false);
  useEffect(()=>{setSelected(-1);setAnswer(-1);setTrail([]);setHidden(false);setDone(false);window.speechSynthesis?.cancel();},[step]);
  useEffect(()=>()=>window.speechSynthesis?.cancel(),[]);
  const [type,title,instruction,items=[],models=[]] = missions[step];
  const speak = text => { if(!window.speechSynthesis)return; window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text);u.rate=.85;window.speechSynthesis.speak(u); };
  const cards = (values, action) => <div className="workshop-cards">{values.map((value,i)=><button key={value} aria-pressed={selected===i} className={selected===i?"selected":""} onClick={()=>action(i)}><span>{["✦","✧","◈","✺"][i%4]}</span><strong>{value}</strong></button>)}</div>;
  return <div className={"activity-workshop workshop-"+type}>
    <div className="workshop-intro"><span className="eyebrow">HANDS-ON MISSION</span><h2>{title}</h2><p>{instruction}</p></div>
    {step===7 && <p className="workshop-source">{lesson.dog}</p>}
    {type==="reveal" && <>{cards(items,i=>{setSelected(i);setHidden(false);})}{selected>=0&&<div className="workshop-result"><p>{hidden?"Your turn: explain the idea without the model.":models[selected]||items[selected]}</p>{models.length>0&&<button className="btn soft" onClick={()=>setHidden(!hidden)}>{hidden?"Show model":"Hide model & explain"}</button>}</div>}</>}
    {type==="compare"&&<>{cards(items,i=>{setSelected(i);speak(step===1?(i===0?"The. Cat. Sat. On. The. Mat.":"The cat sat on the mat!"):items[i]);})}<div className="workshop-result"><p>{selected<0?"Choose a version to hear or perform.":selected===0?"Try the second delivery next. What changed in the way it was shared?":"Tell a listener what made this delivery feel conversational."}</p><span>Teacher or partners can perform both versions. Audio is an optional model.</span></div></>}
    {type==="sequence"&&<><div className="workshop-cards">{[...items.keys()].reverse().map(i=><button key={items[i]} disabled={trail.includes(i)} onClick={()=>{setSelected(i);if(i===trail.length){setTrail([...trail,i]);setAnswer(1);}else setAnswer(0);}}><span>{trail.includes(i)?"✓":"✦"}</span><strong>{items[i]}</strong></button>)}</div><div className="workshop-result" role="status"><p>{trail.length===items.length?"Trail complete. Explain the steps aloud.":answer===0?"Try another step. What happens first, then next?":`${trail.length} of ${items.length} steps placed. Choose the next one.`}</p>{trail.length>0&&<span>{trail.map(i=>models[i]||items[i]).join(" → ")}</span>}<button className="btn soft" onClick={()=>{setTrail([]);setAnswer(-1);}}>Start trail again</button></div></>}
    {type==="match"&&<><div className="workshop-match"><div>{cards(items,i=>{setSelected(i);setAnswer(-1);})}</div><div className="workshop-answers">{[...models.keys()].reverse().map(i=><button key={models[i]} disabled={selected<0} onClick={()=>{setAnswer(i);if(step===8&&i===selected)setNotes(notes.map((n,j)=>j===selected?items[selected]:n));}}>{models[i]}</button>)}</div></div><p className="workshop-status" role="status">{selected<0?"First choose a reminder on the left.":answer<0?"Now choose its explanation.":answer===selected?(step===8?"Reminder added to your notes. Match all three, then explain them your way.":"Matched! Hide the words with your hand and explain the idea yourself."):"Look again: which explanation contains the same idea?"}</p></>}
    {type==="role"&&<>{cards(items,i=>setSelected(i))}{selected>=0&&<div className="workshop-result"><p>{step===14?`Your choice: ${items[selected]}. Bring your reminders, pause comfortably, then explain one idea.`:["Glance at a note, look toward your listener, then explain.","Listen quietly. Remember one idea and offer one helpful comment.","Hand the speaking turn to your partner. Use their own notes."][selected]}</p><button className="btn soft" onClick={()=>setDone(!done)}>{done?"Practised together ✓":"We practised this role"}</button></div>}</>}
    {type==="rehearse"&&<><div className="workshop-cards">{(notes.every(n=>n.trim())?notes:lesson.dogIdeas).map((n,i)=><button key={i} onClick={()=>{setSelected(i);setHidden(false);}}><span>{i+1}</span><strong>{selected===i&&!hidden?n:"Reveal this reminder"}</strong></button>)}</div><div className="workshop-result"><p>{selected<0?"Choose a reminder to start your real speaking turn.":hidden?"Look toward your listener. Explain the reminder in your own words.":"Glance at the reminder, then hide it when you are ready."}</p><div className="button-row"><button className="btn soft" disabled={selected<0} onClick={()=>setHidden(!hidden)}>{hidden?"Peek at reminder":"Hide reminder"}</button><button className="btn soft" onClick={()=>setDone(!done)}>{done?"Pause. Breathe. “My next idea is…”":"I need a gentle prompt"}</button></div></div></>}
    {type==="feedback"&&<>{cards(items,i=>setSelected(i))}<p className="workshop-status" role="status">{selected<0?"Which comment helps the presenter learn?":selected===2?"That judges the person. Try a kind comment about the message or a specific next step.":"A useful comment. Now make it specific to the talk you actually heard."}</p></>}
    {type==="goal"&&<>{cards(items,i=>{setSelected(i);onGoal(items[i]);})}<div className="workshop-result"><p>{selected<0?"Pick a goal, or write your own on the Lesson & notes tab.":`My practice plan: ${items[selected]}. Tell your teacher when you will try it.`}</p><span>Next class: {lesson.next}</span><button className="btn" onClick={onComplete}>Complete this teaching route ✓</button></div></>}
  </div>;
}
