import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });
});

test('Test Case 9: Search Product', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);

  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url 'http://automationexercise.com'
  await home.navigate();

  // 3. Verify that home page is visible successfully
  await home.verifyHomePageVisible();

  // 4. Click on 'Products' button
  await home.goToProducts();

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  await products.verifyAllProductsPage();

  // 6. Enter product name in search input and click search button
  await products.searchProduct('dress');

  // 7. Verify 'SEARCHED PRODUCTS' is visible
  await products.verifySearchedProductsVisible();

  // 8. Verify all the products related to search are visible
  await products.verifySearchedProductsListVisible();
});