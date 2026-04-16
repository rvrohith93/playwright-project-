import { Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SignupPage } from '../pages/signup.page';

export async function registerUser(page: Page, email: string) {
  const home = new HomePage(page);
  const signup = new SignupPage(page);

  await home.navigate();
  await home.clickSignupLogin();

  await signup.verifySignupVisible();
  await signup.enterNameAndEmail('Rohit', email);

  await signup.verifyAccountInfoVisible();
  await signup.fillAccountDetails();

  await signup.createAccount();
  await signup.verifyAccountCreated();

  await signup.clickContinue();
}