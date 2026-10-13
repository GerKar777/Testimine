import { test, expect } from './fixtures';

test('FLAKY-01 order confirmation is waited for with a web-first assertion', async ({ shop }) => {
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'mari@example.com', 'Pikk 1, Tallinn');
  await expect(shop.confirmation()).toContainText('Order #');   // автоожидание вместо тупого sleep
});