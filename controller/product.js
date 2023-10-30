const Products = require('../model/model')


// Save User
const postProduct = async (req, res) => {
    try {
        const addUser = new Products(req.body);
        console.log(addUser, "adddddddd");
        const inserUser = await addUser.save({});
        console.log("inserUser ::",inserUser);
        res.status(201).send(inserUser);
    } catch (err) {
        res.status(409).send(err);
        console.log("Email already exist");
    }
};

// Get All User
const getProduct = async (req, res) => {
    try {
        const getUser = await Products.find({});
        res.send(getUser);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Save User
const searchApi = async (req, res) => {
    try {
        const products = await Product.find({
            createdat: { $gte: new Date(fromDate), $lte: new Date(toDate) },
            name: productName
        });
        res.send('This Product is already Exist')
        console.log("Email already exist");
    } catch (err) {
        res.status(409).send(err);
    }
};

module.exports = {
    getProduct,
    postProduct,
    searchApi
}