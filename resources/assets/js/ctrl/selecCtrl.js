
angular.module('app').controller('selecCtrl', ['$scope', function ($scope) {
	
	this.opened = 0; // 0 - закрыты, 1 - левый открыт, 2 - правый

	this.open = function (zone) {
		if (this.opened == 0) {
			this.opened = zone;
		} else {
			this.opened = 0;
		}
	};

	this.openClass = function (zone) {
		if (this.opened == 0) {
			return '';
		} else {
			if (this.opened == zone) {
				return 'opened';
			} else {
				return 'closed';
			}
		}
	};

}]);