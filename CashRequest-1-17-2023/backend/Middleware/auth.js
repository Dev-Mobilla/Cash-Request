const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const response = require('../controllers/resonseCodeMessages');
const Logger = require('../logs/logger');


const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        Logger.loggerError.addContext('context', `auth - verifyToken - `);
        Logger.loggerError.error(`Unauthorized. A token is required for authentication - ${token}`);
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        Logger.loggerInfo.addContext('context', `auth - verifyToken - `);
        Logger.loggerInfo.info(`Authorized. A token verified - ${token}`);
    } catch (err) {
        Logger.loggerFatal.addContext('context', `auth - verifyToken - `);
        Logger.loggerFatal.fatal(`Unauthorized. Invalid Token - ${token}`);
        return res.send({ message: response(5), resCode: 5 });
    }
    return next();
}

module.exports = {
    verifyToken
}