# Test Case Specification – inventory API

Precondition for all tests: server running, `POST /reset` executed before each test.

| ID | REQ ID | Priority | Method & Path | Request Body | Expected Status | Expected Response Body | Type |
|---|---|---|---|---|---|---|---|
| TC-01 | REQ-API-01 | High | GET /items | None | 200 OK | Array of 2 items | Positive |
| TC-02 | REQ-API-02 | High | GET /items/1 | None | 200 OK | `{ id: 1, sku: 'A-1', qty: 5 }` | Positive |
| TC-03 | REQ-API-02 | High | GET /items/999 | None | 404 Not Found | `{ error: 'not found' }` | Negative |
| TC-04 | REQ-API-03 | High | POST /items | `{ sku: 'C-3', qty: 7 }` | 201 Created | `{ id: 3, sku: 'C-3', qty: 7 }` | Positive |
| TC-05 | REQ-API-03 | Medium | POST /items | `{ sku: 'C-3', qty: 0 }` | 201 Created | `{ id: 3, sku: 'C-3', qty: 0 }` | Boundary |
| TC-06 | REQ-API-03 | High | POST /items | `{ sku: 'C-3', qty: -1 }` | 400 Bad Request | `{ error: 'invalid qty' }` | Boundary / Neg |
| TC-07 | REQ-API-04 | Medium | POST /items | `{ sku: 'bad sku!', qty: 1 }` | 400 Bad Request | `{ error: 'invalid sku' }` | Negative |
| TC-08 | REQ-API-05 | High | PUT /items/1 | `{ sku: 'A-1', qty: 10 }` | 200 OK | `{ id: 1, sku: 'A-1', qty: 10 }` | Positive |
| TC-09 | REQ-API-06 | High | DELETE /items/1 | None | 204 No Content | Empty body | Positive |
| TC-10 | REQ-API-06 | Medium | DELETE /items/999 | None | 404 Not Found | `{ error: 'not found' }` | Negative |