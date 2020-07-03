const validator = require('validator');
const { isEmpty } = require('../helpers/isEmpty');

const validateLogin = (data) => {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (validator.isEmpty(data.email)) {
		errors.email = 'Email field is required!';
	}

	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required!';
	} else if (!validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Name must be at least 6 characters.';
	}

	return { errors, isValid: isEmpty(errors) };
};

module.exports = { validateLogin };
