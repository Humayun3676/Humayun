import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'Desktop Light', use: { ...devices['Desktop Chrome'], colorScheme: 'light' } },
    { name: 'Desktop Dark', use: { ...devices['Desktop Chrome'], colorScheme: 'dark' } },
    { name: 'Mobile Light', use: { ...devices['Pixel 5'], colorScheme: 'light' } },
    { name: 'Mobile Dark', use: { ...devices['Pixel 5'], colorScheme: 'dark' } },
  ],
});
