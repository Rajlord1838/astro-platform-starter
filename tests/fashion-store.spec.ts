import { test, expect } from '@playwright/test';

test('fashion store frontend tests', async ({ page }) => {
  // Go to the main page
  await page.goto('/');

  // Verify the page title and main heading
  await expect(page).toHaveTitle(/Fashion Store/);
  await expect(page.locator('h1').filter({ hasText: 'Fashion Store' })).toBeVisible();

  // Verify that products are displayed
  await expect(page.getByRole('heading', { name: 'Classic White T-Shirt' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Denim Jacket' })).toBeVisible();

  // Verify the cart is initially empty
  await expect(page.locator('nav').getByRole('button', { name: 'Shopping Cart' })).toBeVisible();
  // There shouldn't be an item count badge yet
  await expect(page.locator('nav').getByRole('button', { name: 'Shopping Cart' }).locator('span')).toHaveCount(0);

  // Add a product to the cart
  const addToCartButton = page.locator('.bg-white', { hasText: 'Classic White T-Shirt' }).getByRole('button', { name: 'Add to Cart' });
  await addToCartButton.click();

  // Verify cart item count updated
  const cartBadge = page.locator('nav').getByRole('button', { name: 'Shopping Cart' }).locator('span');
  await expect(cartBadge).toHaveText('1');

  // Add another product to the cart
  const addAnotherButton = page.locator('.bg-white', { hasText: 'Denim Jacket' }).getByRole('button', { name: 'Add to Cart' });
  await addAnotherButton.click();

  // Verify cart item count updated again
  await expect(cartBadge).toHaveText('2');

  // Open the cart
  await page.locator('nav').getByRole('button', { name: 'Shopping Cart' }).click();

  // Verify cart contents
  const cartModal = page.locator('div').filter({ hasText: 'Your Cart' }).nth(1);

  // Need to be careful because 'Your Cart' matches multiple nested divs
  await expect(page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();

  // Wait for the modal to be visible and grab the list container
  const cartList = page.locator('ul');

  await expect(cartList.getByText('Classic White T-Shirt')).toBeVisible();
  await expect(cartList.getByText('Denim Jacket')).toBeVisible();

  // Verify total calculation (25 + 85 = 110)
  await expect(page.getByText('$110.00')).toBeVisible();

  // Remove an item
  await cartList.locator('li').filter({ hasText: 'Classic White T-Shirt' }).getByRole('button', { name: 'Remove' }).click();

  // Verify it was removed
  await expect(cartList.getByText('Classic White T-Shirt')).not.toBeVisible();
  await expect(cartList.getByText('Denim Jacket')).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  // Total in cart
  const cartTotal = page.locator('div').filter({ hasText: 'Total:' }).last().locator('span').last();
  await expect(cartTotal).toHaveText('$85.00');
});
