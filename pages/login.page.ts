import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}
  
  async navigateToLogin() {
    await this.page.goto('/login');
  }
  async verifyLoginPageVisible() {
    await expect(this.page.getByText('Login to your account')).toBeVisible();
  }
  async login(email: string, password: string) {
    await this.page.fill('input[data-qa="login-email"]', email);
    await this.page.fill('input[data-qa="login-password"]', password);
    await this.page.click('button[data-qa="login-button"]');
  }
  async verifyLoginSuccess() {
    await expect(this.page.getByText('Logged in as')).toBeVisible();
  }
  async verifyLoginError() {
  await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible();
}
}