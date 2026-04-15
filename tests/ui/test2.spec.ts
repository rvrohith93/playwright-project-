import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('Test Case 2: Login User with correct credentials', async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigateToLogin();
  await login.login('rv.rohith93@gmail.com', 'Test@123');
  await login.verifyLoginSuccess();
});