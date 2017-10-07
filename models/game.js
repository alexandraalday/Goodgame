//	DEPENDENCIES
const mongoose = require('mongoose');
 
// SCHEMA 
const gameSchema = mongoose.Schema({
  igdbId: { type: Number, required: true },
  gamelistId: { type: Number, required: true },
  title: { type: String, required: true },
  cover: { type: String }
 });
 
const Game = mongoose.model('Game', gameSchema);
 
//	EXPORT
module.exports = Game;