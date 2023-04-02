const express = require('express');
const router = express.Router();
const User = require('../models/user');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');


router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login', keepSessionInfo:true}), users.login)

router.get('/logout', users.logout)

module.exports = router;
