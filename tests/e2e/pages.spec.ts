import { test, expect } from "@playwright/test"

const staticPages = [
  { path: "/", title: /home|stayhome/i },
  { path: "/about", title: /about/i },
  { path: "/pricing", title: /pricing/i },
  { path: "/contractors", title: /contractor/i },
  { path: "/contact", title: /contact/i },
  { path: "/privacy", title: /privacy/i },
  { path: "/terms", title: /terms/i },
  { path: "/deck", title: /pitch|deck|stayhome/i },
  { path: "/docs", title: /docs|documentation|stayhome/i },
]

for (const { path, title } of staticPages) {
  test(`${path} loads with content`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator("body")).toBeVisible()
    // No 404/500 page content
    await expect(page.getByText(/404|page not found/i)).not.toBeVisible()
    await expect(page.getByText(/500|internal server error/i)).not.toBeVisible()
    // Has navigation
    await expect(page.getByRole("navigation")).toBeVisible()
    // Has footer
    await expect(page.locator("footer")).toBeVisible()
  })
}

test.describe("Pricing page", () => {
  test("has 3 pricing tiers", async ({ page }) => {
    await page.goto("/pricing")
    await expect(page.getByRole("heading", { name: /free starter|free/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: /ai audit/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: /full package/i })).toBeVisible()
  })
})

test.describe("Contractors page", () => {
  test("shows contractor cards with filter bar", async ({ page }) => {
    await page.goto("/contractors")
    await expect(page.getByRole("button", { name: /all/i })).toBeVisible()
    await expect(page.getByRole("button", { name: /bathroom safety/i })).toBeVisible()
  })
})

test.describe("Contact page", () => {
  test("has contact form", async ({ page }) => {
    await page.goto("/contact")
    await expect(page.locator("form, input, textarea")).toBeVisible()
  })
})
