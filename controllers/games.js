// this section is not in use currently, but is in progress for a future feature
// users will be able to search for their game in the igdb database and add to their gamelists


// DEPENDENCIES
// const express = require('express');
// const router = express.Router();
// const igdbURL = 'https://api-2445582011268.apicast.io/games/';
// const apiHeaders = {
// 			'user-key': '1acdacaf35c5fbd7b1ab4111bdbaf8ce',
// 			'Accept': 'application/json'
// 		};


// manual entry game index route
// router.get('/new', (req, res)=>{
// 	if(req.session.currentUser){
// 		User.find({}, (err, foundUsers)=>{
// 			res.render('games/games-new.ejs', {
// 				users: foundUsers,
//        			currentUser: req.session.currentUser
//       		});
// 		});
// 	} else {
//       res.send('you must be logged in to add games to a gamelist');
//   }
// });



// game search index route
// router.get('/', (req, res)=>{
// 	res.render('games/games-search.ejs', {
//         currentUser: req.session.currentUser
//       });
// });


// router.get('/game', (req, res)=>{
// 	let s = req.query.search;
// 	request({ 
// 		headers: apiHeaders,
// 		url: igdbURL,
// 		qs: {
// 			fields: 'name, cover, url',
// 			search: s
// 		}
// 	}, (err, res, body)=>{
// 		if (!err && res.statusCode == 200) {
// 			let gameData = JSON.parse(body);
// 			res.send(gameData);
// 		} else {
// 			res.redirect('/games')
// 		}
// 	});
// });

// router.post('/', (req, res)=>{
// 	res.send(req.body);
// });




// export
// module.exports = router;