const mongoose = require('mongoose');
const Gamelist = require('./gamelist.js');
const Game = require('./game.js')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  icon: { type: String, default: '/assets/Video-Game-Controller-Icon.svg'},
  description: { type: String },
  gamelists: [Gamelist.schema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;