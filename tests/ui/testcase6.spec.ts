import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ContactUsPage } from '../../pages/contactus.page';

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    document.querySelectorAll('iframe').forEach(el => el.remove());
  });
});
test('Test Case 6: Verify User Login with Correct Credentials', async ({ page }) => {
    const email = `rv.rohith93@gmail.com`;
  const home = new HomePage(page);
  const contactUs = new ContactUsPage(page);
 

   
    await home.navigate();
    await home.verifyHomePageVisible();
    await home.goToContactUs();
    await contactUs.verifyPage();
    await contactUs.fillForm('Rohit', email, 'Test Subject', 'This is a test message.');
    //await contactUs.uploadFile('test-data/testfile.txt');
    await contactUs.submit();
    await contactUs.verifySuccess(); 

    await contactUs.goHome();
    await home.verifyHomePageVisible();
});