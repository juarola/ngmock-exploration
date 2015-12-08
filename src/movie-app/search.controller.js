angular.module('movieApp', [])
	.controller('SearchController', function ($scope, $location) {
		$scope.search = function () {
			if ($scope.query) {
				// $location.url = '/results?q=star%20wars';
				$location.path('/results').search('q', $scope.query);
			}
		}
	});