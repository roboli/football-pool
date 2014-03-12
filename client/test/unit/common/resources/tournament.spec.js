describe('Tournament Resource', function() {
  var Tournament, $httpBackend;

  beforeEach(module('resources.tournament'));

  beforeEach(inject(function(_Tournament_, _$httpBackend_) {
    Tournament = _Tournament_;
    $httpBackend = _$httpBackend_;
  }));

  describe('test methods', function() {
    it('should get tournament', function() {
      $httpBackend.expectGET('/tournament').respond();
      var obj = Tournament.get();
      $httpBackend.flush();
    });
  });
});
