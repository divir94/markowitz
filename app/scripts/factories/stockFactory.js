// writing a service to encapsulate funcionality that has to do with interacting with a stock
// used in StocksPortfolioCtrl

var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
var usedColors = [];

angular.module('markoApp').factory('stockFactory', ['$http', 'numberGenerator',
	function($http, numberGenerator) {
		var addStock = function(item) {
			var promise = $http.get('https://sleepy-cove-7513.herokuapp.com/quandl', {
				params: {
					stock: item
				}
			})
			.then(function(response) {
				if (response === null || response.data.length === 0) {
					return null;
				}
				var stock = response.data;
				var temp = {
					name: item,
					color: colors[numberGenerator.randNum(0, colors.length, usedColors)],
					dataLabels: name,
					data: stock.map(function(obj) {
						return [Date.parse(obj[0]), obj[1]];
					})
				};
				return temp;
			});

			return promise;
		};

		var removeStock = function(series, i) {
			var color = series[i].color;
			var index = usedColors.indexOf(color);
			usedColors.splice(index, 1);
			series.splice(i, 1);
		};

		// return functions through a closure
		return {
			add: function(i) {
				return addStock(i);
			},
			remove: function(series, i) {
				return removeStock(series, i);
			}
		};
	}
]);