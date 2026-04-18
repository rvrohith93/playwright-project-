import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly signupLoginLink: Locator;
  readonly contactUsLink: Locator;
  readonly testCasesLink: Locator;
  readonly cartLink: Locator;
  readonly productsLink: Locator;
  readonly homeLogo: Locator;
  readonly subscriptionText: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccess: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    this.testCasesLink = page.locator('a[href="/test_cases"]').first();
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.productsLink = page.locator('a[href="/products"]');
    this.homeLogo = page.locator('img[alt="Website for automation practice"]');
    this.subscriptionText = page.locator('h2').filter({ hasText: 'SUBSCRIPTION' });
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe').locator('.alert-success');
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

  async scrollToFooter() {
    await this.subscriptionText.scrollIntoViewIfNeeded();
  }

  async verifySubscriptionText() {
    await expect(this.subscriptionText).toBeVisible();
  }

  async subscribeToNewsletter(email: string) {
    await this.subscriptionEmail.fill(email);
    await this.subscriptionButton.click();
  }

  async verifySubscriptionSuccess() {
    await expect(this.subscriptionSuccess).toHaveText('You have been successfully subscribed!');
  }
}