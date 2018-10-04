
angular.module('app').controller('catCtrl', ['$scope', 'dataFab', function ($scope, dataFab) {
	var ctrl = this;

	// ctrl.subcat = undefined;
	// ctrl.subcats = [];

	// if (angular.isUndefined($scope.$parent.editing)) {
	// 	ctrl.subcat = undefined;
	// 	ctrl.subcats = [];
	// } else {
	// 	// ctrl.subcats = $scope.$parent.subcats;
	// 	ctrl.subcats = $scope.$parent.editing.subcats;
	// }
	ctrl.subcat = $scope.$parent.$parent.subcat;
	ctrl.subcats = $scope.$parent.subcats;

	/** Отображение списка **/

	ctrl.cats = function () {
		// return cats = dataFab.getCats();
		return dataFab.getCats();
	};

	ctrl.subCats = function (cat) {
		subcats = dataFab.getSubcats();
		return _.orderBy(_.filter(subcats, { cat_id: cat.id, enabled: 1 }), 'name');
	};

	/** Единичный выбор в списке **/

	ctrl.selectedCat = function () {
		// if (angular.isUndefined(ctrl.subcat) || (_.isEmpty(ctrl.subcat))) {
		if (angular.isUndefined($scope.$parent.$parent.subcat) || (_.isEmpty($scope.$parent.$parent.subcat))) {
			return 'Выберите категорию';
		} else {
			return ctrl.subcat.name;
		}
	};

	ctrl.choice = function (subcat) {
		ctrl.subcat = angular.copy(subcat);
		$scope.$parent.$parent.subcat = ctrl.subcat;
	};

	ctrl.active = function(subcat) {
		ctrl.subcat = $scope.$parent.$parent.subcat;
		if (angular.isUndefined(ctrl.subcat)) {
			return '';
		} else {
			return ctrl.subcat.id == subcat.id ? 'select-panel__item_active' : '';
		}
	};

	/** Множественный выбор в списке **/

	ctrl.catsCount = function () {
		return ctrl.subcats.length;
	};

	ctrl.catsChoice = function (subcat) {
		if (angular.isUndefined(_.find(ctrl.subcats, {'id': subcat.id}))) {
			ctrl.subcats.push(subcat);
		} else {
			// console.log('pull', ctrl.subcats, subcat);
			// _.pull(ctrl.subcats, subcat);
			_.remove(ctrl.subcats, function(item) {
				return item.id == subcat.id;
			});
		}		
	};

	ctrl.selectedCats = function () { /** ! массив выбранных категорий нового провайдера **/
		return ctrl.subcats;
	};

	ctrl.selectedState = function () {
		var count = ctrl.subcats.length;
		if (count == 0) {
			return 'Выберите категории';
		} else {
			return 'Выбрано: ' + count;
		}
	};

	ctrl.activeCat = function (subcat) {
		if (angular.isUndefined(_.find(ctrl.subcats, {'id': subcat.id}))) {
			return '';
		} else {
			return 'select-panel__item_active';
		}		
	};

	// var reCount = 0;

	// ctrl.getCatsIds = function (reSubcats) {
	// 	// console.log(reSubcats);
	// 	if (!angular.isUndefined(reSubcats)) {
	// 		if (reSubcats == -1) {
	// 			ctrl.subcats = [];
	// 		} else {
	// 			if (reCount == 0) {
	// 				// ctrl.subcats = _.map(angular.copy(reSubcats), function (item) {
	// 				// 	return item.id;
	// 				// });
	// 				// _.map(reSubcats, function (item) {
	// 				// 	// return {'id': item.id, 'cat_id': item.cat_id, 'name': item.name};
	// 				// 	ctrl.subcats.push({'id': item.id, 'cat_id': item.cat_id, 'name': item.name});
	// 				// });
	// 				ctrl.subcats = angular.copy(reSubcats);
	// 				reCount++;
	// 			} 
	// 		}
	// 	}
	// 	// console.log(ctrl.subcats); 
	// 	return ctrl.subcats;
	// };	

	// ctrl.getCatId = function (clear) {
	// 	if (clear == -1) {
	// 		ctrl.subcat = undefined;
	// 		ctrl.subcats = [];
	// 		return undefined;			
	// 	} else {
	// 		return ctrl.subcat.id;
	// 	}
	// };	

	/** **/

}]);