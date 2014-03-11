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
      $httpBackend.expectGET('/tournament').respond(tournament);

      expect(scope.tournament.name).toBeUndefined();
      expect(scope.tournament.startDate).toBeUndefined();
      expect(scope.tournament.endDate).toBeUndefined();
      
      $httpBackend.flush();

      expect(scope.tournament.name).toEqual(tournament.name);
      expect(scope.tournament.startDate).toEqual(tournament.startDate);
      expect(scope.tournament.endDate).toEqual(tournament.endDate);
    }));
  });
});
