angular.module('markoApp').controller('ComparisonCtrl', function ($rootScope, $scope, $route, $http) {
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
                    $('section.loader').remove();
                    createChart(seriesOptions);
                }
            });
        });
    });
});
