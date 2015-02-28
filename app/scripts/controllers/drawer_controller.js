var setDrawerHeight = function() {
    setTimeout(function() {
        var windowH = $(window).outerHeight();
        var headerH = $('header').outerHeight();
        var navH    = $('nav.tabs').outerHeight();
        var footerH = $('footer').outerHeight();
        var drawerH = Math.floor(windowH - headerH - footerH);
        var stockListH = drawerH - 420;
        $('section.drawer').height(drawerH);
        $('ul.stock-list').height(stockListH);
    }, 100);
}


angular.module('markoApp').controller('DrawerCtrl', function ($scope, $http) {
    setDrawerHeight();

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
