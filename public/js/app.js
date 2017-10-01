console.log('loaded bro');

const app = angular.module("Goodgame", []);

	app.controller("SearchController", ['$http', function($http){
		let controller = this;
		this.url = 'http://localhost:3000'
		let searchResults = [];     //This holds list of games from search
	    
	    this.find = function(searchTerm) {   //This function makes request from user input
	    	console.log('find function');
	        $http ({
	            method: 'GET',
	            url: this.url + '/games/searchResult',
	            data: {search: searchTerm}
	        }).then(function(response) {
	            searchResults = response.gameData;
	            // return response;
	            console.log(response);
	        })
	    };


}]);