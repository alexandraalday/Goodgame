//  DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user.js');
const Gamelist = require('../models/gamelist.js');
const Game = require('../models/game.js');
const router = express.Router();

//  GET ROUTE
// index page
router.get('/', (req, res)=>{
  User.find({}, (err, foundUsers)=>{
      res.render('users/users-index.ejs', {
          users: foundUsers,
          currentUser: req.session.currentUser
      });
    });
});

// new user page
router.get('/new', (req, res)=>{
  if(!req.session.currentUser) { //user must be logged out to create a new account
      return res.render('users/users-new.ejs');
    } else {
      return res.send('This user already has an account. You must logout to create a new one.');
  }
});

// // seed data
// router.get('/seed', (req, res)=>{
//   User.create([
//     {
//        username: "hellionoftroy",
//        password: "p00p",
//        icon: "http://static.tumblr.com/132fe3d842522ec66aebdef5463122d6/qsi2ine/JcKnk73b0/tumblr_static_7o1ldyzud3oc4owgsw0sc08ss.gif",
//        description: "i made this",
//        gamelists: []
//     }, {
//        username: "test",
//        password: "test",
//        icon: "http://static.tumblr.com/132fe3d842522ec66aebdef5463122d6/qsi2ine/JcKnk73b0/tumblr_static_7o1ldyzud3oc4owgsw0sc08ss.gif",
//        description: "i am a test",
//        gamelists: []
//     }], (err, data)=>{
//     res.redirect('/')
//   })
// });



// edit page
router.get('/:id/edit', (req, res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    if(req.session.currentUser.username === foundUser.username){ //user can only edit their account
      return res.render('users/users-edit.ejs', {
        user: foundUser, 
        currentUser: req.session.currentUser
      });
    } else {
        return res.send('you do not have permission to edit this account');
    }
  });
});

// show page
router.get('/:id', (req, res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('users/users-show.ejs', {
      user: foundUser,
      currentUser: req.session.currentUser
    });
  });
});

//edit user
router.put('/:id', (req, res)=>{
  if(req.body.icon === ""){ 
    req.body.icon = 'http://place-hold.it/100'; // 
  };
  User.findById(req.params.id, (err, foundUser)=>{
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser)=>{
      res.redirect('/users/' + req.params.id);
    });
  });
});

//  create user
router.post('/', (req, res)=>{
  // if(req.body.password !==""){
  //  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  // }
    if(req.body.icon === ""){ 
      req.body.icon = undefined; 
    };
    User.create(req.body, ()=>{
      res.redirect('/sessions/new');
    });
});

// delete user
router.delete('/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
    let gamelistIds = [];
    let gameIds = [];
    for(let i = 0; i < deletedUser.gamelists.length; i++){
      gamelistIds.push(deletedUser.gamelists[i]._id);
      songIds.push(deletedUser.gamelists[i].games._id);
    };
    Gamelist.remove(
      {
        _id: {
          $in: gamelistIds
        }
      },
      (err, removedGamelists)=>{
        Game.remove({
          _id: {
            $in: gameIds
          }
        },
        (err, removedGames)=>{
          req.session.destroy(()=>{
              res.redirect('/');
              });
          });
      });
  });
});




//  EXPORT
module.exports = router;