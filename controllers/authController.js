const passport = require('passport');
const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
};

exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.postSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.render('signup', { error: 'User already exists' });
    }
    user = new User({ username, email, password });
    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.render('signup', { error: 'Something went wrong' });
  }
};

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};
