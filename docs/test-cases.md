# Test Cases – inventory.js

## Funktsionaalsed testid

### REQ-01 – Olemasoleva SKU koguse suurendamine

Kontrollime, et olemasoleva SKU juurde lisatud kogus suurendab lao kogust.

**Andmed:**
- stock: `{ "A-1": 5 }`
- delivery: `{ sku: "A-1", qty: 3 }`

**Oodatav tulemus:**
`{ "A-1": 8 }`

### REQ-02 – Algse stock objekti muutmata jätmine

Kontrollime, et `restock` tagastab uue objekti ja algne `stock` jääb muutmata.

**Andmed:**
- stock: `{ "A-1": 5 }`
- delivery: `{ sku: "A-1", qty: 3 }`

**Oodatav tulemus:**
- tulemus on `{ "A-1": 8 }`
- algne stock jääb `{ "A-1": 5 }`
- tagastatud objekt ei ole sama objekt mis algne stock.

### REQ-02 – Uue SKU lisamine

Kontrollime, et laos puuduv SKU lisatakse stock objekti.

**Andmed:**
- stock: `{ "A-1": 5 }`
- delivery: `{ sku: "B-1", qty: 4 }`

**Oodatav tulemus:**
`{ "A-1": 5, "B-1": 4 }`

### REQ-03 – Vigane kogus

Kontrollime, et `restock` ei luba vigast kogust.

Kontrollime järgmisi väärtusi:
- `qty = 0`
- `qty = -1`
- `qty = 1.5`

**Oodatav tulemus:**
Kõigil juhtudel visatakse viga.

### REQ-04 – Kauba väljavõtmine laost

Kontrollime, et `pick` vähendab SKU kogust vastavalt soovitud kogusele.

**Andmed:**
- stock: `{ "A-1": 10 }`
- sku: `"A-1"`
- qty: `3`

**Oodatav tulemus:**
`{ "A-1": 7 }`

### REQ-04 – Tundmatu SKU

Kontrollime, et tundmatu SKU puhul visatakse viga.

**Andmed:**
- stock: `{ "A-1": 10 }`
- sku: `"B-1"`
- qty: `3`

**Oodatav tulemus:**
Funktsioon viskab vea.

### REQ-04 – Laos ei ole piisavalt kaupa

Kontrollime, et laost ei saa võtta rohkem kaupa kui seal olemas on.

**Andmed:**
- stock: `{ "A-1": 10 }`
- sku: `"A-1"`
- qty: `11`

**Oodatav tulemus:**
Funktsioon viskab vea.

### REQ-05 – Korduvate SKU-de leidmine

Kontrollime, et `findDuplicateSkus` leiab korduvad SKU-d ja lisab iga SKU tulemusse ainult ühe korra.

**Andmed:**
```js
[
  { sku: "A-1" },
  { sku: "B-1" },
  { sku: "A-1" },
  { sku: "A-1" },
  { sku: "B-1" }
]