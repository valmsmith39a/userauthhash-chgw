var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('inside get of users router');
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  console.log('inside register in users router file!!!!!!');
  var userObj = {};
  userObj.username = req.body.username; 
  userObj.password = req.body.password;

  User.register(userObj, function(err, data){
    console.log('err in register is: ', err);
    console.log('data in register is: ', data);
    res.send('respond with a resource');
  }); 
});

router.post('/login', function(req, res, next) {
  console.log('inside login in users router file!!!!!!');
  var userObj = {};
  userObj.username = req.body.username; 
  userObj.password = req.body.password;
  console.log('user obj is: ', userObj);
  
  User.login(userObj, function(err, data){
    console.log('err in register is: ', err);
    console.log('data in register is token: ', data);
    res.send('respond with a resource');
  }); 
});

module.exports = router;
