var app = angular.module('userAuthHash', ['ngStorage']);

app.controller("usersCtrl", function($scope, $localStorage, AuthService, User) {
  $scope.register = function() {
    var regObject = $scope.registerInput;  
    console.log('reg object is: ', regObject);
    AuthService.registerUser(regObject)
    .then(function(res){
      console.log('successful registration, res is: ', res);
    });
  };

  $scope.login = function() {
    console.log('login input is: ', $scope.loginInput);
    AuthService.loginUser($scope.loginInput)
    .then(function(res) {
      console.log('successful login, res is: ', res.data);
      // Save in local storage 
      // Use factory to check each time you do a get or post 
      $localStorage.token = res.data.token;  
      $scope.token = User.token;  
    });
  };
});

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

app.controller('navCtrl', function($scope, $localStorage) {
  $scope.$watch(function() {
    return $localStorage.token;
  }, function(newVal) {
    $scope.isLoggedIn = newVal;
  })
})

app.service("User", function($localStorage) {
  this.token = $localStorage.token;
});

app.config(function($httpProvider) {
 $httpProvider.interceptors.push('httpRequestInterceptor');
});

//send headers with requests
app.factory('httpRequestInterceptor', function(User) {
 return {
   request: function(config){
     if(User.token){
       config.headers = {'Authentication': 'Bearer ' + User.token}
     }
     return config;
   }
 };
});