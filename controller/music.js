const Song = require('../model/song');


// Save User
const createSong = async (req, res) => {
    try {
        const songData = new Song(req.body);
        console.log(songData, "adddddddd");
        const upload = await songData.save({});
        console.log("upload ::",upload);
        // res.status(201).send(upload);
        res.status(200).json({ message: "Song uploded" });
    } catch (err) {
        res.status(409).send(err);
        console.log("Email already exist");
    }
};

// Get All User
const getAllSongs = async (req, res) => {
    console.log("req.tokenData :123:", req.tokenData);
    try {
        const allPhoto = await Song.find({});
        res.status(200).send({ "status": "success", "data": allPhoto })
    } catch (err) {
        console.log("here ::");
        res.status(400).send(err);
    }
};

module.exports = {
    createSong,
    getAllSongs
}