describe('Tournament Resource', function() {
  var Tournament, $httpBackend;

  beforeEach(module('resources.tournament'));

  beforeEach(inject(function(_Tournament_, _$httpBackend_) {
    Tournament = _Tournament_;
    $httpBackend = _$httpBackend_;
  }));

  describe('test methods', function() {
    it('should get tournament', function() {
      var tournament = {
	"name": "FIFA World Cup 2014",
	"startDate": "2014-06-01T13:00:00-03:00",
	"endDate": "2014-07-01T19:00:00-03:00"
      };
      
      $httpBackend.expectGET('/tournament').respond(tournament);
      
      var obj = Tournament.get();

      $httpBackend.flush();

      expect(obj.name).toEqual(tournament.name);
      expect(obj.startDate).toEqual(tournament.startDate);
      expect(obj.endDate).toEqual(tournament.endDate);
    });
  });
});
