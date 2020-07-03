const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const usersController = require('../controllers/usersController');

const router = express.Router();

// @route    GET api/users/test
// @desc     Test users route
// @access   Public
router.get('/test', usersController.test);

// @route    POST api/users/register
// @desc     Register user route
// @access   Public
router.post('/register', usersController.register);

// @route    POST api/users/login
// @desc     Login user
// @access   Public
router.post('/login', usersController.login);

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	usersController.current_user
);

module.exports = router;
