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

    it('should cancel an insertion', function() {
      element(by.css("a[href='#/venues']")).click();
      element(by.tagName('button')).click();
      element(by.buttonText('Cancel')).click();
      expect(element.all(by.repeater('venue in venues')).count()).toBe(0);
    });
  });

  describe('With venues', function() {
    
    beforeEach(function() {
      browser.ignoreSynchronization = true;
      browser.get('/_test/clean_db');
      browser.get('/_test/load_venues_fixture');
      browser.get('/index.html');
    });

    it('should show venue details', function() {
      element(by.css("a[href='#/venues']")).click();
      element.all(by.css("a")).last().click();
      
      expect(element(by.binding('venue.name')).isPresent()).toBe(true);
      expect(element(by.binding('venue.location')).isPresent()).toBe(true);
      expect(element(by.binding('venue.capacity')).isPresent()).toBe(true);
    });

    it('should show venues list after closing venue\'s view', function() {
      element(by.css("a[href='#/venues']")).click();
      element.all(by.css("a")).last().click();
      element(by.buttonText('Close')).click();
      expect(element.all(by.repeater('venue in venues')).count()).toBeGreaterThan(0);
    });

    it('should update venue', function() {
      element(by.css("a[href='#/venues']")).click();
      element.all(by.css("a")).last().click();
      element(by.buttonText('Edit')).click();
      expect(element(by.tagName('form')).isPresent()).toBe(true);

      element(by.model('venue.name')).clear();
      element(by.model('venue.name')).sendKeys('Maracana');
      element(by.model('venue.location')).clear();
      element(by.model('venue.location')).sendKeys('Rio de Janeiro');
      element(by.model('venue.capacity')).clear();
      element(by.model('venue.capacity')).sendKeys('98000');
      element(by.buttonText('Save')).click();

      expect(element(by.binding('venue.name')).getText()).toBe('Maracana');
      expect(element(by.binding('venue.location')).getText()).toBe('Rio de Janeiro');
      expect(element(by.binding('venue.capacity')).getText()).toBe('98000');
    });

    it('should cancel an edition', function() {
      element(by.css("a[href='#/venues']")).click();
      element.all(by.css("a")).last().click();
      element(by.buttonText('Edit')).click();
      element(by.buttonText('Cancel')).click();
      expect(element(by.tagName('form')).isPresent()).toBe(false);
      
      expect(element(by.binding('venue.name')).isPresent()).toBe(true);
      expect(element(by.binding('venue.location')).isPresent()).toBe(true);
      expect(element(by.binding('venue.capacity')).isPresent()).toBe(true);
    });

    it('should delete venue', function() {
      element(by.css("a[href='#/venues']")).click();
      var first_count = element.all(by.repeater('venue in venues')).count();
      
      element.all(by.css("a")).last().click();
      element(by.buttonText('Delete')).click();
      element(by.buttonText('Ok')).click();
      element.all(by.repeater('venue in venues')).count().then(function(count) {
	first_count.then(function(fc) {
	  expect(count).toEqual(fc - 1);
	});
      });
    });
  });
});
