import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;

  constructor(page: Page) {
    this.page = page;

    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
  }

  async verifyAddressVisible() {
    await expect(this.deliveryAddress).toBeVisible();
    await expect(this.billingAddress).toBeVisible();
  }

  async verifyDeliveryAddressContains(name: string) {
    await expect(this.deliveryAddress).toContainText(name);
  }

  async verifyBillingAddressContains(name: string) {
    await expect(this.billingAddress).toContainText(name);
  }
}