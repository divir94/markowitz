$(function () {
  var seriesOptions = [],
    seriesCounter = 0;

  // create the chart when all data is loaded
    createChart = function () {
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
    };

  names = ['AAPL', 'GOOGL'];

  $.each(names, function (i, name) {
    $.getJSON('https://www.quandl.com/api/v1/datasets/WIKI/'+name+'.json?exclude_headers=true&sort_order=asc&column=11&collapse=daily&auth_token=J7hxBtcABx8AsszfDzq-',    function (result) {
      seriesOptions[i] = {
        name: name,
        data: result.data.map(function(obj) {
          return [ Date.parse(obj[0]), obj[1]];
        })
      };
      seriesCounter += 1;
      if (seriesCounter === names.length) createChart();
    });
  });
});
