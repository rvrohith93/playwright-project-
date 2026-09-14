import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { CartPage } from '../../pages/cart.page';

test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);

  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });

  await home.navigate();

  await home.scrollToBottom();

  await home.verifyRecommendedItemsVisible();

  await home.addFirstRecommendedItemToCart();

  await home.clickViewCart();

  await cart.verifyProductsCount(1);
  await cart.verifyProductsVisible();
});