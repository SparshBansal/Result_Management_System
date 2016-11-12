var express = require('express');
var router = express.Router();

var Member = require('../models/Member');
var MTypes = require('../MemberType');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', {title:'SE Project'});
});

module.exports = router;
