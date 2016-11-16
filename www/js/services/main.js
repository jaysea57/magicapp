angular.module('magic').factory('mainService', function($http, myConfig) {
	console.log('mainService start');
	console.log("myConfig contextPath " + myConfig.contextPath);
	var userData = null;
	var userTeams = null;
	var currentTeam = null;
	var loginData = null;
	var currentTeamInfo = null;
	var defaultGet = function(url, params, okFunction, errorFunction) {
            //params.SID = $rootScope.SID;
			console.log("defaultGet url: " + url);
            return $http.get(url, { params: params }).then(function(data){
                okFunction(data.data);
            }, function(data){
                errorFunction(data.data);
            });
        };

	return {
		setCurrentTeam: function(team){
			console.log('service setCurrentTeam: ' + team.dsSquadra);
			currentTeam = team;
		}
		, getCurrentTeam: function(){
			console.log('service getCurrentTeam');
			if (currentTeam != null) {
				console.log('curr team not null ds: ' + currentTeam.dsSquadra);
			}
			return currentTeam;
		}
		, getUserTeams: function(){
			return userTeams;
		}
	    , getTeams: function() {
	    	console.log('in getTeams service');
	    	return $http({
	            method  : 'GET',
	        	  url     : myConfig.contextPath + '/priv/cliente/get_teams'
	        	 })
	        	  .then(function(response) {
	        	    userTeams = response;
	        	    console.log('getTeams: ' + JSON.stringify(response, null, 1));
	        	    return response;
	        	  }
	        	  , function(response) {
	        		  console.log('KO ' + JSON.stringify(response, null, 1));
	        		  return response;
	              })
	        	  ;
		}
	    , getTeamInfo: function(team) {
	    	console.log('in getTeamInfo service');
	    	return $http.get(myConfig.contextPath + "/priv/lg/squadra/home?is=" + team.idSquadra + "&ic=" + team.lega.idCampionato + "&j=1")
			.then(function(response) {
	      	    console.log('ok info ' + JSON.stringify(response, null, 1).substring(1,30) );
	      	    teamInfo = response;
	    	    return response;
	         }
	         , function(response) {
	            console.log('KO info ');
	            return response;
	         });
		}
	    , doLogin: function(loginData) {
	    	console.log('in doLogin service');
	    	return	$http({
	        	  method  : 'POST',
	        	  url     : myConfig.contextPath + '/pub/accedi/do_login_db_mobile',
	        	  data    : $.param(loginData),  // pass in data as strings
	        	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
	        	 }).then(function(response) {
	        		 console.log('ok do login');
	        		 console.log('ok in serv doLogin: ' + JSON.stringify(response, null, 1));
	        		 loginData = response;
	        		 return response;
	        	 });
		}
		, getLoginData: function(){
			return loginData;
		}
	    , getTabellino: function(teamInfoData,  okFunction, errorFunction) {
	    	console.log('in getTabellino service');
	    	return defaultGet(myConfig.contextPath + "/priv/lg/squadra/tabellino"
			 , {
				  is:  teamInfoData.squadra.model.id_squadra
				 ,ic:  teamInfoData.lega.model.id_campionato
				 ,j: 1
				 ,ngg: teamInfoData.ultimoRisultato.n_giornata
			 }
			 , okFunction, errorFunction)
		}
	}; // return statement for service object
});
