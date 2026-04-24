import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductDetailPage } from '../../pages/productdetail.page';
import { CartPage } from '../../pages/cart.page';
import { SignupPage } from '../../pages/signup.page';

test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
  const home = new HomePage(page);
  const productDetail = new ProductDetailPage(page);
  const cart = new CartPage(page);
  const signup = new SignupPage(page);

  // 1-3. Launch + navigate + verify home
  await home.navigate();
  await home.verifyHomePageVisible();

  // 4. Add products to cart (open first product and add)
  await home.clickViewProduct();
  await productDetail.verifyProductDetailsVisible();
  await productDetail.addToCart();

  // 5-6. Click 'Cart' and verify cart page
  await productDetail.viewCart();
  await cart.verifyProductsCount(1);

  // 7. Click Proceed To Checkout
  await cart.proceedToCheckout();

  // 8. Click 'Register / Login'
  await page.getByRole('link', { name: 'Register / Login' }).click();

  // 9-11. Signup and verify logged in
  const email = `test${Date.now()}@mail.com`;
  await signup.verifySignupVisible();
  await signup.enterNameAndEmail('Rohit', email);
  await signup.verifyAccountInfoVisible();
  await signup.fillAccountDetails();
  await signup.createAccount();
  await signup.verifyAccountCreated();
  await signup.clickContinue();
  await signup.verifyLoggedIn();

  // 12-13. Go to Cart and Proceed To Checkout again
  await home.goToCart();
  await cart.verifyProductsCount(1);
  await cart.proceedToCheckout();

  // 14. Verify Address Details and Review Your Order
  await expect(page.getByText('Address Details')).toBeVisible();
  await expect(page.getByText('Review Your Order')).toBeVisible();

  // 15. Enter description and click 'Place Order'
  await page.locator('textarea[name="message"]').fill('Please deliver between 9 and 5');
  const placeOrderBtn = page.locator('a:has-text("Place Order"), button:has-text("Place Order")').first();
  await placeOrderBtn.scrollIntoViewIfNeeded();
  await placeOrderBtn.click();

  // 16. Enter payment details
  await page.fill('input[name="name_on_card"]', 'Rohit Test');
  await page.fill('input[name="card_number"]', '4242424242424242');
  await page.fill('input[name="cvc"]', '123');
  await page.fill('input[name="expiry_month"]', '12');
  await page.fill('input[name="expiry_year"]', '2026');

  // 17. Click 'Pay and Confirm Order'
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  // 18. Verify success message (site shows a confirmation message)
  await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

  // 19-20. Delete account and verify
  await signup.deleteAccount();
  await signup.verifyAccountDeleted();
  await signup.clickContinue();
});