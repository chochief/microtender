
// angular.module('app').run(function ($rootScope, $location, dataFab, mainFab, cons) {
angular.module('app').run(['dataFab', function (dataFab) {

	dataFab.load();

}]);