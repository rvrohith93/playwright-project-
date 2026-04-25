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

  
  await home.navigate();
  await home.verifyHomePageVisible();
  await home.goToCart();
  await cart.scrollToFooter();
  await cart.verifySubscriptionText();
  await cart.subscribeToNewsletter('test@example.com');
  await cart.verifySubscriptionSuccess();
});