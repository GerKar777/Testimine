# Testing practice project

Practice repository for the course *Tarkvarasüsteemide testimine* (Software Systems Testing).
Unit tests with **Jest**, end-to-end tests with **Playwright**.

## Getting started (GitHub Codespaces)

1. Click **Use this template → Create a new repository** (your own copy).
2. In your repository click **Code → Codespaces → Create codespace on main**.
3. Wait until the terminal shows that `npm install` and the browser download have finished (1–2 min).
4. Run `npm test` — you should see green tests.

Do **not** run `npm install -g npm@...` even if npm suggests it — it breaks the Codespace.

## Commands

| Command | What it does |
|---|---|
| `npm test` | run all Jest unit tests |
| `npm run test:watch` | re-run Jest on every file save |
| `npm run coverage` | Jest with a code coverage report |
| `npm run e2e` | run Playwright tests (headless Chromium) |
| `npm run e2e:ui` | Playwright UI mode — opens in a new browser tab |
| `npm run report` | open the last Playwright HTML report (with traces) |

## Files

- `demo.test.js`, `mock.test.js` — lecture demos, safe to delete
- `cart.js` — code under test for the unit-test practice (contains one intentional bug)
- `cart.test.js` — your Jest tests go here
- `tests/todo.spec.ts` — your Playwright tests go here
- `playwright.config.ts` — Playwright settings (Chromium only, trace always on)

## If something breaks

- `Cannot find module ...` inside `node_modules` → `rm -rf node_modules package-lock.json && npm install`
- npm itself throws errors → delete the Codespace and create a new one
- Playwright: `Executable doesn't exist` → `npx playwright install chromium`

## Running locally instead of Codespaces

Requires Node.js 20+. Then: `npm install && npx playwright install chromium`.
