import { test, expect, Page } from '@playwright/test';

export class ContactUsPage {
  constructor(private page: Page) {}

   async verifyContactUsPageVisible() {
    await expect(this.page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
  }
 async fillContactForm(name: string, email: string, subject: string, message: string) {
  
    const nameField = this.page.locator('input[name="name"]');

  await expect(nameField).toBeVisible();

  await nameField.fill(name);
  await this.page.locator('input[name="email"]').fill(email);
  await this.page.locator('input[name="subject"]').fill(subject);
  await this.page.locator('textarea[name="message"]').fill(message);
}
    async uploadFile(filePath: string) {
    await this.page.setInputFiles('input[type="file"]', filePath);
    }
    async submitForm() {
  const submitBtn = this.page.getByRole('button', { name: 'Submit' });

  await submitBtn.scrollIntoViewIfNeeded();
  await expect(submitBtn).toBeVisible();

  
  this.page.on('dialog', async dialog => {
    console.log(dialog.message()); // optional debug
    await dialog.accept();
  });

  await submitBtn.click();
}
   async handleAlert() {
  this.page.once('dialog', async dialog => {
    await dialog.accept();
  });
  } 
  async verifySuccessMessage() {
  const successMsg = this.page.locator('#contact-page .alert-success');

  await expect(successMsg).toContainText(
    'Success! Your details have been submitted successfully.'
  );
}
  async home() {
  await this.page.locator('#contact-page').getByRole('link', { name: 'Home' }).click();
}
  async submitFormAndHandleAlert() {
  const submitBtn = this.page.getByRole('button', { name: 'Submit' });

  await submitBtn.scrollIntoViewIfNeeded(); 

  await expect(submitBtn).toBeVisible();

  await Promise.all([
    this.page.waitForEvent('dialog').then(dialog => dialog.accept()),
    submitBtn.click()
  ]);

}
  
}