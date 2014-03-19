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

      expect(location.path).toHaveBeenCalled();
    }));
  });

  describe('VenueAddCtrl', function() {
    var location;

    beforeEach(inject(function($controller) {
      location = jasmine.createSpyObj('location', ['path']);
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

    it('should display venue information', inject(function($controller, $routeParams) {
      var id = '123456789012345678901234';

      $routeParams.id = id;
      $controller('VenueViewCtrl', { $scope: scope });
      $httpBackend.expectGET('/venue/' + id).respond({ "id": id });

      $httpBackend.flush();

      expect(scope.venue.id).toBe(id);
    }));
  });

  describe('VenueEditCtrl', function() {
    var id = '123456789012345678901234';

    it('should display venue information', inject(function($controller, $routeParams) {
      $routeParams.id = id;
      $controller('VenueEditCtrl', { $scope: scope });
      $httpBackend.expectGET('/venue/' + id).respond({ "id": id });

      $httpBackend.flush();

      expect(scope.venue.id).toBe(id);
    }));

    it('should edit venue', inject(function($controller, $routeParams) {
      var location = jasmine.createSpyObj('location', ['path']);
      
      $routeParams.id = id;
      $controller('VenueEditCtrl', { $scope: scope, $location: location });
      $httpBackend.whenGET('/venue/' + id).respond({ "_id": id });

      $httpBackend.flush();

      $httpBackend.expectPUT('/venue', { "_id": id, "name": 'Test' }).respond();
      
      scope.venue.name = 'Test';
      scope.save(scope.venue);

      $httpBackend.flush();

      expect(location.path).toHaveBeenCalledWith('/venues/' + id);
    }));
  });
});
