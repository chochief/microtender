
angular.module('app').controller('callCtrl', ['$http', 'cons', 'vals', function ($http, cons, vals) {
	var ctrl = this;
	
	ctrl.submit = function (form) {
		ctrl.disabled = true;
		ctrl.form = form;
		$http.post(cons.api_path + 'messages',
			{
				"name": ctrl.name,
				"email": ctrl.email,
				"phone": ctrl.phone,
				"text": ctrl.text,
			})
			.then(msgOk, msgReject);
	};

	function msgOk (response) {
		ctrl.msg = "Ваше сообщение было успешно отправлено! Спасибо!";
		ctrl.text = undefined;

		ctrl.disabled = false;
		ctrl.form.$setPristine();
	}

	function msgReject (error) {
		console.log('tenderReject', error);
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