const router = require('express').Router();
const songsController = require('../controller/songs.js');

// a) d) Display count and all songs
router.get('/all', songsController.getAllSongs);

// e) Songs by specified Music Director
router.get('/bydirector/:music_director', songsController.getSongsByDirector);

// f) Songs by Music Director and Singer
router.get('/bydirector/:music_director/singer/:singer', songsController.getSongsByDirectorAndSinger);

// g) Delete song by name
router.delete('/delete/:name', songsController.deleteSong);

// h) Add a new song
router.post('/add', songsController.addSong);

// i) Songs by singer and film
router.get('/bysingerfilm', songsController.getSongsBySingerAndFilm);

// j) Update: Add actor and actress
router.put('/update/:name', songsController.updateSongWithActorActress);

// k) Display data in tabular format
router.get('/table', songsController.getSongsInTableFormat);

module.exports = router;
