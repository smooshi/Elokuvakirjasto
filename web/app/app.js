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
			.when('/search', {
              controller: 'SearchController',
              templateUrl: 'templates/search.html'
            })
			.when('/movies/:id', {
              controller: 'MoviesController',
              templateUrl: 'templates/movie.html'
            })
			.when('/movies/:id/edit', {
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

MovieApp.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

MovieApp.controller('SearchController', function($scope, APIService) {
	
	$scope.searchMovie = function() {
		$scope.searched = true;
		$scope.omdbMovies = [];
		
		if ($scope.searchName != null) {
			APIService.findMovie($scope.searchName).success(function(movies){
				movies.Search.forEach(function(movie){
					var mov = {name: movie.Title, year: movie.Year, imdbID: movie.imdbID}
					$scope.omdbMovies.push(mov);
				});
				
				$scope.num = $scope.omdbMovies.length;
			});		
		} else {
			APIService.findMovieY($scope.searchYear).success(function(movies){
				movies.Search.forEach(function(movie){
					var mov = {name: movie.Title, year: movie.Year, imdbID: movie.imdbID}
					$scope.omdbMovies.push(mov);
				});
				
				$scope.num = $scope.omdbMovies.length;
			});		
		}
	}
});

MovieApp.controller('HomeController', function($scope, FirebaseService, $location) {
	
	$scope.movies = FirebaseService.getMovies();
	
	$scope.addMovie = function() {
		console.log("Add Movie!");
		$scope.movie.id = $scope.movie.id.split(' ').join('');
		FirebaseService.addMovies($scope.movie);
		
		//Redirect:
		$location.path('/movies');
	}
});

MovieApp.controller('MoviesController', function($scope, FirebaseService, $routeParams, $location) {
	$scope.movies = FirebaseService.getMovies();
	
	if($routeParams.id != null){
		$scope.movies.forEach(function(movie){
           if (movie.id == $routeParams.id) {
			   $scope.currMovie = movie;
		   }
        });
	  }else{
		$scope.currMovie = null;
	}
	
	$scope.removeMovie = function() {
		console.log("Remove Movie!");
		FirebaseService.removeMovie($scope.currMovie);
		
		$location.path('/movies');
	}
	
	$scope.fillForm = function() {
		$scope.showTheForm = true;
		$scope.Emovie = {name:$scope.currMovie.name, director:$scope.currMovie.director, year:$scope.currMovie.year, description:$scope.currMovie.description, id:$scope.currMovie.id};
	}
	
	$scope.editMovie = function () {
		FirebaseService.saveMovie($scope.Emovie)
		$scope.showTheForm = false;
		
		$scope.currMovie = $scope.Emovie;
	}
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
		movies.$remove(movie);
	}
	
	this.saveMovie = function(movie) {
		/*
		var mov = getMovie(movie.id);
			mov.name = movie.name;
			mov.director = movie.director;
			mov.year = movie.year;
			mov.description = movie.description;
		*/
		movies.forEach(function(mov){
           if (movie.id == mov.id) {
			   mov.name = movie.name;
			   mov.director = movie.director;
			   mov.year = movie.year;
			   mov.description = movie.description;
			   movies.$save(mov);
		   }
        });

	}
});

MovieApp.service('APIService', function($http){
  this.findMovie = function(name){
    return $http.get('https://www.omdbapi.com/', { params: { s: name } });
  }
  this.findMovieY = function(year){
    return $http.get('https://www.omdbapi.com/', { params: { y: year } });
  }
});
