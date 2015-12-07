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

MovieApp.controller('HomeController', function($scope) {
    $scope.message = "Koti";
});

MovieApp.controller('MoviesController', function($scope) {
    $scope.message = "Leffat";
});