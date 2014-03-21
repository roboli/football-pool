angular.module('admin', ['ngRoute', 'resources.tournament', 'resources.venue'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/templates/admin.tpl.html',
    })
    .when('/venues', {
      templateUrl: '/templates/venue-list.tpl.html',
      controller: 'VenueListCtrl'
    })
    .when('/venues/new', {
      templateUrl: '/templates/venue-edit.tpl.html',
      controller: 'VenueAddCtrl'
    })
    .when('/venues/:id', {
      templateUrl: '/templates/venue-view.tpl.html',
      controller: 'VenueViewCtrl'
    })
    .when('/venues/:id/edit', {
      templateUrl: '/templates/venue-edit.tpl.html',
      controller: 'VenueEditCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
}])

.controller('TournamentCtrl', ['$scope', 'Tournament', function($scope, Tournament) {
  $scope.tournament = Tournament.get();
}])

.controller('VenueListCtrl', ['$scope', '$location', 'Venue', function($scope, $location, Venue) {
  $scope.venues = Venue.query();
  
  $scope.new = function() {
    $location.path('/venues/new');
  };
}])

.controller('VenueAddCtrl', ['$scope', '$location', 'Venue', function($scope, $location, Venue) {
  $scope.venue = {};
  
  $scope.save = function(venue) {
    Venue.save(venue, function(data) {
      $location.path('/venues/' + data._id);
    });
  };

  $scope.cancel = function() {
    $location.path('/venues');
  };
}])

.controller('VenueViewCtrl', ['$scope', '$routeParams', '$location', 'Venue', function($scope, $routeParams, $location, Venue) {
  $scope.venue = Venue.get({ id: $routeParams.id });

  $scope.edit = function(venue) {
    $location.path('/venues/' + venue._id + '/edit');
  };

  $scope.close = function() {
    $location.path('/venues');
  };

  $scope.delete = function(venue) {
    venue.$delete(function() {
      $location.path('/venues');
    });
  };
}])

.controller('VenueEditCtrl', ['$scope', '$location', '$routeParams', 'Venue', function($scope, $location, $routeParams, Venue) {
  $scope.venue = Venue.get({ id: $routeParams.id });

  $scope.save = function(venue) {
    venue.$update(function() {
      $location.path('/venues/' + venue._id);
    });
  };

  $scope.cancel = function(venue) {
    $location.path('/venues/' + venue._id);
  };
}]);

