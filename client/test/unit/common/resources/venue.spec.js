describe('Venue Resource', function() {
  var Venue, $httpBackend;

  beforeEach(module('resources.venue'));

  beforeEach(inject(function(_Venue_, _$httpBackend_) {
    Venue = _Venue_;
    $httpBackend = _$httpBackend_;
  }));

  describe('test methods', function() {
    it('should query all venues', function() {
      var venues = [
	{ "name": "Nou Camp",
	  "location": "Barcelona",
	  "capacity": 98000 },
	{ "name": "Santiago Bernabeu",
	  "location": "Madrid",
	  "capacity": 105000 }
      ];
      
      $httpBackend.expectGET('/venue').respond(venues);
      
      var objs = Venue.query();

      $httpBackend.flush();

      expect(objs.length).toEqual(2);
    });
  });
});
