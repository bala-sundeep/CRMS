angular.module('appRoutes',[])
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
	.when('/login',{
		templateUrl: 'views/login1.html',
		controller :  'validateUser'
	})
	.when('/home',{
		templateUrl: 'views/home.html',
		controller: 'showDetails'
	})
	.when('/recruiters',{
		templateUrl: 'views/recruiters.html',
		controller : 'recruitCtrl'
	})
	.when('/studentdetails',{
		templateUrl: 'views/students.html',
		controller : 'studentCtrl'
	})
	.when('/addRecruiter',{
		templateUrl: 'views/addRecruiter.html',
		controller : 'recruitCtrl'
	})
	.when('/trainings',{
		templateUrl: 'views/training.html',
		controller : 'trainingCtrl'
	})
	.when('/addstudent',{
		templateUrl: 'views/addstudent.html',
		controller : 'studentCtrl'
		
	})
	.when('/profile',{
		templateUrl:'views/profile.html',
		controller:'profileCtrl'
	})
	.when('/update',{
		templateUrl:'views/update.html',
	controller:'profileCtrl'
	})
	.when('/addTraining',{
		templateUrl:'views/addTraining.html',
	controller:'trainingCtrl'
	})
	.when('/status',{
		templateUrl:'views/status.html',
	controller:'statusCtrl'
	});
	
	$locationProvider.html5Mode(true);
}]);