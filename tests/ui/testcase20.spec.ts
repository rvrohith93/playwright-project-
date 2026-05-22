import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { LoginPage } from '../../pages/login.page';
import { registerUser } from '../../utils/signuphelper';

test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {
  const email = `test${Date.now()}@mail.com`;

  const home = new HomePage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const login = new LoginPage(page);

  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });

  await registerUser(page, email);
  await login.logout();

  await home.navigate();
  await home.goToProducts();

  await products.verifyAllProductsPage();

  await products.searchProduct('Blue Top');

  await products.verifySearchedProductsVisible();
  await products.verifySearchedProductsListVisible();

  await products.addFirstProductToCart();
  await products.clickViewCart();

  await cart.verifyProductsCount(1);
  await cart.verifyProductsVisible();

  await home.goToSignupLogin();

  await login.verifyLoginPageVisible();
  await login.login(email, 'Test@123');

  await login.verifyLoginSuccess();

  await home.goToCart();

  await cart.verifyProductsCount(1);
  await cart.verifyProductsVisible();
});