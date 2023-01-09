const dotenv = require('dotenv');
dotenv.config();
const branchdbConnection = require('../config/branchDBConnection');
const dbConnection = require('../config/dbConnection');
const query = require('../config/queries');
const Logger = require('../logs/logger');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const setTransporter = require('../mail/mailConfig');
const { _createPdfStream, _streamToBuffer } = require('../utils/generatePdf');
const { sendEmailRf, sendRfRequestor } = require('./mailController');
const mailController = require('./mailController');

const sendEmail = async (options) => {
    let gmailTransporter = await setTransporter();
    return await gmailTransporter.sendMail(options);
};

module.exports = {
    getMaxId(req, res) {
        try {

            branchdbConnection.query(query.getMaxId, (err, row, fields) => {
                if (!err) {
                    if (!row.length == 0) {
                        Logger.loggerInfo.addContext('context', `requestController - getMaxId - `);
                        Logger.loggerInfo.info(`row: ${row.length}`)
                        res.send(row[0])
                    } else {
                        Logger.loggerError.addContext('context', 'requestController - getMaxId - ');
                        Logger.loggerError.error(`No ID found row: ${row.length}`);
                        res.send({ id: 0 })
                    }
                } else {
                    Logger.loggerError.addContext('context', 'requestController - getMaxId - ');
                    Logger.loggerError.error(`Error retrieving ID ${err}`);
                    res.send({ message: "Error ID retrieval." })
                }
            })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'requestController - getMaxId - ');
            Logger.loggerFatal.fatal(`Method Error - ${error}`);
            res.send({ message: "Error ID retrieval." })
        }
    },
    getRfMaxId(req, res) {
        try {
            branchdbConnection.query(query.getRfMaxId, (err, row, fields) => {
                if (!err) {
                    if (!row.length == 0) {
                        Logger.loggerInfo.addContext('context', `requestController - getRfMaxId - `);
                        Logger.loggerInfo.info(`row: ${row.length}`)
                        res.send(row[0])
                    } else {
                        Logger.loggerError.addContext('context', 'requestController - getRfMaxId - ');
                        Logger.loggerError.error(`No ID found row: ${row.length}`);
                        res.send({ id: 0 })
                    }
                } else {
                    Logger.loggerError.addContext('context', 'requestController - getRfMaxId - ');
                    Logger.loggerError.error(`Error retrieving ID ${err}`);
                    res.send({ message: "Error ID retrieval." })
                }
            })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'requestController - getRfMaxId - ');
            Logger.loggerFatal.fatal(`Method Error - ${error}`);
            res.send({ message: "Error ID retrieval." })
        }
    },
    
    getAllRequestsCash(req, res) {

        try {
            branchdbConnection.query(query.getAllRequestsCa, [req.params.idNumber, req.params.status], (err, rows, fields) => {
                if (!err) {
                    if (!rows.length == 0) {
                        Logger.loggerInfo.addContext('context', 'getAllRequestsCash')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send(rows)
                    } else {
                        Logger.loggerInfo.addContext('context', 'getAllRequestsCash - No data found')
                        Logger.loggerInfo.info(`Rows Length : ${rows.length}`)
                        res.send(rows)
                    }
                } else {
                    Logger.loggerError.addContext('context', 'getAllRequestsCash')
                    Logger.loggerError.error(`Error : ${JSON.stringify(err)}`)
                    res.send({ message: 'Error retrieving requests' })
                }
            })
        } catch (error) {
            Logger.loggerFatal.addContext('context', 'getAllRequestsCash');
            Logger.loggerFatal.fatal(`Error : ${JSON.stringify(error)}`)
            res.send(error)
        }
    },
    cancelCashRequest(req, res) {
        let controlno = req.body.controlNo

        try {
            branchdbConnection.query(`UPDATE cash_advance_request SET request_status = 'cancelled'  WHERE controlNo = '${controlno}'`, (err, result, fields) => {
                if (!err) {
                    res.send({ message: 'Successfully cancelled' })
                } else {
                    res.send({ message: 'Cancellation failed. Please refresh page' })
                }
            })
        } catch (error) {
            res.send({ message: 'Network Error' })
        }
    },
    cancelRevRequest(req, res) {
        let controlno = req.body.controlNo

        try {
            branchdbConnection.query(`UPDATE revolving_fund_request SET request_status = 'cancelled'  WHERE controlNo = '${controlno}'`, (err, result, fields) => {

                if (!err) {
                    res.send({ message: 'Successfully cancelled' })
                } else {
                    res.send({ message: 'Cancellation failed. Please refresh page' })
                }
            })
        } catch (error) {
            res.send({ message: 'Network Error' })
        }
    }

}