const express = require("express");
const next = require("next");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const developmentUrl = "mongodb://localhost/testdb";
const routes = require("./app/routes");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const secret = require("./secret");

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect(
		developmentUrl,
		function(err) {
			if (err) throw err;
			console.log("connected");
		}
	);
	console.log("Hey?");
}

app.prepare().then(() => {
	const server = express();

	require("./app/config/passport")(passport);
	server.use(cookieParser());
	server.use(bodyParser());
	server.use(session({ secret }));
	server.use(passport.initialize());
	server.use(passport.session());
	routes(server, passport);

	server.get("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(port, err => {
		if (err) throw err;
		console.log("App listening on port " + port);
	});
});
