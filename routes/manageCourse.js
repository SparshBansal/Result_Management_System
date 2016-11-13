/**
 * Created by sparsh on 12/11/16.
 */
var express = require('express');
var Course = require('../models/Course');
var router = express.Router();

router.get('/', function (req, res, next) {
    return res.render('dashboard_manageCourse');
});

router.post('/add', function (req, res, next) {
    var name = req.body.name;
    var maxMarks = Number(req.body.maxMarks);
    var credits = Number(req.body.credits);
    var hours = Number(req.body.hours);

    var newCourse = new Course({
        courseName: name,
        maxMarks: maxMarks,
        credits: credits,
        hours: hours
    });

    newCourse.save(function (saveError) {
        if (saveError) {
            res.send({message: "Could not add to DB"});
        }
        res.send({message: "Successfully added to Db"});
    });

});

router.get('/view', function (req, res, next) {

    var courseName = req.query.name;
    if (courseName) {
        Course.findOne({courseName: courseName}, function (error, course) {
            if (error) {
                next(error);
            }
            else {
                if (!course) {
                    req.flash('error', 'course does not exist');
                    res.send({redirect: '/dashboard/manageCourse'});
                }
                else {
                    res.send({course : course});
                }
            }
        });

    }
});

router.post('/delete',function(req,res,next){
    Course.remove({courseName : courseName},function(error){
        if(error){
            res.send({message : "Error deleting record"});
        }
        else {
            res.send({message : "Course Successfully deleted"});
        }
    })
});

router.post('/update',function(req,res,next){
    var name = req.body.name;
    var maxMarks = Number(req.body.maxMarks);
    var credits = Number(req.body.credits);
    var hours = Number(req.body.hours);

    Course.update({courseName : name},{
        courseName: name,
        maxMarks: maxMarks,
        credits: credits,
        hours: hours
    },function(error,course){
        if(error){
            res.send({message : "Error updating record"});
        }
        else{
            res.send({message : "Course Successfully Updated"});
        }
    });
});
module.exports = router;