//	DEPENDENCIES
const express = require('express');
const User = require('../models/user.js');
const router = express.Router();

//	GET ROUTE
// index page
router.get('/', (req, res)=>{
	User.find({}, (err, foundUsers)=>{
    	res.render('users/users-index.ejs', {
      		users: foundUsers
    	});
  	});
});

// new user page
router.get('/new', (req, res)=>{
  res.render('users/users-new.ejs');
});

// show page
router.get('/:id', (req, res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('users/users-show.ejs', {
      user: foundUser
    });
  });
});

// edit page
router.get('/:id/edit', (req, res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('users/users-edit.ejs', {
      user: foundUser
    });
  });
});

router.put('/:id', (req, res)=>{
  	User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser)=>{
    	User.findByIdAndUpdate(req.params.id, req.body, (err, foundUser)=>{
        	res.redirect('/users/' + req.params.id);
 		});	
	});
});

//	create user
router.post('/', (req, res)=>{
  if(req.body.icon === ""){ 
    req.body.icon = undefined; 
  };
  User.create(req.body, ()=>{
    res.redirect('/users');
  });
});

// delete user
router.delete('/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
    var gamelistIds = [];
    for(let i = 0; i < deletedUser.gamelists.length; i++){
      gamelistIds.push(deletedUser.gamelists[i]._id);
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
      			$in: removedGamelists.games.id
      		}
      	})
        res.redirect('/users');
      }
    );
  });
})

//	EXPORT
module.exports = router;