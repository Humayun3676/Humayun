import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: '1440px', width: 1440, height: 900 },
  { name: '768px', width: 768, height: 1024 },
  { name: '390px', width: 390, height: 844 },
];

const THEMES = ['light', 'dark'];

test.describe('Visual & Functional Quality Verification', () => {
  const screenshotsDir = './seo-verification-screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  for (const vp of VIEWPORTS) {
    for (const theme of THEMES) {
      test(`Verify ${vp.name} in ${theme} mode`, async ({ page }) => {
        const consoleErrors: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });

        await page.setViewportSize({ width: vp.width, height: vp.height });

        // Set theme
        await page.addInitScript((th) => {
          try {
            localStorage.setItem('theme', th);
          } catch (e) {}
        }, theme);

        await page.goto('/', { waitUntil: 'networkidle' });

        // Check console errors
        expect(consoleErrors).toEqual([]);

        // Verify H1 is present and visible
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
        await expect(h1).toHaveText('HUMAYUN MIRZA');

        // Verify Hero image is loaded and visible
        const heroImg = page.locator('img[alt*="Humayun Mirza"]').first();
        await expect(heroImg).toBeVisible();

        // Capture screenshot
        await page.screenshot({
          path: path.join(screenshotsDir, `${vp.name}-${theme}.png`),
          fullPage: false,
        });

        // Verify theme toggle
        const toggleBtn = page.locator('button[aria-label="Toggle dark mode"]').first();
        await expect(toggleBtn).toBeVisible();

        // Verify Preview Resume button works
        const resumeBtn = page.locator('button:has-text("Preview Resume")').first();
        if (await resumeBtn.isVisible()) {
          await resumeBtn.click();
          await expect(page.locator('button:has-text("Download PDF")')).toBeVisible();
          // Click back to portfolio
          await page.locator('button:has-text("Portfolio")').first().click();
          await expect(h1).toBeVisible();
        }
      });
    }
  }

  test('Verify anchor links work correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    // Click "Explore My Work" CTA (#projects)
    const exploreBtn = page.locator('a[href="#projects"]').first();
    await exploreBtn.click();
    await page.waitForTimeout(300);

    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });
});
