// Express middleware to verify the token and allow access to the routes
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // splits the token from the header
    console.log(authHeader);
    console.log(authHeader.split(" ")[1]);
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

module.exports = verifyToken;
