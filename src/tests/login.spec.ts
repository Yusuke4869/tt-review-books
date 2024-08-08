import { expect, test } from "@playwright/test";

test("なにも入力せずにsubmitを押下するとエラーメッセージが表示される", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.click("input[type=submit]");

  await expect(page.locator("[data-error-message=email]")).toHaveText("正しいメールアドレスを入力してください");
  await expect(page.locator("[data-error-message=password]")).toHaveText("パスワードを入力してください");
});

test("emailが未入力のとき、submitを押下するとエラーメッセージが表示される", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill("input[name=password]", "password");
  await page.click("input[type=submit]");

  await expect(page.locator("[data-error-message=email]")).toHaveText("正しいメールアドレスを入力してください");
});

test("passwordが未入力のとき、submitを押下するとエラーメッセージが表示される", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill("input[name=email]", "email@example.com");
  await page.click("input[type=submit]");

  await expect(page.locator("[data-error-message=password]")).toHaveText("パスワードを入力してください");
});

test("emailが不正な形式のとき、submitを押下するとエラーメッセージが表示される", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill("input[name=email]", "email@example");
  await page.fill("input[name=password]", "password");
  await page.click("input[type=submit]");

  await expect(page.locator("[data-error-message=email]")).toHaveText("正しいメールアドレスを入力してください");
});

test("emailとpasswordを適切に入力し、submitを押下するとエラーメッセージが表示されない", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill("input[name=email]", "email@example.com");
  await page.fill("input[name=password]", "password");
  await page.click("input[type=submit]");

  await expect(page.locator("[data-error-message=email]")).toHaveCount(0);
  await expect(page.locator("[data-error-message=password]")).toHaveCount(0);
});
