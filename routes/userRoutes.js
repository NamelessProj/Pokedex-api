const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

// @route User route (POST)
// @desc Route to create a user
// @access Public
router.route('/register').post(userController.register);

// @route User route (POST)
// @desc Route to login a user
// @access Public
router.route('/login').post(userController.login);

// @route User route (POST)
// @desc Route to logout a user
// @access Private
router.route('/logout').post(userController.logout);

// @route User route (PUT)
// @desc Route to update the profile of a user
// @access Private
router.route('/profile').put(protect, userController.updateUserProfile);

// @route User route (GET)
// @desc Route to get the profile of a user
// @access Private
router.route('/profile/:_id').get(userController.getUserProfile);

module.exports = router;