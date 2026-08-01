import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('UI Quality & Accessibility Visual Regression Platform', () => {
  test('login page visual screenshot snapshot match', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('login page passes WCAG AA accessibility audit', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('register page visual screenshot snapshot match', async ({ page }) => {
    await page.goto('/register');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('register-page.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
