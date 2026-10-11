import { test, expect } from '@playwright/test';

test.describe('Hydration & Throttling Resilience Tests', () => {
  for (const theme of ['light', 'dark']) {
    test(`pre-render snapshot renders smoothly with CPU 4x slowdown and slow 4G in ${theme} mode`, async ({ page }) => {
      // Setup Chrome DevTools Protocol for CPU and Network throttling
      const client = await page.context().newCDPSession(page);
      
      // CPU 4x slowdown
      await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      
      // Slow 4G profile: latency 150ms, download 1.6Mbps (200 KB/s), upload 750Kbps
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 150,
        downloadThroughput: (1.6 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
      });

      // Set initial theme in localStorage before navigation
      await page.addInitScript((th) => {
        try {
          localStorage.setItem('theme', th);
        } catch (e) {}
      }, theme);

      // Navigate to pre-rendered page
      await page.goto('/', { waitUntil: 'commit' });

      // Check immediately after commit: root HTML must ALREADY have H1 and content
      const h1 = page.locator('h1');
      await expect(h1).toHaveText('HUMAYUN MIRZA');

      // Verify correct theme class applied on html element
      const html = page.locator('html');
      if (theme === 'dark') {
        await expect(html).toHaveClass(/dark/);
      } else {
        await expect(html).not.toHaveClass(/dark/);
      }

      // Check key sections are present in DOM
      await expect(page.locator('#about')).toBeAttached();
      await expect(page.locator('#skills')).toBeAttached();
      await expect(page.locator('#projects')).toBeAttached();

      // Wait for complete network idle and hydration under throttled conditions
      await page.waitForLoadState('networkidle');

      // Verify heading remains solid after hydration (no disappearing/flashing)
      await expect(h1).toHaveText('HUMAYUN MIRZA');
      await expect(h1).toBeVisible();

      // Check theme persists after hydration
      if (theme === 'dark') {
        await expect(html).toHaveClass(/dark/);
      } else {
        await expect(html).not.toHaveClass(/dark/);
      }
    });
  }
});
