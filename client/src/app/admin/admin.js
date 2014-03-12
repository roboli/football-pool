angular.module('admin', ['resources.tournament', 'resources.venue'])

.controller('TournamentCtrl', ['$scope', 'Tournament', function($scope, Tournament) {
  $scope.tournament = Tournament.get();
}])

.controller('VenueListCtrl', ['$scope', 'Venue', function($scope, Venue) {
  $scope.venues = Venue.query();
}]);
