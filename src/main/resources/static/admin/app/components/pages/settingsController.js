angular
.module('altairApp')
.controller('settingsCtrl', [
                             '$rootScope',
                             '$scope','$http','$state',
                             function ($rootScope,$scope,$http,$state) {
                            	 if ($rootScope.authenticated) {
	                            	 $scope.init = function(){
	                            		 $http.get('/api/get_configs').success(function(data) {
	                            			 $scope.site_settings = data;
	                            		 }).error(function(response) {
	                            			 console.log(response);
	                            		 });
	                            	 }
	
	                            	 $scope.saveSettings = function($event) {
	                            		 $event.preventDefault();
	                            		 var data = JSON.stringify($scope.site_settings, null, 2);
	                            		 $http({method: "POST", url: "/api/save_settings", data: data}).
	                            		 then(function(response) {
	                            			 UIkit.notify("<i class='uk-icon-check'></i> Амжилттай хадгалагдлаа.", {status:'success',pos:'bottom-right',timeout: 2000});
	                            		 }, function(response) {
	                            			 console.log(response);
	                            		 });
	                            		 //UIkit.modal.alert('<p>Site settings:</p><pre>' + data + '</pre>');
	                            	 }
                            	 }
                            	 else{
                            		 $state.go('login');
                            	 }
                             }
                             ]);