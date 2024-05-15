const { comparepassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("../models")
const { Op } = require("sequelize")

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
}

module.exports = UserController;