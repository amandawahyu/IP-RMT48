const { Article } = require("../models")
const _= require("lodash")

const authorizationAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== "Admin") {
            return res.status(403).json({ message: "You Are Not Authorized!" })
        }
        next()
    } catch (error) {
        if(error.name === "Not Found!") {
            next(error)
        }
        if(error.name === "Forbidden!") {
           next(error)
        }
    }
}

const authorizationAuthor = async (req, res, next) => {
    try {
        if (req.user.role === "Admin") {
            next()
        } else {
            let article = await Article.findOne({where: {id: req.params.id, authorId: req.user.id}})

            if(_.isNil(article)) {
                return res.status(403).json({ message: "You Are Not Authorized!" }) 
            }
            next()
        }
    } catch (error) {
        if(error.name === "Not Found!") {
            next(error)
        }
        if(error.name === "Forbidden!") {
           next(error)
        }
    }
}

module.exports = { authorizationAdmin, authorizationAuthor };