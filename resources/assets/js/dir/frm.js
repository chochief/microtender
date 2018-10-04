
angular.module('app').directive('frm', function () {
	return {
		restrict: 'A',
		scope: {
			frm: '@',
			ctrl: '=',
		},
		link: function (scope, element, attrs) {
			// name="regForm" novalidate ng-submit="regCtrl.submit(regForm)"
			var form_name = attrs['frm'];
			var ctrl_name = attrs['ctrl'];
			element.attr('name', form_name);
			element.attr('ng-submit', ctrl_name + '.submit(' + form_name + ')');
			element.attr('novalidate', '');
		},
	};
});