module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/auth/login');
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      return next();
    }
  },
  ensureAdmin: function (req, res, next) {
    if (req.user.isAdmin) {
      return next();
    } else {
      res.redirect('/');
    }
  }
};
