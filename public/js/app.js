console.log('loaded bro');

const app = angular.module("Goodgame", []);

app.controller("SearchController", ['$http', function($http){

this.find = function(){
	const controller = this;
	$http({
		method: "GET",
		url: "https://api-2445582011268.apicast.io/games/search",
		headers: {
			Accept: "application/json",
			"user-key": "1acdacaf35c5fbd7b1ab4111bdbaf8ce"
		}
	}).then(
		function(response){
			console.log(response.data); 
			controller.data = response.data 
	}, 
		function(err){
			console.log(err);
		}
	)
	}

}]);