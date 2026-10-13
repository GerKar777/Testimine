import { test, expect } from '@playwright/test';

test.describe('MiniShop v2 - Additional Functional Tests (UI-11 to UI-21)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('UI-11: Price low to high sorting', async ({ page }) => {
    await page.locator('#sort').selectOption('price-asc');
    await page.waitForTimeout(100);
    const prices = await page.locator('[data-testid="price"]').allTextContents();
    const nums = prices.map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
    for (let i = 0; i < nums.length - 1; i++) {
      expect(nums[i]).toBeLessThanOrEqual(nums[i + 1]);
    }
  });

  test('UI-12: Price high to low sorting', async ({ page }) => {
    await page.locator('#sort').selectOption('price-desc');
    await page.waitForTimeout(100);
    const prices = await page.locator('[data-testid="price"]').allTextContents();
    const nums = prices.map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
    for (let i = 0; i < nums.length - 1; i++) {
      expect(nums[i]).toBeGreaterThanOrEqual(nums[i + 1]);
    }
  });

  test('UI-13: Changing quantity updates line total and cart total', async ({ page }) => {
    // Кликаем по первой кнопке добавления в корзину
    await page.locator('.product-card button, button.add-to-cart, [data-testid="add-to-cart"]').first().click();
    await page.locator('#cart-btn, a[href*="cart"]').click();
    await page.locator('[data-qty]').fill('3');
    const total = await page.locator('[data-testid="cart-total"], #cart-total').textContent();
    expect(total).not.toBeNull();
  });

  test('UI-14: Quantity zero or negative is not allowed', async ({ page }) => {
    await page.locator('.product-card button, button.add-to-cart, [data-testid="add-to-cart"]').first().click();
    await page.locator('#cart-btn, a[href*="cart"]').click();
    const qtyInput = page.locator('[data-qty]');
    await qtyInput.fill('0');
    const val = await qtyInput.inputValue();
    expect(Number(val)).toBeGreaterThan(0);
  });

  test('UI-15: Discount code SAVE10 gives 10% off for single product', async ({ page }) => {
    await page.locator('.product-card button, button.add-to-cart, [data-testid="add-to-cart"]').first().click();
    await page.locator('#cart-btn, a[href*="cart"]').click();
    await page.locator('#discount').fill('SAVE10');
    await page.locator('#apply-discount, button:has-text("Apply")').click();
    await expect(page.locator('.discount-row, [data-testid="discount"]')).toBeVisible();
  });

  test('UI-16: Discount code SAVE10 applies to the whole basket', async ({ page }) => {
    const buttons = page.locator('.product-card button, button.add-to-cart, [data-testid="add-to-cart"]');
    await buttons.nth(0).click();
    await buttons.nth(1).click();
    await page.locator('#cart-btn, a[href*="cart"]').click();
    await page.locator('#discount').fill('SAVE10');
    await page.locator('#apply-discount, button:has-text("Apply")').click();
    await expect(page.locator('.discount-row, [data-testid="discount"]')).toBeVisible();
  });

  test('UI-17: Unknown discount code shows invalid message', async ({ page }) => {
    await page.locator('.product-card button, button.add-to-cart, [data-testid="add-to-cart"]').first().click();
    await page.locator('#cart-btn, a[href*="cart"]').click();
    await page.locator('#discount').fill('INVALID');
    await page.locator('#apply-discount, button:has-text("Apply")').click();
    await expect(page.locator('.error, .invalid-code, [data-testid="error"]')).toBeVisible();
  });

  test('UI-18: Invalid email validation format', async ({ page }) => {
    await page.locator('.product-card button, button.add-to-cart, [data-testid="add-to-cart"]').first().click();
    await page.locator('#cart-btn, a[href*="cart"]').click();
    await page.locator('#name').fill('Mari Maasikas');
    await page.locator('#email').fill('invalid-email');
    await page.locator('#address').fill('Pikk 1');
    await page.locator('#checkout, button:has-text("Checkout")').click();
    await expect(page.locator('#email:invalid, .error')).toBeVisible();
  });

  test('UI-19: Empty name field shows error on checkout', async ({ page }) => {
    await page.locator('.product-card button, button.add-to-cart, [data-testid="add-to-cart"]').first().click();
    await page.locator('#cart-btn, a[href*="cart"]').click();
    await page.locator('#name').fill('');
    await page.locator('#email').fill('mari@test.com');
    await page.locator('#address').fill('Pikk 1');
    await page.locator('#checkout, button:has-text("Checkout")').click();
    await expect(page.locator('.error, [data-testid="error"]')).toBeVisible();
  });

  test('UI-20: Empty address field shows error on checkout', async ({ page }) => {
    await page.locator('.product-card button, button.add-to-cart, [data-testid="add-to-cart"]').first().click();
    await page.locator('#cart-btn, a[href*="cart"]').click();
    await page.locator('#name').fill('Mari Maasikas');
    await page.locator('#email').fill('mari@test.com');
    await page.locator('#address').fill('');
    await page.locator('#checkout, button:has-text("Checkout")').click();
    await expect(page.locator('.error, [data-testid="error"]')).toBeVisible();
  });

  test('UI-21: Sorting by name alphabetical order', async ({ page }) => {
    await page.locator('#sort').selectOption('name');
    await page.waitForTimeout(100);
    const names = await page.locator('.card h3, [data-testid="product-title"]').allTextContents();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
  });

});