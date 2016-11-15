var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');

var Member = require('./models/Member');

var express_session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local');


var routes = require('./routes/index');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '.')));

// Connect to the database
mongoose.connect('mongodb://localhost:27017/SEDb');

app.use(express_session({
    secret: 'some secret key',
    resave: false,
    saveUninitialized: false
}));

// Flash Middleware
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use(function (req, res, next) {
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});


// .....................Passport Authentication.........................
passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    Member.findOne({username: username}, function (error, member) {
        if (error) {
            return done(error);
        }
        if (!member) {
            return done(null, false, {message: 'Incorrect Username'});
        }

        member.checkPassword(password, function (checkError, isMatch) {
            if (checkError)
                return done(checkError);
            if (!isMatch)
                return done(null, false, {message: 'Incorrect Password'});
            done(null, member);
        });
    });
}));

passport.serializeUser(function (member, done) {
    return done(null, member._id);
});

passport.deserializeUser(function (_id,done) {
    Member.findOne({_id: _id}, function (error, member) {
        done(error, member);
    });
});



//......................ROUTING HANDLERS......................................
app.use('/', routes);
app.use('/login', login);
app.use('/dashboard',dashboard);
app.use('/api',api);
//........................ERROR HANDLERS.......................................

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// ....................... ERROR HANDLERS END..........................
module.exports = app;
