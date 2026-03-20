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

  test("signup creates user and redirects to dashboard", async ({ page }) => {
    const timestamp = Date.now()
    await page.goto("/signup")
    await page.getByPlaceholder(/Sarah Johnson/i).fill("E2E Test User")
    await page.getByPlaceholder(/sarah@example.com/i).fill(`e2e_${timestamp}@stayhome-test.com`)
    await page.getByPlaceholder(/At least 8 characters/i).fill("TestPass123!")
    await page.getByRole("button", { name: /create account/i }).click()
    // Should redirect to dashboard on success
    await expect(page).toHaveURL(/dashboard/, { timeout: 8000 })
    await expect(page.getByText(/good morning|good afternoon|good evening/i)).toBeVisible()
  })

  test("login with valid credentials redirects to dashboard", async ({ page }) => {
    // Sign up first, then log out, then log in
    const timestamp = Date.now()
    const email = `e2e_login_${timestamp}@stayhome-test.com`
    
    // Register
    await page.goto("/signup")
    await page.getByPlaceholder(/Sarah Johnson/i).fill("Login Test User")
    await page.getByPlaceholder(/sarah@example.com/i).fill(email)
    await page.getByPlaceholder(/At least 8 characters/i).fill("TestPass123!")
    await page.getByRole("button", { name: /create account/i }).click()
    await expect(page).toHaveURL(/dashboard/, { timeout: 8000 })

    // Sign out
    await page.goto("/api/auth/signout")
    await page.goto("/login")

    // Log in
    await page.locator("input[type=email]").fill(email)
    await page.locator("input[type=password]").fill("TestPass123!")
    await page.getByRole("button", { name: /log in/i }).click()
    await expect(page).toHaveURL(/dashboard/, { timeout: 8000 })
  })

  test("dashboard redirects unauthenticated users to login", async ({ page }) => {
    // Use a fresh browser context with no cookies
    await page.goto("/dashboard")
    // Should redirect to login
    await expect(page).toHaveURL(/login|signin/, { timeout: 5000 })
  })
})
