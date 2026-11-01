import gsap from 'gsap'
import { useRef, useState } from 'react'
import { Code, shake } from '../lessons/kit'

/** Music App Playlist: a playlist is a list inside a user. Append songs, play by index. */
export function MusicLab({ onDone }) {
  const [songs, setSongs] = useState(['Morning Code', 'Data Dreams', 'Loop Lullaby'])
  const [song, setSong] = useState('')
  const [idx, setIdx] = useState(1)
  const [now, setNow] = useState(null)
  const disc = useRef(null)
  const player = useRef(null)
  const spin = useRef(null)
  const play = () => {
    spin.current?.kill()
    if (idx >= songs.length || idx < 0) {
      shake(player.current)
      gsap.fromTo(disc.current, { rotate: 0 }, { rotate: -25, duration: 0.15, yoyo: true, repeat: 3 })
      return setNow({ err: `IndexError: the playlist has ${songs.length} songs (indexes 0–${songs.length - 1})` })
    }
    setNow({ t: songs[idx] })
    spin.current = gsap.to(disc.current, { rotate: '+=360', duration: 2.4, ease: 'none', repeat: -1 })
    onDone()
  }
  const add = () => {
    if (!song.trim()) return
    setSongs((s) => [...s, song.trim()])
    setSong('')
  }
  return (
    <div className="lab-scene">
      <div className="lab-form">
        <div className="playlist">
          <b>"playlists": {'{'} "Study Mix": [</b>
          <ol start="0">
            {songs.map((s, i) => (
              <li key={`${s}-${i}`} data-on={now?.t === s && i === idx ? true : undefined}>
                <span>[{i}]</span> "{s}"
              </li>
            ))}
          </ol>
          <b>] {'}'}</b>
        </div>
        <div className="row">
          <input
            placeholder="New song"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            aria-label="New song"
          />
          <button type="button" className="btn btn--primary" onClick={add}>
            .append()
          </button>
        </div>
        <Code>{`user["playlists"]["Study Mix"].append("${song || '…'}")\nuser["playlists"]["Study Mix"][${idx}]`}</Code>
      </div>
      <div className="player" ref={player}>
        <svg ref={disc} viewBox="0 0 200 200" className="disc" aria-hidden="true">
          <circle cx="100" cy="100" r="96" fill="#14213d" />
          {[80, 66, 52].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#2c3b63" strokeWidth="2" />
          ))}
          <circle cx="100" cy="100" r="32" fill="#7c4fe0" />
          <circle cx="100" cy="100" r="5" fill="#fff" />
          <rect x="96" y="70" width="8" height="18" rx="4" fill="#ffd27a" />
        </svg>
        <div className="row">
          <label>
            index{' '}
            <input type="number" value={idx} onChange={(e) => setIdx(Number(e.target.value))} style={{ width: 80 }} />
          </label>
          <button type="button" className="btn btn--sun" onClick={play}>
            ▶ Play
          </button>
        </div>
        <p className="now" data-bad={now?.err || undefined} aria-live="polite">
          {now ? (now.err ?? `Now playing: ${now.t}`) : 'Pick an index and press play'}
        </p>
      </div>
    </div>
  )
}
