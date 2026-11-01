import { Link } from 'react-router'
import { labs, lessons } from '../data/lessons'
import { useProgress } from '../state/progress'
import './pages.css'

/** My Journey: the data gems collected, what is left, and the certificate at the end. */
export function Journey() {
  const { done, labs: labsDone, name, setName, reset } = useProgress()
  const all = done.length === lessons.length
  const pct = Math.round((done.length / lessons.length) * 100)
  return (
    <div className="page page--plain">
      <div className="pg">
        <header className="pg__head" data-enter>
          <h1>My Journey</h1>
          <p>
            {done.length} of {lessons.length} chapters · {labsDone.length} of {labs.length} experiments · {pct}% of the
            Archive restored
          </p>
        </header>
        <div className="meter" data-enter role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <ul className="gems" data-enter>
          {lessons.map((l, i) => (
            <li key={l.slug}>
              <Link to={`/lessons/${l.slug}`} data-done={done.includes(l.slug) || undefined} title={l.title}>
                <span className="gem gem--small" aria-hidden="true" />
                <span>
                  {i + 1}. {l.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <section className="cert" data-enter data-ready={all || undefined}>
          {all ? (
            <>
              <p className="cert__kicker">Certificate of Completion</p>
              <h2>{name || 'Data Citizen'}</h2>
              <p>restored the DATA CITY Archive and mastered Introduction to Dictionaries &amp; Complex Data.</p>
              <p className="cert__small">Grade 9 · Coding &amp; AI · Module 1</p>
            </>
          ) : (
            <p>Collect all 13 data gems to unlock your certificate.</p>
          )}
          <label className="cert__name">
            Name on the certificate{' '}
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>
        </section>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => window.confirm('Start the journey again? Your gems will be cleared.') && reset()}
        >
          Start over
        </button>
      </div>
    </div>
  )
}
