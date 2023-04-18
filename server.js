// Express
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");

console.log(cors,"here");

const app = express();

// app.use(cors({
//     origin: '*'
//   }));
  app.use(cors());
  // app.use(cors({
  //     origin: '*',
  //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //     allowedHeaders: ['Content-Type', 'Authorization']
  //   }));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });
app.use(morgan("tiny"));



const products = require('./routes/routes')
const search = require('./routes/searchRoute')
// router
app.use(express.json());
app.use('/api/v1/',products);
app.use('/api/v1/',search);


  

// dotenv
const dotenv = require('dotenv');
dotenv.config({path:"./.env"})
const port = process.env.PORT 


// database
require("./config/conn");

// listening
app.listen(port,()=>{
    console.log(`connected to the ${port}`);
})  