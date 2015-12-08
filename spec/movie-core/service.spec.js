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
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('Should create pupular movie', function () {

		var expectedData = function (data) {
			// dump(angular.mock.dump(data));
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

	it('shoudl get popular movie by id', function () {

		$httpBackend.expectGET('popular/tt0076759').respond(200);

		PopularMovies.get({ movieId: 'tt0076759' });

		expect($httpBackend.flush).not.toThrow();
	});

	it('should update popular movie', function () {

		$httpBackend.expectPUT('popular')
			.respond(200);

		var popularMovei = new PopularMovies({
			movieId: 'tt0076759',
			description: 'great movie!'
		});
		popularMovei.$update();
		expect($httpBackend.flush).not.toThrow();
	});

	it('should authenticate requests', function () {

		var expectedHeaders = function (headers) {
			// dump('headers:')
			// dump(angular.mock.dump(headers));
			// return true;
			return angular.fromJson(headers).authToken === 'teddy_bear';
		};

		var matchAny = /.*/;

		var headerData = function (headers) {
			return headers.authToken === 'teddy_bear';
		}

		// $httpBackend.expectGET('popular/tt0076759', expectedHeaders)
		// 	.respond(200);
		$httpBackend.whenGET(matchAny, headerData)
			.respond(200);

		$httpBackend.expectPOST(matchAny, matchAny, headerData)
			.respond(200);

		$httpBackend.expectPUT(matchAny, matchAny, headerData)
			.respond(200);

		$httpBackend.expectDELETE(matchAny, headerData)
			.respond(200);

		var popularMovie = { id: 'tt0076759', descrption: 'this is a great movie!' };

		PopularMovies.query();
		PopularMovies.get();
		new PopularMovies(popularMovie).$save();
		new PopularMovies(popularMovie).$update();
		new PopularMovies(popularMovie).$remove();

		expect($httpBackend.flush).not.toThrow();
	});
});