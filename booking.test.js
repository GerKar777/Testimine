const { bookingPrice } = require('./booking');

test('one night, one guest costs 50', () => {
  expect(bookingPrice(1, 1)).toBe(50);
});

test('accepts the maximum stay of 30 nights', () => {
  expect(bookingPrice(30, 1)).toBe(1500);
});

test('charges 10 EUR per night for each extra guest', () => {
  expect(bookingPrice(2, 3)).toBe(140);
});

test('applies WEEKEND discount for a stay of at least two nights', () => {
  expect(bookingPrice(2, 1, 'WEEKEND')).toBe(85);
});

test('discount code is case-insensitive', () => {
  expect(bookingPrice(2, 1, 'weekend')).toBe(85);
});

test('does not apply WEEKEND discount to a one-night stay', () => {
  expect(bookingPrice(1, 1, 'WEEKEND')).toBe(50);
});

test('throws for zero nights', () => {
  expect(() => bookingPrice(0, 1)).toThrow(Error);
});

test('throws for more than four guests', () => {
  expect(() => bookingPrice(1, 5)).toThrow(Error);
});
