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
        code: code,
        name: name,
        semesterCount: semesterCount,
        semester: semesters
    });

    newProgram.save(function (error) {
        if (error) {
            console.log(error);
            if(error.code == 11000){
                req.flash('error','Course already exists');
                return res.send({redirect : '/dashboard/manageProgram'});
            }
            console.log("Save Error Occurred");
            return next(error);
        }
        req.flash('info','Program saved successfully');
        return res.send({message: "Data Successfully saved", redirect: '/dashboard/manageProgram/'});
    })
});

router.get('/view', function (req, res, next) {
    var programCode = req.query.programCode;
    Program.findOne({code: programCode}, function (error, program) {
        if (error) {
            return next(error);
        }

        if(!program){
            req.flash('error','Did not find the program');
            return res.send({redirect : '/dashboard/manageProgram/'});
        }

        var semesters = program.semester;
        var mArray = [];
        var promises = semesters.map(function (semester,idx) {
            return new Promise(function (resolve, reject) {
                Course.find({courseName : {$in : semester}},function (error, courses) {
                    if(error){
                        console.log("error" , error);
                        return reject(error);
                    }
                    mArray[idx] = courses;
                    resolve();
                });
            });
        });

        Promise.all(promises).then(function(){
            console.log(mArray);
            return res.render('dashboard_manageProgram_view',{semesters : mArray});
        }).catch(function(error){
            console.log(error);
            return next(error);
        });


    });
});

module.exports = router;