/**
 * Created by sparsh on 11/11/16.
 */
var mongoose = require('mongoose');

var programSchema = mongoose.Schema({
    code : {type: String , required : true , unique : true},
    name : {type: String},
    semesterCount : {type : Number},
    semester : {type : Array}
});

var Program = mongoose.model("Program",programSchema);
module.exports = Program;