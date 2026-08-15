import { test, expect } from '@playwright/test';

test.describe('Fashion Store', () => {
    test.beforeEach(async ({ page }) => {
        // Clear local storage to ensure a clean state before each test
        await page.goto('/');
        await page.evaluate(() => window.localStorage.clear());
        await page.reload();
    });

    test('should display products on the home page', async ({ page }) => {
        // Check if the page title and main heading are correct
        await expect(page).toHaveTitle('Welcome to our Fashion Store.');
        await expect(page.locator('h1', { hasText: 'Latest Arrivals' })).toBeVisible();

        // Check if at least one product is rendered
        const firstProductTitle = page.locator('h3', { hasText: 'Classic White T-Shirt' }).first();
        await expect(firstProductTitle).toBeVisible();
    });

    test('should add items to cart and update the badge', async ({ page }) => {
        // Add a product to the cart
        const addToCartButton = page.locator('button', { hasText: 'Add to Cart' }).first();
        await expect(addToCartButton).toBeVisible();
        await expect(async () => {
            await addToCartButton.click();
            const badge = page.locator('button[aria-label="Open cart"] span');
            await expect(badge).toHaveText('1');
        }).toPass();

        // Add the same product again to test quantity increment
        await expect(async () => {
            await addToCartButton.click();
            const badge = page.locator('button[aria-label="Open cart"] span');
            await expect(badge).toHaveText('2');
        }).toPass();
    });

    test('should open the cart modal and display added items', async ({ page }) => {
        // Add a product to the cart
        const addToCartButton = page.locator('button', { hasText: 'Add to Cart' }).first();
        await expect(addToCartButton).toBeVisible();
        await expect(async () => {
            await addToCartButton.click();
            const badge = page.locator('button[aria-label="Open cart"] span');
            await expect(badge).toHaveText('1');
        }).toPass();

        // Open the cart modal
        const cartButton = page.locator('button[aria-label="Open cart"]');
        await cartButton.click();

        // Verify the cart modal header
        await expect(page.locator('h2', { hasText: 'Your Cart' })).toBeVisible();

        // Verify the product is in the cart
        const productTitleInCart = page.locator('.fixed.top-0.right-0 h3', { hasText: 'Classic White T-Shirt' });
        await expect(productTitleInCart).toBeVisible();

        // Verify the subtotal section
        await expect(page.locator('.fixed.top-0.right-0 span', { hasText: 'Subtotal' })).toBeVisible();
    });
});
