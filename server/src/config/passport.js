const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { secretOrKey } = require('./keys');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

const configPassport = (passport) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findOne({ id: jwt_payload.sub })
				.then((user) => {
					if (user) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				})
				.catch((err) => {
					return done(err, false);
				});
		})
	);
};

module.exports = { configPassport };
