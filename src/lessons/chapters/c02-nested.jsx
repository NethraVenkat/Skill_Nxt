import { useRef, useState } from 'react'
import { database } from '../../data/lessons'
import { Code, pop, shake } from '../kit'

/** Chapter 2 — Nested Dictionaries. Open the Doors: rooms inside rooms; find Meera's age. */
function Game({ onWin }) {
  const [open, setOpen] = useState([])
  const [msg, setMsg] = useState({ t: 'Mission: find the room that holds Meera’s age.' })
  const refs = useRef({})
  const toggle = (id) => {
    setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]))
    requestAnimationFrame(() => pop(refs.current[`in-${id}`]))
  }
  const room = (user, key) => {
    const id = `${user}.${key}`
    if (user === 'user2' && key === 'age') {
      setMsg({ t: 'Found it: database → "user2" → "age" holds 16. A room inside a room!', ok: true })
      onWin()
    } else {
      shake(refs.current[id])
      setMsg({ t: `That room holds ${JSON.stringify(database[user][key])}. Keep looking.`, bad: true })
    }
  }
  return (
    <div className="board">
      <p className="board__hint">The database is a house. Each key is a door. Behind each door: more rooms.</p>
      <div className="house">
        <div className="house__label">database</div>
        <div className="house__rooms">
          {Object.entries(database).map(([user, u]) => (
            <div key={user} className="room" data-open={open.includes(user) || undefined}>
              <button type="button" className="door" onClick={() => toggle(user)} aria-expanded={open.includes(user)}>
                🚪 "{user}"
              </button>
              {open.includes(user) && (
                <div className="room__in" ref={(el) => (refs.current[`in-${user}`] = el)}>
                  {Object.keys(u).map((k) => (
                    <button
                      key={k}
                      type="button"
                      className="subroom"
                      ref={(el) => (refs.current[`${user}.${k}`] = el)}
                      onClick={() => room(user, k)}
                    >
                      "{k}"
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="board__msg" data-ok={msg.ok || undefined} data-bad={msg.bad || undefined} role="status">
        {msg.t}
      </p>
    </div>
  )
}

export default {
  story: {
    who: 'teacher',
    line: 'A dictionary stores key–value pairs. But what if a value is… another dictionary?',
    with: 'arjun',
    reply: 'Like a house with rooms inside?',
  },
  learn: (
    <div className="split">
      <div>
        <p>
          A <strong>nested dictionary</strong> is a dictionary whose values are dictionaries too. The outer dictionary
          holds users; each user is its own dictionary of details.
        </p>
        <p className="note" style={{ marginTop: 16 }}>
          <strong>database</strong> → <strong>"user1"</strong> → <strong>"name"</strong>. Each key opens the next level.
        </p>
      </div>
      <Code>{`database = {\n    "user1": {\n        "name": "Arjun",\n        "age": 15\n    },\n    "user2": {\n        "name": "Meera",\n        "age": 16\n    }\n}`}</Code>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'In this database, what is the value of the key "user1"?',
    options: ['A dictionary with Arjun’s details', 'The string "Arjun"', 'A list of users'],
    answer: 0,
    why: '"user1" holds a whole dictionary: that is what makes it nested.',
  },
}
