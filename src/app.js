angular.module('movieApp', ['ui.bootstrap', 'ngRoute', 'omdb']);

angular.module('movieApp')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/results', {
				templateUrl: 'movie-app/results.html',
				controller: 'ResultsController'
			})
			.otherwise({
				redirectTo: '/'
			});
	});