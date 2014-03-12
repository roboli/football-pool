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
});