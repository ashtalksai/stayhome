import { test, expect } from "@playwright/test"

test.describe("Auth Flow", () => {
  test("signup page loads with correct form", async ({ page }) => {
    await page.goto("/signup")
    await expect(page.getByRole("heading", { name: /create your account/i })).toBeVisible()
    await expect(page.getByPlaceholder(/Sarah Johnson/i)).toBeVisible()
    await expect(page.getByPlaceholder(/sarah@example.com/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible()
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible()
  })

  test("login page loads correctly", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByRole("heading", { name: /log in|welcome back/i })).toBeVisible()
    await expect(page.locator("input[type=email]")).toBeVisible()
    await expect(page.locator("input[type=password]")).toBeVisible()
  })

  test("signup page has terms and privacy links", async ({ page }) => {
    await page.goto("/signup")
    await expect(page.getByRole("link", { name: /terms/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /privacy policy/i })).toBeVisible()
  })

  test("signup form shows error on server failure (no DB)", async ({ page }) => {
    await page.goto("/signup")
    await page.getByPlaceholder(/Sarah Johnson/i).fill("Test User")
    await page.getByPlaceholder(/sarah@example.com/i).fill("test@test.com")
    await page.getByPlaceholder(/At least 8 characters/i).fill("TestPass123!")
    await page.getByRole("button", { name: /create account/i }).click()
    // Should show an error message (not crash to blank page)
    await expect(page.getByText(/error|server|try again/i)).toBeVisible({ timeout: 5000 })
  })

  test("dashboard redirects unauthenticated users to login", async ({ page }) => {
    await page.goto("/dashboard")
    // Should redirect to login
    await expect(page).toHaveURL(/login|signin/, { timeout: 5000 })
  })
})
