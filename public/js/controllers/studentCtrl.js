crms.controller('studentCtrl',function ($scope, $http, $location) {
	$scope.name="";
	$scope.addRmsg="";

	/* HTTP */
	$http({
		method: 'GET',
		url   : '/student/all'
	}).then(function(response){
		$scope.data=response.data;
	},function(err){
		console.log('err');
	});


	$scope.addStudent = function(s){
		console.log(s.name);
		var student = {
		name       : s.name,
		rno        : s.rno,
		branch     : s.branch,
		cource     : s.cource,
		year       : s.year,
		ssc        : s.ssc,
		inter      : s.inter,
		current    : s.current,
		project    : s.project, 
		nBclog     : s.nBclog,
	    placed     : s.placed,
	    package    : s.package,
		company    : s.company,
		password   : s.password,
		mobileNo   : s.mobileNo,
		email      :s.email,
		address    :s.address,
		fName       :s.fName,
		section     :s.section
		};
		$http({
			method : 'POST',
			url    : '/basic/add',
			headers: {'Content-Type':'application/json'},
			data   : angular.fromJson(student)
		}).then(function(response){
			if(response.data.m=="exists"){
				$scope.addRmsg="user already exists";
			}else{
			$scope.addRmsg="Successfully Added";
		 s.name="";
		 s.rno="";
		s.branch="";
		s.cource="";
		s.year="";
		s.ssc="";
		s.inter="";
		s.current="";
		s.project="";
		s.nBclog="";
	    s.placed="";
	    s.package="";
		s.company="";
		s.password="";
		s.mobileNo="";
		s.email="";
		s.address="";
		s.fName="";
		s.section="";
			}
		});
	}; 

} );