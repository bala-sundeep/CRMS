var crms = angular.module('crms',['ngRoute','appRoutes']);
crms.controller('crmsCtrl',function ($scope,$http,$rootScope,$location,$window) {

	$rootScope.loc=$location.url();
	$scope.logout = function (){
		$http({
		method: 'GET',
		url   : '/logout'
	}).then(function(response){
		 $window.location.href="http://localhost:3000/";
	},function(err){
		console.log('err');
	});
	}
});

crms.run(function($rootScope,$location){
	$rootScope.$on("$locationChangeStart",function(event,next,current){
	$rootScope.loc=$location.url();
	});
});