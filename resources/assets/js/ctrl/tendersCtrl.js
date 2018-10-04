
angular.module('app').controller('tendersCtrl', ['$location', 'mainFab', 'tendersFab', function ($location, mainFab, tendersFab) {
	var ctrl = this;

	tendersFab.load();

	ctrl.tenders = function () {
		return tendersFab.getTenders();
	};

	ctrl.getDate = function (string) {
		return new Date(string);
	};
}]);