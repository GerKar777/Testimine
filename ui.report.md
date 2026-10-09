UI test report - MiniShop

Team: <Jegor Nefedov>, <Nikita Jakovlev> · Repo: https://github.com <ui-testid-Jegor-Nefedov---Nikita-Jakovlev-> · Branch: ui-tests

1. Summary

Scenarios: 10 · Automated: 10 · Before fixes: 7 passed / 3 failed · After fixes: 10 passed

2. Scenarios and results

| ID | REQ | Result before fix | Defect |
| :--- | :--- | :--- | :--- |
| UI-01 | REQ-UI-01 | PASS | - |
| UI-02 | REQ-UI-02 | PASS | - |
| UI-03 | REQ-UI-02 | FAIL | D-01 |
| UI-04 | REQ-UI-03 | PASS | - |
| UI-05 | REQ-UI-04 | PASS | - |
| UI-06 | REQ-UI-04 | FAIL | D-02 |
| UI-07 | REQ-UI-05 | PASS | - |
| UI-08 | REQ-UI-06 | PASS | - |
| UI-09 | REQ-UI-06 | FAIL | D-03 |
| UI-10 | REQ-UI-07 | PASS | - |

3. Defects

| ID | Where (shop.js) | Expected | Actual | Fixed in commit |
| :--- | :--- | :--- | :--- | :--- |
| D-01 | renderProducts | 'mouse' finds Wireless Mouse | 0 products | Case-insensitive search added |
| D-02 | renderCart | Total sums price multiplied by qty | Total showed price of 1 item | Quantity multiplier added |
| D-03 | validate | Email 'mari@' fails validation | Form submitted with bad email | Full email regex validation added |

4. Locator choices

We used getByRole for buttons and links because it represents what the user sees. For inputs, we used getByLabel to target form fields precisely by their labels. For totals and counts, we relied on data-testids as a stable developer contract. No complex CSS paths were needed.

5. What we would test next

1. Search with zero results (checking if '0 products' or an error message appears).
2. Form fields validation with spaces only or names consisting of just 1 character.
3. Attempting to open the Checkout cart view when it is completely empty.
