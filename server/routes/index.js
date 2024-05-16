const express = require("express");
const router = express.Router();

router.use("/users", require("./user"))
router.use("/manhwasAndMangas", require("./manhwaandmanga"))

module.exports = router;

