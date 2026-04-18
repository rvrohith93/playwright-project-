import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly signupLoginLink: Locator;
  readonly contactUsLink: Locator;
  readonly testCasesLink: Locator;
  readonly cartLink: Locator;
  readonly productsLink: Locator;
  readonly homeLogo: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    this.testCasesLink = page.locator('a[href="/test_cases"]').first();
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.productsLink = page.locator('a[href="/products"]');
    this.homeLogo = page.locator('img[alt="Website for automation practice"]');
  }


 async navigate() {
  await this.page.goto('/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
}

  async verifyHomePageVisible() {
    await expect(this.homeLogo).toBeVisible();
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async goToContactUs() {
    await this.contactUsLink.click();
  }

  async goToTestCases() {
    await this.testCasesLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goToProducts() {
    await this.productsLink.click();
  }
}