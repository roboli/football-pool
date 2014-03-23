describe('Confirm service', function() {
  var confirm;

  beforeEach(module('services.confirm'));

  var fakeModal = {
    result: {
      then: function(confirmCallback, cancelCallback) {
        //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
        this.confirmCallBack = confirmCallback;
        this.cancelCallback = cancelCallback;
      }
    },
    close: function() {
      //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
      this.result.confirmCallBack();
    },
    dismiss: function() {
      //The user clicked cancel on the modal dialog, call the stored cancel callback
      this.result.cancelCallback();
    }
  };


  beforeEach(inject(function($modal, _confirm_) {
    spyOn($modal, 'open').andReturn(fakeModal);
    confirm = _confirm_;
  }));

  it('should display confirm modal dialog and resolve', function() {
    var resolve = jasmine.createSpy('resolve');
    var modal = confirm.open('Close this window', function() {
      resolve('Yes');
    });

    modal.close();
    expect(resolve).toHaveBeenCalledWith('Yes');
  });

  it('should display confirm modal dialog and reject', function() {
    var reject = jasmine.createSpy('reject');
    var modal = confirm.open('Close this window', null, function() {
      reject('No');
    });

    modal.dismiss();
    expect(reject).toHaveBeenCalledWith('No');
  });
});
