//	DEPENDENCIES
const mongoose = require('mongoose');
const Game = require('./game.js');


//	SCHEMA
const Schema = mongoose.Schema;
const gamelistSchema = Schema({
	coverImage: { type: String, default: 'http://placehold.it/500x500.png' },
	description: { type: String },
	games: Game.schema,
});

const Gamelist = mongoose.model('Gamelist', gamelistSchema);

// ====================== EXPORT ========================
module.exports = Gamelist;