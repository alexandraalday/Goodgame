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

// add game to gamelist
router.post('/add', function(req, res) {
  Game.create(req.body, (err, createdGame)=>{
      Gamelist.findOneAndUpdate(
      { _id: req.body.gamelistId},
      {$push: {games: createdGame}},
      {safe: true, upsert: true},
      (err, model)=>{
          console.log(err);
      })
      Gamelist.findOne({ 'author': req.session.currentUser.username}, (err, foundGamelist)=>{
          res.render('gamelists/gamelists-show.ejs', {
            gamelist: foundGamelist,
            currentUser: req.session.currentUser
          });
      });
  });
});

module.exports = router;