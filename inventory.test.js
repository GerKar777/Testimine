const { restock, pick, findDuplicateSkus } = require('./inventory');

// ---- Functional tests (etapp 1a) ----
test('REQ-01 restock adds quantity to existing sku', () => {
  const stock = { 'A-1': 5 };
  expect(restock(stock, [{ sku: 'A-1', qty: 3 }])).toEqual({ 'A-1': 8 });
});

// REQ-02 restock returns a new object, original unchanged
test('REQ-02 restock returns a new object, original unchanged', () => {
  const stock = { 'A-1': 5 };

  const result = restock(stock, [{ sku: 'A-1', qty: 3 }]);

  expect(result).toEqual({ 'A-1': 8 });
  expect(stock).toEqual({ 'A-1': 5 });
  expect(result).not.toBe(stock);
});

// REQ-03 qty must be a positive whole number
test('REQ-03 restock rejects invalid quantity', () => {
  const stock = { 'A-1': 5 };

  expect(() => restock(stock, [{ sku: 'A-1', qty: 0 }])).toThrow();
  expect(() => restock(stock, [{ sku: 'A-1', qty: -1 }])).toThrow();
  expect(() => restock(stock, [{ sku: 'A-1', qty: 1.5 }])).toThrow();
});

// REQ-04 pick reduces stock
test('REQ-04 pick reduces quantity', () => {
  const stock = { 'A-1': 10 };

  expect(pick(stock, 'A-1', 3)).toEqual({ 'A-1': 7 });
});

// REQ-04 pick rejects unknown sku
test('REQ-04 pick rejects unknown sku', () => {
  const stock = { 'A-1': 10 };

  expect(() => pick(stock, 'B-1', 3)).toThrow();
});

// REQ-04 pick rejects quantity greater than available
test('REQ-04 pick rejects insufficient stock', () => {
  const stock = { 'A-1': 10 };

  expect(() => pick(stock, 'A-1', 11)).toThrow();
});

// REQ-05 findDuplicateSkus returns each duplicate once
test('REQ-05 findDuplicateSkus returns each duplicate once', () => {
  const items = [
    { sku: 'A-1' },
    { sku: 'B-1' },
    { sku: 'A-1' },
    { sku: 'A-1' },
    { sku: 'B-1' }
  ];

  expect(findDuplicateSkus(items)).toEqual(['A-1', 'B-1']);
});

// REQ-02 restock adds unknown sku
test('REQ-02 restock adds unknown sku', () => {
  const stock = { 'A-1': 5 };

  expect(restock(stock, [{ sku: 'B-1', qty: 4 }]))
    .toEqual({
      'A-1': 5,
      'B-1': 4
    });
});

// REQ-06 performance test
test('REQ-06 findDuplicateSkus handles 20000 items in under 100 ms', () => {
  const items = [];

  for (let i = 0; i < 20000; i++) {
    items.push({ sku: `SKU-${i}` });
  }

  const start = performance.now();
  findDuplicateSkus(items);
  const end = performance.now();

  expect(end - start).toBeLessThan(100);
});

// ---- Performance test (etapp 1b) ----
// TODO: generate 20 000 items with some duplicates, measure findDuplicateSkus,
// assert it finishes under 100 ms. See project guide chapter 3.2.

// ---- Security and reliability tests (etapp 1c) ----
// TODO: REQ-07 with test.each, REQ-08 original stock unchanged after a failed restock.
