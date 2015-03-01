var setHeights = function() {
    var windowH = $(window).outerHeight();
    var headerH = $('header').outerHeight();
    var navH    = $('nav.tabs').outerHeight();
    var footerH = $('footer').outerHeight();
    $('main').height(Math.ceil(windowH - headerH - footerH - navH - 10));
};

var createChart = function(seriesOptions) {
  $('.line-chart').highcharts('StockChart', {
    rangeSelector: {
      selected: 4
    },
    xAxis: {
      lineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0,
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%e of %b'
      }
    },
    yAxis: {
      gridLineColor: '#f5f5f5',
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



