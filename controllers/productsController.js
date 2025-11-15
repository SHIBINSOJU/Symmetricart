const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

exports.getShop = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('shop', { products });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    res.render('product', { product });
  } catch (err) {
    console.error(err);
    res.render('error/404');
  }
};

exports.postLike = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.likes++;
        await product.save();
        res.json({ likes: product.likes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.postWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const productId = req.params.id;
        const index = user.wishlist.indexOf(productId);
        if (index > -1) {
            user.wishlist.splice(index, 1);
        } else {
            user.wishlist.push(productId);
        }
        await user.save();
        res.json({ wishlist: user.wishlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.postReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const review = new Review({
            product: req.params.id,
            user: req.user.id,
            username: req.user.username,
            comment: req.body.comment
        });
        await review.save();
        product.reviews.push(review);
        await product.save();
        res.redirect(`/product/${req.params.id}`);
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};
