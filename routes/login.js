/**
 * Created by sparsh on 12/11/16.
 */
var express = require('express');
var passport = require('passport');

var router= express.Router();

router.post('/',passport.authenticate('login',{
    successRedirect : '/dashboard',
    failureRedirect : '/',
    failureFlash : true
}));

module.exports = router;