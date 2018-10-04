
angular.module('app').controller('messagesCtrl', ['messagesFab', function (messagesFab) {
	var ctrl = this;

	messagesFab.load();

	ctrl.messages = function () {
		return messagesFab.getMessages();
	};

}]);