import { lesson } from "./shared-lesson.js";
const check = (question, answer, alternatives) => [
  question,
  [answer, ...alternatives],
  answer,
];
export const checks = [
  check(
    "What will we practise today?",
    "Explain ideas from three short notes",
    ["Memorise a long script", "Compete for the loudest voice"],
  ),
  check(
    "What changes between a robot voice and a friendly explanation?",
    "The delivery, not the message",
    ["All the facts", "The animal in every sentence"],
  ),
  check(
    "Which step makes your memory reminders?",
    "Turn ideas into three notes",
    ["Give a public score", "Read a full script again"],
  ),
  check(
    "What makes an explanation sound conversational?",
    "Sharing naturally with a listener",
    ["Reading every word stiffly", "Using only a louder voice"],
  ),
  check("Which cat idea matches “Sharp claws”?", "Claws help cats climb", [
    "Cats sleep 16 hours",
    "Cats make 100+ sounds",
  ]),
  check("Which is a short memory cue?", "Sharp claws", [
    "Cats have sharp claws they use for climbing.",
    "Read the entire paragraph.",
  ]),
  check("Which cue fits a butterfly emerging with wings?", "Wings fly", [
    "Start caterpillars",
    "Chrysalis change",
  ]),
  check(
    "Which idea belongs to the dog paragraph?",
    "Dogs help find people and objects",
    ["Dogs make 100+ sounds", "Dogs change inside a chrysalis"],
  ),
  check("Which is a short reminder rather than a script?", "Amazing smell", [
    "Dogs have an amazing sense of smell.",
    "Read every word on the page.",
  ]),
  check("Who gets a partner speaking turn?", "Both partners", [
    "Only the first partner",
    "Only confident volunteers",
  ]),
  check(
    "How should you use a speaking note?",
    "Glance, then explain to your listener",
    [
      "Keep reading the note repeatedly",
      "Hide all support before you are ready",
    ],
  ),
  check(
    "What happens after Partner A speaks?",
    "Partner B speaks and A listens",
    ["Partner A speaks every time", "Both stop practising"],
  ),
  check(
    "Which comment helps the next attempt?",
    "Explain your last idea more clearly",
    ["Your voice is bad", "Say everything louder"],
  ),
  check("What is the purpose of a second attempt?", "Use one helpful comment", [
    "Change all the facts",
    "Collect a public ranking",
  ]),
  check("What support can come to the stage?", "A buddy and a note card", [
    "No support is ever allowed",
    "Only a memorised script",
  ]),
  check("What is the audience’s job?", "Listen and recall one idea", [
    "Compare applause scores",
    "Interrupt to make the speaker lose their place",
  ]),
  check(
    "What are notes for in speaking?",
    "Reminders that you explain in your own words",
    ["Full sentences to read repeatedly", "A confidence grade"],
  ),
  check("What comes in the next class?", lesson.next, [
    "A different set of animal facts",
    "A competition for the loudest voice",
  ]),
];
