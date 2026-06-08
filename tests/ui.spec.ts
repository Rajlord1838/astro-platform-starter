import { test, expect } from '@playwright/test';

test('verify fashion store ui', async ({ page }) => {
  // Navigate to the local dev server
  await page.goto('http://localhost:4321');

  // Take a screenshot of the home page
  await page.screenshot({ path: 'tests/home-page.png', fullPage: true });

  // Click on the first product's "Add to Cart" button to add to cart
  const addToCartBtn = page.locator('text=Add to Cart').first();
  await addToCartBtn.click();

  // Wait a bit for indicator to update
  await page.waitForTimeout(500);

  // Take a screenshot after adding an item to the cart
  await page.screenshot({ path: 'tests/home-added-to-cart.png', fullPage: true });

  // Navigate to the cart page
  await page.goto('http://localhost:4321/cart');

  // Take a screenshot of the cart page
  await page.screenshot({ path: 'tests/cart-page.png', fullPage: true });

  // Verify the cart has the item
  await expect(page.locator('text=Classic White T-Shirt')).toBeVisible();
});
