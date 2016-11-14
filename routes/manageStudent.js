/**
 * Created by sparsh on 14/11/16.
 */
var express = require('express');
var router = express.Router();

var Student = require('../models/Student');
var Member = require('../models/Member');
var MemberType = require('../MemberType');

router.get('/',function(req,res,next){
   res.render('dashboard_manageStudent.ejs');
});

router.post('/add' , function(req,res,next){

   var student = JSON.parse(req.body.student);
   console.log(student);

   // Save the member details
   var member = new Member({
      name : student.name,
      username : student.regId,
      password : student.password,
      memberType: MemberType.STUDENT,
      address : student.address,
      age : Number(student.age),
      email : student.email
   });

   member.save(function(error,member){
      if(error){
         console.log(error.toString());
         return next(error);
      }
      console.log("no error at member");
      console.log(member);
      // Save the student details
      var newStudent = new Student({
         memberId : member._id,
         registrationId : student.regId,
         program : student.program,
         semester : Number(student.semester)
      });

      newStudent.save(function(error){
         if(error){
            console.log(error);
            return next(error);
         }
         return res.send({message : "Student Succesfully saved"});
      });
   });

});

router.post('/update' , function(req,res,next){
   var student = JSON.parse(req.body.student);
   console.log(student);

   Member.update({username : student.regId},{
      name : student.name,
      memberType: MemberType.STUDENT,
      address : student.address,
      age : Number(student.age),
      email : student.email
   },function(error){
      if(error){
         return next(error);
      }
      Student.update({registrationId : student.regId},{
         program : student.program,
         semester : Number(student.semester)
      },function(error){
         if(error){
            next(error);
         }
         return res.send({message : 'Successfully update'});
      });
   });

});

router.post('/delete' , function(req,res,next){
   var regId = req.body.regId;
   Student.findOne({registrationId : regId},function(error,student){
      if(error){
         return next(error);
      }
      if(!student){
         return req.flash('error','student not found');
      }
      memberId = student.memberId;
      Student.remove({_id : student._id},function(error){
         if(error){
            return next(error);
         }
         Member.remove({_id : memberId},function(error){
            if(error){
               return next(error);
            }
            return res.send({message : 'successfully deleted'});
         });
      })

   });
});

router.get('/view', function(req,res,next){
   var registrationId = req.query.regId;
   Student.findOne({registrationId: registrationId},function(error,student){
      if(error){
         return next(error);
      }
      if(!student){
         req.flash('error','Student not found');
         return;
      }
      Member.findOne({_id : student.memberId},function(error,member){
         if(error){
            return next(error);
         }
         if(!member){
            return req.flash('error','Student not found');
         }
         var result = {};

         result.student = student;
         result.member= member;

         return res.send({data : result});
      });
   });
});

module.exports = router;