import nodeEvents from 'tests/e2e/plugins/index.js';

const { defineConfig } = require('cypress');
module.exports = defineConfig({
	scrollBehavior: false,
	e2e: {
		viewportWidth: 1920,
		viewportHeight: 1080,
		setupNodeEvents: nodeEvents,
		supportFile: 'tests/e2e/support/index.js',
	},
});
