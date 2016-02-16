var app = angular.module('userAuthHash', ['ngStorage']);

app.controller("usersCtrl", function($scope, $localStorage, AuthService) {
  $scope.$storage = $localStorage; 

  $scope.register = function() {
    var regObject = $scope.registerInput;     
    AuthService.registerUser(regObject)
    .then(function(res){
      console.log('successful registration, res is: ', res);
    });
  };

  $scope.login = function() {
    AuthService.loginUser($scope.loginInput)
    .then(function(res) {
      console.log('successful login, res is: ', res.data);
      // Save in local storage 
      // Use factory to check each time you do a get or post 
      if(!$localStorage.token) {
        $localStorage.token = res.data;  
      } 
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

