import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
  await this.page.goto('/');
  await this.page.getByText('Signup / Login').click();

  }

  async verifyHomePageVisible() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async clickSignupLogin() {
    await this.page.click('a[href="/login"]');
  }
}