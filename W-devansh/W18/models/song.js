const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});

module.exports = mongoose.model('song', songSchema);
