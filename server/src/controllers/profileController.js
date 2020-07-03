const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const profileController = require('../controllers/profileController');
const Profile = require('../models/profile');
const User = require('../models/user');

const { validateProfile } = require('../validation/profile');

// @route    GET api/profile/test
// @desc     Test profile controller
// @access   Public
const test = (req, res) => {
	res.json('hello');
};

// @route    GET api/profile
// @desc     Get current user profile
// @access   Private
const user_profile = (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.user.id })
		.populate('user', ['name', 'avatar'])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user.';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
};

// @route    POST api/profile
// @desc     Create/Edit user profile
// @access   Private
const create_user_profile = (req, res) => {
	const { errors, isValid } = validateProfile(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const profileFields = {};

	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.skills) profileFields.skills = req.body.skills;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.githubusername)
		profileFields.githubusername = req.body.githubusername;

	// Skills - Split into array
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}

	// Social
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
	if (req.body.linkdin) profileFields.social.linkdin = req.body.linkdin;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.handle) profileFields.handle = req.body.handle;

	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (profile) {
			// Update profile
			Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			).then((profile) => {
				res.json(profile);
			});
		} else {
			// Create profile
			// Check handle before create profile
			Profile.findOne({ handle: profileFields.handle }).then((profile) => {
				if (profile) {
					errors.handle = 'That handle already exists.';
					return res.status(404).json(errors);
				}

				new Profile(profileFields).save().then((profile) => {
					res.json(profile);
				});
			});
		}
	});
};

module.exports = {
	test,
	user_profile,
	create_user_profile,
};
