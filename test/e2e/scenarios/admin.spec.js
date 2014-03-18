describe('Admin', function() {

  describe('Empty application', function() {
    
    beforeEach(function() {
      browser.ignoreSynchronization = true;
      browser.get('/_test/clean_db');
      browser.get('/index.html');
    });

    it('should show tournament header', function() {
      expect(element(by.binding('tournament.name')).getText()).toBe('Test Tournament');
      expect(element(by.tagName('p')).getText()).toBe('Welcome to the administration app!');
    });

    it('should show venues list', function() {
      element(by.css("a[href='#/venues']")).click();
      expect(element(by.tagName('p')).getText()).toBe('No venues found');
      expect(element.all(by.repeater('venue in venues')).count()).toBe(0);
    });

    it('should insert a venue', function() {
      element(by.css("a[href='#/venues']")).click();
      element(by.tagName('button')).click();
      expect(element(by.tagName('form')).isPresent()).toBe(true);

      element(by.model('venue.name')).sendKeys('Maracana');
      element(by.model('venue.location')).sendKeys('Rio de Janeiro');
      element(by.model('venue.capacity')).sendKeys('98000');
      element(by.tagName('button')).click();
      
      expect(element(by.binding('venue.name')).getText()).toBe('Maracana');
      expect(element(by.binding('venue.location')).getText()).toBe('Rio de Janeiro');
      expect(element(by.binding('venue.capacity')).getText()).toBe('98000');
    });
  });
});
