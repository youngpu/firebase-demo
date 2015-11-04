// Create application
var myApp = angular.module('myApp', ['firebase'])

// Bind controller myCtrl
myApp.controller('myCtrl',function($scope, $firebaseAuth) {
    // Create firebase reference
    var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");

    // Create authorization object that referes to firebase
    $scope.authObj = $firebaseAuth(ref);

    // Create user
    $scope.signUp = function() {
		$scope.authObj.$createUser({
			email: $scope.email,
			password: $scope.password
		})
		.then(function(userData) {
			console.log("User " + userData.uid + " created successfully!");
			return $scope.authObj.$authWithPassword({
				email: $scope.email,
				password: $scope.password
			})
		}).then(function(authData) {
			console.log("Logged in as:", authData.uid);
		}).catch(function(error) {
			console.error("Error: ", error);
		});

    }
	
	$scope.user = {}
	$scope.submit = function() {
		alert('Name: ' + $scope.user.username + '   Email:' + $scope.user.email)
	}
})
