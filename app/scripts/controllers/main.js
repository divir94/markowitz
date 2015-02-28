'use strict';

/**
 * @ngdoc function
 * @name markoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the markoApp
 */
angular.module('markoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
