import { test, expect } from "@playwright/test"

test.describe("Landing Page", () => {
  test("loads successfully with correct title", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.locator("h1")).toContainText(/home safe/i)
  })

  test("has navigation with logo", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("navigation")).toBeVisible()
    await expect(page.getByRole("link", { name: /stayhome/i }).first()).toBeVisible()
  })

  test("has all required sections (minimum 8)", async ({ page }) => {
    await page.goto("/")
    // Hero
    await expect(page.locator("h1")).toBeVisible()
    // Problem section
    await expect(page.getByRole("heading", { name: /worried/i })).toBeVisible()
    // Solution section
    await expect(page.getByRole("heading", { name: /gives you the plan/i })).toBeVisible()
    // Features section
    await expect(page.getByRole("heading", { name: /Everything a worried family needs/i })).toBeVisible()
    // How it works
    await expect(page.getByRole("heading", { name: /3 steps/i })).toBeVisible()
    // Social proof
    await expect(page.getByRole("heading", { name: /1,200\+ families/i })).toBeVisible()
    // Pricing
    await expect(page.getByRole("heading", { name: /transparent pricing/i })).toBeVisible()
    // FAQ
    await expect(page.getByRole("heading", { name: /Questions families ask/i })).toBeVisible()
    // Final CTA
    await expect(page.getByRole("heading", { name: /Start your free/i })).toBeVisible()
    // Footer
    await expect(page.locator("footer")).toBeVisible()
  })

  test("CTA buttons point to signup", async ({ page }) => {
    await page.goto("/")
    const ctaLinks = page.getByRole("link", { name: /Start Free Assessment/i })
    await expect(ctaLinks.first()).toBeVisible()
    const href = await ctaLinks.first().getAttribute("href")
    expect(href).toBe("/signup")
  })

  test("footer has privacy and terms links", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("link", { name: /privacy policy/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /terms/i })).toBeVisible()
  })

  test("FAQ accordion opens on click", async ({ page }) => {
    await page.goto("/")
    const faqButton = page.getByRole("button", { name: /who is stayhome for/i })
    await faqButton.click()
    // Answer should become visible after click
    await expect(page.getByText(/adult children/i)).toBeVisible()
  })

  test("is responsive at 375px mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    await expect(page.locator("h1")).toBeVisible()
    // Mobile hamburger button should exist
    await expect(page.locator("nav button")).toBeVisible()
  })
})
