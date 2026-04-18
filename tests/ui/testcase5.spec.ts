import { test } from '@playwright/test';
import { SignupPage } from '../../pages/signup.page';
import { registerUser } from '../../utils/signuphelper';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';

test('Test Case 5: Delete User Account', async ({ page }) => {
    const email = `test${Date.now()}@mail.com`;
  const home = new HomePage(page);
  const signup = new SignupPage(page);
  const loginPage = new LoginPage(page);
     await registerUser (page, email);
     await loginPage.logout();
    await home.navigate();
    await home.goToSignupLogin();
    await signup.verifySignupVisible();
    await signup.enterNameAndEmail('Rohit', email);
    await signup.verifyemailAlreadyExists();
});