describe('Search Controller', function () {

	var $scope;
	var $location;

	beforeEach(module('movieApp'));

	beforeEach(inject(function (_$controller_, _$location_) {
		// $location = {
		// 	url: ''
		// };
		$location = _$location_;
		$scope = {};

		// var fn = function ($scope) {
		// 	$scope.search = function () {
		// 		if ($scope.query) {
		// 			// $location.url = '/results?q=star%20wars';
		// 			$location.path('/results').search('q', $scope.query);
		// 		}
		// 	}
		// };
		
		// _$controller_(fn, { $scope: $scope, $location: $location });
		_$controller_('SearchController', { $scope: $scope, $location: $location });
	}));

	it('should redurect to query results page for non-empty query', function () {
		$scope.query = 'Star Wars';
		$scope.search();
		expect($location.url()).toBe('/results?q=Star%20Wars');
	});

	it('should not redirect to query results for empty query', function () {
		$scope.search();
		expect($location.url()).toBe('');
	});
});