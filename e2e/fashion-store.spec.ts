import { test, expect } from '@playwright/test';

test('has title and featured products', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Fashion Store - Discover Your Style/);
  await expect(page.getByText('Featured Arrivals')).toBeVisible();
});

test('can navigate to products and add to cart', async ({ page }) => {
  await page.goto('/products');
  await expect(page).toHaveTitle(/All Products - Fashion Store/);

  // Accept dialog to handle alert from AddToCartButton
  page.on('dialog', dialog => dialog.accept());

  // Use async retry block for the click as React hydration might be delayed
  await expect(async () => {
      await page.getByRole('button', { name: 'Add to Cart' }).first().click();
      await expect(page.locator('a[href="/cart"] span')).toHaveText('1');
  }).toPass();

  // Navigate to Cart
  await page.goto('/cart');

  // Verify item is in cart
  await expect(page.getByRole('heading', { name: 'Classic White T-Shirt' })).toBeVisible();
});
