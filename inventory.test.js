const { restock, pick, findDuplicateSkus } = require('./inventory');

// ---- Functional tests ----
test('REQ-01 restock adds quantity to existing sku', () => {
  const stock = { 'A-1': 5 };
  expect(restock(stock, [{ sku: 'A-1', qty: 3 }])).toEqual({ 'A-1': 8 });
});

test('restock adds a previously unknown SKU', () => {
  expect(restock({}, [{ sku: 'B-2', qty: 4 }])).toEqual({ 'B-2': 4 });
});

test('restock returns a new object and does not mutate the original stock', () => {
  const stock = { 'A-1': 5 };
  const updated = restock(stock, [{ sku: 'A-1', qty: 2 }]);
  expect(updated).toEqual({ 'A-1': 7 });
  expect(stock).toEqual({ 'A-1': 5 });
  expect(updated).not.toBe(stock);
});

test('restock rejects non-positive or non-integer quantities', () => {
  for (const qty of [0, -1, 1.5]) {
    expect(() => restock({ 'A-1': 5 }, [{ sku: 'A-1', qty }])).toThrow(Error);
  }
});

test('pick removes the requested quantity without mutating original stock', () => {
  const stock = { 'A-1': 5 };
  const updated = pick(stock, 'A-1', 2);
  expect(updated).toEqual({ 'A-1': 3 });
  expect(stock).toEqual({ 'A-1': 5 });
  expect(updated).not.toBe(stock);
});

test('pick rejects an unknown SKU and an amount exceeding stock', () => {
  expect(() => pick({ 'A-1': 5 }, 'B-2', 1)).toThrow(Error);
  expect(() => pick({ 'A-1': 5 }, 'A-1', 6)).toThrow(Error);
});

// ---- Performance test (etapp 1b) ----
test('findDuplicateSkus handles 20,000 items in under 100 ms', () => {
  const items = Array.from({ length: 20_000 }, (_, i) => ({
    sku: `SKU-${Math.floor(i / 2)}`,
  }));

  const start = performance.now();
  const duplicates = findDuplicateSkus(items);
  const elapsed = performance.now() - start;

  expect(duplicates.length).toBe(10_000);
  expect(elapsed).toBeLessThan(100);
});

// ---- Security and reliability tests (etapp 1c) ----
test.each(['', 'bad sku', 'A/1', 'A;DROP', 'x'.repeat(21), null, 123])(
  'REQ-07 rejects invalid SKU %p',
  (sku) => {
    expect(() => restock({}, [{ sku, qty: 1 }])).toThrow(Error);
  }
);

test('REQ-08 original stock stays unchanged when restock fails', () => {
  const stock = { 'A-1': 5 };
  expect(() => restock(stock, [
    { sku: 'A-1', qty: 2 },
    { sku: 'B-2', qty: 0 },
  ])).toThrow(Error);
  expect(stock).toEqual({ 'A-1': 5 });
});
