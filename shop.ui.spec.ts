import { test, expect } from './fixtures';

test('UI-01 displays all six products', async ({ shop }) => {
  await expect(shop.products()).toHaveCount(6);
  await expect(shop.resultCount()).toHaveText('6 products');
});

test('UI-02 search finds Wireless Mouse', async ({ shop }) => {
  await shop.search('Mouse');
  await expect(shop.products()).toHaveCount(1);
  await expect(shop.products()).toContainText('Wireless Mouse');
});

test('UI-03 search is case-insensitive', async ({ shop }) => {
  await shop.search('mouse');
  await expect(shop.products()).toHaveCount(1);
  await expect(shop.products()).toContainText('Wireless Mouse');
});

test('UI-04 adding Laptop Stand updates the cart count', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await expect(shop.cartCount()).toHaveText('1');
});

test('UI-05 cart shows one row with the correct total', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.openCart();
  await expect(shop.cartRows()).toHaveCount(1);
  await expect(shop.cartTotal()).toHaveText('39.00 €');
});

test('UI-06 total multiplies price by quantity', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.add('USB-C Hub');
  await shop.openCart();

  await expect(shop.cartRows()).toHaveCount(1);
  await expect(shop.cartRows().getByTestId('qty')).toHaveText('2');
  await expect(shop.cartRows().getByTestId('line-total')).toHaveText('78.00 €');
  await expect(shop.cartTotal()).toHaveText('78.00 €');
});

test('UI-07 removing the last product empties the cart', async ({ shop }) => {
  await shop.add('Webcam HD');
  await shop.openCart();
  await shop.remove('Webcam HD');

  await expect(shop.cartEmptyMessage()).toContainText('Your cart is empty');
  await expect(shop.cartCount()).toHaveText('0');
});

test('UI-08 empty checkout shows three validation errors', async ({ shop }) => {
  await shop.openCart();
  await shop.placeOrder();

  await expect(shop.error('name')).toBeVisible();
  await expect(shop.error('email')).toBeVisible();
  await expect(shop.error('address')).toBeVisible();
});

test('UI-09 invalid email is rejected', async ({ shop }) => {
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'mari@', 'Pikk 1, Tallinn');

  await expect(shop.error('email')).toHaveText('Enter a valid email address');
  await expect(shop.confirmation()).toHaveCount(0);
});

test('UI-10 valid order shows confirmation and empties the cart', async ({ shop }) => {
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'mari@example.com', 'Pikk 1, Tallinn');

  await expect(shop.confirmation()).toContainText('Thank you, Mari Maasikas!');
  await expect(shop.cartCount()).toHaveText('0');
});