angular.module('magic').controller('HomeController', function($scope, $http, $state, $rootScope, mainService, $ionicPopover) {
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
	$scope.$on('$ionicView.afterEnter', function(){
  		console.log('ionic view home gp ...');
	});
	// .fromTemplateUrl() method
  	$ionicPopover.fromTemplateUrl('templates/comuf.html', {
    	scope: $scope
  	}).then(function(popover) {
    	$scope.popover = popover;
  	});
	$scope.openPopover = function($event) {
		console.log('open pop ' + $event);
		$scope.popover.show($event);
	};
	$scope.closePopover = function() {
		console.log('close pop ');
		$scope.popover.hide();
	};
	//Cleanup the popover when we're done with it!
	$scope.$on('$destroy', function() {
		console.log('destroying popover on homegp');
		$scope.popover.remove();
	});
	// Execute action on hidden popover
	$scope.$on('popover.hidden', function() {
		// Execute action
	});
	// Execute action on remove popover
	$scope.$on('popover.removed', function() {
		// Execute action
	});	
	console.log("team current " + JSON.stringify($scope.team));
    console.log('team ' + $scope.team.dsSquadra);
});

angular.module('magic').controller('HomeGPController', function($scope, $http, $state, $rootScope, mainService, $ionicScrollDelegate,$sce) {
	console.log('HomeGPController controller');
});	


angular.module('magic').controller('HomeComufController', function($scope, $http, $state, $rootScope, mainService, $ionicScrollDelegate,$sce) {
	console.log('HomeComufController controller');
	$scope.$on('$ionicView.afterEnter', function(){
  		console.log('ionic view after enter faccio resize');
		$scope.resize();
	});
    $scope.resize = function() {
        console.log('resize');
        $ionicScrollDelegate.$getByHandle('scrollComuff').resize();
    } 
});	

angular.module('magic').controller('HomeSDController', function($scope, $http, $state, $rootScope, mainService) {
	console.log('HomeSDController controller');
});	
