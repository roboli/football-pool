describe('Venue Resource', function() {
  var Venue, $httpBackend;
  var _id = '123456789012345678901234';

  beforeEach(module('resources.venue'));

  beforeEach(inject(function(_Venue_, _$httpBackend_) {
    Venue = _Venue_;
    $httpBackend = _$httpBackend_;
  }));

  describe('test methods', function() {
    it('should query all venues', function() {
      $httpBackend.expectGET('/venue').respond();
      var objs = Venue.query();
      $httpBackend.flush();
    });
  });

  it('should get one venue', function() {
    $httpBackend.expectGET('/venue/' + _id).respond();
    var obj = Venue.get({ id: _id });
    $httpBackend.flush();
  });

  it('should post venue', function() {
    $httpBackend.expectPOST('/venue', {}).respond();
    Venue.save({});
    $httpBackend.flush();
  });

  it('should put venue', function() {
    $httpBackend.expectGET('/venue/' + _id).respond({ "id": _id });
    var obj = Venue.get({ id: _id });
    $httpBackend.flush();

    $httpBackend.expectPUT('/venue/' + _id, { "id": _id }).respond();
    obj.$update();
    $httpBackend.flush();
  });

  it('should delete venue', function() {
    $httpBackend.expectDELETE('/venue/' +  _id).respond();
    Venue.delete({ id: _id });
    $httpBackend.flush();
  });
});
