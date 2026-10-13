# UI-testide aruanne – MiniShop
Võistkond: Vseslav Golenduhhin, Saveli Fjodorov
Repositoorium: https://github.com/vasharoppa/ui-testid-Vseslav-Golenduhhin-Saveli-Fjodorov-
Haru (branch): ui-tests

## 1. Kokkuvõte
Testistsenaariumeid kokku: 10
Automiseeritud teste: 10
Tulemus enne parandusi: 7 läbitud / 3 ebaõnnestunud
Tulemus pärast parandusi: 10 läbitud (10 passed)

## 2. Testistsenaariumid ja tulemused
| ID | Nõue | Tulemus enne parandust | Defekt |
|---|---|---|---|
| UI-01 | REQ-UI-01 | PASS | – |
| UI-02 | REQ-UI-02 | PASS | – |
| UI-03 | REQ-UI-02 | FAIL | D-01 |
| UI-04 | REQ-UI-03 | PASS | – |
| UI-05 | REQ-UI-04 | PASS | – |
| UI-06 | REQ-UI-04 | FAIL | D-02 |
| UI-07 | REQ-UI-05 | PASS | – |
| UI-08 | REQ-UI-06 | PASS | – |
| UI-09 | REQ-UI-06 | FAIL | D-03 |
| UI-10 | REQ-UI-07 | PASS | – |

## 3. Leitud ja parandatud defektid
| ID | Koht (shop.js) | Oodatud tulemus | Tegelik tulemus | Paranduse märkus |
|---|---|---|---|---|
| D-01 | renderProducts | Otsing "mouse" leiab toote Wireless Mouse (tõstutundetu) | Otsing ei leidnud ühtegi toodet | Lisati .toLowerCase() kontroll |
| D-02 | renderCart | Ostukorvi kogusumma korrutatakse kogusega (78.00 €) | Summa oli 39.00 € (kogusega korrutamata) | Lisati hint x kogus (price * qty) |
| D-03 | validate | Vigane e-post "mari@" tagasi lükatud | E-post võeti vastu | Lisati e-posti regulaaravaldis (regex) |

## 4. Lokaatorite valik
Elistasime kasutajakeskseid lokaatoreid:
- `getByRole` nuppude ja navigeerimislingi jaoks;
- `getByLabel` vormi väljade jaoks;
- `getByTestId` dünaamiliste elementide jaoks (`product`, `cart-row`, `qty`, `line-total`, `cart-total`).

Kasutasime CSS-lokaatoreid (`#name-error`, `#email-error`, `#address-error`) ainult veateadete puhul, sest neil puudusid eraldi ARIA-rollid.

## 5. Mida testiksime järgmisena
1. Otsingut sõnaga, mida süsteemis ei ole (tühja tulemuse kontroll).
2. Tühja ostukorviga tellimuse esitamise katset.
3. Vormi sisendväljade tähemärkide piiranguid (max length).