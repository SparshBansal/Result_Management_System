/**
 * Created by sparsh on 11/11/16.
 */

var mongoose = require('mongoose');

var marksSchema = mongoose.Schema({
    studentId : {type : mongoose.Schema.Types.ObjectId,required : true},
    semester : {type: Number},
    marks : {type : mongoose.Schema.Types.Mixed}
});

var Marks = mongoose.model("Marks",marksSchema);
module.exports = Marks;