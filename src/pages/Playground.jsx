import { useMemo, useState } from 'react'
import { evaluate, parsePython } from '../lessons/evaluate'
import './pages.css'

/**
 * Playground: write your own database, then ask questions of it. The structure is drawn as nested
 * boxes, and the path your expression takes lights up inside it.
 */
const START = `database = {
    "user1": {"name": "Arjun", "age": 15, "skills": ["Python", "AI"]},
    "user2": {"name": "Meera", "age": 16, "skills": ["ML", "Data"]}
}`

function Box({ value, path, trail, depth = 0 }) {
  const on = trail.length >= path.length && path.every((p, i) => trail[i] === p)
  if (Array.isArray(value)) {
    return (
      <div className="pbox pbox--list" data-on={on || undefined}>
        {value.map((v, i) => (
          <div key={i} className="pbox__row">
            <span className="pbox__key">[{i}]</span>
            <Box value={v} path={[...path, i]} trail={trail} depth={depth + 1} />
          </div>
        ))}
      </div>
    )
  }
  if (value && typeof value === 'object') {
    return (
      <div className="pbox" data-on={on || undefined}>
        {Object.entries(value).map(([k, v]) => (
          <div key={k} className="pbox__row">
            <span className="pbox__key">"{k}"</span>
            <Box value={v} path={[...path, k]} trail={trail} depth={depth + 1} />
          </div>
        ))}
      </div>
    )
  }
  return (
    <span className="pval" data-on={on || undefined}>
      {JSON.stringify(value)}
    </span>
  )
}

export function Playground() {
  const [src, setSrc] = useState(START)
  const [expr, setExpr] = useState('database["user2"]["skills"][1]')
  const [ran, setRan] = useState(null)
  const parsed = useMemo(() => {
    try {
      const body = src.replace(/^\s*database\s*=\s*/, '')
      return { db: parsePython(body) }
    } catch {
      return { error: 'SyntaxError: check your commas, quotes and brackets.' }
    }
  }, [src])
  const run = () => {
    if (!parsed.db) return
    const r = evaluate(expr, parsed.db)
    const trail = r.stops
      .slice(1)
      .map((s) => (s.kind === 'index' ? Number(s.label.slice(1, -1)) : s.label.slice(1, -1)))
    setRan({ ...r, trail })
  }
  return (
    <div className="page page--plain">
      <div className="pg">
        <header className="pg__head" data-enter>
          <h1>Playground</h1>
          <p>Build your own database. Then ask it anything.</p>
        </header>
        <div className="pg__grid">
          <div className="pg__editor" data-enter>
            <label htmlFor="pg-src">Your data</label>
            <textarea id="pg-src" value={src} onChange={(e) => setSrc(e.target.value)} spellCheck="false" rows={10} />
            {parsed.error && <p className="pg__err">{parsed.error}</p>}
            <label htmlFor="pg-expr">Your question</label>
            <div className="expr">
              <input
                id="pg-expr"
                className="expr__input"
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && run()}
                spellCheck="false"
              />
              <button type="button" className="btn btn--run" onClick={run} disabled={!parsed.db}>
                ▶ Run
              </button>
            </div>
            {ran && (
              <p className={`pg__out ${ran.error ? 'is-bad' : 'is-ok'}`} role="status">
                &gt;&gt;&gt; {ran.error ?? JSON.stringify(ran.value)}
              </p>
            )}
          </div>
          <div className="pg__view" data-enter>
            <p className="pg__root">database</p>
            {parsed.db ? (
              <Box value={parsed.db} path={[]} trail={ran?.error ? [] : (ran?.trail ?? [])} />
            ) : (
              <p className="pg__err">Fix the data to see its structure.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
