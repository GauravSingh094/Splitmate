import { expect, test } from '@playwright/test';

test.describe('Authentication & Navigation E2E Flow', () => {
  test('navigates to login page and displays authentication form', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Splito/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('navigates to registration page', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
  });
});
