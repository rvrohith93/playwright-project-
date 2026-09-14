import { Page, Locator, expect } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;

  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvc: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly payBtn: Locator;

  readonly successMsg: Locator;
  readonly downloadInvoiceBtn: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameOnCard = page.locator('input[name="name_on_card"]');
    this.cardNumber = page.locator('input[name="card_number"]');
    this.cvc = page.locator('input[name="cvc"]');
    this.expiryMonth = page.locator('input[name="expiry_month"]');
    this.expiryYear = page.locator('input[name="expiry_year"]');

    this.payBtn = page.getByText('Pay and Confirm Order');

    this.successMsg = page.getByText('Your order has been placed successfully!');
    this.downloadInvoiceBtn = page.getByText('Download Invoice');
    this.continueBtn = page.getByText('Continue');
  }

  async enterPaymentDetails() {
    await this.nameOnCard.fill('Rohit');
    await this.cardNumber.fill('4111111111111111');
    await this.cvc.fill('123');
    await this.expiryMonth.fill('12');
    await this.expiryYear.fill('2030');
  }

  async confirmOrder() {
    await this.payBtn.click();
  }

  async verifyOrderSuccess() {
    await expect(this.successMsg).toBeVisible();
  }

  async downloadInvoice() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadInvoiceBtn.click();
    await downloadPromise;
  }

  async clickContinue() {
    await this.continueBtn.click();
  }
}