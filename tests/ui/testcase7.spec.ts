import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';
import { registerUser } from '../../utils/signuphelper';
import { TestCasesPage } from '../../pages/testcases.page';

test('Test Case 7: Verify Contact Us Form Submission', async ({ page }) => {
    const email = `test${Date.now()}@mail.com`;
  const home = new HomePage(page);
  const login = new LoginPage(page); 
  const testCases = new TestCasesPage(page);


    await registerUser (page, email);
    await login.logout();
    await home.navigate();
    await home.verifyHomePageVisible();
    await home.goToTestCases();
    await testCases.verifyTestCasesPageVisible();

});