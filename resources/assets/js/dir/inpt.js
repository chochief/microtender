
angular.module('app').directive('inpt', ['cons', function (cons) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: cons.lang + '/inpt.html',
		scope: {},
		compile: function compile(temaplateElement, templateAttrs) {
			return {
				pre: function (scope, element, attrs) {

					var frm = element.parent();
					scope.ctrl = frm.controller();
					console.log(scope.ctrl);

					scope.form_name = frm.attr('frm');
					scope.ctrl_name = frm.attr('ctrl');
					
					scope.label = attrs['label'];
					element.removeAttr('label');
					
					var help = attrs['help'];
					var span = element.find('span');
					if (angular.isUndefined(help) || (help == '')) {
						span.remove();
					} else {
						span.text(help);
						element.removeAttr('help');
					}
					
					var input = element.find('input');
					input.attr('ng-model', scope.ctrl_name + '.' + attrs['model']);
					// scope.model = scope.ctrl_name + '.' + attrs['model'];
					element.removeAttr('model');

					if (!angular.isUndefined(element.attr('required'))) {
						input.attr('required', '');
						element.removeAttr('required');
					}

					scope.inptDisabled = function () {
						return scope.ctrl.disabled;
					};

					var type = attrs['type'];
					element.removeAttr('type');
					switch (type) {
						case 'text':
							input.attr('type', 'text');
						break;
						case 'email':
							input.attr('type', 'email');
							input.attr('ng-minlength', '7');
						break;
						case 'phone':
							input.attr('type', 'text');
							input.attr('ng-minlength', '4');
							input.prop('ng-pattern', '/^[ 0-9+()-]{5,15}$/');
						break;
						default:
							input.attr('type', 'text');
					}

				},
				post: function(scope, element, attrs) { 
				}
			}
		},		
		// link: function (scope, element, attrs) {
			// var frm = element.parent();
			// scope.ctrl = frm.controller();

			// scope.form_name = frm.attr('frm');
			// scope.ctrl_name = frm.attr('ctrl');
			
			// scope.label = attrs['label'];
			// element.removeAttr('label');
			
			// var help = attrs['help'];
			// var span = element.find('span');
			// if (angular.isUndefined(help) || (help == '')) {
			// 	span.remove();
			// } else {
			// 	span.text(help);
			// 	element.removeAttr('help');
			// }
			
			// var input = element.find('input');
			// input.attr('ng-model', scope.ctrl_name + '.' + attrs['model']);
			// // scope.model = scope.ctrl_name + '.' + attrs['model'];
			// element.removeAttr('model');

			// if (!angular.isUndefined(element.attr('required'))) {
			// 	input.attr('required', '');
			// 	element.removeAttr('required');
			// }

			// scope.inptDisabled = function () {
			// 	return scope.ctrl.disabled;
			// };

			// var type = attrs['type'];
			// element.removeAttr('type');
			// switch (type) {
			// 	case 'text':
			// 		input.attr('type', 'text');
			// 	break;
			// 	case 'email':
			// 		input.attr('type', 'email');
			// 		input.attr('ng-minlength', '7');
			// 	break;
			// 	case 'phone':
			// 		input.attr('type', 'text');
			// 		input.attr('ng-minlength', '4');
			// 		input.prop('ng-pattern', '/^[ 0-9+()-]{5,15}$/');
			// 	break;
			// 	default:
			// 		input.attr('type', 'text');
			// }

		// },
	};
}]);