var app = angular.module('userAuthHash', []);

app.controller("usersCtrl", function($scope, $http, AuthService) {
  $scope.register = function() {
    console.log('register function in ctrl')
    console.log('username in login is: ', $scope.registerInput);
    AuthService.registerUser();
  };

  $scope.login = function() {
    console.log('login function in ctrl');
    console.log('username in login is: ', $scope.loginInput);

  };
});

app.service("AuthService", function($http) {
  console.log('In Users service');

  this.registerUser = function() {
    console.log('register user function');
  };

  this.loginUser = function() {
    console.log('register user function');
  };
});