const { favorite, User } = require("../models")
const axios = require("axios")

class ManhwaAndMangaController {
    static async getAllManhwasAndMangas(req, res, next) {
        try {
            const response = await axios({
                method: "GET",
                url: "https://api.mangadex.org/manga?limit=10&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc",
                headers: {
                //   Authorization: `Bearer ${localStorage.access_token}`
                }
              })
              res.json(response.data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ManhwaAndMangaController