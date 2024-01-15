const express = require("express");
// express router
const router = new express.Router();


const {getProduct, postProduct,getCart, getParticularProduct} = require('../controller/product')
const {createUser, getAllUsers, userLogin, addToCart} = require('../controller/User');
const {addAddress,getAddress, getUsersAddress} = require('../controller/address');
const { verifyToken } = require("../controller/verify");
const { uploadPhoto,getPhoto } = require("../controller/upload-img")
const { songUpload,getSong } = require("../controller/song")
const { videoUpload,getVideo } = require("../controller/video")


const { createSong,getAllSongs } = require("../controller/music")
 
router.route("/getAllProducts/").get(getProduct)
router.route("/createProduct/").post(postProduct)

router.route("/upload-img/").post(uploadPhoto)
router.route("/upload-img/").get(getPhoto)

router.route("/upload-song/").post(songUpload)
router.route("/upload-song/").get(getSong)

router.route("/upload-video/").post(videoUpload)
router.route("/upload-video/").get(getVideo)

router.route("/register/").post(createUser)
router.route("/getAllUsers/").get(verifyToken,getAllUsers)
router.route("/login/").post(userLogin)

router.route(`/addtocart/:id`).post(verifyToken,addToCart)
router.route(`/getCart/`).get(verifyToken,getCart)

router.route(`/product/:id`).get(verifyToken,getParticularProduct)

// address
router.route(`/address/`).post(verifyToken,addAddress)
router.route(`/address/`).get(verifyToken,getAddress)
router.route(`/getUsersAddress/`).get(verifyToken,getUsersAddress)

// spotify
router.route("/createSong/").post(createSong)
router.route("/getAllSongs/").get(getAllSongs)

module.exports = router 