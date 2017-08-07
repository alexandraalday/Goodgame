//	DEPENDENCIES
 const mongoose = require('mongoose');
 
// SCHEMA 
const Schema = mongoose.Schema;
const gameSchema = Schema({
  title: { type: Array, required: true },
  platform: { type: Array, required: true },
  image: { type: Array, required: true },
  description: { type: Array },
  likes: { type: Number }
 });
 
 const Game = mongoose.model('Game', gameSchema);
 
//	EXPORT
module.exports = Game;