const { test, expect } = require("@playwright/test");

async function saveFullPage(page, testInfo, name) {
  await testInfo.attach(name, {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png"
  });
}

async function runReferenceSuccess(page, testInfo) {
  await page.goto("/reference/index.html");
  await expect(page.getByRole("heading", { name: "Soma Study Coach" })).toBeVisible();
  await expect(page.locator("#keepLearningSection")).toBeHidden();
  await expect(page.locator("#debugLabSection")).toBeHidden();
  await expect(page.locator("#debugOutput")).toBeHidden();

  await page.locator("#topicSelect").selectOption("mixtures");
  await page.getByRole("button", { name: "Use sample" }).click();
  await page.getByRole("button", { name: "Debug Lab" }).click();
  await expect(page.locator("#debugLabSection")).toBeVisible();
  await page.getByRole("button", { name: "Show context" }).click();
  await expect(page.locator("#promptPreview")).toContainText("studentQuestion");
  await expect(page.locator("#promptPreview")).toContainText("Mixtures and separation");
  await expect(page.locator("#promptPreview")).not.toContainText("student name");

  await page.getByRole("button", { name: "Ask coach" }).click();
  await expect(page.locator("#coachStatus")).toContainText("Response ready");
  await expect(page.locator("#coachOutput")).toContainText("Topic explanation");
  await expect(page.locator("#coachOutput")).toContainText("Misconception help");
  await expect(page.locator("#coachOutput")).toContainText("Recommended resources");
  await expect(page.locator("#debugStatus")).toContainText("mock: deterministic-demo");
  await expect(page.locator("#debugOutput")).toContainText("Safe context sent by browser");
  await expect(page.locator("#debugOutput")).toContainText("Student question");
  await expect(page.locator("#debugOutput")).toContainText("Prompt built on server");
  await expect(page.locator("#debugOutput")).toContainText("Provider request shape");
  await expect(page.locator("#debugOutput")).toContainText("Parsed app response");
  await expect(page.locator("#debugOutput")).not.toContainText("includeLlmCall");
  await expect(page.locator("#debugOutput")).not.toContainText("GEMINI_API_KEY");
  await expect(page.locator("#debugOutput")).not.toContainText("?key=");

  await expect(page.locator("#keepLearningSection")).toBeVisible();
  await page.locator("#labModelInput").fill("student-lab-model");
  await page.locator("#labTemperatureInput").fill("0.2");
  await page.locator("#labMaxTokensInput").fill("1024");
  await page.locator("#labSystemPromptInput").fill("Explain like a patient tutor using one local example.");
  await page.locator("#labUserPromptInput").fill("Answer the learner question and ask one check question.");
  await page.getByRole("button", { name: "Run lab" }).click();
  await expect(page.locator("#debugStatus")).toContainText("mock: student-lab-model");
  await expect(page.locator("#debugOutput")).toContainText("Lab settings");
  await expect(page.locator("#debugOutput")).toContainText("student-lab-model");
  await expect(page.locator("#debugOutput")).toContainText("Explain like a patient tutor");

  await expect(page.locator("#planOutput input[type='checkbox']").first()).toBeVisible();
  await page.locator("#planOutput input[type='checkbox']").first().check();
  const storedProgress = await page.evaluate(() => localStorage.getItem("soma-study-coach.plan-progress.v2"));
  expect(storedProgress).toContain("true");

  await page.locator("#followUpInput").fill("Give another kitchen example.");
  await page.getByRole("button", { name: /^Ask$/ }).click();
  await expect(page.locator("#followUpOutput")).toContainText("Coach answer");
  await saveFullPage(page, testInfo, "reference-success");
}

async function runStarterSuccess(page, testInfo) {
  await page.goto("/starter/index.html");
  await expect(page.getByRole("heading", { name: "Soma Study Coach Starter" })).toBeVisible();

  await page.locator("#modeSelect").selectOption("learn-topic");
  await page.locator("#topicSelect").selectOption("living-things");
  await page.getByRole("button", { name: "Use sample" }).click();
  await page.getByRole("button", { name: "Preview context" }).click();
  await expect(page.locator("#contextPreview")).toContainText("studentQuestion");
  await expect(page.locator("#contextPreview")).toContainText("Characteristics of living things");

  await page.getByRole("button", { name: "Call /api/coach" }).click();
  await expect(page.locator("#coachStatus")).toContainText("Ready");
  await expect(page.locator("#responseOutput")).toContainText("Topic explanation");
  await expect(page.locator("#planOutput input[type='checkbox']").first()).toBeVisible();

  await page.locator("#planOutput input[type='checkbox']").first().check();
  const storedProgress = await page.evaluate(() => localStorage.getItem("soma-starter.plan-progress.v1"));
  expect(storedProgress).toContain("true");

  await page.locator("#followUpInput").fill("Give another local example.");
  await page.getByRole("button", { name: "Ask follow-up" }).click();
  await expect(page.locator("#followUpOutput")).toContainText("Coach answer");
  await saveFullPage(page, testInfo, "starter-success");
}

test.describe("Soma Study Coach student smoke", () => {
  test("reference app supports tutor-first coach, follow-up and progress", async ({ page }, testInfo) => {
    await runReferenceSuccess(page, testInfo);
  });

  test("starter app supports setup-visible coach, follow-up and progress", async ({ page }, testInfo) => {
    await runStarterSuccess(page, testInfo);
  });

  test("reference app shows honest quota and network errors", async ({ page }, testInfo) => {
    await page.goto("/reference/index.html");
    await page.locator("#studentQuestionInput").fill("quota-test: explain this topic");
    await page.getByRole("button", { name: "Ask coach" }).click();
    await expect(page.locator("#coachStatus")).toContainText("Coach unavailable");
    await expect(page.locator("#coachOutput")).toContainText("quota");
    await expect(page.locator("#keepLearningSection")).toBeHidden();

    await page.locator("#studentQuestionInput").fill("network-test: explain this topic");
    await page.getByRole("button", { name: "Ask coach" }).click();
    await expect(page.locator("#coachOutput")).toContainText("temporarily unavailable");
    await expect(page.locator("#keepLearningSection")).toBeHidden();
    await saveFullPage(page, testInfo, "reference-errors");
  });

  test("reference and starter block personal-data prompts before provider use", async ({ page }, testInfo) => {
    await page.goto("/reference/index.html");
    await page.locator("#studentQuestionInput").fill("My name is Amina and I got 20 marks out of 100. Help me.");
    await page.getByRole("button", { name: "Ask coach" }).click();
    await expect(page.locator("#coachOutput")).toContainText("Remove personal data");
    await expect(page.locator("#keepLearningSection")).toBeHidden();
    await saveFullPage(page, testInfo, "reference-safety");

    await page.locator("#studentQuestionInput").fill("Explain mixtures using a local example.");
    await page.getByRole("button", { name: "Ask coach" }).click();
    await expect(page.locator("#coachStatus")).toContainText("Response ready");
    await page.locator("#followUpInput").fill("My school name is Test Academy. Help me.");
    await page.getByRole("button", { name: /^Ask$/ }).click();
    await expect(page.locator("#followUpOutput")).toContainText("Remove personal data");
    await saveFullPage(page, testInfo, "reference-follow-up-safety");

    await page.goto("/starter/index.html");
    await page.locator("#studentQuestionInput").fill("My school name is Test Academy. Help me.");
    await page.getByRole("button", { name: "Call /api/coach" }).click();
    await expect(page.locator("#responseOutput")).toContainText("Remove personal data");
    await saveFullPage(page, testInfo, "starter-safety");
  });
});
