// this section is not in use currently, but is in progress for a future feature
// users will be able to search for their game in the igdb database and add to their gamelists


// DEPENDENCIES
const express = require('express');
const router = express.Router();
const request = require('request');
const unirest = require('unirest');
const User = require('../models/user.js');
const Gamelist = require('../models/gamelist.js');
const Game = require('../models/game.js');
require('dotenv').config();

let apiHeaders = {
      'user-key': process.env.API_KEY,
      'Accept': 'application/json'
    };
let igdbURL = 'https://api-2445582011268.apicast.io/games/'




// game search index route
router.get('/', (req, res)=>{
	res.render('games/games-search.ejs', {
        currentUser: req.session.currentUser
      });
});

// search IGDB by keyword
router.get('/searchResult/:search', function(req, res) {
  let s = req.params.search;
  request({ 
    headers: apiHeaders,
    url: igdbURL,
    qs: {
      fields: 'name,cover,summary',
      search: s,
      limit: '20',
      offset: '0'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let gameData = JSON.parse(body);
      res.send(gameData);
    } else {
      res.redirect('/search');
    }
  });
});


// individual game data
router.get('/:id', function(req, res) {
  let gameId = req.params.id;
  request({
    headers: apiHeaders,
    url: igdbURL + gameId,
    qs: {fields: 'name,cover,screenshots,summary,videos,genres,storyline'}
  }, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      console.log(response)
      let gameData = JSON.parse(body)[0];
      res.render('games/games-show.ejs', {
        gameData: gameData,
        currentUser: req.session.currentUser
      });      
    } else {
      res.redirect('/search');
    }
  })
});

// /POST, add game to gamelist
router.post('/add', function(req, res) {
  let gameId = req.body.gameId;
  let gamelistId = req.body.gamelistId;

  console.log("-------------");
  console.log(req.body.gameId);
  console.log("=============");
  console.log(req.body.gamelistId);


  if (currentUser) { //switch to find gamelist
    db.user.find({
      where: {username: currentUser.username}
    })
    .then(function(user) {
      request({
        headers: apiHeaders,
        url: igdbURL + gameId,
        qs: {
          fields: 'name,cover'
        }
      }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
          let gameData = JSON.parse(body)[0];
          db.game.findOrCreate({  //create new game in gamelist
            where: {
              title: gameData.name,
              gamelistId: gamelistId
            },
            defaults: {
              igdbId: gameData.id,
              gamelistId: gamelistId,
              title: gameData.name,
              cover: gameData.cover.cloudinary_id
            }
          })
          .spread(function(game, wasAdded) {
            if (wasAdded) { 
              req.flash('success', 'Game added to your library');           
              res.redirect('/');
            } else {
              req.flash('error', 'Game already in your library');
              res.redirect('/');
            }
          });
        } else {
          res.redirect('/');
        }
      })
      
    })
  }

})




// export
module.exports = router;