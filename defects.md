# Defect Reports – inventory API

## D-01 · GET /items/:id returns 200 null for unknown id
- Requirement: REQ-API-02
- Found by: TC-03
- Severity: High (client cannot tell 'not found' from 'empty' – UI shows blank row)
- Where: server.js, route GET /items/:id
- Steps: curl -s -i localhost:3000/items/999
- Expected: 404, body { "error": "not found" }
- Actual: 200, body null
- Status: fixed

## D-02 · POST /items accepts negative quantity (qty: -1)
- Requirement: REQ-API-03
- Found by: TC-06
- Severity: High (allows invalid inventory quantity -1 in database)
- Where: server.js, function validate
- Steps: curl -s -i -X POST localhost:3000/items -H 'Content-Type: application/json' -d '{"sku":"C-3","qty":-1}'
- Expected: 400, body { "error": "invalid qty" }
- Actual: 201, body { "id": 3, "sku": "C-3", "qty": -1 }
- Status: fixed
## D-03 · DELETE /items/:id returns 200 with body instead of 204 empty body
- Requirement: REQ-API-06
- Found by: TC-09
- Severity: Medium (violates REST spec requirement for 204 No Content)
- Where: server.js, route DELETE /items/:id
- Steps: curl -s -i -X DELETE localhost:3000/items/1
- Expected: 204 No Content, empty body
- Actual: 200 OK, body { "deleted": true }
- Status: fixed