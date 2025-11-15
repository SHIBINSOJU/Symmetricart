const express = require('express');
const router = express.Router();
const { ensureAuth, ensureAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// @desc    Admin dashboard
// @route   GET /admin
router.get('/', ensureAuth, ensureAdmin, adminController.getDashboard);

// @desc    Show all products
// @route   GET /admin/products
router.get('/products', ensureAuth, ensureAdmin, adminController.getProducts);

// @desc    Show add product page
// @route   GET /admin/product/new
router.get('/product/new', ensureAuth, ensureAdmin, adminController.getNewProduct);

// @desc    Add a product
// @route   POST /admin/product/new
router.post('/product/new', ensureAuth, ensureAdmin, adminController.postNewProduct);

// @desc    Show edit product page
// @route   GET /admin/product/edit/:id
router.get('/product/edit/:id', ensureAuth, ensureAdmin, adminController.getEditProduct);

// @desc    Update a product
// @route   POST /admin/product/edit/:id
router.post('/product/edit/:id', ensureAuth, ensureAdmin, adminController.postEditProduct);

// @desc    Delete a product
// @route   POST /admin/product/delete/:id
router.post('/product/delete/:id', ensureAuth, ensureAdmin, adminController.postDeleteProduct);

// @desc    Show pending reviews
// @route   GET /admin/reviews
router.get('/reviews', ensureAuth, ensureAdmin, adminController.getReviews);

// @desc    Approve a review
// @route   POST /admin/review/approve/:id
router.post('/review/approve/:id', ensureAuth, ensureAdmin, adminController.postApproveReview);

// @desc    Delete a review
// @route   POST /admin/review/delete/:id
router.post('/review/delete/:id', ensureAuth, ensureAdmin, adminController.postDeleteReview);

module.exports = router;
