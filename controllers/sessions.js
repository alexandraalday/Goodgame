const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const User = require('../models/user.js');

// get route
router.get('/new', (req, res)=>{
  res.render('sessions/sessions-new.ejs');
});

// start session
router.post('/', (req, res)=>{
  User.findOne({ username: req.body.username}, (err, foundUser)=>{
      if(req.body.password == foundUser.password){
        req.session.currentUser = foundUser;
        res.redirect('/');
      } else {
          res.send('incorrect password')
      } 
  });
});

// end session
router.delete('/', (req, res)=>{
  req.session.destroy(()=>{
    res.redirect('/');
  });
});

module.exports = router;