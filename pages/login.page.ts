import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}
  
  async navigateToLogin() {
    await this.page.goto('/login');
  }
  async verifyLoginPageVisible() {
    await expect(this.page.locator('h2')).toContainText('Login to your account');
  }
}