import { test, expect } from './fixtures';

const parseMoney = (text: string | null) => Math.abs(parseFloat((text || '0').replace('−', '-').replace(/[^0-9.-]+/g, '')));

test.describe('MiniShop v2 - Additional Functional Tests (UI-11 to UI-21)', () => {
  
  test('UI-11: Price low to high sorting', async ({ page, shop }) => {
    await page.locator('#sort').selectOption('price-asc');
    await page.waitForTimeout(100); // короткая стабилизация DOM
    const prices = await page.locator('[data-testid="price"]').allTextContents();
    const nums = prices.map(p => parseMoney(p));
    for (let i = 0; i < nums.length - 1; i++) {
      expect(nums[i]).toBeLessThanOrEqual(nums[i + 1]);
    }
  });

  test('UI-12: Price high to low sorting', async ({ page, shop }) => {
    await page.locator('#sort').selectOption('price-desc');
    await page.waitForTimeout(100);
    const prices = await page.locator('[data-testid="price"]').allTextContents();
    const nums = prices.map(p => parseMoney(p));
    for (let i = 0; i < nums.length - 1; i++) {
      expect(nums[i]).toBeGreaterThanOrEqual(nums[i + 1]);
    }
  });

  test('UI-13: Changing quantity updates line total and cart total', async ({ page, shop }) => {
    await shop.add('Wireless Mouse');
    await shop.openCart();
    await page.locator('[data-qty]').fill('3');
    await page.locator('[data-qty]').dispatchEvent('change');
    const lineTotalText = await page.locator('[data-testid="line-total"]').textContent();
    const lineTotal = parseMoney(lineTotalText);
    expect(lineTotal).toBe(24.50 * 3);
  });

  test('UI-14: Quantity zero or negative is not allowed', async ({ page, shop }) => {
    await shop.add('Wireless Mouse');
    await shop.openCart();
    await page.locator('[data-qty]').fill('0');
    await page.locator('[data-qty]').dispatchEvent('change');
    const qtyValue = await page.locator('[data-qty]').inputValue();
    expect(Number(qtyValue)).toBeGreaterThanOrEqual(1);
  });

  test('UI-15: Discount code SAVE10 gives 10% off for single product', async ({ page, shop }) => {
    await shop.add('Wireless Mouse'); // 24.50
    await shop.openCart();
    await page.locator('#discount').fill('SAVE10');
    await page.locator('#apply-discount').click();
    const discountText = await page.locator('[data-testid="cart-discount"]').textContent();
    const discount = parseMoney(discountText);
    expect(discount).toBeCloseTo(2.45, 2);
  });

  test('UI-16: Discount code SAVE10 applies to the whole basket', async ({ page, shop }) => {
    await shop.add('Wireless Mouse'); // 24.50
    await shop.add('USB-C Hub');    // 39.00 -> Subtotal = 63.50
    await shop.openCart();
    await page.locator('#discount').fill('SAVE10');
    await page.locator('#apply-discount').click();
    const discountText = await page.locator('[data-testid="cart-discount"]').textContent();
    const discount = parseMoney(discountText);
    expect(discount).toBeCloseTo(6.35, 2);
  });

  test('UI-17: Unknown discount code shows invalid message', async ({ page, shop }) => {
    await shop.add('Wireless Mouse');
    await shop.openCart();
    await page.locator('#discount').fill('INVALID');
    await page.locator('#apply-discount').click();
    await expect(page.locator('#discount-message')).toContainText('Invalid code');
  });

  test('UI-18: Invalid email validation format', async ({ page, shop }) => {
    await shop.add('Wireless Mouse');
    await shop.openCart();
    await shop.checkout('Mari Maasikas', 'invalid-email', 'Pikk 1');
    await expect(page.locator('#email-error')).toContainText('valid email');
  });

  test('UI-19: Empty name field shows error on checkout', async ({ page, shop }) => {
    await shop.add('Wireless Mouse');
    await shop.openCart();
    await shop.checkout('', 'mari@test.com', 'Pikk 1');
    await expect(page.locator('#name-error')).not.toBeEmpty();
  });

  test('UI-20: Empty address field shows error on checkout', async ({ page, shop }) => {
    await shop.add('Wireless Mouse');
    await shop.openCart();
    await shop.checkout('Mari Maasikas', 'mari@test.com', '');
    await expect(page.locator('#address-error')).not.toBeEmpty();
  });

  test('UI-21: Sorting by name alphabetical order', async ({ page, shop }) => {
    await page.locator('#sort').selectOption('name');
    await page.waitForTimeout(100);
    const names = await page.locator('.card h3').allTextContents();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
  });

});