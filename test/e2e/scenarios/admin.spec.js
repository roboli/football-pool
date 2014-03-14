describe('Admin', function() {

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('index.html');
  });

  it('should show tournament header', function() {
    expect(element(by.binding('tournament.name')).getText()).toBe('FIFA World Cup 2014');
    expect(element(by.tagName('p')).getText()).toBe('Welcome to the administration app!');
  });

  it('should show venues list', function() {
    element(by.css("a[href='#/venues']")).click();
    expect(element(by.tagName('p')).getText()).toBe('Here goes the venues...');
  });
});
