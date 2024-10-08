require('dotenv').config()

const jwt = require("jsonwebtoken");


const AuthCheck = async( req, res, next) =>{

    try {

        const token = req.headers.authorization.split(" ")[1];

        if(token) {
            const decoded = await jwt.verify(token, process.env.JSON_SEC_KEY);
            req.body.userId = decoded.userId;
            next();
        }
         else {
            // if token not found
            return res.status(400).json({
                errors: true,
                message: "token not found"
            })
        }
    }
        
        catch (error) {
            return res.status(400).json({
                errors: true,
                message: "Authorization failed"
            })
        }
    }


        module.exports = AuthCheck;
