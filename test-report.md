# Test Completion Report – inventory API

## 1. Summary

Test cases designed: 10  
Automated: 10  
Passed: 7  
Failed: 3  

Requirements covered: 8/8

## 2. Traceability

| REQ | Test cases | Result |
|---|---|---|
| REQ-API-01 | TC-01 | PASS |
| REQ-API-02 | TC-02, TC-03 | TC-03 FAIL → D-01 |
| REQ-API-03 | TC-04, TC-05, TC-06 | TC-06 FAIL → D-02 |
| REQ-API-04 | TC-07 | PASS |
| REQ-API-05 | TC-08 | PASS |
| REQ-API-06 | TC-09, TC-10 | TC-09 FAIL → D-03 |
| REQ-API-07 | TC-09 | FAIL → D-03 |
| REQ-API-08 | not directly tested | NOT TESTED |

## 3. Defects

| ID | Severity | Found by | Status |
|---|---|---|---|
| D-01 | High | TC-03 | open |
| D-02 | High | TC-06 | open |
| D-03 | Medium | TC-09 | open |

## 4. Not tested / residual risk

- PUT with invalid body
- SKU exactly 20 and 21 characters
- POST with non-integer qty such as 2.5
- Content-Type header

## 5. Recommendation

Do not release: 3 open defects remain. Re-test after fixes.
