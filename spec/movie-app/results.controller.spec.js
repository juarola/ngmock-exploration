describe('Results Controller', function () {
	var results = {

	};

	results.Search = [];
	results.Search.push({ Title: 'Star Wars: Episode IV' });
	results.Search.push({ Title: 'Star Wars: Episode V' });
	results.Search.push({ Title: 'Star Wars: Episode VI' });

	var $controller;
	var $scope;
	var $q;
	var $rootScope;
	var omdbApi;

	beforeEach(module('omdb'));
	beforeEach(module('movieApp'));

	beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _omdbApi_) {
		$controller = _$controller_;
		$scope = {};
		$q = _$q_;
		$rootScope = _$rootScope_;
		omdbApi = _omdbApi_;
	}));

	it('should load search results', function () {

		spyOn(omdbApi, 'search').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(results);
			return deferred.promise;
		});

		$controller('ResultsController', { $scope: $scope });
		
		$rootScope.$apply(); // trigger angular event cycle so promise gets resolved

		expect($scope.results[0].Title).toBe(results.Search[0].Title);
		expect($scope.results[1].Title).toBe(results.Search[1].Title);
		expect($scope.results[2].Title).toBe(results.Search[2].Title);
		
		expect(omdbApi.search).toHaveBeenCalledWith('star wars');
	});
});