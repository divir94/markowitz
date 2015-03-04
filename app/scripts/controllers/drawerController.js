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
  .controller('DrawerCtrl', ['$scope', '$rootScope', '$http', 'stockFactory', 'strategyFactory',
    function ($scope, $rootScope, $http, stockFactory, strategyFactory) {
  setDrawerHeight();

    // all avilable stocks and strategies
    $rootScope.allStocks = [];
    $scope.allStocksDict;
    $rootScope.allStrategies = [];
    $scope.allStrategiesDict;

    // user selections
    $rootScope.stocks = [];
    $rootScope.strategies = [];

  // get stock tickers and descriptions
  stockFactory.list().then(function(data) {
      var tickerArr = [];
      for (var t in data) {
          tickerArr.push(t);
      }
      $scope.allStocksDict = data;
      $scope.allStocks = tickerArr;
  });

  // get strategy list and descriptions
  strategyFactory.list().then(function(data) {
    var strategyArr = [];
    for (var s in data) {
      strategyArr.push(s)
    }
    $scope.allStrategiesDict = data;
    $scope.allStrategies = strategyArr;
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

    // Toggle the drawer open and closed
    $scope.toggleDrawer = function() {
        $('section.drawer').addClass('in-motion');

        var diDrawer = $('section.drawer').width();
        var diMain   = $('section.main').width();
        
        var closed = $('section.drawer').hasClass('closed');

        if (closed) {
            var dfDrawer = 420;
            var removeButtonClass = 'fa-angle-left';
            var addButtonClass = 'fa-angle-right';
        }
        else {
            var dfDrawer = 30;
            var removeButtonClass = 'fa-angle-right';
            var addButtonClass = 'fa-angle-left';
        }
        $('div.drawer-toggle i').removeClass(removeButtonClass);
        $('div.drawer-toggle i').addClass(addButtonClass);
        
        var dfMain = diMain + diDrawer - dfDrawer;
        $('section.drawer').animate({
            width: dfDrawer
        }, {duration: 400, queue: false});
        $('section.main').animate({
            width: dfMain
        }, {duration: 400, queue: false});
        
        setTimeout(function() {
            $('section.drawer').removeClass('in-motion');
            $('section.drawer').toggleClass('closed');
        }, 400);
    }
}]);
