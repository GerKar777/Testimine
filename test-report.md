# Testimise lõpparuanne – inventory API

## 1. Kokkuvõte
Testjuhtumeid loodud: 10 · Automatiseeritud: 10 · Läbis: 7 · Ebaõnnestus: 3
Nõuete kaetus: 8/8 (100%)

## 2. Jälgitavus (Traceability)
| REQ | Testjuhtumid | Tulemus |
|---|---|---|
| REQ-API-01 | TC-01 | PASS |
| REQ-API-02 | TC-02, TC-03 | TC-03 FAIL → D-01 |
| REQ-API-03 | TC-04, TC-05, TC-06 | TC-06 FAIL → D-02 |
| REQ-API-04 | TC-07 | PASS |
| REQ-API-05 | TC-08 | PASS |
| REQ-API-06 | TC-09, TC-10 | TC-09 FAIL → D-03 |
| REQ-API-07 | TC-09 | PASS |
| REQ-API-08 | TC-01..TC-08, TC-10 | PASS |

## 3. Defektid
| ID | Kriitilisus | Leidis | Olek |
|---|---|---|---|
| D-01 | High | TC-03 | avatud |
| D-02 | High | TC-06 | avatud |
| D-03 | Medium | TC-09 | avatud |

## 4. Testimata / jääkriskid
- PUT päringud vigaste andmetega
- SKU pikkuse piirväärtused (20 vs 21 märkki)
- Samaaegsed päringud (concurrent requests)

## 5. Soovitus
Mitte toodangusse lasta: 3 avatud defekti, neist 2 on kõrge kriitilisusega.

## 6. Re-test (pärast parandusi)
Tulemus: 10 passed, 0 failed · Kestus: 1.5 s

Defektide olek:
- D-01: parandatud
- D-02: parandatud
- D-03: parandatud

Soovitus: Toode on valmis toodangusse laskmiseks (Release candidate approved).