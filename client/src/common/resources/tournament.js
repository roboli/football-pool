angular.module('resources.tournament', ['ngResource'])
  .factory('Tournament', function($resource) {
    return $resource('/tournament', {});
  });
