import { Link } from 'react-router'
import { Character } from '../cast/Character'
import { lessons } from '../data/lessons'
import { World } from '../world/World'
import './home.css'
import './home-landing.css'

export function Home() {
  return (
    <div className="home home--landing">
      <section className="hero">
        <World tone="golden" archiveLit={0.6} />
        <div className="hero__title">
          <p className="hero__kicker" data-enter>
            Grade 9 · Coding &amp; AI · Module 1
          </p>
          <h1 data-enter>
            DATA CITY
            <span>The Lost Memories</span>
          </h1>
          <p className="hero__sub" data-enter>
            Introduction to Dictionaries &amp; Complex Data
          </p>
          <div className="hero__cta" data-enter>
            <Link to={`/lessons/${lessons[0].slug}`} className="btn btn--sun">
              Begin the Journey →
            </Link>
            <Link to="/lab" className="btn btn--primary">
              Real-World Lab
            </Link>
          </div>
        </div>
        <div className="hero__cast" data-enter>
          <Character id="arjun" height="min(62vh, 560px)" crop={0.7} />
          <Character id="meera" height="min(58vh, 520px)" crop={0.7} />
        </div>
      </section>
    </div>
  )
}
