;
"use strict";
var app = angular.module('app', []);

app.controller('mainCtrl', function($scope, $window, $http){


	$http.get('/api/get_configs').success(function(data) {
		$scope.settings = data;
	}).error(function(response) {
		console.log(response);
	});

	$http.get('/api/applications').success(function(data) {
		$scope.apps = data;
	}).error(function(response) {
		console.log(response);
	});

	$scope.open = function(url) {
		$window.open(url);
	};

	$scope.openPopup = function(app){
		$scope.app = app;
		$('#appDetailModal').modal('show');
	}

});