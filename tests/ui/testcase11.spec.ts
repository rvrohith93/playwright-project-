import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { CartPage } from '../../pages/cart.page';

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });
});

test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);

  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url 'http://automationexercise.com'
  await home.navigate();

  // 3. Verify that home page is visible successfully
  await home.verifyHomePageVisible();

  // 4. Click 'Cart' button
  await home.goToCart();

  // 5. Scroll down to footer
  await cart.scrollToFooter();

  // 6. Verify text 'SUBSCRIPTION'
  await cart.verifySubscriptionText();

  // 7. Enter email address in input and click arrow button
  await cart.subscribeToNewsletter('test@example.com');

  // 8. Verify success message 'You have been successfully subscribed!' is visible
  await cart.verifySubscriptionSuccess();
});