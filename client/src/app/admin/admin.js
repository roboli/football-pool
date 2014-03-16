angular.module('admin', ['ngRoute', 'resources.tournament', 'resources.venue'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/templates/admin.tpl.html',
    })
    .when('/venues', {
      templateUrl: '/templates/venues-list.tpl.html',
      controller: 'VenueListCtrl'
    })
    .when('/venues/new', {
      templateUrl: '/templates/venues-edit.tpl.html',
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

.controller('VenueEditCtrl', ['$scope', 'Venue', function($scope, Venue) {
  $scope.save = function(venue) {
    Venue.save(venue);
  };
}]);
