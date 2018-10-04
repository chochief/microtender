
angular.module('app').factory('dataFab', ['$http', '$location', 'cons', 'vals', function ($http, $location, cons, vals) {
	service = {};

	var districts, cities;
	var cats, subcats;

	service.load = function () {
		$http.get(cons.api_path + 'data')
			.then(dataOk, dataReject);
	};

	function dataOk (response) {
		districts = response.data.districts;
		cities = response.data.cities;
		cats = response.data.cats;
		subcats = response.data.subcats;
	}

	function dataReject (error) {
		// console.log(error);
		$location.path('/sorry');
	}

	service.getDistricts = function () {
		return districts;
	};

	service.getCities = function () {
		return cities;
	};

	service.getCats = function () {
		return cats;
	};

	service.getSubcats = function () {
		return subcats;
	};

	service.subcatEnable = function (subcat) {
		var fabSubcat = _.find(subcats, {id: subcat.id});
		if (!angular.isUndefined(fabSubcat)) {
			fabSubcat.enabled = subcat.enabled;
		}
	};	

	service.cityEnable = function (city) {
		var fabCity = _.find(cities, {id: city.id});
		if (!angular.isUndefined(fabCity)) {
			fabCity.enabled = city.enabled;
		}
	};	

	return service;
}]);