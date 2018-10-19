const db = require("../models/index");

module.exports = {
	signup: function(app, passport, route) {
		app.post(route, passport.authenticate("local-signup"), (req, res) => {
			res.json("signing up");
		});
	},

	login: function(app, passport, route) {
		app.post(route, passport.authenticate("local-login"), (req, res) => {
			res.json("logged in");
		});
	},

	logout: function(app, route) {
		app.get(route, (req, res) => {
			res.json("logging out");
		});
	},

	test: function(app, route) {
		app.get(route, function(req, res) {
			res.json(req.user);
		});
	}
};
