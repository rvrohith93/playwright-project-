import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });
});

test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
  const home = new HomePage(page);

  await home.navigate();
  await home.verifyHomePageVisible();
  await home.scrollToFooter();
  await home.verifySubscriptionText();
  await home.subscribeToNewsletter('test@example.com');
  await home.verifySubscriptionSuccess();
});