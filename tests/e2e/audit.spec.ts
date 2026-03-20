import { test, expect } from "@playwright/test"

test.describe("Audit Form", () => {
  test("audit/new loads with first room questions", async ({ page }) => {
    await page.goto("/audit/new")
    await expect(page.getByRole("heading", { name: /entry & hallways/i })).toBeVisible()
    await expect(page.getByRole("button", { name: /yes/i }).first()).toBeVisible()
    await expect(page.getByRole("button", { name: /no/i }).first()).toBeVisible()
  })

  test("Next Room button is disabled until all questions answered", async ({ page }) => {
    await page.goto("/audit/new")
    const nextBtn = page.getByRole("button", { name: /next room/i })
    await expect(nextBtn).toBeDisabled()
  })

  test("Next Room becomes enabled after all answers selected", async ({ page }) => {
    await page.goto("/audit/new")
    // Answer all 4 questions in room 1
    const yesButtons = page.getByRole("button", { name: /✓ Yes/ })
    const noButtons = page.getByRole("button", { name: /✗ No/ })
    await yesButtons.nth(0).click()
    await noButtons.nth(0).click()
    await yesButtons.nth(1).click()
    await page.getByRole("button", { name: /\? Unsure/ }).nth(2).click()
    const nextBtn = page.getByRole("button", { name: /next room/i })
    await expect(nextBtn).toBeEnabled()
  })

  test("progress indicator shows correct room", async ({ page }) => {
    await page.goto("/audit/new")
    await expect(page.getByText(/room 1 of 6/i)).toBeVisible()
  })
})
