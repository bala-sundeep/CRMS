crms.controller('companyCtrl', ['$scope','$http','$routeParams', function($scope, $http, $routeParams) {
    console.log('hi');
    $scope.addRmsg=" ";
    var param1 = $routeParams.param1;


    var companyName={
        'name': param1.substring(1)
    }

    $http({
        method : 'POST',
        url    : '/company/specific',
        headers: {'Content-Type':'application/json'},
        data   : angular.fromJson(companyName)
    }).then(function(response){
        $scope.company=response.data;
        
    });

$scope.applyCompany=function(name)
 {    
    console.log(name+" currently applying");
    $http({
        method : 'POST',
        url    : '/apply/new',
       params: {name: name}
    }).then(function(res){
      
        $scope.addRmsg="Successfully applied";   
    console.log($scope.addRmsg);
    });
};



}]);