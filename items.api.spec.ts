import { test, expect } from '@playwright/test';

// Every test starts from the same data: POST /reset restores the two initial items
// (see server.js). Without this, a DELETE in one test would break the next test.
test.beforeEach(async ({ request }) => {
  await request.post('/reset');
});

// TC-01 · REQ-API-01 · GET /items returns the item list
test('TC-01 GET /items returns 200 and an array of 2 items', async ({ request }) => {
  const res = await request.get('/items');          // 1. send the request
  expect(res.status()).toBe(200);                    // 2. check the status code
  const body = await res.json();                     // 3. read the body as JSON
  expect(Array.isArray(body)).toBe(true);            // 4. check the shape
  expect(body.length).toBe(2);                       // 5. check the content
});

// TC-02 · REQ-API-02 · existing item returns 200
test('TC-02 GET /items/1 returns the first item', async ({ request }) => {
  const res = await request.get('/items/1');

  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({
    id: 1,
    sku: 'A-1',
    qty: 5
  });
});

// TC-03 · REQ-API-02 · unknown item returns 404
test('TC-03 GET /items/999 returns 404 and not found error', async ({ request }) => {
  const res = await request.get('/items/999');

  expect(res.status()).toBe(404);
  expect(await res.json()).toEqual({ error: 'not found' });
});

// TC-04 · REQ-API-03 · valid POST creates an item
test('TC-04 POST /items with valid body returns 201 and new item', async ({ request }) => {
  const res = await request.post('/items', {
    data: { sku: 'C-3', qty: 7 }
  });

  expect(res.status()).toBe(201);
  expect(await res.json()).toEqual({
    id: 3,
    sku: 'C-3',
    qty: 7
  });
});

// TC-05 · REQ-API-03 · qty 0 is allowed
test('TC-05 POST /items with qty 0 returns 201', async ({ request }) => {
  const res = await request.post('/items', {
    data: { sku: 'C-3', qty: 0 }
  });

  expect(res.status()).toBe(201);
  expect(await res.json()).toEqual({
    id: 3,
    sku: 'C-3',
    qty: 0
  });
});

// TC-06 · REQ-API-03 · negative qty is rejected
test('TC-06 POST /items with qty -1 returns 400', async ({ request }) => {
  const res = await request.post('/items', {
    data: { sku: 'C-3', qty: -1 }
  });

  expect(res.status()).toBe(400);
  expect(await res.json()).toEqual({ error: 'invalid qty' });
});

// TC-07 · REQ-API-04 · invalid sku is rejected
test('TC-07 POST /items with invalid sku returns 400', async ({ request }) => {
  const res = await request.post('/items', {
    data: { sku: 'bad sku!', qty: 5 }
  });

  expect(res.status()).toBe(400);
  expect(await res.json()).toEqual({ error: 'invalid sku' });
});

// TC-08 · REQ-API-05 · valid PUT updates an item
test('TC-08 PUT /items/1 updates the item', async ({ request }) => {
  const res = await request.put('/items/1', {
    data: { sku: 'A-9', qty: 9 }
  });

  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({
    id: 1,
    sku: 'A-9',
    qty: 9
  });
});

// TC-09 · REQ-API-06 + REQ-API-07 · delete removes the item
test('TC-09 DELETE /items/1 returns 204 and removes the item', async ({ request }) => {
  const del = await request.delete('/items/1');

  expect(del.status()).toBe(204);
  expect(await del.text()).toBe('');

  const get = await request.get('/items/1');

  expect(get.status()).toBe(404);
  expect(await get.json()).toEqual({ error: 'not found' });
});

// TC-10 · REQ-API-06 · unknown delete returns 404
test('TC-10 DELETE /items/999 returns 404', async ({ request }) => {
  const res = await request.delete('/items/999');

  expect(res.status()).toBe(404);
  expect(await res.json()).toEqual({ error: 'not found' });
});
