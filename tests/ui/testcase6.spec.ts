import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';
import { ContactUsPage } from '../../pages/contactus.page';


test('Test Case 6: Verify User Login with Correct Credentials', async ({ page }) => {
    const email = `rv.rohith93@gmail.com`;
  const home = new HomePage(page);
  const contactUs = new ContactUsPage(page);
 

   
    await home.navigate();
    await home.verifyHomePageVisible();
    await home.contactUs();
    await contactUs.verifyContactUsPageVisible();
    await contactUs.fillContactForm('Rohit', email, 'Test Subject', 'This is a test message.');
    await contactUs.uploadFile('test-data/testfile.txt');
    await contactUs.submitForm();
    await contactUs.verifySuccessMessage(); 

    await contactUs.home();
    await home.verifyHomePageVisible();
});