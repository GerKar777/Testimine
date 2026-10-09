import { test, expect } from '@playwright/test'; import { ShopPage } from './shop.page';

test.beforeEach(async ({ page }) => { await page.goto('/'); });

test('UI-01 displays all six products', async ({ page }) => { await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible(); await expect(page.getByTestId('product')).toHaveCount(6); await expect(page.getByTestId('result-count')).toHaveText('6 products'); });

test('UI-02 search finds Wireless Mouse', async ({ page }) => { await page.getByRole('searchbox', { name: 'Search products' }).fill('Mouse'); await expect(page.getByTestId('product')).toHaveCount(1); await expect(page.getByTestId('product')).toContainText('Wireless Mouse'); });

test('UI-03 search is case-insensitive', async ({ page }) => { await page.getByRole('searchbox', { name: 'Search products' }).fill('mouse'); await expect(page.getByTestId('product')).toHaveCount(1); await expect(page.getByTestId('product')).toContainText('Wireless Mouse'); });

test('UI-04 adding Laptop Stand updates the cart count', async ({ page }) => { const shop = new ShopPage(page); await shop.add('Laptop Stand'); await expect(shop.cartCount()).toHaveText('1'); });

test('UI-05 cart shows one row with the correct total', async ({ page }) => { await page.getByRole('button', { name: 'Add USB-C Hub to cart' }).click(); await page.getByRole('link', { name: /Cart/ }).click(); await expect(page.getByRole('heading', { name: 'Your cart' })).toBeVisible(); await expect(page.getByTestId('cart-row')).toHaveCount(1); await expect(page.getByTestId('cart-total')).toHaveText('39.00 €'); });

test('UI-06 total multiplies price by quantity', async ({ page }) => { const addButton = page.getByRole('button', { name: 'Add USB-C Hub to cart' }); await addButton.click(); await addButton.click(); await page.getByRole('link', { name: /Cart/ }).click();

const row = page.getByTestId('cart-row'); await expect(row).toHaveCount(1); await expect(row.getByTestId('qty')).toHaveText('2'); await expect(row.getByTestId('line-total')).toHaveText('78.00 €'); await expect(page.getByTestId('cart-total')).toHaveText('78.00 €'); });

test('UI-07 removing the last product empties the cart', async ({ page }) => { await page.getByRole('button', { name: 'Add Webcam HD to cart' }).click(); await page.getByRole('link', { name: /Cart/ }).click(); await page.getByRole('button', { name: 'Remove Webcam HD' }).click(); await expect(page.getByTestId('cart-empty')).toContainText('Your cart is empty'); await expect(page.getByTestId('cart-count')).toHaveText('0'); });

test('UI-08 empty checkout shows three validation errors', async ({ page }) => { await page.getByRole('link', { name: /Cart/ }).click(); await page.getByRole('button', { name: 'Place order' }).click(); await expect(page.locator('#name-error')).toBeVisible(); await expect(page.locator('#email-error')).toBeVisible(); await expect(page.locator('#address-error')).toBeVisible(); });

test('UI-09 invalid email is rejected', async ({ page }) => { await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click(); await page.getByRole('link', { name: /Cart/ }).click(); await page.getByLabel('Full name').fill('Mari Maasikas'); await page.getByLabel('Email').fill('mari@'); await page.getByLabel('Delivery address').fill('Pikk 1, Tallinn'); await page.getByRole('button', { name: 'Place order' }).click();

await expect(page.locator('#email-error')).toHaveText('Enter a valid email address'); await expect(page.getByTestId('order-confirmation')).toHaveCount(0); });

test('UI-10 valid order shows confirmation and empties the cart', async ({ page }) => { const shop = new ShopPage(page); await shop.add('Wireless Mouse'); await shop.openCart(); await shop.checkout('Mari Maasikas', 'mari@example.com', 'Pikk 1, Tallinn'); await expect(shop.confirmation()).toContainText('Thank you, Mari Maasikas!'); await expect(shop.cartCount()).toHaveText('0'); });