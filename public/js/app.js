var app = angular.module('ExerciseApp', []);


app.controller('mainController',['$scope', '$http', '$location', '$window',
function($scope, $http, $location, $window){

		$scope.searchWorkouts = '';
   		$scope.workoutName = '';
		$scope.reps = '';
		$scope.weight = '';
		$scope.distance = '';
		$scope.time = '';
		$scope.id = '';
		$scope.validTime = '';
		$scope.newCardioForm = false;
		$scope.newLiftingForm = false;
		$scope.workoutTable = false;
		$scope.cardioTable = false;

		//simple toggle methods
		$scope.toggleNewLift = function(){
			$scope.newLiftingForm = ! $scope.newLiftingForm;
		}
		$scope.toggleLiftingEdit = function(workoutID, workoutName,workoutReps, workoutWeight){
			$scope.id = workoutID;
			$scope.workoutName = prompt("Enter Workout Name",workoutName);
			$scope.reps = prompt("Enter Reps");
			$scope.weight = prompt("Enter Weight");
			$scope.editLiftingWorkout();
		}
		$scope.toggleNewCardio= function(){
			$scope.newCardioForm = ! $scope.newCardioForm;
		}
		$scope.toggleCardioEdit = function(workoutID, workoutName, distance, time, reps){
			$scope.id = workoutID;
			$scope.workoutName = prompt("Enter Workout Name",workoutName);
			$scope.distance = prompt("Enter Distance");
			$scope.time = prompt("Enter Time");
			$scope.validateTime($scope.time);
			$scope.reps = prompt("Enter Reps");
			$scope.editCardioWorkout();
		}
		$scope.toggleWorkoutTable = function(){
			$scope.workoutTable = ! $scope.workoutTable;
		}
		$scope.toggleCardioTable = function(){
			$scope.cardioTable = ! $scope.cardioTable;
		}

	
		$http.get('/api/workouts/test')
			.success(function(result){
				$scope.workouts = result;
			})
		    .error(function(data,status){
				console.log('error!');
				console.log(data);
			});

    $scope.createLiftingWorkout = function () {

		$http.post('/api/workout/createLifting', { workoutName: $scope.workoutName, 
											reps: $scope.reps, 
											weight: $scope.weight,
									})
            .success(function (result) {
                $scope.msg="Success";
				$window.location.reload();
            })
            .error(function (data, status) {
                console.log(data);
            });
		};

		$scope.editLiftingWorkout = function(){
			$http.post('/api/workout/editLifting', {workoutName: $scope.workoutName, 
									reps: $scope.reps, 
									weight: $scope.weight,
									id: $scope.id
									})
           .success(function (result) {
                $scope.msg="updated";
				$window.location.reload();
            })
            .error(function (data, status) {
                console.log(data);
            });

		}

		$scope.createCardioWorkout = function(){

			if($scope.validTime === "valid"){
			$http.post('/api/workout/createCardio', { workoutName: $scope.workoutName, 
											distance: $scope.distance,
											time: $scope.time,
											reps: $scope.reps
									})
            .success(function (result) {
                $scope.msg="Success";
				$window.location.reload();
            })
            .error(function (data, status) {
                console.log(data);
            });
		}
			else if ($scope.validTime === "invalid") {
				window.alert("Enter(hh:mm:ss)");
			}
		}

		$scope.editCardioWorkout = function(){
			if($scope.validTime === "valid"){
			$http.post('/api/workout/editCardio', {workoutName: $scope.workoutName, 
									distance: $scope.distance, 
									time: $scope.time,
									reps: $scope.reps,
									id: $scope.id
									})
           .success(function (result) {
                $scope.msg="updated";
				$window.location.reload();
            })
            .error(function (data, status) {
                console.log(data);
            });
			}
			else if($scope.validTime === "invalid"){
				window.alert("Enter(hh:mm:ss)");
			}
		}
		
	//Deletes Workout
	$scope.deleteClick = function(x){
		$http.delete('/api/workout/remove/'+x)
		.success(function (result) {
			$window.location.reload();					
			$scope.msg = "Data Deleted Successfully!";
		})
        .error(function (data, status) {
    	     console.log(data);
      });		
	};	
    
	//regex to validate time
	$scope.validateTime = function(x){
		console.log("here");

		var regex = /^([0-9]:)?([0-5]?[0-9]:)?[0-5]?[0-9]$/;
		if(x == null){
			console.log("null");
		}

		else if(x.match(regex)){
			console.log("valid");
			$scope.validTime = "valid";
		}
		else{
			console.log("invalid");
			$scope.validTime = "invalid";
		}
	}

}]);