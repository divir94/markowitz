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
            .when('/stocks-portfolio', {
                templateUrl: 'views/stocks-portfolio.html',
                controller: 'StocksPortfolioCtrl',
                activeTab: 'stocks-portfolio'
            })
            .when('/diversified-portfolio', {
                templateUrl: 'views/diversified-portfolio.html',
                controller: 'DiversifiedPortfolioCtrl',
                activeTab: 'diversified-portfolio'
            })
            .when('/comparison', {
                templateUrl: 'views/comparison.html',
                controller: 'ComparisonCtrl',
                activeTab: 'comparison'
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
