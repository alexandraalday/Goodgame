//	DEPENDENCIES 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt-nodejs');
const unirest = require('unirest');
const app = express();
require('dotenv').config();


//	ENVIRONMENT (for heroku) 
const port = process.env.PORT || 3000;
const mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodgame';


//	MIDDLEWARE
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

//	CONTROLLERS
const adminController = require('./controllers/admin.js');
app.use('/admin', adminController);

const userController = require('./controllers/users.js');
app.use('/users', userController);

const gamelistController = require('./controllers/gamelists.js');
app.use('/gamelists', gamelistController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const gamesController = require('./controllers/games.js');
app.use('/games', gamesController);


//	INDEX ROUTE
app.get('/', (req, res)=>{
  res.render('index.ejs', {
  	currentUser: req.session.currentUser
  });
});


//	MONGOOSE CONNECTION
mongoose.connect(mongoDBURI);
mongoose.connection.once('open', ()=>{
  console.log('mongo is connected');
});


//	LISTENER
app.listen(port, ()=>{
  console.log('listening on port ' + port);
});