crms.controller('trainingCtrl',function($scope,$http,$location,$window)
{
    console.log("in training ctrl");
    $scope.data="hi";
    $http({
        method:'GET',
        url:'training/alltraining'

    }).then(function(response)
{$scope.data=response.data;
	console.log($scope.data);},function(err)
{
console.log("error reading");
});
	
$scope.addTraining = function(s){
    var training = {
    trainee       : s.trainee,
    duration        : s.duration,
    startDate     : s.startDate,
    endDate     : s.endDate,
    timings       : s.timings,
    topics       :s.topics

    };
    $http({
        method : 'POST',
        url    : '/training/add',
        headers: {'Content-Type':'application/json'},
        data   : angular.fromJson(training)
    }).then(function(response){
        if(response.data.m=="exists"){
            $scope.addRmsg="user already exists";
        }else{
        $scope.addRmsg="Successfully added";
     s.trainee="";
     s.duration="";
    s.startDate="";
    s.endDate="";
    s.timings="";
    s.topics="";
    
        }
    },function myError(response) {
        $scope.addRmsg = "Error occured";
    });;
}; 
$scope.giveFeedback = function(name){
		$window.location.href="http://localhost:3000/addFeedback/:"+name;
	}

});