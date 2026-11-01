import arjun from '../assets/characters/arjun.webp'
import meera from '../assets/characters/meera.webp'
import sizes from '../assets/characters/sizes.json'
import teacher from '../assets/characters/teacher.webp'
import './character.css'

/**
 * The cast: Arjun, Meera and the Teacher, the same artwork everywhere. A character can say a line
 * (a speech bubble anchored to them) and has a mood: idle, talk, think, happy, confused, cheer.
 * Moods are body acting (lean, tilt, hop, shake), so the art itself is never distorted.
 */
export const CAST = {
  arjun: { name: 'Arjun', src: arjun, ...sizes.arjun, color: '#2f6fe0', alt: 'Arjun, in a blue hoodie with a laptop' },
  meera: {
    name: 'Meera',
    src: meera,
    ...sizes.meera,
    color: '#7c4fe0',
    alt: 'Meera, in a purple hoodie holding a book',
  },
  teacher: {
    name: 'Teacher',
    src: teacher,
    ...sizes.teacher,
    color: '#15a39a',
    alt: 'The Teacher, in a blazer and glasses',
  },
}

export function Character({
  id,
  mood = 'idle',
  say,
  height = 320,
  crop = 0.62,
  side = 'right',
  flip = false,
  className = '',
}) {
  const c = CAST[id]
  const h = typeof height === 'number' ? `${height}px` : height
  return (
    <figure
      className={`char ${className}`}
      data-mood={mood}
      data-side={side}
      style={{ '--h': h, '--ratio': c.w / c.h, '--crop': crop, '--accent': c.color }}
    >
      {say && (
        <figcaption className="char__say" key={say} role="status">
          <b>{c.name}</b>
          {say}
        </figcaption>
      )}
      <div className="char__frame">
        <img
          src={c.src}
          alt={c.alt}
          width={c.w}
          height={c.h}
          draggable="false"
          style={flip ? { transform: 'scaleX(-1)' } : undefined}
        />
      </div>
    </figure>
  )
}
