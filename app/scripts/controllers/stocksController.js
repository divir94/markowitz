angular.module('markoApp').controller('StocksPortfolioCtrl', function ($rootScope, $scope, $route) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();

    var apikey = 'J7hxBtcABx8AsszfDzq-';
    $scope.tickers = [];
    $scope.tickerDict;
    $scope.selected = undefined;

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
        console.log(item);
        $rootScope.newTicker = item;
    }

    $scope.deleteStock = function(index) {
        $rootScope.removeTicker = index;
    }

});
