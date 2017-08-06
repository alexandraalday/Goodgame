//	DEPENDENCIES 
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var app = express();


//	ENVIRONMENT (for heroku) 
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodgame';


//	MIDDLEWARE
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));


//	CONTROLLERS
var userController = require('./controllers/users.js');
app.use('/users', userController);

var sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


//	INDEX ROUTE
app.get('/', function(req, res){
  res.render('index.ejs', {
  });
});


//	MONGOOSE CONNECTION
mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function(){
  console.log('connected to mongo!');
});


//	LISTENER
app.listen(port, function(){
  console.log('listening on port ' + port);
});