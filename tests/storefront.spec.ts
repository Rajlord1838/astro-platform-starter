import { test, expect } from '@playwright/test';

test.describe('Fashion Storefront', () => {
  test.beforeEach(async ({ page }) => {
    // Clear local storage to ensure clean state
    await page.goto('http://localhost:4321');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
  });

  test('should display products', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Latest Collection' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic White T-Shirt' })).toBeVisible();
  });

  test('should add item to cart and update badge', async ({ page }) => {
    // Check initial badge state
    const badge = page.locator('button[aria-label="Toggle cart"] span');
    await expect(badge).not.toBeVisible();

    // Add an item
    const addButton = page.getByRole('button', { name: 'Add Classic White T-Shirt to cart' });
    await expect(addButton).toBeVisible();

    // Use toPass to handle hydration delay
    await expect(async () => {
      await addButton.click({ force: true });
      await expect(page.getByRole('dialog')).toBeVisible();
    }).toPass({ timeout: 10000 });

    // The modal should open automatically, close it
    await page.getByRole('button', { name: 'Close cart' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Verify badge updated
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  test('should update item quantity and remove item in cart modal', async ({ page }) => {
    // Add item
    await expect(async () => {
      await page.getByRole('button', { name: 'Add Classic White T-Shirt to cart' }).click({ force: true });
      await expect(page.getByRole('dialog')).toBeVisible();
    }).toPass({ timeout: 10000 });

    const dialog = page.getByRole('dialog');
    await expect(dialog.getByText('Classic White T-Shirt', { exact: true })).toBeVisible();

    // Increase quantity
    await dialog.getByRole('button', { name: 'Increase quantity' }).click();
    await expect(dialog.getByText('2', { exact: true })).toBeVisible();

    // Check updated total
    await expect(dialog.getByText('$59.98')).toBeVisible();

    // Decrease quantity
    await dialog.getByRole('button', { name: 'Decrease quantity' }).click();
    await expect(dialog.getByText('1', { exact: true }).nth(0)).toBeVisible(); // nth(0) because product quantity is 1 and cart badge is 1

    // Remove item
    await dialog.getByRole('button', { name: 'Remove Classic White T-Shirt from cart' }).click();
    await expect(dialog.getByText('Your cart is empty.')).toBeVisible();
  });
});
