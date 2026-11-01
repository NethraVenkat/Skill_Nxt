import { useState } from 'react'
import { Code } from '../lessons/kit'

/** School Report Card: marks are a dictionary inside a student. A function reads one; a loop writes them all. */
const STUDENT = { name: 'Meera', grade: 9, marks: { Maths: 92, Science: 88, English: 85, Coding: 97 } }

export function ReportLab({ onDone }) {
  const [rows, setRows] = useState(0)
  const [subject, setSubject] = useState('Science')
  const [got, setGot] = useState(null)
  const subjects = Object.keys(STUDENT.marks)
  const loop = () => {
    setRows(0)
    subjects.forEach((_, i) =>
      setTimeout(
        () => {
          setRows(i + 1)
          if (i === subjects.length - 1) onDone()
        },
        500 * (i + 1),
      ),
    )
  }
  return (
    <div className="lab-scene">
      <div className="lab-form">
        <Code>{`student = {\n    "name": "Meera",\n    "grade": 9,\n    "marks": {"Maths": 92, "Science": 88,\n              "English": 85, "Coding": 97}\n}\n\ndef get_mark(student, subject):\n    return student["marks"][subject]\n\nfor subject in student["marks"]:\n    print(subject, student["marks"][subject])`}</Code>
        <div className="row">
          <select value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Subject">
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setGot(`get_mark(student, "${subject}") → ${STUDENT.marks[subject]}`)}
          >
            Call get_mark
          </button>
        </div>
        {got && <p className="now">{got}</p>}
      </div>
      <div className="report">
        <div className="report__head">
          <b>DATA CITY HIGH</b>
          <span>
            {STUDENT.name} · Grade {STUDENT.grade}
          </span>
        </div>
        <ul>
          {subjects.map((s, i) => (
            <li key={s} data-on={i < rows || undefined}>
              <span>{s}</span>
              <span className="report__mark">{i < rows ? STUDENT.marks[s] : ''}</span>
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn--sun" onClick={loop}>
          ▶ Run the loop
        </button>
      </div>
    </div>
  )
}
