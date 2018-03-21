
crms.controller('validateUser',function ($scope, $http, $location,$window) {
    $scope.user="";
    $scope.addStudent=function(){
        
        var login = {
            roll : $scope.user,
            password : $scope.password
        };
        $http({
			method : 'POST',
			url    : '/basic/authenticate',
			headers: {'Content-Type':'application/json'},
			data   : angular.fromJson(login)
		}).then(function(response){
            login.roll="";
            login.password="";
            $window.location.href="http://localhost:3000/index"  ;
           //$http.get('/index');
          /* $http({
               method:'GET',
               url:'/index'
           }).then(function(response){
               console.log(response);
           });*/
        });
    };
});