// Toteuta moduulisi tänne

var MovieApp = angular.module('MovieApp', ['firebase']);

MovieApp.controller('MovieController', function($scope, FirebaseService) {
	console.log("Controller called");
	this.addMovie = function() {
		console.log("Add Movie!");
	}
	
	this.listMovies = function() {
		
	}
	
});

MovieApp.service('FirebaseService', function($firebaseArray){
	var firebaseRef = new Firebase('fiery-heat-9158.firebaseIO.com/movies');
	var movies = $firebaseArray(firebaseRef);

	this.getMovies = function(){
	  return movies;
	}
	
	this.addMovies = function(movie){
	  movies.$add(data);
	}
});