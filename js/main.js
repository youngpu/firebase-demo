// Create application with dependency 'firebase'


// Bind controller, passing in $scope, $firebaseAuth, $firebaseArray, $firebaseObject

    // Create a variable 'ref' to reference your firebase storage


    // Create references to store tweets and users


    // Create a firebaseArray of your tweets, and store this as part of $scope


    // Create a firebaseObject of your users, and store this as part of $scope

	
    /* 
		-- Insert authentication code here
    */
	
	// Write an accesible tweet function to save a tweet
		
		/* Add a new object to the tweets array using the firebaseArray .$add method. Inclue:
			text:text in textarea,
			userId:current user id,
			likes:0,
			time:Firebase.ServerValue.TIMESTAMP // tells firebase server to save timestamp
		*/
		

		// Once the tweet is saved, reset the value of $scope.newTweet to empty string


	// Function to like a tweet
	

