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
var Course = require('../models/Course');

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
        if (!student) {
             req.flash('error', 'student id invalid');
            res.send({redirect : '/dashboard/manageMarks/'})
        }
        var programCode = student.program;
        Program.findOne({code: programCode}, function (error, program) {
            if (error) {
                console.log(error);
                return next(error);
            }
            if (!program) {
                req.flash('error', 'student enrolled in invalid program');
                res.send({redirect : '/dashboard/manageMarks/'});
            }
            var semesters = program.semester;
            if (semesters[qSemester - 1]) {
                Marks.findOne({studentId: student._id, semester: qSemester}, function (error, marks) {
                    if (error) {
                        console.log(error);
                        return next(error);
                    }
                    var obj = {};
                    obj.semester = qSemester;
                    obj.marks = {};
                    if (!marks) {
                        obj.status = 0;
                        var querySemester = semesters[qSemester - 1];
                        querySemester.forEach(function (semester) {
                            obj.marks[semester] = 0;
                        });
                        return res.send(obj);
                    }
                    obj.status = 1;
                    obj.marks = marks.marks;
                    return res.send(obj);
                });
            }
            else{
                req.flash('error','The specified semester doesn\'t exist in the program');
                return res.send({redirect : '/dashboard/manageMarks/'});
            }
        });
    });
});

router.post('/add', function (req, res, next) {
    var data = JSON.parse(req.body.postMarks);

    var regId = data.regId;
    var semester = data.semester;
    var marks = data.marks;

    Student.findOne({registrationId: regId}, function (error, student) {
        if (error) {
            console.log(error);
            return next(error);
        }
        if (!student) {
            req.flash('error', 'Not a valid student id');
            return next();
        }

        // validate that marks are within the limit
        Program.findOne({code: student.program}, function (error, program) {
            var semesters = program.semester[semester - 1];
            Course.find({courseName: {$in: semesters}}, function (error, courses) {
                if (error) {
                    console.log(error);
                    return next(error);
                }
                var keys = Object.keys(marks);

                // Validate upper limit on marks
                for (var i = 0 ; i< keys.length; i++){
                    var mark = keys[i];
                    if(marks.hasOwnProperty(mark)){
                        for (var j = 0 ; j< courses.length ; j++){
                            if(courses[j].courseName == mark){
                                if(marks[mark] > courses[j].maxMarks){
                                    req.flash('error','Invalid Marks Entry');
                                    return res.send({redirect : '/dashboard/manageMarks/'});
                                }
                            }
                        }
                    }
                }


                var newMarks = new Marks({
                    studentId: student._id,
                    semester: semester,
                    marks: marks
                });

                newMarks.save(function (error) {
                    if (error) {
                        console.log(error);
                        return next(error);
                    }
                    req.flash('info','Marks added successfully');
                    return res.send({redirect : '/dashboard/manageMarks/'});
                });
            });
        });
    });
});

router.post('/update', function (req, res, next) {
    var data = JSON.parse(req.body.postMarks);

    var regId = data.regId;
    var semester = data.semester;
    var marks = data.marks;

    Student.findOne({registrationId: regId}, function (error, student) {
        if (error) {
            console.log(error);
            return next(error);
        }
        if (!student) {
            req.flash('error', 'Not a valid student id');
            return next();
        }


        // validate that marks are within the limit
        Program.findOne({code: student.program}, function (error, program) {
            var semesters = program.semester[semester - 1];
            Course.find({courseName: {$in: semesters}}, function (error, courses) {
                if (error) {
                    console.log(error);
                    return next(error);
                }
                var keys = Object.keys(marks);

                // Validate upper limit on marks
                for (var i = 0 ; i< keys.length; i++){
                    var mark = keys[i];
                    if(marks.hasOwnProperty(mark)){
                        for (var j = 0 ; j< courses.length ; j++){
                            if(courses[j].courseName == mark){
                                if(marks[mark] > courses[j].maxMarks){
                                    req.flash('error','Invalid Marks Entry');
                                    return res.send({redirect : '/dashboard/manageMarks/'});
                                }
                            }
                        }
                    }
                }

                Marks.update({studentId: student._id, semester: semester}, {marks: marks}, function (error) {
                    if (error) {
                        console.log(error);
                        return next(error);
                    }
                    req.flash('info','Updated Successfully');
                    return res.send({redirect: '/dashboard/manageMarks'});
                });
            });

        })
    });
});

router.post('/delete', function (req, res, next) {
    var data = JSON.parse(req.body.postMarks);

    var regId = data.regId;
    var semester = data.semester;

    Student.findOne({registrationId: regId}, function (error, student) {
        if (error) {
            console.log(error);
            return next(error);
        }
        if (!student) {
            req.flash('error', 'Not a valid student id');
            return next();
        }

        Marks.remove({studentId: student._id, semester: semester}, function (error) {
            if (error) {
                console.log(error);
                return next(error);
            }
            req.flash('info','Marks Deleted Successfully');
            return res.send({redirect: '/dashboard/manageMarks'});
        })
    });
});
module.exports = router;