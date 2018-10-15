// app/routes.js
const path = require("path");
const db = require("../models/index");
const bodyParser = require("body-parser");

const keyboardRoutes = require("./keyboard-routes");

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
