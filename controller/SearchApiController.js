const Search = require('../model/modelSearch')

const postUser = async (req, res) => {
    try {
        const { fromDate, toDate, name, description } = req.body;
        const addUser = new Search({
            fromDate: new Date(fromDate),
            toDate: new Date(toDate),
            name,
            description
        });
        console.log(addUser, "adddddddd");
        const inserUser = await addUser.save({});
        res.status(201).send(inserUser);
    } catch (err) {
        res.status(409).send(err);
        console.log("Email already exist");
    }
};


// Get All User
const getUser = async (req, res) => {
    try {
        const getUser = await Search.find({});
        res.send(getUser);
    } catch (err) {
        res.status(400).send(err);
    }
};

async function searchApi(req, res) {
    const productName = req.query.name;
    console.log(productName);



    try {
        const filteredData = await Search.find({
            name: productName,
        });
        res.send(filteredData)
        console.log(filteredData, "Data Already exist");
    } catch (err) {
        res.status(409).send(err);
    }



}

module.exports = {
    getUser,
    postUser,
    searchApi
}