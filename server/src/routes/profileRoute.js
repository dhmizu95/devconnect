const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

// @route    GET api/profile/test
// @desc     Test profile route
// @access   Public
router.get('/test', profileController.test);

module.exports = router;
