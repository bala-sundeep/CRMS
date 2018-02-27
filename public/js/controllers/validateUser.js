
crms.controller('validateUser',function ($scope, $http, $location) {
    $scope.user="";
    console.log($scope.user);
    $scope.addStudent=function(){
        var login = {
            roll : $scope.user,
            password : $scope.password
        };
        $http({
			method : 'POST',
			url    : '/student/authenticate',
			headers: {'Content-Type':'application/json'},
			data   : angular.fromJson(login)
		}).then(function(response){
            login.roll="";
            login.password="";
        });
    };
    
});