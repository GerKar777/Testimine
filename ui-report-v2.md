# UI Testing Report

## 1. UI Tests

The tests check product search, the shopping cart, quantity, checkout validation and order confirmation.

## 2. Mobile Testing

The mobile tests use the Pixel 7 device settings in Playwright.

## 3. Flaky Test

Before the fix, the test was run six times:
- 1 passed
- 5 failed

The cause was a fixed 700 ms wait and a visibility check that ran only once. The confirmation message sometimes appeared too late.

The test was fixed by using a web-first assertion:
`await expect(shop.confirmation()).toContainText('Order #');`

After the fix, the test was run six times again. Result: fill in the actual result after testing.

## 4. Screenshots

1. [ВСТАВИТЬ СКРИНШОТ: 6 запусков до исправления — 1 правильный и 5 неправильных.]
2. [ВСТАВИТЬ СКРИНШОТ: 6 запусков после исправления — 6 правильных.]
3. [ВСТАВИТЬ СКРИНШОТ: результаты тестов на компьютере и телефоне.]
4. [ВСТАВИТЬ СКРИНШОТ: HTML test report.]

