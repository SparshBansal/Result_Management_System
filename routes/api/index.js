/**
 * Created by sparsh on 13/11/16.
 */
var express = require('express');
var Course = require('../../models/Course');

var router = express.Router();
router.get('/list_courses', function (req, res, next) {
    Course.find({}, function (error, courses) {
        if (error) {
            return next(error);
        }
        res.send({courses: courses});
        return;
    });
});

module.exports = router;