import { test, expect } from '@playwright/test';

test('fashion store frontend verification', async ({ page }) => {
  // Wait for the dev server
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

  // 1. Verify Page Title & Hero
  await expect(page).toHaveTitle(/FashionStore/);
  await expect(page.locator('h1').first()).toContainText('Elevate Your Style');

  // 2. Take a full page screenshot initially
  await page.screenshot({ path: 'screenshots/initial-load.png', fullPage: true });

  // 3. Verify products are displayed
  const productCards = page.locator('.bg-white.rounded-lg');
  await expect(productCards).toHaveCount(6);

  // 4. Test Add to Cart functionality
  // Get the first product's 'Add to Cart' button
  const firstAddToCartBtn = productCards.first().locator('button', { hasText: 'Add to Cart' });
  await firstAddToCartBtn.click();

  // Wait a moment for state to update
  await page.waitForTimeout(500);

  // 5. Verify Cart icon updates
  const cartButton = page.locator('button[aria-label="Cart"]');
  const cartBadge = cartButton.locator('span.bg-red-600');
  await expect(cartBadge).toHaveText('1');

  // 6. Open Cart dropdown
  await cartButton.click();

  // 7. Verify Cart dropdown contents
  const cartDropdown = page.locator('.absolute.right-0.bg-white');
  await expect(cartDropdown).toBeVisible();

  // Take screenshot with cart open
  await page.screenshot({ path: 'screenshots/cart-open.png' });

  // The first product is "Classic White Tee", verify it's in the cart
  await expect(cartDropdown.locator('li')).toContainText('Classic White Tee');

  // 8. Test Remove from Cart
  const removeBtn = cartDropdown.locator('button[aria-label="Remove item"]');
  await removeBtn.click();

  // Wait a moment for state to update
  await page.waitForTimeout(500);

  // Verify cart is empty
  await expect(cartDropdown).toContainText('Your cart is empty.');

  // Verify badge is gone
  await expect(cartBadge).toHaveCount(0);

  // Take screenshot of empty cart
  await page.screenshot({ path: 'screenshots/cart-empty.png' });
});
