describe('Venue Resource', function() {
  var Venue, $httpBackend;

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
    $httpBackend.expectGET('/venue/123456789012345678901234').respond();
    var obj = Venue.get({ id: '123456789012345678901234' });
    $httpBackend.flush();
  });

  it('should post venue', function() {
    $httpBackend.expectPOST('/venue', {}).respond();
    Venue.save({});
    $httpBackend.flush();
  });

  it('should put venue', function() {
    $httpBackend.expectGET('/venue/123456789012345678901234').respond({ "id": "123456789012345678901234" });
    var obj = Venue.get({ id: '123456789012345678901234' });
    $httpBackend.flush();

    $httpBackend.expectPUT('/venue/123456789012345678901234', { "id": "123456789012345678901234" }).respond();
    obj.$update();
    $httpBackend.flush();
  });
});
