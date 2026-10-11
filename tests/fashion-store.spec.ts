import { test, expect } from '@playwright/test';

test.describe('Fashion Store Cart', () => {
  test.beforeEach(async ({ page }) => {
    // Clear local storage to ensure clean state
    await page.goto('http://localhost:4321');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
  });

  test('adds item to cart and opens modal', async ({ page }) => {
    // Wait for the hydration of React components
    await page.waitForLoadState('networkidle');

    // Find the first Add to Cart button and click it
    const addToCartButton = page.getByRole('button', { name: /Add Classic White T-Shirt to cart/i }).first();
    await addToCartButton.waitFor({ state: 'visible' });

    // Try/catch for hydration delays on the Astro island
    await expect(async () => {
      await addToCartButton.click({ force: true });
      const modalHeader = page.getByRole('heading', { name: 'Your Cart' });
      await expect(modalHeader).toBeAttached();
    }).toPass();

    // Verify the item is in the cart modal
    const dialog = page.getByRole('dialog');
    const cartItem = dialog.getByRole('heading', { name: 'Classic White T-Shirt' });
    await expect(cartItem).toBeVisible();

    // Verify total shows correct value for single item (29.99)
    const cartTotal = dialog.getByText('$29.99').first();
    await expect(cartTotal).toBeVisible();
  });

  test('cart badge updates when item is added', async ({ page }) => {
    // Wait for networkidle
    await page.waitForLoadState('networkidle');

    // Make sure cart badge starts empty
    const cartButton = page.getByRole('button', { name: 'Toggle cart' });
    await expect(cartButton.getByText('1')).not.toBeVisible();

    // Add an item
    const addToCartButton = page.getByRole('button', { name: /Add Denim Jacket to cart/i }).first();
    await addToCartButton.waitFor({ state: 'visible' });

    await expect(async () => {
      await addToCartButton.click({ force: true });
      await expect(cartButton.getByText('1')).toBeAttached();
    }).toPass();
  });
});
