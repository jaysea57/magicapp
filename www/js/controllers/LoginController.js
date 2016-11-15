angular.module('magic').controller('LoginController', function($scope, $http, $state, $ionicSideMenuDelegate, $rootScope, mainService) {
	console.log('LoginController start');
	$scope.isError = false;
	$scope.loginData = {};
	$scope.userTeams = [];
	
	$scope.login = function() {
		console.log('login function email: ' + $scope.loginData.email + ' pwd ' + $scope.loginData.pwd);
		mainService.doLogin($scope.loginData)
		 .then(function(response) {
			$rootScope.userData = response;
			console.log("login ok faccio get_teams " + " idcli " + $rootScope.userData.data.idCliente);
			mainService.getTeams()
			.then(function (response) {
				console.log('success return from getTeams service .. response type: ' + typeof response + " status " + response.status);
				$scope.userTeams = response;
				$rootScope.pageTitle = "Magic Leghe - " + $rootScope.userData.data.nome + " " + $rootScope.userData.data.cognome;
				$state.go('home_noteam');
			 }
			 , function (response) {
				console.log('KO return from getTeams service .. response type: ' + typeof response + " status " + response.status);
				$scope.isError = true;				 
			 });
		 }
		,function(response) {
			console.log('KO doLogin ' + JSON.stringify(response, null, 1));
			$scope.isError = true;
		}
		); // doLogin call end
    } // login function end
}); // controller end
