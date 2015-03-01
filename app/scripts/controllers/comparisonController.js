angular.module('markoApp').controller('ComparisonCtrl', function ($rootScope, $scope, $route, $http) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();
    console.log('com');
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
        $('section.loader').show();
        addLine($rootScope.newTicker);
    });

    $rootScope.$watch('removeTicker', function() {
        removeLine($rootScope.removeTicker);
    });


});
