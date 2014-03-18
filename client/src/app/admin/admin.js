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
      controller: 'VenueEditCtrl'
    })
    .when('/venues/:id', {
      templateUrl: '/templates/venue-view.tpl.html',
      controller: 'VenueViewCtrl'
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

.controller('VenueEditCtrl', ['$scope', '$location', 'Venue', function($scope, $location, Venue) {
  $scope.venue = {};
  
  $scope.save = function(venue) {
    Venue.save(venue, function(data) {
      $location.path('/venues/' + data._id);
    });
  };
}])

.controller('VenueViewCtrl', ['$scope', '$routeParams', 'Venue', function($scope, $routeParams, Venue) {
  $scope.venue = Venue.get({ id: $routeParams.id });
}]);
