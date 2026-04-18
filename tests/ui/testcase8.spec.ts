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

  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url 'http://automationexercise.com'
  await home.navigate();

  // 3. Verify that home page is visible successfully
  await home.verifyHomePageVisible();

  // 4. Click on 'Products' button
  await home.goToProducts();

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  await products.verifyAllProductsPage();

  // 6. The products list is visible
  await products.verifyProductsListVisible();

  // 7. Click on 'View Product' of first product
  await products.clickViewProduct();

  // 8. User is landed to product detail page (implied by next step)
  // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
  await productDetail.verifyProductDetailsVisible();
});