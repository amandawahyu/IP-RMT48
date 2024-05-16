const express = require("express");
const UserController = require("../controllers/UserControllers");
const authentication = require("../middleware/authentication");
const router = express.Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

router.post("/register", UserController.register)
router.post("/login", UserController.userLogin)
router.get("/", authentication, UserController.getUserId)
router.patch("/:id", authentication, upload.single("file"), UserController.patchImageUrl);

module.exports = router;