	crms.controller('feedbackCtrl', ['$scope','$http','$routeParams', function($scope, $http, $routeParams) {
    var param1 = $routeParams.param1;
/*    var companyName={
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
*/
	$scope.submitFeedback = function(f){
		
		var feedback = {
			trainee: f.trainee,
			rating:  f.rating,
			feedback: f.feedback

		};
		$http({
			method : 'POST',
			url    : '/feedback/add',
			headers: {'Content-Type':'application/json'},
			data   : angular.fromJson(feedback)
		}).then(function(response){
			$scope.addRmsg="Successfully Added";
			f.trainee="";
			f.feedback=""	
				});
	}; 

} ]);



