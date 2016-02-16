'use strict'

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;
var bcrypt = require('bcrypt-node');
var User; 

var userSchema = new mongoose.Schema({
  username:{type:String, required:true},
  password:{type:String, required:true}
});

// Mongoose middleware - a presave hook 
userSchema.pre('save', function(next) {
  // Hash the password
  // Only want to do this for new users. Prevent from happening if only 
  // updating our user 
  // We only salt the hash for new users. 
  if(!this.isNew) return next(); 
  // use Javascript ES6 ' => function ' so that this.password will refer to above 
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      this.password = hash; 
      next(); 
    });
  });
});

userSchema.statics.register = function(userObject, callback) {
  // user will look like this {username: _____, password:______ }
  // Need to make sure username is unique. 
  User.findOne({username:userObject.username}, function(err, dbUser) {
    if(err || dbUser) return callback(err || 'Username already taken');

    // Make a pre-save hook 
    User.create(userObject, function(err, savedUser) {
      savedUser.password = ''; // remove hash from server 
      callback(err, savedUser);
    });
  });
};

userSchema.statics.login = function(userObject, callback) {
  // user will look like this {username: _____, password:______ }
  // Need to make sure username is unique. 
  // Authenticate 
  // Create the token 
  // Save the toke in local storage 

  User.findOne({username:userObject.username}, function(err, dbUser) {
    //if(err || !dbUser) return callback(err || 'Username already taken');
    // if find, then check hash

    console.log('user object is: ', userObject.username);

    bcrypt.compare(userObject.password, dbUser.password, function(err, res) {
        console.log('res is: ', res);
        var token = User.generateToken();
        callback(err, token);
    });
  });
  /*
  User.findOne({uid: authData.uid}, function(err, user) {
      var token = user.generateToken();
      res.cookie('mytoken', token).send();
  });
  */
};

// Instance method to generate token
userSchema.statics.generateToken = function() {
  var payload = {
    _id: this._id
  };
  var token = jwt.encode(payload, JWT_SECRET);

  return token;
};

/*
userSchema.statics.isAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send()
  }
  var authHeader = req.headers.authorization.split(' '); /// 'Bearer' ...aerra token
  
  var token = authHeader[1];
}
*/

User = mongoose.model('User', userSchema);

module.exports = User; 