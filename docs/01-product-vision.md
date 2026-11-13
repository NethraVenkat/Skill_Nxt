# VentureCraft Product Vision

## Assumptions

- The first release is a browser-based responsive web app for learners aged 16 and above in India.
- A learner may create one active venture in the first release; a future release may support multiple ventures.
- The simulator uses fictional money and fictional customers. It teaches decision quality, not financial advice.
- A cohort has 5–8 learners and one facilitator. Cohort data is private to that cohort.
- Lessons are designed for 8–15 minutes, while real missions may take 20–90 minutes outside the app.
- The planned stack is Next.js, TypeScript, Tailwind, Framer Motion, Recharts/D3, Supabase, Claude API, and Vercel.
- English is the launch language. Examples use Indian rupees, Indian customer contexts, and simple English.
- AI features are assistive practice tools. They do not make business decisions or provide legal, medical, investment, or financial advice.

## Vision

VentureCraft is a mission-control simulator where a beginner learns entrepreneurship by running a virtual company, making consequential decisions, testing ideas in interactive labs, practising difficult conversations with AI, and transferring each lesson to a real idea. Instead of consuming a course, the learner builds a living venture from ₹10,00,000 virtual cash and 12 months of runway to a validated, pitch-ready business while the system makes cause and effect visible, lets the learner retry safely, and turns the work into a Venture Passport.

## Problem we solve

Beginners can find endless startup advice but struggle to turn it into behaviour. Text and videos hide trade-offs, give answers before effort, and rarely require evidence from a real customer. VentureCraft solves this by making every lesson a decision before explanation, showing the company consequence immediately, providing a structured retry, and requiring a real-world mission with proof. The learner develops judgement, not just vocabulary.

## Target personas

### 1. Ananya, the student builder

- **Profile:** 18, first-year college student in Pune, comfortable with a phone, has an idea for affordable hostel laundry pickup.
- **Starting point:** Curious but believes a good idea automatically becomes a business. Has little customer-interview experience.
- **Needs:** Short sessions, explicit examples, confidence to speak to strangers, feedback that does not shame early mistakes.
- **Success moment:** She interviews five hostel residents, changes her assumption about pickup timing, and can explain why her first customer segment is narrower.
- **Risk:** Drops off after a difficult mission or if the interface feels like a school exam.

### 2. Rohan, the first-time founder

- **Profile:** 27, software engineer in Bengaluru, building a WhatsApp-based inventory tool for neighbourhood retailers.
- **Starting point:** Moves quickly to features and code; avoids pricing and sales conversations.
- **Needs:** Realistic trade-offs, validation evidence, unit economics, pitch rehearsal, and a record he can show to a mentor.
- **Success moment:** He kills a weak feature, gets three paid pilots, and can defend pricing with evidence.
- **Risk:** Treats the simulator as a game unless decisions connect to his own venture.

### 3. Meera, the career-switching professional

- **Profile:** 34, operations manager in Jaipur, exploring a home-chef subscription for working parents.
- **Starting point:** Strong execution skills but low confidence in startup language and investor conversations.
- **Needs:** Simple English, Indian examples, flexible pacing, retrieval reminders, and safe practice before public Demo Day.
- **Success moment:** She turns messy observations into a clear problem statement, tests demand, and presents a credible plan to her cohort.
- **Risk:** Feels behind when peers have technical backgrounds or when AI feedback sounds generic.

## Product principles

1. **Consequence before explanation:** Learners choose before seeing theory.
2. **Safe failure, serious evidence:** Simulator failure is reversible; real-world evidence is not fabricated.
3. **Small actions, visible progress:** Every session ends with one decision, one insight, and one next action.
4. **Transfer is the finish line:** A lesson is incomplete until its real mission has valid proof.
5. **Simple language, rigorous numbers:** Avoid jargon, never hide the trade-off.
6. **AI coaches, never substitutes:** AI asks, challenges, and scores against evidence; it does not invent customer truth.

## Success metrics

### Learning metrics

- **Decision-to-retry improvement:** In each lesson, at least 60% of learners improve their score or relevant company metric on retry.
- **Mission transfer:** At least 70% of completed module learners submit valid proof for the module mission.
- **Retrieval retention:** At least 65% correct on a concept’s scheduled review 7–14 days later.
- **Mastery:** At least 75% of learners who finish a module pass its mastery test on the first or second attempt.
- **Evidence quality:** At least 80% of mission submissions meet the rubric without facilitator rework.
- **Pitch readiness:** At Demo Day, the median learner scores 70/100 or higher on problem clarity, evidence, economics, and ask.

### Business metrics

- **Activation:** 70% of sign-ups create a venture and complete onboarding within 24 hours.
- **First-lesson completion:** 65% of activated learners complete Lesson 1 within 48 hours.
- **Module 1 retention:** 50% of activated learners complete Module 1 within 14 days.
- **Nine-module completion:** 25% of activated learners complete all modules within 16 weeks.
- **Weekly active learning:** Activated learners complete at least two meaningful learning actions per week.
- **Cohort conversion:** 30% of learners who complete Module 3 join a paid cohort or facilitator-led program.
- **Reliability:** 99.5% successful lesson session loads and less than 2% failed mission uploads.

## VentureCraft is not

- Not a scroll-down storytelling page, video course, or passive content library.
- Not a business idea generator that promises a successful company.
- Not a stock-picking, fundraising, legal, tax, or financial-advice service.
- Not a global leaderboard that rewards time, money, or gaming the system.
- Not an AI that writes fake interviews, fake traction, or a finished business plan without evidence.
- Not a dark-pattern habit app: streaks can pause, reminders are useful, and progress cannot be bought.

