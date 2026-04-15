import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('Test Case 3: Login User with incorrect credentials', async ({ page }) => {
    const email = `test${Date.now()}@mail.com`;
    const password = 'wrongpassword';

  const login = new LoginPage(page);

  await login.navigateToLogin();
    await login.verifyLoginPageVisible();
    await login.login(email, password);
    await login.verifyLoginError();
});

