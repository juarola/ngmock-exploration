angular.module('movieApp')
	.controller('ResultsController', function ($scope, $location) {
		var results = [

		];
		results.push({ data: { Title: 'Star Wars: Episode IV' } });
		results.push({ data: { Title: 'Star Wars: Episode V' } });
		results.push({ data: { Title: 'Star Wars: Episode VI' } });

		$scope.results = results;
	});