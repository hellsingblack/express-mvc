exports.routes = function(app) {
	return {
		index: function(req, res){
			res.render("pages/index", {
				title: "Funciona"
			});
		}
	};
};