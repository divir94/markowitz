angular.module('markoApp').controller('CorrelationCtrl', function ($rootScope, $scope, $http) {
    test = ['AAPL', 'IBM', 'UPS'];
    test2 = ['Mkt-RF', 'RF', 'SMB', 'HML']
    //$rootScope.allStrategies

    // get correlation matrix
    //$http.get('https://sleepy-cove-7513.herokuapp.com/compute/stock', {
    //  params: {
    //    stocks: test
    //  }})
    //  .success(function(data, status, headers, config) {
    //    $rootScope.corrMatrix = data;
    //    console.log(data.toString());
    //    var result = {
    //      packageNames: test,
    //      matrix: data
    //    };
    //
    //    var chart = d3.chart.dependencyWheel();
    //    d3.select('#chart_placeholder')
    //      .datum(result)
    //      .call(chart);
    //  })
    //  .error(function(data, status, headers, config) {
    //    console.log('Error occurred, data given was ' + data);
    //  });

    //get correlation matrix
    $http.get('https://sleepy-cove-7513.herokuapp.com/compute/strategy', {
      params: {
        strategies: test2
      }})
      .success(function(data, status, headers, config) {
        $rootScope.corrMatrix = data;
        console.log(data.toString());
        var result = {
          packageNames: test2,
          matrix: data
        };

        var chart = d3.chart.dependencyWheel();
        d3.select('#chart_placeholder')
          .datum(result)
          .call(chart);
      })
      .error(function(data, status, headers, config) {
        console.log('Error occurred, data given was ' + data);
      });
})
