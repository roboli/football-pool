angular.module('services.confirm', ['ui.bootstrap'])
  .factory('confirm', ['$modal', function($modal) {
    var modal;

    var confirm = {
      open: function(msg, resolve, reject) {
	var modal = $modal.open({
	  templateUrl: '/templates/confirm.tpl.html',
	  controller: function($scope, $modalInstance, message) {
	    $scope.message = message;

	    $scope.ok = function() {
	      $modalInstance.close();
	    };

	    $scope.cancel = function() {
	      $modalInstance.dismiss();
	    };	    
	  },
	  resolve: {
	    message: function() {
	      return msg;
	    }
	  }
	});

	modal.result.then(resolve, reject);

	return modal;
      }
    };

    return confirm;
  }]);
