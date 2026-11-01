import { Link, useParams } from 'react-router'
import { LessonFrame } from '../lessons/LessonFrame'
import c01 from '../lessons/chapters/c01-real-data'
import c02 from '../lessons/chapters/c02-nested'
import c03 from '../lessons/chapters/c03-lists'
import c04 from '../lessons/chapters/c04-access'
import c05 from '../lessons/chapters/c05-chained'
import c06 from '../lessons/chapters/c06-indexing'
import c07 from '../lessons/chapters/c07-append'
import c08 from '../lessons/chapters/c08-bugs'
import c09 from '../lessons/chapters/c09-multi'
import c10 from '../lessons/chapters/c10-functions'
import c11 from '../lessons/chapters/c11-loops'
import c12 from '../lessons/chapters/c12-challenge'
import c13 from '../lessons/chapters/c13-review'
import '../lessons/games.css'

/** One page per lesson: /lessons/:slug. */
const CHAPTERS = {
  'real-data': c01,
  'nested-dictionaries': c02,
  'lists-in-dictionaries': c03,
  'accessing-values': c04,
  'chained-access': c05,
  'list-indexing': c06,
  append: c07,
  'bug-hunt': c08,
  'multi-user-database': c09,
  functions: c10,
  looping: c11,
  challenge: c12,
  review: c13,
}

export function LessonRoute() {
  const { slug } = useParams()
  const chapter = CHAPTERS[slug]
  if (!chapter) {
    return (
      <div className="notfound">
        <h1>This chapter isn’t on the map.</h1>
        <Link to="/lessons" className="btn btn--sun">
          See all chapters
        </Link>
      </div>
    )
  }
  return <LessonFrame key={slug} slug={slug} {...chapter} />
}
