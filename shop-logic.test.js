// Unit tests for shop-logic.js. One describe() per function, one test() per behaviour.
// Pattern: Arrange (data) → Act (call the function) → Assert (expect).
const { 
  filterProducts, 
  sortProducts, 
  lineTotal, 
  cartTotals, 
  normalizeQuantity, 
  discountRateFor, 
  validateCheckout 
} = require('./shop-logic');

const PRODUCTS = [
  { id: 1, name: 'Laptop Stand', price: 29.90 },
  { id: 2, name: 'USB-C Hub', price: 39.00 },
  { id: 3, name: 'Monitor 27"', price: 249.00 },
  { id: 4, name: 'Wireless Mouse', price: 24.50 },
];

describe('filterProducts', () => {
  test('UT-01 empty query returns all products', () => {
    expect(filterProducts(PRODUCTS, '')).toHaveLength(4);
  });

  test('UT-02 lower case query finds matching products case-insensitively', () => {
    const result = filterProducts(PRODUCTS, 'mouse');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Wireless Mouse');
  });

  test('UT-03 no match returns empty array', () => {
    expect(filterProducts(PRODUCTS, 'tablet')).toEqual([]);
  });

  test('UT-04 undefined query behaves like empty and returns all', () => {
    expect(filterProducts(PRODUCTS, undefined)).toHaveLength(4);
  });
});

describe('sortProducts', () => {
  test('UT-05 name sorts A to Z', () => {
    const sorted = sortProducts(PRODUCTS, 'name');
    const names = sorted.map(p => p.name);
    expect(names).toEqual(['Laptop Stand', 'Monitor 27"', 'USB-C Hub', 'Wireless Mouse']);
  });

  test('UT-06 price-asc puts cheapest first', () => {
    const sorted = sortProducts(PRODUCTS, 'price-asc');
    expect(sorted[0].price).toBe(24.50);
    expect(sorted[sorted.length - 1].price).toBe(249.00);
  });

  test('UT-07 price-desc puts most expensive first', () => {
    const sorted = sortProducts(PRODUCTS, 'price-desc');
    expect(sorted[0].price).toBe(249.00);
  });

  test('UT-08 does not mutate the input array', () => {
    const copy = [...PRODUCTS];
    sortProducts(PRODUCTS, 'price-desc');
    expect(PRODUCTS).toEqual(copy);
  });
});

describe('lineTotal', () => {
  test('UT-09 price * qty calculates correctly', () => {
    expect(lineTotal(39.00, 2)).toBe(78);
  });

  test('UT-10 rounds to 2 decimals', () => {
    expect(lineTotal(0.1, 3)).toBe(0.3);
  });
});

describe('cartTotals', () => {
  const rows = [
    { price: 39.00, qty: 1 }, 
    { price: 24.50, qty: 1 }
  ];

  test('UT-11 subtotal sums all rows', () => {
    expect(cartTotals(rows).subtotal).toBe(63.5);
  });

  test('UT-12 no discount means total equals subtotal', () => {
    const result = cartTotals(rows, 0);
    expect(result.total).toBe(63.5);
    expect(result.discount).toBe(0);
  });

  test('UT-13 10% discount applies to the whole basket', () => {
    const result = cartTotals(rows, 0.10);
    expect(result).toEqual({ subtotal: 63.5, discount: 6.35, total: 57.15 });
  });

  test('UT-14 empty basket returns zeros', () => {
    expect(cartTotals([], 0.10)).toEqual({ subtotal: 0, discount: 0, total: 0 });
  });

  test('UT-15 quantity is respected', () => {
    const multiRows = [{ price: 39.00, qty: 3 }];
    expect(cartTotals(multiRows).subtotal).toBe(117);
  });
});

describe('normalizeQuantity', () => {
  test.each([
    [3, 3],
    ['3', 3],
    [2.7, 2],
    [1, 1]
  ])('UT-16 valid input %p -> %p', (input, expected) => {
    expect(normalizeQuantity(input)).toBe(expected);
  });

  test.each([
    [0, 1],
    [-5, 1],
    ['abc', 1],
    ['', 1],
    [null, 1]
  ])('UT-17 invalid %p -> 1', (input, expected) => {
    expect(normalizeQuantity(input)).toBe(expected);
  });
});

describe('discountRateFor', () => {
  test('UT-18 SAVE10 returns 0.10', () => {
    expect(discountRateFor('SAVE10')).toBe(0.10);
  });

  test('UT-19 case-insensitive and trimmed', () => {
    expect(discountRateFor('  save20 ')).toBe(0.20);
  });

  test('UT-20 unknown code returns 0', () => {
    expect(discountRateFor('UNKNOWN')).toBe(0);
    expect(discountRateFor('')).toBe(0);
  });
});

describe('validateCheckout', () => {
  test('UT-21 valid input returns no errors', () => {
    const input = { name: 'Mati Tamm', email: 'mati@example.com', address: 'Narva mnt 1' };
    expect(validateCheckout(input)).toEqual({});
  });

  test('UT-22 empty input returns three errors', () => {
    const result = validateCheckout({ name: '', email: '', address: '' });
    expect(Object.keys(result)).toHaveLength(3);
  });

  test('UT-23 name of 1 character is rejected, 2 accepted', () => {
    expect(validateCheckout({ name: 'M', email: 'a@b.ee', address: 'A' }).name).toBeDefined();
    expect(validateCheckout({ name: 'Ma', email: 'a@b.ee', address: 'A' }).name).toBeUndefined();
  });

  test.each([
    ['mari'],
    ['mari@'],
    ['mari@example'],
    ['mari maasikas@example.com']
  ])('UT-24 invalid email %p is rejected', (email) => {
    const result = validateCheckout({ name: 'Mati', email: email, address: 'Narva mnt 1' });
    expect(result.email).toBeDefined();
  });

  test('UT-25 whitespace-only address is rejected', () => {
    const result = validateCheckout({ name: 'Mati', email: 'mati@example.com', address: '   ' });
    expect(result.address).toBeDefined();
  });
});