import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { ProductDetailPage } from '../../pages/productdetail.page';

test('Test Case 21: Add review on product', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);
  const details = new ProductDetailPage(page);

  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });

  await home.navigate();
  await home.goToProducts();

  await products.verifyAllProductsPage();
  await products.clickViewProduct();

  await details.verifyWriteReviewVisible();

  await details.submitReview(
    'Rohit',
    'rohit@mail.com',
    'Very good product and quality is excellent'
  );

  await details.verifyReviewSuccess();
});