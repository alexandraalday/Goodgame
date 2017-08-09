//	DEPENDENCIES
const express = require('express');
const User = require('../models/user.js');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

// get route
router.get('/new', (req, res)=>{
  res.render('sessions/sessions-new.ejs');
});

//start session or wrong pw
router.post('/', (req, res)=>{
  User.findOne({'username': req.body.username}, (err, foundUser)=>{
  	if(foundUser !== null){
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser;
        res.redirect('/');
      } else {
          res.send('The password you have entered is invalid.');
      }
  	}
  });
});

// session end
router.delete('/', (req, res)=>{
  req.session.destroy(()=>{
    res.redirect('/');
  });
});

//	EXPORT
module.exports = router;