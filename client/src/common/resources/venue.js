angular.module('resources.venue', ['ngResource'])
  .factory('Venue', function($resource) {
    return $resource('/venue/:id', {});
  });
