import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { SignupPage } from '../../pages/signup.page';

test('Test Case 1: Register User', async ({ page }) => {
  const home = new HomePage(page);
  const signup = new SignupPage(page);
  const email = `test${Date.now()}@mail.com`;

  await home.navigate();
  await home.verifyHomePageVisible();
  await home.goToSignupLogin();
  await signup.verifySignupVisible();
  await signup.enterNameAndEmail('Rohit', email);
  await signup.verifyAccountInfoVisible();
  await signup.fillAccountDetails();
  await signup.createAccount();
  await signup.verifyAccountCreated();
  await signup.clickContinue();
  await signup.verifyLoggedIn();
  await signup.deleteAccount();
  await signup.verifyAccountDeleted();
  await signup.clickContinue();
});