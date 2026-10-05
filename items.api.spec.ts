import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {
  const res = await request.post('/reset');
  expect(res.status()).toBe(204);
});

// TC-01 · REQ-API-01 · GET /items returns all items
test('TC-01 GET /items returns 200 and list of items', async ({ request }) => {
  const res = await request.get('/items');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toEqual([
    { id: 1, sku: 'A-1', qty: 5 },
    { id: 2, sku: 'B-2', qty: 0 },
  ]);
});

// TC-02 · REQ-API-02 · GET /items/:id returns specific item
test('TC-02 GET /items/1 returns 200 and item detail', async ({ request }) => {
  const res = await request.get('/items/1');
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ id: 1, sku: 'A-1', qty: 5 });
});

// TC-03 · REQ-API-02 · GET /items/:id for unknown id returns 404
test('TC-03 GET /items/999 returns 404 with error message', async ({ request }) => {
  const res = await request.get('/items/999');
  expect(res.status()).toBe(404);
  expect(await res.json()).toEqual({ error: 'not found' });
});

// TC-04 · REQ-API-03 · valid POST creates an item
test('TC-04 POST /items with valid body returns 201 and new item', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'C-3', qty: 7 } });
  expect(res.status()).toBe(201);
  expect(await res.json()).toEqual({ id: 3, sku: 'C-3', qty: 7 });
});

// TC-05 · REQ-API-03 · POST with qty 0 (boundary) succeeds
test('TC-05 POST /items with qty 0 returns 201', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'C-3', qty: 0 } });
  expect(res.status()).toBe(201);
  expect(await res.json()).toEqual({ id: 3, sku: 'C-3', qty: 0 });
});

// TC-06 · REQ-API-03 · POST with qty -1 returns 400
test('TC-06 POST /items with qty -1 returns 400', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'C-3', qty: -1 } });
  expect(res.status()).toBe(400);
  expect(await res.json()).toEqual({ error: 'invalid qty' });
});

// TC-07 · REQ-API-04 · POST with invalid sku returns 400
test('TC-07 POST /items with invalid sku returns 400', async ({ request }) => {
  const res = await request.post('/items', { data: { sku: 'bad sku!', qty: 5 } });
  expect(res.status()).toBe(400);
  expect(await res.json()).toEqual({ error: 'invalid sku' });
});

// TC-08 · REQ-API-05 · PUT updates existing item
test('TC-08 PUT /items/1 updates item', async ({ request }) => {
  const res = await request.put('/items/1', { data: { sku: 'A-1-UPDATED', qty: 10 } });
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ id: 1, sku: 'A-1-UPDATED', qty: 10 });
});

// TC-09 · REQ-API-06 & REQ-API-07 · DELETE removes item and returns 204
test('TC-09 DELETE /items/1 returns 204 and item is deleted', async ({ request }) => {
  const deleteRes = await request.delete('/items/1');
  expect(deleteRes.status()).toBe(204);
  expect(await deleteRes.text()).toBe('');

  // Verify deletion via GET
  const getRes = await request.get('/items/1');
  expect(getRes.status()).toBe(404);
});

// TC-10 · REQ-API-06 · DELETE unknown item returns 404
test('TC-10 DELETE /items/999 returns 404', async ({ request }) => {
  const res = await request.delete('/items/999');
  expect(res.status()).toBe(404);
  expect(await res.json()).toEqual({ error: 'not found' });
});