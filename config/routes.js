exports.main = function(app, controller) {
	app.get('/', controller.homepage);
};