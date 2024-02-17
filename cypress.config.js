const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'j249js',
  watchForFileChanges: false,
  pageLoadTimeout: 120000,
  e2e: {
    setupNodeEvents(on, config) {
      
    },
  },
});
