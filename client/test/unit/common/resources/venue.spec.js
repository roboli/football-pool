describe('Venue Resource', function() {
  var Venue, $httpBackend;
  var id = '123456789012345678901234';

  beforeEach(module('resources.venue'));

  beforeEach(inject(function(_Venue_, _$httpBackend_) {
    Venue = _Venue_;
    $httpBackend = _$httpBackend_;
  }));

  it('should query all venues', function() {
    $httpBackend.expectGET('/venue').respond();
    var objs = Venue.query();
    $httpBackend.flush();
  });

  it('should get one venue', function() {
    $httpBackend.expectGET('/venue/' + id).respond();
    var obj = Venue.get({ "id": id });
    $httpBackend.flush();
  });

  it('should post venue', function() {
    $httpBackend.expectPOST('/venue', {}).respond();
    Venue.save({});
    $httpBackend.flush();
  });

  it('should put venue', function() {
    var obj = new Venue({ "_id": id });
    
    $httpBackend.expectPUT('/venue/' + id, { "_id": id }).respond();
    obj.$update();
    $httpBackend.flush();
  });

  it('should delete venue', function() {
    $httpBackend.expectDELETE('/venue/' +  id).respond();
    Venue.delete({ "id": id });
    $httpBackend.flush();
  });
});
