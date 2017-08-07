// DEPENDENCIES
const express = require('express');
const User = require('../models/user.js');
const Gamelist = require('../models/gamelist.js');
const Game = require('..models/game.js');
const router = express.Router();
 
//  GET ROUTE
// index
router.get('/', (req, res)=>{
  Gamelist.find({}, (err, foundGamelists)=>{
    res.render('gamelists/gamelists-index.ejs', {
      gamelists: foundGamelists
    });
  });
});

// new gamelist
router.get('/new', (req, res)=>{
  User.find({}, (err, foundUsers)=>{
    res.render('gamelists/gamelists-new.ejs', {
      users: foundUsers
    });
  });
});
 
// edit gamelist
router.get('/:id/edit', (req, res)=>{
  Gamelist.findById(req.params.id, (err, foundGamelist)=>{
    res.render('gamelists/gamelists-edit.ejs', {
      gamelist: foundGamelist
    });
  });
});

// edit gamelist games 
router.get('/edit-games/:id', (req, res)=>{
  Gamelist.findById(req.params.id, (err, foundGamelist)=>{
    res.render('games/games-edit.ejs', {
      gamelist: foundGamelist
    });
  });
});

// edit gamelist info
router.put('/:id', (req, res)=>{
  Gamelist.findByIdAndUpdate(req.params.id, req.body, (err, updatedGamelist)=>{
      User.findOne({ 'username': updatedGamelist.username }, (err, foundUser)=>{
        foundUser.gamelists.id(req.params.id).remove();
        foundUser.gamelists.push(updatedGamelist);
        foundUser.save((err, savedUser)=>{
          res.redirect('/gamelists');
         });
      });
  });
});


router.put('/edit-games/:id', (req, res)=>{
  Gamelist.findById(req.params.id, (err, foundGamelist)=>{
    console.log('placeholder');
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
      gamelist: foundGamelist
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
 
// games into gamelist
router.post('/:id', (req, res)=>{
  Game.create(req.body, (err, createdGames)=>{
    Gamelist.findById(req.params.id, (err, foundGamelist)=>{
      foundGamelist.games = createdGames;
      foundGamelist.save((err, savedGamelist)=>{
        User.findOne({'username': savedGamelist.username}, (err, foundUser)=>{
          foundUser.gamelists.push(savedGamelist);
          foundUser.save((err, savedUser)=>{
            res.redirect('/gamelists');
          });
        });
      });
    });
  });
});

// delete route
router.delete('/:id', (req, res)=>{
  Gamelist.findByIdAndRemove(req.params.id, (err, deletedGamelist)=>{
    User.findOne({ 'username': deletedGamelist.username}, (err, foundUser)=>{
      foundUser.gamelists.id(req.params.id).remove();
      foundUser.save((err, savedUser)=>{
         res.redirect('/gamelists');
       });
     });
   });
});
 
//  EXPORT 
module.exports = router;