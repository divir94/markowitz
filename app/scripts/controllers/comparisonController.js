angular.module('markoApp').controller('ComparisonCtrl', function ($rootScope, $scope, $route, $http) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();
    var seriesOptions = [],
        seriesCounter = 0;
    var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
    var names = $rootScope.selectedTickers;
    var seriesOptions = [];

    var addLine = function(item) {
        $http.get('https://sleepy-cove-7513.herokuapp.com/quandl', {
            params: {
                stocks: item
        }})
        .success(function(data, status, headers, config) {
            // do nothing if empty array returned
            if (data.length === 0) {
                return;
            }
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
            $('section.loader').hide();
            createChart(seriesOptions,3);
        })
        .error(function(data, status, headers, config) {
            console.log('Error from addLine');
        })
    };

    var removeLine = function(index) {

    };

    // watch for change on newTicker
    $rootScope.$watch('newTicker', function() {
        $('section.loader').show();
        addLine($rootScope.newTicker);
    });

    //https://sleepy-cove-7513.herokuapp.com/portfolio'
    $http.get('http://localhost:5000/strategy', {
        params: {
            strategies: $rootScope.strategies
        }
    })
    .success(function(data, status, headers, config) {
        // do nothing if empty array returned
        console.log(data);
        if (data.length === 0) {
            return;
        }
        var temp = {
            name: 'Strategies',
            color: colors[1],
            dataLabels: name,
            data: data.map(function(obj) {
                return [Date.parse(obj[0]), parseInt(obj[1])];
            })
        };
        console.log('add to so');
        seriesOptions.push(temp);
        $('section.loader').hide();
        createChart(seriesOptions);
    })
    .error(function(data, status, headers, config) {
        console.log('Error from addLine');
    });


    // $http.get('http://localhost:5000/compute/strategy', {
    //       params: {
    //         strategies: ['SMB', 'RF']
    //     }
    //     })
    //     .success(function(data, status, headers, config) {
    //             // do nothing if empty array returned
    //             console.log(data);
    //             if (data.length === 0) {
    //                 return;
    //             }
    //             var temp = {
    //                 name: 'Strategy portfolio',
    //                 color: colors[4],
    //                 dataLabels: name,
    //                 data: data.map(function(obj) {
    //                     return [Date.parse(obj[0]), parseInt(obj[1])];
    //                 })
    //             };
    //           seriesOptions.push(temp);
    //           $('section.loader').hide();
    //           createChart(seriesOptions);
    //     })
    //     .error(function(data, status, headers, config) {
    //         console.log('Error from addLine');
    //     })


});
