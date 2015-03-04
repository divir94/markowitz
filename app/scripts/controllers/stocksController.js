angular.module('markoApp').controller('StocksPortfolioCtrl', function ($rootScope, $scope, $route, $http, stocksFactory) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();

    $scope.selected = undefined;
    var seriesOptions = [];
    var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];

    var drawExistingLines = function() {
        for (var i = 0; i < $rootScope.stocks.length; i++) {
            addLine($rootScope.stocks[i]);
        }
    }

    var addLine = function(item) {
        // https://sleepy-cove-7513.herokuapp.com/quandl
        $http.get('https://sleepy-cove-7513.herokuapp.com/quandl', {
            params: {
                stock: item
            }
        })
        .success(function(data, status, headers, config) {
            // do nothing if empty array returned
            if (data.length === 0) {
                return;
            }
            var stock = data;
            var temp = {
                name: item,
                color: colors[$rootScope.stocks.length],
                dataLabels: name,
                data: stock.map(function(obj) {
                    return [Date.parse(obj[0]), obj[1]];
                })
            };
            seriesOptions.push(temp);
            $('section.loader').hide();
            createChart(seriesOptions, 1);
        })
        .error(function(data, status, headers, config) {
            console.log('Error from addLine');
        })
    };

    console.log($rootScope.stocks);
    if ($rootScope.stocks.length > 0) {
        drawExistingLines();
    }

    // get autocomplete list items
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

    // event listeners
    // add stock
    $rootScope.$on('stockAdd', function(event, item) {
        if ($rootScope.stocks.length == 1) {
            $('section.nothing-to-load').hide();
        }
        $('section.loader').show();
        // addLine(item);

        stocksFactory.add(item).success(function(data) {
            if (data !== null) {
                console.log(data);
                seriesOptions.push(data);
                $('section.loader').hide();
                createChart(seriesOptions, 1);
            }
        }).error(function(data) {
            console.log('Error occurred when using stocksFactory');
        });
        // if (nextStock !== null) {
        //     console.log(nextStock);
        //     seriesOptions.push(nextStock);
        //     $('section.loader').hide();
        //     createChart(seriesOptions, 1);
        // }
        // stocksFactory.addStock(data);
    });

    // remove stock
    $rootScope.$on('stockRemove', function(event, index) {
        if ($rootScope.stocks.length == 0) {
            $('section.nothing-to-load').show();
        }
        seriesOptions.splice(index, 1);
        createChart(seriesOptions);
    });

});
