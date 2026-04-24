import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';

test('Test Case 12: Add Products in Cart', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });

  await home.navigate();
  await home.verifyHomePageVisible();
  await home.goToProducts();
  await products.verifyAllProductsPage();
  await products.addFirstProductToCart();
  await products.clickContinueShopping();
  await products.addSecondProductToCart();
  await products.clickViewCart();
  await cart.verifyProductsCount(2);
  await cart.verifyProductsVisible();
  await cart.verifyPricesVisible();
  await cart.verifyQuantity('1');
  await cart.verifyTotalVisible();
  await cart.validatePriceCalculation(0);
  await cart.validatePriceCalculation(1);
});