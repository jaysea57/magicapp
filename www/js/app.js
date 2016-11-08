// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('magic', ['ionic']);

app.constant("myConfig", {
    "url": "http://localhost"
    ,"port": "8100"
    ,"contextPath": "http://localhost:8100/api"
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

});

app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login'
                ,templateUrl: 'templates/login.html'
                ,controller: 'LoginController'
            })
            .state('home', {
                url: '/home'
                ,templateUrl: 'templates/home.html'
                ,controller: 'HomeController'
            })
            .state('home.gp', {
                url: '/home.gp'
                ,templateUrl: 'templates/homegp.html'
                ,controller: 'HomeGPController'
            })
            .state('home.sd', {
                url: '/home.sd'
                ,templateUrl: 'templates/homesd.html'
                ,controller: 'HomeSDController'
            })
        $urlRouterProvider.otherwise('/home');
    });

app.controller('Main', function($scope, $ionicSideMenuDelegate, $rootScope, $state, mainService, myConfig, $sce, $filter) {
	console.log('Main controller');
	console.log("myConfig url " + myConfig.url);
	$scope.teamChosen = false;
    $scope.toggleSideMenu = function() {
    	console.log('toggleSideMenu');
        $ionicSideMenuDelegate.toggleLeft();
      };
    $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
    };
    $scope.formatDate = function (date) {
            var dt = new Date(date);
            var ret = $filter('date')(dt, 'dd/MM/yyyy @ hh:mm');
            return ret;
    };
    $scope.isLoggedIn = function() {
      	if (typeof $rootScope.userData == "undefined" || typeof $rootScope.userData.data == "undefined") {
      		return false;
      	}
      	else {
            if ($rootScope.userData.data.idCliente == null) {
             return false;
            }
            else {
             $scope.userTeams = mainService.getUserTeams();
             return true;
            }
      	}
    };
    $scope.isTeamChosen = function() {
    	console.log('isTeamChosen()');
    	return $scope.teamChosen;
    };
    $scope.setTeamChosen = function(bool) {
    	$scope.teamChosen = bool;
    }
    $scope.logout = function() {
          console.log('logout function username: ' + $rootScope.userData.data.cognome);
          $rootScope.userData = {};
          $state.go('login');
          $scope.toggleSideMenu();
          $scope.setTeamChosen(false);
    };
    $scope.homeSquadra = function(team) {
          console.log('homeSquadra function team: ' + team.dsSquadra + ' di tipo ');
          mainService.setCurrentTeam(team);
          $scope.team = team;
          $scope.toggleSideMenu();
          $scope.setTeamChosen(true);
          $scope.team = mainService.getCurrentTeam();
          //debugger;
          mainService.getTeamInfo($scope.team)
          .then(function (response) {
         	 $scope.teamInfo = response;
         	 if ($scope.teamInfo.data.lega.model.cd_modalita_gioco == "GP") {
         		 $state.go('home.gp');
         	 }
         	 else {
         		 $state.go('home.sd');
         	 }
           }
           , function(response) {
         	 console.log('teaminfo KO response: ' + JSON.stringify(tinfo));
           }
          );
    };

});



