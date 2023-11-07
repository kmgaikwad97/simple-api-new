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

const { upload, uploadMultiple } = require('./multer')
const { getStorage, ref ,uploadBytesResumable } = require('firebase/storage')
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('./firebase.config')


// database
require("./config/conn");


async function uploadImage(file, quantity) {
  const storageFB = getStorage();

  await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)

  if (quantity === 'single') {
      const dateTime = Date.now();
      const fileName = `images/${dateTime}`
      const storageRef = ref(storageFB, fileName)
      const metadata = {
          contentType: file.type,
      }
      await uploadBytesResumable(storageRef, file.buffer, metadata);
      return fileName
  }

  if (quantity === 'multiple') {
      for(let i=0; i < file.images.length; i++) {
          const dateTime = Date.now();
          const fileName = `images/${dateTime}`
          const storageRef = ref(storageFB, fileName)
          const metadata = {
              contentType: file.images[i].mimetype,
          }

          const saveImage = await Image.create({imageUrl: fileName});
          file.item.imageId.push({_id: saveImage._id});
          await file.item.save();

          await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);

      }
      return
  }

}


app.post('/test-upload', upload, async (req, res) => {
  const file = {
      type: req.file.mimetype,
      buffer: req.file.buffer
  }
  try {
      const buildImage = await uploadImage(file, 'single'); 
      res.send({
          status: "SUCCESS",
          imageName: buildImage
      })
  } catch(err) {
      console.log(err);
  }
})

// listening 
app.listen(port,()=>{
    console.log(`connected to the ${port}`);
})  