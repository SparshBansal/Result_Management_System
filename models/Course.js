/**
 * Created by sparsh on 11/11/16.
 */
var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    courseName: {type: String, required: true, unique: true},
    maxMarks: {type: Number},
    credits: {type: Number},
    hours: {type: Number}
});

var Course = mongoose.model("Course",courseSchema);
module.exports = Course;