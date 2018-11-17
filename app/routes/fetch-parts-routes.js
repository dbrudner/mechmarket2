const db = require("../models/index");

module.exports = {
	getKeycaps: function(app, route) {
		app.get(route, (req, res) => {
			db.Keyboard.find().distinct("keycaps", (err, keycaps) => {
				if (err) {
					res.status(500).send("Something went wrong.");
				}

				res.json(keycaps);
			});
		});
	},

	getAllKeyboards: function(app, route) {
		app.get(route, (req, res) => {
			db.Keyboard.find()
				.populate("userId")
				.exec((err, result) => {
					res.json(result);
					if (err) throw err;
				});
		});
	}
};
