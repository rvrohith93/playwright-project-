import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';

test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);

  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });

  await home.navigate();
  await home.goToProducts();

  await products.verifyBrandsVisible();

  await products.clickPoloBrand();
  await products.verifyBrandPage('Polo');

  await products.clickHMBrand();
  await products.verifyBrandPage('H&M');
});