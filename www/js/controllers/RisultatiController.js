angular.module('magic').controller('RisultatiController', function($scope, $http, $state, $rootScope, mainService) {
	console.log('RisultatiController controller');
	if ($scope.isLoggedIn()) {
		console.log('logged in');
	}
	else {
		console.log('not logged in');
		$state.go('login');
		return;
	}
	$scope.tabOk = function(response) {
		console.log('tabok ' + response);
		$scope.tabellino = response;
	};
	$scope.tabKo = function(response) {
		console.log('tabKO ' + response);
	};
	mainService.getTabellino($scope.teamInfo.data, $scope.tabOk, $scope.tabKo);
});
