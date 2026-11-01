import { useState } from 'react'
import { useProgress } from '../../state/progress'
import { Code } from '../kit'

/** Chapter 9 — Building a Multi-User Database. City Builder: each user added raises a house. */
const START = [
  { key: 'user1', name: 'Arjun', age: 15, skills: ['Python', 'AI'], color: '#2f6fe0' },
  { key: 'user2', name: 'Meera', age: 16, skills: ['ML', 'Data'], color: '#7c4fe0' },
]

function Game({ onWin }) {
  const { name, setName } = useProgress()
  const [built, setBuilt] = useState([])
  const [me, setMe] = useState({ name: name || '', age: 14, skills: 'Python' })
  const add = (u) => setBuilt((b) => [...b, u])
  const addMe = () => {
    if (!me.name.trim()) return
    setName(me.name.trim())
    add({
      key: 'user3',
      name: me.name.trim(),
      age: Number(me.age) || 14,
      skills: me.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      color: '#15a39a',
    })
    onWin()
  }
  const code = `database = {\n${built.map((u) => `    "${u.key}": {"name": "${u.name}", "age": ${u.age}, "skills": [${u.skills.map((s) => `"${s}"`).join(', ')}]}`).join(',\n')}\n}`
  const next = START[built.length]
  return (
    <div className="board">
      <p className="board__hint">Every user you add to the database raises a house in the city.</p>
      <div className="street">
        {built.map((u) => (
          <div key={u.key} className="plot" style={{ '--c': u.color }}>
            <span className="plot__roof" />
            <span className="plot__body">
              <b>{u.key}</b>
              {u.name}, {u.age}
            </span>
          </div>
        ))}
        {built.length < 3 && <div className="plot plot--empty">empty plot</div>}
      </div>
      <div className="builder-row">
        {next ? (
          <button type="button" className="btn btn--primary" onClick={() => add(next)}>
            + Add "{next.key}" ({next.name})
          </button>
        ) : built.length === 2 ? (
          <div className="me">
            <b>Now add yourself as "user3":</b>
            <label>
              name{' '}
              <input value={me.name} onChange={(e) => setMe({ ...me, name: e.target.value })} placeholder="your name" />
            </label>
            <label>
              age{' '}
              <input
                type="number"
                min="1"
                max="120"
                value={me.age}
                onChange={(e) => setMe({ ...me, age: e.target.value })}
              />
            </label>
            <label>
              skills{' '}
              <input
                value={me.skills}
                onChange={(e) => setMe({ ...me, skills: e.target.value })}
                placeholder="Python, Art"
              />
            </label>
            <button type="button" className="btn btn--sun" onClick={addMe} disabled={!me.name.trim()}>
              Build my house
            </button>
          </div>
        ) : (
          <p className="board__msg" data-ok>
            Three citizens, one database. Welcome to DATA CITY, {built[2]?.name}!
          </p>
        )}
      </div>
      <Code>{built.length ? code : 'database = {}'}</Code>
    </div>
  )
}

export default {
  story: {
    who: 'teacher',
    line: 'One user is a dictionary. A whole city of users? Put them all in one database.',
    with: 'meera',
    reply: 'Each user gets their own key!',
  },
  learn: (
    <div className="split">
      <div>
        <p>
          A <strong>multi-user database</strong> is a dictionary of users. Each key ("user1", "user2") names one user;
          each value is that user’s own dictionary.
        </p>
        <p className="note" style={{ marginTop: 16 }}>
          Same shape for every user → the same code works for every user.
        </p>
      </div>
      <Code>{`database = {\n    "user1": {"name": "Arjun", "age": 15, "skills": ["Python", "AI"]},\n    "user2": {"name": "Meera", "age": 16, "skills": ["ML", "Data"]}\n}`}</Code>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'How do you add a third user?',
    options: [
      'database["user3"] = {"name": …, "age": …, "skills": […]}',
      'database.append("user3")',
      'database[3] = "user3"',
    ],
    answer: 0,
    why: 'Adding a new key to the database dictionary adds a new user.',
  },
}
