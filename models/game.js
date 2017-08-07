//	DEPENDENCIES
const mongoose = require('mongoose');
 
// SCHEMA 
const gameSchema = mongoose.Schema({
  title: { type: Array, required: true },
  platform: { type: Array, required: true },
  image: { type: Array, required: true },
  description: { type: Array }
 });
 
const Game = mongoose.model('Game', gameSchema);
 
//	EXPORT
module.exports = Game;