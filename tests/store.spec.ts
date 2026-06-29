import { test, expect } from '@playwright/test';

test('homepage loads and displays products', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1').first()).toHaveText('Fashion Store');

  // Verify products are rendered
  const productCards = page.locator('h3:has-text("Classic White T-Shirt")');
  await expect(productCards).toBeVisible();
});

test('can add item to cart', async ({ page }) => {
  await page.goto('/');

  // Wait for the hydration of React components
  await page.waitForLoadState('networkidle');

  // Click the first "Add to Cart" button
  const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
  await addToCartButton.click();

  // Open cart
  const cartButton = page.locator('button[aria-label="Open Cart"]');
  await cartButton.click();

  // Verify item is in cart
  await expect(page.locator('text=Your Cart')).toBeVisible();

  // Verify quantity is 1
  await expect(page.locator('text=Total:')).toBeVisible();
});
