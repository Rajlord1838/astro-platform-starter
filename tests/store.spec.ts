import { test, expect } from '@playwright/test';

test.describe('Fashion Store UI', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test so the cart starts empty
    await page.goto('http://localhost:4321');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
  });

  test('should display products on the home page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('New Season Arrivals');
    await expect(page.locator('.group').first()).toBeVisible();
  });

  test('should add item to cart and update cart count', async ({ page }) => {
    const cartCount = page.locator('#cart-count');

    // Explicitly check for hidden class since playwright's toBeHidden might fail on tailwind classes if the element is still technically in DOM but hidden via CSS class
    await expect(cartCount).toHaveClass(/hidden/);

    const addButtons = page.locator('.add-to-cart-btn');
    await expect(addButtons.first()).toBeVisible();
    await addButtons.first().click();

    await expect(cartCount).not.toHaveClass(/hidden/);
    await expect(cartCount).toHaveText('1');

    // Test that the button text changes temporarily
    await expect(addButtons.first()).toHaveText('Added!');
  });

  test('should open cart modal and display items', async ({ page }) => {
    // Add item to cart
    await page.locator('.add-to-cart-btn').first().click();

    // Open cart modal
    await page.locator('#cart-button').click();

    // Check if modal is visible
    const cartModal = page.locator('#cart-modal');
    await expect(cartModal).toBeVisible();

    // Check if React component is loaded inside
    await expect(cartModal.locator('h2')).toContainText('Shopping Cart');

    // Check if item is listed
    await expect(cartModal.locator('ul li')).toHaveCount(1);

    // Close modal
    await cartModal.locator('button[aria-label="Close cart"]').click();
  });
});
