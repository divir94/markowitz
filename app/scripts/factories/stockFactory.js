// writing a service to encapsulate funcionality that has to do with interacting with a stock

var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];

angular.module('markoApp').factory('stocksFactory', ['$http',
	function($http) {
		var addStock = function(item) {
			var promise = $http.get('https://sleepy-cove-7513.herokuapp.com/quandl', {
				params: {
					stock: item
				}
			})
			.success(function(data, status, headers, config) {
				if (data.length === 0 || data === null) {
					ans = null;
				}
				var stock = data;
				var temp = {
					name: item,
					color: colors[3],
					dataLabels: name,
					data: stock.map(function(o) {
						return [Date.parse(o[0]), o[1]];
					})
				};
				return temp;
				// $('section.loader').hide();
				// createChart([temp], 1);
			})
			.error(function(data, status, headers, config) {
				console.log('Error from addStock in stocksFactory');
				return null;
			});
			return promise;
		}

		// return functions through a closure
		return {
			add: function(i) {
				return addStock(i);
			}
		};
}]);