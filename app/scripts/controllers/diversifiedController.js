angular.module('markoApp').controller('DiversifiedPortfolioCtrl', function ($rootScope, $scope, $route, $http, strategyFactory) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();

    var seriesOptions = [],
        seriesCounter = 0;

    // helper functions
    var drawExistingLines = function() {
        var count = $rootScope.strategies.length,
            j = 0;
        $('section.nothing-to-load').hide();
        $('section.loader').show();
        for (var i = 0; i < count; i++) {
            strategyFactory.add($rootScope.strategies[i]).then(function(data) {
                j++;
                seriesOptions.push(data);
                if (j === count) {
                    $('section.loader').hide();
                    createChart(seriesOptions, 1);
                }
            });
        }
    }

    // logic
    if ($rootScope.strategies.length > 0) {
        drawExistingLines();
    }

    // event listeners
    // add strategy
    $rootScope.$on('strategyAdd', function(event, item) {
        if ($rootScope.strategies.length == 1) {
            $('section.nothing-to-load').hide();
        }
        $('section.loader').show();
        strategyFactory.add(item).then(function(data) {
            if (data !== null) {
                seriesOptions.push(data);
                $('section.loader').hide();
                createChart(seriesOptions, 1);
            } else {
                console.log('Error occurred in adding strategy');
            }
        });
    });

    // remove strategy
    $rootScope.$on('strategyRemove', function(event, index) {
        if ($rootScope.strategies.length == 0) {
            $('section.nothing-to-load').show();
        }
        strategyFactory.remove(seriesOptions, index);
        createChart(seriesOptions);
    });

});
