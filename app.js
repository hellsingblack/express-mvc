// Dependencies
var express = require('express'),
	http = require('http'),
	path = require('path');

var routes = require('./config/routes'),
	database = require('./config/database');

//App
var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.engine('ejs', require('ejs-locals'));
	app.set('views', __dirname + '/app/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware({
		src: __dirname + '/app/assets',
		dest: __dirname + '/public',
		compress: true
	}));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
	app.set('db_options', database.options.development);
});

app.configure('production', function() {
	app.use(express.errorHandler());
	app.set('db_options', database.options.production);
});

//GLOBAL
GLOBAL.root = __dirname;
GLOBAL.db = database.init(app.set('db_options')); //Database

//Routing
routes(app);

//Init server
http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port') + " and " + app.get('env') + " environment");
});