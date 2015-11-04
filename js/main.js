// Create application with dependency 'firebase'
var myApp = angular.module('myApp', ['firebase'])

// Bind controller, passing in $scope, $firebaseAuth, $firebaseArray, $firebaseObject
myApp.controller('myCtrl',function($scope, $firebaseAuth, $firebaseArray, $firebaseObject) {
    // Create a variable 'ref' to reference your firebase storage
    var ref = new Firebase("https://twitter-demo.firebaseio.com");

    // Create references to store tweets and users
    var tweetsRef = ref.child('tweets')
    var usersRef = ref.child('users')

    // Create a firebaseArray of your tweets, and store this as part of $scope
    $scope.tweets = $firebaseArray(tweetsRef);

    // Create a firebaseObject of your users, and store this as part of $scope
    $scope.users = $firebaseObject(usersRef);
	
    // Create authorization object that referes to firebase
    $scope.authObj = $firebaseAuth(ref);

	// Test if already logged in
	var authData = $scope.authObj.$getAuth();
	if ($scope.authObj.$getAuth()) {
		$scope.userId = authData.uid;
	  	console.log("Logged in as:", authData.uid);
	} else {		
	  	console.log("Not logged in");
	}

    // SignUp function
    $scope.signUp = function() {

    	// Create user
		$scope.authObj.$createUser({
			email: $scope.email,
			password: $scope.password, 			
		})

		// Once the user is created, call the logIn function
		.then($scope.logIn)

		// Once logged in, set and save the user data
		.then(function(authData) {
			$scope.userId = authData.uid;
			$scope.users[authData.uid] ={
				handle:$scope.handle, 
				userImage:$scope.userImage,
			}
			$scope.users.$save()
		})

		// Catch any errors
		.catch(function(error) {
			console.error("Error: ", error);
		});
    }
	
	// SignIn function
	$scope.signIn = function() {
		$scope.logIn().then(function(authData){
			$scope.userId = authData.uid;
		})
	}

	// LogIn function
	$scope.logIn = function() {
		return $scope.authObj.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		})
	}

	// LogOut function
	$scope.logOut = function() {
		$scope.authObj.$unauth()
		$scope.userId = false
	}
	
	// Function to save a tweet
	$scope.tweet = function() {
		
		// Add a new element to the tweets array
		$scope.tweets.$add({
			text:$scope.newTweet, 			
			userId:$scope.userId,
			likes:0,
			time:Firebase.ServerValue.TIMESTAMP 
		})

		// Once the tweet is saved, reset the value of $scope.newTweet box
		.then(function() {
			$scope.newTweet = ''
		})
	}

	// Function to like a tweet
	$scope.like = function(tweet) {
		tweet.likes += 1
		$scope.tweets.$save()		
	}
})
