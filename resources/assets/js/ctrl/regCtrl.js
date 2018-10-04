
angular.module('app').controller('regCtrl', ['$http', '$location', '$scope', 'cons', 'mainFab', 'managersFab', function ($http, $location, $scope, cons, mainFab, managersFab) {
	var ctrl = this;

	ctrl.pageY = window.pageYOffset;

	// получаем контроллер родителя (через ng-init срабатывает)
	ctrl.manSet = function (mans) {
		ctrl.mans = mans;
	};

	// доступ к контроллеру catCtrl через ng-init
	ctrl.catSet = function (catCtrl) {
		ctrl.catCtrl = catCtrl;
	};

	// доступ к контроллеру cityCtrl через ng-init
	ctrl.citySet = function (cityCtrl) {
		ctrl.cityCtrl = cityCtrl;
	};

	if (!angular.isUndefined(ctrl.mans)) {
		ctrl.mans.showAdd = false;
	}

	ctrl.submit = function (form) {
		// console.log('submit pressed', ctrl.attach);
		ctrl.disabled = true;
		$http.post(cons.api_path + 'manager',
			{
				"company": ctrl.company,
				"address": ctrl.address,
				"inn": ctrl.inn,
				"site": ctrl.site,
				"categories": subcatsIds($scope.subcats),
				"cities": citiesIds($scope.cities),
				// "categories": ctrl.subcats,
				// "cities": ctrl.cities,
				"description": ctrl.description,
				"surname": ctrl.surname,
				"name": ctrl.name,
				"middle_name": ctrl.middle_name,
				"post": ctrl.post,
				"phone": ctrl.phone,
				"mobile": ctrl.mobile,
				"email": ctrl.email,
			})
			.then(httpOk, httpReject);
			ctrl.form = form;
	};

	function httpOk (response) {
		if (mainFab.token()) {
			var manager = {};
			manager.id = response.data.manager_id;
			manager.company = ctrl.company;
			manager.address = ctrl.address;
			manager.inn = ctrl.inn;
			manager.site = ctrl.site;
			manager.subcats = $scope.subcats;
			manager.cities = $scope.cities;
			manager.description = ctrl.description;
			manager.surname = ctrl.surname;
			manager.name = ctrl.name;
			manager.middle_name = ctrl.middle_name;
			manager.post = ctrl.post;
			manager.phone = ctrl.phone;
			manager.mobile = ctrl.mobile;
			manager.email = ctrl.email;
			managersFab.addManager(manager);
			manager = undefined;
			// скрываем форму если это было добавление поставщика в админке
			if (!angular.isUndefined(ctrl.mans)) {
				ctrl.mans.showAdd = false;
			}
			// чистим селекты (доступ к кнотроллерам получен через ng-init выше)
			ctrl.catCtrl.subcats = [];
			ctrl.cityCtrl.cities = [];
		}

		// console.log('tenderOk', response.data);
		ctrl.msg = "Менеджер и его компания успешно добавлены. Заявки начнут приходить после этапа модерации.";
		// ctrl.msg = "Ваши данные были успешно отправлены! Спасибо, что присоединились к сервису МИКРОТЕНДЕР.РФ После этапа модерации вы начнете получать заявки!";
		ctrl.company = undefined;
		ctrl.address = undefined;
		ctrl.inn = undefined;
		ctrl.site = undefined;
		ctrl.description = undefined;
		ctrl.surname = undefined;
		ctrl.name = undefined;
		ctrl.middle_name = undefined;
		ctrl.post = undefined;
		ctrl.phone = undefined;
		ctrl.mobile = undefined;
		ctrl.email = undefined;
		
		$scope.subcats = [];
		$scope.cities = [];

		ctrl.disabled = false;
		ctrl.form.$setPristine();

		window.scrollTo(0, ctrl.pageY);
	}

	ctrl.formDisabled = function () {
		return ctrl.disabled;
	};
	
	/** Update **/

	ctrl.update = function (form) {

		// console.log(ctrl.editing);
		// return;

		var token = mainFab.token();

		if (!token) {
			mainFab.logout(false);
			$location.path('/signin');
		} else {
			// console.log('submit pressed', ctrl.attach);
			ctrl.disabled = true;
			$http.post(cons.api_path + 'manager_update' + token,
				{
					"id": ctrl.editing.id,
					"company": ctrl.editing.company,
					"address": ctrl.editing.address,
					"inn": ctrl.editing.inn,
					"site": ctrl.editing.site == null ? undefined : ctrl.editing.site,
					"categories": subcatsIds(ctrl.editing.subcats),
					"cities": citiesIds(ctrl.editing.cities),
					// "categories": ctrl.subcats,
					// "cities": ctrl.cities,
					"description": ctrl.editing.description,
					"surname": ctrl.editing.surname,
					"name": ctrl.editing.name,
					"middle_name": ctrl.editing.middle_name == null ? undefined : ctrl.editing.middle_name,
					"post": ctrl.editing.post,
					"phone": ctrl.editing.phone,
					"mobile": ctrl.editing.mobile == null ? undefined : ctrl.editing.mobile,
					"email": ctrl.editing.email,
				})
				.then(updateOk, httpReject);
			ctrl.form = form;
		}
	};

	function updateOk (response) {
		// console.log('tenderOk', response.data);
		// console.log(ctrl.editing.subcats);

		// ctrl.manager = angular.copy(ctrl.editing);
		ctrl.manager.company = ctrl.editing.company;
		ctrl.manager.address = ctrl.editing.address;
		ctrl.manager.inn = ctrl.editing.inn;
		ctrl.manager.site = ctrl.editing.site;
		ctrl.manager.subcats = ctrl.editing.subcats;
		ctrl.manager.cities = ctrl.editing.cities;
		ctrl.manager.description = ctrl.editing.description;
		ctrl.manager.surname = ctrl.editing.surname;
		ctrl.manager.name = ctrl.editing.name;
		ctrl.manager.middle_name = ctrl.editing.middle_name;
		ctrl.manager.post = ctrl.editing.post;
		ctrl.manager.phone = ctrl.editing.phone;
		ctrl.manager.mobile = ctrl.editing.mobile;
		ctrl.manager.email = ctrl.editing.email;

		ctrl.isEditing = false;
		ctrl.editing = null;
		ctrl.editBtn = 'Edit';

		ctrl.disabled = false;

		window.scrollTo(0, ctrl.pageY);
	}

	function httpReject (error) {
		// потеря авторизации
		if (error.status == 401) {
			mainFab.logout(false);
			$location.path('/signin');
		} 		
		// console.log('Reject', error.data);
		if (angular.isArray(error.data)) { // если в виде массива пришли ошибки
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

	/** **/

	$scope.subcat = {};
	$scope.subcats = [];
	$scope.city = {};
	$scope.cities = [];

	ctrl.customEmpty = function () {
		if (angular.isUndefined($scope.cities) || ($scope.cities.length == 0)) {
			return true;
		}
		if (angular.isUndefined($scope.subcats) || ($scope.subcats.length == 0)) {
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

	/** Edit **/

	ctrl.isEditing = false;
	ctrl.editing = null;
	ctrl.editBtn = 'Edit';

	ctrl.edit = function (manager) {
		if (ctrl.isEditing) {
			ctrl.isEditing = false;
			ctrl.editing = null;
			ctrl.editBtn = 'Edit';
			window.scrollTo(0, ctrl.pageY);
		} else {
			ctrl.pageY = window.pageYOffset;
			ctrl.isEditing = true;
			ctrl.editBtn = 'Cancel';
			ctrl.editing = angular.copy(manager);
			ctrl.manager = manager;
			$scope.subcats = ctrl.editing.subcats;
			$scope.cities = ctrl.editing.cities;
			// $scope.editing = ctrl.editing;
		}
	};

	/** **/

	function subcatsIds (obj) {
		return 	_.map(obj, function (item) {
					return item.id;
				});
	}

	function citiesIds (obj) {
		// return 	_.map(ctrl.editing.cities, function (item) {
		return 	_.map(obj, function (item) {
					return item.id;
				});
	}

}]);