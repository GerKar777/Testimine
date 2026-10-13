import { test as base } from '@playwright/test';
import { ShopPage } from './shop.page';

export const test = base.extend<{ shop: ShopPage }>({
  shop: async ({ page }, use) => {
    const shop = new ShopPage(page);
    await shop.open();
    await use(shop);
  },
});

export { expect } from '@playwright/test';