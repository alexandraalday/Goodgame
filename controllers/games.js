// this section is not in use currently, but is in progress for a future feature
// users will be able to search for their game in the igdb database and add to their gamelists


// DEPENDENCIES
const express = require('express');
const router = express.Router();
const request = require('request');
const unirest = require('unirest');


// game search index route
router.get('/', (req, res)=>{
	res.render('games/games-search.ejs', {
        currentUser: req.session.currentUser
      });
});


router.post('/search', (req, res)=>{
    if(req.body.search === undefined || "") {    //check for empty string and send back error to avoid empty API calls
        console.log('Empty String received');
        var errorResponse = "Not Found";
        res.send(errorResponse);
    } else {
        unirest.get("https://api-2445582011268.apicast.io/games/?fields=name,summary,cover&limit=20&offset=0&search=" + req.body.search)
            .header("user-key", "1acdacaf35c5fbd7b1ab4111bdbaf8ce")
            .header("Accept", "application/json")
            .end((result)=>{
                console.log(result.status, result.body);
                if (result.body.length === 0) {   //check for empty array meaning no search results
                    result.body = "Not Found";
                    res.send(result.body);
                } else {
                    res.send(result.body);   //send back list of games that match search term
                }
            });
    }
});



// export
module.exports = router;