import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly allProductsTitle: Locator;
  readonly productsList: Locator;
  readonly firstProductViewButton: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsTitle: Locator;
  readonly searchedProductsList: Locator;

  constructor(page: Page) {
    this.page = page;

    this.allProductsTitle = page.locator('h2').filter({ hasText: 'All Products' });
    this.productsList = page.locator('.features_items .col-sm-4');
    this.firstProductViewButton = page.locator('.features_items .col-sm-4').first().locator('a[href*="product_details"]');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsTitle = page.locator('h2').filter({ hasText: 'Searched Products' });
    this.searchedProductsList = page.locator('.features_items .col-sm-4');
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

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async verifySearchedProductsVisible() {
    await expect(this.searchedProductsTitle).toBeVisible();
  }

  async verifySearchedProductsListVisible() {
    await expect(this.searchedProductsList.first()).toBeVisible();
  }
}