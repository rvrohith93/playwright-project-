import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductDetailPage } from '../../pages/productdetail.page';
import { CartPage } from '../../pages/cart.page';

test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
  const home = new HomePage(page);
  const productDetail = new ProductDetailPage(page);
  const cart = new CartPage(page);

  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url 'http://automationexercise.com'
  await home.navigate();

  // 3. Verify that home page is visible successfully
  await home.verifyHomePageVisible();

  // 4. Click 'View Product' for any product on home page
  await home.clickViewProduct();

  // 5. Verify product detail is opened
  await productDetail.verifyProductDetailsVisible();

  // 6. Increase quantity to 4
  await productDetail.setQuantity(4);

  // 7. Click 'Add to cart' button
  await productDetail.addToCart();

  // 8. Click 'View Cart' button
  await productDetail.viewCart();

  // 9. Verify that product is displayed in cart page with exact quantity
  await cart.verifyProductsCount(1);
  await cart.verifyQuantity('4');
});