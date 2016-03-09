'use strict';

let passport = require('passport');

module.exports = function login(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
        return res.render('error');
    }

    if (!user) {
        return res.render('login', {error: 'Wrong username or password'});
    }
    req.logIn(user, function() {
      res.redirect('/admin');
    });

  })(req, res, next);
};