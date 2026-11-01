import { useRef, useState } from 'react'
import { Character } from '../../cast/Character'
import { useProgress } from '../../state/progress'
import { shake } from '../kit'

/** Chapter 13 — Review & Close. The Teacher's game show: five questions light up the festival. */
const QS = [
  {
    q: 'How do you access user2’s age?',
    o: ['database["user2"]["age"]', 'database["age"]["user2"]', 'database.user2.age'],
  },
  { q: 'What does [1] mean in skills[1]?', o: ['The second item (index 1)', 'The first item', 'The key named "1"'] },
  {
    q: 'What does append() do?',
    o: ['Adds one item to the end of a list', 'Removes the last item', 'Creates a new key'],
  },
  {
    q: 'Dictionary or list?',
    o: [
      'Dictionary: named keys · List: ordered positions',
      'They are the same thing',
      'List: named keys · Dictionary: positions',
    ],
  },
  {
    q: 'What is nested data?',
    o: ['Data inside data: dictionaries and lists inside dictionaries', 'Data on one line', 'Data saved in a file'],
  },
]

function Game({ onWin }) {
  const [round, setRound] = useState(0)
  const [lit, setLit] = useState(0)
  const [mood, setMood] = useState('talk')
  const refs = useRef([])
  const { name } = useProgress()
  const q = QS[round]
  const order = useRef(QS.map(() => [0, 1, 2].sort(() => Math.random() - 0.5)))
  const pick = (i) => {
    if (i !== 0) {
      setMood('confused')
      return shake(refs.current[i])
    }
    setMood('happy')
    setLit((l) => l + 1)
    setTimeout(() => {
      setMood('talk')
      if (round + 1 === QS.length) onWin()
      setRound((r) => r + 1)
    }, 900)
  }
  return (
    <div className="board show">
      <div className="show__lights" aria-label={`${lit} of 5 districts lit`}>
        {QS.map((_, i) => (
          <span key={i} data-on={i < lit || undefined} />
        ))}
      </div>
      {q ? (
        <div className="show__stage">
          <Character id="teacher" mood={mood} say={`Question ${round + 1}: ${q.q}`} height={260} crop={0.62} />
          <div className="fixes">
            {order.current[round].map((i) => (
              <button
                key={i}
                type="button"
                className="check__opt"
                ref={(el) => (refs.current[i] = el)}
                onClick={() => pick(i)}
              >
                <code>{q.o[i]}</code>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="festival">
          <p className="festival__title">MISSION COMPLETE</p>
          <p>The Archive is restored. Every memory is home{name ? `, ${name}` : ''}!</p>
          <div className="festival__cast">
            <Character id="arjun" mood="cheer" height={240} crop={0.6} />
            <Character id="teacher" mood="happy" height={250} crop={0.6} />
            <Character id="meera" mood="cheer" height={240} crop={0.6} />
          </div>
        </div>
      )}
    </div>
  )
}

export default {
  story: {
    who: 'teacher',
    mood: 'happy',
    line: 'Welcome to the Festival of Lights! Answer five questions and the whole city lights up.',
    with: 'arjun',
    reply: 'We’re ready!',
  },
  learn: (
    <div className="split">
      <ul style={{ display: 'grid', gap: 8, paddingLeft: 20, margin: 0 }}>
        <li>Nested dictionaries: dictionaries inside a dictionary</li>
        <li>Lists inside dictionaries: one key, many ordered values</li>
        <li>Chained access: database["user2"]["skills"][1]</li>
        <li>append(): add to the end of a list</li>
        <li>Functions and loops over the database</li>
      </ul>
      <p className="note">
        You didn’t just read the code. <strong>You built the data system.</strong> Next class: *args and **kwargs.
      </p>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'Which one is a list inside a dictionary?',
    options: ['"skills": ["ML", "Data"]', '"name": "Meera"', '"age": 16'],
    answer: 0,
    why: 'The value of "skills" is a list.',
  },
}
