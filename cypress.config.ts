import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },

    baseUrl: "https://dummyjson.com",
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: true,
      html: true,
      json: true,
      inlineAssets: true,
      charts: true,
      reportPageTitle: "API Test Exection Report",
      saveJson: true,
      screenshots: false,

    },
  },
});
