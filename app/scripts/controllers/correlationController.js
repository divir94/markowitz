angular.module('markoApp').controller('CorrelationCtrl', function ($rootScope, $scope, $http) {
    names = ['Mkt-RF', 'RF', 'SMB', 'HML']

    // get correlation matrix
    //$http.get('https://sleepy-cove-7513.herokuapp.com/compute/stock', {
    //  params: {
    //    stocks: names
    //  }})
    //  .success(function(data, status, headers, config) {
    //    $rootScope.corrMatrix = data;
    //    console.log(data.toString());
    //    var result = {
    //      packageNames: names,
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
    $rootScope.$watch('stocks', function (newValue, oldValue) {
      console.log(oldValue.length, newValue.length);
      if (newValue !== oldValue)
        $http.get('https://sleepy-cove-7513.herokuapp.com/compute/strategy', {
          params: {
            strategies: newValue
          }})
          .success(function(data, status, headers, config) {
            $rootScope.corrMatrix = data;
            var result = {
              packageNames: newValue,
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
    }, true);  // <- put `true` here
});
