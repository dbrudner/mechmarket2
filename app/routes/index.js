const user = require("./user-routes");
const keyboard = require("./keyboard-routes");
const fetchParts = require("./fetch-parts-routes");

module.exports = function(app, passport) {
	fetchParts.getKeycaps(app, "/api/keycaps");

	keyboard.getAllKeyboards(app, "/api/keyboard/all");

	keyboard.postKeyboard(app, "/api/post/keyboard");

	keyboard.getOneKeyboard(app, "/api/keyboard/:id");

	keyboard.getNewKeyboards(app, "/api/keyboards/newest");

	user.test(app, "/api/test");

	user.logout(app, "/api/logout");

	user.login(app, passport, "/api/login");

	user.signup(app, passport, "/api/signup");
};
