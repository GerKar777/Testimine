const { calculateTotal, sendReceipt } = require('./cart');

describe('calculateTotal', () => {
  test('returns 0 for an empty cart', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('adds price multiplied by quantity for every item', () => {
    const items = [
      { price: 10, qty: 2 },
      { price: 4.5, qty: 3 },
    ];
    expect(calculateTotal(items)).toBe(33.5);
  });

  test('adds the 5 EUR shipping fee when subtotal is below 100 EUR', () => {
    expect(calculateTotal([{ price: 20, qty: 2 }])).toBe(45);
  });

  test('does not add shipping when subtotal is exactly 100 EUR', () => {
    expect(calculateTotal([{ price: 50, qty: 2 }])).toBe(100);
  });

  test('does not add shipping when subtotal is above 100 EUR', () => {
    expect(calculateTotal([{ price: 60, qty: 2 }])).toBe(120);
  });

  test('applies the STUDENT10 discount code as a 10% discount', () => {
    expect(calculateTotal([{ price: 50, qty: 2 }], 'STUDENT10')).toBe(90);
  });

  test('throws TypeError when items is not an array', () => {
    expect(() => calculateTotal(null)).toThrow(TypeError);
  });
});

describe('sendReceipt', () => {
  test('sends a receipt to the order email with the order id and total', () => {
    const emailService = { send: jest.fn() };
    const order = { id: 42, email: 'mari@example.com', total: 37.5 };

    const result = sendReceipt(emailService, order);

    expect(emailService.send).toHaveBeenCalledTimes(1);
    expect(emailService.send).toHaveBeenCalledWith(
      'mari@example.com',
      'Order 42: total 37.5 EUR'
    );
    expect(result).toBe(true);
  });
});
