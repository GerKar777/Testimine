import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// UI-01 · REQ-UI-01
test('UI-01 products page shows 6 products', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  await expect(page.getByTestId('product')).toHaveCount(6);
  await expect(page.getByTestId('result-count')).toHaveText('6 products');
});

// UI-02 · REQ-UI-02
test('UI-02 search "Mouse" shows only the mouse', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Search products' }).fill('Mouse');
  await expect(page.getByTestId('product')).toHaveCount(1);
  await expect(page.getByText('Wireless Mouse')).toBeVisible();
});

// UI-03 · REQ-UI-02
test('UI-03 search "mouse" (lower case) also finds the mouse', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Search products' }).fill('mouse');
  await expect(page.getByTestId('product')).toHaveCount(1);
});

// UI-04 · REQ-UI-03
test('UI-04 adding a product increases the cart badge to 1', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Laptop Stand to cart' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
});

// UI-05 · REQ-UI-04
test('UI-05 cart shows one row with the correct total', async ({ page }) => {
  await page.getByRole('button', { name: 'Add USB-C Hub to cart' }).click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await expect(page.getByTestId('cart-row')).toHaveCount(1);
  await expect(page.getByTestId('cart-total')).toHaveText('39.00 €');
});

// UI-06 · REQ-UI-04
test('UI-06 adding the same product twice gives qty 2 and total 78.00 €', async ({ page }) => {
  await page.getByRole('button', { name: 'Add USB-C Hub to cart' }).click();
  await page.getByRole('button', { name: 'Add USB-C Hub to cart' }).click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await expect(page.getByTestId('cart-total')).toHaveText('78.00 €');
});

// UI-07 · REQ-UI-05
test('UI-07 removing the only row shows "Your cart is empty"', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Webcam HD to cart' }).click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await page.getByRole('button', { name: 'Remove Webcam HD' }).click();
  await expect(page.getByTestId('cart-empty')).toContainText('Your cart is empty');
  await expect(page.getByTestId('cart-count')).toHaveText('0');
});

// UI-08 · REQ-UI-06
test('UI-08 submitting an empty checkout form shows 3 error messages', async ({ page }) => {
  await page.getByRole('link', { name: /Cart/ }).click();
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.locator('#name-error')).toBeVisible();
  await expect(page.locator('#email-error')).toBeVisible();
  await expect(page.locator('#address-error')).toBeVisible();
});

// UI-09 · REQ-UI-06
test('UI-09 email "mari@" shows an email error', async ({ page }) => {
  await page.getByRole('link', { name: /Cart/ }).click();
  await page.getByLabel('Full name').fill('Mari Maasikas');
  await page.getByLabel('Email').fill('mari@');
  await page.getByLabel('Delivery address').fill('Pikk 1, Tallinn');
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.locator('#email-error')).toHaveText('Enter a valid email address');
});

// UI-10 · REQ-UI-07
test('UI-10 valid order shows confirmation and empties the cart', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await page.getByLabel('Full name').fill('Mari Maasikas');
  await page.getByLabel('Email').fill('mari@example.com');
  await page.getByLabel('Delivery address').fill('Pikk 1, Tallinn');
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.getByTestId('order-confirmation')).toContainText('Thank you, Mari Maasikas!');
  await expect(page.getByTestId('cart-count')).toHaveText('0');
});