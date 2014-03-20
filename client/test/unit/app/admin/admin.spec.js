describe('Admin', function() {
  var scope, $httpBackend;
  
  beforeEach(module('admin'));

  beforeEach(inject(function(_$httpBackend_, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
  }));

  describe('TournamentCtrl', function() {

    it('should create tournament model', inject(function($controller) {
      var tournament = {
	"name": "FIFA World Cup 2014",
	"startDate": "2014-06-01T13:00:00-03:00",
	"endDate": "2014-07-01T19:00:00-03:00"
      };

      $controller('TournamentCtrl', { $scope: scope });
      $httpBackend.whenGET('/tournament').respond(tournament);
      expect(scope.tournament.name).toBeUndefined();
      $httpBackend.flush();
      expect(scope.tournament.name).toEqual(tournament.name);
    }));
  });

  describe('VenueListCtrl', function() {

    it('should fetch venue models', inject(function($controller) {
      var venues = [
	{ "name": "Nou Camp",
	  "location": "Barcelona",
	  "capacity": 98000 },
	{ "name": "Santiago Bernabeu",
	  "location": "Madrid",
	  "capacity": 105000 }
      ];

      $controller('VenueListCtrl', { $scope: scope });
      $httpBackend.whenGET('/venue').respond(venues);
      expect(scope.venues.length).toBe(0);
      $httpBackend.flush();
      expect(scope.venues.length).toBe(2);
    }));

    it('should change location on new click', inject(function($controller) {
      var location = jasmine.createSpyObj('location', ['path']);
      $controller('VenueListCtrl', { $scope: scope, $location: location });
      scope.new();
      expect(location.path).toHaveBeenCalledWith('/venues/new');
    }));
  });

  describe('VenueAddCtrl', function() {
    var location = jasmine.createSpyObj('location', ['path']);

    beforeEach(inject(function($controller) {
      $controller('VenueAddCtrl', { $scope: scope, $location: location });
    }));

    it('should create new venue', function() {
      var id = '123456789012345678901234';
      $httpBackend.expectPOST('/venue', {}).respond({ "_id": id });
      scope.save({});
      $httpBackend.flush();
      expect(location.path).toHaveBeenCalledWith('/venues/' + id);
    });

    it('should cancel an insertion', function() {
      scope.cancel();
      expect(location.path).toHaveBeenCalledWith('/venues');
    });
  });

  describe('VenueViewCtrl', function() {
    var id = '123456789012345678901234';

    beforeEach(inject(function($routeParams) {
      $routeParams.id = id;
    }));

    it('should display venue information', inject(function($controller) {
      $controller('VenueViewCtrl', { $scope: scope });
      $httpBackend.expectGET('/venue/' + id).respond({ "_id": id });
      $httpBackend.flush();
      expect(scope.venue._id).toBe(id);
    }));

    it('should navigate to the edit form', inject(function($controller) {
      var location = jasmine.createSpyObj('location', ['path']);
      $controller('VenueViewCtrl', { $scope: scope, $location: location });
      $httpBackend.expectGET('/venue/' + id).respond({ "_id": id });
      $httpBackend.flush();
      scope.edit(scope.venue);
      expect(location.path).toHaveBeenCalledWith('/venues/' + id + '/edit');
    }));
  });

  describe('VenueEditCtrl', function() {
    var id = '123456789012345678901234';
    var location = jasmine.createSpyObj('location', ['path']);

    beforeEach(inject(function($routeParams) {
      $routeParams.id = id;
    }));

    it('should display venue information', inject(function($controller) {
      $controller('VenueEditCtrl', { $scope: scope });
      $httpBackend.expectGET('/venue/' + id).respond({ "_id": id });
      $httpBackend.flush();
      expect(scope.venue._id).toBe(id);
    }));

    it('should edit venue', inject(function($controller) {
      $controller('VenueEditCtrl', { $scope: scope, $location: location });
      $httpBackend.whenGET('/venue/' + id).respond({ "_id": id });
      $httpBackend.flush();
      $httpBackend.expectPUT('/venue/' + id, { "_id": id, "name": 'Test' }).respond();
      scope.venue.name = 'Test';
      scope.save(scope.venue);
      $httpBackend.flush();
      expect(location.path).toHaveBeenCalledWith('/venues/' + id);
    }));

    it('should cancel an edition', inject(function($controller) {
      $controller('VenueEditCtrl', { $scope: scope, $location: location });
      $httpBackend.whenGET('/venue/' + id).respond({ "_id": id });
      $httpBackend.flush();
      scope.cancel(scope.venue);
      expect(location.path).toHaveBeenCalledWith('/venues/' + id);
    }));
  });
});
