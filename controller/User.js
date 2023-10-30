const userSchema = require('../model/userSchema')
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
            if (req.body.email && req.body.password && req.body.name && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(12);
                        const hashedPassword = await bcrypt.hash(password, salt)
                        const doc = new userSchema({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            tc: tc
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
    try {
        const allUsers = await userSchema.find({});
        res.status(200).send({ "status": "success", "users": allUsers })
    } catch (err) {
        res.status(400).send(err);
    }
};

// Login Api

const userLogin = async(req,res)=>{
    try{
        console.log("here :123");
        const {email,password} = req.body 
        if(email && password){
            const user = await userSchema.findOne({email:email})
            if(user != null){
                const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatch){

                        // Generate JWT Token 
                        const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                    res.status(200).send({"status":"success","message":"Registration Successfully","token":token}) 

                        res.send({"status":"success","message":"Login Successful.","token":token})    
                    }else{
                        res.send({"status":"failed","message":"Email or Password is not Valid."})
                    }
            }else{
                res.send({"status":"failed","message":"You are not Registered User."})
            }
        }else{
            res.send({"status":"failed","message":"All Fields Are Required."})
        }
    }catch(err){
        console.log(err);
        console.log(err.message);
        res.send({"status":"failed","message":"Unable to Login."})
    }
}

module.exports = {
    createUser,
    getAllUsers,
    userLogin
}