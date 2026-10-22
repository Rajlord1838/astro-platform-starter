import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Fashion Store/);
});

test('adds item to cart and opens cart', async ({ page }) => {
    // Add first item to cart
    await expect(async () => {
        await page.getByRole('button', { name: 'Add Classic White T-Shirt to cart' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();
    }).toPass();

    // Check item is in cart (scoped to dialog)
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Classic White T-Shirt', exact: true })).toBeVisible();

    // Check subtotal in dialog
    await expect(dialog.getByText('$29.99', { exact: true })).toBeVisible();
});

test('increases quantity in cart', async ({ page }) => {
    // Add first item to cart
    await expect(async () => {
        await page.getByRole('button', { name: 'Add Classic White T-Shirt to cart' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();
    }).toPass();

    // Increase quantity
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Increase quantity' }).click();

    // Check subtotal updated
    await expect(dialog.getByText('$59.98', { exact: true })).toBeVisible();
    await expect(dialog.getByText('2', { exact: true })).toBeVisible();
});
