// Using MongoDB Compass
const mongoose = require("mongoose");
const dataBase = process.env.DB;
const DB = `${dataBase}`;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("Connection Failed");
  });

// module.exports = async function connection(){
//   try{

//     await mongoose.connect(dataBase);
//     console.log("Connection Successful");
//   }catch(err){
//     console.log("Connection Failed");
//     // console.log(err.message);
//     throw err
//   }
// }


