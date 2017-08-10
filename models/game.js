//	DEPENDENCIES
const mongoose = require('mongoose');
 
// SCHEMA 
const gameSchema = mongoose.Schema({
  title: { type: String, required: true },
  platform: { type:String, required: true },
  image: { type: String, required: true },
  description: { type: String }
 });
 
const Game = mongoose.model('Game', gameSchema);
 
//	EXPORT
module.exports = Game;