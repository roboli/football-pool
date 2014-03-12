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

  it('should get one venue', function() {
    var venue = {
      "name": "Nou Camp",
      "location": "Barcelona",
      "capacity": 98000
    };

    $httpBackend.expectGET('/venue/123456789012345678901234').respond(venue);

    var obj = Venue.get({ id: '123456789012345678901234' });

    $httpBackend.flush();

    expect(obj.name).toEqual(venue.name);
    expect(obj.location).toEqual(venue.location);
    expect(obj.capacity).toEqual(venue.capacity);
  });
});
