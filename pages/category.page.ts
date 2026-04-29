import { Page, Locator, expect } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;

  readonly categoryTitle: Locator;
  readonly womenCategory: Locator;
  readonly menCategory: Locator;
  readonly womenTopsLink: Locator;
  readonly menJeansLink: Locator;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.categoryTitle = page.getByText('Category');
    this.womenCategory = page.locator('a[href="#Women"]');
    this.menCategory = page.locator('a[href="#Men"]');
    this.womenTopsLink = page.getByRole('link', { name: 'Tops' });
    this.menJeansLink = page.getByRole('link', { name: 'Jeans' });
    this.pageHeader = page.locator('.features_items h2.title');
  }

  async verifyCategoriesVisible() {
    await expect(this.categoryTitle).toBeVisible();
  }

  async openWomenCategory() {
    await this.womenCategory.click();
  }

  async clickWomenTops() {
    await this.womenTopsLink.click();
  }

 async verifyWomenCategoryPage() {
  await expect(this.pageHeader).toContainText('Women');
  await expect(this.pageHeader).toContainText('Tops');

  }

  async openMenCategory() {
    await this.menCategory.click();
  }

  async clickMenJeans() {
    await this.menJeansLink.click();
  }

  async verifyMenCategoryPage() {
    await expect(this.pageHeader).toContainText('Men');
  }
}