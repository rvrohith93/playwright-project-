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
  await home.verifyHomePageVisible();
  await home.goToProducts();
  await products.verifyAllProductsPage();
  await products.searchProduct('dress');
  await products.verifySearchedProductsVisible();

  
});