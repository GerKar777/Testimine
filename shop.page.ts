import { Page, Locator } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) { }

  productHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Products' });
  }

  resultCount(): Locator {
    return this.page.getByTestId('result-count');
  }

  cartRows(): Locator {
    return this.page.getByTestId('cart-row');
  }

  cartEmpty(): Locator {
    return this.page.getByTestId('cart-empty');
  }

  quantity(name: string): Locator {
    return this.page.getByRole('spinbutton', {
      name: `Quantity for ${name}`
    });
  }

  lineTotal(name: string): Locator {
    return this.cartRows()
      .filter({ hasText: name })
      .getByTestId('line-total');
  }

  async placeOrder() {
    await this.page.getByRole('button', {
      name: 'Place order'
    }).click();
  }

  async open() {
    await this.page.goto('/');
  }

  async search(text: string) {
    await this.page.getByRole('searchbox', { name: 'Search products' }).fill(text);
  }

  async add(name: string) {
    await this.page.getByRole('button', {
      name: `Buy ${name}`
    }).click();
  }

  async openCart() {
    await this.page.getByRole('link', {
      name: 'Basket'
    }).click();
  }

  async remove(name: string) {
    await this.page.getByRole('button', { name: `Remove ${name}` }).click();
  }

  async checkout(name: string, email: string, address: string) {
    await this.page.getByLabel('Full name').fill(name);
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Delivery address').fill(address);
    await this.page.getByRole('button', { name: 'Place order' }).click();
  }

  products(): Locator { return this.page.getByTestId('product'); }
  cartCount(): Locator { return this.page.getByTestId('cart-count'); }
  cartTotal(): Locator { return this.page.getByTestId('cart-total'); }
  confirmation(): Locator { return this.page.getByTestId('order-confirmation'); }
  error(field: 'name' | 'email' | 'address'): Locator { return this.page.locator(`#${field}-error`); }
}