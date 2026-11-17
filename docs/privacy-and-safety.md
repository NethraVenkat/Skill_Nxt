# Privacy and safety summary

## What we store

In the VentureCraft platform, we store only the minimum data needed for learning and progress tracking. This includes:

- learner profile data needed for onboarding and login
- venture name, idea, and progress state
- mission submissions, evidence metadata, and feedback records
- Passport snapshots and share metadata
- AI session metadata such as role, prompt version, and score summary
- analytics events tied to learning actions, not private transcript content

We do not store raw identity documents, full private banking details, or full transcript text unless it is required for a learner's own mission evidence and is stored under their account.

## Why we store it

- to personalize the learning journey and track mastery
- to allow a learner to restore their Passport and mission history
- to provide useful AI feedback against the learner’s own data
- to improve the learning system through aggregate, privacy-safe metrics

## Retention guidelines

- AI conversations and transcripts: stored only as needed for scoring and learning analytics, with a default 30-day retention window unless the learner chooses a longer period or the product requires a shorter one.
- Mission evidence: kept while the learner is active and until the learning record is no longer needed.
- Passport share links: expire optionally and can be revoked instantly.
- Deleted accounts: trigger a data deletion or anonymisation flow for mission records, AI transcripts, and Passport content.

## Safety rules

- learners must consent before any interview recording or quoting
- personally identifying details such as names, phone numbers, and addresses must be removed or blurred before upload
- money-handling missions must include a clear budget cap and a safety note
- under-18 learners get the safer alternative by default and are prevented from high-risk mission flows without a guardian acknowledgement
- submitters are warned to meet in public and use safe communication practices when meeting people outside the internet

## India-specific note

This project aims to follow the spirit of India’s DPDP Act basics by limiting unnecessary data collection, using clear learner consent, and giving learners a path to see, export, and delete their data. This is not a legal opinion; a real legal review should be completed before production launch from a privacy counsel.

## Redaction reminders

Before submitting any uploaded file or text, learners should:

- blur or hide faces in screenshots
- remove phone numbers and email addresses
- avoid uploading full address details
- redact identity details in the text before submission

## Data export and deletion

The learner must be able to:

- download their mission history and Passport as JSON and PDF
- export their mission files and Passport content
- delete their account and the associated data from their profile settings

This should be a product requirement before the public launch.
