
angular.module('app').controller('admcatsCtrl', ['$http', '$location', 'dataFab', 'mainFab', 'cons', function ($http, $location, dataFab, mainFab, cons) {
	var ctrl = this;

	ctrl.cats = function () {
		return dataFab.getCats();
	};

	ctrl.subCats = function (cat) {
		subcats = dataFab.getSubcats();
		return _.orderBy(_.filter(subcats, { cat_id: cat.id }), 'name');
	};

	ctrl.on_off = function (subcat) {

		var token = mainFab.token();

		if (!token) {
			mainFab.logout(false);
			$location.path('/signin');
		} else if (!ctrl.disabled) {
			ctrl.disabled = true;
			$http.post(cons.api_path + 'subcat_on' + token,
			{
				"id": subcat.id,
				"enabled": !subcat.enabled,
			})
			.then(httpOk, httpReject);
		}
	};

	function httpOk (response) {
		dataFab.subcatEnable(response.data.subcat);
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