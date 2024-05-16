const { Favorite, User } = require("../models")
const authentication = require("../middleware/authentication");
const axios = require("axios")

class ManhwaAndMangaController {

    static async getAllManhwasAndMangas(req, res, next) {
        try {
            const response = await axios({
                method: "GET",
                url: "https://api.mangadex.org/manga?includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc",
              })
              const mangaList = []
              for (let index = 0; index < response.data.data.length; index++) {
                const manga = response.data.data[index];
                console.log(manga)
                const updatedManga = {
                    myManhwaAndMangaId: manga.id,
                    title: manga.attributes.title.en,
                    coverArt: manga.relationships.find(relationship => {
                        return relationship.type === "cover_art"
                    }),
                    description: manga.attributes.description.en
                }
                const responseCover = await axios({
                    method: "GET",
                    url: "https://api.mangadex.org/cover/" + updatedManga.coverArt.id
                })
                updatedManga.coverArt.url = `https://uploads.mangadex.org/covers/${updatedManga.id}/${responseCover.data.data.attributes.fileName}`
                mangaList.push(updatedManga)
            }
              res.json(mangaList)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getManhwaAndMangaById(req, res, next) {
        try {
            const { id } = req.params;
            const options = {
                method: "GET",
                url: "https://api.mangadex.org/manga/" + id,
            };
            const { data } = await axios.request(options);
            if (!data) throw { name: "NotFound" };
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getFavoriteManhwasAndMangas(req, res, next) {
        try {
            const favorites = await Favorite.findAll();
            res.status(200).json(favorites);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async postFavoriteManhwaAndManga(req, res, next) {
        try {
            const { id } = req.params;
            const findManhwaAndManga = await Favorite.findOne({
                where: { myManhwaAndMangaId: id },
            });
            console.log(findManhwaAndManga, "Manhwa / Manga found");
            if (findManhwaAndManga) throw { name: "Duplicate" };

            const options = {
                method: "GET",
                url: "https://api.mangadex.org/manga/" + id,
            };
            const { data } = await axios.request(options);

            if (!data) throw { name: "NotFound" };

            const fav = await Favorite.create({
                myManhwaAndMangaId: id,
                title: data.data.attributes.title.en,
                // coverArt: data.relationships.cover_art,
                description: data.data.attributes.description.en,
                UserId: req.user.id,
            });
            res.status(201).json({
                message: `Manhwa / Manga ${fav.title} added to favorite`,
                fav,
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    static async deleteFavoriteManhwaAndManga(req, res, next) {
        try {
            const { id } = req.params;
            // console.log(id, "id favorite");
            const favorite = await Favorite.findByPk(id);
            if (!favorite) throw { name: "NotFound" };
            await Favorite.destroy({
                where: { id: id },
            });

            res.status(200).json({
                message: `${favorite.title} has been deleted `,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = ManhwaAndMangaController