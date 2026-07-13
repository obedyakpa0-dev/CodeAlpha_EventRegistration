const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers['authorization']?.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded
            return next();
        } catch (error) {
            console.error("Token verification failed", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" })
        }
    }
    return res.status(401).json({ message: "Not authorized, token failed" })
};