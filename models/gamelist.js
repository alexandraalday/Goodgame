const mongoose = require('mongoose');
const Game = require('./game.js');

const gamelistSchema = mongoose.Schema({
	title: { type: String, required: true },
	author: {type: String},
	coverImage: { type: String, default: '/assets/Video-Game-Controller-Icon.svg' },
	description: { type: String },
	games: [Game.schema]
});

const Gamelist = mongoose.model('Gamelist', gamelistSchema);

module.exports = Gamelist;