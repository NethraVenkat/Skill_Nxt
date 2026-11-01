import test from "node:test";
import assert from "node:assert/strict";
import { fresh, valid, stats, addTalk } from "../src/echo-state.js";
import {routes,stages,lesson} from "../src/shared-lesson.js";
import { checks } from "../src/echo-checks.js";
const talk = (overrides) => ({
  id: "t1",
  student: "first",
  session: 0,
  at: "2026-10-14T10:00:00Z",
  attempt: 1,
  level: 0,
  listener: "Buddy",
  recall: "Dogs help find people",
  feedback: "Explain the second idea",
  support: "Independent",
  clarity: "Some ideas",
  recovered: false,
  ...overrides,
});
test("backup preserves notes, lesson position and actual speaking records", () => {
  let d = fresh();
  d.notes["first:guided"] = [
    "Amazing smell",
    "Scents humans miss",
    "Help find people",
  ];
  d.screen = 12;
  d = addTalk(d, talk());
  const restored = JSON.parse(JSON.stringify(d));
  assert.equal(valid(restored), true);
  assert.deepEqual(restored, d);
});
test("backups reject invalid references, audience steps, dates and oversized content", () => {
  for (const mutate of [
    (d) => (d.active = "missing"),
    (d) => d.students.push({ ...d.students[0] }),
    (d) => (d.students[0].name = "x".repeat(51)),
    (d) => (d.screen = 18),
    (d) => (d.session = -1),
    (d) => (d.completed = [6]),
    (d) => (d.notes.x = ["one"]),
    (d) => (d.talks = [talk({ student: "missing" })]),
    (d) => (d.talks = [talk({ at: "invalid" })]),
    (d) => (d.talks = [talk({ level: 6 })]),
    (d) => (d.talks = [talk({ feedback: { bad: true } })]),
    (d) => (d.talks = [talk({ recall: "x".repeat(121) })]),
  ]) {
    const d = fresh();
    mutate(d);
    assert.equal(valid(d), false);
  }
});
test("saving the same attempt twice does not inflate participation", () => {
  let d = addTalk(fresh(), talk());
  d = addTalk(d, talk());
  assert.equal(d.talks.length, 1);
  d = addTalk(d, talk({ id: "t2", attempt: 2 }));
  assert.equal(d.talks.length, 2);
});
test("audience opportunities count students rather than repeated talks", () => {
  let d = fresh();
  d.students.push({
    id: "second",
    name: "Second",
    step: 4,
    goal: "Try",
    observation: "",
  });
  d = addTalk(d, talk());
  assert.deepEqual(stats(d), { students: 2, speakers: 1, awaiting: 2 });
  d = addTalk(d, talk({ id: "t2", level: 3, attempt: 3 }));
  assert.deepEqual(stats(d), { students: 2, speakers: 1, awaiting: 1 });
});
test("all three routes share the complete PDF lesson and period timing",()=>{
 assert.equal(routes.length,3);
 assert.equal(new Set(routes.map(r=>r.tag)).size,3);
 assert.equal(stages.length,18);
 assert.deepEqual(stages.map(s=>s.id),Array.from({length:18},(_,i)=>i));
 for(const route of routes){assert.equal(route.lessonId,lesson.id);assert.equal(route.paragraph,lesson.dog);assert.deepEqual(route.example,lesson.dogIdeas);assert.deepEqual(route.demoNotes,lesson.butterflyNotes);assert.equal(route.demo,lesson.butterflySpeech.join(' '));}
 assert.equal(lesson.dog,'Dogs have an amazing sense of smell. They can smell things humans cannot. Police use dogs to find missing people and objects.');
 assert.deepEqual(lesson.coreMinutes,[2,1,3,4,3,5,6,4,2]);
 assert.equal(lesson.coreMinutes.reduce((a,b)=>a+b,0),30);
 assert.equal(lesson.catNotes.length,3);assert.equal(lesson.habits.length,4);
 assert.equal(lesson.next,'Making a Great Opening!');
});
test("backups from another curriculum cannot be relabelled as this lesson",()=>{
 const a=fresh();delete a.lessonId;assert.equal(valid(a),false);
 const b=fresh();b.session=3;assert.equal(valid(b),false);
 const c=fresh();c.lessonId='another-period';assert.equal(valid(c),false);
});

test('every page has a distinct lesson check with one valid answer',()=>{
 assert.equal(checks.length,stages.length);
 assert.equal(new Set(checks.map(c=>c[0])).size,18);
 checks.forEach(([question,options,answer])=>{
  assert.ok(question.length>10);
  assert.equal(options.length,3);
  assert.equal(new Set(options).size,3);
  assert.equal(options.filter(x=>x===answer).length,1);
 });
 assert.equal(checks[6][2],'Wings fly');
 assert.equal(checks[7][2],'Dogs help find people and objects');
 assert.equal(checks[17][2],lesson.next);
});
