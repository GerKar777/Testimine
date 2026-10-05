# Test Plan – inventory.js

## 1. Test item

`loeng-1.5-1.6/inventory.js`

## 2. Scope

In scope:
- REQ-01 – restock adds quantity to an existing SKU
- REQ-02 – restock returns a new object and original stock is unchanged
- REQ-03 – restock rejects invalid quantity
- REQ-04 – pick reduces stock and rejects invalid pick operations
- REQ-05 – findDuplicateSkus returns each duplicate SKU once
- REQ-06 – findDuplicateSkus handles 20 000 items in under 100 ms
- REQ-07 – SKU must be 1–20 characters and contain only letters, digits and dash
- REQ-08 – failed operations do not modify the original stock

Out of scope:
- User interface testing, databases and external systems, because inventory.js is a standalone module and is tested with unit tests.

## 3. Risks

| Risk | Probability (L/M/H) | Impact (L/M/H) | Mitigation (which tests) |
|---|---|---|---|
| findDuplicateSkus is O(n²) – large input can make the test too slow | H | H | REQ-06 performance test |
| pick may modify the original stock object | M | H | REQ-02 and REQ-08 reliability tests |
| Invalid SKU may be accepted | M | H | REQ-07 security tests |
| Invalid quantity may be accepted | M | M | REQ-03 functional tests |

## 4. Approach

Test types: functional, performance, security, reliability, regression.

Level: unit. Method: black-box from requirements, white-box for coverage.

Tool: Jest in GitHub Codespaces.

## 5. Exit criteria

- all 8 REQ covered by at least one test
- 100 % tests pass
- branch coverage >= 90 %
- REQ-06 under 100 ms
- 0 open review comments of severity High

## 6. Environment

- GitHub Codespaces
- Node.js
- Jest

## 7. Roles

`<name>`: tests.  
`<name>`: documents.  
Reviewer: team `<X>`.