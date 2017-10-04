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
	    
	    this.find = function(searchData) {   //This function makes request from user input
	    	console.log(searchData)
	        $http ({
	            method: 'GET',
	            url: this.url + '/games/searchResult/:' + searchData
	        }).then(function(response) {
	            controller.searchResults = response.data;
	            console.log(controller.searchResults);
	        })
	    };

}]);