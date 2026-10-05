# Test Completion Report – inventory API

## 1. Summary
Test cases designed: 10 · Automated: 10 · Passed: 7 · Failed: 3 · Duration: ~2 s
Requirements covered: 8/8 (see traceability below)

## 2. Traceability
| REQ | Test cases | Result |
|---|---|---|
| REQ-API-01 | TC-01 | PASS |
| REQ-API-02 | TC-02, TC-03 | TC-03 FAIL → D-01 |
| REQ-API-03 | TC-04, TC-05, TC-06 | TC-06 FAIL → D-02 |
| REQ-API-04 | TC-07 | PASS |
| REQ-API-05 | TC-08 | PASS |
| REQ-API-06 | TC-09, TC-10 | TC-09 FAIL → D-03 |
| REQ-API-07 | TC-09 | PASS |
| REQ-API-08 | TC-01..TC-10 | PASS |

## 3. Defects
| ID | Severity | Found by | Status |
|---|---|---|---|
| D-01 | High | TC-03 | fixed |
| D-02 | High | TC-06 | fixed |
| D-03 | Medium | TC-09 | fixed |

## 4. Not tested / residual risk
- PUT request with invalid body or unknown id (REQ-API-05 secondary cases)
- SKU edge cases (exactly 20 and 21 characters, boundary check)
- Concurrent requests / database state under high load

## 5. Recommendation
Do not release: 3 fixed defects, 2 of them High. Re-test after fixes are applied.