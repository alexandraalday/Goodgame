const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Gamelist = require('../models/gamelist.js');
const Game = require('../models/game.js');

router.get('/',(req,res)=>{
  res.render('admin/admin-index.ejs');
})

router.get('/gamelists',(req,res)=>{
  Gamelist.find({}, (err,Gamelists)=>{
    res.render('admin/admin-gamelists.ejs', {
      gamelists: Gamelists
    })
  })
})
router.delete('/gamelists/:id',(req,res)=>{
  Gamelist.findByIdAndRemove(req.params.id, (err,foundGamelist)=>{
    res.redirect('/admin/gamelists');
  })
})

router.get('/users',(req,res)=>{
  User.find({}, (err,Users)=>{
    res.render('admin/admin-users.ejs', {
      users: Users
    })
  })
})
router.delete('/user/:id',(req,res)=>{
  User.findByIdAndRemove(req.params.id, (err, foundUser)=>{
    res.redirect('/admin/users');
  })
})

module.exports = router;