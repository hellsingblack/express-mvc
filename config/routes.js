module.exports = function(app) {
	// Load controllers
	var controller = require(root + '/app/controllers/main');

	// Main
	app.get('/', controller.homepage);
};