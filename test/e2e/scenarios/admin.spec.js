describe('Admin', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should show tournament header', function() {
    expect(element(by.binding('tournament.name')).getText()).toBe('FIFA World Cup 2014');
  });
});
