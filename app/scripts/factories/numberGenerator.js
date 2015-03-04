// service that randomly generates numbers to choose colors

angular.module('markoApp').factory('numberGenerator', function() {
	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	var isInArray = function(num, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === num) {
				return true;
			}
		}
		return false;
	};

	var getRandomExcluding = function(min, max, ex) {
		var num = getRandomInt(min, max);
		while (isInArray(num, ex)) {
			num = getRandomInt(min, max);
		}
		return num;
	};

	return {
		randNum: function(min, max, ex) {
			return getRandomExcluding(min, max, ex);
		}
	};
});