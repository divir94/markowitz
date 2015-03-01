angular.module('markoApp').controller('CorrelationCtrl', function ($rootScope, $scope, $route) {
    // get correlation matrix
    $http.get('https://sleepy-cove-7513.herokuapp.com/compute/stock.json', {
      params: {
        stocks: ['AAPL', 'IBM', 'UPS']
      }})
      .success(function(data, status, headers, config) {
        $rootScope.corrMatrix = data;
        console.log(data);
      })
      .error(function(data, status, headers, config) {
        console.log('Error occurred, data given was ' + data);
      });
})
