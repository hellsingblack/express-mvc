exports.homepage = function(req, res) {
	res.render('main/homepage', {
		title: 'Welcome'
	});
};