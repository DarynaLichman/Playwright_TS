import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 30000,
  globalTimeout: 60000,
  testDir: "./tests",
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "https://traineeautomation.azurewebsites.net/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
