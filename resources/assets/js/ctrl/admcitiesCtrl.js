
angular.module('app').controller('admcitiesCtrl', ['$http', '$location', 'cons', 'dataFab', 'mainFab', function ($http, $location, cons, dataFab, mainFab) {
	var ctrl = this;

	ctrl.districts = function () {
		return districts = dataFab.getDistricts();
	};

	ctrl.districtCities = function (district) {
		cities = dataFab.getCities();
		return _.orderBy(_.filter(cities, { district_id: district.id }), 'name');
	};

	ctrl.on_off = function (city) {

		var token = mainFab.token();

		if (!token) {
			mainFab.logout(false);
			$location.path('/signin');
		} else if (!ctrl.disabled) {
			ctrl.disabled = true;
			$http.post(cons.api_path + 'city_on' + token,
			{
				"id": city.id,
				"enabled": !city.enabled,
			})
			.then(httpOk, httpReject);
		}
	};

	function httpOk (response) {
		dataFab.cityEnable(response.data.city);
		ctrl.disabled = false;
	}

	function httpReject (error) {
		if (error.status == 401) {
			mainFab.logout(false);
			$location.path('/signin');
		} else {
			// $location.path('/sorry');
		}
		ctrl.disabled = false;
	}

}]);