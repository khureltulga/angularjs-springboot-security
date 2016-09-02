;
"use strict";
var app = angular.module('app', ['infinite-scroll','ngRoute','ksSwiper']);

app.controller('mainCtrl', function($scope, $window, $http){
	$scope.size = 8;
	$scope.page = 0;
	$scope.apps = [];
	$http.get('/api/get_configs').success(function(data) {
		$scope.settings = data;
	}).error(function(response) {
		console.log(response);
	});

	$http.get('/api/applications?size='+$scope.size+'&page='+$scope.page+'&sort=id,desc').success(function(data) {
		for(i=0;i<data.data.length;i++){
			$scope.apps.push(data.data[i]);
		}
		$scope.total = data.total;
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
	
	$scope.loadMore = function(){
		if ($scope.total > $scope.apps.length){
			$scope.page = $scope.page + 1;
			$http.get('/api/applications?size='+$scope.size+'&page='+$scope.page+'&sort=id,desc').success(function(data) {
				for(i=0;i<data.data.length;i++){
					$scope.apps.push(data.data[i]);
				}
				$scope.total = data.total;
			}).error(function(response) {
				console.log(response);
			});
		}
		
	}
	
	$scope.getClass = function(){
		return "style" + (Math.floor(Math.random() * (6 - 1 + 1)) + 1);
	}

});

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: '/home/layouts/index.html'
	})
	.when('/about',{
		templateUrl: '/home/layouts/about.html'
	})
	.otherwise(
			{ redirectTo: '/'}
	);
});
