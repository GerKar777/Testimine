# MiniShop v2 – UI Test Scenarios


## New UI Test Scenarios

| ID | Requirement | Scenario | Expected result |
|---|---|---|---|
| UI-11 | REQ-UI-08 | Sort products by price: low to high | Wireless Mouse (24.50 €) appears first |
| UI-12 | REQ-UI-08 | Sort products by price: high to low | Monitor 27" (249.00 €) appears first |
| UI-13 | REQ-UI-09 | Change USB-C Hub quantity to 3 | Quantity is 3; line total and cart total are 117.00 € |
| UI-14 | REQ-UI-09 | Set USB-C Hub quantity to 0 | Quantity is corrected to 1; total remains 39.00 € |
| UI-15 | REQ-UI-10 | Apply SAVE10 to one USB-C Hub | Discount is −3.90 €; total is 35.10 € |
| UI-16 | REQ-UI-10 | Add USB-C Hub and Wireless Mouse, then apply SAVE10 | Subtotal is 63.50 €; discount is −6.35 €; total is 57.15 € |
| UI-17 | REQ-UI-11 | Apply an invalid discount code | "Invalid code" is displayed; total remains 39.00 € |
| UI-18 | REQ-UI-06 | Submit checkout with four invalid email addresses | Each invalid email is rejected with a validation error |

## Data-driven inputs for UI-18

| Email | Reason | Expected result |
|---|---|---|
| plainaddress | Missing @ | Validation error |
| mari@ | Missing domain | Validation error |
| @example.com | Missing username | Validation error |
| mari@example | Missing domain extension | Validation error |

## Defects Found Before Fixes

| Defect | Test | Description | Status |
|---|---|---|---|
| D-04 | UI-12 | Prices are sorted as text instead of numbers | Found |
| D-05 | UI-16 | SAVE10 is calculated from the first basket row instead of the subtotal | Found |
| D-06 | UI-14 | Quantity 0 is accepted | Found |

Initial results: 8 passed, 3 failed.

The failing tests reveal application defects that will be corrected in the next stage.