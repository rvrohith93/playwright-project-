import { Page, Locator, expect } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;

  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileInput: Locator;
  readonly submitBtn: Locator;
  readonly successMsg: Locator;
  readonly homeBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.subjectInput = page.locator('input[name="subject"]');
    this.messageInput = page.locator('textarea[name="message"]');
    this.fileInput = page.locator('input[type="file"]');
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.successMsg = page.locator('#contact-page .alert-success');
    this.homeBtn = page.locator('#contact-page a.btn-success');
  }



  async verifyPage() {
    await expect(this.page.getByText('GET IN TOUCH')).toBeVisible();
  }

  async fillForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

  async submit() {
    await this.submitBtn.scrollIntoViewIfNeeded();

    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await this.submitBtn.click();
    
  }

  async verifySuccess() {
    await expect(this.successMsg).toHaveText(
      'Success! Your details have been submitted successfully.',
      { timeout: 30000 }
    );
  }

  async goHome() {
    await this.homeBtn.click();
  }
}