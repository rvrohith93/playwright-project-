import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartBtn: Locator;
  readonly viewCartBtn: Locator;
  readonly writeReviewTitle: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextArea: Locator;
  readonly submitReviewBtn: Locator;
  readonly reviewSuccessMsg: Locator;
  constructor(page: Page) {
    this.page = page;

    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p').filter({ hasText: 'Category:' });
    this.productPrice = page.locator('.product-information span').filter({ hasText: 'Rs.' }).first();
    this.productAvailability = page.locator('.product-information p').filter({ hasText: 'Availability:' });
    this.productCondition = page.locator('.product-information p').filter({ hasText: 'Condition:' });
    this.productBrand = page.locator('.product-information p').filter({ hasText: 'Brand:' });
    this.quantityInput = page.locator('#quantity');
    this.addToCartBtn = page.locator('.btn.btn-default.cart');
    this.viewCartBtn = page.getByRole('link', { name: 'View Cart' });
    this.writeReviewTitle = page.getByText('Write Your Review');
    this.reviewNameInput = page.locator('#name');
    this.reviewEmailInput = page.locator('#email');
    this.reviewTextArea = page.locator('#review');

    this.submitReviewBtn = page.locator('#button-review');

    this.reviewSuccessMsg = page.getByText('Thank you for your review.');

  }

  async verifyProductDetailsVisible() {
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async viewCart() {
    await this.viewCartBtn.click();
  }
  async verifyWriteReviewVisible() {
    await expect(this.writeReviewTitle).toBeVisible();
  }

  async submitReview(
    name: string,
    email: string,
    review: string
  ) {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextArea.fill(review);
    await this.submitReviewBtn.click();
  }

  async verifyReviewSuccess() {
    await expect(this.reviewSuccessMsg).toBeVisible();
  }
}