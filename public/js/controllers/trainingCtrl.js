
crms.controller('trainingCtrl',function($scope,$http,$location)
{
    console.log("in training ctrl");
    $scope.data="hi";
    $http({
        method:'GET',
        url:'student/alltraining'

    }).then(function(response)
{$scope.data=response.data;
	console.log($scope.data);},function(err)
{
console.log("error reading");
});
});