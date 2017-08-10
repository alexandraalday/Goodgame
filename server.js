//	DEPENDENCIES 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt-nodejs');
const app = express();


//	ENVIRONMENT (for heroku) 
const port = process.env.PORT || 3000;
const mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodgame';


//	MIDDLEWARE
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({
  secret: "keep it secret keep it safe",
  resave: false,
  saveUninitialized: false
}));


//	CONTROLLERS
const userController = require('./controllers/users.js');
app.use('/users', userController);

const gamelistController = require('./controllers/gamelists.js');
app.use('/gamelists', gamelistController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


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