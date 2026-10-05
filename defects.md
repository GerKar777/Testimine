# Defect Reports – inventory API

## D-01 · GET /items/:id returns 200 null for unknown id
- Requirement: REQ-API-02
- Found by: TC-03
- Severity: High (client cannot distinguish not found from empty result)
- Where: server.js, GET /items/:id
- Steps: `curl -s -i localhost:3000/items/999`
- Expected: 404, body `{ "error": "not found" }`
- Actual: 200, body `null`
- Status: open

## D-02 · POST /items accepts negative qty
- Requirement: REQ-API-03
- Found by: TC-06
- Severity: High (invalid negative stock quantity is accepted)
- Where: server.js, validate function
- Steps: `curl -s -i -X POST localhost:3000/items -H 'Content-Type: application/json' -d '{"sku":"C-3","qty":-1}'`
- Expected: 400, body `{ "error": "invalid qty" }`
- Actual: 201, item is created with qty -1
- Status: open

## D-03 · DELETE /items/:id returns 200 with a body
- Requirement: REQ-API-06
- Found by: TC-09
- Severity: Medium (API contract requires 204 and empty body)
- Where: server.js, DELETE /items/:id
- Steps: `curl -s -i -X DELETE localhost:3000/items/1`
- Expected: 204, empty body
- Actual: 200, body `{ "deleted": true }`
- Status: open
