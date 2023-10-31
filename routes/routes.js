const express = require("express");
// express router
const router = new express.Router();


const {getProduct, postProduct,getCart, getParticularProduct} = require('../controller/product')
const {createUser, getAllUsers, userLogin, addToCart} = require('../controller/User');
const { verifyToken } = require("../controller/verify");

router.route("/getAllProducts/").get(getProduct)
router.route("/createProduct/").post(postProduct)

router.route("/register/").post(createUser)
router.route("/getAllUsers/").get(verifyToken,getAllUsers)
router.route("/login/").post(userLogin)

router.route(`/addtocart/:id`).post(verifyToken,addToCart)
router.route(`/getCart/`).get(verifyToken,getCart)

router.route(`/product/:id`).get(verifyToken,getParticularProduct)

module.exports = router 