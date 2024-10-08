const UserModel = require("../models/User.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require('dotenv').config();


const UserRegister = async (req, res) => {

    try {
        const { name, email, password, gender } = req.body;

        // check user is already registered?
        const alreadyRegister = await UserModel.findOne({ email: email });

        if (alreadyRegister !== null) {
            return res.status(200).json({
                errors: true,
                message: "user already registered"
            })
        }

        // hash the password
        const hashed = await bcrypt.hash(password, saltRounds);

        // save user
        const user = await UserModel.create({ name: name, email: email, password: hashed, gender: gender });

        //  @todo // send activation email

        // send success response
        res.status(201).json({
            errors: false,
            message: "User successfully registered.",
            user: user
        })

    } catch (error) {

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user is registered or not
        const user = await UserModel.findOne({ email: email });


        if (user === null) {
            return res.status(400).json({
                errors: true,
                message: "username or password is incorrect!"
            });
        }

        // then check password is correct ?
        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (isPassCorrect === false) {
            return res.status(400).json({
                errors: true,
                message: "username or password is incorrect!"
            });
        }

        //todo JWT token
        const access_token = await jwt.sign({ userId: user._id }, process.env.JSON_SEC_KEY, { expiresIn: '2h' }); 

        // send success response
        res.status(200).json({
            errors: false,
            message: "successfully logged in",
            user: { name: user.name, photo: user.photo, email: user.email },
            accessToken: access_token
        });

    } catch (error) {
        res.status(500).json({
            errors: true,
            message: "internal server error"
        })
    }
}

module.exports = {
    UserRegister,
    loginUser
}