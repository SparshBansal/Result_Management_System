/**
 * Created by sparsh on 14/11/16.
 */
/**
 * Created by sparsh on 14/11/16.
 */
var express = require('express');
var router = express.Router();

var Student = require('../models/Student');
var Program = require('../models/Program');
var Marks = require('../models/Marks');


router.get('/', function (req, res, next) {
    res.render('dashboard_manageMarks.ejs');
});

router.get('/view', function (req, res, next) {
    var registrationId = req.query.regId;
    var qSemester = req.query.semester;

    Student.findOne({registrationId: registrationId}, function (error, student) {
        if (error) {
            console.log(error);
            return next(error);
        }
        if(!student){
            return req.flash('error','student id invalid');
        }
        var programCode = student.program;
        Program.findOne({code : programCode},function (error, program) {
            if (error) {
                console.log(error);
                return next(error);
            }
            if(!program){
                return req.flash('error','student enrolled in invalid program');
            }
            var semesters = program.semester;
            if(semesters[qSemester-1]){
                Marks.findOne({studentId : student._id , semester : qSemester},function (error, marks) {
                    if (error) {
                        console.log(error);
                        return next(error);
                    }
                    var obj = {};
                    obj.semester = qSemester;
                    obj.marks = {};
                    if(!marks){
                        var querySemester = semesters[qSemester-1];
                        querySemester.forEach(function (semester) {
                            obj.marks[semester] = 0;
                        });
                        return res.send(obj);
                    }
                    obj.marks = marks.marks;
                    return res.send(obj);
                });
            }
        });
    });
});

router.post('/add',function (req, res, next) {
    var data = JSON.parse(req.body.postMarks);

    var regId = data.regId;
    var semester = data.semester;
    var marks = data.marks;

    Student.findOne({registrationId: regId},function (error, student) {
        if(error){
            console.log(error);
            return next(error);
        }
        if(!student){
            req.flash('error','Not a valid student id');
            return next();
        }
        var newMarks = new Marks({
            studentId : student._id,
            semester : semester,
            marks : marks
        });

        newMarks.save(function (error) {
            if(error){
                console.log(error);
                return next(error);
            }
            return res.send({message : "Marks saved successfully"});
        });
    });
});

router.post('/update',function (req, res, next) {
    var data = JSON.parse(req.body.postMarks);

    var regId = data.regId;
    var semester = data.semester;
    var marks = data.marks;

    Student.findOne({registrationId: regId},function (error, student) {
        if(error){
            console.log(error);
            return next(error);
        }
        if(!student){
            req.flash('error','Not a valid student id');
            return next();
        }

        Marks.update({studentId : student._id ,semester : semester},{marks : marks},function (error) {
            if (error){
                console.log(error);
                return next(error);
            }
            return res.send({message : 'Updated Successfully'});
        })
    });
});

router.post('/delete',function (req, res, next) {
    var data = JSON.parse(req.body.postMarks);

    var regId = data.regId;
    var semester = data.semester;

    Student.findOne({registrationId: regId},function (error, student) {
        if(error){
            console.log(error);
            return next(error);
        }
        if(!student){
            req.flash('error','Not a valid student id');
            return next();
        }

        Marks.remove({studentId : student._id ,semester : semester},function (error) {
            if (error){
                console.log(error);
                return next(error);
            }
            return res.send({message : 'Deleted Successfully'});
        })
    });
});
module.exports = router;