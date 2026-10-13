import { test as base, expect } from '@playwright/test';
import { ShopPage } from './shop.page';

type Fixtures = {
  shop: ShopPage;
};

export const test = base.extend<Fixtures>({
  shop: async ({ page }, use) => {
    const shop = new ShopPage(page);
    await shop.open();
    await use(shop);
  },
});

export { expect };