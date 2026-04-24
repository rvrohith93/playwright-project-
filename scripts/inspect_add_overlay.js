const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/products', { waitUntil: 'networkidle' });
  const card = page.locator('.features_items .product-image-wrapper').first();
  await card.hover();
  await card.locator('a.add-to-cart').first().click();
  await page.waitForSelector('button:has-text("Continue Shopping"), a:has-text("View Cart")', { timeout: 10000 });
  console.log('continue button count', await page.locator('button:has-text("Continue Shopping")').count());
  console.log('view cart buttons', await page.locator('a:has-text("View Cart")').count());
  console.log('view cart button html', await page.locator('a:has-text("View Cart")').first().evaluate(el => el.outerHTML).catch(() => 'none'));
  await browser.close();
})();
