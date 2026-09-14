import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly cartPage: Locator;
  readonly cartItems: Locator;
  readonly productNames: Locator;

  readonly proceedToCheckoutBtn: Locator;
  readonly registerLoginBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartPage = page.getByText('Shopping Cart');
    this.cartItems = page.locator('tr[id^="product-"]');
    this.productNames = page.locator('.cart_description h4 a');

    // ✅ stable locators
    this.proceedToCheckoutBtn = page.locator('a.check_out');
    this.registerLoginBtn = page.getByText('Register / Login');
  }

  async verifyCartPageVisible() {
    await expect(this.cartPage).toBeVisible();
  }

  async verifyProductsCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async verifyProductsVisible() {
    await expect(this.productNames.first()).toBeVisible();
  }

  async proceedToCheckout() {
    await this.verifyCartPageVisible();

    // remove ads again (important for this site)
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe').forEach(el => el.remove());
    });

    await this.proceedToCheckoutBtn.scrollIntoViewIfNeeded();
    await this.proceedToCheckoutBtn.waitFor({ state: 'visible' });

    await this.proceedToCheckoutBtn.click({ force: true });
  }

  async clickRegisterLogin() {
    await this.registerLoginBtn.click();
  }
}