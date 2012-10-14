//Node dependencies
var express = require("express"),
    http = require("http"),
    path = require("path"),
    engine = require("ejs-locals");

//Application
var app = express();

//MVC dependencies
var config = require("./config/application").config,
    routes = require("./config/routes").routes(app);

//App configuration
app.configure(function() {
    app.set("port", process.env.PORT || config.port);
    app.set("views", __dirname + config.views_path);
    app.engine("ejs", engine);
    app.set("view engine", "ejs");
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, config.public_path)));
});

app.configure("development", function(){
    app.use(express.errorHandler());
});

app.get("/", routes.index);

//Server
http.createServer(app).listen(app.get("port"), function(){
    console.log("Express server listening on port " + app.get("port"));
});