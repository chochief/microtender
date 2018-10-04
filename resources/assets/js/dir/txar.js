
angular.module('app').directive('txar', ['cons', function (cons) {
	var KEYS = {
		ENTER: 13,
		CTRL: 17,
		ESC: 27,
	};

	var ctrlPressed = false;

	return {
		restrict: 'E',
		replace: true,
		templateUrl: cons.lang + '/txar.html',
		scope: {
			// form: '=',
			// ctrl: '=',
		},
		link: function (scope, element, attrs) {
			var frm = element.parent();
			scope.ctrl = frm.controller();

			scope.form_name = frm.attr('frm');
			scope.ctrl_name = frm.attr('ctrl');
			
			scope.label = attrs['label'];
			scope.help = attrs['help'];
			
			var textArea = element.find('textarea');
			textArea.attr('ng-model', scope.ctrl_name + '.' + attrs['model']);

			if (!angular.isUndefined(element.attr('required'))) {
				textArea.attr('required', '');
				element.removeAttr('required');
			}

			scope.txarDisabled = function () {
				return scope.ctrl.disabled;
			};

			/** ctrl + enter **/

			textArea.on('keyup', function (event) {
				if (event.keyCode === KEYS.CTRL) {
					ctrlPressed = false;
				}
			});
			
			textArea.on('keydown', function (event) {
				if (event.keyCode === KEYS.CTRL) {
					ctrlPressed = true;
				}

				// console.log('valid', frm.$valid);
				// if (frm.$valid && (event.keyCode === KEYS.ENTER) && ctrlPressed) {
				if (true && (event.keyCode === KEYS.ENTER) && ctrlPressed) {
					console.log('submit');
					// scope.ctrl.submit(form_name);
				}
			});

			/** auto-height **/

			var hiddenDiv = angular.element("<div>");
			hiddenDiv.addClass("hiddendiv");
			var body = angular.element(document.querySelector("body"));
			body.append(hiddenDiv);

			textArea.on('input', function () {
				var content = textArea.val();
				content = content.replace(/\n/g, '<br>');
				hiddenDiv.html(content + ' ');
		
				hiddenDiv.css('width', textArea.css("width"));
				textArea.css('min-height', hiddenDiv.css("height")); 
			});

			/** **/

		},
	};
}]);