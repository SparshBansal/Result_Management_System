/**
 * Created by sparsh on 12/11/16.
 */
var Program = require('../models/Program');
var Course = require('../models/Course');
var express = require('express');

var router = express.Router();


router.get('/', function (req, res, next) {
    Course.find({}, function (error, course) {
        if (error) {
            return next(error);
        }
        res.render('dashboard_manageProgram', {courses: course});
    });
});

router.post('/add', function (req, res, next) {
    var code = req.body.code;
    var name = req.body.name;
    var semesterCount = req.body.semesterCount;
    var semestersObject = JSON.parse(req.body.semesters);
    var semesters = semestersObject.data;



    var newProgram = new Program({
        code : code,
        name : name,
        semesterCount : semesterCount,
        semester : semesters
    });

    console.log(semesters);

    newProgram.save(function(error){
        if(error){
            console.log("Save Error Occurred");
            return next(error);
        }
        return res.send({message:"Data Successfully saved",redirect : '/dashboard/manageProgram/'});
    })
});

module.exports = router;