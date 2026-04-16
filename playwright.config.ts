import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],

  workers: 2,

  use: {
    baseURL: 'https://automationexercise.com',
    headless: false,
  },
});