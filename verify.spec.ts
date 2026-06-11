import { test, expect } from '@playwright/test';

test('verify fashion store frontpage', async ({ page }) => {
  await page.goto('http://localhost:4321');

  // Wait for the main heading to ensure page has loaded
  await expect(page.locator('h1')).toContainText('AstroStore');

  // Verify that products are rendered
  const productCards = page.locator('text=Add to Cart');
  await expect(productCards.first()).toBeVisible();

  // Take a full page screenshot
  await page.screenshot({ path: 'storefront.png', fullPage: true });

  // Add an item to cart and verify cart counter updates
  await productCards.first().click();

  // Wait for the cart counter to show '1'
  const cartCounter = page.locator('.bg-red-600');
  await expect(cartCounter).toContainText('1');

  // Open the cart modal
  await page.locator('button[aria-label="Open cart"]').click();

  // Verify modal is visible and shows correct title
  await expect(page.locator('h2', { hasText: 'Your Cart' })).toBeVisible();

  // Take a screenshot of the open modal
  await page.screenshot({ path: 'cart-modal.png' });
});
