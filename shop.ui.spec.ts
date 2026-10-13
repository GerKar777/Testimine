import { test, expect } from './fixtures';

test('UI-01 products page shows 6 products', async ({ shop }) => {
  await expect(shop.products()).toHaveCount(6);
});

test('UI-02 search "mouse" shows only the mouse', async ({ shop }) => {
  await shop.search('mouse');
  await expect(shop.products()).toHaveCount(1);
  await expect(shop.products()).toContainText('Wireless Mouse');
});

test('UI-03 search "mouse" (lower case) also finds the mouse', async ({ shop }) => {
  await shop.search('mouse');
  await expect(shop.products()).toHaveCount(1);
  await expect(shop.products()).toContainText('Wireless Mouse');
});

test('UI-04 adding a product increases the cart badge to 1', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await expect(shop.cartCount()).toHaveText('1');
});

test('UI-05 basket shows one row with the correct total', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.openCart();
  await expect(shop.cartRows()).toHaveCount(1);
  await expect(shop.lineTotal('USB-C Hub')).toHaveText('39.00 €');
  await expect(shop.cartTotal()).toHaveText('39.00 €');
});

test('UI-06 adding the same product twice gives qty 2 and total 78.00 €', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.add('USB-C Hub');
  await shop.openCart();
  await expect(shop.cartRows()).toHaveCount(1);
  await expect(shop.lineTotal('USB-C Hub')).toHaveText('78.00 €');
  await expect(shop.cartTotal()).toHaveText('78.00 €');
});

test('UI-07 removing the only row shows "Your basket is empty"', async ({ shop }) => {
  await shop.add('Webcam HD');
  await shop.openCart();
  await shop.remove('Webcam HD');
  await expect(shop.page.locator('body')).toContainText('Your basket is empty');
});

test('UI-08 submitting an empty checkout form shows 3 error messages', async ({ shop }) => {
  await shop.add('Webcam HD');
  await shop.openCart();
  await shop.checkout('', '', '');
  await expect(shop.error('name')).toBeVisible();
  await expect(shop.error('email')).toBeVisible();
  await expect(shop.error('address')).toBeVisible();
});

test('UI-09 email "mari@" shows an email error', async ({ shop }) => {
  await shop.add('Webcam HD');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'mari@', 'Pikk 1, Tallinn');
  await expect(shop.error('email')).toHaveText('Enter a valid email address');
});

test('UI-10 valid order shows confirmation and empties the basket', async ({ shop }) => {
  await shop.add('Webcam HD');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'mari@example.com', 'Pikk 1, Tallinn');
  await expect(shop.confirmation()).toBeVisible();
  await expect(shop.cartCount()).toHaveText('0');
});