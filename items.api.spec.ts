import { test, expect } from '@playwright/test';

// Every test starts from the same data: POST /reset restores the two initial items.
// This keeps tests independent even when a test creates or deletes an item.
test.beforeEach(async ({ request }) => {
  await request.post('/reset');
});

// TC-01 · REQ-API-01 · GET /items returns the item list
test('TC-01 GET /items returns 200 and an array of 2 items', async ({ request }) => {
  const res = await request.get('/items');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body).toHaveLength(2);
});

// TC-02 · REQ-API-02 · GET /items/:id returns an existing item
test('TC-02 GET /items/1 returns the item with id 1', async ({ request }) => {
  const res = await request.get('/items/1');
  expect(res.status()).toBe(200);
  await expect(res.json()).resolves.toEqual({ id: 1, sku: 'A-1', qty: 5 });
});

// TC-03 · REQ-API-02 · a missing item returns 404
test('TC-03 GET /items/999 returns 404 for a missing item', async ({ request }) => {
  const res = await request.get('/items/999');
  expect(res.status()).toBe(404);
  await expect(res.json()).resolves.toEqual({ error: 'not found' });
});

// TC-04 · REQ-API-03 · valid item can be created
test('TC-04 POST /items creates a valid item with status 201', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'C-3', qty: 7 } });
  expect(res.status()).toBe(201);
  await expect(res.json()).resolves.toEqual({ id: 3, sku: 'C-3', qty: 7 });
});

// TC-05 · REQ-API-03 · SKU must contain 1–20 allowed characters
test('TC-05 POST /items rejects an invalid SKU', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'bad sku!', qty: 1 } });
  expect(res.status()).toBe(400);
  await expect(res.json()).resolves.toEqual({ error: 'invalid sku' });
});

// TC-06 · REQ-API-03 · quantity must be a whole number greater than or equal to zero
test('TC-06 POST /items rejects a negative quantity', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'C-3', qty: -1 } });
  expect(res.status()).toBe(400);
  await expect(res.json()).resolves.toEqual({ error: 'invalid qty' });
});

// TC-07 · REQ-API-04 · an existing item can be updated
test('TC-07 PUT /items/1 updates SKU and quantity', async ({ request }) => {
  const res = await request.put('/items/1', { data: { sku: 'A-1-new', qty: 8 } });
  expect(res.status()).toBe(200);
  await expect(res.json()).resolves.toEqual({ id: 1, sku: 'A-1-new', qty: 8 });
});

// TC-08 · REQ-API-04 · updating a missing item returns 404
test('TC-08 PUT /items/999 returns 404 for a missing item', async ({ request }) => {
  const res = await request.put('/items/999', { data: { sku: 'C-3', qty: 1 } });
  expect(res.status()).toBe(404);
  await expect(res.json()).resolves.toEqual({ error: 'not found' });
});

// TC-09 · REQ-API-05 · successful deletion returns 204 with no response body
test('TC-09 DELETE /items/1 returns 204 and no body', async ({ request }) => {
  const res = await request.delete('/items/1');
  expect(res.status()).toBe(204);
  expect(await res.text()).toBe('');
});

// TC-10 · REQ-API-05 · deleting a missing item returns 404
test('TC-10 DELETE /items/999 returns 404 for a missing item', async ({ request }) => {
  const res = await request.delete('/items/999');
  expect(res.status()).toBe(404);
  await expect(res.json()).resolves.toEqual({ error: 'not found' });
});
