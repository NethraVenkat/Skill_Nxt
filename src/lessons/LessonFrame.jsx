import { Link } from "react-router";
import { slides } from "../data/content";
import { useStore } from "../state/store";
import { Scene } from "../ui/kit";
import "./lesson.css";

/**
 * Frame for one lesson slide: the stage header (slide number, minutes, title, purpose), the
 * slide's own activity, the objective, and the way to the next slide. `done` marks the slide
 * finished.
 */
export function LessonFrame({ n, children, objective }) {
  const s = slides[n - 1];
  const prev = slides[n - 2];
  const next = slides[n];
  const { lessons } = useStore();
  return (
    <Scene
      kicker={`Slide ${n} of 9 · ⏱️ ${s.min} min`}
      title={s.title}
      sub={s.purpose}
    >
      {children}
      <p className="objective">
        <span aria-hidden="true">🎯</span> {objective}
      </p>
      <nav className="lesson-nav" aria-label="Lesson slides">
        {prev ? (
          <Link to={`/lesson/${prev.slug}`} className="btn btn--ghost">
            ← {prev.title}
          </Link>
        ) : (
          <Link to="/" className="btn btn--ghost">
            ← Home
          </Link>
        )}
        <span
          className="lesson-dots"
          aria-label={`${lessons.length} of 9 slides done`}
        >
          {slides.map((x) => (
            <i
              key={x.n}
              data-on={lessons.includes(x.n) || undefined}
              data-here={x.n === n || undefined}
            />
          ))}
        </span>
        {next ? (
          <Link to={`/lesson/${next.slug}`} className="btn btn--gold">
            Next: {next.title} →
          </Link>
        ) : (
          <Link to="/mailbag" className="btn btn--gold">
            Next: open your Mailbag 📬
          </Link>
        )}
      </nav>
    </Scene>
  );
}
