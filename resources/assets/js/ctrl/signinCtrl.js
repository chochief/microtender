
angular.module('app').controller('signinCtrl', ['$http', '$location', 'cons', 'vals', 'mainFab', function ($http, $location, cons, vals, mainFab) {
	var ctrl = this;

	ctrl.submit = function () {
		ctrl.disabled = true;
		$http.post(cons.api_path + 'signin',
			{
				"name": ctrl.name,
				"password": ctrl.password,
			})
			.then(signinOk, signinReject);
	};

	function signinOk (response) {
		// console.log('tenderOk', response.data);
		mainFab.loginRecord(response.data);

		ctrl.msg = "";
		ctrl.name = undefined;
		ctrl.password = undefined;

		ctrl.disabled = false;
		$location.path('/tenders');
	}

	function signinReject (error) {
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

}]);