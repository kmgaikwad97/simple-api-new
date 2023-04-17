// Using MongoDB Compass
const mongoose = require("mongoose");
const dataBase = process.env.DB;
const DB = `${dataBase}`;
// userCred

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("Connection Failed");
  });



