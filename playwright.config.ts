import { defineConfig, devices } from '@playwright/test';

tasks-through-4-4
const ci = (globalThis as typeof globalThis & {
  process?: { env?: { CI?: string } };
}).process?.env?.CI;

export default defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.ts/,


// All files live in the repository root (no tests/ folder):
//   *.api.spec.ts  → project "api"      (HTTP tests against server.js, no browser)
//   *.ui.spec.ts   → projects "ui" and "mobile" (browser tests against the local MiniShop)
//   *.spec.ts      → project "chromium" (browser tests against demo.playwright.dev)
//   *.test.js      → Jest (unit tests), ignored by Playwright
export default defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.ts/,
  retries: process.env.CI ? 1 : 0,            // in CI: one retry, so a flaky test shows up as "flaky", not "failed"
 main
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
 tasks-through-4-4

  // Retry failed tests once in GitHub Actions
  retries: ci ? 1 : 0,

  use: {
    trace: ci ? 'on-first-retry' : 'on',
    screenshot: 'only-on-failure',
  },


  use: { trace: process.env.CI ? 'on-first-retry' : 'on', screenshot: 'only-on-failure' },
 main
  projects: [
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: 'http://localhost:3000',
      },
    },

    {
      name: 'ui',
      testMatch: /.*\.ui\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4000',
      },
    },

    {
      name: 'mobile',
      testMatch: /.*\.ui\.spec\.ts/,
      use: {
        ...devices['Pixel 7'],
        baseURL: 'http://localhost:4000',
      },
    },

    {
      name: 'mobile',
      testMatch: /.*\.ui\.spec\.ts/,
      use: { ...devices['Pixel 7'], baseURL: 'http://localhost:4000' },
    },
    {
      name: 'chromium',
      testIgnore: /.*\.(api|ui)\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://demo.playwright.dev',
      },
    },
  ],
 tasks-through-4-4

  webServer: [
    {
      command: 'node server.js',
      url: 'http://localhost:3000/health',
      reuseExistingServer: !ci,
    },
    {
      command: 'node shop-server.js',
      url: 'http://localhost:4000/health',
      reuseExistingServer: !ci,
    },

  webServer: [
    { command: 'node server.js', url: 'http://localhost:3000/health', reuseExistingServer: !process.env.CI },
    { command: 'node shop-server.js', url: 'http://localhost:4000/health', reuseExistingServer: !process.env.CI },
 main
  ],
});