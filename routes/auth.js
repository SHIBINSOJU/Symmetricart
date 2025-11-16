const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @desc    Show login page
// @route   GET /auth/login
router.get('/login', authController.getLogin);

// @desc    Login user
// @route   POST /auth/login
router.post('/login', authController.postLogin);

// @desc    Show signup page
// @route   GET /auth/signup
router.get('/signup', authController.getSignup);

// @desc    Register user
// @route   POST /auth/signup
router.post('/signup', authController.postSignup);

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', authController.getLogout);

module.exports = router;
