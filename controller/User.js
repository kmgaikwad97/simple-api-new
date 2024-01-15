// const userSchema = require('../model/userSchema')
const userSchema = require('../model/userSchema')
const productSchema = require('../model/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Save User
const createUser = async (req, res) => {
    try {
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await userSchema.findOne({ email: email })
        if (user) {
            res.status(201).send({ "status": "failed", "message": "Email Already Exist." })
        } else {
            if (req.body.email && req.body.password && req.body.name && password_confirmation) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(12);
                        const hashedPassword = await bcrypt.hash(password, salt)
                        const doc = new userSchema({
                            name: name,
                            email: email,
                            password: hashedPassword
                        })
                        await doc.save();
                        const saved_user = await userSchema.findOne({ email: email })
                        // Genearate JWT Token 
                        const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
                        res.status(200).send({ "status": "success", "message": "Registration Successfully", "token": token })

                    } catch (err) {
                        console.log("hello");
                        console.log(err.message);
                        res.send({ "status": "failed", "message": "Unable to Register" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "Password & Confirm Passwor Doesn't Match" })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields Are Required." })
            }
        }
    } catch (err) {
        res.status(409).send(err);
        console.log("Email already exist");
    }
};



// Get All User
const getAllUsers = async (req, res) => {
    console.log("req.tokenData :123:", req.tokenData);
    try {
        const allUsers = await userSchema.find({});
        // const token = jwt.sign({ email: "kmgaikwad97@gmail.com" }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })

        // const decode = jwt.decode(token)

        // const verify = jwt.verify(token, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })


        // console.log("token :123:",token);

        // console.log("decode :123:", decode);

        // console.log("verify :123:",verify);

        res.status(200).send({ "status": "success", "users": allUsers })
    } catch (err) {
        console.log("here ::");
        res.status(400).send(err);
    }
};


// Add to cArt
const addToCart = async (req, res) => {
    try {
        const userData = req.tokenData
        console.log("userid :123:", userData);
        console.log("req.body ::", req.params);

        const myUserData = await userSchema.findById(userData.userID)
        console.log("myUserData :123:", myUserData.products);

        const thatProduct = await productSchema.findById(req.params.id)
        console.log("thatProduct :123:", thatProduct);

        if (!thatProduct) {
            return "User not found";
        }

        myUserData.products.push(thatProduct._id);
        // Save the updated user data to the database
        await myUserData.save();
        console.log("myUserData ::", myUserData);
        res.status(200).json({ message: "Product added to the cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Login Api

const userLogin = async (req, res) => {
    try {
        console.log("here :123");
        const { email, password } = req.body
        if (email && password) {
            const user = await userSchema.findOne({ email: email })
            console.log(user,"user :::");
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if ((user.email === email) && isMatch) {

                    // Generate JWT Token 
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })

                    // Update the user object with the new token
                    user.token = token;
                    // Save the updated user object with the new token to the database
                    await user.save();
                    res.status(200).send({ "status": "success", "message": "Login Successfully", "token": token })
                } else {
                    res.send({ "status": "failed", "message": "Email or Password is not Valid." })
                }
            } else {
                res.send({ "status": "failed", "message": "You are not Registered User." })
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields Are Required." })
        }
    } catch (err) {
        console.log(err);
        console.log("what is the error",err.message);
        res.send({ "status": "failed", "message": "Unable to Login." })
    }
}


module.exports = {
    createUser,
    getAllUsers,
    userLogin,
    addToCart
}