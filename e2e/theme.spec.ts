import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Theme Toggle Tests', () => {
  test('verify dark mode toggles', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const isDarkOS = testInfo.project.use.colorScheme === 'dark';
    
    // Selectors
    const root = page.locator('html'); // Since index.css puts the bg on html
    const nav = page.locator('nav').first();
    const projectCard = page.locator('#projects > div > div:nth-child(2) > div').first();
    const arsenalCard = page.locator('#skills > div > div:nth-child(2) > div').first();
    const experienceCard = page.locator('#experience > div > div:nth-child(2) > div > div').first(); // Adjust based on DOM structure
    
    const h2 = page.locator('h2').first();
    const p = page.locator('p').first();
    const toggleBtn = page.locator('button[aria-label="Toggle dark mode"]').first();
    
    const html = page.locator('html');
    
    if (isDarkOS) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }

    const screenshotDir = './theme-test-screenshots';
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
    
    await page.screenshot({ path: path.join(screenshotDir, `${testInfo.project.name}-initial.png`), fullPage: true });

    // Function to get colors
    const getColors = async () => {
      const getBg = async (loc) => loc.evaluate((el) => window.getComputedStyle(el).backgroundColor).catch(() => '');
      const getColor = async (loc) => loc.evaluate((el) => window.getComputedStyle(el).color).catch(() => '');
      
      return {
        rootBg: await getBg(root),
        navBg: await getBg(nav),
        projectBg: await getBg(projectCard),
        arsenalBg: await getBg(arsenalCard),
        h2Color: await getColor(h2),
        pColor: await getColor(p)
      };
    };

    const initialColors = await getColors();

    if (isDarkOS) {
      expect(initialColors.rootBg).toBe('rgb(15, 23, 42)');
      expect(initialColors.navBg).toBe('rgb(15, 23, 42)'); // nav is slate-900 in dark mode
    } else {
      expect(initialColors.rootBg).toBe('rgb(239, 239, 239)');
      expect(initialColors.navBg).toBe('rgb(255, 255, 255)'); // nav is white in light mode
    }

    // Click the toggle (wait for any animation if needed, though we don't have block anims)
    await toggleBtn.click();
    await page.waitForTimeout(500); // Wait for transition-colors duration-300
    
    if (isDarkOS) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    await page.screenshot({ path: path.join(screenshotDir, `${testInfo.project.name}-toggled.png`), fullPage: true });

    const toggledColors = await getColors();
    
    if (isDarkOS) {
      // WAS dark, NOW light
      expect(toggledColors.rootBg).toBe('rgb(239, 239, 239)');
      expect(toggledColors.navBg).toBe('rgb(255, 255, 255)');
      expect(toggledColors.projectBg).toBe('rgb(255, 255, 255)'); // bg-white
    } else {
      // WAS light, NOW dark
      expect(toggledColors.rootBg).toBe('rgb(15, 23, 42)');
      expect(toggledColors.navBg).toBe('rgb(15, 23, 42)'); // dark:bg-slate-900
      expect(toggledColors.projectBg).toBe('rgb(30, 41, 59)'); // dark:bg-slate-800
    }

    // Ensure no pure black background
    for (const bg of Object.values(toggledColors)) {
      expect(bg).not.toBe('rgb(0, 0, 0)');
    }

    // Reload to verify persistence
    await page.reload();
    await page.waitForTimeout(500);
    
    if (isDarkOS) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    // Return to original
    await toggleBtn.click();
    await page.waitForTimeout(500);
    if (isDarkOS) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }
  });
});
