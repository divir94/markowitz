// writing a service to encapsulate functionality relating to strategies
// Used in DiversifiedPortfolioCtrl

var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
var usedColors = [];

angular.module('markoApp').factory('strategyFactory', ['$http', 'numberGenerator', 
	function($http, numberGenerator) {
		var addStrategy = function(item) {

			var promise = $http.get('https://sleepy-cove-7513.herokuapp.com/french', {
	            params: {
	                factor: item
	            }
	        })
	        .then(function(response) {
	        	if (response === null || response.data.length === 0) {
	        		return null;
	        	}
	        	var strategy = response.data;
	        	var temp = {
	        		name: item,
	        		color: colors[numberGenerator.randNum(0, colors.length, usedColors)],
	        		dataLabels: name,
	        		data: strategy.map(function(obj) {
	        			return [Date.parse(obj[0]), obj[1]];
	        		})
	        	}
	        	return temp;
	        });

	        return promise;
		};

		var removeStrategy = function(series, i) {
			var color = series[i].color;
			var index = usedColors.indexOf(color);
			usedColors.splice(index, 1);
			series.splice(i, 1);
		};

		// return functions using closures
		return {
			add: function(i) {
				return addStrategy(i);
			},
			remove: function(series, index) {
				return removeStrategy(series, index);
			}
		};
	}
]);