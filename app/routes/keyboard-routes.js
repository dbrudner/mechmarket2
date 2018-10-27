const db = require("../models/index");

module.exports = {
	postKeyboard(app, route) {
		app.post(route, (req, res) => {
			const newKeyboard = { ...req.body };
			db.Keyboard.create(newKeyboard, (err, keyboard) =>
				res.json(keyboard)
			);
		});
	},

	getAllKeyboards(app, route) {
		app.get(route, (req, res) => {
			db.Keyboard.find()
				.populate("userId")
				.exec((err, keyboards) => {
					res.json(keyboards);
					if (err) throw err;
				});
		});
	},

	getOneKeyboard(app, route) {
		app.get(route, (req, res) => {
			const id = req.params.id;
			db.Keyboard.findOne({ _id: id })
				.populate("userId")
				.exec((err, keyboard) => {
					res.json(keyboard);
				});
		});
	},

	getNewKeyboards(app, route) {
		app.get(route, (req, res) => {
			db.Keyboard.find()
				.sort({ created_at: -1 })
				.exec((err, keyboards) => {
					if (err) throw err;
					res.json(keyboards);
				});
		});
	}
};
