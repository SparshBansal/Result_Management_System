/**
 * Created by sparsh on 11/11/16.
 */
var moongoose = require('mongoose');

var programSchema = mongoose.Schema({
    code : {type: String , required : true , unique : true},
    name : {type: String},
    semesterCount : {type : Number},
    schema : {type : Array}
});

var Program = mongoose.model(programSchema);
module.exports = Program;