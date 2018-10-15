const userRoutes = require("./user-routes");
const keyboardRoutes = require("./keyboard-routes");

module.exports = function(app, passport) {
	keyboardRoutes.getAllKeyboards(app, "/api/keyboards/all");

	keyboardRoutes.postKeyboard(app, "/api/new/keyboard");

	keyboardRoutes.getOneKeyboard(app, "/api/keyboard/:id");

	userRoutes.test(app, "/api/test");

	userRoutes.logout(app, "/api/logout");

	userRoutes.login(app, passport, "/api/login");

	userRoutes.signup(app, passport, "/api/signup");
};
