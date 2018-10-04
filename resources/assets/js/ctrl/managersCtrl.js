
angular.module('app').controller('managersCtrl', ['$http', '$location', 'cons', 'managersFab', 'mainFab', function ($http, $location, cons, managersFab, mainFab) {
	var ctrl = this;

	managersFab.load();

	ctrl.managers = function () {
		return managersFab.getManagers();
	};

	ctrl.on_off = function (manager) {

		var token = mainFab.token();

		if (!token) {
			mainFab.logout(false);
			$location.path('/signin');
		} else if (!ctrl.disabled) {
			ctrl.disabled = true;
			$http.post(cons.api_path + 'manager_on' + token,
			{
				"id": manager.id,
				"enabled": !manager.enabled,
			})
			.then(httpOk, httpReject);
		}
	};

	function httpOk (response) {
		managersFab.setEnable(response.data.manager);
		// manager.enabled = response.data.enabled;
		// 	manager.enabled = !manager.enabled;
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

	ctrl.delete = function (manager) {

		var token = mainFab.token();

		if (!token) {
			mainFab.logout(false);
			$location.path('/signin');
		} else if (!ctrl.disabled) {
			ctrl.disabled = true;
			$http.post(cons.api_path + 'manager_delete' + token,
			{
				"id": manager.id,
			})
			.then(delOk, delReject);
		}
	};

	function delOk (response) {
		managersFab.delete(response.data.manager_id);
		// manager.enabled = response.data.enabled;
		// 	manager.enabled = !manager.enabled;
		ctrl.disabled = false;
	}

	function delReject (error) {
		if (error.status == 401) {
			mainFab.logout(false);
			$location.path('/signin');
		} else {
			// $location.path('/sorry');
		}
		ctrl.disabled = false;
	}

}]);