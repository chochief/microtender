
angular.module('app').directive('textArea', function () {
	var KEYS = {
		ENTER: 13,
		CTRL: 17,
		ESC: 27,
	};

	var ctrlPressed = false;

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			
			/** ctrl + enter **/

			element.on('keyup', function (event) {
				// console.log('text-area', event.keyCode);
				if (event.keyCode === KEYS.CTRL) {
					ctrlPressed = false;
				}
			});
			
			element.on('keydown', function (event) {
				// console.log('text-area', event.keyCode);
				if (event.keyCode === KEYS.CTRL) {
					ctrlPressed = true;
				}

				if (scope['form'].$valid && (event.keyCode === KEYS.ENTER) && ctrlPressed) {
					// console.log('submit');
					scope['ctrl'].submit(scope['form']);
				}
			});

			/** auto-height **/


			// var hiddenDiv = document.querySelector('.hiddendiv');
			// if (angular.isUndefined(hiddenDiv) || (hiddenDiv == null)) {
			// 	hiddenDiv = angular.element("<div>");
			// 	hiddenDiv.addClass("hiddendiv");
			// 	var body = angular.element(document.querySelector("body"));
			// 	body.append(hiddenDiv);
			// } else {
			// 	hiddenDiv = angular.element(hiddenDiv);
			// }

			// var hiddenDiv = angular.element(element.next());
			// var hiddenDiv = angular.element(document.querySelector(".hiddendiv"));
			// var hiddenDiv = angular.element(document.querySelector("#hdn123"));

			// var hiddenDiv = angular.element("<div>");
			// hiddenDiv.addClass("hiddendiv");
			// var body = angular.element(document.querySelector("body"));
			// body.append(hiddenDiv); 

			element.on('input', function () {
				var content = element.val();
				content = content.replace(/\n/g, '<br>');
				var hiddenDiv = element.next();
				hiddenDiv.html(content + ' ');

				// var computedStyle = element.getComputedStyle();
    			// alert( computedStyle.width );
   				// console.log(element[0].clientWidth);
   				// console.log(element[0].clientHeight);
				
				// hiddenDiv.css('width', element.css("width"));
				// hiddenDiv.css('height', element[0].offsetHeight+'px'); 
				hiddenDiv.css('width', element[0].offsetWidth+'px'); 
				// element.css('min-height', hiddenDiv.css("height")); 
				element.css('height', hiddenDiv[0].offsetHeight+'px'); 
			});
		},
		scope: {
			form: '=',
			ctrl: '=',
		},
		// templateUrl: ,
	};
});