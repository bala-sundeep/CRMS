crms.controller('statusCtrl',function($scope,$location,$http){
    console.log("in status Ctrl");
    $scope.status="not placed";
    $http({
        method:'GET',
        url:'student/getStatus'

    }).then(function(response)
{$scope.data=response.data;
    if($scope.data.placed===true)
    {
        $scope.status="placed";
        $scope.icon=true;//&#10060;
    }
    else{
        $scope.data.company="-";
        $scope.data.package="-";
        $scope.icon=false;//&#9989;
    }
    
	console.log($scope.data);},function(err)
{
console.log("error reading");
});
});