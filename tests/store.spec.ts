import { test, expect } from '@playwright/test';

test.describe('Fashion Store', () => {
    test('should display products and allow adding to cart', async ({ page }) => {
        // Clear local storage to ensure a clean state
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();

        // Check if the store title is present
        await expect(page.locator('h1')).toContainText('Fashion Store');

        // Check if products are rendered - Retry block for hydration
        await expect(async () => {
             const count = await page.locator('h3').count();
             expect(count).toBeGreaterThan(0);
        }).toPass();

        // Check the first product
        const firstProduct = page.locator('.grid > astro-island').first();
        await expect(firstProduct.locator('h3')).toHaveText('Classic White T-Shirt');

        // Add the first product to the cart
        const addToCartButton = firstProduct.locator('button:has-text("Add to Cart")');
        await addToCartButton.click();

        // Check if the cart badge updated
        await expect(async () => {
            const cartBadge = page.locator('nav button span.bg-primary');
            await expect(cartBadge).toHaveText('1');
        }).toPass();

        // Open the cart sidebar
        const cartButton = page.locator('nav button:has(.lucide-shopping-cart)');
        await cartButton.click();

        // Check if the sidebar opened and shows the item
        const sidebar = page.locator('div.fixed.inset-0 h2:has-text("Shopping cart")');
        await expect(sidebar).toBeVisible();

        const cartItemName = page.locator('div.fixed.inset-0 li h3');
        await expect(cartItemName).toHaveText('Classic White T-Shirt');

        const cartItemPrice = page.locator('div.fixed.inset-0 li p:has-text("$29.99")').first();
        await expect(cartItemPrice).toHaveText('$29.99');

        // Subtotal
        const subtotal = page.locator('div.fixed.inset-0 p:has-text("Subtotal") + p');
        await expect(subtotal).toHaveText('$29.99');

        // Close the cart
        const closeButton = page.locator('div.fixed.inset-0 button:has(.lucide-x)');
        await closeButton.click();
        await expect(page.locator('h2:has-text("Shopping cart")')).toBeHidden();
    });
});
