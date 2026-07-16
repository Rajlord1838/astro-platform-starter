import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('verify fashion store ui and cart functionality', async ({ page }) => {
  await page.goto('http://localhost:4321');

  // Verify header and hero section
  await expect(page.getByText('FASHION STORE')).toBeVisible();
  await expect(page.getByText('Discover Your Style')).toBeVisible();

  // Initially cart should be empty
  const cartButton = page.locator('button[aria-label="Shopping Cart"]');
  await expect(cartButton).toBeVisible();
  await expect(cartButton.locator('span')).not.toBeVisible();

  // Add the first product to cart
  const addToCartButtons = page.getByRole('button', { name: 'Add to Cart' });
  await expect(addToCartButtons.first()).toBeVisible();
  await addToCartButtons.first().click();

  // Verify button state changes to 'Added!'
  await expect(page.getByRole('button', { name: 'Added!' }).first()).toBeVisible();

  // Verify cart count updates to 1
  await expect(cartButton.locator('span')).toHaveText('1');

  // Take a screenshot of the main page
  await page.screenshot({ path: 'fashion_store_home.png', fullPage: true });
});
