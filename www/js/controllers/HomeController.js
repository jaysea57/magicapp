angular.module('magic').controller('HomeController', function($scope, $http, $state, $rootScope, mainService) {
	console.log('HomeController controller');
	if ($scope.isLoggedIn()) {
		console.log('logged in');
	}
	else {
		console.log('not logged in');
		$state.go('login');
		return;
	}
	$scope.userTeams = mainService.getUserTeams();
	if (!$scope.isTeamChosen()) {
		console.log('not team chosen');
		return;
	}
	console.log("team current " + JSON.stringify($scope.team));
    console.log('team ' + $scope.team.dsSquadra);
});

angular.module('magic').controller('HomeGPController', function($scope, $http, $state, $rootScope, mainService) {
	console.log('HomeGPController controller');
});	



angular.module('magic').controller('HomeSDController', function($scope, $http, $state, $rootScope, mainService) {
	console.log('HomeSDController controller');
});	
