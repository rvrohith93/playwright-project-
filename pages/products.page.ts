import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly allProductsTitle: Locator;
  readonly productsList: Locator;
  readonly firstProductViewButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.allProductsTitle = page.locator('h2').filter({ hasText: 'All Products' });
    this.productsList = page.locator('.features_items .col-sm-4');
    this.firstProductViewButton = page.locator('.features_items .col-sm-4').first().locator('a[href*="product_details"]');
  }

  async verifyAllProductsPage() {
    await expect(this.allProductsTitle).toBeVisible();
  }

  async verifyProductsListVisible() {
    await expect(this.productsList.first()).toBeVisible();
  }

  async clickViewProduct() {
    await this.firstProductViewButton.click();
  }
}