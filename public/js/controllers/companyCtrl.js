crms.controller('companyCtrl', ['$scope','$http','$routeParams', function($scope, $http, $routeParams) {
    console.log('hi');
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
        
    })
  }]);