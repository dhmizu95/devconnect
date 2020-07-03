const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const profileController = require('../controllers/profileController');

const Profile = require('../models/profile');
const User = require('../models/user');

const router = express.Router();

// @route    GET api/profile/test
// @desc     Test profile route
// @access   Public
router.get('/test', profileController.test);

// @route    GET api/profile
// @desc     Get current user profile
// @access   Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	profileController.user_profile
);

// @route    POST api/profile
// @desc     Create user profile
// @access   Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	profileController.create_user_profile
);

module.exports = router;
