import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { PaperBird } from '../../world/PaperBird'
import { evaluate } from '../evaluate'
import { Code } from '../kit'

/**
 * Chapter 5 — Chained Access. The signature moment: the learner writes an access expression and
 * the paper bird flies the path, stop by stop, through the city. Errors happen where they really
 * would: the bird stops at the step that doesn't exist.
 */
const TRY = [
  'database["user2"]["skills"][1]',
  'database["user1"]["name"]',
  'database["user2"]["age"]',
  'database["user2"]["skills"][3]',
]

function Game({ onWin }) {
  const [src, setSrc] = useState(TRY[0])
  const [run, setRun] = useState(null)
  const [step, setStep] = useState(-1)
  const bird = useRef(null)
  const track = useRef(null)
  const won = useRef(false)

  useEffect(() => {
    if (!run) return
    const nodes = [...track.current.querySelectorAll('.stop')]
    const base = track.current.getBoundingClientRect()
    const tl = gsap.timeline()
    nodes.forEach((n, i) => {
      const r = n.getBoundingClientRect()
      tl.to(bird.current, {
        x: r.left - base.left + r.width / 2 - 36,
        y: r.top - base.top - 64,
        duration: i ? 0.9 : 0.4,
        ease: 'power2.inOut',
        onComplete: () => setStep(i),
      })
    })
    tl.call(() => {
      setStep(nodes.length)
      if (!run.error && src.replace(/\s/g, '').replace(/'/g, '"') === TRY[0] && !won.current) {
        won.current = true
        onWin()
      }
    })
    return () => tl.kill()
    // a new flight starts only when a new run starts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run])

  const go = () => {
    setStep(-1)
    setRun({ ...evaluate(src), id: Date.now() })
  }
  const landed = run && step >= run.stops.length
  return (
    <div className="board">
      <p className="board__hint">Write a path. Press Fly. The paper bird follows your code through the city.</p>
      <div className="expr">
        <label className="sr-only" htmlFor="c5">
          Python expression
        </label>
        <input
          id="c5"
          className="expr__input"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && go()}
          spellCheck="false"
          autoComplete="off"
        />
        <button type="button" className="btn btn--run" onClick={go}>
          🕊 Fly
        </button>
      </div>
      <div className="tries">
        {TRY.map((t) => (
          <button key={t} type="button" className="try" onClick={() => setSrc(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="flight" ref={track}>
        <PaperBird ref={bird} size={72} className="flight__bird" />
        <ol className="flight__stops">
          {run?.stops.map((s, i) => (
            <li key={`${run.id}-${i}`} className="stop" data-kind={s.kind} data-on={step >= i || undefined}>
              {s.label}
            </li>
          ))}
          {run?.error && landed && <li className="stop stop--err">✕</li>}
          {run && !run.error && landed && <li className="stop stop--val">{JSON.stringify(run.value)}</li>}
        </ol>
      </div>
      {landed && (
        <p className="board__msg" data-ok={!run.error || undefined} data-bad={run.error || undefined} role="status">
          {run.error ? run.error : `>>> ${JSON.stringify(run.value)}  — each [ ] went one level deeper.`}
        </p>
      )}
    </div>
  )
}

export default {
  story: {
    who: 'teacher',
    line: 'Watch: every pair of brackets is one step deeper into the data.',
    with: 'arjun',
    reply: 'So code is a path through the city!',
  },
  learn: (
    <div className="split">
      <div>
        <p>
          <strong>Chained access</strong> joins steps: a key for the user, a key for the field, and then a position in
          the list.
        </p>
        <ol style={{ marginTop: 12, paddingLeft: 22 }}>
          <li>
            <code>database["user2"]</code> → Meera’s dictionary
          </li>
          <li>
            <code>["skills"]</code> → her list ["ML", "Data"]
          </li>
          <li>
            <code>[1]</code> → the item at index 1 → <strong>"Data"</strong>
          </li>
        </ol>
      </div>
      <Code>{`database["user2"]["skills"][1]   # "Data"`}</Code>
    </div>
  ),
  game: (p) => <Game {...p} />,
  check: {
    q: 'What does database["user2"]["skills"][1] return?',
    options: ['"Data"', '"ML"', '"user2"', 'an error'],
    answer: 0,
    why: 'Meera’s skills are ["ML", "Data"]; index 1 is the second item.',
  },
}
