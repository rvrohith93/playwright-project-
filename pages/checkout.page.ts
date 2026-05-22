import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly commentBox: Locator;
  readonly placeOrderBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');

    this.commentBox = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.getByText('Place Order');
  }

  async verifyAddressSection(name: string) {
    await expect(this.deliveryAddress).toBeVisible();
    await expect(this.billingAddress).toBeVisible();

    await expect(this.deliveryAddress).toContainText(name);
    await expect(this.billingAddress).toContainText(name);
  }

  async enterComment(comment: string) {
    await this.commentBox.fill(comment);
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }
}