const user = require("./user-routes");
const keyboard = require("./keyboard-routes");
const fetchParts = require("./fetch-parts-routes");

module.exports = function(app, passport) {
	fetchParts.getKeycaps(app, "/api/keycaps");

	keyboard.getAllKeyboards(app, "/api/keyboards/all");

	keyboard.postKeyboard(app, "/api/new/keyboard");

	keyboard.getOneKeyboard(app, "/api/keyboard/:id");

	user.test(app, "/api/test");

	user.logout(app, "/api/logout");

	user.login(app, passport, "/api/login");

	user.signup(app, passport, "/api/signup");
};
