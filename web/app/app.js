var MovieApp = angular.module('MovieApp', ['firebase', 'validation.match', 'ngRoute']);

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
			.when('/movies/:id', {
              controller: 'MoviesController',
              templateUrl: 'templates/movie.html'
            })
			.when('/movies/new', {
              controller: 'HomeController',
              templateUrl: 'templates/home.html'
            })
            .otherwise({
              redirectTo: '/'
            });
});

MovieApp.controller('HomeController', function($scope, FirebaseService, $location, $routeParams) {
	
	$scope.movies = FirebaseService.getMovies();
	
	if($scope.movies[$routeParams.id]){
		$scope.movies.forEach(function(movie){
           if (movie.id == $routeParams.id) {
			   $scope.currMovie = movie;
		   }
        });
	  }else{
		$scope.currMovie = null;
	}
	
	$scope.addMovie = function() {
		console.log("Add Movie!");
		$scope.movie.id = $scope.movie.id.split(' ').join('')
		FirebaseService.addMovies($scope.movie);
		
		//Redirect:
		$location.path('/movies');
	}
	
	$scope.removeMovie = function() {
		console.log("Remove Movie!");
	}
});

MovieApp.controller('MoviesController', function($scope, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();
});

MovieApp.service('FirebaseService', function($firebaseArray){
	var firebaseRef = new Firebase('fiery-heat-9158.firebaseIO.com/movies');
	var movies = $firebaseArray(firebaseRef);

	this.getMovies = function(){
	  return movies;
	}
	
	this.addMovies = function(movie){
	  movies.$add(movie);
	}
	
	this.getMovie = function(key, done){
		movies.$loaded(function(){
			done(movies.$getRecord(key));
		});
	}
	
	this.removeMovie = function(movie) {
		todos.$remove(movie);
	}
	
	this.saveMovie = function(movie) {
		movies.$save(movie);
	}
});