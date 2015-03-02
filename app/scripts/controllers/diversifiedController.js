angular.module('markoApp').controller('DiversifiedPortfolioCtrl', function ($rootScope, $scope, $route, $http) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();

    var seriesOptions = [],
        seriesCounter = 0;
    var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];

    // helper functions
    var drawExistingLines = function() {
        for (var i = 0; i < $rootScope.strategies.length; i++) {
            addLine($rootScope.strategies[i]);
        }
    }

    var addLine = function(item) {
        // https://sleepy-cove-7513.herokuapp.com/french
        $http.get('https://sleepy-cove-7513.herokuapp.com/french', {
            params: {
                factor: item
            }
        })
        .success(function(data, status, headers, config) {
            // do nothing if empty array returned
            console.log(data);
            if (data.length === 0) {
                return;
            }
            var stock = data;
            var temp = {
                name: item,
                color: colors[$rootScope.strategies.length],
                dataLabels: name,
                data: stock.map(function(obj) {
                    return [Date.parse(obj[0]), obj[1]];
                })
            };
            seriesOptions.push(temp);
            $('section.loader').hide();
            createChart(seriesOptions, 2);
        })
        .error(function(data, status, headers, config) {
            console.log('Error from addLine');
        })
    };

    // logic
    if ($rootScope.strategies.length > 0) {
        drawExistingLines();
    }

    // event listeners
    // add strategy
    $rootScope.$on('strategyAdd', function(event, data) {
        if ($rootScope.strategies.length == 1) {
            $('section.nothing-to-load').hide();
        }
        $('section.loader').show();
        addLine(data);
    });

    // remove strategy
    $rootScope.$on('strategyRemove', function(event, index) {
        if ($rootScope.strategies.length == 0) {
            $('section.nothing-to-load').show();
        }
        seriesOptions.splice(index, 1);
        createChart(seriesOptions);
    });

});
