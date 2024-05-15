const express = require("express");
const ManhwaAndMangaController = require("../controllers/ManhwaAndMangaControllers");
const authentication = require("../middleware/authentication");
const router = express.Router()

router.get("/", ManhwaAndMangaController.getAllManhwasAndMangas)

module.exports = router;