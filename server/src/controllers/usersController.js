const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { validateRegister } = require('../validation/register');
const { validateLogin } = require('../validation/login');
const { secretOrKey } = require('../config/keys');

// @route    GET api/users/test
// @desc     Test users controller
// @access   Public
const test = (req, res) => {
	res.json('hello');
};

// @route    POST api/users/register
// @desc     Register user
// @access   Public
const register = (req, res) => {
	const { errors, isValid } = validateRegister(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			errors.email = 'Email already exists.';
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200', // Size
				r: 'pg', // Rating
				d: 'mm', // Deafault
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				avatar,
			});

			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(newUser.password, salt, function (err, hash) {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
				});
			});
		}
	});
};

// @route    POST api/users/login
// @desc     Login user
// @access   Public
const login = (req, res) => {
	const { errors, isValid } = validateLogin(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (!user) {
			errors.name = 'User not found!';
			return res.status(404).json(errors);
		}

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				const payload = { id: user.id, name: user.name, avatar: user.avatar };

				jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token,
					});
				});
			} else {
				errors.password = 'Password is incorrect!';
				return res.status(404).json(errors);
			}
		});
	});
};

// @route    POST api/users/current
// @desc     Return current user
// @access   Private
const current_user = (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
	});
};

module.exports = {
	test,
	register,
	login,
	current_user,
};
