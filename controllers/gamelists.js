// DEPENDENCIES
const express = require('express');
const User = require('../models/user.js');
const Gamelist = require('../models/gamelist.js');
const Game = require('..models/game.js');
const router = express.Router();
 
//  GET ROUTE
//index
router.get('/', (req, res)=>{
  Gamelist.find({}, (err, foundGamelists)=>{
    res.render('gamelists/gamelists-index.ejs', {
      gamelists: foundGamelists
    });
  });
});

//new gamelist
router.get('/new', (req, res)=>{
  User.find({}, (err, foundUsers)=>{
    res.render('gamelists/gamelists-new.ejs', {
      users: foundUsers
    });
  });
});
 
//add games to gameslist
router.get('/:id/add-games', (req, res)=>{
  res.render('games/games-new.ejs', {
    gamelistId: req.params.id
  });
});
 
// gamelist show page
router.get('/:id', (req, res)=>{
  Gamelist.findById(req.params.id, (err, foundGamelist)=>{
    res.render('gamelists/gamelists-show.ejs', {
      playlist: foundGamelist
    });
  });
});

//  POST ROUTE
// create a gamelist
router.post('/', (req, res)=>{
  Gamelist.create(req.body, (err, createdGamelist)=>{
    res.redirect('/gamelists/' + createdGamelist.id + '/add-games');
  });
});
 
// games into the playlist
router.post('/:id', (req, res)=>{
  Game.create(req.body, (err, createdGames)=>{
    Gamelist.findById(req.params.id, (err, foundGamelist)=>{
      foundGamelist.games = createdGames;
      foundGamelist.save((err, savedGamelist)=>{
        res.redirect('/gamelists');
      });
    });
  });
});
 
//  EXPORT 
module.exports = router;