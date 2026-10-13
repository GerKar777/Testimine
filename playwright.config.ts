import { defineConfig, devices } from '@playwright/test';

const ci = (globalThis as typeof globalThis & {
  process?: { env?: { CI?: string } };
}).process?.env?.CI;

export default defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.ts/,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  // Retry failed tests once in GitHub Actions
  retries: ci ? 1 : 0,

  use: {
    trace: ci ? 'on-first-retry' : 'on',
    screenshot: 'only-on-failure',
  },

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
      name: 'chromium',
      testIgnore: /.*\.(api|ui)\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://demo.playwright.dev',
      },
    },
  ],

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
  ],
});