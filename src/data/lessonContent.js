export const filters = ["Small-scale", "Fair", "Useful", "Appealing"];
export const filterHints = [
  "Can students run it with simple resources?",
  "Is it affordable and fair for students?",
  "Does it solve a real problem?",
  "Would someone want to use it?",
];
export const scenes = [
  {
    title: "Nova Opens the World",
    short: "The world",
    zone: "The observatory",
    minutes: 2,
    quote:
      "Somewhere right now — a 12-year-old started a business. What’s stopping you?",
    pose: "challenge",
    teacher:
      "Ask for 1–2 examples of a business started by a young person. Keep it fast.",
  },
  {
    title: "Today’s Mission",
    short: "The mission",
    zone: "Mission control",
    minutes: 1,
    quote: "Four steps. Three concepts. One world of possibility.",
    pose: "explaining",
    teacher:
      "Frame the four steps quickly. Every student will leave with three business concepts on paper.",
  },
  {
    title: "What Makes a Valid School Business?",
    short: "Four filters",
    zone: "The validation gates",
    minutes: 3,
    quote:
      "Small-scale. Fair. Useful. Appealing. Can your idea make it through?",
    pose: "referee",
    teacher:
      "Read each idea. Take a thumbs-up/down vote for each filter. Tiffin delivery passes in this lesson’s example.",
  },
  {
    title: "The Problem First Rule",
    short: "Problem first",
    zone: "The observation deck",
    minutes: 3,
    quote: "Don’t start with the idea. Start with the problem.",
    pose: "curious",
    teacher:
      "Ask: What is one problem you face every day at school? Record two seeds, such as canteen queues or heavy bags.",
  },
  {
    title: "Live Example: PenStop",
    short: "PenStop",
    zone: "The concept laboratory",
    minutes: 2,
    quote: "Small, fair, useful, appealing. 4 for 4.",
    pose: "explaining",
    teacher:
      "One student per filter. Walk through the four filters in 30 seconds. The ₹2 is a refundable deposit, not a fee.",
  },
  {
    title: "Problem Hunt: 60-Second Storm",
    short: "Problem storm",
    zone: "The storm chamber",
    minutes: 4,
    quote: "Don’t think. Just write. Judge later.",
    pose: "countdown",
    teacher:
      "Students can write on paper. Capture their problems here. Afterwards: Who got more than 5? 8? 10? Highest scorer reads three.",
  },
  {
    title: "The Filter Challenge",
    short: "The gauntlet",
    zone: "The validation gates",
    minutes: 3,
    quote: "One idea. Four gates. Let’s see what survives.",
    pose: "referee",
    teacher:
      "Thumbs up or down. If a vote is close, allow a 10-second debate. One failed filter stops the idea.",
  },
  {
    title: "WHO WHAT HOW: Build It Live",
    short: "Build it live",
    zone: "The concept laboratory",
    minutes: 4,
    quote: "One sentence each. Let’s build something worth backing.",
    pose: "builder",
    teacher:
      "Choose one storm problem. Ask WHO has it, WHAT is the issue, and HOW we could solve it. Type the class consensus.",
  },
  {
    title: "Concept Wars",
    short: "Concept wars",
    zone: "The venture arena",
    minutes: 4,
    quote: "20 seconds. No rambling. Make it count.",
    pose: "challenge",
    teacher:
      "Pairs build for 2 minutes, then two pairs pitch for 20 seconds each. Vote on the more real problem. Run a second battle if time allows.",
  },
  {
    title: "Solo: Draft Your Concept List",
    short: "Your concepts",
    zone: "The founder’s workbench",
    minutes: 3,
    quote: "Three ideas. Your name on the map.",
    pose: "thinking",
    teacher:
      "Concept 1 comes from pair work; create two more independently. At least one must pass all four filters. Invite two students to share.",
  },
  {
    title: "Nova’s Leaderboard & Close",
    short: "The next chapter",
    zone: "The auction hall",
    minutes: 2,
    quote: "Look at the map.",
    pose: "proud",
    teacher:
      "Confirm classroom totals, including paper work. Ask the recap question aloud. Remind students to bring their list to Class 2’s auction.",
  },
];
export const mission = [
  "Understand a valid school business",
  "Brainstorm 3 small-scale concepts",
  "Test ideas against all 4 filters",
  "Create your draft concept list",
];
export const examples = [
  {
    name: "Imported sneakers",
    symbol: "01",
    answers: [false],
    reason:
      "Check the scale. Importing sneakers needs resources beyond a small school business.",
  },
  {
    name: "Handmade bookmarks",
    symbol: "02",
    answers: [true, true, true, true],
    reason:
      "Simple materials, fair pricing, useful for readers, and designs students want.",
  },
  {
    name: "Tiffin delivery inside school",
    symbol: "03",
    answers: [true, true, true, true],
    reason:
      "In our classroom example: a small, fairly priced service that helps students get their lunch.",
  },
];
export const challenges = [
  examples[0],
  {
    name: "₹200 lunch",
    symbol: "02",
    answers: [true, false],
    reason:
      "Would that be fair for students? ₹200 makes an everyday school lunch too expensive in this example.",
  },
  {
    name: "Book exchange stall",
    symbol: "03",
    answers: [true, true, true, true],
    reason:
      "Small, fair, useful, appealing. Students exchange books they already own.",
  },
];
export const penstop = {
  name: "PenStop",
  who: "Students in Grades 6–8",
  what: "Forget stationery, can’t borrow easily",
  how: "Classroom lending library. ₹2 deposit, returned on return.",
  filters: [true, true, true, true],
};
