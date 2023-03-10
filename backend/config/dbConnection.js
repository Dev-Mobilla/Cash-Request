const mysql = require('mysql2');
const logger = require('../logs/logger');

const dbConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    // port:process.env.DB_PORT
})

dbConnection.getConnection((err) => {
    if (!err) {
        logger.loggerInfo.addContext('context', `${process.env.DB_HOST} - ${process.env.DB_NAME} -`);
        logger.loggerInfo.info('Kp Connected.')
        
    } else {
        logger.loggerFatal.addContext('context', `${process.env.DB_HOST} - ${process.env.DB_NAME} -`);
        logger.loggerFatal.fatal(`Connection Failed. ${err}`)
    }
})

module.exports = dbConnection;