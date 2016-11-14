/**
 * Created by sparsh on 11/11/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var SALT_FACTOR = 10;

var memberSchema = mongoose.Schema({
    username: {type: String, required: true , unique : true},
    password: {type: String, required: true},
    name : { type : String , required : true},
    memberType: {type: Number, required: true},
    address: {type: String},
    age: {type: Number},
    email: {type: String}
});

memberSchema.methods.getName = function () {
    return this.username;
};

var noop = function () {
};

memberSchema.pre('save', function (done) {
    var member = this;
    if (!member.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (error, salt) {
        if (error) {
            done(error);
        }
        bcrypt.hash(member.password, salt, noop, function (error, hashedPassword) {
            if (error) {
                done(error);
            }
            console.log(hashedPassword);
            member.password = hashedPassword;
            done();
        });
    })
});

memberSchema.methods.checkPassword = function(guess,done){
    bcrypt.compare(guess,this.password , function(error,isMatch){
        return done(error,isMatch);
    });
};

var Member = mongoose.model("Member",memberSchema);
module.exports = Member;
