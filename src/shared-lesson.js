export const lesson = Object.freeze({
  id: "module4-class1-notes-to-speech",
  title: "Translating Notes into Speech",
  dog: "Dogs have an amazing sense of smell. They can smell things humans cannot. Police use dogs to find missing people and objects.",
  dogIdeas: [
    "Amazing sense of smell",
    "Scents humans miss",
    "Help find people",
  ],
  cats: "Cats sleep 16 hours. They have sharp claws for climbing. They can make 100+ sounds.",
  catNotes: ["Sleep — 16 hrs", "Sharp claws", "100+ sounds"],
  catSpeech: [
    "Cats can sleep up to 16 hours a day.",
    "Cats have sharp claws they use for climbing.",
    "Cats can make more than 100 sounds.",
  ],
  butterflyNotes: ["Start caterpillars", "Chrysalis change", "Wings fly"],
  butterflySpeech: [
    "Butterflies start as caterpillars.",
    "They change inside a chrysalis.",
    "An adult butterfly has wings and can fly.",
  ],
  formal: "The dog is a popular pet animal. It is loyal and friendly.",
  natural: "So—dogs! They’re popular pets, right? They’re loyal and friendly!",
  habits: [
    "Reading word for word can sound robotic.",
    "Turn paragraphs into three short notes.",
    "Glance at notes, then look toward listeners.",
    "Talk naturally, like talking to a friend.",
  ],
  coreMinutes: [2, 1, 3, 4, 3, 5, 6, 4, 2],
  next: "Making a Great Opening!",
});
export const routes = [
  {
    id: "guided",
    title: "Echo’s Director Studio",
    tag: "WATCH → BUILD → EXPLAIN",
    icon: "🎬",
    color: "orange",
    description:
      "Watch Echo demonstrate. Build your reminders and rehearse your own explanation.",
    focus: "Three short notes into natural speech.",
    topic: "The same PDF lesson",
    teacher:
      "Use explicit demonstration and guided practice. All routes teach the same PDF facts, three-note method, partner rounds, showcase and recap. Timings are shared across adjacent screens, not added per screen.",
  },
  {
    id: "detective",
    title: "Message Detectives",
    tag: "NOTICE → CHOOSE → EXPLAIN",
    icon: "🔍",
    color: "violet",
    description:
      "Investigate speaking examples. Find memory cues and explain the evidence to a listener.",
    focus: "Three short notes into natural speech.",
    topic: "The same PDF lesson",
    teacher:
      "Use noticing and evidence choices. Choices support explanation; the child still needs to speak. Do not award public scores or judge a child’s accent.",
  },
  {
    id: "broadcast",
    title: "Buddy Broadcast",
    tag: "TAKE TURNS → COACH → SHARE",
    icon: "🎙️",
    color: "mint",
    description:
      "Take speaker and coach roles. Build the same three reminders together, then share independently.",
    focus: "Three short notes into natural speech.",
    topic: "The same PDF lesson",
    teacher:
      "Use cooperative role-taking. Both partners speak from their own reminders. Coaching is one useful comment, not a public rating.",
  },
].map((r) => ({
  ...r,
  lessonId: lesson.id,
  paragraph: lesson.dog,
  example: lesson.dogIdeas,
  demoNotes: lesson.butterflyNotes,
  demo: lesson.butterflySpeech.join(" "),
  technique: ["Read paragraph", "Find three big ideas", "Write 3–4 words each"],
  opening: lesson.natural,
}));
export const stages = [
  ["Meet your teaching route", "Welcome"],
  ["Help Echo sound natural", "Hook · 2 min"],
  ["Four steps, one mission", "Roadmap · 1 min"],
  ["Reading or talking?", "Compare · 3 min"],
  ["Discover the three-note trick", "Technique · 4 min"],
  ["A note is a memory trigger", "Technique · 4 min"],
  ["Watch the butterfly demonstration", "Model · 3 min"],
  ["Read the dog discovery", "Create · 5 min"],
  ["Build your three reminders", "Create · 5 min"],
  ["Prepare your partner round", "Partner practice · 6 min"],
  ["Partner A explains", "Partner practice · 6 min"],
  ["Partner B explains", "Partner practice · 6 min"],
  ["One helpful listener comment", "Partner practice · 6 min"],
  ["Use it in another attempt", "Partner practice · 6 min"],
  ["Invite supported stage turns", "Showcase · 4 min"],
  ["Listen for the message", "Showcase · 4 min"],
  ["Four speaking habits", "Recap · 2 min"],
  ["Choose your next small step", "Reflection"],
].map(([title, group], i) => ({
  id: i,
  title,
  group,
  help:
    "Preserve the lesson message. Invite a real explanation and offer support. " +
    (i >= 9 && i <= 13
      ? "Give both partners a speaking turn. The whole partner block shares six minutes."
      : i >= 14 && i <= 15
        ? "Invite two volunteers with optional buddy support. Rotate future opportunities; the showcase block shares four minutes."
        : "Keep written reminders short and allow the child’s own wording."),
}));
