const UserSchema = require("../Models/UserSchema");
const UserController = require("../Controllers/UserController");
const FruitsSchema = require("../Models/FruitsSchema")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = "hdu38ryfbao@#7egkau";



const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).send({ message: "Token is required" });
        }

        if (!token.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Invalid token format" });
        }
        
        const tokenValue = token.substring(7);

        const data = await jwt.verify(tokenValue, JWT_SECRET_KEY);

        req.user = data;

        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: 'Invalid token' });
        } else {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
};

module.exports = verifyToken;

