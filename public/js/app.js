const app = angular.module("Goodgame", []);

app.controller("SearchController", ['$http', function($http){

this.find = function(){
	const controller = this;
	$http({
		method: "GET",
		url: "http://jservice.io/api/random"
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