const express = require("express");
const UserController = require("../controllers/UserControllers");
const authentication = require("../middleware/authentication");
const {authorizationAdmin} = require("../middleware/authorization");
const router = express.Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

router.post("/register", UserController.register)
router.post("/login", UserController.userLogin)

module.exports = router;