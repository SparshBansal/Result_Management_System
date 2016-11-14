/**
 * Created by sparsh on 14/11/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = mongoose.Schema({
    memberId : {type : Schema.Types.ObjectId , required : true},
    registrationId : {type : String , required : true, unique : true},
    program : {type : String, required : true},
    semester : {type : Number , required : true}
});

var Student = mongoose.model('student',studentSchema);

module.exports = Student;