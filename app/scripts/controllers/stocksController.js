angular.module('markoApp').controller('StocksPortfolioCtrl', function ($rootScope, $scope, $route, $http, stockFactory) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();

    $scope.selected = undefined;
    var seriesOptions = [];
    var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];

    var drawExistingLines = function() {
        var count = $rootScope.stocks.length,
            j = 0;
        $('section.nothing-to-load').hide();
        $('section.loader').show();
        for (var i = 0; i < count; i++) {
            stockFactory.add($rootScope.stocks[i]).then(function(data) {
                j++;
                seriesOptions.push(data);
                if (j === count) {
                    $('section.loader').hide();
                    createChart(seriesOptions, 1);
                }
            });
        }
    };

    if ($rootScope.stocks.length > 0) {
        drawExistingLines();
    }

    stockFactory.list().then(function(data) {
        var tickerArr = [];
        for (var t in data) {
            tickerArr.push(t);
        }
        $scope.tickerDict = data;
        $scope.tickers = tickerArr;
    });

    // event listeners
    // add stock
    $rootScope.$on('stockAdd', function(event, item) {
        if ($rootScope.stocks.length === 1) {
            $('section.nothing-to-load').hide();
        }

        $('section.loader').show();

        stockFactory.add(item).then(function(data) {
            if (data !== null) {
                seriesOptions.push(data);
                $('section.loader').hide();
                createChart(seriesOptions, 1);
            } else {
                console.log('Error occurred adding stock');
            }
        });
    });

    // remove stock
    $rootScope.$on('stockRemove', function(event, index) {
        if ($rootScope.stocks.length === 0) {
            $('section.nothing-to-load').show();
        }

        stockFactory.remove(seriesOptions, index);
        createChart(seriesOptions);
    });

});
