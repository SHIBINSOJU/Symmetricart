const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { ensureAuth } = require('../middleware/auth');

// @desc    Show all products
// @route   GET /shop
router.get('/shop', productsController.getShop);

// @desc    Show single product
// @route   GET /product/:id
router.get('/product/:id', productsController.getProduct);

// @desc    Like a product
// @route   POST /like/:id
router.post('/like/:id', ensureAuth, productsController.postLike);

// @desc    Add/remove product from wishlist
// @route   POST /wishlist/:id
router.post('/wishlist/:id', ensureAuth, productsController.postWishlist);

// @desc    Add a review
// @route   POST /review/:id
router.post('/review/:id', ensureAuth, productsController.postReview);

module.exports = router;
