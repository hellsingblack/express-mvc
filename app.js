/* Node dependencies */
var express = require('express'),
	http = require('http'),
	path = require('path'),
	engine = require('ejs-locals');

var routes = require('./config/routes'),
	environments = require('./config/environments');

/* Application */
var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.engine('ejs', engine);
	app.set('views', __dirname + '/app/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure("development", function() {
	app.use(express.errorHandler());
});

/* Main */
routes.main(app, require('./app/controllers/main'));

/* Server */
http.createServer(app).listen(app.get('port'), function() {
	console.log("Server listening on port " + app.get('port'));
});