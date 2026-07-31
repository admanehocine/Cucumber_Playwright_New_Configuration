import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    trace: 'on-first-retry',
  },
}); 