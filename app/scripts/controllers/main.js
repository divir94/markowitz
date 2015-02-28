'use strict';

/**
 * @ngdoc function
 * @name markoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the markoApp
 */
angular.module('markoApp')
  .controller('MainCtrl',['$scope', '$http', function ($scope, $http) {
    var sym_name;
    var name_sym = {};
    var currentStock;
    var apikey = 'J7hxBtcABx8AsszfDzq-';
    var url = 'https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?column=11&sort_order=asc&collapse=daily&auth_token=' + apikey;

    // $http.get('http://www.quandl.com/api/v2/datasets.json?query=*&source_code=WIKI&per_page=300&page=1&auth_token=' + apikey)
    // 	.success(function(data, status, headers, config) {
    // 		console.log(data);
    // 	});

  	$http.get('scripts/stock-names.json')
  		.then(function(data, status, headers, config) {
  			sym_name = data.data;
  			var tickerArr = [];
  			var nameArr = [];
  			for (var k in sym_name) {
  				tickerArr.push(k);
  				nameArr.push(sym_name[k]);
  				name_sym[sym_name[k]] = k;
  			}
  			$scope.stockTickers = tickerArr.concat(nameArr);
  		});

  	// $scope.getStockName = function() {
  	// 	if (!sym_name[$scope.selectedStock]) {
  	// 		currentStock = sym_name[$scope.selectedStock];
  	// 	} else {
  	// 		currentStock = name_sym[$scope.selectedStock];
  	// 	}
  	// 	console.log(currentStock);
  	// }

    $http.get(url)
    	.success(function(data, status, headers, config) {
    		console.log('success!');
    		console.log(data);
    	})
    	.error(function(data, status, headers, config) {
    		console.log('Error occurred, data given was ' + data);
    	});
  }]);
