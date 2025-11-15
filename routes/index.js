const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// @desc    Homepage
// @route   GET /
router.get('/', indexController.getHomepage);

// @desc    Search
// @route   GET /search
router.get('/search', indexController.getSearch);

module.exports = router;
