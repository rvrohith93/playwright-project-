import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],

  workers: 2,
  retries: 2,

  use: {
    baseURL: 'https://automationexercise.com',
    headless: false,
    navigationTimeout: 60000,
    actionTimeout: 10000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});