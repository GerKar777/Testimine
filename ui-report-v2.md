# UI Test Report v2 – MiniShop

**Repository:** demjan531-pixel/ui-testid-Demjan_Aleksei  
**Team:** Demjan Kipriyanov, Aleksei Zassimovits


## 1. Maintenance (v1 → v2)

- Existing UI tests: 10
- Result after adapting tests to MiniShop v2: 10 passed
- Updated button locator: Add to cart → Buy
- Updated basket locator: Cart → Basket
- Refactored tests to use `fixtures.ts` and `ShopPage`.
- Tests failed after v2 before maintenance: [record observed number]
- Lines changed in Page Object: [record number]

## 2. New Scenarios and Results

| ID | Requirement | Result before fix | Defect |
|---|---|---|---|
| UI-11 | REQ-UI-08 | PASS | – |
| UI-12 | REQ-UI-08 | FAIL | D-04 |
| UI-13 | REQ-UI-09 | PASS | – |
| UI-14 | REQ-UI-09 | FAIL | D-06 |
| UI-15 | REQ-UI-10 | PASS | – |
| UI-16 | REQ-UI-10 | FAIL | D-05 |
| UI-17 | REQ-UI-11 | PASS | – |
| UI-18 | REQ-UI-06 | PASS (4 datasets) | – |

All new tests passed after fixing the defects.

## 3. Flaky Test

- Test: FLAKY-01
- Cause: fixed timeout and one-time visibility check
- Fix: Playwright web-first assertion `toContainText()`
- Failures before fix: [record number out of 6]
- Failures after fix: 0/6
- Final result: 6 passed (15.7s)

## 4. Defects

| ID | Location | Expected | Actual before fix | Fix |
|---|---|---|---|---|
| D-04 | shop.js, sortProducts | Numeric price sorting | Text-based sorting | Numeric comparison, commit 9c2f8e4 |
| D-05 | shop.js, renderCart | 10% discount on subtotal | Discount calculated only from first row | Use subtotal, commit d3c4b7b |
| D-06 | shop.js, quantity change event | Minimum quantity 1 | Quantity 0 accepted | Enforce minimum quantity 1, commit [add hash] |

## 5. Mobile Testing

- Desktop: 22 passed
- Mobile (Pixel 7): 22 passed
- Total: 44 passed
- Failed: 0
- Result: Same tests passed on desktop and mobile.

## 6. Continuous Integration

- Platform: GitHub Actions
- Workflow: `.github/workflows/ui-tests.yml`
- Branch: ui-v2
- Initial run: failed because the mobile project was missing from the committed configuration
- Run #2: success
- Run #3: success
- HTML report artifact: [verify]

## 7. What We Would Do Next

- Add smoke test tags for the most important UI tests.
- Add visual regression tests using `toHaveScreenshot()`.
- Extend test coverage for additional edge cases.
