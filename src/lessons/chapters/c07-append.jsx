import { useRef, useState } from 'react'
import { Code, pop } from '../kit'

/** Chapter 7 — append(). Grow the List: teach Arjun a new skill and watch it join the end. */
function Game({ onWin }) {
  const [skills, setSkills] = useState(['Python', 'AI'])
  const [val, setVal] = useState('Web')
  const [msg, setMsg] = useState(null)
  const shelf = useRef(null)
  const add = () => {
    const s = val.trim()
    if (!s) return setMsg({ bad: true, t: 'Type a skill to append.' })
    setSkills((k) => [...k, s])
    if (skills.length + 1 >= 3) onWin()
    setMsg({
      ok: true,
      t: `database["user1"]["skills"].append("${s}") — it went to the END of the list, at index ${skills.length}.`,
    })
    setVal('')
    requestAnimationFrame(() => pop(shelf.current?.lastElementChild))
  }
  return (
    <div className="board">
      <p className="board__hint">
        <b>Arjun:</b> “I just learned web development!” Add it to his skills.
      </p>
      <div className="expr">
        <code>database["user1"]["skills"].append("</code>
        <input
          className="expr__input expr__input--short"
          aria-label="New skill"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <code>")</code>
        <button type="button" className="btn btn--run" onClick={add}>
          ▶ Run
        </button>
      </div>
      <div className="shelf" ref={shelf}>
        {skills.map((s, i) => (
          <span key={`${s}-${i}`} className="shelf__slot shelf__slot--full">
            <small>[{i}]</small>"{s}"
          </span>
        ))}
      </div>
      {msg && (
        <p className="board__msg" data-ok={msg.ok || undefined} data-bad={msg.bad || undefined} role="status">
          {msg.t}
        </p>
      )}
    </div>
  )
}

export default {
  story: {
    who: 'arjun',
    mood: 'happy',
    line: 'I learned something new today! How do I add it to my skills?',
    with: 'teacher',
    reply: 'Lists can grow. Use append().',
  },
  learn: (
    <div className="split">
      <div>
        <p>
          <code>append()</code> is a <strong>list method</strong>. It adds <strong>one item to the end</strong> of a
          list. The list grows by one.
        </p>
        <p className="note" style={{ marginTop: 16 }}>
          Reach the list first, then call append on it: <code>database["user1"]["skills"].append("Web")</code>
        </p>
      </div>
      <Code>{`database["user1"]["skills"].append("Web")\nprint(database["user1"]["skills"])\n# ["Python", "AI", "Web"]`}</Code>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'Where does append() put the new item?',
    options: ['At the end of the list', 'At the start of the list', 'In a new dictionary'],
    answer: 0,
    why: 'append() always adds to the end.',
  },
}
