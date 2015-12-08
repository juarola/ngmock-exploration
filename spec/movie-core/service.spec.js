describe('MovieCore', function () {

	var PopularMovies;
	var $httpBackend;

	beforeEach(module('movieCore'));

	beforeEach(inject(function (_PopularMovies_, _$httpBackend_) {
		PopularMovies = _PopularMovies_;
		$httpBackend = _$httpBackend_;
	}))

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('Should create pupular movie', function () {

		var expectedData = function (data) {
			dump(angular.mock.dump(data));
			// return true;
			return angular.fromJson(data).movieId === 'tt0076759';
		};

		// var expectedData = { "movieId": "tt0076759", "description": "great movie!" };
		// var expectedData = '{"movieId":"tt0076759","description":"great movie!"}';

		$httpBackend.expectPOST(/./, expectedData)
			.respond(201);

		var popularMovei = new PopularMovies({
			movieId: 'tt0076759',
			description: 'great movie!'
		});

		popularMovei.$save();

		expect($httpBackend.flush).not.toThrow();
	});

});