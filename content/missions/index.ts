import { z } from "zod";

import { missionSchema } from "@/lib/missions";

export const missions = [
  {
    id: "module-1-found-problem",
    module: 1,
    title: "Find a real problem around you",
    conceptTags: ["problem-framing", "customer-interview", "evidence"],
    goal: "Talk to 5 people about something that bothers them again and again. Find one clear problem.",
    whyItMatters:
      "Learners need to prove the pain exists before they build anything. Real interview notes replace guesswork and help them see the difference between a complaint and a real problem.",
    instructions: [
      "Talk to five people who face the same pain in a normal day.",
      "Ask what happened, how often it happens, what they do today, and what it costs in time or stress.",
      "Write one sentence that explains the problem in their words.",
      "Take an anonymised note or screenshot of the conversation summary.",
    ],
    timeEstimateMinutes: 90,
    costEstimateInr: 0,
    difficulty: "easy",
    safetyNotes: [
      "Only speak to people who consent to a short conversation.",
      "Do not record private financial details or full names.",
      "If you meet someone, meet in a public place and tell someone where you are going.",
    ],
    proofRequirements: [
      { id: "interview-log", label: "Interview log", type: "interview_log", required: true, description: "One entry per person with date, context, and key quote.", minCount: 5 },
      { id: "problem-statement", label: "Problem statement", type: "text", required: true, description: "One clear sentence describing the pain and the person it affects.", minCount: 1 },
      { id: "quote", label: "Strong quote", type: "text", required: true, description: "One direct customer quote with context.", minCount: 1 },
    ],
    rubric: [
      { id: "problem-clarity", label: "Problem clarity", description: "The learner explains the pain in a specific, testable way.", maxScore: 5 },
      { id: "evidence-quality", label: "Evidence quality", description: "The submission uses actual customer detail and quotes.", maxScore: 5 },
      { id: "safety", label: "Safety and consent", description: "The learner protects privacy and discusses the problem safely.", maxScore: 5 },
    ],
    exampleStrong:
      "I spoke to five hostel students and all of them said laundry pickup was late during exam week. One student said, 'I had a presentation and had to wear the same shirt twice because the pickup came only the next afternoon.' The pain is not just inconvenience. It creates stress and damaged credibility.",
    exampleWeak:
      "People hate laundry, so there is probably a big market for it. I think many people want an app.",
    saferAlternative: {
      title: "Talk to 3 friends and one local shop owner",
      summary: "A lower-risk version that still checks customer pain without a larger outreach effort.",
    },
    realitySyncFields: ["customerPersona", "customerSegments", "quality"],
    badge: "Spotted the real problem",
  },
  {
    id: "module-2-customer-problem",
    module: 2,
    title: "Get to know your customer",
    conceptTags: ["personas", "qualitative-research", "behaviour"],
    goal: "Talk to real people and make a simple customer card: who they are, what they need, what bugs them.",
    whyItMatters:
      "A founder must know who they are serving, not just what the problem is. Personas reduce false assumptions and help a learner design better experiments.",
    instructions: [
      "Choose one customer group from your earlier interviews.",
      "Interview at least three people in that group.",
      "Capture their context, trigger, pain, workaround, and willingness to pay in a simple log.",
      "Write one persona summary and one customer quote.",
    ],
    timeEstimateMinutes: 120,
    costEstimateInr: 0,
    difficulty: "easy",
    safetyNotes: ["Never share a person's full name or contact details in a submission.", "Do not record or upload private WhatsApp chats without consent."],
    proofRequirements: [
      { id: "persona-summary", label: "Persona summary", type: "text", required: true, description: "Short summary of who, what, and why this customer matters.", minCount: 1 },
      { id: "customer-log", label: "Interview log", type: "interview_log", required: true, description: "Three customer note entries with context and trigger details.", minCount: 3 },
      { id: "quote", label: "Customer quote", type: "text", required: true, description: "A direct quote showing the pain or trigger.", minCount: 1 },
    ],
    rubric: [
      { id: "persona-specificity", label: "Specificity", description: "The persona is concrete and tied to a real customer context.", maxScore: 5 },
      { id: "behavioural-evidence", label: "Behavioural evidence", description: "The learner distinguishes what customers say from how they act.", maxScore: 5 },
      { id: "workaround", label: "Workaround detail", description: "The learner captures what customers do today and why it is inconvenient.", maxScore: 5 },
    ],
    exampleStrong:
      "This is a hostel student in Pune who needs reliable laundry pickup before class. They currently use roommates, local dhobi services, and costly last-minute alternatives. This customer is motivated by reliability and speed, not just price.",
    exampleWeak:
      "Students are busy and want convenience.",
    saferAlternative: {
      title: "Persona from 2 friends + 1 local shop owner",
      summary: "A simpler version with fewer interviews and a clearer target customer.",
    },
    realitySyncFields: ["customerPersona", "conversionRate", "customerSegments"],
    badge: "Customer insight locked in",
  },
  {
    id: "module-3-validate-idea",
    module: 3,
    title: "Test if people really want your idea",
    conceptTags: ["validation", "landing-page", "conversion"],
    goal: "Run a tiny test to see if people will try your idea — and if they will pay for it.",
    whyItMatters:
      "Validation reduces the risk of building something no one wants. A real landing page, signup count, or small paid pilot turns a thesis into learning.",
    instructions: [
      "Create a simple landing page or one-page prototype for your idea.",
      "Share it with your target audience and collect at least 10 visitors or sign-ups.",
      "If possible, ask for payment, a waitlist, or a pilot.",
      "Capture the conversion rate, drop-off, and the key reason people clicked away.",
    ],
    timeEstimateMinutes: 180,
    costEstimateInr: 250,
    difficulty: "medium",
    safetyNotes: [
      "Do not promise payment or a product before clarifying what is being tested.",
      "Do not collect personal identity data unless it is necessary and given freely.",
    ],
    proofRequirements: [
      { id: "landing-page-link", label: "Landing page or prototype", type: "link", required: true, description: "Link to the test page or prototype you used.", minCount: 1 },
      { id: "traffic-numbers", label: "Traffic or sign-up numbers", type: "numbers", required: true, description: "At least 10 visits or sign-ups with dates.", minCount: 1 },
      { id: "reflection", label: "Reflection", type: "text", required: true, description: "Explain what you learned from the test and what changed.", minCount: 1 },
    ],
    rubric: [
      { id: "test-design", label: "Test design", description: "The learner ran a realistic, low-cost test with a clear metric.", maxScore: 5 },
      { id: "evidence", label: "Evidence", description: "The numbers, page link, and reflection match the actual outcome.", maxScore: 5 },
      { id: "learning", label: "Learning", description: "The learner updates their assumptions and identifies the next test.", maxScore: 5 },
    ],
    exampleStrong:
      "A landing page for a laundry pickup service got 42 visits in 10 days, 7 sign-ups, and 2 paid waitlist confirmations. The main reason people exited was that they wanted a faster pickup guarantee from trusted local providers.",
    exampleWeak:
      "I posted on social media and people liked it, so the idea is good.",
    saferAlternative: {
      title: "Simple waitlist test",
      summary: "Run a no-cost waitlist page with 10 sign-ups instead of a full landing page and ads.",
    },
    realitySyncFields: ["conversionRate", "reach", "customerSegments"],
    badge: "Tested my idea",
  },
  {
    id: "module-4-mvp",
    module: 4,
    title: "Make a simple first version",
    conceptTags: ["mvp", "speed", "iteration"],
    goal: "Make the simplest version of your idea that still helps someone. Don't build too much!",
    whyItMatters:
      "A founder learns more from a basic usable version than a long, expensive build. Small tests reveal what is real, valuable, and worth improving.",
    instructions: [
      "Create the smallest version of the product that solves the core customer problem.",
      "List the top 3 features you intentionally left out.",
      "Ask one real user to try it and record what they experienced.",
      "Explain the next change based on that feedback.",
    ],
    timeEstimateMinutes: 240,
    costEstimateInr: 500,
    difficulty: "medium",
    safetyNotes: ["Do not ask people to pay for a product before it works in a basic way.", "Be clear that this is a pilot and feedback is welcome."],
    proofRequirements: [
      { id: "prototype-link", label: "Prototype or demo", type: "link", required: true, description: "Link to the MVP, demo, or prototype used in testing.", minCount: 1 },
      { id: "user-feedback", label: "User feedback", type: "text", required: true, description: "Feedback from at least one real user.", minCount: 1 },
      { id: "next-step", label: "Next step", type: "text", required: true, description: "What you will change after this feedback.", minCount: 1 },
    ],
    rubric: [
      { id: "focus", label: "Focus", description: "The MVP solves one problem really well and does not overreach.", maxScore: 5 },
      { id: "user-feedback", label: "Feedback", description: "The learner captured real user reactions and did not guess.", maxScore: 5 },
      { id: "iteration-plan", label: "Iteration plan", description: "The next action comes directly from real evidence.", maxScore: 5 },
    ],
    exampleStrong:
      "I built a no-login waitlist and a simple local pickup request form. One user used it successfully and said the clarity of the pickup status was what made the product useful. The next improvement is a clearer status update after booking.",
    exampleWeak:
      "I built a big polished app because I assumed people would like it.",
    saferAlternative: {
      title: "No-code pilot",
      summary: "Use Google Forms, a simple landing page, or a WhatsApp flow instead of a custom app.",
    },
    realitySyncFields: ["quality", "customerPersona", "reach"],
    badge: "Built the smallest useful version",
  },
  {
    id: "module-5-pricing-money",
    module: 5,
    title: "Choose a fair price",
    conceptTags: ["pricing", "margin", "unit-economics"],
    goal: "Find a price that feels fair to customers and still leaves you some profit.",
    whyItMatters:
      "Many founders either undercharge or price from gut feel. A price test helps the learner match value to cost and learn the real unit economics.",
    instructions: [
      "Choose a product or service you can explain simply.",
      "Estimate your variable cost and decide on a pricing model.",
      "Ask at least 3 people what they would pay, and note why.",
      "Compare their responses with your cost assumptions.",
    ],
    timeEstimateMinutes: 150,
    costEstimateInr: 100,
    difficulty: "medium",
    safetyNotes: ["Never ask for payment details beyond what is needed for a basic test.", "Be clear if this is a pricing opinion only."],
    proofRequirements: [
      { id: "price-test", label: "Price test", type: "numbers", required: true, description: "Three actual responses with named or approximate price points.", minCount: 3 },
      { id: "cost-sheet", label: "Cost and margin notes", type: "text", required: true, description: "Short notes showing cost assumptions and margin thinking.", minCount: 1 },
      { id: "reflection", label: "Reflection", type: "text", required: true, description: "What the learner learned from the test and what they would do next.", minCount: 1 },
    ],
    rubric: [
      { id: "pricing-logic", label: "Pricing logic", description: "The learner writes a price choice based on value and cost.", maxScore: 5 },
      { id: "customer-signal", label: "Customer signal", description: "The learner captured real price reactions.", maxScore: 5 },
      { id: "unit-economics", label: "Unit economics", description: "The learner knows the trade-off between price and cost.", maxScore: 5 },
    ],
    exampleStrong:
      "The service costs us ₹50 in variable cost per delivery. Three users said they would pay ₹199, ₹249, and ₹299. The best price is ₹249 because it covers cost and still feels priced for convenience.",
    exampleWeak:
      "Let's charge ₹99 because it sounds affordable.",
    saferAlternative: {
      title: "Cost and value comparison",
      summary: "Use a simple spreadsheet and 2-3 interviews rather than a live paid test.",
    },
    realitySyncFields: ["averagePrice", "monthlyBurn", "conversionRate"],
    badge: "Priced for value",
  },
  {
    id: "module-6-growth",
    module: 6,
    title: "Find your first customers",
    conceptTags: ["marketing", "funnel", "distribution"],
    goal: "Pick one way to tell people about your idea (like WhatsApp or a poster) and count who responds.",
    whyItMatters:
      "Without a clear channel, growth is random and expensive. Good distribution turns interest into repeatable customer acquisition.",
    instructions: [
      "Choose one channel to test, such as WhatsApp, Instagram, local college groups, or a simple referral program.",
      "Explain the exact funnel you will test.",
      "Measure traffic, click-through, sign-ups, or sales for 7 days.",
      "Decide which part of the funnel is leaking.",
    ],
    timeEstimateMinutes: 180,
    costEstimateInr: 200,
    difficulty: "medium",
    safetyNotes: ["Do not spam people. Target the audience deliberately and respect opt-in rules.", "Do not promise a result or false guarantee in messages."],
    proofRequirements: [
      { id: "channel-test", label: "Channel test", type: "numbers", required: true, description: "A screenshot, log, or numbers showing the channel test results.", minCount: 1 },
      { id: "funnel-steps", label: "Funnel steps", type: "text", required: true, description: "The exact funnel and what each step measured.", minCount: 1 },
      { id: "improvement-plan", label: "Improvement plan", type: "text", required: true, description: "What changed and why.", minCount: 1 },
    ],
    rubric: [
      { id: "channel-choice", label: "Channel choice", description: "The learner picks a channel matching the audience and budget.", maxScore: 5 },
      { id: "measurement", label: "Measurement", description: "The test includes a valid funnel with numbers and timing.", maxScore: 5 },
      { id: "learning", label: "Learning", description: "The learner uses the data to identify the leak.", maxScore: 5 },
    ],
    exampleStrong:
      "I tested a local WhatsApp community and got 30 views, 7 clicks, and 2 sign-ups in 7 days. The leak was not demand but unclear messaging. I will change the headline and add proof.",
    exampleWeak:
      "I posted randomly and got a few likes, so I assume the channel works.",
    saferAlternative: {
      title: "Referral test",
      summary: "Ask 10 people to share with two trusted contacts each and measure responses without paying for ads.",
    },
    realitySyncFields: ["reach", "conversionRate", "customerSegments"],
    badge: "Found my first customers",
  },
  {
    id: "module-7-team-leadership",
    module: 7,
    title: "Get help and stay organised",
    conceptTags: ["team", "roles", "leadership"],
    goal: "Decide the first job you need help with, and write simple steps so things don't get messy.",
    whyItMatters:
      "A founder's first team is not about hiring a big team. It is about clarity, responsibility, and the simplest process that helps work happen.",
    instructions: [
      "Identify the first work that needs a repeatable process or a second person.",
      "Write a simple role or checklist.",
      "Test the process with a real user or teammate.",
      "Explain what went wrong and what would change next.",
    ],
    timeEstimateMinutes: 180,
    costEstimateInr: 0,
    difficulty: "medium",
    safetyNotes: ["Do not ask for personal or private work information from others without consent.", "Do not pressure classmates or friends into unpaid labour."],
    proofRequirements: [
      { id: "role-document", label: "Role or workflow", type: "text", required: true, description: "A short description of the role, responsibility, or workflow.", minCount: 1 },
      { id: "feedback", label: "Working feedback", type: "text", required: true, description: "Notes from the test of the process.", minCount: 1 },
      { id: "improvement", label: "Improvement", type: "text", required: true, description: "What would change next.", minCount: 1 },
    ],
    rubric: [
      { id: "clarity", label: "Clarity", description: "Roles and responsibilities are specific, not vague.", maxScore: 5 },
      { id: "process", label: "Process", description: "The learner defines a realistic workflow to reduce confusion.", maxScore: 5 },
      { id: "iteration", label: "Iteration", description: "The learner learns from the team/test and improves it.", maxScore: 5 },
    ],
    exampleStrong:
      "I set up a simple handoff checklist for customer interviews: one person handles outreach, another writes the notes, and we tag the quote before the next call. This reduced confusion and made the process repeatable.",
    exampleWeak:
      "We will figure out roles later when we have more people.",
    saferAlternative: {
      title: "Simple workflow test",
      summary: "Write a one-page checklist and test it with one or two friends instead of onboarding a real team.",
    },
    realitySyncFields: ["quality", "customerSegments", "reach"],
    badge: "Built my team basics",
  },
  {
    id: "module-8-pitch",
    module: 8,
    title: "Pitch your idea with proof",
    conceptTags: ["pitching", "fundraising", "proof"],
    goal: "Make a short pitch that uses real numbers and real stories — not just big words.",
    whyItMatters:
      "The strongest pitches are clear, credible, and grounded in what the learner has actually learned from users and the market.",
    instructions: [
      "Prepare a pitch for a short conversation with a potential mentor, investor, or college competition.",
      "Use verified numbers and real evidence.",
      "Include the problem, customer, solution, traction, and next step.",
      "Ask for feedback and write down what changed after the conversation.",
    ],
    timeEstimateMinutes: 150,
    costEstimateInr: 0,
    difficulty: "medium",
    safetyNotes: ["Do not make fake claims or pretend to have traction you do not have.", "Do not pitch to people who did not consent to a hearing."],
    proofRequirements: [
      { id: "pitch-deck", label: "Pitch or outline", type: "file", required: true, description: "A short deck, one-pager, or pitch outline.", minCount: 1 },
      { id: "evidence", label: "Evidence", type: "numbers", required: true, description: "At least 3 real data points that back the story.", minCount: 3 },
      { id: "feedback", label: "Feedback reflection", type: "text", required: true, description: "What you learned from the conversation and what you changed.", minCount: 1 },
    ],
    rubric: [
      { id: "evidence", label: "Evidence", description: "The pitch backs claims with actual data and learning.", maxScore: 5 },
      { id: "clarity", label: "Clarity", description: "The story is understandable, specific, and realistic.", maxScore: 5 },
      { id: "adaptation", label: "Adaptation", description: "The learner responds to feedback with a clear improvement.", maxScore: 5 },
    ],
    exampleStrong:
      "We tested a local pickup service with 42 visitors and 7 sign-ups. Our best evidence shows that applicants care most about reliability and price. The next step is to improve pickup trust and test a price of ₹249.",
    exampleWeak:
      "We are solving a huge problem and we will disrupt the market with a world-class app.",
    saferAlternative: {
      title: "Pitch to a mentor",
      summary: "Use a 3-minute mentor discussion instead of a public investor pitch.",
    },
    realitySyncFields: ["averagePrice", "valuation", "customerSegments"],
    badge: "Pitch with proof",
  },
  {
    id: "module-9-scale",
    module: 9,
    title: "Grow step by step",
    conceptTags: ["scaling", "systems", "metrics"],
    goal: "Choose ONE next step to grow, based on what you learned from real customers.",
    whyItMatters:
      "Scaling is not doing more of everything. It is learning which actions increase value without breaking the business or the customer experience.",
    instructions: [
      "Choose one metric or system that matters to your venture's next stage.",
      "Measure what is working and what is not.",
      "Decide on the simplest scaling step you can take.",
      "Explain what you would test next and why.",
    ],
    timeEstimateMinutes: 180,
    costEstimateInr: 200,
    difficulty: "hard",
    safetyNotes: ["Avoid scaling decisions that require risky personal borrowing or manipulation of customers.", "Respect consent and do not fake demand."],
    proofRequirements: [
      { id: "metric-log", label: "Metric or system log", type: "numbers", required: true, description: "A log of the key metric or system you are scaling.", minCount: 1 },
      { id: "scaling-plan", label: "Scaling plan", type: "text", required: true, description: "The decision and why it makes sense.", minCount: 1 },
      { id: "next-test", label: "Next test", type: "text", required: true, description: "The next result you will watch.", minCount: 1 },
    ],
    rubric: [
      { id: "signal", label: "Signal", description: "The scale step is based on real customer or business signals.", maxScore: 5 },
      { id: "discipline", label: "Discipline", description: "The learner selects a manageable action that protects quality.", maxScore: 5 },
      { id: "measurement", label: "Measurement", description: "The next test is specific and measurable.", maxScore: 5 },
    ],
    exampleStrong:
      "We saw that signups concentrated in campuses with reliable pickup and a fast response time. The next step is to keep the promise narrow, hire one reliability coordinator, and measure repeat use before expanding to more areas.",
    exampleWeak:
      "Let's expand everywhere as soon as we get funding.",
    saferAlternative: {
      title: "Local expansion test",
      summary: "Choose one small market or one cohort and measure before expanding further.",
    },
    realitySyncFields: ["reach", "quality", "conversionRate"],
    badge: "Grew the smart way",
  },
] as const;

export const missionCatalog = z.array(missionSchema).parse(missions);

export const missionById = Object.fromEntries(missionCatalog.map((mission) => [mission.id, mission]));

export default missionCatalog;
