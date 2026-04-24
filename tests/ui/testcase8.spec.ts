import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { ProductDetailPage } from '../../pages/productdetail.page';

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });
});

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);
  const productDetail = new ProductDetailPage(page);

  await home.navigate();
  await home.verifyHomePageVisible();
  await home.goToProducts();
  await products.verifyAllProductsPage();
  await products.verifyProductsListVisible();
  await products.clickViewProduct();
  await productDetail.verifyProductDetailsVisible();
});