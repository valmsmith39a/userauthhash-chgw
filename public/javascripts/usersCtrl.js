var app = angular.module('userAuthHash', []);

app.controller("usersCtrl", function($scope, $http, AuthService) {
  $scope.register = function() {
    console.log('username in login is: ', $scope.registerInput);
    var regObject = $scope.registerInput;     
    AuthService.registerUser(regObject)
    .then(function(res){
      console.log('successful registration, res is: ', res);
    });
  };

  $scope.login = function() {
    console.log('login function in ctrl');
    console.log('username in login is: ', $scope.loginInput);
    AuthService.loginUser($scope.loginInput)
    .then(function(res){
      console.log('successful login, res is: ', res);
    });
  };
});

app.service("AuthService", function($http) {

  this.registerUser = function(regObject) {
    console.log('register user function', regObject);
    return $http.post('/users/register', regObject);
  };

  this.loginUser = function(loginObject) {
    console.log('register user function', loginObject);
    return $http.post('/users/login', loginObject);
  };
});

