const uploadImg = require('../model/upload-image');


// Save User
const uploadPhoto = async (req, res) => {
    try {
        const uploadData = new uploadImg(req.body);
        console.log(uploadData, "adddddddd");
        const upload = await uploadData.save({});
        console.log("upload ::",upload);
        // res.status(201).send(upload);
        res.status(200).json({ message: "photo uploded" });
    } catch (err) {
        res.status(409).send(err);
        console.log("Email already exist");
    }
};

// Get All User
const getPhoto = async (req, res) => {
    console.log("req.tokenData :123:", req.tokenData);
    try {
        const allPhoto = await uploadImg.find({});
        res.status(200).send({ "status": "success", "data": allPhoto })
    } catch (err) {
        console.log("here ::");
        res.status(400).send(err);
    }
};

module.exports = {
    uploadPhoto,
    getPhoto
}