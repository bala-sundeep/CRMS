crms.controller('profileCtrl',function ($scope, $http, $location,$window) {
    console.log('in profile');
        $http({
			method : 'GET',
			url    : '/student/myProfile'
		}).then(function(response){
           
          console.log(response.data.studentName);
          $scope.data=response.data;
         
        });
           
    $scope.update=function(s){
        console.log('update clicked');
        $http({
        method: 'POST',
        url   : '/student/update',
        headers: {'Content-Type':'application/json'},
        data   : angular.fromJson($scope.data)
    }).then(function(response){
    
    console.log('response of post update');
    },function(err){
        console.log('err');
    });
    }
    });