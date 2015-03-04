// writing a service to encapsulate functionality relating to strategies
// Used in DiversifiedPortfolioCtrl

var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];

angular.module('markoApp').factory('strategyFactory', ['$http', '$q', 
	function($http, $q) {
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
	        		color: colors[5],
	        		dataLabels: name,
	        		data: strategy.map(function(obj) {
	        			return [Date.parse(obj[0]), obj[1]];
	        		})
	        	}
	        	return temp;
	        });

	        return promise;
		};

		var removeStrategy = function(series, index) {
			series.splice(index, 1);
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