const Product = require('../models/Product');
const Review = require('../models/Review');
const Search = require('../models/Search');

exports.getDashboard = async (req, res) => {
    try {
        const topSearches = await Search.find().sort({ searchCount: -1 }).limit(10);
        const pendingReviews = await Review.find({ approved: false }).populate('product');
        res.render('admin/dashboard', { topSearches, pendingReviews });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('admin/products', { products });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};

exports.getNewProduct = (req, res) => {
    res.render('admin/add_product');
};

exports.postNewProduct = async (req, res) => {
    try {
        // Handle image uploads with multer and cloudinary
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect('/admin/products');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};

exports.getEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('admin/edit_product', { product });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};

exports.postEditProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/products');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};

exports.postDeleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.redirect('/admin/products');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ approved: false }).populate('product');
        res.render('admin/reviews', { reviews });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};

exports.postApproveReview = async (req, res) => {
    try {
        await Review.findByIdAndUpdate(req.params.id, { approved: true });
        res.redirect('/admin/reviews');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};

exports.postDeleteReview = async (req, res) => {
    try {
        await Review.findByIdAndRemove(req.params.id);
        res.redirect('/admin/reviews');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};
