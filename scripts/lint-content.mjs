import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const lessonsDir = fileURLToPath(new URL("../content/lessons", import.meta.url));
const missionsDir = fileURLToPath(new URL("../content/missions", import.meta.url));

const lessonFiles = readdirSync(lessonsDir)
  .filter((file) => file.endsWith(".ts") && file !== "index.ts")
  .sort();

const missionFiles = readdirSync(missionsDir)
  .filter((file) => file.endsWith(".ts"))
  .sort();

const errors = [];

for (const file of lessonFiles) {
  const filePath = `${lessonsDir}/${file}`;
  const text = readFileSync(filePath, "utf8");

  const lessonId = text.match(/id:\s*"([^"]+)"/)?.[1];
  const moduleNumber = text.match(/module:\s*(\d+)/)?.[1];
  const objectiveCount = (text.match(/objective:/g) || []).length;
  const conceptTagCount = (text.match(/conceptTags:/g) || []).length;

  if (!lessonId) errors.push(`${file}: missing lesson id`);
  if (!moduleNumber) errors.push(`${file}: missing module number`);
  if (objectiveCount === 0) errors.push(`${file}: missing learning objective list`);
  if (conceptTagCount === 0) errors.push(`${file}: missing concept tags`);

  const order = ["challenge", "decision", "consequence", "insight", "retry", "mission"];
  const stepPositions = order.map((type) => text.indexOf(`type: "${type}"`));
  if (stepPositions.some((index) => index === -1)) {
    errors.push(`${file}: missing required step types in lesson order`);
  } else if (stepPositions[0] > stepPositions[1] || stepPositions[1] > stepPositions[2] || stepPositions[2] > stepPositions[3] || stepPositions[3] > stepPositions[4] || stepPositions[4] > stepPositions[5]) {
    errors.push(`${file}: lesson steps must begin with challenge -> decision -> consequence -> insight -> retry -> mission`);
  }

  const decisionCount = (text.match(/type:\s*"decision"/g) || []).length;
  const feedbackCount = (text.match(/feedback:/g) || []).length;
  if (decisionCount > 0 && feedbackCount < decisionCount) {
    errors.push(`${file}: decision block is missing feedback`);
  }
}

for (const file of missionFiles) {
  const filePath = `${missionsDir}/${file}`;
  const text = readFileSync(filePath, "utf8");

  const missionId = text.match(/id:\s*"([^"]+)"/)?.[1];
  const rubricCount = (text.match(/rubric:/g) || []).length;
  const proofRequirementCount = (text.match(/proofRequirements:/g) || []).length;
  const safetyCount = (text.match(/safetyNotes:/g) || []).length;
  const alternativeCount = (text.match(/saferAlternative:/g) || []).length;
  const realitySyncCount = (text.match(/realitySyncFields:/g) || []).length;

  if (!missionId) errors.push(`${file}: missing mission id`);
  if (rubricCount === 0) errors.push(`${file}: missing rubric`);
  if (proofRequirementCount === 0) errors.push(`${file}: missing proof requirements`);
  if (safetyCount === 0) errors.push(`${file}: missing safety notes`);
  if (alternativeCount === 0) errors.push(`${file}: missing safer alternative`);
  if (realitySyncCount === 0) errors.push(`${file}: missing reality-sync rules`);
}

if (errors.length > 0) {
  console.error("Content lint failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content lint passed for ${lessonFiles.length} lessons and ${missionFiles.length} missions.`);
