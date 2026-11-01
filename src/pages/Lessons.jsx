import { Link } from 'react-router'
import { lessons } from '../data/lessons'
import { useProgress } from '../state/progress'
import { World } from '../world/World'
import './pages.css'

/** The journey map: every chapter as a stop on a winding road through the city. */
export function Lessons() {
  const { done } = useProgress()
  return (
    <div className="page">
      <header className="page__hero">
        <World tone="morning" archiveLit={done.length / lessons.length} />
        <div className="page__title">
          <p className="lesson__n" data-enter>
            {done.length} of {lessons.length} chapters restored
          </p>
          <h1 data-enter>The Journey</h1>
          <p data-enter>Thirteen chapters, one idea each. Follow the road through DATA CITY.</p>
        </div>
      </header>
      <div className="city-map" aria-label="Explore lesson buildings">
        <img src="/data-city.png" alt="A bright futuristic Data City with connected learning buildings" />
        <Link to="/lessons/nested-dictionaries" style={{left:'24%',top:'48%'}}>Nested Dictionaries</Link>
        <Link to="/lessons/multi-user-database" style={{left:'73%',top:'45%'}}>Building a Multi-User Database</Link>
        <Link to="/lessons/chained-access" style={{left:'48%',top:'33%'}}>Chained Access</Link>
        <Link to="/lessons/lists-in-dictionaries" style={{left:'24%',top:'77%'}}>Lists Inside Dictionaries</Link>
        <Link to="/lessons/looping" style={{left:'57%',top:'77%'}}>Looping Through Users</Link>
        <div className="city-map-caption">Thirteen chapters, one idea each. Follow the road through DATA CITY.</div>
      </div>
      <ol className="road">
        {lessons.map((l, i) => (
          <li key={l.slug} data-reveal data-side={i % 2 ? 'right' : 'left'}>
            <Link to={`/lessons/${l.slug}`} className="stopcard" data-done={done.includes(l.slug) || undefined}>
              <span className="stopcard__n">{done.includes(l.slug) ? '✓' : i + 1}</span>
              <span>
                <small>{l.chapter}</small>
                <b>{l.title}</b>
                <span>{l.idea}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
