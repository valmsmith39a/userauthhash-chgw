
var app = angular.module('userAuthHash');

app.service("AuthService", function($http) {

  this.registerUser = function(regObject) {
    console.log('register user function', regObject);
    return $http.post('/users/register', regObject);
  };

  this.loginUser = function(loginObject) {
    console.log('login user function', loginObject);
    return $http.post('/users/login', loginObject);
  };

  this.logoutUser = function() {
    User.token = '';
  };
});

