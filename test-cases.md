# Test Case Specification – MiniShop

## A. Business logic (shop-logic.js) – executed as Jest unit tests

| TC | REQ | Prio | Input | Expected | Automated as |
|---|---|---|---|---|---|
| TC-L-01 | REQ-L-01 | High | products, query: '' | Array of all 4 products | UT-01 |
| TC-L-02 | REQ-L-01 | High | products, query: 'mouse' | Array containing 1 item ('Wireless Mouse') | UT-02 |
| TC-L-03 | REQ-L-01 | High | products, query: 'tablet' | Empty array [] | UT-03 |
| TC-L-04 | REQ-L-02 | High | products, mode: 'name' | Sorted array A→Z by name | UT-05 |
| TC-L-05 | REQ-L-02 | High | products, mode: 'price-asc' | First element price = 24.50 | UT-06 |
| TC-L-06 | REQ-L-02 | High | products, mode: 'price-desc' | First element price = 249.00 | UT-07 |
| TC-L-07 | REQ-L-03 | High | price: 39, qty: 2 | 78.00 | UT-09 |
| TC-L-08 | REQ-L-04 | High | rows: [39, 24.5], rate: 0 | { subtotal: 63.50, discount: 0, total: 63.50 } | UT-12 |
| TC-L-09 | REQ-L-04 | High | rows: [39, 24.5], rate: 0.10 | { subtotal: 63.50, discount: 6.35, total: 57.15 } | UT-13 |
| TC-L-10 | REQ-L-05 | High | input: 0 | 1 | UT-17 |
| TC-L-11 | REQ-L-06 | Medium | code: 'SAVE10' | 0.10 | UT-18 |
| TC-L-12 | REQ-L-07 | High | name: 'Ma', email: 'a@b.ee', address: 'Street 1' | Empty object {} (no errors) | UT-21 |
| TC-L-13 | REQ-L-07 | High | email: 'mari@example' | Error object containing email key | UT-24 |

## B. Inventory API (server.js) – executed as Playwright API tests

Precondition for all: server running, POST /reset done (2 items: id 1 'A-1' qty 5, id 2 'B-2' qty 0).

| TC | REQ | Prio | Request (method, path, body) | Expected status | Expected body | Type |
|---|---|---|---|---|---|---|
| TC-01 | REQ-API-01 | High | GET /items | 200 | Array of 2 items | Positive |
| TC-02 | REQ-API-02 | High | GET /items/1 | 200 | Item object `{ id: 1, sku: 'A-1', qty: 5 }` | Positive |
| TC-03 | REQ-API-02 | High | GET /items/999 | 404 | `{ error: 'not found' }` | Negative |
| TC-04 | REQ-API-03 | High | POST /items `{ sku: 'C-3', qty: 10 }` | 201 | Created item `{ id: 3, sku: 'C-3', qty: 10 }` | Positive |
| TC-05 | REQ-API-03 | High | POST /items `{ sku: 'C-3', qty: 0 }` | 201 | Created item `{ id: 3, sku: 'C-3', qty: 0 }` | Boundary |
| TC-06 | REQ-API-03 | High | POST /items `{ sku: 'C-3', qty: -1 }` | 400 | `{ error: 'invalid qty' }` | Boundary / Negative |
| TC-07 | REQ-API-04 | Medium | POST /items `{ sku: 'bad sku!', qty: 5 }` | 400 | `{ error: 'invalid sku' }` | Negative |
| TC-08 | REQ-API-05 | High | PUT /items/1 `{ sku: 'A-1-UPD', qty: 20 }` | 200 | Updated item `{ id: 1, sku: 'A-1-UPD', qty: 20 }` | Positive |
| TC-09 | REQ-API-06, REQ-API-07 | High | DELETE /items/1 | 204 | Empty body, then GET /items/1 returns 404 | Positive |
| TC-10 | REQ-API-06 | High | DELETE /items/999 | 404 | `{ error: 'not found' }` | Negative |