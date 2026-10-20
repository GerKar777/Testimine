import { test, expect } from '@playwright/test';

// Every test starts from the same data: POST /reset restores the two initial items
// (see server.js). Without this, a DELETE in one test would break the next test.
test.beforeEach(async ({ request }) => {
  await request.post('/reset');
});

// TC-01 · REQ-API-01 · GET /items
  test('TC-01 GET /items returns 200 and array of 2 items', async ({ request }) => {
    const res = await request.get('/items');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(2);
  });

  // TC-02 · REQ-API-02 · GET /items/1
  test('TC-02 GET /items/1 returns 200 and the item', async ({ request }) => {
    const res = await request.get('/items/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ id: 1, sku: 'A-1', qty: 5 });
  });

  // TC-03 · REQ-API-02 · GET /items/999 (Несуществующий ID)
  test('TC-03 GET /items/999 returns 404 with error body', async ({ request }) => {
    const res = await request.get('/items/999');
    expect(res.status()).toBe(404);
    expect(await res.json()).toEqual({ error: 'not found' });
  });

  // TC-04 · REQ-API-03 · POST /items с валидным телом
  test('TC-04 POST /items with valid body returns 201 and new item', async ({ request }) => {
    const res = await request.post('/items', {
      data: { sku: 'C-3', qty: 10 }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toEqual({ id: 3, sku: 'C-3', qty: 10 });
  });

  // TC-05 · REQ-API-03 · POST /items с qty = 0 (граничное значение)
  test('TC-05 POST /items with qty 0 returns 201 (boundary)', async ({ request }) => {
    const res = await request.post('/items', {
      data: { sku: 'C-3', qty: 0 }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toEqual({ id: 3, sku: 'C-3', qty: 0 });
  });