angular.module('movieApp')
	.controller('ResultsController', function ($scope, $location, omdbApi) {
		omdbApi.search('star wars')
			.then(function (data) {
				$scope.results = data.Search;
			});
	});