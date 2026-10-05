# Defect Reports – inventory API
 
## D-01 · GET /items/:id returns 200 null for unknown id
- Requirement: REQ-API-02
- Found by: TC-03
- Severity: High (client cannot tell 'not found' from 'empty' – UI shows blank row)
- Where: server.js, route GET /items/:id (line …)
- Steps: curl -s -i localhost:3000/items/999
- Expected: 404, body { "error": "not found" }
- Actual: 200, body null
- Status: open

## D-02 · POST /items accepts negative qty -1 instead of rejecting it
- Requirement: REQ-API-03
- Found by: TC-06
- Severity: High (invalid business data can be persisted)
- Where: server.js, validate() function used by POST /items
- Steps: POST /items with body { "sku": "C-3", "qty": -1 }
- Expected: 400, body { "error": "invalid qty" }
- Actual: 201, item created successfully with qty = -1
- Status: open

## D-03 · DELETE /items/:id returns 200 + body instead of 204 No Content
- Requirement: REQ-API-06
- Found by: TC-09
- Severity: High (client cannot rely on proper delete semantics)
- Where: server.js, route DELETE /items/:id
- Steps: DELETE /items/1
- Expected: 204 No Content, empty body
- Actual: 200 OK, body { "deleted": true }
- Status: open