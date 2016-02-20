var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://checker:bakatenshi1@ds049864.mongolab.com:49864/checkins');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('open');
});

var CheckinSchema = mongoose.Schema({
  'id': String,
  time: {
    type: Date,
    default: Date.now
  }
});

var Checkin = mongoose.model('Checkin', CheckinSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/checkins', function(req, res, next) {
  Checkin.find().sort({
    date: -1
  }).exec(function(err, result) {
    res.send(result);
  });
});

router.get('/check', function(req, res, next) {
  var id = req.query.id;
  var currendCheck = new Checkin({
    id: id
  });
  currendCheck.save();
  res.send('done');
});

module.exports = router;
