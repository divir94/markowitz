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
            .when('/your-portfolio', {
                templateUrl: 'views/your-portfolio.html',
                controller: 'YourPortfolioCtrl',
                activeTab: 'your_portfolio'
            })
            .when('/markos-portfolio', {
                templateUrl: 'views/markos-portfolio.html',
                controller: 'MarkosPortfolioCtrl',
                activeTab: 'markos_portfolio'
            })
            .when('/overlay', {
                templateUrl: 'views/overlay.html',
                controller: 'OverlayCtrl',
                activeTab: 'overlay'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
