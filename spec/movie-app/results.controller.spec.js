describe('Results Controller', function () {
	var results = {

	};

	results.Search = [];
	results.Search.push({ Title: 'Star Wars: Episode IV' });
	results.Search.push({ Title: 'Star Wars: Episode V' });
	results.Search.push({ Title: 'Star Wars: Episode VI' });

	var $controller;
	var $scope;

	beforeEach(module('movieApp'));

	beforeEach(inject(function (_$controller_) {
		$controller = _$controller_;
		$scope = {};
	}));

	it('should load search results', function () {
		$controller('ResultsController', { $scope: $scope });

		expect($scope.results[0].data.Title).toBe(results.Search[0].Title);
		expect($scope.results[1].data.Title).toBe(results.Search[1].Title);
		expect($scope.results[2].data.Title).toBe(results.Search[2].Title);
	});
});