import { test, expect } from '@playwright/test';

test.describe('Fashion Store', () => {
    test.beforeEach(async ({ page }) => {
        // Mock the cart in local storage before navigating
        await page.addInitScript(() => {
            window.localStorage.clear();
        });
        await page.goto('http://localhost:4321');
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');
    });

    test('should add products to cart and update badge', async ({ page }) => {
        // Wait for products to load
        const addButtons = page.locator('text="Add to cart"');
        await addButtons.first().waitFor();

        // Ensure badge is initially hidden/0
        const badge = page.locator('.cart-button span');
        await expect(badge).not.toBeVisible();

        // Add first product to cart
        await addButtons.first().click();

        // Retry checking badge as React hydration/events might be slightly delayed
        await expect(async () => {
            const badgeCount = await page.locator('.cart-button span').textContent();
            expect(badgeCount).toBe('1');
        }).toPass();

        // Add second product
        await addButtons.nth(1).click();

        await expect(async () => {
            const badgeCount = await page.locator('.cart-button span').textContent();
            expect(badgeCount).toBe('2');
        }).toPass();
    });

    test('should open modal and manage items', async ({ page }) => {
        // Add a product to ensure modal isn't empty
        const addButtons = page.locator('text="Add to cart"');
        await addButtons.first().waitFor();
        await addButtons.first().click();

        // Open cart modal
        await page.locator('.cart-button').click();

        // Wait for modal
        await expect(page.locator('text="Your Cart"')).toBeVisible();

        // Check if item is present in modal
        const modal = page.locator('.fixed.inset-0'); // or whatever class targets the modal
        await expect(modal.locator('text="Classic White T-Shirt"')).toBeVisible();

        // Increase quantity
        const increaseBtn = page.locator('button[aria-label="Increase quantity"]');
        await increaseBtn.click();
        await expect(modal.locator('span:text-is("2")')).toBeVisible();

        // Remove item
        await page.locator('text="Remove"').click();

        // Verify empty cart
        await expect(page.locator('text="Your cart is empty."')).toBeVisible();

        // Close modal
        await page.locator('button[aria-label="Close Cart"]').click();
        await expect(page.locator('text="Your Cart"')).not.toBeVisible();
    });
});
