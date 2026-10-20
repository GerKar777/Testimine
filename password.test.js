const { isValidPassword } = require('./password');

test('returns true for exactly 8 characters', () => {
  expect(isValidPassword('abcdefgh')).toBe(true);
});

test('returns true for a password longer than 8 characters', () => {
  expect(isValidPassword('abcdefgh9')).toBe(true);
});

test('returns false for a password shorter than 8 characters', () => {
  expect(isValidPassword('abc123')).toBe(false);
});

test('returns false for an empty password', () => {
  expect(isValidPassword('')).toBe(false);
});

test('returns false when the password contains only spaces', () => {
  expect(isValidPassword('        ')).toBe(false);
});

test('returns false for a non-string value', () => {
  expect(isValidPassword(12345678)).toBe(false);
});
