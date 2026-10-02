import { test, expect } from '@playwright/test';

test.describe('Fashion Store', () => {
    test.beforeEach(async ({ page }) => {
        // Clear local storage to start fresh for each test
        await page.goto('http://localhost:4321');
        await page.evaluate(() => window.localStorage.clear());
        await page.reload();
    });

    test('should display products on the homepage', async ({ page }) => {
        await expect(page.locator('h1', { hasText: 'New Arrivals' })).toBeVisible();
        await expect(page.locator('h3', { hasText: 'Classic White T-Shirt' })).toBeVisible();
        await expect(page.locator('h3', { hasText: 'Denim Jacket' })).toBeVisible();
    });

    test('should add a product to cart and update the badge', async ({ page }) => {
        // Find the first product's Add to Cart button
        const firstProductCard = page.locator('.group').first();
        const addToCartButton = firstProductCard.locator('button:has-text("Add to Cart")');

        // Wait for React hydration
        await expect(async () => {
            await addToCartButton.click();
            await expect(firstProductCard.locator('text=Added to Cart')).toBeVisible();
        }).toPass();

        // Check if navbar badge updated
        const nav = page.locator('nav');
        await expect(nav.locator('span', { hasText: '1' })).toBeVisible();
    });

    test('should display added product in the cart slide-out', async ({ page }) => {
        // Add a product to cart
        const firstProductCard = page.locator('.group').first();
        const addToCartButton = firstProductCard.locator('button:has-text("Add to Cart")');

        await expect(async () => {
            await addToCartButton.click();
            await expect(firstProductCard.locator('text=Added to Cart')).toBeVisible();
        }).toPass();

        // Open cart
        const cartButton = page.locator('nav').locator('button[aria-label="Toggle cart"]');
        await expect(async () => {
            await cartButton.click();
            await expect(page.locator('h2', { hasText: 'Shopping Cart' })).toBeVisible();
        }).toPass();

        // Verify product in cart
        const cartPanel = page.locator('div[role="dialog"]');
        await expect(cartPanel.locator('h3', { hasText: 'Classic White T-Shirt' })).toBeVisible();
        await expect(cartPanel.locator('p', { hasText: '$25.00' }).first()).toBeVisible();
    });
});
