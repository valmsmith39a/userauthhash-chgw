var app = angular.module('userAuthHash', ['ngStorage']);

app.controller("usersCtrl", function($scope, $localStorage, AuthService) {
  $scope.register = function() {
    var regObject = $scope.registerInput;  
    console.log('reg object is: ', regObject);
    debugger;   
    AuthService.registerUser(regObject)
    .then(function(res){
      console.log('successful registration, res is: ', res);
    });
  };

  $scope.login = function() {

    console.log('login input is: ', $scope.loginInput);
    debugger;
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

app.controller('navCtrl', function($scope, $localStorage) {
  //$scope.isLoggedIn = AuthService.token; 
  $scope.isLoggedIn = $localStorage.token; 
})

app.config(function($httpProvider) {
 $httpProvider.interceptors.push('httpRequestInterceptor');
});

app.service("AuthService", function($http, $localStorage) {

  this.registerUser = function(regObject) {
    console.log('register user function', regObject);
    return $http.post('/users/register', regObject);
  };

  this.loginUser = function(loginObject) {
    console.log('login user function', loginObject);
    return $http.post('/users/login', loginObject);
  };

  this.logoutUser = function() {
    $localStorage.token = '';
  };
});

//send headers with requests
app.factory('httpRequestInterceptor', function($localStorage){
 return {
   request: function(config){
     if($localStorage.token){
       config.headers = {'Authentication': 'Bearer ' + $localStorage.token}
     }
     return config;
   }
 };
 
 return {
   request: function(config){
     if(AuthService.token){
       config.headers = {'Authentication': 'Bearer ' + AuthService.token}
     }
     return config;
   }
 };
 
});
