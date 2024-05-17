const express = require("express");
const ManhwaAndMangaController = require("../controllers/ManhwaAndMangaControllers");
const authentication = require("../middleware/authentication");
const router = express.Router()

router.get("/", ManhwaAndMangaController.getAllManhwasAndMangas)
router.get("/favorites", authentication, ManhwaAndMangaController.getFavoriteManhwasAndMangas);
router.post("/favorites/:id", authentication, ManhwaAndMangaController.postFavoriteManhwaAndManga);
router.delete("/favorites/:id", authentication, ManhwaAndMangaController.deleteFavoriteManhwaAndManga);
router.get("/:id", ManhwaAndMangaController.getManhwaAndMangaById)

module.exports = router;