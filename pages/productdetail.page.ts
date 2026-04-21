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
}