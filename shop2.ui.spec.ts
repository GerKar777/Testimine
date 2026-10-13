
import { test, expect } from './fixtures';

test.describe('Sorting', () => {
  test('UI-11 cheapest product first', async ({ shop }) => {
    await shop.sortBy('Price: low to high');
    await expect(shop.products().first()).toContainText('Wireless Mouse');
    await expect(shop.prices().first()).toHaveText('24.50 €');
  });

  test('UI-12 most expensive product first', async ({ shop }) => {
    await shop.sortBy('Price: high to low');
    await expect(shop.products().first()).toContainText('Monitor 27"');
    await expect(shop.prices().first()).toHaveText('249.00 €');
  });
});

test.describe('Quantity', () => {
  test('UI-13 quantity 3 updates totals', async ({ shop }) => {
    await shop.add('USB-C Hub');
    await shop.openCart();
    await shop.setQuantity('USB-C Hub', 3);

    await expect(shop.quantity('USB-C Hub')).toHaveValue('3');
    await expect(shop.lineTotal('USB-C Hub')).toHaveText('117.00 €');
    await expect(shop.cartTotal()).toHaveText('117.00 €');
  });

  test('UI-14 quantity 0 is not allowed', async ({ shop }) => {
    await shop.add('USB-C Hub');
    await shop.openCart();
    await shop.setQuantity('USB-C Hub', 0);

    await expect(shop.quantity('USB-C Hub')).toHaveValue('1');
    await expect(shop.cartTotal()).toHaveText('39.00 €');
  });
});

test.describe('Discount', () => {
  test('UI-15 SAVE10 discounts one product', async ({ shop }) => {
    await shop.add('USB-C Hub');
    await shop.openCart();
    await shop.applyDiscount('SAVE10');

    await expect(shop.cartSubtotal()).toHaveText('39.00 €');
    await expect(shop.cartDiscount()).toHaveText('−3.90 €');
    await expect(shop.cartTotal()).toHaveText('35.10 €');
  });

  test('UI-16 SAVE10 discounts the entire basket', async ({ shop }) => {
    await test.step('add two different products', async () => {
      await shop.add('USB-C Hub');
      await shop.add('Wireless Mouse');
      await shop.openCart();

      await expect(shop.cartSubtotal()).toHaveText('63.50 €');
    });

    await test.step('apply SAVE10', async () => {
      await shop.applyDiscount('SAVE10');

      await expect(shop.cartDiscount()).toHaveText('−6.35 €');
      await expect(shop.cartTotal()).toHaveText('57.15 €');
    });
  });

  test('UI-17 invalid code does not change total', async ({ shop }) => {
    await shop.add('USB-C Hub');
    await shop.openCart();
    await shop.applyDiscount('WRONGCODE');

    await expect(shop.discountMessage()).toContainText('Invalid code');
    await expect(shop.cartTotal()).toHaveText('39.00 €');
  });
});

test.describe('Data-driven email validation', () => {
  const invalidEmails = [
    { email: 'plainaddress', why: 'missing @' },
    { email: 'mari@', why: 'missing domain' },
    { email: '@example.com', why: 'missing username' },
    { email: 'mari@example', why: 'missing domain extension' }
  ];

  for (const { email, why } of invalidEmails) {
    test(`UI-18 email "${email}" is rejected (${why})`, async ({ shop }) => {
      await shop.add('USB-C Hub');
      await shop.openCart();

      await shop.checkout(
        'Mari Maasikas',
        email,
        'Pikk 1, Tallinn'
      );

      await expect(shop.error('email')).toContainText(
        'Enter a valid email address'
      );
    });
  }
});
