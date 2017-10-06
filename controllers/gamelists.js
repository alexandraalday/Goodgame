// DEPENDENCIES
const express = require('express');
const User = require('../models/user.js');
const Gamelist = require('../models/gamelist.js');
const Game = require('../models/game.js');
const router = express.Router();
 
//  GET ROUTE
// index
router.get('/', (req, res)=>{
  User.find({}, (err, foundUsers)=>{
    Gamelist.find({}, (err, foundGamelists)=>{
      res.render('gamelists/gamelists-index.ejs', {
        gamelists: foundGamelists, 
        users: foundUsers,
        currentUser: req.session.currentUser
      });
    });
  });
});

// new gamelist
router.get('/new', (req, res)=>{
  if(req.session.currentUser){ //only logged in users can crete a gamelist
    User.find({}, (err, foundUsers)=>{
      res.render('gamelists/gamelists-new.ejs', {
        users: foundUsers,
        currentUser: req.session.currentUser
      });
    });
  } else {
      res.send('You need to be logged in to add a gamelist');
  }
});
 
// edit gamelist
router.get('/edit/:id', (req, res)=>{
  Gamelist.findById(req.params.id, (err, foundGamelist)=>{
    if(req.session.currentUser){
      if(req.session.currentUser.username === foundGamelist.author) {
        return res.render('gamelists/gamelists-edit.ejs', {
          gamelist: foundGamelist,
          currentUser: req.session.currentUser
      });
      } else {
        res.send('Only the author can edit this gamelist');
      };
    };
  });
});

// edit gamelist games 
router.get('/edit-games/:id', (req, res)=>{
  Game.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedGames)=>{
    Gamelist.findOne({ 'games._id': req.params.id }, (err, foundGamelist)=>{
      foundGamelist.games.remove();
      foundGamelist.games = updatedGames;
      foundGamelist.save((err, savedGamelist)=>{
        User.findOne({'username': savedGamelist.author}, (err, foundUser)=>{
          foundUser.gamelists.id(savedGamelist.id).remove();
          foundUser.gamelists.push(savedGamelist);
          foundUser.save((err, savedUser)=>{
            res.redirect('/gamelists/' + savedGamelist.id);
          });
        });
      });
    });
  });
});

// edit gamelist info
router.put('/:id', (req, res)=>{
  Gamelist.findByIdAndUpdate(req.params.id, req.body, (err, updatedGamelist)=>{
       Gamelist.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {gamelists: updatedGamelist}},
            {safe: true, upsert: true},
            (err, model)=>{
              console.log(err);
            })
          res.redirect('/gamelists/' + updatedGamelist.id);
         // });
      // });
  });
});

//add games to gameslist
router.get('/:id/add-games', (req, res)=>{
  Gamelist.findById(req.params.id, (err, foundGamelist)=>{
    res.render('games/games-new.ejs', {
      gamelist: foundGamelist,
      currentUser: req.session.currentUser
    });
  });
});

// edit gamelist games page
router.get('/:gamelistId/edit-games/:gamesId', (req, res)=>{
  Gamelist.findById(req.params.gamelistId, (err, foundGamelist)=>{
    Game.findById(req.params.gamesId, (err, foundGames)=>{
      res.render('games/games-edit.ejs', {
        games: foundGames,
        gamelist: foundGamelist
      });
    });
  });
});

// edit gamelist games
router.put('/:gamelistId/edit-games/:gameId', (req, res)=>{
  Game.findByIdAndUpdate(req.params.gameId, req.body, { new: true }, (err, updatedGames)=>{
    Gamelist.findOne({ 'games._id': req.params.gameId }, (err, foundGamelist)=>{
      foundGamelist.games.remove();
      foundGamelist.games = updatedGames;
      foundGamelist.save((err, savedGamelist)=>{
        User.findOne({'username': savedGamelist.author}, (err, foundUser)=>{
          foundUser.gamelists.id(savedGamelist.id).remove();
          foundUser.gamelists.push(savedGamelist);
          foundUser.save((err, savedUser)=>{
            res.redirect('/gamelists/' + savedGamelist.id);
          });
        });
      });
    });
  });
});
 
// gamelist show page
router.get('/:id', (req, res)=>{
  Game.find({},(err, foundGames)=>{
    Gamelist.findById(req.params.id, (err, foundGamelist)=>{
      User.find({}, (err, foundUser)=>{
        res.render('gamelists/gamelists-show.ejs', {
          games: foundGames,
          gamelist: foundGamelist,
          user: foundUser,
          currentUser: req.session.currentUser
        });
      });
    });
  });
});



//  POST ROUTE
// create a gamelist
router.post('/', (req, res)=>{
  req.body.username = req.session.currentUser.username; //current user is listed as gamelist author
    Gamelist.create(req.body, (err, createdGamelist)=>{
          User.findOneAndUpdate( // had to use Mongoose specific push
            {username: req.body.username},
            {$push: {gamelists: createdGamelist}},
            {safe: true, upsert: true},
            (err, model)=>{
              console.log(err);
            })
            res.redirect('/gamelists');
      });
  });

 
// games into gamelist
router.post('/:id', (req, res)=>{
  Game.create(req.body, (err, createdGame)=>{
      console.log('=============');
      console.log(createdGame);
      console.log('=============');
      console.log(req.params.id);
      Gamelist.findOneAndUpdate(
      { _id: req.params.id},
      {$push: {games: createdGame}}, // replace createdGame with gameId from games-show.ejs page. 
      {safe: true, upsert: true},
      (err, model)=>{
          console.log(err);
      })
      Gamelist.findOne({ 'author': req.session.currentUser.username}, (err, foundGamelist)=>{
        console.log('============')
        console.log(foundGamelist); // not working yet
          res.render('gamelists/gamelists-show.ejs', { // have to render here. redirect did  not work
            gamelist: foundGamelist,
            currentUser: req.session.currentUser
          });
        });
      });
    });




// delete route
router.delete('/:id', (req, res)=>{
  Gamelist.findByIdAndRemove(req.params.id, (err, deletedGamelist)=>{
    User.findOne({ 'username': deletedGamelist.author}, (err, foundUser)=>{
      foundUser.gamelists.id(req.params.id).remove();
      foundUser.save((err, savedUser)=>{
        Game.findByIdAndRemove(deletedGamelist.games._id, (err, foundGames)=>{
          res.redirect('/gamelists');
        });
       });
     });
   });
});
 
//  EXPORT 
module.exports = router;