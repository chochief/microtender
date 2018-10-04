
angular.module('app').controller('cityCtrl', ['$scope', 'dataFab', function ($scope, dataFab) {
	var ctrl = this;

	// ctrl.city = undefined;
	// ctrl.cities = [];

	// if (angular.isUndefined($scope.$parent.editing)) {
	// 	ctrl.city = undefined;
	// 	ctrl.cities = [];
	// } else {
	// 	ctrl.cities = $scope.$parent.editing.cities;
	// }
	ctrl.city = $scope.$parent.$parent.city;
	ctrl.cities = $scope.$parent.cities;

	/** Отображение списка **/

	ctrl.districts = function () {
		return districts = dataFab.getDistricts();
	};

	ctrl.districtCities = function (district) {
		cities = dataFab.getCities();
		return _.orderBy(_.filter(cities, { district_id: district.id, enabled: 1 }), 'name');
	};

	/** Единичный выбор в списке **/	

	ctrl.selectedCity = function () {
		// if (angular.isUndefined(ctrl.city) || (_.isEmpty(ctrl.city))) {
		if (angular.isUndefined($scope.$parent.$parent.city) || (_.isEmpty($scope.$parent.$parent.city))) {
			return 'Выберите город';
		} else {
			return ctrl.city.name;
		}
	};

	ctrl.choice = function (city) {
		ctrl.city = angular.copy(city);
		$scope.$parent.$parent.city = ctrl.city;
	};

	ctrl.active = function(city) {
		ctrl.city = $scope.$parent.$parent.city;
		if (angular.isUndefined(ctrl.city)) {
			return '';
		} else {
			return ctrl.city.id == city.id ? 'select-panel__item_active' : '';
		}
	};

	/** Множественный выбор в списке **/

	ctrl.citiesCount = function () {
		return ctrl.cities.length;
	};

	ctrl.cityChoice = function (city) {
		if (angular.isUndefined(_.find(ctrl.cities, {'id': city.id}))) {
			ctrl.cities.push(city);
		} else {
			// _.pull(ctrl.cities, city);
			_.remove(ctrl.cities, function(item) {
				return item.id == city.id;
			});
		}
	};

	ctrl.selectedCities = function () { /** ! массив выбранных городов нового провайдера **/
		return ctrl.cities;
	};

	ctrl.selectedState = function () {
		var count = ctrl.cities.length;
		if (count == 0) {
			return 'Выберите города';
		} else {
			return 'Выбрано: ' + count;
		}
	};

	ctrl.activeCity = function (city) {
		if (angular.isUndefined(_.find(ctrl.cities, {'id': city.id}))) {
			return '';
		} else {
			return 'select-panel__item_active';
		}
	};

	// ctrl.getCityIds = function (reCities) {
	// 	if (!angular.isUndefined(reCities)) {
	// 		if (reCities == -1) {
	// 			ctrl.cities = [];
	// 		} else {
	// 			ctrl.cities = reCities;
	// 		}
	// 	} 
	// 	return _.map(ctrl.cities, function (item) {
	// 		return item.id;
	// 	});
	// };	

	// ctrl.getCityId = function (clear) {
	// 	if (clear == -1) {
	// 		ctrl.city = undefined;
	// 		ctrl.cities = [];
	// 		return undefined;			
	// 	} else {
	// 		return ctrl.city.id;
	// 	}
	// };		

	/** **/	

}]);