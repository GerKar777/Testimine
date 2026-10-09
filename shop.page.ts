import { Page, Locator } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/');
  }

  async add(name: string) {
    await this.page.getByRole('button', { name: `Add ${name} to cart` }).click();
  }

  async openCart() {
    await this.page.getByRole('link', { name: /Cart/ }).click();
  }

  async checkout(name: string, email: string, address: string) {
    await this.page.getByLabel('Full name').fill(name);
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Delivery address').fill(address);
    await this.page.getByRole('button', { name: 'Place order' }).click();
  }

  cartTotal(): Locator { return this.page.getByTestId('cart-total'); }
  confirmation(): Locator { return this.page.getByTestId('order-confirmation'); }
  cartCount(): Locator { return this.page.getByTestId('cart-count'); }
}