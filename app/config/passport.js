const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = function(passport) {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(
		"local-signup",
		new LocalStrategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true
			},
			(req, username, password, done) => {
				process.nextTick(() => {
					User.findOne({ username: username }, (err, user) => {
						if (err) return done(err);

						if (user) {
							return done(null, false, {
								message: "username already exists"
							});
						} else {
							User.findOne(
								{ username: req.body.username },
								function(err, user) {
									if (user) {
										return done(null, false, {
											message: "Username already exists"
										});
									} else {
										const newUser = new User();

										newUser.username = req.body.username;
										newUser.password = newUser.generateHash(
											password
										);

										newUser.save(function(err) {
											if (err) throw err;
											return done(null, newUser);
										});
									}
								}
							);
						}
					});
				});
			}
		)
	);

	passport.use(
		"local-login",
		new LocalStrategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true
			},
			(req, username, password, done) => {
				User.findOne({ username: username }, function(err, user) {
					if (err) return done(err);

					if (!user)
						return done(null, false, "Username doesn't exist");

					if (!user.validPassword(password))
						return done(null, false, "Wrong Password");

					return done(null, user);
				});
			}
		)
	);
};