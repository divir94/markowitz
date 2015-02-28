'use strict';


angular
    .module('markoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/performance', {
                templateUrl: 'views/performance.html',
                controller: 'PerformanceCtrl',
                activeTab: 'performance'
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
