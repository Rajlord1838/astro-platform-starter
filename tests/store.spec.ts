import { test, expect } from '@playwright/test';

test.describe('Fashion Store', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
    // Clear cart before each test
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
  });

  test('should display products', async ({ page }) => {
    // Wait for hydration by checking for products
    await expect(page.locator('h3', { hasText: 'Classic White Tee' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Denim Jacket' })).toBeVisible();
  });

  test('should filter products by category', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'Classic White Tee' })).toBeVisible();

    // Click category filter
    await page.click('button:has-text("Outerwear")');

    // Denim jacket should be visible, white tee should not
    await expect(page.locator('h3', { hasText: 'Denim Jacket' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Classic White Tee' })).not.toBeVisible();
  });

  test('cart should open and close', async ({ page }) => {
    // Click cart button
    await page.click('button[aria-label="Open cart"]');

    // Wait for cart to be visible
    await expect(page.locator('text=Shopping cart')).toBeVisible();

    // Close cart
    await page.click('button:has-text("Close panel")');

    // Cart should be hidden
    await expect(page.locator('text=Shopping cart')).not.toBeVisible();
  });

  test('should add product to cart and update badge', async ({ page }) => {
    // Wait for Add to Cart buttons to be visible
    await expect(page.locator('text=Add to Cart').first()).toBeVisible();

    // Use test retry loop because Astro components might take a bit to hydrate
    await expect(async () => {
      // Add first product to cart
      await page.locator('text=Add to Cart').first().click();

      // Badge should show 1
      const cartButton = page.locator('button[aria-label="Open cart"]');
      await expect(cartButton.locator('span')).toHaveText('1', { timeout: 1000 });
    }).toPass();

    const cartButton = page.locator('button[aria-label="Open cart"]');
    // Open cart and verify product is there
    await cartButton.click();
    await expect(page.locator('text=Shopping cart')).toBeVisible();
    await expect(page.locator('.pointer-events-auto h3')).toHaveCount(1);

    // Remove product
    await page.click('text=Remove');

    // Wait for empty state
    await expect(page.locator('text=Your cart is empty')).toBeVisible();

    // Close cart
    await page.click('button:has-text("Close panel")');
  });
});
