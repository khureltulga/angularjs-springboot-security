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
	                            			 if ($scope.site_settings.slider_items == null || $scope.site_settings.slider_items == undefined){
	                            				 $scope.site_settings.slider_items = [];
	                            			 }
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
	                            	 
	                            	 $("#image_chooser_selector").kendoUpload({
							                async: {
							                    saveUrl: "/api/upload_image",
							                    removeUrl: "remove",
							                    autoUpload: true
							                },
							                multiple: false,
							                showFileList: false,
							                success: function(e){
							                	$scope.site_settings.logo = e.response.result;
							                }
							            });
	                            	 
	                            	 $scope.removeSliderItem = function(index){
	                            		 $scope.site_settings.slider_items.splice(index,1);
	                            	 }
	                            	 
	                            	 $("#slider_image_add").kendoUpload({
							                async: {
							                    saveUrl: "/api/upload_image",
							                    removeUrl: "remove",
							                    autoUpload: true
							                },
							                multiple: false,
							                showFileList: false,
							                success: function(e){
							                	console.log($scope.site_settings);
							                	$scope.site_settings.slider_items.push(e.response.result);
							                }
							            });
                            	 }
                            	 else{
                            		 $state.go('login');
                            	 }
                             }
                             ]);