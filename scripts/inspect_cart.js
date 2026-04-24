const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://automationexercise.com/products', { waitUntil: 'networkidle' });
  const cards = page.locator('.features_items .product-image-wrapper');

  for (let i = 0; i < 2; i++) {
    const card = cards.nth(i);
    await card.hover();
    await card.locator('a.add-to-cart').first().click();
    await page.waitForSelector('button:has-text("Continue Shopping")', { timeout: 10000 });
    await page.locator('button:has-text("Continue Shopping")').click();
    await page.waitForLoadState('networkidle');
  }

  await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'networkidle' });
  const rows = page.locator('.cart_info tbody tr');
  const rowCount = await rows.count();
  console.log('cart rows', rowCount);
  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    console.log('row', i, 'text=', await row.textContent());
    console.log('price', await row.locator('td.cart_price').textContent());
    console.log('qty', await row.locator('td.cart_quantity').textContent());
    console.log('total', await row.locator('td.cart_total').textContent());
  }
  console.log('grand total', await page.locator('.cart_total_price').textContent().catch(() => 'not found'));

  await browser.close();
})();
