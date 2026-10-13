import { test, expect } from './fixtures';
 
test.describe('sorting', () => {
  test('UI-11 "Price: low to high" puts the cheapest product first', async ({ shop }) => {
    await shop.sortBy('Price: low to high');
    await expect(shop.products().first()).toContainText('Wireless Mouse');
    await expect(shop.prices().first()).toHaveText('24.50 €');
  });

  test('UI-12 "Price: high to low" puts the most expensive product first', async ({ shop }) => {
    await shop.sortBy('Price: high to low');
    await expect(shop.products().first()).toContainText('Monitor 27"');
    await expect(shop.prices().first()).toHaveText('249.00 €');
  });
});

const invalidEmails = [
  { email: 'mari', why: 'no @' },
  { email: 'mari@', why: 'no domain' },
  { email: 'mari@example', why: 'no top-level domain' },
  { email: 'mari maasikas@example.com', why: 'space' },
];

for (const { email, why } of invalidEmails) {
  test(`UI-18 email "${email}" is rejected (${why})`, async ({ shop }) => {
    await shop.openCart();
    await shop.checkout('Mari Maasikas', email, 'Pikk 1, Tallinn');
    await expect(shop.error('email')).toHaveText('Enter a valid email address');
  });
}

test('UI-16 SAVE10 applies to the whole basket (two products)', async ({ shop }) => {
  await test.step('add two different products', async () => {
    await shop.add('USB-C Hub');
    await shop.add('Wireless Mouse');
    await shop.openCart();
    await expect(shop.cartSubtotal()).toHaveText('63.50 €');
  });
  await test.step('apply SAVE10', async () => {
    await shop.applyDiscount('SAVE10');
    await expect(shop.cartDiscount()).toHaveText('-6.35 €');
    await expect(shop.cartTotal()).toHaveText('57.15 €');
  });
});