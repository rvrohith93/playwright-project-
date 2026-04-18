import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });
});

test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
  const home = new HomePage(page);

  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url 'http://automationexercise.com'
  await home.navigate();

  // 3. Verify that home page is visible successfully
  await home.verifyHomePageVisible();

  // 4. Scroll down to footer
  await home.scrollToFooter();

  // 5. Verify text 'SUBSCRIPTION'
  await home.verifySubscriptionText();

  // 6. Enter email address in input and click arrow button
  await home.subscribeToNewsletter('test@example.com');

  // 7. Verify success message 'You have been successfully subscribed!' is visible
  await home.verifySubscriptionSuccess();
});