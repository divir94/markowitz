'use strict';

/**
 * @ngdoc function
 * @name markoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the markoApp
 */
angular.module('markoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
