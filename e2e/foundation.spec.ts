import { expect, test } from "@playwright/test";

test.setTimeout(120_000);

test("start screen keeps the cinematic background and needs no login", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Venture");
  await expect(page.locator('img.scene-plate[src="/art/observatory.webp"]')).toBeAttached();
  await expect(page.getByRole("link", { name: /Start learning/i }).first()).toHaveAttribute("href", "/onboarding");
  await expect(page.getByText(/log in|sign up/i)).toHaveCount(0);
});

test("a new learner can onboard, finish a lesson and open every nav item", async ({ page }) => {
  await page.goto("/onboarding");
  await page.getByLabel(/first name/i).fill("Asha");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: /tiffin/i }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Talk to people who have the problem" }).click();
  await page.getByRole("button", { name: "\"Here's my money.\"" }).click();
  await page.getByRole("button", { name: "All the money coming in from customers" }).click();
  await page.getByRole("button", { name: /Let's start/ }).click();
  await expect(page).toHaveURL(/\/hq$/);
  await expect(page.getByRole("heading", { name: /Asha/ })).toBeVisible();

  // Play lesson 1 from start to finish.
  await page.goto("/lessons/module-1-lesson-1");
  const next = page.getByRole("button", { name: /^(Next|See what happens)/ });
  await next.click();
  await page.getByRole("button", { name: /Talk to 5 students/ }).click();
  await expect(page.getByText("Great choice!").first()).toBeVisible();
  await next.click(); // what happened
  await next.click(); // big idea
  await expect(page.getByText("In simple words")).toBeVisible();
  await next.click(); // quick check
  await page.getByRole("button", { name: /Arjun/ }).click();
  await next.click(); // mission
  await next.click(); // summary
  await expect(page.getByRole("heading", { name: "Lesson complete!" })).toBeVisible();

  await page.goto("/curriculum");
  await expect(page.getByLabel("Done").first()).toBeVisible();

  const navigation = [
    ["/hq", "Venture HQ"],
    ["/curriculum", "Curriculum"],
    ["/simulator", "Simulator"],
    ["/labs/pricing", "Labs"],
    ["/roleplay/customer", "Arena"],
    ["/missions", "Missions"],
    ["/passport", "Passport"],
    ["/cohort", "Cohort"],
    ["/demo-day", "Demo Day"],
    ["/glossary", "Word Book"],
  ] as const;

  for (const [href, label] of navigation) {
    await page.goto(href, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await expect(page).toHaveURL(new RegExp(`${href.replace(/\//g, "\\/")}(\\/|$)`));
    await expect(page.locator(`aside a[href="${href}"]`)).toContainText(label);
  }
});

test("business words have simple explanations", async ({ page }) => {
  await page.goto("/glossary");
  await page.getByPlaceholder(/Search a word/).fill("runway");
  await expect(page.getByRole("heading", { name: /Runway/ })).toBeVisible();
  await expect(page.getByText("How many months your money will last if nothing changes.")).toBeVisible();
});
