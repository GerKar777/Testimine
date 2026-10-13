# Lõpparuanne: UI testid v2 – MiniShop

## 1. Sissejuhatus ja eesmärk
Selle laboratoorse töö eesmärk oli viia ellu MiniShop rakenduse v2 versioonile üleminek, täiendada automatiseeritud UI-teste (töölaua- ja mobiilivaade projektidele), seadistada CI/CD protsess GitHub Actions abil ning analüüsida rakendusse sisse ehitatud vigu (defekte).

## 2. Testide statistika ja keskkond
* **Testimisraamistik:** Playwright (TypeScript)
* **Käivitatavad projektid:** `ui` (Desktop Chrome) ja `mobile` (Pixel 7)
* **Testide koguarv:** 44 testi (22 testi projekti kohta)
* **CI/CD:** Seadistatud GitHub Actions töövool failis `.github/workflows/ui-tests.yml`

## 3. Tuvastatud vead (Defektid v2 versioonis)
Testide käivitamisel tuvastati rakenduse koodis (`shop.js`) kolm teadlikult sisse viidud defekti:
1. **D-04 (Hinna sorteerimine):** `price-asc` ja `price-desc` kasutasid vigast stringide võrdlemist (`localeCompare`) numbrilise asemel.
2. **D-05 (Sooduskoodi arvutamine):** Sooduskood `SAVE10` rakendus ekslikult ainult ostukorvi esimesele reale, mitte kogu summale (`subtotal`).
3. **D-06 (Koguse piirang):** Ostukorvis sai koguse sisestusväljale sisestada väärtuseks 0 või negatiivseid numbreid.

## 4. Flaky testide lahendamine
Projektis esinenud ebastabiilne test (`flaky.ui.spec.ts`) parandati, asendades fikseeritud ooteajad (timeouts) usaldusväärsete *web-first assertions* (`await expect(...).toContainText(...)`) mehhanismidega.

## 5. Kokkuvõte
Kõik nõutud UI- ja mobiilitestid on edukalt loodud ja integreeritud. CI/CD torujuhe toimib korrektselt ning automaattestid tuvastavad edukalt rakenduse loogikavead.