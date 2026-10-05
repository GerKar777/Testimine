# Test Case Specification – inventory.js

| ID | Requirement | Type | Priority | Precondition | Input | Expected result | Test name in code |
|---|---|---|---|---|---|---|---|
| TC-01 | REQ-01 | functional | High | stock = { 'A-1': 5 } | restock with [{ sku: 'A-1', qty: 3 }] | { 'A-1': 8 } | REQ-01 restock adds quantity to existing sku |
| TC-02 | REQ-02 | functional | High | stock = { 'A-1': 5 } | restock with [{ sku: 'A-1', qty: 3 }] | New object is returned and original stock stays unchanged | REQ-02 restock returns a new object, original unchanged |
| TC-03 | REQ-02 | functional | Medium | stock = { 'A-1': 5 } | restock with new SKU B-1, qty 4 | New SKU B-1 is added to stock | REQ-02 restock adds unknown sku |
| TC-04 | REQ-03 | functional | High | stock = { 'A-1': 5 } | qty = 0, -1 and 1.5 | Error is thrown for invalid quantity | REQ-03 restock rejects invalid quantity |
| TC-05 | REQ-04 | functional | High | stock = { 'A-1': 10 } | pick A-1, qty 3 | Stock becomes { 'A-1': 7 } | REQ-04 pick reduces quantity |
| TC-06 | REQ-04 | functional | High | stock = { 'A-1': 10 } | pick unknown SKU B-1, qty 3 | Error is thrown | REQ-04 pick rejects unknown sku |
| TC-07 | REQ-05 | functional | High | Items contain duplicate SKUs | List with A-1 and B-1 repeated | ['A-1', 'B-1'] | REQ-05 findDuplicateSkus returns each duplicate once |
| TC-08 | REQ-06 | performance | High | 20 000 items | findDuplicateSkus with 20 000 items | Execution time is under 100 ms | REQ-06 findDuplicateSkus handles 20000 items in under 100 ms |
| TC-09 | REQ-07 | security | High | stock = { 'ABC-123': 5 } | Invalid SKU characters and invalid length | Error is thrown for invalid SKU | REQ-07 rejects invalid SKU characters |
| TC-10 | REQ-07 | security | High | stock = { 'ABC-123': 5 } | Empty SKU and SKU longer than 20 characters | Error is thrown | REQ-07 rejects SKU with invalid length |
| TC-11 | REQ-07 | security | Medium | stock = { 'ABC-123': 5 } | Valid SKU ABC-123 | Pick succeeds | REQ-07 accepts valid SKU |
| TC-12 | REQ-08 | reliability | High | stock = { 'A-1': 10 } | Failed pick with qty 20 | Error is thrown and original stock is unchanged | REQ-08 failed pick does not modify original stock |
| TC-13 | REQ-08 | reliability | High | stock = { 'A-1': 10 } | Failed restock with qty 0 | Error is thrown and original stock is unchanged | REQ-08 failed restock does not modify original stock |