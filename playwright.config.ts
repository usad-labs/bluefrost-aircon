import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['line']],
  use: { baseURL: 'http://localhost:4321' },
  // Tests run against the built site (run `npm run build` first; the quality gate does).
  webServer: {
    command: 'npx astro preview --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
});
