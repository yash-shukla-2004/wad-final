const song = require('../models/song.js');

// a), c), d)
module.exports.getAllSongs = async (req, res) => {
    try {
        let songs = await song.find();

        if (songs.length === 0) {
            const initialSongs = [
                { name: 'Tum Hi Ho', film: 'Aashiqui 2', music_director: 'Mithoon', singer: 'Arijit Singh' },
                { name: 'Kesariya', film: 'Brahmastra', music_director: 'Pritam', singer: 'Arijit Singh' },
                { name: 'Channa Mereya', film: 'Ae Dil Hai Mushkil', music_director: 'Pritam', singer: 'Arijit Singh' },
                { name: 'Agar Tum Saath Ho', film: 'Tamasha', music_director: 'A.R. Rahman', singer: 'Alka Yagnik' },
                { name: 'Jhoome Jo Pathaan', film: 'Pathaan', music_director: 'Vishal-Shekhar', singer: 'Arijit Singh' }
            ];
            await song.insertMany(initialSongs);
            songs = await song.find();
        }

        res.status(200).json({
            count: songs.length,
            message: "Songs fetched",
            data: songs
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// e)
module.exports.getSongsByDirector = async (req, res) => {
    const { music_director } = req.params;
    try {
        const songs = await song.find({ music_director });
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// f)
module.exports.getSongsByDirectorAndSinger = async (req, res) => {
    const { music_director, singer } = req.params;
    try {
        const songs = await song.find({ music_director, singer });
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// g)
module.exports.deleteSong = async (req, res) => {
    const { name } = req.params;
    try {
        const deleted = await song.findOneAndDelete({ name });
        if (!deleted) return res.status(404).json({ message: "Song not found" });
        res.json({ message: "Deleted successfully", song: deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// h)
module.exports.addSong = async (req, res) => {
    try {
        const { name, film, music_director, singer } = req.body;
        if (!name || !film || !music_director || !singer) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const exists = await song.findOne({ name });
        if (exists) return res.status(400).json({ message: "Song already exists" });

        const newSong = new song({ name, film, music_director, singer });
        await newSong.save();
        res.status(201).json({ message: "Song added", data: newSong });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// i)
module.exports.getSongsBySingerAndFilm = async (req, res) => {
    const { singer, film } = req.query;
    try {
        const songs = await song.find({ singer, film });
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// j)
module.exports.updateSongWithActorActress = async (req, res) => {
    const { name } = req.params;
    const { actor, actress } = req.body;
    try {
        const updated = await song.findOneAndUpdate(
            { name },
            { $set: { actor, actress } },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Song not found" });
        res.json({ message: "Song updated", data: updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// k)
module.exports.getSongsInTableFormat = async (req, res) => {
    try {
        const songs = await song.find();
        let html = `
            <html><head><title>Song Table</title></head><body>
            <h2>Song List</h2>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>Name</th><th>Film</th><th>Director</th><th>Singer</th><th>Actor</th><th>Actress</th>
                </tr>
        `;
        songs.forEach(song => {
            html += `
                <tr>
                    <td>${song.name}</td>
                    <td>${song.film}</td>
                    <td>${song.music_director}</td>
                    <td>${song.singer}</td>
                    <td>${song.actor || '-'}</td>
                    <td>${song.actress || '-'}</td>
                </tr>`;
        });
        html += "</table></body></html>";
        res.send(html);
    } catch (err) {
        res.status(500).send("Error generating table");
    }
};
