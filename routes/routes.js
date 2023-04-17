const express = require("express");
// express router
const router = new express.Router();


const {getUser, postUser} = require('../controller/product')

router.route("/getAllProducts/").get(getUser)
router.route("/createProduct/").post(postUser)

module.exports = router 