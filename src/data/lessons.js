/**
 * The syllabus: Grade 9 Coding & AI, Module 1 — Introduction to Dictionaries & Complex Data.
 * Every lesson is one page. Each one teaches one idea from the lesson and ends with a game.
 * The lesson's own example database is used everywhere; nothing outside the module is taught.
 */
export const database = {
  user1: { name: 'Arjun', age: 15, skills: ['Python', 'AI'] },
  user2: { name: 'Meera', age: 16, skills: ['ML', 'Data'] },
}

export const lessons = [
  {
    slug: 'real-data',
    title: 'Real Data Is Never Flat',
    chapter: 'The Scattered Memories',
    idea: 'One person has many connected pieces of information.',
    minutes: 3,
    tone: 'dawn',
  },
  {
    slug: 'nested-dictionaries',
    title: 'Nested Dictionaries',
    chapter: 'A House With Rooms',
    idea: 'A dictionary can hold another dictionary.',
    minutes: 3,
    tone: 'morning',
  },
  {
    slug: 'lists-in-dictionaries',
    title: 'Lists Inside Dictionaries',
    chapter: 'The Skills Shelf',
    idea: 'A key can hold a whole list of values.',
    minutes: 3,
    tone: 'morning',
  },
  {
    slug: 'accessing-values',
    title: 'Accessing Nested Values',
    chapter: 'The Key Finder',
    idea: 'Use keys, one after another, to reach a value.',
    minutes: 3,
    tone: 'day',
  },
  {
    slug: 'chained-access',
    title: 'Chained Access',
    chapter: 'The Paper Bird’s Flight',
    idea: 'Each [ ] goes one level deeper into the data.',
    minutes: 4,
    tone: 'day',
  },
  {
    slug: 'list-indexing',
    title: 'List Indexing',
    chapter: 'The Numbered Drawers',
    idea: 'Lists count from 0: index 1 is the second item.',
    minutes: 3,
    tone: 'day',
  },
  {
    slug: 'append',
    title: 'append()',
    chapter: 'Arjun Learns Something New',
    idea: 'append() adds one item to the end of a list.',
    minutes: 3,
    tone: 'afternoon',
  },
  {
    slug: 'bug-hunt',
    title: 'Bug Hunt',
    chapter: 'The Four Gremlins',
    idea: 'Commas, capital letters, indexes and method names: four bugs to fix.',
    minutes: 5,
    tone: 'storm',
  },
  {
    slug: 'multi-user-database',
    title: 'Building a Multi-User Database',
    chapter: 'The City Rises',
    idea: 'Many users, one database: users inside a dictionary.',
    minutes: 4,
    tone: 'afternoon',
  },
  {
    slug: 'functions',
    title: 'Functions: get_skill()',
    chapter: 'The Skill Machine',
    idea: 'A function packs an access path so you can reuse it.',
    minutes: 4,
    tone: 'afternoon',
  },
  {
    slug: 'looping',
    title: 'Looping Through Users',
    chapter: 'The Citizens’ Parade',
    idea: 'A for loop visits every user in the database.',
    minutes: 4,
    tone: 'golden',
  },
  {
    slug: 'challenge',
    title: 'Challenge Extension',
    chapter: 'The Tower Trials',
    idea: 'Add a key, build a function, loop the city.',
    minutes: 5,
    tone: 'golden',
  },
  {
    slug: 'review',
    title: 'Review & Close',
    chapter: 'The Festival of Lights',
    idea: 'Everything you learned, in one last game.',
    minutes: 3,
    tone: 'dusk',
  },
]

export const lessonIndex = (slug) => lessons.findIndex((l) => l.slug === slug)

export const labs = [
  {
    id: 'robot',
    title: 'Train Your Robot',
    blurb: 'Feed a blank bot a profile. Then it talks to you.',
    color: '#2f6fe0',
  },
  {
    id: 'music',
    title: 'Music App Playlist',
    blurb: 'Playlists are lists inside a user. Append a song.',
    color: '#7c4fe0',
  },
  { id: 'report', title: 'School Report Card', blurb: 'A function and a loop fill the report card.', color: '#15a39a' },
  {
    id: 'inventory',
    title: 'Game Inventory',
    blurb: 'Pick up items, equip by index. Watch out for errors.',
    color: '#f4a62a',
  },
  {
    id: 'delivery',
    title: 'Food Delivery Order',
    blurb: 'Orders inside customers, items inside orders.',
    color: '#ff7a59',
  },
]
