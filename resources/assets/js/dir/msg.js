
angular.module('app').directive('msg', ['cons', function (cons) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: cons.lang + '/msg.html',
		scope: {},
		link: function (scope, element, attrs) {
			var frm = element.parent();
			var form_name = frm.attr('frm');
			var ctrl_name = frm.attr('ctrl');
			scope.ctrl = frm.controller();

			scope.msgShow = function () {
				return scope.ctrl.msg == '' ? false : true;
			};

			scope.msgClose = function () {
				scope.ctrl.msg = '';
			};

		},
	};
}]);