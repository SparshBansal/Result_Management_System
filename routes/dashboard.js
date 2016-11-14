/**
 * Created by sparsh on 12/11/16.
 */
var express = require('express');
var Course = require('../models/Course');
var manageCourse = require('./manageCourse');
var manageProgram = require('./manageProgram');
var manageStudent = require('./manageStudent');

var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        var member = req.user;
        return res.render('dashboard', {title: 'RMS'});
    }
});

router.use('/manageCourse' , manageCourse);
router.use('/manageProgram' , manageProgram);
router.use('/manageStudent' , manageStudent);
module.exports = router;