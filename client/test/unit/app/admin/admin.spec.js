describe('Admin', function() {

  beforeEach(module('admin'));

  describe('TournamentCtrl', function() {
    var scope, ctrl, $httpBackend;
    var tournament = {
      "name": "FIFA World Cup 2014",
      "startDate": "2014-06-01T13:00:00-03:00",
      "endDate": "2014-07-01T19:00:00-03:00"
    };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/tournament').respond(tournament);

      scope = $rootScope.$new();
      ctrl = $controller('TournamentCtrl', { $scope: scope });
    }));//

    it('should create tournament model from xhr', function() {
      expect(scope.tournament.name).toBeUndefined();
      expect(scope.tournament.startDate).toBeUndefined();
      expect(scope.tournament.endDate).toBeUndefined();
      
      $httpBackend.flush();

      expect(scope.tournament.name).toEqual(tournament.name);
      expect(scope.tournament.startDate).toEqual(tournament.startDate);
      expect(scope.tournament.endDate).toEqual(tournament.endDate);
    });
  });
});
