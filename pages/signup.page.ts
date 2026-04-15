import { Page, expect } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) {}

  async verifySignupVisible() {
    await expect(this.page.getByText('New User Signup!')).toBeVisible();
  }
  async enterNameAndEmail(name: string, email: string) {

    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
    await this.page.click('button[data-qa="signup-button"]');
  }
  async verifyAccountInfoVisible() {
    await expect(this.page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
  }

  async fillAccountDetails() {
    await this.page.locator('#id_gender1').check();
    await this.page.fill('#password', 'Test@123');

    await this.page.locator('#days').selectOption('10');
    await this.page.locator('#months').selectOption('8');
    await this.page.locator('#years').selectOption('1992');

    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();  

    await this.page.fill('#first_name', 'Rohith');
    await this.page.fill('#last_name', 'Vankayalapati');
    await this.page.fill('#company', 'ProvinceSoft');
    await this.page.fill('#address1', '855 Ohio ave');
    await this.page.locator('#country').selectOption('United States');
    await this.page.fill('#state', 'OHIO');
    await this.page.fill('#city', 'Youngstown');
    await this.page.fill('#zipcode', '44504');
    await this.page.fill('#mobile_number', '2488325202');
  }

  async createAccount() {
    await this.page.click('button[data-qa="create-account"]');
  }

  async verifyAccountCreated() {
    await expect(this.page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
  }
  
  async clickContinue() {
    await this.page.click('a[data-qa="continue-button"]');
  }
  async verifyLoggedIn() {
    await expect(this.page.getByText('Logged in as')).toBeVisible();
  }
  async deleteAccount() {
    await this.page.click('a[href="/delete_account"]');
  }

  async verifyAccountDeleted() {
    await expect(this.page.getByText('Account Deleted!')).toBeVisible();
  }
}