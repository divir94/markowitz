'use strict';


var setHeights = function() {
    var windowH = $(window).outerHeight();
    var headerH = $('header').outerHeight();
    var navH    = $('nav.tabs').outerHeight();
    var footerH = $('footer').outerHeight();
    $('main').height(Math.ceil(windowH - headerH - footerH - navH));
};


angular.module('markoApp')


    .controller('DrawerCtrl', function ($scope, $http) {
        var sym_name;
        var name_sym = {};
        var currentStock;
        var apikey = 'J7hxBtcABx8AsszfDzq-';
        var url = 'https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?column=11&sort_order=asc&collapse=daily&auth_token=' + apikey;

        $scope.stockTickers = ['AAPL', 'GS', 'MSFT', 'FB', 'GOOG', 'JPM'];

        $http.get(url)
            .success(function(data, status, headers, config) {
    		    console.log(data);
            })
            .error(function(data, status, headers, config) {
    		    console.log('Error occurred, data given was ' + data);
            });
    })


    .controller('PerformanceCtrl', function ($rootScope, $scope, $route) {
        $rootScope.activeTab = $route.current.activeTab;
        setHeights();
    })


    .controller('CorrelationCtrl', function ($rootScope, $scope, $route) {
        $rootScope.activeTab = $route.current.activeTab;
        setHeights();
    })


    .controller('SummaryCtrl', function ($rootScope, $scope, $route) {
        $rootScope.activeTab = $route.current.activeTab;
        setHeights();
    })
