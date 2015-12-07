var MovieApp = angular.module('MovieApp', ['ngRoute']);

MovieApp.config(function($routeProvider){
	// Lisää reitit tänne
        
          $routeProvider
            .when('/', {
              controller: 'HomeController',
              templateUrl: 'templates/home.html'
            })
            .when('/movies', {
              controller: 'MoviesController',
              templateUrl: 'templates/movies.html'
            })
            .otherwise({
              redirectTo: '/'
            });
});

MovieApp.controller('HomeController', function($scope, $location) {
	
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

MovieApp.controller('MoviesController', function($scope) {
    $scope.message = "Leffat";
});