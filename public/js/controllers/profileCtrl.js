crms.controller('profileCtrl',function ($scope, $http, $location,$window) {
    console.log('in profile');
        $http({
			method : 'GET',
			url    : '/student/myProfile'
		}).then(function(response){
           
          console.log(response.data.studentName);
          $scope.data=response.data;
         
        });
        $http({
            method : 'GET',
            url    : '/student/myImage',
         responseType   : 'arraybuffer'
        }).then(function(response){
           
          console.log(response);
          $scope.str = _arrayBufferToBase64(response.data);
    
        $scope.data.image=response.data;
         
        });
        function _arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
          }
           
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