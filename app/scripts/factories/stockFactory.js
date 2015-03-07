// writing a service to encapsulate funcionality that has to do with interacting with a stock
// used in StocksPortfolioCtrl

var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
var currentIndex = 0;

angular.module('markoApp').factory('stockFactory', ['$http',
	function($http) {
		var addStock = function(item) {
			var promise = $http.get('https://sleepy-cove-7513.herokuapp.com/graph/stock', {
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
					color: colors[currentIndex % colors.length],
					dataLabels: name,
					data: stock.map(function(obj) {
						return [Date.parse(obj[0]), obj[1]];
					})
				};
				currentIndex++;
				return temp;
			});

			return promise;
		};

		var removeStock = function(series, i) {
			series.splice(i, 1);
		};

		var getListOfStocks = function() {
			var promise = $http.get('data/stock-names.json').then(function(response) {
				//console.log(response.data);
				if (response !== null || response.data !== null) {
					return response.data;
				}
			});
			return promise;
		};

		var getPortfolio = function(array) {
			var promise = $http.get('https://sleepy-cove-7513.herokuapp.com/portfolio/stock', {
				params: {
					stocks: array
				}
			})
			.then(function(response) {
				if (response === null || response.data === null) {
					return null;
				}
				var stock = response.data;
				var temp = {
					name: 'Portfolio',
					color: '#D21F57',
					dataLabels: name,
					data: stock.map(function(obj) {
						return [Date.parse(obj[0]), obj[1]];
					})
				};
				return temp;
			});

			return promise;
		}

		// return functions through a closure
		return {
			add: function(i) {
				return addStock(i);
			},
			remove: function(series, i) {
				return removeStock(series, i);
			},
			list: function() {
				return getListOfStocks();
			},
			portfolio: function(arr) {
				return getPortfolio(arr);
			}
		};
	}
]);