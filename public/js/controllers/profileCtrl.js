crms.controller('profileCtrl',function ($scope, $http, $location,$window) {
    console.log('in profile');
        $http({
			method : 'GET',
			url    : '/student/myProfile'
		}).then(function(response){
           
          console.log(response.data.studentName);
          $scope.data=response.data;
         
        });
    });