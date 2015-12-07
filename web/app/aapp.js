// Toteuta moduulisi tänne

var MovieApp = angular.module('MovieApp', ['firebase', 'validation.match', 'ngRoute']);

MovieApp.config(function($routeProvider, $locationProvider){
          $routeProvider
            .when('/', {
              controller: 'MovieController',
              templateUrl: 'templates/index.html'
            })
			.when('/movies/new', {
              controller: 'MovieController',
              templateUrl: 'templates/home.html'
            })
            .when('/movies', {
              controller: 'HomeController',
              templateUrl: 'templates/movie.html'
            })
            .otherwise({
              redirectTo: '/home'
            });
});

MovieApp.controller('HomeController', function($scope, $location) {
	$scope.movies = FirebaseService.getMovies();
});

MovieApp.controller('MovieController', function($scope, FirebaseService, $location) {
	console.log($location);
	$scope.movies = FirebaseService.getMovies();
	
	$scope.addMovie = function() {
		console.log("Add Movie!");
		FirebaseService.addMovies($scope.movie);
		
		//Redirect:
		$location.path('/movie.html');
	}
	
	$scope.listMovies = function() {
	}
	
});

MovieApp.service('FirebaseService', function($firebaseArray){
	var firebaseRef = new Firebase('fiery-heat-9158.firebaseIO.com/movies');
	var movies = $firebaseArray(firebaseRef);

	this.getMovies = function(){
	  return movies;
	}
	
	this.addMovies = function(movie){
	  console.log("Firebase add");
	  movies.$add(movie);
	}
});