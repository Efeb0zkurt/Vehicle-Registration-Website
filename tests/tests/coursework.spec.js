const { test, expect } = require('@playwright/test');

test('People search heading appears', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');
  await expect(page.getByRole('heading', { name: 'People Search' })).toBeVisible();
});
