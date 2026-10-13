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

### 4.1 Flaky test before the fix

**Сюда вставить скриншот: 1 правильный и 5 неправильных запусков.**

![Flaky test before fix](screenshots/flaky-before.png)

### 4.2 Flaky test after the fix

**Сюда вставить скриншот: 6 правильных запусков из 6.**

![Flaky test after fix](screenshots/flaky-after.png)

### 4.3 UI and mobile tests

**Сюда вставить скриншот: 22 правильных теста из 22.**

![UI and mobile tests](screenshots/ui-mobile.png)

### 4.4 Jest tests

**Сюда вставить скриншот: 9 правильных тестов из 9.**

![Jest tests](screenshots/jest.png)

### 4.5 Playwright HTML report

**Сюда вставить скриншот HTML-отчёта Playwright.**

![Playwright HTML report](screenshots/playwright-report.png)

