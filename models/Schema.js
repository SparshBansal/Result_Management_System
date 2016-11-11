/**
 * Created by sparsh on 11/11/16.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({
    courseCount : {type : Number , required:true},
    courses : {type : Array},
    semester : {type : Number , required : true},
    programCode : {type : String , required : true}
});

var Schema = mongoose.model(schema);
module.exports = Schema;