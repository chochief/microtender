
angular.module('app').factory('tendersFab', ['$http', '$location', 'mainFab', 'cons', function ($http, $location, mainFab, cons) {
	service = {};

	var tenders = [];

	service.load = function () {

		var token = mainFab.token();

		if (!token) {
			mainFab.logout(false);
			$location.path('/signin');
		} else {
			$http.get(cons.api_path + 'tenders' + token)
				.then(dataOk, dataReject);
		}
	};

	function dataOk (response) {
		tenders = response.data.tenders;
	}

	function dataReject (error) {
		if (error.status == 401) {
			mainFab.logout(false);
			$location.path('/signin');
		} else {
			$location.path('/sorry');
		}
	}

	service.getTenders = function () {
		return tenders;
	};

	return service;
}]);