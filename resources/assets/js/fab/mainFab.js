
angular.module('app').factory('mainFab', ['$location', '$http', 'cons', 'vals', function($location, $http, cons, vals) {
	var service = {};

	/** Auth **/

	service.loginRecord = function (data) {
		localStorage.setItem('api_token', data.api_token);
		localStorage.setItem('username', data.username);
	};

	service.token = function () {
		var token = localStorage.getItem('api_token');
		if (angular.isString(token) && (token.length == 60)) {
			return '?api_token=' + token;
		} else {
			return false;
			// $location.path('/login');
		}
	};

	service.username = function () {
		return localStorage.getItem('username');
	};

	// service.logout = function (extended = true) {
	service.logout = function (extended) {

		if (extended) {
			if (token = service.token()) {
				$http.post(cons.api_path + 'logout' + token, {});
			}
		}

		localStorage.setItem('api_token', '');
		localStorage.setItem('username', '');
	};

	return service;
}]);