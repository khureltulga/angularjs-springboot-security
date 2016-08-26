;
"use strict";
var app = angular.module('app', []);

app.controller('mainCtrl', function($scope, $window, $http){

    $http.get('/api/applications').success(function(data) {
  		  $scope.apps = data;
  	  }).error(function(response) {
  		  console.log(response);
  	  });
    
    $scope.open = function(url) {
        $window.open(url);
      };

});