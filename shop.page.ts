import { Page, Locator } from '@playwright/test';

export class ShopPage { constructor(private page: Page) {}

async open() { await this.page.goto('/'); }

async search(text: string) { await this.page.getByRole('searchbox', { name: 'Search products' }).fill(text); }

async sortBy(option: 'Name' | 'Price: low to high' | 'Price: high to low') { await this.page.getByRole('combobox', { name: 'Sort by' }).selectOption({ label: option }); }

async add(name: string) { await this.page.getByRole('button', { name: `Buy ${name}` }).click(); }

async openCart() { await this.page.getByRole('link', { name: 'Basket' }).click(); }

async setQuantity(name: string, qty: number) { const quantity = this.page.getByRole('spinbutton', { name: `Quantity for ${name}` }); await quantity.fill(String(qty)); await quantity.blur(); }

async remove(name: string) { await this.page.getByRole('button', { name: `Remove ${name}` }).click(); }

async applyDiscount(code: string) { await this.page.getByLabel('Discount code').fill(code); await this.page.getByRole('button', { name: 'Apply' }).click(); }

async checkout(name: string, email: string, address: string) { await this.page.getByLabel('Full name').fill(name); await this.page.getByLabel('Email').fill(email); await this.page.getByLabel('Delivery address').fill(address); await this.page.getByRole('button', { name: 'Place order' }).click(); }

products(): Locator { return this.page.getByTestId('product'); }

prices(): Locator { return this.page.getByTestId('price'); }

resultCount(): Locator { return this.page.getByTestId('result-count'); }

cartCount(): Locator { return this.page.getByTestId('cart-count'); }

cartRows(): Locator { return this.page.getByTestId('cart-row'); }

lineTotal(name: string): Locator { return this.cartRows().filter({ hasText: name }).getByTestId('line-total'); }

cartSubtotal(): Locator { return this.page.getByTestId('cart-subtotal'); }

cartDiscount(): Locator { return this.page.getByTestId('cart-discount'); }

cartTotal(): Locator { return this.page.getByTestId('cart-total'); }

discountMessage(): Locator { return this.page.getByTestId('discount-message'); }

confirmation(): Locator { return this.page.getByTestId('order-confirmation'); }

error(field: 'name' | 'email' | 'address'): Locator { return this.page.locator(`#${field}-error`); } }