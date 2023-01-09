const dotenv = require('dotenv');
dotenv.config();
const logger = require('../logs/logger');
const mysql = require('mysql2')

const branchdbConnection = mysql.createPool({
    host: process.env.BRANCH_DB_HOST,
    user: process.env.BRANCH_DB_USER,
    password: process.env.BRANCH_DB_PASSWORD,
    database: process.env.BRANCH_DB_NAME,
})

branchdbConnection.getConnection((err) => {
    if (!err) {
        logger.loggerInfo.addContext('context', `${process.env.BRANCH_DB_HOST} - ${process.env.BRANCH_DB_NAME} -`);
        logger.loggerInfo.info('Branch Connected.')

    } else {
        logger.loggerFatal.addContext('context', `${process.env.BRANCH_DB_HOST} - ${process.env.BRANCH_DB_NAME} -`);
        logger.loggerFatal.fatal(`Branch Connection Failed. ${err}`)
    }
})
module.exports = branchdbConnection;
