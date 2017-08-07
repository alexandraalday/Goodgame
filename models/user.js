//	DEPENDENCIES
const mongoose = require('mongoose');
const Gamelist = require('./gamelist.js');
const Game = require('./game.js')

//	SCHEMA
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  icon: { type: String, default: 'http://place-hold.it/100'},
  description: { type: String }
});

const User = mongoose.model('User', userSchema);

//	EXPORT
module.exports = User;