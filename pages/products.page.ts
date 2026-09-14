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
  readonly brandsTitle: Locator;
  readonly poloBrand: Locator;
  readonly hmBrand: Locator;
  readonly brandHeader: Locator;
  readonly brandProducts: Locator;
  readonly firstProduct: Locator;
  readonly secondProduct: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.allProductsTitle = page.locator('h2').filter({ hasText: 'All Products' });
    this.productsList = page.locator('.features_items .col-sm-4');
    this.firstProductViewButton = page.locator('.features_items .col-sm-4')
      .first()
      .locator('a[href*="product_details"]');

    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsTitle = page.locator('h2').filter({ hasText: 'Searched Products' });
    this.searchedProductsList = page.locator('.features_items .col-sm-4');

    this.firstProduct = this.productsList.nth(0);
    this.secondProduct = this.productsList.nth(1);
    this.brandsTitle = page.getByText('Brands');

    this.poloBrand = page.getByRole('link', { name: 'Polo' });
    this.hmBrand = page.getByRole('link', { name: 'H&M' });

    this.brandHeader = page.locator('.features_items h2.title');
    this.brandProducts = page.locator('.features_items .col-sm-4');

    this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartBtn = page.getByRole('link', { name: 'View Cart' });
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

  async addFirstProductToCart() {
    await this.firstProduct.hover();

    await this.firstProduct
      .locator('a[data-product-id].btn.btn-default.add-to-cart')
      .first()
      .click({ force: true });
  }

  async addSecondProductToCart() {
    await this.secondProduct.hover();

    await this.secondProduct
      .locator('a[data-product-id].btn.btn-default.add-to-cart')
      .first()
      .click({ force: true });
  }

  async clickContinueShopping() {
    await expect(this.continueShoppingBtn).toBeVisible();
    await this.continueShoppingBtn.click();
  }

  async clickViewCart() {
    await expect(this.viewCartBtn).toBeVisible();
    await this.viewCartBtn.click();
  }
  async verifyBrandsVisible() {
  await expect(this.brandsTitle).toBeVisible();
}

async clickPoloBrand() {
  await this.poloBrand.click();
}

async clickHMBrand() {
  await this.hmBrand.click();
}

async verifyBrandPage(brandName: string) {
  await expect(this.brandHeader).toContainText(brandName);
  await expect(this.brandProducts.first()).toBeVisible();
}

}