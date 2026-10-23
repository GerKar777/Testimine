# Traceability Matrix – inventory.js

| Requirement | Type | Test cases | Test names in code | Status |
|---|---|---|---|---|
| REQ-01 | functional | TC-01 | REQ-01 restock adds quantity to existing sku | PASS |
| REQ-02 | functional | TC-02, TC-03 | REQ-02 restock returns a new object, original unchanged; REQ-02 restock adds unknown sku | PASS |
| REQ-03 | functional | TC-04 | REQ-03 restock rejects invalid quantity | PASS |
| REQ-04 | functional | TC-05, TC-06 | REQ-04 pick reduces quantity; REQ-04 pick rejects unknown sku; REQ-04 pick rejects insufficient stock | PASS |
| REQ-05 | functional | TC-07 | REQ-05 findDuplicateSkus returns each duplicate once | PASS |
| REQ-06 | performance | TC-08 | REQ-06 findDuplicateSkus handles 20000 items in under 100 ms | PASS |
| REQ-07 | security | TC-09, TC-10, TC-11 | REQ-07 rejects invalid SKU characters; REQ-07 rejects SKU with invalid length; REQ-07 accepts valid SKU | PASS |
| REQ-08 | reliability | TC-12, TC-13 | REQ-08 failed pick does not modify original stock; REQ-08 failed restock does not modify original stock | PASS |

## Uncovered requirements

None. All requirements REQ-01 to REQ-08 are covered by at least one test case.