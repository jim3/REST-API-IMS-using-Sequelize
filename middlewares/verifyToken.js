// Express middleware to verify the token and allow access to the routes
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // split the token from the header

    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // verify the token with the `JWT_SECRET` from the .env file
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

module.exports = verifyToken;
