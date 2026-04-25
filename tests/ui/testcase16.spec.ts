import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductDetailPage } from '../../pages/productdetail.page';
import { CartPage } from '../../pages/cart.page';
import { LoginPage } from '../../pages/login.page';
import { SignupPage } from '../../pages/signup.page';
import { registerUser } from '../../utils/signuphelper';

test('Test Case 16: Place Order: Login before Checkout', async ({ page }) => {
  const home = new HomePage(page);
  const productDetail = new ProductDetailPage(page);
  const cart = new CartPage(page);
  const login = new LoginPage(page);
  const signup = new SignupPage(page);

  const email = `test${Date.now()}@mail.com`;
  const password = 'Test@123';

  await registerUser(page, email);
  
  await page.context().clearCookies();

  await home.navigate();
  await home.verifyHomePageVisible();

  await home.goToSignupLogin();
  await login.verifyLoginPageVisible();
  await login.login(email, password);
  await login.verifyLoginSuccess();

  await home.navigate();
  await home.clickViewProduct();
  await productDetail.verifyProductDetailsVisible();
  await productDetail.addToCart();

  await productDetail.viewCart();
  await cart.verifyProductsCount(1);

  await cart.proceedToCheckout();

  await expect(page.getByText('Address Details')).toBeVisible();
  await expect(page.getByText('Review Your Order')).toBeVisible();

  await page.locator('textarea[name="message"]').fill('Please deliver between 9 and 5');
  const placeOrderBtn = page.locator('a:has-text("Place Order"), button:has-text("Place Order")').first();
  await placeOrderBtn.scrollIntoViewIfNeeded();
  await placeOrderBtn.click();

  await page.fill('input[name="name_on_card"]', 'Rohit Test');
  await page.fill('input[name="card_number"]', '4242424242424242');
  await page.fill('input[name="cvc"]', '123');
  await page.fill('input[name="expiry_month"]', '12');
  await page.fill('input[name="expiry_year"]', '2026');

  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

  await signup.deleteAccount();
  await signup.verifyAccountDeleted();
  await signup.clickContinue();
});