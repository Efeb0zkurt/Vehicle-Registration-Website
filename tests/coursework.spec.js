// @ts-check
const { test, expect } = require('@playwright/test');

const websiteURL = 'http://127.0.0.1:5500/index.html';

test.beforeEach(async ({ page }) => {
   await page.goto(websiteURL);
});

test('homepage heading', async ({ page }) => {
   await expect(page.getByRole('heading', { name: 'People Search' })).toBeVisible();
});
