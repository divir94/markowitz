var setDrawerHeight = function() {
    setTimeout(function() {
        var windowH = $(window).outerHeight();
        var headerH = $('header').outerHeight();
        var navH    = $('nav.tabs').outerHeight();
        var footerH = $('footer').outerHeight();
        var drawerH = Math.floor(windowH - headerH - footerH);
        var stockListH = drawerH - 420;
        $('section.drawer').height(drawerH);
        $('ul.stock-list').css('max-height', stockListH);
    }, 100);
};

angular.module('markoApp')
  .controller('DrawerCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
  setDrawerHeight();

  // all avilable stocks and strategies
  $rootScope.allStocks = [];
  $scope.allStocksDict;
  $rootScope.allStrategies = [];
  $scope.allStrategiesDict;

  // user selections
  $rootScope.stocks = [];
  $rootScope.strategies = [];

  // get stock tickers and description
  $http.get('data/stock-names.json')
    .success(function(data, status, headers, config) {
      var tickerArr = [];
      for (var ticker in data) tickerArr.push(ticker);
      $scope.allStocksDict = data;
      $scope.allStocks = tickerArr;
    })
    .error(function(data, status, headers, config) {
      console.log('Error occurred, data given was ' + data);
    });

  // get strategy tickers and description
  $http.get('data/strategy-names.json')
    .success(function(data, status, headers, config) {
      var strategyArr = [];
      for (var name in data) strategyArr.push(name);
      $scope.allStrategiesDict = data;
      $scope.allStrategies = strategyArr;
    })
    .error(function(data, status, headers, config) {
      console.log('Error occurred, data given was ' + data);
    });

  // add and remove stocks
  $scope.addStock = function(item) {
    var index = $rootScope.stocks.indexOf(item);
    if (index == -1) {
      $rootScope.stocks.push(item);
      $rootScope.$emit('stockAdd', item);
    }
  }

  $scope.removeStock = function(item) {
    var index = $rootScope.stocks.indexOf(item);
    if (index > -1) {
      $rootScope.stocks.splice(index, 1);
      $rootScope.$emit('stockRemove', index);
    }
  }

  // add and remove strategies
  $scope.addStrategy = function(item) {
    var index = $rootScope.strategies.indexOf(item);
    if (index == -1) {
        $rootScope.strategies.push(item);
        $rootScope.$emit('strategyAdd', item);
    }
  }

  $scope.removeStrategy = function(item) {
    var index = $rootScope.strategies.indexOf(item);
    if (index > -1) {
        $rootScope.strategies.splice(index, 1);
        $rootScope.$emit('strategyRemove', index);
    }
  }

  $scope.toggleDrawer = function() {
    $('section.drawer').toggleClass('closed');
  }
}])
