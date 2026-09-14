import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ page }) => {
  const home = new HomePage(page);

  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });
  await home.navigate();
  await home.verifyHomePageVisible();
  await home.scrollToBottom();
  await home.verifySubscriptionVisible();
  await home.verifyScrolledUpWithoutArrow();
});