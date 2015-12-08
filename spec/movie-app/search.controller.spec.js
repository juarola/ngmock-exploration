describe('Search Controller', function () {

	var $scope;
	var $location;

	beforeEach(function () {
		$location = {
			url: ''
		};
		$scope = {};
		$scope.search = function () {
			if ($scope.query) {
				$location.url = '/results?q=star%20wars' ;
			}
		}
	});

	it('should redurect to query results page for non-empty query', function () {
		$scope.query = 'Star Wars';
		$scope.search();
		expect($location.url).toBe('/results?q=star%20wars');
	});

	it('should not redirect to query results for empty query', function () {
		$scope.search();
		expect($location.url).toBe('');
	});
});