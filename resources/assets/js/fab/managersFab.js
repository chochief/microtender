
angular.module('app').factory('managersFab', ['$http', '$location', 'mainFab', 'cons', function ($http, $location, mainFab, cons) {
	service = {};

	var managers = [];

	service.load = function () {

		var token = mainFab.token();

		if (!token) {
			mainFab.logout(false);
			$location.path('/signin');
		} else {
			$http.get(cons.api_path + 'manager' + token)
				.then(dataOk, dataReject);
		}
	};

	function dataOk (response) {
		managers = response.data.managers;

		managers = _.map(managers, function (item) {
			if (!angular.isUndefined(item.site) && item.site != null) {
				if (item.site.substr(0, 7).toLowerCase() == 'http://') {
					item.site = item.site.substr(7);
				} else if (item.site.substr(0, 8).toLowerCase() == 'https://') {
					item.site = item.site.substr(8);
				}
			}
			return item;
		});
	}

	function dataReject (error) {
		if (error.status == 401) {
			mainFab.logout(false);
			$location.path('/signin');
		} else {
			$location.path('/sorry');
		}
	}

	service.getManagers = function () {
		return managers;
	};

	service.setEnable = function (manager) {
		var fabManager = _.find(managers, {id: manager.id});
		if (!angular.isUndefined(fabManager)) {
			fabManager.enabled = manager.enabled;
		}
	};

	service.delete = function (manager_id) {
		_.remove(managers, function(item) {
			return item.id == manager_id;
		});
	};

	service.addManager = function (manager) {
		// console.log(manager);
		managers.unshift(manager);
		// console.log(managers);
		// managers.push(manager);
	};

	return service;
}]);