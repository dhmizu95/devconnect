const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

// @route    GET api/posts/test
// @desc     Test posts route
// @access   Public
router.get('/test', postsController.test);

module.exports = router;
