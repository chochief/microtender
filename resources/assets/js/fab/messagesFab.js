
angular.module('app').factory('messagesFab', ['$http', '$location', 'mainFab', 'cons', function ($http, $location, mainFab, cons) {
	service = {};

	var messages = [];

	service.load = function () {

		var token = mainFab.token();

		if (!token) {
			mainFab.logout(false);
			$location.path('/signin');
		} else {
			$http.get(cons.api_path + 'messages' + token)
				.then(dataOk, dataReject);
		}
	};

	function dataOk (response) {
		messages = response.data.messages;
	}

	function dataReject (error) {
		if (error.status == 401) {
			mainFab.logout(false);
			$location.path('/signin');
		} else {
			$location.path('/sorry');
		}
	}

	service.getMessages = function () {
		return messages;
	};

	return service;
}]);