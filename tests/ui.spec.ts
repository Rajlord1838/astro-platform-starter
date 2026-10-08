import { test, expect } from '@playwright/test';

test.describe('Fashion Store E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Clear local storage and go to the home page
        await page.goto('http://localhost:4321');
        await page.evaluate(() => window.localStorage.clear());
        await page.reload();
    });

    test('should load the home page with products', async ({ page }) => {
        await expect(page).toHaveTitle(/FashionStore/);
        await expect(page.locator('h1')).toContainText('Latest Collection');
        await expect(page.locator('text=Classic White T-Shirt')).toBeVisible();
    });

    test('should add a product to the cart and update the badge', async ({ page }) => {
        // Wait for hydration by checking for astro-island
        await page.waitForSelector('astro-island');

        // The badge shouldn't have a count initially
        const cartBadge = page.locator('header button[aria-label="Open cart"]');
        await expect(cartBadge.locator('span')).not.toBeVisible();

        // Add first product to cart with force to bypass Astro island intercepting pointer events
        const firstAddToCartBtn = page.locator('button:has-text("Add to Cart")').first();
        await firstAddToCartBtn.click({ force: true });

        // Wait for state to sync, badge should show 1
        await expect(cartBadge.locator('span')).toContainText('1');
    });

    test('should open cart modal and verify contents', async ({ page }) => {
        // Wait for hydration by checking for astro-island
        await page.waitForSelector('astro-island');

        // Add item
        const firstAddToCartBtn = page.locator('button:has-text("Add to Cart")').first();
        await firstAddToCartBtn.click({ force: true });

        // Open modal
        const cartBadge = page.locator('header button[aria-label="Open cart"]');

        // Use a retry block just for the click to handle hydration intercepting events
        const dialog = page.locator('dialog');
        await expect(async () => {
            await cartBadge.click({ force: true }); // Use force to bypass Astro island intercepting pointer events
            await expect(dialog).toBeVisible();
        }).toPass();

        // Verify modal contents
        await expect(dialog.locator('h2')).toContainText('Shopping Cart');
        await expect(dialog.locator('text=Classic White T-Shirt')).toBeVisible();

        // Increase quantity
        const increaseBtn = dialog.locator('button[aria-label="Increase quantity"]');
        await increaseBtn.click();

        // Wait for quantity to update to 2
        await expect(dialog.locator('span.w-8.text-center')).toContainText('2');

        // Close modal
        // Find the specific button with the X icon to close
        const closeBtn = dialog.locator('button').first();
        await closeBtn.click();
        await expect(dialog).not.toBeVisible();
    });
});
