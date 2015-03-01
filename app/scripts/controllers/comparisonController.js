angular.module('markoApp').controller('ComparisonCtrl', function ($rootScope, $scope, $route, $http) {
  $rootScope.activeTab = $route.current.activeTab;
  setHeights();
  var seriesOptions = [],
    seriesCounter = 0;
  var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
  var names = $rootScope.selectedTickers;
  console.log(names);


  $http.get('https://sleepy-cove-7513.herokuapp.com/quandl', {
    params: {
      stocks: ['AAPL', 'IBM']
    }
  })
    .success(function(data, status, headers, config) {
      console.log(data);
      names.push('Portfolio');
      var seriesOptions = [];
      for (var i = 0; i < data.length; i++) {
        var stock = data[i];
        var temp = {
          name: names[i],
          color: colors[i%10],
          data: stock.map(function(obj) {
            return [ Date.parse(obj[0]), obj[1]];
          })
        };
        seriesOptions.push(temp);
        createChart(seriesOptions);
      }
    })
    .error(function(data, status, headers, config) {
      console.log("Error occurred");
    });
});
