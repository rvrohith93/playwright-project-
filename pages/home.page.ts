import { Page, Locator, expect } from '@playwright/test';

export class HomePage { 
  readonly page: Page;

  readonly signupLoginLink: Locator;
  readonly contactUsLink: Locator;
  readonly testCasesLink: Locator;
  readonly cartLink: Locator;
  readonly productsLink: Locator;
  readonly homeLogo: Locator;
  readonly subscriptionText: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccess: Locator;
  readonly firstProductViewButton: Locator;
  readonly recommendedTitle: Locator;
  readonly firstRecommendedAddToCartBtn: Locator;
  readonly viewCartBtn: Locator;
  readonly deleteAccountLink: Locator;
readonly accountDeletedText: Locator;
readonly continueBtn: Locator;
readonly scrollUpArrow: Locator;
readonly homeBannerText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    this.testCasesLink = page.locator('a[href="/test_cases"]').first();
    this.cartLink = page.locator('a[href="/view_cart"]').first();
    this.productsLink = page.locator('a[href="/products"]');
    this.homeLogo = page.locator('img[alt="Website for automation practice"]');
    this.subscriptionText = page.locator('h2').filter({ hasText: 'SUBSCRIPTION' });
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe').locator('.alert-success');
    this.firstProductViewButton = page.locator('.features_items .col-sm-4').first().locator('a[href*="product_details"]');

    this.recommendedTitle = page.getByText('recommended items', { exact: false });
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
this.accountDeletedText = page.getByText('Account Deleted!');
this.continueBtn = page.getByRole('link', { name: 'Continue' });
this.subscriptionText = page.getByText('Subscription');

this.scrollUpArrow = page.locator('#scrollUp');

this.homeBannerText = page
  .getByRole('heading', {
    name: 'Full-Fledged practice website for Automation Engineers'})
  .first();
    

    this.firstRecommendedAddToCartBtn =
      page.locator('#recommended-item-carousel a[data-product-id]').first();

    this.viewCartBtn = page.getByRole('link', { name: 'View Cart' });
  }


  async navigate() {
    await this.page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async verifyHomePageVisible() {
    await expect(this.homeLogo).toBeVisible();
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async goToContactUs() {
    await this.contactUsLink.click();
  }

  async goToTestCases() {
    await this.testCasesLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goToProducts() {
    await this.productsLink.click();
  }

  async clickViewProduct() {
    await this.firstProductViewButton.click();
  }

  async scrollToFooter() {
    await this.subscriptionText.scrollIntoViewIfNeeded();
  }

  async verifySubscriptionText() {
    await expect(this.subscriptionText).toBeVisible();
  }

  async subscribeToNewsletter(email: string) {
    await this.subscriptionEmail.fill(email);
    await this.subscriptionButton.click();
  }

  async verifySubscriptionSuccess() {
    await expect(this.subscriptionSuccess).toHaveText('You have been successfully subscribed!');
  }

  async verifyRecommendedItemsVisible() {
    await expect(this.recommendedTitle).toBeVisible();
  }

  async addFirstRecommendedItemToCart() {
  await this.page
    .locator('#recommended-item-carousel a[data-product-id]:visible')
    .first()
    .click();
}

  async clickViewCart() {
    await this.viewCartBtn.click();
  }
  async deleteAccount() {
  await this.deleteAccountLink.click();
}

async verifyAccountDeleted() {
  await expect(this.accountDeletedText).toBeVisible();
  await this.continueBtn.click();
}
async scrollToBottom() {
  await this.page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
}

async verifySubscriptionVisible() {
  await expect(this.subscriptionText).toBeVisible();
}

async clickScrollUpArrow() {
  await this.scrollUpArrow.click();
}

async verifyScrolledUp() {
  await expect(this.homeBannerText).toBeVisible();
}
}