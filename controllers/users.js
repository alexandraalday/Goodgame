//	DEPENDENCIES
const express = require('express');
const User = require('../models/user.js');
const router = express.Router();

//	GET ROUTE
router.get('/', (req, res)=>{
  res.send('user index route');
});

router.get('/new', (req, res)=>{
  res.render('users/users-new.ejs');
});

//	ACTION ROUTES 
router.post('/', (req, res)=>{
  if(req.body.icon === ""){ // if the user didn't put an icon
    req.body.icon = undefined; // set the value to undefined so that in the schema it will use the default value
  };
  User.create(req.body, ()=>{
    res.redirect('/users');
  });
});

//	EXPORT
module.exports = router;