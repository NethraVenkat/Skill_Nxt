import { lesson as module1Lesson1 } from "./module-1-lesson-1";
import { lesson as module1Lesson2 } from "./module-1-lesson-2";
import { lesson as module1Lesson3 } from "./module-1-lesson-3";
import { lesson as module2Lesson1 } from "./module-2-lesson-1";
import { lesson as module2Lesson2 } from "./module-2-lesson-2";
import { lesson as module2Lesson3 } from "./module-2-lesson-3";
import { lesson as module3Lesson1 } from "./module-3-lesson-1";
import { lesson as module3Lesson2 } from "./module-3-lesson-2";
import { lesson as module3Lesson3 } from "./module-3-lesson-3";

export const allLessons = [
  module1Lesson1,
  module1Lesson2,
  module1Lesson3,
  module2Lesson1,
  module2Lesson2,
  module2Lesson3,
  module3Lesson1,
  module3Lesson2,
  module3Lesson3,
];

export function getLessonById(id: string) {
  return allLessons.find((lesson) => lesson.id === id);
}

export function getLessonByModule(moduleNumber: number) {
  return allLessons.filter((lesson) => lesson.module === moduleNumber);
}
