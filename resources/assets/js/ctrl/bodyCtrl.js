
angular.module('app').controller('bodyCtrl', ['$location', 'mainFab', function ($location, mainFab) {
	var ctrl = this;

	// ctrl.call = function (adr = 'call') {
	ctrl.call = function (adr) {
		// $location.path('/call');
		$location.path('/' + adr);
	};

	ctrl.logout = function () {
		mainFab.logout(true);
		$location.path('/signin');
	};

	ctrl.username = function () {
		return mainFab.username();
	};

}]);