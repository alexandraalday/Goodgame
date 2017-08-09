// DEPENDENCIES
const express = require('express');
const request = require('request');
const router = express.Router();
const igdb = require('igdb-api-node').default;
const igdbURL = 'https://api-2445582011268.apicast.io/games/';
const apiHeaders = {
			'user-key': '1acdacaf35c5fbd7b1ab4111bdbaf8ce',
			'Accept': 'application/json'
		};


// manual entry game index route
router.get('/', (req, res)=>{
	res.render('games/games-new.ejs', {
        currentUser: req.session.currentUser
      });
});

// game search index route
// router.get('/', (req, res)=>{
// 	res.render('games/games-search.ejs', {
//         currentUser: req.session.currentUser
//       });
// });


router.get('/game', (req, res)=>{
	let s = req.query.search;
	request({ 
		headers: apiHeaders,
		url: igdbURL,
		qs: {
			fields: 'name, cover, url',
			search: s
		}
	}, (err, res, body)=>{
		if (!err && res.statusCode == 200) {
			let gameData = JSON.parse(body);
			res.send(gameData);
		} else {
			res.redirect('/games')
		}
	});
});

router.post('/', (req, res)=>{
	res.send(req.body);
});




// export
module.exports = router;