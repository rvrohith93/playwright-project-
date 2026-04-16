import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { registerUser } from '../../utils/signuphelper';

test('Test Case 3: Login User with incorrect credentials', async ({ page }) => {
    const email = `test${Date.now()}@mail.com`;
    const password = 'WrongPassword';
await page.context().clearCookies();
  const login = new LoginPage(page);

  
  //await registerUser (page, email);
  await login.navigateToLogin();
    await login.verifyLoginPageVisible();
    await login.login(email, password);
    await login.verifyLoginError();
});

