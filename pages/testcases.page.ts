import { test, expect } from '@playwright/test';

export class TestCasesPage { 
  constructor(private page: any) {}

    async verifyTestCasesPageVisible() {
   await expect(
  this.page.getByRole('heading', { name: 'Test Cases', exact: true })
).toBeVisible();
    }
}

