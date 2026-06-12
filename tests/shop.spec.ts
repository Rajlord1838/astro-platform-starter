import { test, expect } from '@playwright/test';

// Use localhost:4321 as the base URL for tests
const BASE_URL = 'http://localhost:4321';

test.describe('Fashion Store Shop', () => {
    test.beforeEach(async ({ page }) => {
        // Clear local storage before each test
        await page.goto(BASE_URL);
        await page.evaluate(() => {
            window.localStorage.clear();
        });
        // Reload to ensure clean state
        await page.goto(BASE_URL);
    });

    test('should render the product grid with mock products', async ({ page }) => {
        // Assert that the page loaded successfully by checking for the main heading
        await expect(page.locator('text=Summer Collection 2024')).toBeVisible();

        // Check for specific products based on the mock data (use first to avoid strict mode violations if description matches)
        await expect(page.locator('text=Classic White T-Shirt').first()).toBeVisible();
        await expect(page.locator('text=Slim Fit Blue Jeans').first()).toBeVisible();
        await expect(page.locator('text=Vintage Leather Jacket').first()).toBeVisible();

        // Assert there is an Add to Cart button
        const addToCartButtons = page.locator('button:has-text("Add to Cart")');
        expect(await addToCartButtons.count()).toBeGreaterThan(0);
    });

    test('should add an item to the cart and update the cart counter', async ({ page }) => {
        // Verify cart is initially empty (counter badge not present)
        await expect(page.locator('button[aria-label="Open Cart"] span.bg-red-600')).toBeHidden();

        // Find the first Add to Cart button and click it
        const firstAddToCartButton = page.locator('button:has-text("Add to Cart")').first();
        await firstAddToCartButton.click();

        // Wait for and verify the cart counter is now 1
        const cartCounter = page.locator('button[aria-label="Open Cart"] span.bg-red-600');
        await expect(cartCounter).toBeVisible();
        await expect(cartCounter).toHaveText('1');

        // Click it again to ensure it increments to 2
        await firstAddToCartButton.click();
        await expect(cartCounter).toHaveText('2');
    });

    test('should display added product in the cart sidebar', async ({ page }) => {
        // Add the first product to cart
        const firstAddToCartButton = page.locator('button:has-text("Add to Cart")').first();
        await firstAddToCartButton.click();

        // Get the name of the first product
        const productName = await page.locator('h3.text-sm.font-medium.text-gray-900').first().innerText();

        // Open the cart sidebar
        await page.locator('button[aria-label="Open Cart"]').click();

        // Verify the cart sidebar is open
        await expect(page.locator('h2#slide-over-title:has-text("Shopping cart")')).toBeVisible();

        // Verify the product is in the cart
        const cartItem = page.locator(`li.py-6.flex:has-text("${productName}")`);
        await expect(cartItem).toBeVisible();
    });
});
