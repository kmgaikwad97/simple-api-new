const Products = require('../model/model')

// Get All User
const getUser = async (req, res) => {
    try {
        const getUser = await Products.find({});
        res.send(getUser);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Save User
const postUser = async (req, res) => {
    try {
        const addUser = new Products(req.body);
        console.log(addUser, "adddddddd");
        const inserUser = await addUser.save({});
        res.status(201).send(inserUser);
    } catch (err) {
        res.status(409).send(err);
        console.log("Email already exist");
    }
};

module.exports = {
    getUser,
    postUser
}