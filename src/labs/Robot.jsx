import gsap from 'gsap'
import { useRef, useState } from 'react'
import { Code } from '../lessons/kit'

/**
 * Train Your Robot. A blank training bot knows nothing. The learner fills a profile dictionary and
 * feeds it in; the bot reads the values with nested access and greets the person by name.
 */
function Bot({ state }) {
  return (
    <svg viewBox="0 0 220 260" className="bot" data-state={state} aria-hidden="true">
      <rect x="104" y="10" width="12" height="30" rx="6" fill="#9fb0cc" />
      <circle cx="110" cy="10" r="10" className="bot__beacon" />
      <rect x="30" y="38" width="160" height="120" rx="34" fill="#e9eef7" stroke="#14213d" strokeWidth="5" />
      <rect x="50" y="58" width="120" height="78" rx="22" fill="#14213d" />
      <g className="bot__eyes">
        <rect x="74" y="80" width="22" height={state === 'thinking' ? 6 : 26} rx="10" fill="#7fe0ff" />
        <rect x="124" y="80" width="22" height={state === 'thinking' ? 6 : 26} rx="10" fill="#7fe0ff" />
      </g>
      {state === 'talking' && (
        <path d="M90 118 Q110 132 130 118" stroke="#7fe0ff" strokeWidth="6" fill="none" strokeLinecap="round" />
      )}
      <rect x="54" y="166" width="112" height="78" rx="22" fill="#e9eef7" stroke="#14213d" strokeWidth="5" />
      <rect x="78" y="186" width="64" height="20" rx="8" className="bot__slot" />
      <rect x="20" y="176" width="26" height="56" rx="13" fill="#cfd8e8" stroke="#14213d" strokeWidth="4" />
      <rect x="174" y="176" width="26" height="56" rx="13" fill="#cfd8e8" stroke="#14213d" strokeWidth="4" />
    </svg>
  )
}

export function RobotLab({ onDone }) {
  const [p, setP] = useState({ name: 'Arjun', age: 15, skills: 'Python, AI' })
  const [state, setState] = useState('idle')
  const [say, setSay] = useState('…')
  const [shown, setShown] = useState('')
  const stage = useRef(null)
  const profile = {
    name: p.name.trim() || 'friend',
    age: Number(p.age) || 0,
    skills: p.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  }

  const feed = () => {
    setState('thinking')
    setShown('')
    const chips = stage.current.querySelectorAll('.feed-chip')
    gsap.fromTo(
      chips,
      { x: -160, y: 0, autoAlpha: 1, scale: 1 },
      { x: 0, y: 40, scale: 0.4, autoAlpha: 0, stagger: 0.15, duration: 0.8, ease: 'power2.in' },
    )
    const sk = profile.skills
    const list = sk.length > 1 ? `${sk.slice(0, -1).join(', ')} and ${sk.at(-1)}` : (sk[0] ?? 'nothing yet')
    const line = `Hi ${profile.name}! You are ${profile.age}, and you know ${list}. Nice to meet you!`
    setSay(line)
    setTimeout(() => {
      setState('talking')
      let i = 0
      const t = setInterval(() => {
        i += 2
        setShown(line.slice(0, i))
        if (i >= line.length) {
          clearInterval(t)
          onDone()
        }
      }, 28)
    }, 1300)
  }

  return (
    <div className="lab-scene" ref={stage}>
      <div className="lab-form">
        <label>
          name <input value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} />
        </label>
        <label>
          age <input type="number" value={p.age} onChange={(e) => setP({ ...p, age: e.target.value })} />
        </label>
        <label>
          skills <input value={p.skills} onChange={(e) => setP({ ...p, skills: e.target.value })} />
        </label>
        <button type="button" className="btn btn--sun" onClick={feed}>
          Feed the data →
        </button>
        <Code>{`profile = {\n    "name": "${profile.name}",\n    "age": ${profile.age},\n    "skills": [${profile.skills.map((s) => `"${s}"`).join(', ')}]\n}\n\nprint("Hi", profile["name"] + "!")\nprint("You know", profile["skills"][0])`}</Code>
      </div>
      <div className="bot-stage">
        <div className="feed">
          {['name', 'age', 'skills'].map((k) => (
            <span key={k} className="feed-chip">
              "{k}"
            </span>
          ))}
        </div>
        <Bot state={state} />
        <p className="bot-say" aria-live="polite">
          {state === 'thinking'
            ? 'Processing data…'
            : state === 'talking'
              ? shown
              : 'I am a blank bot. Feed me a profile!'}
        </p>
        <span className="sr-only">{say}</span>
      </div>
    </div>
  )
}
