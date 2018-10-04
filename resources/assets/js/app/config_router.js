
angular.module('app').config(['$routeProvider', 'cons', function($routeProvider, cons) {
	$routeProvider
		.when('/', {
			templateUrl: cons.lang + '/home.html',
			controller: 'homeCtrl'
			})
		.when('/call', {
			templateUrl: cons.lang + '/call.html',
			controller: 'callCtrl as callCtrl'
		})
		.when('/about', {
			templateUrl: cons.lang + '/about.html',
			controller: 'aboutCtrl'
		})
		.when('/want', {
			templateUrl: cons.lang + '/want.html',
			controller: 'wantCtrl as wantCtrl'
		})
		.when('/sorry', {
			templateUrl: cons.lang + '/sorry.html',
			controller: 'sorryCtrl'
		})
		.when('/signin', {
			redirectTo: function (routeParams, path, search) {
				return auth(path);
			},
			templateUrl: cons.lang + '/signin.html',
			controller: 'signinCtrl as signinCtrl',
		})
		.when('/messages', {
			templateUrl: cons.lang + '/messages.html',
			controller: 'messagesCtrl as messagesCtrl',
			redirectTo: function (routeParams, path, search) {
				return auth(path);
			},
		})
		.when('/tenders', {
			templateUrl: cons.lang + '/tenders.html',
			controller: 'tendersCtrl as tendersCtrl',
			redirectTo: function (routeParams, path, search) {
				return auth(path);
			},
		})
		.when('/managers', {
			templateUrl: cons.lang + '/managers.html',
			controller: 'managersCtrl as managersCtrl',
			redirectTo: function (routeParams, path, search) {
				return auth(path);
			},
		})
		.when('/admin_cats', {
			templateUrl: cons.lang + '/admin_cats.html',
			controller: 'admcatsCtrl as admcatsCtrl',
			redirectTo: function (routeParams, path, search) {
				return auth(path);
			},
		})
		.when('/admin_cities', {
			templateUrl: cons.lang + '/admin_cities.html',
			controller: 'admcitiesCtrl as admcitiesCtrl',
			redirectTo: function (routeParams, path, search) {
				return auth(path);
			},
		})
		.otherwise({
			redirectTo: '/'
		});

	function fuk () {
		return false;
	}

	function auth (path) {
		var token = localStorage.getItem('api_token');
		if (path == "/signin") {
			if (angular.isString(token) && (token.length == 60)) {
				return "/tenders";
			} else {
				return;
			}
		} else {
			if (angular.isString(token) && (token.length == 60)) {
				return;
			} else {
				return "/signin";
			}
		}
	}
}]);