'use strict';

/**
 * @ngdoc overview
 * @name markoApp
 * @description
 * # markoApp
 *
 * Main module of the application.
 */


angular
    .module('markoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'autocomplete'
    ])
    .config(function ($routeProvider) {
        $routeProvider


            .when('/performance', {
                templateUrl: 'views/performance.html',
                controller: 'PerformanceCtrl',
                activeTab: 'performance'
            })
            .when('/correlation', {
                templateUrl: 'views/correlation.html',
                controller: 'CorrelationCtrl',
                activeTab: 'correlation'
            })
            .when('/summary', {
                templateUrl: 'views/summary.html',
                controller: 'SummaryCtrl',
                activeTab: 'summary'
            })
            .otherwise({
                redirectTo: '/'
            });
    });  
