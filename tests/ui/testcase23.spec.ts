import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { LoginPage } from '../../pages/login.page';
import { registerUser } from '../../utils/signuphelper';

test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
  const email = `test${Date.now()}@mail.com`;
  const name = 'Rohit';

  const home = new HomePage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const login = new LoginPage(page);

  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });


  await home.navigate();
  await home.verifyHomePageVisible();
  await registerUser(page, email);
  await login.verifyLoginSuccess();
  await home.goToProducts();
  await products.addFirstProductToCart();
  await products.clickViewCart();

  await cart.verifyProductsCount(1);
  await cart.proceedToCheckout();

  await checkout.verifyAddressVisible();
  await checkout.verifyDeliveryAddressContains(name);
  await checkout.verifyBillingAddressContains(name);

  await home.deleteAccount();
  await home.verifyAccountDeleted();
});