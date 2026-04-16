import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { registerUser } from '../../utils/signuphelper';

test('Test Case 4:  Logout User', async ({ page }) => {
    const email = `test${Date.now()}@mail.com`;
  const login = new LoginPage(page);

    await registerUser (page, email);
    await page.context().clearCookies();
    await login.navigateToLogin();
    await login.verifyLoginPageVisible();
    await login.login(email, 'Test@123');
    await login.verifyLoginSuccess();
    await login.logout();
    await login.verifyLogoutSuccess();
    await login.verifyLoginPageVisible();   
});
