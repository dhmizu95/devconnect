const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// @route    GET api/users/test
// @desc     Test users route
// @access   Public
router.get('/test', usersController.test);

module.exports = router;
