import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { PaymentPage } from '../../pages/payment.page';
import { registerUser } from '../../utils/signuphelper';

test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {
  const email = `test${Date.now()}@mail.com`;

  const home = new HomePage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const payment = new PaymentPage(page);

  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });

  await home.navigate();
  await home.verifyHomePageVisible();

  await home.goToProducts();
  await products.addFirstProductToCart();
  await products.clickViewCart();

  await cart.proceedToCheckout();
  await cart.clickRegisterLogin();

  await registerUser(page, email);

  await home.goToCart();
  await cart.proceedToCheckout();

  await page.waitForLoadState('networkidle');

  await checkout.verifyAddressSection();
  await checkout.enterComment('Test order');
  await checkout.placeOrder();

  await expect(page.getByText('Payment')).toBeVisible();

  await payment.enterPaymentDetails();
  await payment.confirmOrder();

  await payment.verifyOrderSuccess();
  await payment.downloadInvoice();

  await payment.clickContinue();

  await home.deleteAccount();
  await home.verifyAccountDeleted();
});