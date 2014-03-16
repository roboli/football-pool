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
  });

  describe('VenueEditCtrl', function() {

    it('should create new venue', inject(function($controller) {
      $controller('VenueEditCtrl', { $scope: scope });
      $httpBackend.expectPOST('/venue').respond();

      scope.save({});

      $httpBackend.flush();
    }));
  });
});
