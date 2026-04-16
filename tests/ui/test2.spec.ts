import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { SignupPage } from '../../pages/signup.page';
import { registerUser } from '../../utils/signuphelper';

test('Test Case 2: Login User with correct credentials', async ({ page }) => {
    const email = `test${Date.now()}@mail.com`;
  const login = new LoginPage(page);

  await registerUser (page, email);
  await page.context().clearCookies();
  await login.navigateToLogin();
  await login.verifyLoginPageVisible();
  await login.login(email, 'Test@123');
  await login.verifyLoginSuccess();

  const signup = new SignupPage(page);

  await signup.deleteAccount();
  await signup.verifyAccountDeleted();
  
});