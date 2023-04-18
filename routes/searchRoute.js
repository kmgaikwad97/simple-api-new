const express = require("express");
// express router
const router = new express.Router();


const {getUser, postUser, searchApi} = require('../controller/SearchApiController')

router.route("/").get(getUser)
router.route("/").post(postUser)
router.route("/search/").get(searchApi)

module.exports = router 