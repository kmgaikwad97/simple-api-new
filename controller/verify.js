// const userSchema = require('../model/userSchema')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// app.post('/profile',verifyToken,(req,res)=>{
//     // jwt.verify(req.token, process.env.JWT_SECRET_KEY,(err,finalData)=>{
//     //     if(err){
//     //         console.log("Err ");
//     //     }else{
//     //         res.json("sucess")
//     //     }
//     // })
//     res.json({ status: 'success', data: req.tokenData });
// })

// const verifyToken = async(req,res,next)=>{
//    try{
//     const bearerHeader = req.headers['Authorization']
//     if(typeof bearerHeader !== 'undefined'){
//         const bearer = bearerHeader.split(" ")
//         const token = bearer[1];
//         req.token = token;
//         next();
//         // res.json(200).json({"status":"error","data":"Unauthorised Access"})
//         // console.log("Succss");
//     }else{
//         res.json(400).json({"status":"error","data":"Unauthorised Access"})
//     }
//    }catch(err){
//     console.log("Error is here ::",err);
//    }
// }

// Middleware for token verification
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    console.log("bearerHeader ::",bearerHeader);
  
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).json({ status: 'error', data: 'Unauthorized Access' });
        } else {
          req.tokenData = decoded; // Attach decoded data to the request for later use
          console.log("req.tokenData ::",req.tokenData);
          next();
        }
      });
    } else {
      res.status(400).json({ status: 'error', data: 'Unauthorized Access undefined' });
    }
  };

module.exports = {
    verifyToken
}