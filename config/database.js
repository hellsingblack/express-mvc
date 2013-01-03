var Sequelize = require("sequelize");

exports.options = {
	development: {
		host: 'localhost',
		port: 3306,
		database: 'database',
		user: 'root',
		password: 'root'
	},
	production: {
		host: 'localhost',
		port: 3306,
		database: 'database',
		user: '',
		password: ''
	}
};

exports.init = function(opts) {
	var db = new Sequelize(opts.database, opts.user, opts.password, {
		host: opts.host,
		port: opts.port
	});
	
	return db;
};