import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { CategoryPage } from '../../pages/category.page';

test('Test Case 18: View Category Products', async ({ page }) => {
  const home = new HomePage(page);
  const category = new CategoryPage(page);

  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });

  await home.navigate();
  await category.verifyCategoriesVisible();
  await category.openWomenCategory();
  await category.clickWomenTops();
  await category.verifyWomenCategoryPage();
  await category.openMenCategory();
  await category.clickMenJeans();
  await category.verifyMenCategoryPage();
});