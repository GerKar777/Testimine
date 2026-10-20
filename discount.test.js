const { applyDiscount } = require('./discount');

// 2a — BLACK BOX: tests based on the specification.
test('no code returns the price unchanged', () => {
  expect(applyDiscount(100, undefined)).toBe(100);
});

test('unknown code returns the price unchanged', () => {
  expect(applyDiscount(100, 'UNKNOWN')).toBe(100);
});

test('STUDENT10 applies a 10 percent discount', () => {
  expect(applyDiscount(100, 'STUDENT10')).toBe(90);
});

test('WELCOME subtracts 5 EUR when price is at least 20 EUR', () => {
  expect(applyDiscount(20, 'WELCOME')).toBe(15);
});

test('WELCOME does not apply when price is below 20 EUR', () => {
  expect(applyDiscount(19.99, 'WELCOME')).toBe(19.99);
});

test('rounds the final result to cents', () => {
  expect(applyDiscount(10.05, 'STUDENT10')).toBe(9.05);
});

// 2b — WHITE BOX: cover branches visible in the implementation.
test('VIP customer receives the VIP reduction when no discount code is used', () => {
  expect(applyDiscount(100, undefined, { isVip: true })).toBe(80);
});

test('VIP customer receives both the code discount and VIP reduction', () => {
  expect(applyDiscount(100, 'STUDENT10', { isVip: true })).toBe(72);
});

test('non-VIP customer does not receive the VIP reduction', () => {
  expect(applyDiscount(100, 'STUDENT10', { isVip: false })).toBe(90);
});

// 2c — GREY BOX: regression test for an unexpected special code.
test('FREE is not a documented discount code and leaves the price unchanged', () => {
  expect(applyDiscount(100, 'FREE')).toBe(100);
});
