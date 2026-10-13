import { Page, Locator } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/');
  }

  async search(text: string) {
    await this.page.getByRole('searchbox', { name: 'Search products' }).fill(text);
  }

  async sortBy(option: 'Name' | 'Price: low to high' | 'Price: high to low') {
    await this.page.getByRole('combobox', { name: 'Sort by' }).selectOption({ label: option });
  }

  async add(name: string) {
    await this.page.getByRole('button', { name: `Buy ${name}` }).click();
  }

  async openCart() {
    await this.page.getByRole('link', { name: 'Basket' }).click();
  }

  async applyDiscount(code: string) {
    await this.page.getByLabel('Discount code').fill(code);
    await this.page.getByRole('button', { name: 'Apply' }).click();
  }

  async checkout(name: string, email: string, address: string) {
    await this.page.getByLabel('Full name').fill(name);
    await this.page.getByLabel('Email address').fill(email);
    await this.page.getByLabel('Delivery address').fill(address);
    await this.page.getByRole('button', { name: 'Place order' }).click();
  }

  products(): Locator { return this.page.getByTestId('product'); }
  prices(): Locator { return this.page.getByTestId('price'); }
  cartSubtotal(): Locator { return this.page.getByTestId('cart-subtotal'); }
  cartDiscount(): Locator { return this.page.getByTestId('cart-discount'); }
  cartTotal(): Locator { return this.page.getByTestId('cart-total'); }
  confirmation(): Locator { return this.page.getByTestId('order-confirmation'); }
  error(field: 'name' | 'email' | 'address'): Locator { return this.page.locator(`#${field}-error`); }
}