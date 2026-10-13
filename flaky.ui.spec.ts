import { test, expect } from '@playwright/test';
import { ShopPage } from './shop.page';

test('FLAKY-01 order confirmation is waited for with a web-first assertion', async ({ page }) => {
  const shop = new ShopPage(page);
  await shop.open();
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'mari@example.com', 'Pikk 1, Tallinn');
  await expect(shop.confirmation()).toContainText('Order #');
});
