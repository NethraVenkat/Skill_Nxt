/**
 * Lesson content, taken from the blueprint: Grade 4 Communication & Leadership, Module 4, Class 1 —
 * "Translating Notes into Speech". Guide: Echo the Mic. Pedagogy: the 3-Note Trick + Partner Talk.
 */
export const LESSON = {
  grade: "Grade 4",
  course: "Communication & Leadership",
  module: "Module 4 · Creative Writing & Speaking",
  title: "Translating Notes into Speech",
};

export const slides = [
  {
    n: 1,
    slug: "echo-arrives",
    title: "Echo Arrives",
    min: 2,
    purpose:
      "Hook attention, introduce Echo, and create curiosity about speaking naturally.",
  },
  {
    n: 2,
    slug: "todays-plan",
    title: "What Are We Doing Today?",
    min: 1,
    purpose: "A simple, clear plan so you know exactly what to expect.",
  },
  {
    n: 3,
    slug: "reading-vs-talking",
    title: "Reading vs Talking",
    min: 3,
    purpose:
      "Feel the difference between textbook reading and natural speaking.",
  },
  {
    n: 4,
    slug: "three-note-trick",
    title: "The 3-Note Trick",
    min: 4,
    purpose: "Turn a paragraph into 3 short memory notes.",
  },
  {
    n: 5,
    slug: "watch-echo",
    title: "Watch Echo Do It",
    min: 3,
    purpose: "See the whole journey: paragraph → notes → speech.",
  },
  {
    n: 6,
    slug: "make-your-notes",
    title: "Your Turn: Make Your Notes",
    min: 5,
    purpose: "Write your own 3-note card from a paragraph.",
  },
  {
    n: 7,
    slug: "partner-talk",
    title: "Talk to Your Partner",
    min: 6,
    purpose: "Two rounds of speaking and listening with a partner.",
  },
  {
    n: 8,
    slug: "star-speakers",
    title: "Star Speakers!",
    min: 4,
    purpose: "Brave volunteers speak to the whole class.",
  },
  {
    n: 9,
    slug: "recap",
    title: "Recap with Echo",
    min: 2,
    purpose: "The 4 big takeaways, and a peek at Class 2.",
  },
];

export const teacherScript = {
  1: {
    say: "“Everyone — meet Echo! Has anyone ever read from paper and sounded flat, like a robot? ‘The. Cat. Sat. On. The. Mat.’ We fix that today!”",
    prompt: "Hands up if reading aloud sometimes sounds robotic!",
    expect: "Most hands go up, laughs, recognition.",
  },
  2: {
    say: "“Four things today. Simple. By the end — you’ll be talking from memory, not reading from paper. Ready?”",
    prompt: "Setup slide only — do not pause for discussion.",
    expect: "Rapid framing to maximise speaking time.",
  },
  3: {
    say: "“(Read A robotically) Now listen to this — (say B warmly). Same information. Which one did you enjoy more?”",
    prompt: "Hands up for Version B! Why did it sound better?",
    expect: "More fun / sounds like a real person talking!",
  },
  4: {
    say: "“The note is NOT the speech. When you see ‘Sleep — 16 hours’, you don’t read that. You say: ‘Cats actually sleep up to 16 hours every day!’”",
    prompt: "If your note says ‘Sharp claws’, what would you SAY?",
    expect: "“Cats have really sharp claws they use for climbing!”",
  },
  5: {
    say: "“Watch how Echo uses the notes — just glances at them. Doesn’t read them word for word.”",
    prompt: "Did Echo read the notes or just use them to remember?",
    expect: "Just used them to remember!",
  },
  6: {
    say: "“Read the paragraph. Find 3 big ideas. Write each in 3–4 words — no full sentences. You have 3 minutes. Go!”",
    prompt: "Who wants to share their first note?",
    expect: "‘Amazing smell’, ‘Smell what humans can’t’, ‘Police use dogs’.",
  },
  7: {
    say: "“Face your partner. Glance at your notes — then look UP. Talk like you’re sharing something cool. Partner — did it sound like talking or reading? Go!”",
    prompt: "Partners — did they look up? Did it sound natural?",
    expect: "Sounded like talking / good eye contact!",
  },
  8: {
    say: "“Two brave volunteers — who wants to go first? Same notes. Talk to us — not to your paper. Everyone else — get ready to clap!”",
    prompt: "One clap, two claps, or three? Why?",
    expect: "Enthusiastic 2 and 3 claps. Celebrate every attempt.",
  },
  9: {
    say: "“Four things today — let’s say them together: Robotic! Notes! Look up! Natural! Next class — we learn how to make people WANT to listen from sentence one!”",
    prompt: "What are notes for in speaking?",
    expect: "“To help you remember / not to read from!”",
  },
};

/**
 * The letters that arrive at Echo's Talking Post. Each has three sentences (one big idea each),
 * Echo's own 3 notes, three "decoy" ideas (so the receiver can show what really reached them), and
 * a question the receiver can send back.
 */
export const LETTERS = [
  {
    id: "cats",
    icon: "🐱",
    topic: "Cats",
    from: "Granny Meena, who has five cats",
    text: "Cats sleep for up to 16 hours every day. They have sharp claws that help them climb trees. Cats can make more than 100 different sounds.",
    notes: ["Sleep — 16 hrs", "Sharp claws, climb", "100+ sounds"],
    decoys: ["Cats can swim very fast", "Cats eat only leaves", "Cats live in the sea"],
    ask: "Which sound does your cat make most?",
  },
  {
    id: "dogs",
    icon: "🐶",
    topic: "Dogs",
    from: "Officer Ravi of the police dog team",
    text: "Dogs have an amazing sense of smell. They can smell things humans cannot. Police use dogs to find missing people and objects.",
    notes: ["Amazing smell", "Smell what humans can’t", "Police use dogs"],
    decoys: ["Dogs can see in colour like us", "Dogs never sleep", "Dogs hate water"],
    ask: "What would you want a police dog to find?",
  },
  {
    id: "elephants",
    icon: "🐘",
    topic: "Elephants",
    from: "Zoo Keeper Zara",
    text: "Elephants are the biggest animals on land. They use their long trunks to drink water and pick up food. Elephants never forget their friends and family.",
    notes: ["Biggest land animal", "Trunk drinks, eats", "Never forget friends"],
    decoys: ["Elephants can fly short distances", "Elephants eat fish", "Elephants are tiny at 5 years"],
    ask: "Why do you think elephants remember their friends?",
  },
  {
    id: "moon",
    icon: "🌙",
    topic: "The Moon",
    from: "Captain Kavya, astronaut",
    text: "The Moon goes around the Earth. It has no light of its own and shines because the Sun lights it up. Astronauts first walked on the Moon in 1969.",
    notes: ["Goes around Earth", "Sun lights it", "Walked on — 1969"],
    decoys: ["The Moon is made of cheese", "The Moon has big oceans", "People live on the Moon"],
    ask: "Would you like to walk on the Moon? Why?",
  },
  {
    id: "diwali",
    icon: "🪔",
    topic: "Diwali",
    from: "Your neighbour, Aunty Lakshmi",
    text: "Diwali is the festival of lights. Families light lamps called diyas and make colourful rangoli. People share sweets with friends and neighbours.",
    notes: ["Festival of lights", "Diyas and rangoli", "Share sweets"],
    decoys: ["Diwali is in the snow", "People stay inside all day", "Diwali has no lights"],
    ask: "What is your favourite Diwali sweet?",
  },
  {
    id: "bees",
    icon: "🐝",
    topic: "Bees",
    from: "Farmer Arjun",
    text: "Bees make honey from the nectar of flowers. They dance to tell other bees where the flowers are. Without bees, many plants could not grow fruit.",
    notes: ["Honey from nectar", "Dance shows flowers", "Help fruit grow"],
    decoys: ["Bees live under the ground only", "Bees make milk", "Bees sleep all summer"],
    ask: "Have you ever seen a bee up close?",
  },
  {
    id: "penguins",
    icon: "🐧",
    topic: "Penguins",
    from: "Dr. Neel, who studies the South Pole",
    text: "Penguins are birds, but they cannot fly. They are excellent swimmers and use their wings like flippers. Penguin dads keep the eggs warm on their feet.",
    notes: ["Birds — can’t fly", "Wings like flippers", "Dads warm eggs"],
    decoys: ["Penguins live in the desert", "Penguins have four legs", "Penguins eat only bananas"],
    ask: "What would you name a baby penguin?",
  },
  {
    id: "rainbows",
    icon: "🌈",
    topic: "Rainbows",
    from: "Weather reporter Tara",
    text: "A rainbow appears when sunlight shines through raindrops. It always has seven colours in the same order. You can only see a rainbow with the Sun behind you.",
    notes: ["Sun through raindrops", "Seven colours, same order", "Sun behind you"],
    decoys: ["Rainbows come out at midnight", "Rainbows have two colours", "You can touch a rainbow"],
    ask: "Where did you last see a rainbow?",
  },
];
export const letterById = (id) => LETTERS.find((l) => l.id === id);

/** The kinds of receivers. Each new kind is a stamp in the Courier Passport — small to big. */
export const RECEIVERS = [
  { id: "echo", icon: "🎙️", name: "Echo", who: "Practise with Echo (Ride-Along)", color: "#d99410" },
  { id: "family", icon: "🏠", name: "Family", who: "Someone at home", color: "#c8372d" },
  { id: "friend", icon: "🧒", name: "Friend", who: "A friend or classmate", color: "#3a9d6e" },
  { id: "teacher", icon: "👩‍🏫", name: "Teacher", who: "A teacher or another grown-up at school", color: "#d6457a" },
  { id: "two", icon: "👫", name: "Two people", who: "Two listeners at the same time", color: "#3b7dd8" },
  { id: "group", icon: "👨‍👩‍👧‍👦", name: "Small group", who: "A group of 3–6 people", color: "#7c5cd6" },
  { id: "class", icon: "📢", name: "Class Bulletin", who: "The whole class (only when you’re ready!)", color: "#22305a" },
];

/** Things a receiver can say were great — one kind, specific compliment. */
export const GLOWS = [
  "👀 You looked at me",
  "🔊 Clear, strong voice",
  "😊 It sounded like telling, not reading",
  "🧠 You remembered your notes",
  "🦸 You were brave",
];

/** Bumpy Roads: the things that go wrong on a delivery — practised on purpose, where it’s safe. */
export const BUMPS = [
  {
    id: "torn",
    icon: "🎒",
    name: "Torn Bag",
    what: "A note falls out of your bag halfway through.",
    fix: "Say “Let me think…”, remember the idea in your own words, and keep going.",
  },
  {
    id: "dog",
    icon: "🐕",
    name: "Barking Dog",
    what: "A dog barks loudly while you talk.",
    fix: "Pause, smile, wait a second — then carry on from where you were.",
    sound: "Woof! Woof woof! WOOF!",
  },
  {
    id: "interrupt",
    icon: "🙋",
    name: "Interruption",
    what: "Someone interrupts you with a question.",
    fix: "Answer in one short sentence, then say “Anyway…” and get back to your message.",
    sound: "Excuse me! Excuse me! What did you say?",
  },
  {
    id: "rain",
    icon: "🌧️",
    name: "Rain on the Notes",
    what: "The rain smudges ALL your notes for 6 seconds.",
    fix: "Breathe in… breathe out… smile. Then start the idea again calmly.",
  },
  {
    id: "pardon",
    icon: "👂",
    name: "“Pardon? Louder!”",
    what: "The receiver can’t hear you.",
    fix: "Stand tall, take a big breath and make your voice bigger — not shouty.",
    sound: "Pardon? Sorry, I can’t hear you. A bit louder please!",
  },
];

/** Daily Postcard: one small, fun topic a day — 3 notes in a minute, then tell someone. */
export const POSTCARD_TOPICS = [
  "If you were a dog for one day",
  "The best snack in the world",
  "A superhero power you want",
  "Your favourite place at home",
  "A game you love to play",
  "If you could fly, where would you go?",
  "The funniest thing that happened to you",
  "Your favourite festival",
  "An animal you would like as a pet",
  "If you ruled the school for a day",
  "Your favourite rainy-day activity",
  "A person who makes you smile",
  "Your dream birthday party",
  "A food you will never eat — and why!",
  "If your toys could talk",
  "The best gift you ever got",
  "A place you want to visit",
  "Your favourite cartoon character",
  "What you want to be when you grow up",
  "If you met an alien",
  "Your favourite sport",
  "A day at the beach",
  "Something new you learned this week",
  "Your favourite book or story",
  "If you had a robot helper",
  "The coolest insect",
  "Your favourite season",
  "A kind thing someone did for you",
  "If you could live under the sea",
  "Your perfect Sunday",
  "A song that makes you dance",
];
export const postcardFor = (day) => {
  const n = Math.floor(new Date(day).getTime() / 86400000);
  return POSTCARD_TOPICS[
    ((n % POSTCARD_TOPICS.length) + POSTCARD_TOPICS.length) % POSTCARD_TOPICS.length
  ];
};

/** Split a paragraph into its sentences (each blueprint paragraph has one per note). */
export const sentencesOf = (text) =>
  text.split(/(?<=[.!?])\s+/).filter(Boolean);
