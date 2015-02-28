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
    var apikey = 'J7hxBtcABx8AsszfDzq-';
    $scope.tickers = [];
    $scope.tickerDict;
    $scope.selected = undefined;
    $scope.selectedTickers = []

    $http.get('data/stock-names.json')
      .success(function(data, status, headers, config) {
        var tickerArr = [];
        for (var ticker in data) tickerArr.push(ticker);
        $scope.tickerDict = data;
        $scope.tickers = tickerArr;
      })
      .error(function(data, status, headers, config) {
        console.log('Error occurred, data given was ' + data);
      });

    $scope.addTicker = function(item) {
      if ($scope.selectedTickers.indexOf(item) === -1) $scope.selectedTickers.push(item);
      console.log($scope.selectedTickers);
    }

    $scope.deleteStock = function(index) {
      $scope.selectedTickers.splice(index, 1);
    }

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
