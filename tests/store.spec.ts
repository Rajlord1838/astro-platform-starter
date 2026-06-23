import { test, expect } from '@playwright/test';

test('homepage has correct title and products', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Check title
    await expect(page).toHaveTitle(/Fashion Store/);

    // Check header text
    await expect(page.locator('h1', { hasText: 'Elevate Your Style' })).toBeVisible();

    // Check that products are loaded (we have 6 in dummy data)
    const productCards = page.locator('h3');
    await expect(productCards).toHaveCount(6);

    // Check first product title
    await expect(page.locator('h3').first()).toHaveText('Classic White T-Shirt');
});

test('can add item to cart', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Click "Add to Cart" on the first product
    // We use a toPass block to retry clicking in case React hydration hasn't finished yet
    const cartBadge = page.locator('button[aria-label="Toggle cart"] span');
    await expect(async () => {
        await page.locator('button', { hasText: 'Add to Cart' }).first().click();
        await expect(cartBadge).toHaveText('1', { timeout: 1000 });
    }).toPass();

    // Open cart
    await page.locator('button[aria-label="Toggle cart"]').click();

    // Check item is in cart
    await expect(page.locator('h4', { hasText: 'Classic White T-Shirt' })).toBeVisible();

    // Increase quantity
    await page.locator('button').filter({ has: page.locator('svg.lucide-plus') }).click();

    // Check quantity is 2
    await expect(page.locator('text=2').first()).toBeVisible();
});
