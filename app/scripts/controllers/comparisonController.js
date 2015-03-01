var createChart = function(seriesOptions) {
    $('#line-chart').highcharts('StockChart', {
        rangeSelector: {
            selected: 4
        },
        xAxis: {
            lineColor: 'transparent',
            minorTickLength: 0,
            tickLength: 0,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e of %b'
            }
        },
        yAxis: {
            gridLineColor: '#f5f5f5',
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



angular.module('markoApp').controller('ComparisonCtrl', function ($rootScope, $scope, $route, $http) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();
    console.log('com');
    var seriesOptions = [],
        seriesCounter = 0;

    // angular.element(document).ready(function () {
    //     var names = ['AAPL', 'GOOGL'];

    //     $.each(names, function (i, name) {
    //         $.getJSON('https://www.quandl.com/api/v1/datasets/WIKI/'+name+'.json?exclude_headers=true&sort_order=asc&column=11&collapse=daily&auth_token=J7hxBtcABx8AsszfDzq-', function (result) {
    //             seriesOptions[i] = {
    //                 name: name,
    //                 data: result.data.map(function(obj) {
    //                     return [ Date.parse(obj[0]), obj[1]];
    //                 })
    //             };
    //         })
    //         .done(function() {
    //             seriesCounter += 1;
    //             if (seriesCounter == names.length) {
    //                 $('section.loader').remove();
    //                 createChart(seriesOptions);
    //             }
    //         });
    //     });
    // });

    var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
    var names = $rootScope.selectedTickers;
    var seriesOptions = [];

    var addLine = function(item) {
        $http.get('https://sleepy-cove-7513.herokuapp.com/quandl', {
          params: {
            stocks: item
        }})
        .success(function(data, status, headers, config) {
            console.log(data);
                // do nothing if empty array returned
                if (data.length === 0) {
                    return;
                }
                console.log('displaying');
                var stock = data[0];
                var temp = {
                  name: item,
                  color: colors[4],
                  dataLabels: name,
                  data: stock.map(function(obj) {
                    return [Date.parse(obj[0]), obj[1]];
                })
                };
              seriesOptions.push(temp);
              $('section.loader').remove();
              createChart(seriesOptions);
          })
        .error(function(data, status, headers, config) {
            console.log('Error from addLine');
        })
    };

    var removeLine = function(index) {

    };

    // watch for change on newTicker
    $rootScope.$watch('newTicker', function() {
        console.log($rootScope.newTicker);
        addLine($rootScope.newTicker);
    });

    $rootScope.$watch('removeTicker', function() {
        removeLine($rootScope.removeTicker);
    });


});
