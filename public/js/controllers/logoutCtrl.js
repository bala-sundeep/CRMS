
crms.controller('logoutCtrl',function ($scope, $http, $location,$window) {
    console.log('logout');
        $http({
			method : 'GET',
			url    : '/student/logout'
		}).then(function(response){
           // $window.location.href="http://localhost:3000/"  ;
          
        });
    });