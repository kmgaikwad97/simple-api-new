const Address = require('../model/addressSchema');
const userSchema = require('../model/userSchema');


// Save User
const addAddress = async (req, res) => {
    const userData = req.tokenData
    console.log("userid :123:", userData);
    console.log("req.body ::", req.params);

    const myUserData = await userSchema.findById(userData.userID)
    console.log("myUserData :123:", myUserData.address);
    // const addAddress = new Address(req.body);
    const { country, fullname, mobile, pincode, flat, area, landmark, city, state } = req.body;
    if (req.body.fullname && req.body.mobile && req.body.flat && req.body.pincode && req.body.city && req.body.state) {
        try {
            const data = new Address({
                country: country,
                fullname: fullname,
                mobile: mobile,
                pincode: pincode,
                flat: flat,
                area: area,
                landmark: landmark,
                city: city,
                state: state,
            })
            const addSave = await data.save()
            console.log("addSave ::", addSave._id);
            if (!addSave) {
                return "Address Not Found"
            }
            myUserData.address.push(addSave._id);
            // Save the updated user data to the database
            await myUserData.save();
            console.log("myUserData ::", myUserData);


            // const thatProduct = await productSchema.findById(req.params.id)
            // console.log("thatProduct :123:", thatProduct);

            // if (!thatProduct) {
            //     return "User not found";
            // }

            res.status(200).json({ message: "Address added Successfully", address: data });
        } catch (err) {
            console.log(err.message);
        }
    } else {
        res.send({ "status": "failed", "message": "All Fields Are Required." })
    }
    // console.log(addAddress, "adddddddd");
    // const inserAddress = await addAddress.save({});
    // console.log("inserUser ::",inserAddress);
    // res.status(201).send(inserAddress);
};



// Get All User
const getAddress = async (req, res) => {
    try {
        const getAdd = await Address.find({});
        console.log("getAdd ::",getAdd);
        res.send(getAdd);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Get All User
const getUsersAddress = async (req, res) => {

    const userData = req.tokenData
    console.log("userid :123:", userData);
    console.log("req.body ::", req.params);

    const myUserData = await userSchema.findById(userData.userID)
    console.log("myUserData :123:", myUserData.address);
    
    try {
        const userAddresses = await Address.find({ _id: { $in: myUserData.address } });
        console.log("userAddresses ::",userAddresses);
        res.status(200).json({ "status": "success", "addresses": userAddresses });
    } catch (err) {
        res.status(400).send(err.message);
    }
};
const useThisAddress = async(req,res)=>{
    
}

module.exports = {
    addAddress,
    getAddress,
    getUsersAddress,
    useThisAddress
}