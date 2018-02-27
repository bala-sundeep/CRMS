var crms = angular.module('crms',['ngRoute','appRoutes']);
crms.controller('crmsCtrl',function ($rootScope,$location) {

	$rootScope.loc=$location.url();
});

crms.run(function($rootScope,$location){
	$rootScope.$on("$locationChangeStart",function(event,next,current){
	$rootScope.loc=$location.url();
	});
});