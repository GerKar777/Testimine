import { test, expect } from '@playwright/test';

// Every test starts from the same data: POST /reset restores the two initial items
test.beforeEach(async ({ request }) => {
  await request.post('/reset');
});

// TC-01  REQ-API-01  GET /items returns the item list
test('TC-01 GET /items returns 200 and an array of 2 items', async ({ request }) => {
  const res = await request.get('/items');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBe(2);
});


test('TC-02 GET /items/1 returns 200 and item object', async ({ request }) => {
  const res = await request.get('/items/1');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toEqual({ id: 1, sku: 'A-1', qty: 5 });
});


test('TC-03 GET /items/999 returns 404 for unknown id', async ({ request }) => {
  const res = await request.get('/items/999');
  expect(res.status()).toBe(404);
  const body = await res.json();
  expect(body).toEqual({ error: 'not found' });
});


test('TC-04 POST /items creates a new item and returns 201', async ({ request }) => {
  const res = await request.post('/items', {
    data: { sku: 'C-3', qty: 7 }
  });
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body).toEqual({ id: 3, sku: 'C-3', qty: 7 });
});


test('TC-05 POST /items accepts qty = 0', async ({ request }) => {
  const res = await request.post('/items', {
    data: { sku: 'C-3', qty: 0 }
  });
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.qty).toBe(0);
});


test('TC-06 POST /items rejects negative qty -1 with 400', async ({ request }) => {
  const res = await request.post('/items', {
    data: { sku: 'C-3', qty: -1 }
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body).toEqual({ error: 'invalid qty' });
});


test('TC-07 POST /items rejects invalid sku format', async ({ request }) => {
  const res = await request.post('/items', {
    data: { sku: 'bad sku!', qty: 1 }
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body).toEqual({ error: 'invalid sku' });
});


test('TC-08 PUT /items/1 updates item qty and returns 200', async ({ request }) => {
  const res = await request.put('/items/1', {
    data: { sku: 'A-1', qty: 10 }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toEqual({ id: 1, sku: 'A-1', qty: 10 });
});


test('TC-09 DELETE /items/1 returns 204 with empty body', async ({ request }) => {
  const res = await request.delete('/items/1');
  expect(res.status()).toBe(204);
  expect(await res.text()).toBe('');
});


test('TC-10 DELETE /items/999 returns 404 for unknown id', async ({ request }) => {
  const res = await request.delete('/items/999');
  expect(res.status()).toBe(404);
  const body = await res.json();
  expect(body).toEqual({ error: 'not found' });
});