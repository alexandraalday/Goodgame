const app = angular.module("Goodgame", []);

	app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    	$sceDelegateProvider.resourceUrlWhitelist([
        	'self',
        	'http//images.igdb.com**'
    	]);
  	}]);

	app.controller("SearchController", ['$http', function($http){
		let controller = this;
		this.url = 'http://localhost:3000'
		this.searchResults = [];
	    
	    this.find = function(searchData) {
	        $http ({
	            method: 'GET',
	            url: this.url + '/games/searchResult/:' + searchData
	        }).then(function(response) {
	            controller.searchResults = response.data;
	        })
	    };

	}]);