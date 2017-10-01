console.log('loaded bro');

const app = angular.module("Goodgame", []);

	// whitelist api address to use result links
	  app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
	    $sceDelegateProvider.resourceUrlWhitelist([
	        'self',
	        'http//images.igdb.com**'
	    ]);
	  }]);

	app.controller("SearchController", ['$http', function($http){
		let controller = this;
		this.url = 'http://localhost:3000'
		this.searchResults = [];     //This holds list of games from search
	    
	    this.find = function(searchTerm) {   //This function makes request from user input
	        $http ({
	            method: 'GET',
	            url: this.url + '/games/searchResult',
	            data: {search: searchTerm}
	        }).then(function(response) {
	            controller.searchResults = response.data;
	            console.log(this.searchResults);
	        })
	    };


}]);