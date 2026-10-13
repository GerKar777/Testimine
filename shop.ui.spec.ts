
import { test, expect } from './fixtures';

test('UI-01 products page shows 6 products', async ({ shop }) => {
  await expect(shop.productHeading()).toBeVisible();
  await expect(shop.products()).toHaveCount(6);
  await expect(shop.resultCount()).toHaveText('6 products');
});

test('UI-02 search finds Wireless Mouse', async ({ shop }) => {
  await shop.search('Mouse');
  await expect(shop.products()).toContainText('Wireless Mouse');
});

test('UI-03 lowercase search finds Wireless Mouse', async ({ shop }) => {
  await shop.search('mouse');
  await expect(shop.products()).toHaveCount(1);
  await expect(shop.products()).toContainText('Wireless Mouse');
});

test('UI-04 adding Laptop Stand updates cart count', async ({ shop }) => {
  await shop.add('Laptop Stand');
  await expect(shop.cartCount()).toHaveText('1');
});

test('UI-05 cart shows correct USB-C Hub total', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.openCart();

  await expect(shop.cartRows()).toHaveCount(1);
  await expect(shop.cartTotal()).toHaveText('39.00 €');
});

test('UI-06 adding the same product twice gives qty 2 and total 78.00 €', async ({ shop }) => {
  await shop.add('USB-C Hub');
  await shop.add('USB-C Hub');
  await shop.openCart();

  await expect(shop.quantity('USB-C Hub')).toHaveValue('2');
  await expect(shop.lineTotal('USB-C Hub')).toHaveText('78.00 €');
  await expect(shop.cartTotal()).toHaveText('78.00 €');
});

test('UI-07 removing Webcam HD empties cart', async ({ shop }) => {
  await shop.add('Webcam HD');
  await shop.openCart();
  await shop.remove('Webcam HD');

  await expect(shop.cartEmpty()).toBeVisible();
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
  await shop.add('USB-C Hub');
  await shop.openCart();

  await shop.checkout(
    'Mari Maasikas',
    'mari@',
    'Pikk 1, Tallinn'
  );

  await expect(shop.error('email')).toContainText(
    'Enter a valid email address'
  );
});

test('UI-10 valid order shows confirmation and empties the cart', async ({ shop }) => {
  await shop.add('Wireless Mouse');
  await shop.openCart();

  await shop.checkout(
    'Mari Maasikas',
    'mari@example.com',
    'Pikk 1, Tallinn'
  );

  await expect(shop.confirmation()).toContainText(
    'Thank you, Mari Maasikas!'
  );

  await expect(shop.cartCount()).toHaveText('0');
});
