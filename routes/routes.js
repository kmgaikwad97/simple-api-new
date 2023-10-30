const express = require("express");
// express router
const router = new express.Router();


const {getProduct, postProduct} = require('../controller/product')
const {createUser, getAllUsers, userLogin} = require('../controller/User')

router.route("/getAllProducts/").get(getProduct)
router.route("/createProduct/").post(postProduct)

router.route("/register/").post(createUser)
router.route("/getAllUsers/").get(getAllUsers)
router.route("/login/").post(userLogin)

module.exports = router 