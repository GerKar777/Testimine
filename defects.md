# Defektiraportid – inventory API

## D-01 · GET /items/:id tagastab 200 null tundmatu id korral
- Nõue: REQ-API-02
- Leidis: TC-03
- Kriitilisus: High
- Asukoht: server.js, marsruut GET /items/:id
- Sammud: `curl -s -i localhost:3000/items/999`
- Oodatud: 404, keha `{"error": "not found"}`
- Tegelik: 200, keha `null`
- Olek: avatud

## D-02 · POST /items võtab vastu qty -1
- Nõue: REQ-API-03
- Leidis: TC-06
- Kriitilisus: High
- Asukoht: server.js, funktsioon `validate`
- Sammud: `curl -s -i -X POST localhost:3000/items -H 'Content-Type: application/json' -d '{"sku":"C-3","qty":-1}'`
- Oodatud: 400, keha `{"error": "invalid qty"}`
- Tegelik: 201, loodi element qty-ga `-1`
- Olek: avatud

## D-03 · DELETE /items/:id tagastab 200 JSON-iga 204 asemel
- Nõue: REQ-API-06
- Leidis: TC-09
- Kriitilisus: Medium
- Asukoht: server.js, marsruut DELETE /items/:id
- Sammud: `curl -s -i -X DELETE localhost:3000/items/1`
- Oodatud: 204 No Content, tühi keha
- Tegelik: 200 OK, keha `{"deleted": true}`
- Olek: avatud