import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly subscriptionText: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccess: Locator;

  constructor(page: Page) {
    this.page = page;

    this.subscriptionText = page.locator('h2').filter({ hasText: 'SUBSCRIPTION' });
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe').locator('.alert-success');
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