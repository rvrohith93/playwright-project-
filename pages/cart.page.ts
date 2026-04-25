import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;


  readonly subscriptionText: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccess: Locator;

  readonly cartItems: Locator;
  readonly cartPage: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productQuantity: Locator;
  readonly productTotal: Locator;
  readonly itemDeleteBtn: Locator;
  readonly proceedToCheckoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.subscriptionText = page.locator('h2').filter({ hasText: 'SUBSCRIPTION' });
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe .alert-success');

    this.cartItems = page.locator('.cart_info tbody tr');
    this.productNames = page.locator('.cart_description h4 a');
    this.productPrices = page.locator('.cart_price p');
    this.productQuantity = page.locator('.cart_quantity button');
    this.productTotal = page.locator('.cart_total p');
    this.proceedToCheckoutBtn = page.locator('a:has-text("Proceed To Checkout")');
    this.itemDeleteBtn = page.locator("//tr[@id='product-1']//a[contains(@class,'cart_quantity_delete')]");
    this.cartPage = page.getByText('Shopping Cart');
  }

  async verifyCartPageVisible(){
    await expect(this.cartPage).toBeVisible();
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
    await expect(this.subscriptionSuccess)
      .toContainText('You have been successfully subscribed!');
  }



  async verifyProductsCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async verifyProductsVisible() {
    await expect(this.productNames.first()).toBeVisible();
    await expect(this.productNames.nth(1)).toBeVisible();
  }

  async verifyPricesVisible() {
    await expect(this.productPrices.first()).toBeVisible();
    await expect(this.productPrices.nth(1)).toBeVisible();
  }

  async verifyQuantity(expected: string = '1') {
    await expect(this.productQuantity.first()).toHaveText(expected);
  }

  async verifyTotalVisible() {
    await expect(this.productTotal.first()).toBeVisible();
    await expect(this.productTotal.nth(1)).toBeVisible();
  }

  
  async validatePriceCalculation(index: number) {
    const priceText = await this.productPrices.nth(index).innerText();
    const totalText = await this.productTotal.nth(index).innerText();

    const price = Number(priceText.replace(/[^0-9]/g, ''));
    const total = Number(totalText.replace(/[^0-9]/g, ''));

    expect(total).toBe(price); 
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }
  async deleteProduct() {
     const items = this.page.locator('tr[id^="product-"]');
  const before = await items.count();

  await this.page.locator('a.cart_quantity_delete').first().click();
  await expect(items).toHaveCount(before - 1);
  
  }
  async getCartProductCount():Promise<number> {
    return await this.page.locator('tr[id^="product-"]').count();
  }

}