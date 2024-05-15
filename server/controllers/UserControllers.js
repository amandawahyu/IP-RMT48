const { comparepassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("../models")
const { Op } = require("sequelize")
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

class UserController {
    static async register(req, res, next) {
        try {
            let { username, email, password, imageUrl, phoneNumber, address } = req.body
            const user = await User.create({ username, email, password, imageUrl, phoneNumber, address });
            res.status(201).json({ message: "New User Added!", id: user.id, username: user.username, email: user.email });
        } catch (error) {
            next(error)
        };
    };

    static async userLogin(req, res, next) {
        try {
            let { email, username, password } = req.body
            let user

            if(email) {
                user = await User.findOne({
                    where: {
                        email
                    }
                })
            }
            if(username) {
                user = await User.findOne({
                    where: {
                        username
                    }
                })
            }

            if (!user) throw { name: "ErrorInvalidUsernameOrEmailOrPassword" }
            let comparationPassword = comparepassword(password, user.password)
            if(!user || !comparationPassword) throw { name: "ErrorInvalidUsernameOrEmailOrPassword" }
            let token = createToken({
                id: user.id
            })
            res.status(200).json({
                message: "Login Success!",
                access_token: token
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUserId(req, res, next) {
        try {
            console.log(req.user.id, "req");
            let user = await User.findByPk(req.user.id, {
                attributes: ["id", "username", "email", "imageUrl", "phoneNumber", "address"],
            });
            if (!user) throw { name: "NotFound" };
            res.status(201).json(user);
        } catch (error) {
            console.log(error.name);
            next(error);
        }
    }
    
    static async patchImageUrl(req, res, next) {
        try {
            console.log(req.body, "<<<<<")
            console.log(req.file)

            const user = await User.findByPk(+req.params.id);
            if(!user) throw { name: "ErrorNotFound" } 

            const base64String = req.file.buffer.toString("base64")
            const dataUrl = `data:${req.file.mimetype};base64,${base64String}`
            console.log(dataUrl)

            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: req.file.originalname,
                folder: "myManhwaAndManga"
            })

            await user.update({
                imgUrl: result.secure_url
            })

            res.status(200).json({ message: "Image Success to Update" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;