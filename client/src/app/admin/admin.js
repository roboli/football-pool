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
    .otherwise({
      redirectTo: '/home'
    });
}])

.controller('TournamentCtrl', ['$scope', 'Tournament', function($scope, Tournament) {
  $scope.tournament = Tournament.get();
}])

.controller('VenueListCtrl', ['$scope', 'Venue', function($scope, Venue) {
  $scope.venues = Venue.query();
}]);
