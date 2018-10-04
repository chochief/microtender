
angular.module('app').controller('topCtrl', ['$http', '$scope', 'cons', 'vals', function ($http, $scope, cons, vals) {
	var ctrl = this;

	ctrl.attachFile = function () {
		console.log('attachFile');
		// var fileInput = document.getElementById("fileInput");
    	// fileInput.click();
    	// jquery('#fileInput').trigger('click');

    	angular.element(document.querySelector("#fileInput")).triggerHandler("click");
    	
    	// angular.element('fileInput').triggerHandler('click');
    	// var fi = angular.element(document.querySelector("#fileInput")); //.trigger('click');
    	// var fi = angular.element(document).find("#fileInput"); //.trigger('click');
    	// fi.click();
    	// angular.element(document.querySelector('#fileInput')).trigger('click');
	};

	ctrl.submit = function (form) {
		// console.log('submit pressed', ctrl.attach);
		ctrl.disabled = true;
		$http.post(cons.api_path + 'tender',
			{
				"category_id": $scope.subcat.id,
				"city_id": $scope.city.id,
				"text": ctrl.order,
				"budjet": ctrl.budget,
				"price": price,
				"name": ctrl.name,
				"email": ctrl.email,
				"phone": ctrl.phone,
				"attach": ctrl.attach,
			})
			.then(tenderOk, tenderReject);
			ctrl.form = form;
	};

	function tenderOk (response) {
		// console.log('tenderOk', response.data);
		ctrl.msg = "Ваша заявка была успешно отправлена! Спасибо, что воспользовались сервисом МИКРОТЕНДЕР.РФ Вы можете продолжить и отправить новую заявку!";
		ctrl.order = undefined;
		ctrl.budget = undefined;

		$scope.subcat = {};
		$scope.city = {};

		ctrl.disabled = false;
		ctrl.form.$setPristine();
	}

	function tenderReject (error) {
		// console.log('tenderReject', error);
		if (angular.isArray(error)) { // если в виде массива пришли ошибки
			ctrl.msg = _.join(error.data, " ");
		} else {
			if (error.status == 429) {
				ctrl.msg = 'Слишком много попыток. Подождите минуту!';
			} else { // если в виде строки пришли ошибки
				ctrl.msg = 'Ошибка: ' + error.data;
			}
		}

		ctrl.disabled = false;
	}

	ctrl.formDisabled = function () {
		return ctrl.disabled;
	};
	
	/** Price checkbox **/

	var price = false;
	
	ctrl.priceToggle = function () {
		price = !price;
		// console.log(ctrl.price);
		// ctrl.price ? ctrl.price = false : ctrl.price = true;
	};

	ctrl.priceState = function () {
		return price ? 'checked' : '';
	};

	/** **/

	$scope.subcat = {};
	$scope.subcats = [];
	$scope.city = {};
	$scope.cities = [];

	ctrl.customEmpty = function () {
		if (angular.isUndefined($scope.city) || (_.isEmpty($scope.city))) {
			return true;
		}
		if (angular.isUndefined($scope.subcat) || (_.isEmpty($scope.subcat))) {
			return true;
		}
		return false;
	};

	/** Msg **/
	ctrl.msg = '';

	ctrl.showMsg = function () {
		return ctrl.msg == '' ? false : true;
	};

	ctrl.msgClose = function () {
		ctrl.msg = '';
	};

	/** **/

}]);