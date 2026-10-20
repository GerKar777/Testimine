# Traceability Matrix – MiniShop

| REQ | Description | Test Cases | Automated Tests | Layer | Last Result | Defect |
|---|---|---|---|---|---|---|
| REQ-L-01 | filterProducts case-insensitive | TC-L-01…03 | UT-01…UT-04 | Unit | PASS | - |
| REQ-L-02 | sortProducts sorting | TC-L-04…06 | UT-05…UT-08 | Unit | UT-07 FAIL | D-L-01 |
| REQ-L-03 | lineTotal rounding | TC-L-07 | UT-09, UT-10 | Unit | PASS | - |
| REQ-L-04 | cartTotals whole basket discount | TC-L-08, TC-L-09 | UT-11…UT-15 | Unit | UT-13 FAIL | D-L-02 |
| REQ-L-05 | normalizeQuantity min 1 | TC-L-10 | UT-16, UT-17 | Unit | UT-17 FAIL | D-L-03 |
| REQ-L-06 | discountRateFor code parsing | TC-L-11 | UT-18…UT-20 | Unit | PASS | - |
| REQ-L-07 | validateCheckout form fields | TC-L-12, TC-L-13 | UT-21…UT-25 | Unit | UT-24 FAIL | D-L-04 |
| REQ-API-01 | GET /items list | TC-01 | TC-01 | API | PASS | - |
| REQ-API-02 | GET /items/:id item/404 | TC-02, TC-03 | TC-02, TC-03 | API | TC-03 FAIL | D-A-01 |
| REQ-API-03 | POST /items valid/qty validation | TC-04…06 | TC-04…06 | API | Not run yet | - |
| REQ-API-04 | POST /items SKU validation | TC-07 | TC-07 | API | Not run yet | - |
| REQ-API-05 | PUT /items/:id update | TC-08 | TC-08 | API | Not run yet | - |
| REQ-API-06 | DELETE /items/:id 204/404 | TC-09, TC-10 | TC-09, TC-10 | API | Not run yet | - |
| REQ-API-07 | GET after DELETE returns 404 | TC-09 | TC-09 | API | Not run yet | - |
| REQ-API-08 | Content-Type application/json | TC-01…08 | TC-01…08 | API | Not run yet | - |
| REQ-UI-08 | Product sorting UI | UI-11, UI-12 | UI-11, UI-12 | UI | UI-12 FAIL | D-L-01 (same root cause) |
| REQ-UI-09 | Quantity change UI | UI-13, UI-14 | UI-13, UI-14 | UI | UI-14 FAIL | D-L-03 (same root cause) |
| REQ-UI-10 | Apply discount UI | UI-15, UI-16 | UI-15, UI-16 | UI | UI-16 FAIL | D-L-02 (same root cause) |