'use strict';

var setHeights = function() {
    var windowH = $(window).outerHeight();
    var headerH = $('header').outerHeight();
    var navH    = $('nav.tabs').outerHeight();
    var footerH = $('footer').outerHeight();
    $('main').height(Math.ceil(windowH - headerH - footerH - navH));
};

var createChart = function(seriesOptions) {
    $('#line-chart').highcharts('StockChart', {
        rangeSelector: {
            selected: 4
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e of %b'
            }
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        plotOptions: {
            series: {
                compare: 'percent'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2
        },
        series: seriesOptions
    });
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
            })
            .error(function(data, status, headers, config) {
    		      console.log('Error occurred, data given was ' + data);
            });
    })


    .controller('PerformanceCtrl', function ($rootScope, $scope, $route) {
        $rootScope.activeTab = $route.current.activeTab;
        setHeights();

        var seriesOptions = [],
            seriesCounter = 0;

        angular.element(document).ready(function () {
            var names = ['AAPL', 'GOOGL'];

            $.each(names, function (i, name) {
                $.getJSON('https://www.quandl.com/api/v1/datasets/WIKI/'+name+'.json?exclude_headers=true&sort_order=asc&column=11&collapse=daily&auth_token=J7hxBtcABx8AsszfDzq-', function (result) {
                    seriesOptions[i] = {
                        name: name,
                        data: result.data.map(function(obj) {
                            return [ Date.parse(obj[0]), obj[1]];
                        })
                    };
                })
                .done(function() {
                    seriesCounter += 1;
                    if (seriesCounter == names.length) {
                        createChart(seriesOptions);
                    }
                });
            });
        });
    })


    .controller('CorrelationCtrl', function ($rootScope, $scope, $route) {
        $rootScope.activeTab = $route.current.activeTab;
        setHeights();
    })


    .controller('SummaryCtrl', function ($rootScope, $scope, $route) {
        $rootScope.activeTab = $route.current.activeTab;
        setHeights();
    })
