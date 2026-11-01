import { useState } from 'react'
import { Link } from 'react-router'
import { Character } from '../cast/Character'
import { lessonIndex, lessons } from '../data/lessons'
import { useProgress } from '../state/progress'
import { World } from '../world/World'
import { Check } from './kit'
import './lesson.css'

/**
 * Every lesson is one scene of the film, in five beats:
 *   1. STORY  the chapter opens over the city, a character sets up the problem
 *   2. LEARN  the idea, with the lesson's own code
 *   3. PLAY   the game for this idea
 *   4. CHECK  one question
 *   5. REWARD a data gem, and the flight to the next chapter
 * The game and the check must both be done to earn the gem; navigation is never locked.
 */
export function LessonFrame({ slug, story, learn, game, check }) {
  const i = lessonIndex(slug)
  const lesson = lessons[i]
  const prev = lessons[i - 1]
  const next = lessons[i + 1]
  const { done, complete } = useProgress()
  const [won, setWon] = useState(done.includes(slug))
  const [checked, setChecked] = useState(done.includes(slug))
  const finished = won && checked

  const finishIfReady = (w, c) => {
    if (w && c) complete(slug)
  }

  return (
    <article className="lesson" data-tone={lesson.tone}>
      <header className="lesson__hero">
        <World tone={lesson.tone} archiveLit={(i + 1) / lessons.length} />
        <div className="lesson__title">
          <p className="lesson__n" data-enter>
            Chapter {i + 1} of {lessons.length}
          </p>
          <h1 data-enter>{lesson.chapter}</h1>
          <p className="lesson__topic" data-enter>
            {lesson.title} · {lesson.minutes} min
          </p>
        </div>
        <div className="lesson__cast" data-enter>
          <Character
            id={story.who}
            mood={story.mood ?? 'talk'}
            say={story.line}
            height="min(48vh, 420px)"
            crop={0.66}
          />
          {story.with && (
            <Character id={story.with} mood="idle" say={story.reply} height="min(44vh, 390px)" crop={0.66} />
          )}
        </div>
      </header>

      <nav className="lesson-menu" aria-label="Lesson sections">
        <a href="#learn">Learn</a><a href="#play">Play</a><a href="#check">Check</a>
      </nav>
      <section id="learn" className="beat" data-reveal>
        <p className="beat__label">Learn</p>
        <h2>{lesson.idea}</h2>
        <div className="beat__body">{learn}</div>
      </section>

      <section id="play" className="beat beat--play" data-reveal>
        <p className="beat__label">Play</p>
        {game({
          onWin: () => {
            setWon(true)
            finishIfReady(true, checked)
          },
        })}
        {won && <p className="beat__won">Game complete ✓</p>}
      </section>

      <section id="check" className="beat" data-reveal>
        <p className="beat__label">Check</p>
        <Check
          {...check}
          onRight={() => {
            setChecked(true)
            finishIfReady(won, true)
          }}
        />
      </section>

      <section className="reward" data-reveal>
        {finished ? (
          <div className="reward__gem" aria-live="polite">
            <span className="gem" aria-hidden="true" />
            <div>
              <b>Data gem collected!</b>
              <p>Chapter {i + 1} restored. The Archive shines a little brighter.</p>
            </div>
          </div>
        ) : (
          <p className="reward__todo">Finish the game and the check to collect this chapter’s data gem.</p>
        )}
        <nav className="lesson__nav" aria-label="Chapters">
          {prev ? (
            <Link to={`/lessons/${prev.slug}`} className="btn btn--ghost">
              ← {prev.title}
            </Link>
          ) : (
            <Link to="/lessons" className="btn btn--ghost">
              ← All chapters
            </Link>
          )}
          {next ? (
            <Link to={`/lessons/${next.slug}`} className="btn btn--sun">
              Next: {next.title} →
            </Link>
          ) : (
            <Link to="/lab" className="btn btn--sun">
              Into the Real-World Lab →
            </Link>
          )}
        </nav>
      </section>
    </article>
  )
}
