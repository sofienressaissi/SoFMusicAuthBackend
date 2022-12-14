const jwt = require("jsonwebtoken");
require('dotenv').config();

const authAdmin = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");

        if (!token) {
            return res.status(401).json({msg: "No authentication token, authorization denied"});
        }
        const verified = jwt.verify(token, process.env.JWT_ADMIN_SM);

        if (!verified) {
            return res.status(401).json({msg: "Token verification failed, authorization denied"});
        }

        req.admin = verified.id;
        next();
    } catch(err) {
        res.status(500).json(err.message);
    }

};

module.exports = authAdmin;