var createChart = function(seriesOptions) {
  $('#line-chart').highcharts('StockChart', {
    rangeSelector: {
      selected: 4
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%e of %b'
      }
    },
    yAxis: {
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
  $('#line-chart').height(Math.floor($('#line-chart').width()*0.75));
};


angular.module('markoApp').controller('PerformanceCtrl', function ($rootScope, $scope, $route, $http) {
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
      //var seriesOptions = [];
      //for (var i = 0; i < data.length; i++) {
      //  var stock = data[i];
      //  var temp = {
      //    name: names[i],
      //    color: colors[i%10],
      //    dataLabels: name,
      //    data: stock.map(function(obj) {
      //      return [ Date.parse(obj[0]), obj[1]];
      //    })
      //  };
      //  seriesOptions.push(temp);
      //  createChart(seriesOptions);
      //}
    })
    .error(function(data, status, headers, config) {
      console.log("Error occurred");
    });
});
