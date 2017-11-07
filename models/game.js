const mongoose = require('mongoose');
 
const gameSchema = mongoose.Schema({
  igdbId: { type: Number, required: true },
  gamelistId: { type: String, required: true },
  title: { type: String, required: true },
  cover: [{ type: String, required: true }] 
 });
 
const Game = mongoose.model('Game', gameSchema);
 
module.exports = Game;