console.log('loaded bro');

const app = angular.module("Goodgame", []);

app.controller("SearchController", ['$http', function($http){
	let searchResults = [];                      //This holds list of games from search
    
    this.find = function(searchTerm) {   //This function makes request from user input
        return $http ({
            method: 'POST',
            url: '/games/search',
            data: {search: searchTerm}
        }).then(function(response) {
            searchResults = response.data;
            return response;
            console.log(response);
        })
    };


}]);