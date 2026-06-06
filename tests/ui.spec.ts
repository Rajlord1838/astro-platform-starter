import { test, expect } from '@playwright/test';

test('add to cart flow', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Home - Fashion Store/);

  // Take screenshot of home page
  await page.screenshot({ path: 'home.png' });

  // Click 'Add to Cart' on the first product
  const addToCartBtn = page.getByText('Add to Cart').first();
  await addToCartBtn.click();

  // Wait for the button text to change back or delay slightly for animation
  await page.waitForTimeout(500);

  // Check if cart icon badge has '1'
  const cartBadge = page.locator('button[aria-label="Open cart"] span');
  await expect(cartBadge).toHaveText('1');

  // Open the cart
  const cartIcon = page.locator('button[aria-label="Open cart"]');
  await cartIcon.click();

  // Wait for the dialog to open
  await page.waitForSelector('#cart-dialog[open]');

  // Take screenshot of the cart overlay
  await page.screenshot({ path: 'cart-overlay.png' });

  // Check if cart contains an item
  await expect(page.getByText('Your Cart')).toBeVisible();
  const removeBtn = page.getByText('Remove').first();
  await expect(removeBtn).toBeVisible();

  // Remove item
  await removeBtn.click();

  // Wait for item to disappear
  await page.waitForTimeout(500);

  // Expect empty cart message
  await expect(page.getByText('Your cart is empty.')).toBeVisible();
});
