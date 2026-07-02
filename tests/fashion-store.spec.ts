import { test, expect } from '@playwright/test';

test('fashion store basic flow', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check title and hero section
    await expect(page).toHaveTitle('Fashion Store - Shop Latest Trends');
    await expect(page.locator('h1')).toContainText('Discover Your Style');

    // Wait for the React islands to hydrate
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Verify products are rendered
    const productCards = page.locator('div.grid').locator('astro-island');
    await expect(productCards).toHaveCount(6);

    // Check cart initially empty
    let cartButton = page.getByLabel('Open cart');
    await expect(cartButton).toBeVisible();
    await expect(cartButton.locator('span.absolute')).not.toBeVisible();

    // Add first item to cart
    const firstProductAddBtn = productCards.nth(0).locator('button').first();
    await firstProductAddBtn.click();

    // Re-select cart button and verify quantity badge
    await expect(page.getByLabel('Open cart').locator('span.absolute')).toContainText('1');

    // Add second item to cart
    const secondProductAddBtn = productCards.nth(1).locator('button').first();
    await secondProductAddBtn.click();

    // Verify quantity badge updated
    await expect(page.getByLabel('Open cart').locator('span.absolute')).toContainText('2');

    // Open cart flyout
    await page.getByLabel('Open cart').click();

    // Verify cart flyout content
    const flyout = page.locator('div.fixed.top-0.right-0').first();
    await expect(flyout).toBeVisible();
    await expect(flyout.locator('h2')).toContainText('Your Cart (2)');

    // Verify total price is displayed
    await expect(flyout.locator('.text-xl.text-white').last()).toContainText('$');

    // Verify cart items in local storage
    const cartStorage = await page.evaluate(() => localStorage.getItem('fashion_store_cart'));
    expect(cartStorage).toBeTruthy();
    if (cartStorage) {
        const cart = JSON.parse(cartStorage);
        expect(cart.length).toBe(2);
    }

    // Close cart flyout
    await page.getByLabel('Close cart').click();
});
